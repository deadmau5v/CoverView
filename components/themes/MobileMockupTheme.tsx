"use client";

import React, { useState } from "react";
import { useImgContext } from "@/hooks/useImgContext";

interface MobileMockupThemeProps {
  config: {
    title: string;
    font: string;
    fontSize: string;
  };
}

export default function MobileMockupTheme({ config }: MobileMockupThemeProps) {
  const { title, font, fontSize } = config;
  const { themeColors } = useImgContext();

  const [image, setImage] = useState<string>();

  return (
    <div className={`h-full w-full bg-white`}>
      <div
        className={`flex h-full w-full flex-row items-center justify-center overflow-y-hidden px-10 pt-4`}
        style={{ backgroundColor: themeColors.background }}
      >
        <h1
          className={`${font} ${fontSize} w-1/2 px-4 text-left font-bold`}
          style={{ color: themeColors.foreground }}
        >
          {title}
        </h1>

        <div
          className="group m-4 mx-auto mt-10 flex h-full w-5/12 flex-col rounded-t-3xl border-x-8 border-t-8 shadow-lg"
          style={{ backgroundColor: themeColors.card, borderColor: themeColors.muted }}
        >
          <div
            className="flex h-8 w-full items-center rounded-t p-2 pb-3"
            style={{ backgroundColor: themeColors.muted }}
          >
            <div className="mx-auto flex items-center">
              <div
                className="mx-1 h-3 w-3 rounded-full"
                style={{ backgroundColor: themeColors.card }}
              ></div>
              <div
                className="mx-1 h-2 w-20 rounded-full"
                style={{ backgroundColor: themeColors.card }}
              ></div>
            </div>
          </div>

          {image ? (
            <div className="group relative">
              <img
                src={image && image}
                className="h-full -translate-y-1 rounded object-cover"
                alt="preview"
              />
              <button onClick={() => setImage(undefined)} className="ml-auto mr-4 cursor-pointer">
                <svg
                  className="absolute right-2 top-4 z-10 hidden h-8 w-8 rounded-full p-2 group-hover:inline-block"
                  style={{ backgroundColor: themeColors.muted, color: themeColors.foreground }}
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
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center rounded-xl px-4 py-20"
              style={{ backgroundColor: themeColors.card }}
            >
              <input
                type="file"
                className="mb-2 flex cursor-pointer flex-col rounded border text-sm"
                style={{
                  backgroundColor: themeColors.card,
                  color: themeColors.foreground,
                  borderColor: themeColors.border,
                }}
                onChange={(e) =>
                  e.target.files?.[0] && setImage(URL.createObjectURL(e.target.files[0]))
                }
              />
              <span className="text-center italic" style={{ color: themeColors.muted }}>
                click to upload a screenshot
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
