"use client";

import React from "react";
import { useImgContext } from "@/hooks/useImgContext";

interface OutlineThemeProps {
  config: {
    title: string;
    author: string;
    icon: { label: string; value: string };
    font: string;
    fontSize: string;
    customIcon: string;
  };
}

export default function OutlineTheme({ config }: OutlineThemeProps) {
  const { title, author, icon, font, fontSize, customIcon } = config;
  const { themeColors } = useImgContext();

  return (
    <div className="h-full w-full bg-white">
      <div
        className={`flex h-full flex-col overflow-y-hidden px-10`}
        style={{ backgroundColor: themeColors.background }}
      >
        <div className={`${font} flex flex-col rounded-2xl py-6`}>
          {customIcon ? (
            <div className="m-6">
              <img
                src={customIcon}
                alt="img"
                className="h-24 w-24 rounded-full border object-cover p-1"
                style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}
              />
            </div>
          ) : (
            <div className="ml-2 mr-auto flex items-center justify-center">
              <i
                className={`devicon-${icon.value}-plain dev-icon p-4 text-8xl`}
                style={{ color: themeColors.primary }}
              ></i>
            </div>
          )}
          <h1 className={`${fontSize} p-4 font-bold`} style={{ color: themeColors.foreground }}>
            {title}
          </h1>

          <div className={`${font} mb-0 mt-auto flex h-16 w-full items-center p-2 px-6`}>
            <h2 className="text-2xl font-semibold" style={{ color: themeColors.accent }}>
              {author}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
