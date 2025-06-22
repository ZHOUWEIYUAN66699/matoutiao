'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ExternalLink, MessageCircle, User, Clock, TrendingUp } from 'lucide-react';

interface Story {
  id: number;
  title: string | null;
  titleCn: string | null;
  text: string | null;
  textCn: string | null;
  url: string | null;
  score: number;
  descendants: number;
  time: Date;
  type: string;
  by: string | null;
  author?: {
    username: string;
    karma: number;
  } | null;
}

interface StoryListProps {
  stories: Story[];
}

export function StoryList({ stories }: StoryListProps) {
  const getStoryTypeLabel = (type: string) => {
    switch (type) {
      case 'ask':
        return '问答';
      case 'show':
        return '展示';
      case 'job':
        return '招聘';
      case 'poll':
        return '投票';
      default:
        return '故事';
    }
  };

  const getStoryTypeColor = (type: string) => {
    switch (type) {
      case 'ask':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'show':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'job':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'poll':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const extractDomain = (url: string | null) => {
    if (!url) return null;
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-4">
      {stories.map((story, index) => (
        <Card key={story.id} className="transition-shadow hover:shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-muted-foreground">
                  #{index + 1}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getStoryTypeColor(story.type)}`}
                >
                  {getStoryTypeLabel(story.type)}
                </Badge>
                {story.url && (
                  <span className="text-xs text-muted-foreground">
                    ({extractDomain(story.url)})
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{story.score}</span>
                </div>
                {story.descendants > 0 && (
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{story.descendants}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold leading-tight">
                {story.url ? (
                  <Link 
                    href={story.url} 
                    target="_blank"
                    className="text-foreground hover:text-primary transition-colors flex items-start space-x-2 group"
                  >
                    <span>{story.titleCn || story.title}</span>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                  </Link>
                ) : (
                  <Link 
                    href={`/item/${story.id}`}
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    {story.titleCn || story.title}
                  </Link>
                )}
              </h2>

              {story.title && story.titleCn && story.title !== story.titleCn && (
                <p className="text-sm text-muted-foreground italic">
                  原标题: {story.title}
                </p>
              )}

              {(story.textCn || story.text) && (
                <div className="text-sm text-muted-foreground mt-2">
                  <p className="line-clamp-3">
                    {story.textCn || story.text}
                  </p>
                </div>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                {story.by && (
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{story.by}</span>
                    {story.author && (
                      <span className="text-muted-foreground/70">
                        ({story.author.karma} karma)
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {formatDistanceToNow(new Date(story.time), { 
                      addSuffix: true, 
                      locale: zhCN 
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link 
                  href={`/item/${story.id}`}
                  className="hover:text-foreground transition-colors"
                >
                  查看详情
                </Link>
                <Separator orientation="vertical" className="h-3" />
                <Link 
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  className="hover:text-foreground transition-colors flex items-center space-x-1"
                >
                  <span>原文</span>
                  <ExternalLink className="h-2 w-2" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 