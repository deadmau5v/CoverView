import React from "react";
import { useTranslation } from "react-i18next";

/**
 * 这是一个演示组件，展示如何在其他组件中使用 i18n
 *
 * 使用方法：
 * 1. 导入 useTranslation hook
 * 2. 在组件中调用 const { t } = useTranslation()
 * 3. 使用 t('key') 来获取翻译文本
 *
 * 示例:
 * const { t } = useTranslation();
 * return <h1>{t('common.title')}</h1>;
 */
const I18nDemo: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">{t("home.hero.title")}</h2>
      <p className="mb-4 text-gray-600">{t("home.hero.subtitle")}</p>

      <div className="mt-6 space-y-2">
        <p className="text-sm text-gray-500">
          Current Language: <strong>{i18n.language}</strong>
        </p>
        <p className="text-sm text-gray-500">
          {t("common.title")}: <strong>{t("editor.titlePlaceholder")}</strong>
        </p>
        <p className="text-sm text-gray-500">
          {t("common.author")}: <strong>{t("editor.authorPlaceholder")}</strong>
        </p>
      </div>

      <div className="mt-6">
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")}
        >
          Switch to {i18n.language === "en" ? "中文" : "English"}
        </button>
      </div>
    </div>
  );
};

export default I18nDemo;
