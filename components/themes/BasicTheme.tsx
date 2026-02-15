"use client";

import React from "react";
import { useImgContext } from "@/hooks/useImgContext";

interface BasicThemeProps {
  config: {
    title: string;
    pattern: string;
    author: string;
    icon: { label: string; value: string };
    font: string;
    fontSize: string;
    customIcon: string;
  };
}

export default function BasicTheme({ config }: BasicThemeProps) {
  const { title, pattern, author, icon, font, fontSize, customIcon } = config;
  const { themeColors } = useImgContext();

  return (
    <div className="h-full w-full bg-white">
      <div
        className={`flex h-full items-center overflow-y-hidden ${pattern} `}
        style={{ backgroundColor: themeColors.background }}
      >
        <div
          className={`${font} m-auto flex flex-col rounded-xl pt-12 md:w-10/12`}
          style={{ backgroundColor: themeColors.card }}
        >
          <div className="px-12">
            <div>
              <h1
                className={`${fontSize} text-center font-bold`}
                style={{ color: themeColors.foreground }}
              >
                {title}
              </h1>
            </div>
          </div>

          <div
            className="mx-4 flex items-center rounded-xl p-4"
            style={{ backgroundColor: themeColors.card }}
          >
            {customIcon ? (
              <div className="h-12 w-12">
                <img
                  src={customIcon}
                  alt="img"
                  className="rounded-full border p-1"
                  style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }}
                />
              </div>
            ) : (
              <div className="ml-2 mr-auto flex items-center justify-center">
                <i
                  className={`devicon-${icon.value}-plain dev-icon p-4 text-5xl`}
                  style={{ color: themeColors.primary }}
                ></i>
              </div>
            )}

            <h2
              className="ml-auto mr-2 text-xl font-semibold"
              style={{ color: themeColors.foreground }}
            >
              {author}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
