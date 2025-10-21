import React from "react";
import CoverImage from "./CoverImage";
import ComponentToImg from "./ComponentToImg";
import Select from "react-select";
import RandomTheme from "./RandomTheme";
import { ImgProvider, ImgContext } from "../utils/ImgContext";
import Header from "./Header";
import { withTranslation, WithTranslation } from "react-i18next";

import { THEMES } from "../utils/constants";
import { getThemeOptions } from "../utils/colorThemes";

const defaultIcon = { label: "react", value: "react" };

const SIZE_PRESETS = [
  { label: "16:9 (1280×720)", value: "16:9", width: "1280", height: "720" },
  { label: "4:3 (1024×768)", value: "4:3", width: "1024", height: "768" },
  { label: "16:10 (1280×800)", value: "16:10", width: "1280", height: "800" },
  { label: "1:1 (800×800)", value: "1:1", width: "800", height: "800" },
  { label: "3:2 (1200×800)", value: "3:2", width: "1200", height: "800" },
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
};

const devIconsUrl = "https://raw.githubusercontent.com/devicons/devicon/master/devicon.json";

// 主题选择器组件（需要访问 Context）
const ThemeSelector = ({ t }: { t: any }) => {
  const { colorTheme, setColorTheme } = React.useContext(ImgContext);

  return (
    <div className="flex flex-col">
      <span className="pb-2 text-sm font-medium">{t("editor.colorTheme")}</span>
      <Select
        value={getThemeOptions().find((opt) => opt.value === colorTheme)}
        onChange={(selectedOption) => setColorTheme(selectedOption.value)}
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
};

class Editor extends React.Component<WithTranslation> {
  state = defaultSettings;
  componentDidMount() {
    // console.log("Mount")
    const { t } = this.props;
    fetch(devIconsUrl)
      .then((r) => r.json())
      .then((data) => {
        data.unshift({ name: "custom-upload", displayName: t("editor.customUpload") });
        this.setState({
          devIconOptions: data.map((item) => ({
            value: item.name,
            label: item.displayName || item.name,
          })),
        });
      });
  }
  handleReset = () => {
    this.setState({
      ...defaultSettings,
      devIconOptions: this.state.devIconOptions,
    });
  };

  handleSizePresetChange = (event) => {
    const value = event.target.value;
    if (value === "custom") {
      this.setState({ sizePreset: value });
      return;
    }

    const selectedPreset = SIZE_PRESETS.find((item) => item.value === value);
    if (selectedPreset) {
      this.setState({
        sizePreset: selectedPreset.value,
        width: selectedPreset.width,
        height: selectedPreset.height,
      });
    }
  };

  handleDimensionChange = (field, value) => {
    this.setState({ [field]: value });
  };

  getRandomTheme = (theme, Pattern) => {
    this.setState({ borderColor: theme.bdColor, pattern: Pattern });
  };

  getFontOptions = () => {
    const { t } = this.props;
    return [
      { value: "font-serif", label: `Serif - ${t("fonts.serif") || "Serif"}` },
      { value: "font-sans", label: `Sans - ${t("fonts.sans") || "Sans"}` },
      { value: "font-mono", label: `Mono - ${t("fonts.mono") || "Mono"}` },
      { value: "font-Inter", label: "Inter" },
      { value: "font-Poppins", label: "Poppins" },
      { value: "font-Anek", label: "Anek" },
    ];
  };

  formatOptionLabel = ({ value, label }) => (
    <div className="flex">
      <span className="mr-2">{label}</span>
      <div className="ml-auto mr-2">
        <i className={`devicon-${value}-plain dev-icon text-2xl`}></i>
      </div>
    </div>
  );

  formatFontOptionLabel = ({ value, label }) => (
    <div className={`flex items-center ${value}`}>
      <span className="text-base">{label}</span>
    </div>
  );

  render() {
    const { t } = this.props;
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
                    value={this.state.title}
                    placeholder={t("editor.titlePlaceholder")}
                    className="h-24 w-full resize-none rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="pb-2 text-sm font-medium">{t("editor.author")}</span>
                  <input
                    type="text"
                    value={this.state.author}
                    placeholder={t("editor.authorPlaceholder")}
                    className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onChange={(e) => this.setState({ author: e.target.value })}
                  />
                </div>

                <div className="flex flex-col">
                  <span className="pb-2 text-sm font-medium">{t("editor.icon")}</span>
                  <Select
                    value={this.state.icon}
                    onChange={(selectedOption) => this.setState({ icon: selectedOption })}
                    options={this.state.devIconOptions}
                    formatOptionLabel={this.formatOptionLabel}
                    className="items-center text-base text-gray-700 outline-none focus:outline-none"
                  />
                </div>

                {this.state.icon.value === "custom-upload" && (
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
                          this.setState({ customIcon: URL.createObjectURL(e.target.files[0]) })
                        }
                      />
                    </label>
                    {this.state.customIcon && (
                      <div className="mt-2 text-xs text-green-600">{t("editor.uploadSuccess")}</div>
                    )}
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="pb-2 text-sm font-medium">{t("editor.font")}</span>
                  <Select
                    value={this.getFontOptions().find((opt) => opt.value === this.state.font)}
                    onChange={(selectedOption) => this.setState({ font: selectedOption.value })}
                    options={this.getFontOptions()}
                    formatOptionLabel={this.formatFontOptionLabel}
                    className="items-center text-base text-gray-700 outline-none focus:outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="pb-2 text-sm font-medium">{t("editor.fontSize")}</span>
                  <select
                    value={this.state.fontSize}
                    onChange={(e) => this.setState({ fontSize: e.target.value })}
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

                <div className="flex flex-col">
                  <span className="pb-2 text-sm font-medium">{t("editor.size")}</span>
                  <select
                    onChange={this.handleSizePresetChange}
                    value={this.state.sizePreset}
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
                    {t("editor.currentSize")}：{this.state.width || "—"} × {this.state.height || "—"} px
                  </span>
                </div>

                {this.state.sizePreset === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="pb-2 text-sm font-medium">{t("editor.width")}</span>
                      <input
                        type="number"
                        min="1"
                        value={this.state.width}
                        onChange={(e) => this.handleDimensionChange("width", e.target.value)}
                        className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="pb-2 text-sm font-medium">{t("editor.height")}</span>
                      <input
                        type="number"
                        min="1"
                        value={this.state.height}
                        onChange={(e) => this.handleDimensionChange("height", e.target.value)}
                        className="w-full rounded border border-gray-300 p-2.5 text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                )}

                <button
                  className="mt-2 flex w-full items-center justify-center rounded-lg bg-gray-700 px-4 py-2.5 text-base text-white transition-colors duration-200 hover:bg-gray-800"
                  onClick={this.handleReset}
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

            {/* cover image preview */}

            <div className="m-2 flex min-w-0 max-w-full flex-1 flex-col items-center justify-center overflow-auto p-4">
              <ComponentToImg downloadAs={this.state.download}>
                <CoverImage {...this.state} />
              </ComponentToImg>
            </div>

            {/* themes section */}

            <div className="flex h-full flex-shrink-0 flex-col border-l-2 border-dashed border-gray-100 bg-white md:w-60 md:min-w-[240px] md:max-w-[320px]">
              <div className="flex flex-shrink-0 items-center p-4">
                <h2 className="font-inter pl-2 text-lg font-semibold">{t("editor.themes")}</h2>
                <div className="ml-auto mr-1 p-2">
                  <RandomTheme onThemeChange={this.getRandomTheme} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {THEMES.map((themePlaceholder) => (
                    <div
                      className={`${themePlaceholder.label === this.state.theme ? "border-2 border-blue-400" : ""}`}
                      key={themePlaceholder.label}
                    >
                      <img
                        src={themePlaceholder.preview}
                        alt={themePlaceholder.label}
                        onClick={(e) => this.setState({ theme: themePlaceholder.label })}
                        className="cursor-pointer border border-gray-100 duration-300 hover:scale-105 hover:border-gray-200"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ImgProvider>
      </div>
    );
  }
}

export default withTranslation()(Editor);
