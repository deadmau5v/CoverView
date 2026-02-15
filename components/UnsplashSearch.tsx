"use client";

import React, { useState, useEffect } from "react";
import { useImgContext } from "@/hooks/useImgContext";
import { GRADIENT_PRESETS, ImageSource } from "@/lib/backgroundPresets";

interface ImageResult {
  id: string;
  urls: { regular: string; small?: string };
  alt_description: string;
  user: {
    name: string;
    profile_image: { small: string };
    links: { html: string };
  };
  links: { download_location: string };
  source?: ImageSource;
}

interface ImageSearchProps {
  largeImgPreview?: boolean;
}

export default function UnsplashSearch({ largeImgPreview }: ImageSearchProps) {
  const [imageList, setImageList] = useState<ImageResult[]>([]);
  const [searchText, setSearchText] = useState("setup");
  const [imageSource, setImageSource] = useState<ImageSource>("unsplash");
  const [loading, setLoading] = useState(false);
  const { setUnsplashImage, unsplashImage } = useImgContext();

  const searchImages = async (query: string, source: "unsplash" | "pexels") => {
    setLoading(true);
    try {
      const apiUrl = source === "unsplash" ? "/api/unsplash/search" : "/api/pexels/search";
      const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.results) {
        setImageList(data.results);
      } else {
        setImageList([]);
      }
    } catch (error) {
      console.error("Failed to search images:", error);
      setImageList([]);
    } finally {
      setLoading(false);
    }
  };

  const selectImage = (image: ImageResult) => {
    const source = image.source || "unsplash";
    const profileUrl =
      source === "pexels"
        ? image.user.links.html
        : `${image.user.links.html}?utm_source=https://coverview.vercel.app&utm_medium=referral`;

    setUnsplashImage({
      url: image.urls.regular,
      name: image.user.name,
      avatar: image.user.profile_image?.small || "",
      profile: profileUrl,
      downloadLink: image.links.download_location,
      source,
    });
  };

  const selectGradient = (gradientCss: string, label: string) => {
    setUnsplashImage({
      url: "",
      name: label,
      avatar: "",
      profile: "",
      downloadLink: "",
      source: "gradient",
      gradient: gradientCss,
    });
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (imageSource === "gradient") {
      return;
    }
    searchImages(searchText, imageSource);
  };

  const handleSourceChange = (source: ImageSource) => {
    setImageSource(source);
    if (source === "gradient") {
      setLoading(false);
      return;
    }
    if (searchText) {
      searchImages(searchText, source);
    }
  };

  useEffect(() => {
    searchImages("setup", "unsplash");
  }, []);

  const selectedGradient = unsplashImage?.source === "gradient" ? unsplashImage.gradient : "";

  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col items-center justify-center bg-white p-2">
        <div className="flex w-full items-center justify-center gap-2 px-6">
          <div className="mb-2 flex rounded-full border border-gray-200 bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => handleSourceChange("unsplash")}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                imageSource === "unsplash"
                  ? "bg-gray-700 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unsplash
            </button>
            <button
              type="button"
              onClick={() => handleSourceChange("pexels")}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                imageSource === "pexels"
                  ? "bg-gray-700 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Pexels
            </button>
            <button
              type="button"
              onClick={() => handleSourceChange("gradient")}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                imageSource === "gradient"
                  ? "bg-gray-700 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              渐变
            </button>
          </div>
        </div>

        {imageSource === "gradient" ? (
          <div className="w-full px-6 pb-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {GRADIENT_PRESETS.map((preset) => {
                const isSelected = selectedGradient === preset.css;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectGradient(preset.css, preset.label)}
                    className={`rounded-xl border p-2 text-left transition ${
                      isSelected
                        ? "border-gray-800 shadow-[0_6px_18px_rgba(17,24,39,0.22)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="h-16 w-full rounded-lg" style={{ backgroundImage: preset.css }} />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">{preset.label}</span>
                      <span className="text-xs text-gray-500">{isSelected ? "已应用" : "点击应用"}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full items-center px-6">
              <form
                onSubmit={handleSearchSubmit}
                className="mx-auto mb-2 flex w-full rounded-full border border-gray-50 bg-gray-50"
              >
                <input
                  type="text"
                  value={searchText}
                  placeholder="搜索照片"
                  className="w-full rounded-full bg-gray-50 p-1 px-4 text-lg focus:outline-none"
                  onChange={(event) => setSearchText(event.target.value)}
                />

                <button type="submit" disabled={loading}>
                  <svg
                    className={`ml-auto h-9 w-9 rounded-full bg-gray-700 p-2 text-white hover:bg-gray-800 ${
                      loading ? "animate-pulse" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>

            <div className="flex h-max w-full flex-wrap justify-center overflow-x-hidden overflow-y-scroll pb-12">
              {loading && imageList.length === 0 && (
                <div className="flex h-32 w-full items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-700"></div>
                </div>
              )}
              {imageList.map((image) => {
                return (
                  <div
                    key={image.id}
                    className={`relative m-1 cursor-pointer rounded-lg ${
                      largeImgPreview ? "h-44 w-60" : "h-24 w-40"
                    }`}
                  >
                    <span className="absolute left-2 top-2 font-Inter text-sm font-semibold text-white opacity-50">
                      点击选择
                    </span>
                    <img
                      src={image.urls.regular}
                      alt={image.alt_description}
                      onClick={() => selectImage(image)}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    {image.source === "pexels" && (
                      <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 text-xs text-white">
                        Pexels
                      </span>
                    )}
                  </div>
                );
              })}
              {!loading && imageList.length === 0 && (
                <div className="flex h-32 w-full items-center justify-center text-gray-500">
                  没有找到相关图片
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
