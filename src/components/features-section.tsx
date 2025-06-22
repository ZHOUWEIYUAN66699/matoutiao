import { Zap, Globe, Clock, Shield, Smartphone, Search } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "实时更新",
      description: "每5分钟自动同步 Hacker News 最新内容，确保您获得最及时的技术资讯和行业动态。我们的自动化系统24小时不间断工作，为中文开发者提供持续更新的优质内容。"
    },
    {
      icon: Globe,
      title: "AI智能翻译",
      description: "采用 OpenAI GPT-4o-mini 先进AI模型，提供高质量的中英文翻译服务。保持原文的技术准确性和表达风格，让中文开发者轻松理解复杂的技术概念和创新思路。"
    },
    {
      icon: Clock,
      title: "历史内容归档",
      description: "完整保存 Hacker News 历史内容，支持按时间、分类、热度等多维度浏览。建立了完善的内容索引系统，方便开发者查找和回顾重要的技术文章和讨论。"
    },
    {
      icon: Shield,
      title: "内容质量保证",
      description: "严格筛选高质量技术内容，过滤垃圾信息和重复内容。我们的算法会分析文章的技术深度、讨论热度和用户反馈，确保推荐给您的都是最有价值的技术资讯。"
    },
    {
      icon: Smartphone,
      title: "移动端优化",
      description: "完美适配手机、平板等移动设备，响应式设计确保在任何屏幕尺寸下都有出色的阅读体验。支持触摸手势操作，让您随时随地获取最新的技术资讯。"
    },
    {
      icon: Search,
      title: "智能分类",
      description: "将内容智能分类为热门、最新、最佳、问答、展示、招聘六大类别。每个分类都经过精心策划，帮助不同需求的开发者快速找到感兴趣的技术内容和职业机会。"
    }
  ];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              为什么选择 HackerNews 中文版？
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们致力于为中文开发者社区提供最优质的技术资讯服务，通过先进的AI翻译技术和精心设计的用户体验，
              让您轻松获取全球最新的技术动态、创业资讯和编程知识。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 