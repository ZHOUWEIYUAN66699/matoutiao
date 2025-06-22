import { NextRequest, NextResponse } from 'next/server';
import { hnApi } from '@/lib/hackernews';
// import { translator } from '@/lib/translator'; // 暂时不使用翻译
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'top';
    const limit = parseInt(searchParams.get('limit') || '50'); // 增加获取数量

    console.log(`Fetching ${type} stories, limit: ${limit}`);

    // 获取故事ID列表
    let storyIds: number[] = [];
    switch (type) {
      case 'top':
        storyIds = await hnApi.getTopStories();
        break;
      case 'new':
        storyIds = await hnApi.getNewStories();
        break;
      case 'best':
        storyIds = await hnApi.getBestStories();
        break;
      case 'ask':
        storyIds = await hnApi.getAskStories();
        break;
      case 'show':
        storyIds = await hnApi.getShowStories();
        break;
      case 'job':
        storyIds = await hnApi.getJobStories();
        break;
      default:
        storyIds = await hnApi.getTopStories();
    }

    // 限制数量
    const limitedStoryIds = storyIds.slice(0, limit);
    console.log(`Processing ${limitedStoryIds.length} stories`);

    const results = {
      processed: 0,
      updated: 0,
      errors: 0,
      stories: [] as Array<{
        id: number;
        title: string | null;
        type: string;
        score: number;
        isNew: boolean;
      }>
    };

    // 测试数据库连接
    let hasDbConnection = false;
    try {
      await prisma.$connect();
      hasDbConnection = true;
      console.log('Database connection successful');
    } catch (error) {
      console.log('No database connection, will return data without storing:', error);
    }

    // 处理每个故事
    for (const storyId of limitedStoryIds) {
      try {
        console.log(`Processing story ${storyId}`);
        
        // 获取故事详情
        const item = await hnApi.getItem(storyId);
        if (!item) {
          console.log(`Failed to fetch story ${storyId}`);
          results.errors++;
          continue;
        }

        // 跳过已删除或死亡的内容
        if (item.deleted || item.dead) {
          console.log(`Story ${storyId} is deleted or dead, skipping`);
          continue;
        }

        if (hasDbConnection) {
          // 如果有数据库连接，保存数据
          // 检查是否已存在
          const existingItem = await prisma.hnItem.findUnique({
            where: { id: storyId }
          });

          let isNew = false;
          if (existingItem) {
            // 更新现有记录
            await prisma.hnItem.update({
              where: { id: storyId },
              data: {
                title: item.title || null,
                text: item.text || null,
                url: item.url || null,
                score: item.score || 0,
                descendants: item.descendants || 0,
                time: new Date(item.time * 1000),
                type: item.type,
                by: item.by || null,
                kids: item.kids || [],
                deleted: item.deleted || false,
                dead: item.dead || false,
              }
            });
            results.updated++;
            console.log(`Updated story ${storyId}`);
          } else {
            // 创建新记录
            isNew = true;
            
            // 处理作者信息（简化版）
            if (item.by) {
              const existingUser = await prisma.hnUser.findUnique({
                where: { username: item.by }
              });

              if (!existingUser) {
                const user = await hnApi.getUser(item.by);
                if (user) {
                  await prisma.hnUser.create({
                    data: {
                      id: user.id,
                      username: user.id,
                      about: user.about || null,
                      aboutCn: null, // 暂时不翻译
                      karma: user.karma,
                      submitted: user.submitted.map(String),
                    }
                  });
                }
              }
            }

            // 保存新故事
            await prisma.hnItem.create({
              data: {
                id: item.id,
                title: item.title || null,
                titleCn: null, // 暂时不翻译
                text: item.text || null,
                textCn: null, // 暂时不翻译
                url: item.url || null,
                score: item.score || 0,
                descendants: item.descendants || 0,
                time: new Date(item.time * 1000),
                type: item.type,
                by: item.by || null,
                kids: item.kids || [],
                deleted: item.deleted || false,
                dead: item.dead || false,
              }
            });
            
            console.log(`Created new story ${storyId}`);
          }
        }

        results.stories.push({
          id: item.id,
          title: item.title || null,
          type: item.type,
          score: item.score || 0,
          isNew: hasDbConnection ? false : true // 如果没有数据库，标记为新数据
        });

        results.processed++;

        // 减少延迟，提高效率
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error processing story ${storyId}:`, error);
        results.errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} stories, updated ${results.updated}, errors: ${results.errors}`,
      data: results,
      timestamp: new Date().toISOString(),
      hasDbConnection
    });

  } catch (error: unknown) {
    console.error('Error fetching HN data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch HN data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;

    // 验证密钥（用于Vercel Cron Jobs）
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Cron job triggered at:', new Date().toISOString());

    // 获取所有类型的数据
    const types = ['top', 'new', 'best', 'ask', 'show', 'job'];
    const results = [];

    for (const type of types) {
      try {
        const url = new URL(request.url);
        url.searchParams.set('type', type);
        url.searchParams.set('limit', '20'); // 每个类型获取20条
        
        const newRequest = new NextRequest(url.toString(), {
          method: 'GET',
          headers: request.headers,
        });
        
        const response = await GET(newRequest);
        const data = await response.json();
        results.push({ type, ...data });
        
        console.log(`Processed ${type} stories`);
      } catch (error) {
        console.error(`Error processing ${type}:`, error);
        results.push({ type, success: false, error: String(error) });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cron job completed',
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 