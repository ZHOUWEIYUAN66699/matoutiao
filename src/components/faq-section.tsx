'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "HackerNews 中文版的内容更新频率是多少？",
      answer: "我们每5分钟自动同步一次 Hacker News 的最新内容，包括热门文章、最新发布、技术讨论等。通过 Vercel 的 Cron Jobs 定时任务，确保您能够第一时间获取到最新的技术资讯和行业动态。我们的自动化系统24小时不间断运行，为中文开发者提供持续更新的优质内容。"
    },
    {
      question: "AI翻译的质量如何？会不会有技术术语翻译错误？",
      answer: "我们使用 OpenAI 的 GPT-4o-mini 模型进行翻译，这是目前最先进的AI翻译技术之一。我们特别针对技术内容进行了优化，能够准确理解编程语言、框架名称、技术概念等专业术语。翻译过程中会保持原文的技术准确性和表达风格，同时让中文表达更加自然流畅。对于复杂的技术概念，我们会保留英文原文以供参考。"
    },
    {
      question: "网站支持哪些设备和浏览器？",
      answer: "HackerNews 中文版采用响应式设计，完美支持桌面电脑、笔记本、平板电脑、手机等各种设备。我们支持所有主流浏览器，包括 Chrome、Firefox、Safari、Edge 等。移动端经过特别优化，支持触摸手势操作，确保在任何屏幕尺寸下都有出色的阅读体验。同时支持 PWA（渐进式Web应用），可以像原生应用一样安装到设备主屏幕。"
    },
    {
      question: "如何找到特定类型的技术内容？",
      answer: "我们将内容智能分类为六大类别：热门（最受关注的技术文章）、最新（刚发布的内容）、最佳（历史高质量文章）、问答（技术问题讨论）、展示（开发者项目展示）、招聘（技术岗位信息）。每个分类都支持分页浏览，您可以根据兴趣选择相应分类。我们还提供了完善的搜索和筛选功能，帮助您快速找到感兴趣的技术内容。"
    },
    {
      question: "网站的数据来源是什么？内容是否可靠？",
      answer: "我们的所有内容都来源于 Hacker News 官方 API，这是全球最权威的技术社区之一。Hacker News 由 Y Combinator 创办，汇聚了来自世界各地的顶级开发者、创业者、投资人和技术专家。我们只是将这些高质量的英文内容翻译成中文，不添加任何主观内容。每篇文章都保留了原文链接，您可以随时查看英文原版进行对比。"
    },
    {
      question: "是否可以离线阅读？有没有移动应用？",
      answer: "目前我们提供基于浏览器的 PWA（渐进式Web应用）体验，支持离线缓存已浏览的内容。您可以将网站添加到手机主屏幕，获得类似原生应用的使用体验。我们正在考虑开发独立的移动应用，但目前的 PWA 版本已经能够满足大部分移动端使用需求，包括推送通知、离线阅读等功能。"
    },
    {
      question: "如何获取最新的技术趋势和热门话题？",
      answer: "建议您关注我们的热门和最新分类，这里汇集了当前最受关注的技术文章和讨论。我们的算法会根据文章的评分、评论数、发布时间等因素来判断内容的热度和重要性。您还可以关注展示分类了解最新的开源项目和技术创新，问答分类则能帮您了解开发者社区正在讨论的技术问题和解决方案。"
    },
    {
      question: "网站是免费使用的吗？有没有付费功能？",
      answer: "HackerNews 中文版完全免费使用，我们致力于为中文开发者社区提供公益性的技术资讯服务。所有的翻译内容、分类浏览、搜索功能都是免费的。网站运营成本由 AlMaker 赞助支持，我们不会收取任何费用，也不会在内容中插入广告。我们的目标是建立一个纯净、高质量的中文技术资讯平台。"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <HelpCircle className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              常见问题解答
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              以下是用户最关心的问题和详细解答，帮助您更好地了解和使用 HackerNews 中文版。
              如果您有其他问题，欢迎通过 Twitter 联系我们。
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 