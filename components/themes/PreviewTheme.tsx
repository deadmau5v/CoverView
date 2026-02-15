"use client";

import React, { useState } from "react";
import { useImgContext } from "@/hooks/useImgContext";

interface PreviewThemeProps {
  config: {
    title: string;
    font: string;
    fontSize: string;
  };
}

export default function PreviewTheme({ config }: PreviewThemeProps) {
  const { title, font, fontSize } = config;
  const { themeColors } = useImgContext();

  const [image, setImage] = useState<string>();

  return (
    <div className="h-full w-full bg-white">
      <div
        className={`flex h-full w-full flex-col overflow-y-hidden px-4 pt-4`}
        style={{ backgroundColor: themeColors.background }}
      >
        <h1
          className={`${font} ${fontSize} p-10 text-center font-bold`}
          style={{ color: themeColors.foreground }}
        >
          {title}
        </h1>

        <div
          className="group mx-auto mb-0 mt-auto flex w-10/12 flex-col rounded-t-xl shadow-lg"
          style={{ backgroundColor: themeColors.card, borderColor: themeColors.card }}
        >
          <div
            className="flex h-8 w-full items-center rounded-t-xl p-2"
            style={{ backgroundColor: themeColors.muted }}
          >
            <div className="mx-1 h-3 w-3 rounded-full bg-red-400"></div>
            <div className="mx-1 h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="mx-1 h-3 w-3 rounded-full bg-green-400"></div>
            <button onClick={() => setImage(undefined)} className="ml-auto mr-4 cursor-pointer">
              <svg
                className="z-10 hidden h-4 w-4 rounded-full group-hover:inline-block"
                style={{ color: themeColors.foreground }}
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

          {image ? (
            <div className="">
              <img src={image && image} className="object-cover" alt="preview" />
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center p-20 py-28"
              style={{ backgroundColor: themeColors.card }}
            >
              <input
                type="file"
                className="mb-2 cursor-pointer rounded border text-xl"
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
