import React, { createContext, useState, ReactNode } from "react";
import { getThemeColors } from "./colorThemes";

interface ImgContextType {
  unsplashImage: any;
  setUnsplashImage: (image: any) => void;
  colorTheme: string;
  setColorTheme: (theme: string) => void;
  themeColors: any;
}

const ImgContext = createContext<ImgContextType>({} as ImgContextType);

interface ImgProviderProps {
  children: ReactNode;
}

const ImgProvider = ({ children }: ImgProviderProps) => {
  const [unsplashImage, setUnsplashImage] = useState<any>();
  const [colorTheme, setColorTheme] = useState<string>("one-dark");

  // 获取当前主题的颜色配置
  const themeColors = getThemeColors(colorTheme);

  return (
    <ImgContext.Provider
      value={{
        unsplashImage,
        setUnsplashImage,
        colorTheme,
        setColorTheme,
        themeColors,
      }}
    >
      {children}
    </ImgContext.Provider>
  );
};

export { ImgProvider, ImgContext };
