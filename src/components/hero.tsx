import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Zap, Globe, Clock } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            HackerNews 中文版
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            实时获取并翻译 Hacker News 内容，为中文开发者提供最新技术资讯
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="flex flex-col items-center p-4">
              <div className="bg-white/60 rounded-full p-3 mb-3">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">实时同步</h3>
              <p className="text-sm text-gray-600">自动获取 Hacker News 最新内容</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-white/60 rounded-full p-3 mb-3">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">智能翻译</h3>
              <p className="text-sm text-gray-600">AI 驱动的中文翻译，保持原意</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="bg-white/60 rounded-full p-3 mb-3">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">分类整理</h3>
              <p className="text-sm text-gray-600">热门、最新、问答等多个分类</p>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              开始浏览内容
            </Button>
            <Link href="https://news.ycombinator.com" target="_blank">
              <Button variant="outline" size="lg" className="flex items-center space-x-2">
                <span>访问原版 Hacker News</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {/* Description */}
          <p className="text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            Hacker News 是全球最受欢迎的技术社区之一，汇聚了来自世界各地的开发者、创业者和技术爱好者。
            本站将其内容翻译成中文，让更多中文用户能够轻松获取最新的技术资讯和行业动态。
          </p>
        </div>
      </div>
    </section>
  );
} 