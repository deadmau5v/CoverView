import React, { createContext, useState } from "react";
import { getThemeColors } from './colorThemes';

const ImgContext = createContext();

const ImgProvider = ({ children }) => {
  const [unsplashImage, setUnsplashImage] = useState();
  const [colorTheme, setColorTheme] = useState('one-dark');
  
  // 获取当前主题的颜色配置
  const themeColors = getThemeColors(colorTheme);
    
  return (
    <ImgContext.Provider value={{ 
      unsplashImage, 
      setUnsplashImage,
      colorTheme,
      setColorTheme,
      themeColors
    }}>
      {children}
    </ImgContext.Provider>
  );
};

export {ImgProvider, ImgContext}