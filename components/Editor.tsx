"use client";

import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from "react-select";
import RandomTheme from "./RandomTheme";
import ThemeSkeletonPreview from "./ThemeSkeletonPreview";
import { ImgProvider, useImgContext } from "@/hooks/useImgContext";
import Header from "./Header";
import { useTranslation } from "react-i18next";
import { THEMES } from "@/lib/constants";
import { getThemeOptions } from "@/lib/colorThemes";
import {
  BACKGROUND_EFFECT_OPTIONS,
  BackgroundEffect,
  IMAGE_OVERLAY_PRESETS,
} from "@/lib/backgroundPresets";
import "@/app/patterns.css";

const defaultIcon = { label: "react", value: "react" };

const SIZE_PRESETS = [
  { label: "16:9 (1280×720)", value: "16:9", width: "1280", height: "720" },
  { label: "4:3 (1024×768)", value: "4:3", width: "1024", height: "768" },
  { label: "16:10 (1280×800)", value: "16:10", width: "1280", height: "800" },
  { label: "1:1 (800×800)", value: "1:1", width: "800", height: "800" },
  { label: "3:2 (1200×800)", value: "3:2", width: "1200", height: "800" },
];

const DOWNLOAD_FORMAT_OPTIONS = [
  { label: "PNG", value: "PNG" },
  { label: "WEBP", value: "WEBP" },
  { label: "JPG", value: "JPG" },
];

const defaultSettings = {
  title: "A beginners guide to frontend development",
  pattern: "",
  download: "WEBP",
  author: "Rutik Wankhade",
  icon: defaultIcon,
  devIconOptions: [defaultIcon],
  font: "font-Anek",
  fontSize: "text-5xl",
  theme: "background",
  customIcon: "",
  sizePreset: "16:9",
  width: "1280",
  height: "720",
  borderColor: "",
};

const devIconsUrl = "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json";

function ThemeSelector({ t }: { t: (key: string) => string }) {
  const { colorTheme, setColorTheme } = useImgContext();

  return (
    <div className="flex flex-col">
      <span className="pb-2 text-sm font-medium">{t("editor.colorTheme")}</span>
      <Select
        value={getThemeOptions().find((opt) => opt.value === colorTheme)}
        onChange={(selectedOption) => selectedOption && setColorTheme(selectedOption.value)}
        options={getThemeOptions()}
        formatOptionLabel={({ label, theme }) => (
          <div className="flex items-center">
            <span className="mr-auto">{label}</span>
            <div className="ml-2 flex gap-1">
              <div
                className="h-4 w-4 rounded-full border border-gray-300"
                style={{ backgroundColor: theme.background }}
              ></div>
              <div
                className="h-4 w-4 rounded-full border border-gray-300"
                style={{ backgroundColor: theme.primary }}
              ></div>
              <div
                className="h-4 w-4 rounded-full border border-gray-300"
                style={{ backgroundColor: theme.accent }}
              ></div>
            </div>
          </div>
        )}
        className="items-center text-base text-gray-700 outline-none focus:outline-none"
      />
    </div>
  );
}

