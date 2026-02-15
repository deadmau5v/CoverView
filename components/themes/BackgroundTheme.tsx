"use client";

import React from "react";
import { useImgContext } from "@/hooks/useImgContext";
import UnsplashSearch from "../UnsplashSearch";
import { BackgroundEffect, GRADIENT_PRESETS, getOverlayGradientById } from "@/lib/backgroundPresets";

interface BackgroundThemeProps {
  config: {
    title: string;
    author: string;
    font: string;
    fontSize: string;
    icon: { label: string; value: string };
    customIcon: string;
  };
}

function getImageEffectStyle(effect: BackgroundEffect): React.CSSProperties {
  switch (effect) {
    case "softBlur":
      return { filter: "blur(3px)", transform: "scale(1.04)" };
    case "strongBlur":
      return { filter: "blur(8px)", transform: "scale(1.09)" };
    case "glass":
      return { filter: "blur(4px) saturate(1.1)", transform: "scale(1.06)" };
    case "none":
    default:
      return {};
  }
}

export default function BackgroundTheme({ config }: BackgroundThemeProps) {
  const { title, author, font, fontSize, icon, customIcon } = config;
  const {
    unsplashImage,
    setUnsplashImage,
    themeColors,
    backgroundEffect,
    imageOverlayGradient,
  } = useImgContext();

  const source = unsplashImage?.source || "unsplash";
  const isGradientSource = source === "gradient";
  const sourceUrl =
    source === "pexels"
      ? "https://www.pexels.com/"
      : source === "unsplash"
        ? "https://unsplash.com/?utm_source=https://coverview.vercel.app&utm_medium=referral"
        : "";
  const sourceName = source === "pexels" ? "Pexels" : source === "unsplash" ? "Unsplash" : "Gradient";
  const overlayPreset = getOverlayGradientById(imageOverlayGradient);
  const showOverlayGradient = !isGradientSource && overlayPreset.css !== "none";
  const gradientBackground = unsplashImage?.gradient || GRADIENT_PRESETS[0].css;
  const contentCardStyle =
    backgroundEffect === "glass"
      ? {
          backgroundColor: "rgba(255, 255, 255, 0.14)",
          border: "1px solid rgba(255, 255, 255, 0.32)",
          borderRadius: "1rem",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 20px 45px rgba(15, 23, 42, 0.28)",
        }
      : undefined;

  return (
    <div className="h-full w-full bg-white">
      <div
        className={`flex h-full w-full flex-col overflow-y-hidden`}
        style={{ backgroundColor: themeColors.background }}
      >
        <div
          className="flex h-full w-full flex-row items-center justify-center"
          style={{ backgroundColor: themeColors.card }}
        >
          <div className="h-full w-full">
            {unsplashImage ? (
              <div className="group relative flex h-full w-full overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  {isGradientSource ? (
                    <div
                      className="h-full w-full"
                      style={{
                        backgroundImage: gradientBackground,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <img
                      src={unsplashImage.url}
                      className="h-full w-full object-cover transition-all duration-500"
                      style={getImageEffectStyle(backgroundEffect)}
                      alt="preview"
                    />
                  )}
                </div>

                {showOverlayGradient && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: overlayPreset.css }}
                  />
                )}

                {backgroundEffect === "glass" && !isGradientSource && (
                  <div className="pointer-events-none absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                )}

                <div
                  className={`absolute inset-0 ${backgroundEffect === "glass" ? "bg-black/38" : "bg-black/52"}`}
                >
                  <button
                    onClick={() => setUnsplashImage(null)}
                    className="absolute right-2 top-2 cursor-pointer"
                  >
                    <svg
                      className="z-10 hidden h-8 w-8 rounded-full bg-white p-2 text-gray-800 group-hover:inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>

                  <div
                    className={`${font} flex h-full w-full flex-col items-center justify-center gap-8 px-10 py-16 text-center`}
                  >
                    <div
                      className={backgroundEffect === "glass" ? "mx-auto w-full max-w-4xl p-10" : "w-full max-w-4xl"}
                      style={contentCardStyle}
                    >
                      <h1 className={`${fontSize} break-words font-bold text-white`}>{title}</h1>
                      <div className="mt-8 flex flex-col items-center gap-4">
                        <h2 className="text-xl font-semibold text-white">{author}</h2>
                        {customIcon ? (
                          <img
                            src={customIcon}
                            alt="img"
                            className="m-2 h-12 w-12 rounded-full border-2 border-white bg-white"
                          />
                        ) : (
                          <div className="mr-2 flex items-center justify-center">
                            <i
                              className={`devicon-${icon.value}-plain dev-icon text-3xl text-white`}
                            ></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!isGradientSource && (
                  <div className="absolute bottom-4 right-4 opacity-80">
                    <div className="hidden items-center group-hover:flex">
                      <span className="mx-2 text-sm text-white">Photo by</span>
                      {unsplashImage.avatar && (
                        <a
                          href={unsplashImage.profile}
                          target="_blank"
                          rel="noreferrer"
                          className="flex cursor-pointer items-center rounded-full bg-gray-300 text-sm"
                        >
                          <img
                            src={unsplashImage.avatar}
                            alt={unsplashImage.name}
                            className="mr-2 h-6 w-6 rounded-full"
                          />
                          <span className="pr-2">{unsplashImage.name}</span>
                        </a>
                      )}
                      {!unsplashImage.avatar && (
                        <a
                          href={unsplashImage.profile}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full bg-gray-300 px-2 py-1 text-sm text-gray-800"
                        >
                          {unsplashImage.name}
                        </a>
                      )}

                      {sourceUrl && (
                        <a
                          href={sourceUrl}
                          className="mx-2 text-sm text-white"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {sourceName}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center p-4"
                style={{ backgroundColor: themeColors.card }}
              >
                <UnsplashSearch largeImgPreview />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
