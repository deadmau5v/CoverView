"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { getThemeColors, ColorTheme } from "@/lib/colorThemes";

type ImageSource = "unsplash" | "pexels";

interface UnsplashImage {
  url: string;
  name: string;
  avatar: string;
  profile: string;
  downloadLink: string;
  source?: ImageSource;
}

interface ImgContextType {
  unsplashImage: UnsplashImage | null;
  setUnsplashImage: (image: UnsplashImage | null) => void;
  colorTheme: string;
  setColorTheme: (theme: string) => void;
  themeColors: ColorTheme;
}

const ImgContext = createContext<ImgContextType | null>(null);

interface ImgProviderProps {
  children: ReactNode;
}

export function ImgProvider({ children }: ImgProviderProps) {
  const [unsplashImage, setUnsplashImage] = useState<UnsplashImage | null>(null);
  const [colorTheme, setColorTheme] = useState<string>("one-dark");
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
}

export function useImgContext() {
  const context = useContext(ImgContext);
  if (!context) {
    throw new Error("useImgContext must be used within an ImgProvider");
  }
  return context;
}
