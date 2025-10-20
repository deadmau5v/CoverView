import React, { useState, useEffect, useContext } from "react";
import unsplash from "../utils/unsplashConfig";
import { ImgContext } from "../utils/ImgContext";

const UnsplashSearch = ({ largeImgPreview }) => {
  const [imageList, setImageList] = useState([]);
  const [searchText, setSearchText] = useState("setup");
  const { setUnsplashImage } = useContext(ImgContext);

  const searchImages = () => {
    unsplash.search
      .getPhotos({
        query: searchText,
        page: 1,
        per_page: 30,
        // orientation:'portrait'
      })
      .then((response) => {
        // console.log(response.response.results);
        setImageList(response.response.results);
      });
  };

  const selectImage = (image) => {
    setUnsplashImage({
      url: image.urls.regular,
      name: image.user.name,
      avatar: image.user.profile_image.small,
      profile: `${image.user.links.html}?utm_source=https://coverview.vercel.app&utm_medium=referral`,
      downloadLink: image.links.download_location,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchImages(searchText);
  };

  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: "setup",
        page: 1,
        per_page: 30,
      })
      .then((response) => {
        // console.log(response.response.results);
        setImageList(response.response.results);
      });
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-full flex-col items-center justify-center bg-white p-2">
        <div className="flex w-full items-center px-6">
          <form
            onSubmit={(e) => handleSearchSubmit(e)}
            className="mx-auto mb-2 flex w-full rounded-full border border-gray-50 bg-gray-50"
          >
            <input
              type="text"
              value={searchText}
              placeholder="搜索照片"
              className="w-full rounded-full bg-gray-50 p-1 px-4 text-lg focus:outline-none"
              onChange={(e) => setSearchText(e.target.value)}
            />

            <button type="submit" onClick={() => searchImages(searchText)}>
              <svg
                className="ml-auto h-9 w-9 rounded-full bg-gray-700 p-2 text-white hover:bg-gray-800"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnsplashSearch;
