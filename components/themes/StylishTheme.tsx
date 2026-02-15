"use client";

import React from "react";
import { useImgContext } from "@/hooks/useImgContext";
import UnsplashSearch from "../UnsplashSearch";

interface StylishThemeProps {
  config: {
    title: string;
    author: string;
    font: string;
    fontSize: string;
    icon: { label: string; value: string };
    customIcon: string;
  };
}

export default function StylishTheme({ config }: StylishThemeProps) {
  const { title, author, font, fontSize, icon, customIcon } = config;
  const { unsplashImage, setUnsplashImage, themeColors } = useImgContext();

  const source = unsplashImage?.source || "unsplash";
  const sourceUrl =
    source === "pexels"
      ? "https://www.pexels.com/"
      : "https://unsplash.com/?utm_source=https://coverview.vercel.app&utm_medium=referral";
  const sourceName = source === "pexels" ? "Pexels" : "Unsplash";

  return (
    <div className="h-full w-full bg-white">
      <div
        className={`flex h-full w-full flex-col overflow-y-hidden`}
        style={{ backgroundColor: themeColors.background }}
      >
        <div className="flex h-full w-full flex-row items-stretch justify-center">
          <div
            className="flex h-full w-1/2 rounded-l-xl"
            style={{ backgroundColor: themeColors.card }}
          >
            <div
              className={`${font} flex h-full w-full flex-col justify-center gap-6 rounded-xl p-6 px-12 text-left md:p-10`}
            >
              <h1
                className={`${fontSize} break-words font-bold`}
                style={{ color: themeColors.foreground }}
              >
                {title}
              </h1>
              <div className="flex items-center gap-4 text-left">
                {customIcon ? (
                  <div className="">
                    <img
                      src={customIcon}
                      alt="img"
                      className="h-12 w-12 rounded-full border"
                      style={{
                        backgroundColor: themeColors.card,
                        borderColor: themeColors.border,
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <i
                      className={`devicon-${icon.value}-plain dev-icon text-3xl`}
                      style={{ color: themeColors.primary }}
                    ></i>
                  </div>
                )}
                <h2
                  className="text-left text-xl font-semibold"
                  style={{ color: themeColors.muted }}
                >
                  {author}
                </h2>
              </div>
            </div>
          </div>
          <div className="h-full w-1/2">
            {unsplashImage ? (
              <div className="group relative flex h-full w-full">
                <img
                  src={unsplashImage.url && unsplashImage.url}
                  className="h-full w-full object-cover"
                  alt="preview"
                />

                <button
                  onClick={() => setUnsplashImage(null)}
                  className="absolute right-2 top-4 cursor-pointer"
                >
                  <svg
                    className="z-10 hidden h-6 w-6 rounded-full bg-white p-1 text-gray-800 group-hover:inline-block"
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

                    <a
                      href={sourceUrl}
                      className="mx-2 text-sm text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {sourceName}
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex h-full w-full flex-col items-center justify-center"
                style={{ backgroundColor: themeColors.card }}
              >
                <UnsplashSearch />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
