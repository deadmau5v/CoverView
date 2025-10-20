import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.png";
const Header = () => {
  const tweetText = encodeURIComponent(
    `在这里写下你的想法，试一试 https://coverview.vercel.app @rutikdotdev`
  );

  return (
    <div className="flex border-b-2 border-dashed border-gray-100 bg-white p-2 text-xl md:px-2">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="logo" className="mx-4 h-8 w-8" />
        <h1 className="font-semibold">Coverview</h1>
      </Link>

      <div className="ml-auto flex items-center md:mr-4">
        {/* <Link to="/faq" className="text-gray-700 hover:text-gray-800 text-base font-Nunito mx-4"><span className="hidden md:inline-block">How to use</span></Link> */}
        <a
          href="https://github.com/deadmau5v/CoverView"
          target="_blank"
          rel="noreferrer"
          className="mx-2 hidden items-center rounded-full bg-gray-700 p-1 px-4 font-Nunito text-xs text-white hover:bg-gray-800 md:flex md:text-sm"
        >
          ⭐ 在 GitHub 上加星
        </a>
        <a
          href={`https://x.com/intent/tweet?text=${tweetText}`}
          className="mx-2 rounded-full bg-blue-400 p-1 px-4 text-xs font-semibold text-white hover:bg-blue-500 md:text-sm"
        >
          分享到 Twitter
        </a>
      </div>
    </div>
  );
};

export default Header;
