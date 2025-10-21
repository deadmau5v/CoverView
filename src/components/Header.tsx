import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/icons/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const { t } = useTranslation();
  const tweetText = encodeURIComponent(
    `Check out CoverView - Create beautiful blog cover images https://coverview.vercel.app @rutikdotdev`
  );

  return (
    <div className="flex border-b-2 border-dashed border-gray-100 bg-white p-2 text-xl md:px-2">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="logo" className="mx-4 h-8 w-8" />
        <h1 className="font-semibold">Coverview</h1>
      </Link>

      <div className="ml-auto flex items-center gap-2 md:mr-4">
        <LanguageSwitcher />
        {/* <Link to="/faq" className="text-gray-700 hover:text-gray-800 text-base font-Nunito mx-4"><span className="hidden md:inline-block">How to use</span></Link> */}
        <a
          href="https://github.com/deadmau5v/CoverView"
          target="_blank"
          rel="noreferrer"
          className="mx-2 hidden items-center rounded-full bg-gray-700 p-1 px-4 font-Nunito text-xs text-white hover:bg-gray-800 md:flex md:text-sm"
        >
          {t("header.starOnGithub")}
        </a>
        <a
          href={`https://x.com/intent/tweet?text=${tweetText}`}
          className="mx-2 rounded-full bg-blue-400 p-1 px-4 text-xs font-semibold text-white hover:bg-blue-500 md:text-sm"
        >
          {t("header.shareOnTwitter")}
        </a>
      </div>
    </div>
  );
};

export default Header;
