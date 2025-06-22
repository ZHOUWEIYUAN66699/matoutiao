'use client';

import Link from 'next/link';
import { Twitter } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const lastUpdated = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-6">
        {/* Desktop: Single row layout */}
        <div className="hidden md:flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <p>© {currentYear} HackerNews 中文. All rights reserved.</p>
            <p>
              本站内容来源于 <Link href="https://news.ycombinator.com" target="_blank" className="hover:text-blue-500 underline">Hacker News</Link>，
              仅供学习交流使用
            </p>
            <p>
              <span className="text-black font-bold">Sponsored by</span> <Link href="https://aimaker.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-medium">AlMaker</Link>
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="https://x.com/decohack" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span>@viggo</span>
            </Link>
            <p className="text-xs text-gray-400">
              每5分钟自动更新 · 内容最后更新时间：{lastUpdated}
            </p>
          </div>
        </div>

        {/* Mobile: Centered layout */}
        <div className="md:hidden text-center space-y-3">
          <div className="flex items-center justify-center space-x-4">
            <p className="text-sm text-gray-500">© {currentYear} HackerNews 中文</p>
            <Link 
              href="https://x.com/decohack" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs text-gray-500">
              本站内容来源于 <Link href="https://news.ycombinator.com" target="_blank" className="hover:text-blue-500 underline">Hacker News</Link>，仅供学习交流使用
            </p>
            
            <div className="text-xs text-gray-500">
              <span className="text-black font-bold">Sponsored by</span> <Link href="https://aimaker.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline font-medium">AlMaker</Link> ◎ <span className="text-gray-400">每5分钟自动更新</span>
            </div>
            
            <p className="text-xs text-gray-400">
              内容最后更新时间：{lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 