import { TrendingUp, Users, MessageCircle, Calendar } from 'lucide-react';

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      number: "10,000+",
      label: "技术文章",
      description: "已翻译并收录超过一万篇高质量技术文章，涵盖前端开发、后端架构、人工智能、区块链、创业投资等热门领域"
    },
    {
      icon: Users,
      number: "50,000+",
      label: "开发者用户",
      description: "服务全球中文开发者社区，包括来自中国大陆、台湾、香港、新加坡、美国、加拿大等地的程序员和技术爱好者"
    },
    {
      icon: MessageCircle,
      number: "100,000+",
      label: "技术讨论",
      description: "翻译了超过十万条技术讨论和评论，为中文开发者提供丰富的技术观点交流和问题解答参考"
    },
    {
      icon: Calendar,
      number: "24/7",
      label: "实时更新",
      description: "全天候自动化内容更新服务，确保您能够第一时间获取 Hacker News 上最新的技术资讯和行业动态"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              数据说话：我们的服务成果
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              自2024年上线以来，HackerNews 中文版已经成为中文技术社区重要的信息源，
              为数万名开发者提供了优质的技术内容翻译服务，建立了活跃的中文技术讨论社区。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{stat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 