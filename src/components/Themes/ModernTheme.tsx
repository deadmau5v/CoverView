import React, { useContext } from "react";
import { ImgContext } from "../../utils/ImgContext";

const ModernTheme = ({ config }) => {
  const { title, pattern, author, icon, font, fontSize, customIcon } = config;
  const { themeColors } = useContext(ImgContext);

  return (
    <div className="h-full w-full bg-white">
      <div className="flex h-full w-full items-center overflow-y-hidden">
        <div
          className={`flex h-full w-full items-center p-4 ${pattern} `}
          style={{ backgroundColor: themeColors.background }}
        >
          {customIcon ? (
            <div className="mx-auto flex items-center justify-center">
              <img
                src={customIcon}
                alt="img"
                className="h-28 w-28 rounded-full border-4"
                style={{ backgroundColor: themeColors.card, borderColor: themeColors.card }}
              />
            </div>
          ) : (
            <div
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full p-6"
              style={{ backgroundColor: themeColors.card }}
            >
              <i
                className={`devicon-${icon.value}-plain dev-icon p-4 text-7xl`}
                style={{ color: themeColors.primary }}
              ></i>
            </div>
          )}

          <div className="h-full w-2/3">
            <div
              className={`${font} flex h-full flex-col justify-center rounded-xl p-4 px-12 text-left`}
              style={{ backgroundColor: themeColors.card }}
            >
              <h1 className={`${fontSize} font-bold`} style={{ color: themeColors.foreground }}>
                {title}
              </h1>
              <h2
                className="mt-10 text-left text-xl font-semibold"
                style={{ color: themeColors.muted }}
              >
                {author}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernTheme;
