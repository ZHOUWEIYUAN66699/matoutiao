import { Code, Database, Brain, Smartphone, Cloud, Lock } from 'lucide-react';

export function TopicsSection() {
  const topics = [
    {
      icon: Code,
      title: "前端开发",
      description: "React、Vue、Angular、Next.js、TypeScript、JavaScript、CSS、HTML5、Webpack、Vite等前端技术",
      keywords: ["React 18", "Vue 3", "TypeScript", "Next.js", "Tailwind CSS", "前端框架", "JavaScript ES2024"]
    },
    {
      icon: Database,
      title: "后端架构",
      description: "Node.js、Python、Go、Rust、Java、微服务、数据库设计、API开发、系统架构等后端技术",
      keywords: ["微服务架构", "PostgreSQL", "Redis", "Docker", "Kubernetes", "GraphQL", "RESTful API"]
    },
    {
      icon: Brain,
      title: "人工智能",
      description: "机器学习、深度学习、ChatGPT、LLM、计算机视觉、自然语言处理、AI应用开发等AI技术",
      keywords: ["ChatGPT", "GPT-4", "机器学习", "深度学习", "TensorFlow", "PyTorch", "AI应用开发"]
    },
    {
      icon: Smartphone,
      title: "移动开发",
      description: "React Native、Flutter、Swift、Kotlin、iOS开发、Android开发、跨平台开发等移动技术",
      keywords: ["React Native", "Flutter", "iOS 17", "Android 14", "SwiftUI", "Kotlin", "移动应用"]
    },
    {
      icon: Cloud,
      title: "云计算DevOps",
      description: "AWS、Azure、Google Cloud、Docker、Kubernetes、CI/CD、监控、自动化部署等云技术",
      keywords: ["AWS", "Docker", "Kubernetes", "CI/CD", "DevOps", "云原生", "自动化部署"]
    },
    {
      icon: Lock,
      title: "网络安全",
      description: "网络安全、数据保护、加密技术、渗透测试、安全审计、隐私保护等安全技术",
      keywords: ["网络安全", "数据加密", "渗透测试", "HTTPS", "OAuth", "安全审计", "隐私保护"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              热门技术话题覆盖
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              HackerNews 中文版涵盖了当前最热门的技术领域和开发话题，
              从前端框架到人工智能，从移动开发到云计算，为中文开发者提供全方位的技术资讯和学习资源。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic, index) => {
              const IconComponent = topic.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 ml-3">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{topic.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {topic.keywords.map((keyword, keyIndex) => (
                        <span 
                          key={keyIndex} 
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
              我们的内容涵盖了从基础编程概念到最前沿技术趋势的各个方面。无论您是刚入门的新手开发者，
              还是经验丰富的技术专家，都能在这里找到有价值的技术文章、开源项目介绍、技术讨论和职业发展建议。
              我们特别关注中文开发者社区的需求，提供最贴近实际工作场景的技术内容翻译和整理。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 