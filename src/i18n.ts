import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./locales/en/translation.json";
import zhTranslation from "./locales/zh/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  zh: {
    translation: zhTranslation,
  },
};

i18n
  // 检测用户语言
  .use(LanguageDetector)
  // 将 i18next 传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  .init({
    resources,
    fallbackLng: "en", // 如果检测不到语言，使用英语
    debug: false,

    interpolation: {
      escapeValue: false, // React 已经安全处理了
    },

    detection: {
      // 检测顺序
      order: ["navigator", "htmlTag", "path", "subdomain"],

      // 缓存用户选择的语言
      caches: ["localStorage", "cookie"],

      // 可选：排除某些语言检测来源
      excludeCacheFor: ["cimode"],
    },
  });

export default i18n;
