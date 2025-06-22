import { NextRequest, NextResponse } from 'next/server';
import { hnApi } from '@/lib/hackernews';
import { translator } from '@/lib/translator';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'top';
    const limit = parseInt(searchParams.get('limit') || '10');

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
      translated: 0,
      errors: 0,
      stories: [] as any[]
    };

    // 处理每个故事
    for (const storyId of limitedStoryIds) {
      try {
        console.log(`Processing story ${storyId}`);
        
        // 检查是否已存在
        const existingItem = await prisma.hnItem.findUnique({
          where: { id: storyId }
        });

        if (existingItem) {
          console.log(`Story ${storyId} already exists, skipping`);
          results.processed++;
          continue;
        }

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
          results.processed++;
          continue;
        }

        // 翻译标题
        let titleCn = null;
        if (item.title) {
          const titleTranslation = await translator.translateText({
            text: item.title,
            type: 'title'
          });
          if (titleTranslation.success) {
            titleCn = titleTranslation.translated;
          }
        }

        // 翻译正文
        let textCn = null;
        if (item.text) {
          const textTranslation = await translator.translateHtml(item.text, 'content');
          if (textTranslation.success) {
            textCn = textTranslation.translated;
          }
        }

        // 处理作者信息
        if (item.by) {
          const existingUser = await prisma.hnUser.findUnique({
            where: { username: item.by }
          });

          if (!existingUser) {
            const user = await hnApi.getUser(item.by);
            if (user) {
              let aboutCn = null;
              if (user.about) {
                const aboutTranslation = await translator.translateHtml(user.about, 'content');
                if (aboutTranslation.success) {
                  aboutCn = aboutTranslation.translated;
                }
              }

              await prisma.hnUser.create({
                data: {
                  id: user.id,
                  username: user.id,
                  about: user.about,
                  aboutCn,
                  karma: user.karma,
                  submitted: user.submitted.map(String),
                }
              });
            }
          }
        }

        // 保存故事
        const savedItem = await prisma.hnItem.create({
          data: {
            id: item.id,
            title: item.title,
            titleCn,
            text: item.text,
            textCn,
            url: item.url,
            score: item.score || 0,
            descendants: item.descendants || 0,
            time: new Date(item.time * 1000),
            type: item.type,
            by: item.by,
            kids: item.kids || [],
            deleted: item.deleted || false,
            dead: item.dead || false,
          }
        });

        results.stories.push({
          id: savedItem.id,
          title: savedItem.title,
          titleCn: savedItem.titleCn,
          translated: !!(titleCn || textCn)
        });

        results.processed++;
        if (titleCn || textCn) {
          results.translated++;
        }

        console.log(`Successfully processed story ${storyId}`);

        // 添加延迟以避免API限制
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        console.error(`Error processing story ${storyId}:`, error);
        results.errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${results.processed} stories, translated ${results.translated}, errors: ${results.errors}`,
      data: results
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

    // 调用GET方法进行定时抓取
    return GET(request);
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 