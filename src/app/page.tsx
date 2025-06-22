import { Suspense } from 'react';
// import { prisma } from '@/lib/db';
import CategoryCard from '@/components/category-card';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Footer } from '@/components/footer';
import { FeaturesSection } from '@/components/features-section';
import { StatsSection } from '@/components/stats-section';
import { TopicsSection } from '@/components/topics-section';
import { FAQSection } from '@/components/faq-section';
import { Skeleton } from '@/components/ui/skeleton';
import { Flame, Zap, Star, HelpCircle, Rocket, Briefcase } from 'lucide-react';

// 模拟数据，每个分类显示更多内容
const mockStories = {
  top: [
    {
      id: 1,
      title: "OpenAI announces GPT-5 with revolutionary capabilities",
      titleCn: "OpenAI 发布具有革命性能力的 GPT-5",
      text: "OpenAI has unveiled GPT-5, marking a significant leap in AI capabilities...",
      textCn: "OpenAI 发布了 GPT-5，标志着 AI 能力的重大飞跃...",
      url: "https://openai.com/gpt-5",
      score: 1247,
      descendants: 342,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "sama",
      author: { username: "sama", karma: 15420 }
    },
    {
      id: 2,
      title: "Show HN: I built a tool to translate Hacker News to Chinese",
      titleCn: "展示 HN：我构建了一个将 Hacker News 翻译成中文的工具",
      text: null,
      textCn: null,
      url: "https://github.com/user/hn-chinese",
      score: 892,
      descendants: 156,
      time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "developer",
      author: { username: "developer", karma: 8934 }
    },
    {
      id: 8,
      title: "The Rise of Edge Computing in 2024",
      titleCn: "2024年边缘计算的崛起",
      text: "Edge computing is transforming how we process data...",
      textCn: "边缘计算正在改变我们处理数据的方式...",
      url: "https://techreview.com/edge-computing",
      score: 756,
      descendants: 198,
      time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "tech_analyst",
      author: { username: "tech_analyst", karma: 7654 }
    },
    {
      id: 14,
      title: "WebAssembly: The Future of Web Performance",
      titleCn: "WebAssembly：网络性能的未来",
      text: "How WASM is revolutionizing web applications...",
      textCn: "WASM 如何革新网络应用程序...",
      url: "https://webassembly.org/future",
      score: 634,
      descendants: 145,
      time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "wasm_dev",
      author: { username: "wasm_dev", karma: 5432 }
    },
    {
      id: 15,
      title: "The Complete Guide to Modern CSS Grid",
      titleCn: "现代 CSS Grid 完全指南",
      text: "Master the most powerful CSS layout system...",
      textCn: "掌握最强大的 CSS 布局系统...",
      url: "https://css-tricks.com/grid-guide",
      score: 523,
      descendants: 89,
      time: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "css_expert",
      author: { username: "css_expert", karma: 4321 }
    },
    {
      id: 16,
      title: "TypeScript 5.0: What's New and Exciting",
      titleCn: "TypeScript 5.0：新功能和亮点",
      text: "Exploring the latest features in TypeScript...",
      textCn: "探索 TypeScript 的最新功能...",
      url: "https://typescript.org/blog",
      score: 487,
      descendants: 112,
      time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "ts_dev",
      author: { username: "ts_dev", karma: 6789 }
    },
    {
      id: 17,
      title: "The State of JavaScript 2024",
      titleCn: "2024年 JavaScript 现状",
      text: "Annual survey results and trends...",
      textCn: "年度调查结果和趋势...",
      url: "https://stateofjs.com/2024",
      score: 445,
      descendants: 78,
      time: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "js_survey",
      author: { username: "js_survey", karma: 3456 }
    },
    {
      id: 18,
      title: "Building Scalable Microservices with Go",
      titleCn: "使用 Go 构建可扩展的微服务",
      text: "Best practices and architecture patterns...",
      textCn: "最佳实践和架构模式...",
      url: "https://golang.org/microservices",
      score: 398,
      descendants: 67,
      time: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "go_dev",
      author: { username: "go_dev", karma: 5678 }
    },
    {
      id: 49,
      title: "Rust for Web Development: A Complete Guide",
      titleCn: "Rust 网络开发完全指南",
      text: "Building fast and safe web applications with Rust...",
      textCn: "使用 Rust 构建快速安全的网络应用程序...",
      url: "https://rust-web.dev/guide",
      score: 356,
      descendants: 89,
      time: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "rust_web_dev",
      author: { username: "rust_web_dev", karma: 4567 }
    },
    {
      id: 50,
      title: "The Future of Frontend Development",
      titleCn: "前端开发的未来",
      text: "Trends and technologies shaping the future...",
      textCn: "塑造未来的趋势和技术...",
      url: "https://frontend-future.com",
      score: 312,
      descendants: 56,
      time: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "frontend_expert",
      author: { username: "frontend_expert", karma: 3456 }
    }
  ],
  new: [
    {
      id: 3,
      title: "Latest breakthrough in quantum computing",
      titleCn: "量子计算的最新突破",
      text: "Scientists at MIT have achieved a new milestone...",
      textCn: "麻省理工学院的科学家们取得了新的里程碑...",
      url: "https://news.mit.edu/quantum-breakthrough",
      score: 234,
      descendants: 67,
      time: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: "story",
      by: "scientist",
      author: { username: "scientist", karma: 5432 }
    },
    {
      id: 9,
      title: "New JavaScript framework promises 10x performance",
      titleCn: "新的 JavaScript 框架承诺提升10倍性能",
      text: "A revolutionary approach to frontend development...",
      textCn: "前端开发的革命性方法...",
      url: "https://newjs.dev",
      score: 445,
      descendants: 123,
      time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "js_dev",
      author: { username: "js_dev", karma: 3456 }
    },
    {
      id: 19,
      title: "Introducing the Next Generation of React",
      titleCn: "介绍下一代 React",
      text: "React 19 brings unprecedented performance...",
      textCn: "React 19 带来前所未有的性能...",
      url: "https://react.dev/blog/react-19",
      score: 567,
      descendants: 234,
      time: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      type: "story",
      by: "react_team",
      author: { username: "react_team", karma: 9876 }
    },
    {
      id: 20,
      title: "Vue 4.0 Alpha Release",
      titleCn: "Vue 4.0 Alpha 版本发布",
      text: "The future of Vue.js is here...",
      textCn: "Vue.js 的未来已经到来...",
      url: "https://vuejs.org/blog/vue-4-alpha",
      score: 345,
      descendants: 89,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "vue_dev",
      author: { username: "vue_dev", karma: 6543 }
    },
    {
      id: 21,
      title: "Deno 2.0: The Complete Runtime",
      titleCn: "Deno 2.0：完整的运行时",
      text: "Secure by default, TypeScript support...",
      textCn: "默认安全，TypeScript 支持...",
      url: "https://deno.land/blog/deno-2",
      score: 278,
      descendants: 56,
      time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "deno_dev",
      author: { username: "deno_dev", karma: 4321 }
    },
    {
      id: 22,
      title: "Bun 2.0: Lightning Fast JavaScript Runtime",
      titleCn: "Bun 2.0：闪电般快速的 JavaScript 运行时",
      text: "Performance benchmarks and new features...",
      textCn: "性能基准测试和新功能...",
      url: "https://bun.sh/blog/bun-2",
      score: 312,
      descendants: 78,
      time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "bun_dev",
      author: { username: "bun_dev", karma: 3456 }
    },
    {
      id: 23,
      title: "Svelte 5: The New Compiler",
      titleCn: "Svelte 5：新的编译器",
      text: "Runes, signals, and the future of Svelte...",
      textCn: "Runes、signals 和 Svelte 的未来...",
      url: "https://svelte.dev/blog/svelte-5",
      score: 289,
      descendants: 67,
      time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "svelte_dev",
      author: { username: "svelte_dev", karma: 5678 }
    },
    {
      id: 24,
      title: "SolidJS 2.0: The Reactive Framework",
      titleCn: "SolidJS 2.0：响应式框架",
      text: "Building reactive UIs with fine-grained reactivity...",
      textCn: "使用细粒度响应式构建响应式 UI...",
      url: "https://solidjs.com/blog/solid-2",
      score: 234,
      descendants: 45,
      time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "solid_dev",
      author: { username: "solid_dev", karma: 4567 }
    },
    {
      id: 51,
      title: "Next.js 15: The App Router Revolution",
      titleCn: "Next.js 15：App Router 革命",
      text: "New routing system and performance improvements...",
      textCn: "新的路由系统和性能改进...",
      url: "https://nextjs.org/blog/next-15",
      score: 198,
      descendants: 34,
      time: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "nextjs_dev",
      author: { username: "nextjs_dev", karma: 6789 }
    },
    {
      id: 52,
      title: "Vite 5.0: The Build Tool Evolution",
      titleCn: "Vite 5.0：构建工具的演进",
      text: "Faster builds and better developer experience...",
      textCn: "更快的构建和更好的开发体验...",
      url: "https://vitejs.dev/blog/vite-5",
      score: 167,
      descendants: 23,
      time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "vite_dev",
      author: { username: "vite_dev", karma: 5432 }
    }
  ],
  best: [
    {
      id: 4,
      title: "The future of web development in 2024",
      titleCn: "2024年网络开发的未来",
      text: "A comprehensive analysis of emerging trends...",
      textCn: "对新兴趋势的全面分析...",
      url: "https://webdev.com/future-2024",
      score: 2156,
      descendants: 445,
      time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "webdev_expert",
      author: { username: "webdev_expert", karma: 12876 }
    },
    {
      id: 10,
      title: "Why Rust is becoming the language of choice for system programming",
      titleCn: "为什么 Rust 正在成为系统编程的首选语言",
      text: "Memory safety without garbage collection...",
      textCn: "无垃圾回收的内存安全...",
      url: "https://rust-lang.org/blog",
      score: 1834,
      descendants: 367,
      time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "rust_dev",
      author: { username: "rust_dev", karma: 9876 }
    },
    {
      id: 25,
      title: "The Art of Clean Code: Lessons from 20 Years of Programming",
      titleCn: "清洁代码的艺术：20年编程经验教训",
      text: "Principles and practices for writing maintainable code...",
      textCn: "编写可维护代码的原则和实践...",
      url: "https://cleancode.com/art",
      score: 1678,
      descendants: 289,
      time: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "clean_coder",
      author: { username: "clean_coder", karma: 11234 }
    },
    {
      id: 26,
      title: "Design Patterns: 25 Years Later",
      titleCn: "设计模式：25年后",
      text: "How design patterns have evolved in modern software...",
      textCn: "设计模式在现代软件中的演变...",
      url: "https://patterns.com/evolution",
      score: 1456,
      descendants: 234,
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "pattern_expert",
      author: { username: "pattern_expert", karma: 9876 }
    },
    {
      id: 27,
      title: "The Psychology of Programming",
      titleCn: "编程心理学",
      text: "Understanding how developers think and work...",
      textCn: "理解开发者如何思考和工作...",
      url: "https://psychology.dev/thinking",
      score: 1234,
      descendants: 198,
      time: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "psych_dev",
      author: { username: "psych_dev", karma: 8765 }
    },
    {
      id: 28,
      title: "Building High-Performance Web Applications",
      titleCn: "构建高性能网络应用程序",
      text: "Techniques and strategies for optimal performance...",
      textCn: "最佳性能的技术和策略...",
      url: "https://performance.dev/guide",
      score: 1123,
      descendants: 167,
      time: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "perf_expert",
      author: { username: "perf_expert", karma: 7654 }
    },
    {
      id: 29,
      title: "The Evolution of Software Architecture",
      titleCn: "软件架构的演变",
      text: "From monoliths to microservices to serverless...",
      textCn: "从单体到微服务到无服务器...",
      url: "https://architecture.com/evolution",
      score: 987,
      descendants: 145,
      time: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "arch_expert",
      author: { username: "arch_expert", karma: 6543 }
    },
    {
      id: 30,
      title: "The Future of Database Technology",
      titleCn: "数据库技术的未来",
      text: "NewSQL, NoSQL, and beyond...",
      textCn: "NewSQL、NoSQL 及更多...",
      url: "https://database.com/future",
      score: 876,
      descendants: 123,
      time: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "db_expert",
      author: { username: "db_expert", karma: 5432 }
    },
    {
      id: 53,
      title: "Advanced React Patterns for 2024",
      titleCn: "2024年高级 React 模式",
      text: "Modern patterns for building scalable React apps...",
      textCn: "构建可扩展 React 应用的现代模式...",
      url: "https://react-patterns.com/2024",
      score: 754,
      descendants: 98,
      time: new Date(Date.now() - 54 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "react_patterns",
      author: { username: "react_patterns", karma: 4321 }
    },
    {
      id: 54,
      title: "The Complete Guide to GraphQL",
      titleCn: "GraphQL 完全指南",
      text: "Everything you need to know about GraphQL...",
      textCn: "你需要了解的关于 GraphQL 的一切...",
      url: "https://graphql-guide.com",
      score: 632,
      descendants: 87,
      time: new Date(Date.now() - 60 * 60 * 60 * 1000).toISOString(),
      type: "story",
      by: "graphql_expert",
      author: { username: "graphql_expert", karma: 3456 }
    }
  ],
  ask: [
    {
      id: 5,
      title: "Ask HN: What's the best way to learn machine learning in 2024?",
      titleCn: "问 HN：2024年学习机器学习的最佳方式是什么？",
      text: "I'm a software developer looking to transition into ML...",
      textCn: "我是一名软件开发者，希望转向机器学习领域...",
      url: null,
      score: 567,
      descendants: 234,
      time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "learner",
      author: { username: "learner", karma: 2341 }
    },
    {
      id: 11,
      title: "Ask HN: How do you handle technical debt in large codebases?",
      titleCn: "问 HN：如何处理大型代码库中的技术债务？",
      text: "Our team is struggling with legacy code...",
      textCn: "我们团队正在与遗留代码作斗争...",
      url: null,
      score: 423,
      descendants: 156,
      time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "tech_lead",
      author: { username: "tech_lead", karma: 4567 }
    },
    {
      id: 31,
      title: "Ask HN: What's your experience with remote work?",
      titleCn: "问 HN：你对远程工作有什么经验？",
      text: "Looking for insights on productivity and work-life balance...",
      textCn: "寻找关于生产力和工作生活平衡的见解...",
      url: null,
      score: 345,
      descendants: 189,
      time: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "remote_worker",
      author: { username: "remote_worker", karma: 3456 }
    },
    {
      id: 32,
      title: "Ask HN: How do you stay motivated on long-term projects?",
      titleCn: "问 HN：如何在长期项目中保持动力？",
      text: "I'm working on a project that will take months to complete...",
      textCn: "我正在做一个需要几个月才能完成的项目...",
      url: null,
      score: 298,
      descendants: 134,
      time: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "long_term_dev",
      author: { username: "long_term_dev", karma: 2345 }
    },
    {
      id: 33,
      title: "Ask HN: What's the best way to learn a new programming language?",
      titleCn: "问 HN：学习新编程语言的最佳方式是什么？",
      text: "I want to learn Go but don't know where to start...",
      textCn: "我想学习 Go 但不知道从哪里开始...",
      url: null,
      score: 267,
      descendants: 98,
      time: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "language_learner",
      author: { username: "language_learner", karma: 1234 }
    },
    {
      id: 34,
      title: "Ask HN: How do you manage your personal knowledge base?",
      titleCn: "问 HN：你如何管理个人知识库？",
      text: "Looking for tools and strategies for organizing notes...",
      textCn: "寻找组织笔记的工具和策略...",
      url: null,
      score: 234,
      descendants: 87,
      time: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "knowledge_seeker",
      author: { username: "knowledge_seeker", karma: 3456 }
    },
    {
      id: 35,
      title: "Ask HN: What's your experience with microservices vs monoliths?",
      titleCn: "问 HN：你对微服务 vs 单体架构有什么经验？",
      text: "Debating whether to break up our monolithic application...",
      textCn: "正在讨论是否要拆分我们的单体应用程序...",
      url: null,
      score: 198,
      descendants: 76,
      time: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "architect",
      author: { username: "architect", karma: 5678 }
    },
    {
      id: 36,
      title: "Ask HN: How do you handle imposter syndrome?",
      titleCn: "问 HN：你如何处理冒名顶替综合症？",
      text: "Feeling like I don't belong in the tech industry...",
      textCn: "感觉我不属于科技行业...",
      url: null,
      score: 167,
      descendants: 65,
      time: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "imposter",
      author: { username: "imposter", karma: 2345 }
    },
    {
      id: 55,
      title: "Ask HN: What's your favorite development workflow?",
      titleCn: "问 HN：你最喜欢的开发工作流程是什么？",
      text: "Looking for efficient ways to organize my development process...",
      textCn: "寻找组织开发流程的高效方法...",
      url: null,
      score: 145,
      descendants: 54,
      time: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "workflow_seeker",
      author: { username: "workflow_seeker", karma: 1234 }
    },
    {
      id: 56,
      title: "Ask HN: How do you debug complex distributed systems?",
      titleCn: "问 HN：如何调试复杂的分布式系统？",
      text: "Our microservices architecture is becoming hard to debug...",
      textCn: "我们的微服务架构变得难以调试...",
      url: null,
      score: 123,
      descendants: 43,
      time: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
      type: "ask",
      by: "distributed_dev",
      author: { username: "distributed_dev", karma: 3456 }
    }
  ],
  show: [
    {
      id: 6,
      title: "Show HN: Real-time collaborative code editor",
      titleCn: "展示 HN：实时协作代码编辑器",
      text: "Built with WebRTC and operational transforms...",
      textCn: "使用 WebRTC 和操作转换构建...",
      url: "https://collab-editor.com",
      score: 789,
      descendants: 123,
      time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "maker",
      author: { username: "maker", karma: 6789 }
    },
    {
      id: 12,
      title: "Show HN: AI-powered code review tool",
      titleCn: "展示 HN：AI 驱动的代码审查工具",
      text: "Automatically detects bugs and suggests improvements...",
      textCn: "自动检测错误并建议改进...",
      url: "https://ai-code-review.com",
      score: 645,
      descendants: 89,
      time: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "ai_dev",
      author: { username: "ai_dev", karma: 5432 }
    },
    {
      id: 37,
      title: "Show HN: I built a privacy-focused search engine",
      titleCn: "展示 HN：我构建了一个注重隐私的搜索引擎",
      text: "No tracking, no ads, just search results...",
      textCn: "无跟踪、无广告，只有搜索结果...",
      url: "https://privacy-search.com",
      score: 523,
      descendants: 78,
      time: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "privacy_dev",
      author: { username: "privacy_dev", karma: 4567 }
    },
    {
      id: 38,
      title: "Show HN: A tool to visualize your GitHub contributions",
      titleCn: "展示 HN：可视化你的 GitHub 贡献的工具",
      text: "Beautiful charts and insights about your coding activity...",
      textCn: "关于你编码活动的精美图表和见解...",
      url: "https://github-viz.com",
      score: 456,
      descendants: 67,
      time: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "viz_dev",
      author: { username: "viz_dev", karma: 3456 }
    },
    {
      id: 39,
      title: "Show HN: I created a minimalist note-taking app",
      titleCn: "展示 HN：我创建了一个极简笔记应用",
      text: "Markdown support, cloud sync, and distraction-free writing...",
      textCn: "Markdown 支持、云同步和无干扰写作...",
      url: "https://minimal-notes.com",
      score: 398,
      descendants: 56,
      time: new Date(Date.now() - 13 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "note_dev",
      author: { username: "note_dev", karma: 2345 }
    },
    {
      id: 40,
      title: "Show HN: A browser extension to block tracking",
      titleCn: "展示 HN：一个阻止跟踪的浏览器扩展",
      text: "Protect your privacy while browsing the web...",
      textCn: "在浏览网页时保护你的隐私...",
      url: "https://tracker-blocker.com",
      score: 345,
      descendants: 45,
      time: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "security_dev",
      author: { username: "security_dev", karma: 5678 }
    },
    {
      id: 41,
      title: "Show HN: I built a tool to analyze your reading habits",
      titleCn: "展示 HN：我构建了一个分析你阅读习惯的工具",
      text: "Track what you read and get insights about your preferences...",
      textCn: "跟踪你阅读的内容并了解你的偏好...",
      url: "https://reading-analytics.com",
      score: 289,
      descendants: 34,
      time: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "reading_dev",
      author: { username: "reading_dev", karma: 3456 }
    },
    {
      id: 42,
      title: "Show HN: A platform for indie game developers",
      titleCn: "展示 HN：独立游戏开发者平台",
      text: "Showcase your games and connect with other developers...",
      textCn: "展示你的游戏并与其他开发者联系...",
      url: "https://indie-games.dev",
      score: 234,
      descendants: 23,
      time: new Date(Date.now() - 19 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "game_dev",
      author: { username: "game_dev", karma: 4567 }
    },
    {
      id: 57,
      title: "Show HN: I built a tool to monitor website performance",
      titleCn: "展示 HN：我构建了一个监控网站性能的工具",
      text: "Real-time monitoring with beautiful dashboards...",
      textCn: "实时监控和漂亮的仪表板...",
      url: "https://perf-monitor.com",
      score: 198,
      descendants: 32,
      time: new Date(Date.now() - 21 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "perf_monitor_dev",
      author: { username: "perf_monitor_dev", karma: 2345 }
    },
    {
      id: 58,
      title: "Show HN: A markdown editor with live preview",
      titleCn: "展示 HN：带实时预览的 Markdown 编辑器",
      text: "Clean interface and powerful editing features...",
      textCn: "简洁界面和强大的编辑功能...",
      url: "https://md-editor.com",
      score: 167,
      descendants: 21,
      time: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
      type: "show",
      by: "md_editor_dev",
      author: { username: "md_editor_dev", karma: 1234 }
    }
  ],
  job: [
    {
      id: 7,
      title: "Senior Full Stack Developer at OpenAI (Remote)",
      titleCn: "OpenAI 高级全栈开发工程师（远程）",
      text: "Join our team building the future of AI...",
      textCn: "加入我们的团队，构建人工智能的未来...",
      url: "https://openai.com/careers",
      score: 345,
      descendants: 89,
      time: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "openai_hr",
      author: { username: "openai_hr", karma: 1234 }
    },
    {
      id: 13,
      title: "Frontend Engineer at Vercel (San Francisco)",
      titleCn: "Vercel 前端工程师（旧金山）",
      text: "Build the next generation of web development tools...",
      textCn: "构建下一代网络开发工具...",
      url: "https://vercel.com/careers",
      score: 234,
      descendants: 45,
      time: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "vercel_hr",
      author: { username: "vercel_hr", karma: 987 }
    },
    {
      id: 43,
      title: "Machine Learning Engineer at Google (Mountain View)",
      titleCn: "Google 机器学习工程师（山景城）",
      text: "Work on cutting-edge AI research and development...",
      textCn: "从事前沿 AI 研究和开发...",
      url: "https://google.com/careers/ml",
      score: 298,
      descendants: 67,
      time: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "google_hr",
      author: { username: "google_hr", karma: 2345 }
    },
    {
      id: 44,
      title: "DevOps Engineer at Netflix (Los Gatos)",
      titleCn: "Netflix DevOps 工程师（洛斯加托斯）",
      text: "Scale our infrastructure to serve millions of users...",
      textCn: "扩展我们的基础设施以服务数百万用户...",
      url: "https://netflix.com/careers/devops",
      score: 267,
      descendants: 56,
      time: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "netflix_hr",
      author: { username: "netflix_hr", karma: 3456 }
    },
    {
      id: 45,
      title: "Security Engineer at Stripe (San Francisco)",
      titleCn: "Stripe 安全工程师（旧金山）",
      text: "Protect our platform and customers from threats...",
      textCn: "保护我们的平台和客户免受威胁...",
      url: "https://stripe.com/careers/security",
      score: 245,
      descendants: 45,
      time: new Date(Date.now() - 16 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "stripe_hr",
      author: { username: "stripe_hr", karma: 4567 }
    },
    {
      id: 46,
      title: "Data Scientist at Airbnb (San Francisco)",
      titleCn: "Airbnb 数据科学家（旧金山）",
      text: "Analyze data to improve user experience...",
      textCn: "分析数据以改善用户体验...",
      url: "https://airbnb.com/careers/data",
      score: 223,
      descendants: 34,
      time: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "airbnb_hr",
      author: { username: "airbnb_hr", karma: 5678 }
    },
    {
      id: 47,
      title: "Mobile Developer at Uber (San Francisco)",
      titleCn: "Uber 移动开发工程师（旧金山）",
      text: "Build apps that millions of people use daily...",
      textCn: "构建数百万人日常使用的应用程序...",
      url: "https://uber.com/careers/mobile",
      score: 198,
      descendants: 23,
      time: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "uber_hr",
      author: { username: "uber_hr", karma: 6789 }
    },
    {
      id: 48,
      title: "Product Manager at Slack (San Francisco)",
      titleCn: "Slack 产品经理（旧金山）",
      text: "Shape the future of workplace communication...",
      textCn: "塑造工作场所沟通的未来...",
      url: "https://slack.com/careers/product",
      score: 176,
      descendants: 12,
      time: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "slack_hr",
      author: { username: "slack_hr", karma: 7890 }
    },
    {
      id: 59,
      title: "Backend Engineer at Discord (San Francisco)",
      titleCn: "Discord 后端工程师（旧金山）",
      text: "Build systems that connect millions of users...",
      textCn: "构建连接数百万用户的系统...",
      url: "https://discord.com/careers/backend",
      score: 154,
      descendants: 18,
      time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "discord_hr",
      author: { username: "discord_hr", karma: 6789 }
    },
    {
      id: 60,
      title: "iOS Developer at Spotify (Stockholm)",
      titleCn: "Spotify iOS 开发工程师（斯德哥尔摩）",
      text: "Create the best music experience on mobile...",
      textCn: "在移动端创造最佳音乐体验...",
      url: "https://spotify.com/careers/ios",
      score: 132,
      descendants: 15,
      time: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      type: "job",
      by: "spotify_hr",
      author: { username: "spotify_hr", karma: 5678 }
    }
  ]
};

async function getAllStories() {
  // 模拟异步延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  return mockStories;
  
  /* 数据库查询代码（等配置好数据库后启用）
  try {
    const stories = await prisma.hnItem.findMany({
      where: {
        deleted: false,
        dead: false,
        OR: [
          { type: 'story' },
          { type: 'ask' },
          { type: 'show' },
          { type: 'job' }
        ]
      },
      include: {
        author: true
      },
      orderBy: [
        { score: 'desc' },
        { time: 'desc' }
      ],
      take: 100
    });

    // 按类型分组
    const groupedStories = {
      top: stories.filter(s => s.type === 'story').slice(0, 10),
      new: stories.slice(0, 10),
      best: stories.filter(s => s.score > 100).slice(0, 10),
      ask: stories.filter(s => s.type === 'ask').slice(0, 10),
      show: stories.filter(s => s.type === 'show').slice(0, 10),
      job: stories.filter(s => s.type === 'job').slice(0, 10)
    };

    return groupedStories;
  } catch (error) {
    console.error('Error fetching stories:', error);
    return mockStories;
  }
  */
}

export default async function Home() {
  const allStories = await getAllStories();

  const categories = [
    { 
      key: 'top', 
      name: '热门', 
      description: '最近24小时最受欢迎的技术文章和讨论', 
      icon: 'Flame',
      stories: allStories.top
    },
    { 
      key: 'new', 
      name: '最新', 
      description: '最新发布的内容', 
      icon: 'Zap',
      stories: allStories.new
    },
    { 
      key: 'best', 
      name: '最佳', 
      description: '历史最佳内容精选', 
      icon: 'Star',
      stories: allStories.best
    },
    { 
      key: 'ask', 
      name: '问答', 
      description: '技术问题和经验分享', 
      icon: 'HelpCircle',
      stories: allStories.ask
    },
    { 
      key: 'show', 
      name: '展示', 
      description: '开发者项目展示', 
      icon: 'Rocket',
      stories: allStories.show
    },
    { 
      key: 'job', 
      name: '招聘', 
      description: '技术岗位招聘信息', 
      icon: 'Briefcase',
      stories: allStories.job
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20">
        <Hero />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Suspense key={category.key} fallback={<CategoryCardSkeleton />}>
                  <CategoryCard 
                    category={category}
                  />
                </Suspense>
              ))}
            </div>
          </div>
        </main>
        
        {/* SEO Content Sections */}
        <FeaturesSection />
        <StatsSection />
        <TopicsSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Skeleton className="h-8 w-8 rounded" />
        <div>
          <Skeleton className="h-6 w-16 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-b pb-3 last:border-b-0">
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}
