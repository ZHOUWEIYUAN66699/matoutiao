'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExternalLink, Twitter } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Website name */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              <Image
                src="/logo.svg"
                alt="HackerNews 中文版 Logo"
                width={32}
                height={32}
                className="w-8 h-8"
                priority
              />
              <span className="hidden sm:inline">HackerNews 中文</span>
              <span className="sm:hidden">HN 中文</span>
            </Link>
          </div>
          
          {/* Right side - Links */}
          <nav className="flex items-center space-x-3">
            <Link 
              href="https://news.ycombinator.com" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <span className="hidden sm:inline">访问 HackerNews</span>
                <span className="sm:hidden">HN</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            
            <Link 
              href="https://x.com/decohack" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Twitter className="h-4 w-4 text-gray-600 hover:text-blue-500" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 