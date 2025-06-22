'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Eye,
  TrendingUp,
  MessageCircle,
  User,
  Clock,
  Flame,
  Zap,
  Star,
  HelpCircle,
  Rocket,
  Briefcase
} from 'lucide-react';

interface Story {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  time: string;
  descendants?: number;
}

interface Category {
  key: string;
  name: string;
  description: string;
  icon: string;
  stories: Story[];
}

interface CategoryCardProps {
  category: Category;
}

const iconMap = {
  Flame,
  Zap,
  Star,
  HelpCircle,
  Rocket,
  Briefcase
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(category.stories.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStories = category.stories.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const extractDomain = (url: string | undefined) => {
    if (!url) return null;
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return null;
    }
  };

  const formatTimeAgo = (timeString: string) => {
    try {
      const now = new Date();
      const time = new Date(timeString);
      const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
      
      if (diffInMinutes < 60) {
        return `${diffInMinutes}分钟前`;
      } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours}小时前`;
      } else {
        const days = Math.floor(diffInMinutes / 1440);
        return `${days}天前`;
      }
    } catch {
      return '未知时间';
    }
  };

  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Flame;

  return (
    <Card className="h-[650px] flex flex-col overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <IconComponent className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {category.name}
              </CardTitle>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                {category.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link href={`/category/${category.key}`}>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 hover:bg-white/50 dark:hover:bg-gray-800/50">
                <Eye className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{category.stories.length} 条内容</span>
          {totalPages > 1 && (
            <span>第 {currentPage} / {totalPages} 页</span>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4">
        <div className="flex-1 space-y-3">
          {currentStories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-sm">暂无内容</p>
            </div>
          ) : (
            currentStories.map((story, index) => (
              <div key={story.id} className="border-b border-gray-100 dark:border-gray-800 pb-3 last:border-b-0 last:pb-0">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                      #{startIndex + index + 1}
                    </span>
                    {story.url && (
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        ({extractDomain(story.url)})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 dark:text-gray-500">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{story.score}</span>
                    </div>
                    {story.descendants !== undefined && (
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{story.descendants}</span>
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-sm font-medium leading-tight mb-1.5 line-clamp-2 text-gray-900 dark:text-gray-100">
                  {story.url ? (
                    <Link 
                      href={story.url} 
                      target="_blank"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                    >
                      {story.title}
                      <ExternalLink className="h-3 w-3 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ) : (
                    <Link 
                      href={`/item/${story.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {story.title}
                    </Link>
                  )}
                </h3>

                <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                  <div className="flex items-center space-x-2">
                    {story.by && (
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{story.by}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(story.time)}</span>
                    </div>
                  </div>
                  
                  <Link 
                    href={`https://news.ycombinator.com/item?id=${story.id}`}
                    target="_blank"
                    className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    原文
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 分页控制 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 h-7 text-xs"
            >
              <ChevronLeft className="h-3 w-3" />
              <span>上一页</span>
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(index + 1)}
                  className="h-6 w-6 p-0 text-xs"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 h-7 text-xs"
            >
              <span>下一页</span>
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        )}

        {/* 查看更多按钮 */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <Link href={`/category/${category.key}`}>
            <Button variant="outline" className="w-full h-8 text-xs" size="sm">
              查看更多 {category.name} 内容
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard; 