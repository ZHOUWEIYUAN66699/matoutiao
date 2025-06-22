import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TranslationRequest {
  text: string;
  type: 'title' | 'content' | 'comment';
}

export interface TranslationResult {
  original: string;
  translated: string;
  success: boolean;
  error?: string;
}

class TranslationService {
  private model = 'gpt-4o-mini';
  
  private getSystemPrompt(type: 'title' | 'content' | 'comment'): string {
    const basePrompt = `你是一个专业的英中翻译专家，专门翻译HackerNews内容。请将以下英文内容翻译成中文，要求：
1. 保持原意准确，语言自然流畅
2. 技术术语保持专业性
3. 保留原文的语气和风格
4. 对于代码、链接、特殊格式请保持原样`;

    switch (type) {
      case 'title':
        return `${basePrompt}
5. 标题要简洁有力，吸引读者
6. 只返回翻译结果，不要添加任何解释`;
      case 'content':
        return `${basePrompt}
5. 内容翻译要完整，保持段落结构
6. 只返回翻译结果，不要添加任何解释`;
      case 'comment':
        return `${basePrompt}
5. 评论翻译要保持口语化特点
6. 只返回翻译结果，不要添加任何解释`;
      default:
        return basePrompt;
    }
  }

  async translateText(request: TranslationRequest): Promise<TranslationResult> {
    try {
      if (!request.text || request.text.trim().length === 0) {
        return {
          original: request.text,
          translated: '',
          success: false,
          error: 'Empty text provided'
        };
      }

      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(request.type)
          },
          {
            role: 'user',
            content: request.text
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      });

      const translated = response.choices[0]?.message?.content?.trim();
      
      if (!translated) {
        return {
          original: request.text,
          translated: '',
          success: false,
          error: 'No translation returned from OpenAI'
        };
      }

      return {
        original: request.text,
        translated,
        success: true
      };
    } catch (error: unknown) {
      console.error('Translation error:', error);
      return {
        original: request.text,
        translated: '',
        success: false,
        error: error instanceof Error ? error.message : 'Translation failed'
      };
    }
  }

  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResult[]> {
    const results: TranslationResult[] = [];
    
    // 批量处理，但添加延迟以避免API限制
    for (let i = 0; i < requests.length; i++) {
      const result = await this.translateText(requests[i]);
      results.push(result);
      
      // 添加延迟以避免触发速率限制
      if (i < requests.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
  }

  async translateHtml(html: string, type: 'content' | 'comment'): Promise<TranslationResult> {
    // 简单的HTML处理，保留基本标签
    const htmlTagRegex = /<[^>]+>/g;
    const tags: string[] = [];
    let processedText = html;
    
    // 提取HTML标签
    const matches = html.match(htmlTagRegex);
    if (matches) {
      matches.forEach((tag, index) => {
        const placeholder = `__HTML_TAG_${index}__`;
        tags.push(tag);
        processedText = processedText.replace(tag, placeholder);
      });
    }
    
    // 翻译文本
    const result = await this.translateText({
      text: processedText,
      type
    });
    
    if (result.success && tags.length > 0) {
      // 恢复HTML标签
      let translatedWithTags = result.translated;
      tags.forEach((tag, index) => {
        const placeholder = `__HTML_TAG_${index}__`;
        translatedWithTags = translatedWithTags.replace(placeholder, tag);
      });
      
      return {
        ...result,
        translated: translatedWithTags
      };
    }
    
    return result;
  }
}

export const translator = new TranslationService(); 