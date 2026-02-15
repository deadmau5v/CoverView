"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { getThemeColors, ColorTheme } from "@/lib/colorThemes";
import { BackgroundEffect, ImageSource } from "@/lib/backgroundPresets";

interface UnsplashImage {
  url: string;
  name: string;
  avatar: string;
  profile: string;
  downloadLink: string;
  source?: ImageSource;
  gradient?: string;
}

interface ImgContextType {
  unsplashImage: UnsplashImage | null;
  setUnsplashImage: (image: UnsplashImage | null) => void;
  backgroundEffect: BackgroundEffect;
  setBackgroundEffect: (effect: BackgroundEffect) => void;
  imageOverlayGradient: string;
  setImageOverlayGradient: (value: string) => void;
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
  const [backgroundEffect, setBackgroundEffect] = useState<BackgroundEffect>("none");
  const [imageOverlayGradient, setImageOverlayGradient] = useState<string>("cinematic");
  const [colorTheme, setColorTheme] = useState<string>("one-dark");
  const themeColors = getThemeColors(colorTheme);

  return (
    <ImgContext.Provider
      value={{
        unsplashImage,
        setUnsplashImage,
        backgroundEffect,
        setBackgroundEffect,
        imageOverlayGradient,
        setImageOverlayGradient,
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
