import { browser } from '$app/environment';
import { writable, get, derived } from 'svelte/store';
import type { Language, Translation } from '$lib/types/i18n';
import { translations } from './translations';

// 创建语言store
export const currentLanguage = writable<Language>('zh-CN');

// 创建响应式的翻译store
export const currentTranslation = derived(
  currentLanguage,
  ($currentLanguage) => translations[$currentLanguage]
);

// 获取翻译函数 - 现在是响应式的
export function t(key: string): string {
  const language = get(currentLanguage);
  const translation = translations[language];
  
  if (!translation) {
    console.warn(`Translation not found for language: ${language}`);
    return key;
  }
  
  const keys = key.split('.');
  let result: any = translation;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }
  
  return result || key;
}

// 创建响应式翻译函数，可以在模板中直接使用
export const tr = derived(
  currentLanguage,
  ($currentLanguage) => {
    return function(key: string): string {
      const translation = translations[$currentLanguage];
      
      if (!translation) {
        console.warn(`Translation not found for language: ${$currentLanguage}`);
        return key;
      }
      
      const keys = key.split('.');
      let result: any = translation;
      
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }
      
      return result || key;
    };
  }
);

// 获取当前语言
export function getLanguage(): Language {
  return get(currentLanguage);
}

// 设置语言
export function setLanguage(language: Language) {
  currentLanguage.set(language);
  if (browser) {
    localStorage.setItem('language', language);
  }
}

// 获取可用语言列表
export function getAvailableLanguages(): Language[] {
  return Object.keys(translations) as Language[];
}

// 初始化语言设置
export function initLanguage() {
  if (browser) {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      currentLanguage.set(savedLanguage);
    } else {
      // 检测浏览器语言
      const browserLanguage = navigator.language;
      if (browserLanguage.startsWith('zh')) {
        currentLanguage.set('zh-CN');
      } else {
        currentLanguage.set('en-US');
      }
    }
  }
}

// 获取语言显示名称
export function getLanguageDisplayName(language: Language): string {
  const displayNames: Record<Language, string> = {
    'zh-CN': '中文',
    'en-US': 'English'
  };
  return displayNames[language] || language;
}
