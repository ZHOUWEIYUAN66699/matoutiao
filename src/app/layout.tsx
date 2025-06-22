import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "HackerNews 中文版 - 实时获取并翻译 Hacker News 内容",
    template: "%s | HackerNews 中文版"
  },
  description: "实时获取并翻译 Hacker News 内容，为中文开发者提供最新技术资讯。每5分钟自动更新，AI智能翻译，涵盖热门、最新、最佳、问答、展示、招聘六大分类。",
  keywords: [
    "Hacker News",
    "中文版",
    "技术资讯",
    "程序员",
    "开发者",
    "AI翻译",
    "科技新闻",
    "编程",
    "软件开发",
    "创业",
    "技术社区"
  ],
  authors: [{ name: "viggo", url: "https://x.com/decohack" }],
  creator: "viggo",
  publisher: "AlMaker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'), // 替换为实际域名
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com', // 替换为实际域名
    title: 'HackerNews 中文版 - 实时获取并翻译 Hacker News 内容',
    description: '实时获取并翻译 Hacker News 内容，为中文开发者提供最新技术资讯。每5分钟自动更新，AI智能翻译。',
    siteName: 'HackerNews 中文版',
    images: [
      {
        url: '/og.webp',
        width: 1200,
        height: 630,
        alt: 'HackerNews 中文版',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HackerNews 中文版 - 实时获取并翻译 Hacker News 内容',
    description: '实时获取并翻译 Hacker News 内容，为中文开发者提供最新技术资讯。每5分钟自动更新，AI智能翻译。',
    creator: '@decohack',
    images: ['/og.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 额外的SEO标签 */}
        <meta name="theme-color" content="#FF6600" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* 预连接到外部域名 */}
        <link rel="preconnect" href="https://news.ycombinator.com" />
        <link rel="preconnect" href="https://api.openai.com" />
        
        {/* DNS预取 */}
        <link rel="dns-prefetch" href="https://news.ycombinator.com" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
        
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "HackerNews 中文版",
              "url": "https://your-domain.com", // 替换为实际域名
              "description": "实时获取并翻译 Hacker News 内容，为中文开发者提供最新技术资讯",
              "inLanguage": "zh-CN",
              "author": {
                "@type": "Person",
                "name": "viggo",
                "url": "https://x.com/decohack"
              },
              "publisher": {
                "@type": "Organization",
                "name": "AlMaker",
                "url": "https://aimaker.dev"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