function BackgroundStyleSelector({ theme }: { theme: string }) {
  const { backgroundEffect, setBackgroundEffect, imageOverlayGradient, setImageOverlayGradient } =
    useImgContext();
  const isImageTheme = theme === "background" || theme === "stylish";

  if (!isImageTheme) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col">
        <span className="pb-2 text-sm font-medium">背景效果</span>
        <select
          value={backgroundEffect}
          onChange={(event) => setBackgroundEffect(event.target.value as BackgroundEffect)}
          className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {BACKGROUND_EFFECT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <span className="pb-2 text-sm font-medium">图片渐变</span>
        <select
          value={imageOverlayGradient}
          onChange={(event) => setImageOverlayGradient(event.target.value)}
          className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {IMAGE_OVERLAY_PRESETS.map((preset) => (
            <option key={preset.id} value={preset.id}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default function Editor() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    fetch(devIconsUrl)
      .then((r) => r.json())
      .then((data) => {
        data.unshift({ name: "custom-upload", displayName: t("editor.customUpload") });
        setSettings((prev) => ({
          ...prev,
          devIconOptions: data.map((item: { name: string; displayName?: string }) => ({
            value: item.name,
            label: item.displayName || item.name,
          })),
        }));
      });
  }, [t]);

  const handleReset = () => {
    setSettings({ ...defaultSettings, devIconOptions: settings.devIconOptions });
  };

  const handleSizePresetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "custom") {
      setSettings((prev) => ({ ...prev, sizePreset: value }));
      return;
    }

    const selectedPreset = SIZE_PRESETS.find((item) => item.value === value);
    if (selectedPreset) {
      setSettings((prev) => ({
        ...prev,
        sizePreset: selectedPreset.value,
        width: selectedPreset.width,
        height: selectedPreset.height,
      }));
    }
  };

  const handleDimensionChange = (field: string, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const getRandomTheme = (theme: { bdColor: string }, pattern: string) => {
    setSettings((prev) => ({ ...prev, borderColor: theme.bdColor, pattern }));
  };

  const getFontOptions = () => [
    { value: "font-serif", label: `Serif - ${t("fonts.serif") || "Serif"}` },
    { value: "font-sans", label: `Sans - ${t("fonts.sans") || "Sans"}` },
    { value: "font-mono", label: `Mono - ${t("fonts.mono") || "Mono"}` },
    { value: "font-Inter", label: "Inter" },
    { value: "font-Poppins", label: "Poppins" },
    { value: "font-Anek", label: "Anek" },
  ];

  const formatOptionLabel = ({ value, label }: { value: string; label: string }) => (
    <div className="flex">
      <span className="mr-2">{label}</span>
      <div className="ml-auto mr-2">
        <i className={`devicon-${value}-plain dev-icon text-2xl`}></i>
      </div>
    </div>
  );

  const formatFontOptionLabel = ({ value, label }: { value: string; label: string }) => (
    <div className={`flex items-center ${value}`}>
      <span className="text-base">{label}</span>
    </div>
  );

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <ImgProvider>
        <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
          <div className="flex h-full flex-shrink-0 flex-col overflow-y-auto border-r-2 border-dashed border-gray-100 bg-white md:w-3/12 md:min-w-[300px] md:max-w-[400px]">
            <div className="w-full space-y-4 p-4">
              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.title")}</span>
                <textarea
                  value={settings.title}
                  placeholder={t("editor.titlePlaceholder")}
                  className="h-24 w-full resize-none rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={(e) => setSettings((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.author")}</span>
                <input
                  type="text"
                  value={settings.author}
                  placeholder={t("editor.authorPlaceholder")}
                  className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onChange={(e) => setSettings((prev) => ({ ...prev, author: e.target.value }))}
                />
              </div>

              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.icon")}</span>
                <Select
                  value={settings.icon}
                  onChange={(selectedOption) =>
                    selectedOption && setSettings((prev) => ({ ...prev, icon: selectedOption }))
                  }
                  options={settings.devIconOptions}
                  formatOptionLabel={formatOptionLabel}
                  className="items-center text-base text-gray-700 outline-none focus:outline-none"
                />
              </div>

              {settings.icon.value === "custom-upload" && (
                <div className="flex flex-col items-center justify-center">
                  <label className="flex w-full cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-6 transition-colors duration-300 hover:border-blue-400">
                    <svg
                      className="h-8 w-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="mt-2 text-sm text-gray-500">{t("editor.uploadPrompt")}</span>
                    <span className="mt-1 text-xs text-gray-400">{t("editor.uploadFormats")}</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        setSettings((prev) => ({
                          ...prev,
                          customIcon: URL.createObjectURL(e.target.files![0]),
                        }))
                      }
                    />
                  </label>
                  {settings.customIcon && (
                    <div className="mt-2 text-xs text-green-600">{t("editor.uploadSuccess")}</div>
                  )}
                </div>
              )}

              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.font")}</span>
                <Select
                  value={getFontOptions().find((opt) => opt.value === settings.font)}
                  onChange={(selectedOption) =>
                    selectedOption &&
                    setSettings((prev) => ({ ...prev, font: selectedOption.value }))
                  }
                  options={getFontOptions()}
                  formatOptionLabel={formatFontOptionLabel}
                  className="items-center text-base text-gray-700 outline-none focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.fontSize")}</span>
                <select
                  value={settings.fontSize}
                  onChange={(e) => setSettings((prev) => ({ ...prev, fontSize: e.target.value }))}
                  className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="text-2xl">{t("editor.fontSizes.small")}</option>
                  <option value="text-3xl">{t("editor.fontSizes.medium")}</option>
                  <option value="text-4xl">{t("editor.fontSizes.large")}</option>
                  <option value="text-5xl">{t("editor.fontSizes.larger")}</option>
                  <option value="text-6xl">{t("editor.fontSizes.extraLarge")}</option>
                  <option value="text-7xl">{t("editor.fontSizes.huge")}</option>
                  <option value="text-8xl">{t("editor.fontSizes.massive")}</option>
                  <option value="text-9xl">{t("editor.fontSizes.maximum")}</option>
                </select>
              </div>

              <ThemeSelector t={t} />
              <BackgroundStyleSelector theme={settings.theme} />

              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.size")}</span>
                <select
                  onChange={handleSizePresetChange}
                  value={settings.sizePreset}
                  className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {SIZE_PRESETS.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                      {preset.label}
                    </option>
                  ))}
                  <option value="custom">{t("sizes.custom")}</option>
                </select>
                <span className="mt-1.5 text-xs text-gray-500">
                  {t("editor.currentSize")}：{settings.width || "—"} × {settings.height || "—"} px
                </span>
              </div>

              {settings.sizePreset === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="pb-2 text-sm font-medium">{t("editor.width")}</span>
                    <input
                      type="number"
                      min="1"
                      value={settings.width}
                      onChange={(e) => handleDimensionChange("width", e.target.value)}
                      className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="pb-2 text-sm font-medium">{t("editor.height")}</span>
                    <input
                      type="number"
                      min="1"
                      value={settings.height}
                      onChange={(e) => handleDimensionChange("height", e.target.value)}
                      className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col">
                <span className="pb-2 text-sm font-medium">{t("editor.downloadFormat")}</span>
                <select
                  value={settings.download}
                  onChange={(e) => setSettings((prev) => ({ ...prev, download: e.target.value }))}
                  className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  {DOWNLOAD_FORMAT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-gray-700 px-4 py-2.5 text-base text-white transition-colors duration-200 hover:bg-gray-800"
                onClick={handleReset}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 16c1.671 0 3-1.331 3-3s-1.329-3-3-3-3 1.331-3 3 1.329 3 3 3z"></path>
                  <path d="M20.817 11.186a8.94 8.94 0 0 0-1.355-3.219 9.053 9.053 0 0 0-2.43-2.43 8.95 8.95 0 0 0-3.219-1.355 9.028 9.028 0 0 0-1.838-.18V2L8 5l3.975 3V6.002c.484-.002.968.044 1.435.14a6.961 6.961 0 0 1 2.502 1.053 7.005 7.005 0 0 1 1.892 1.892A6.967 6.967 0 0 1 19 13a7.032 7.032 0 0 1-.55 2.725 7.11 7.11 0 0 1-.644 1.188 7.2 7.2 0 0 1-.858 1.039 7.028 7.028 0 0 1-3.536 1.907 7.13 7.13 0 0 1-2.822 0 6.961 6.961 0 0 1-2.503-1.054 7.002 7.002 0 0 1-1.89-1.89A6.996 6.996 0 0 1 5 13H3a9.02 9.02 0 0 0 1.539 5.034 9.096 9.096 0 0 0 2.428 2.428A8.95 8.95 0 0 0 12 22a9.09 9.09 0 0 0 1.814-.183 9.014 9.014 0 0 0 3.218-1.355 8.886 8.886 0 0 0 1.331-1.099 9.228 9.228 0 0 0 1.1-1.332A8.952 8.952 0 0 0 21 13a9.09 9.09 0 0 0-.183-1.814z"></path>
                </svg>
                <span className="font-Inter font-medium">{t("editor.resetAll")}</span>
              </button>
            </div>
          </div>

          <div className="m-2 flex min-w-0 max-w-full flex-1 flex-col items-center justify-center overflow-auto p-4">
            <ComponentToImg downloadAs={settings.download}>
              <CoverImage {...settings} />
            </ComponentToImg>
          </div>

          <div className="flex h-full flex-shrink-0 flex-col border-l-2 border-dashed border-gray-100 bg-white md:w-60 md:min-w-[240px] md:max-w-[320px]">
            <div className="flex flex-shrink-0 items-center p-4">
              <h2 className="font-inter pl-2 text-lg font-semibold">{t("editor.themes")}</h2>
              <div className="ml-auto mr-1 p-2">
                <RandomTheme onThemeChange={getRandomTheme} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="flex flex-wrap justify-center gap-2">
                {THEMES.map((themePlaceholder) => (
                  <ThemeSkeletonPreview
                    key={themePlaceholder.label}
                    theme={themePlaceholder.label}
                    selected={themePlaceholder.label === settings.theme}
                    label={t(`themes.${themePlaceholder.label}`)}
                    onClick={() => setSettings((prev) => ({ ...prev, theme: themePlaceholder.label }))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ImgProvider>
    </div>
  );
}
