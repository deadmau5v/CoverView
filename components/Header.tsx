"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { t } = useTranslation();
  const tweetText = encodeURIComponent(
    `Check out CoverView - Create beautiful blog cover images https://coverview.vercel.app @rutikdotdev`
  );

  return (
    <div className="flex border-b-2 border-dashed border-gray-100 bg-white p-2 text-xl md:px-2">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="logo" width={32} height={32} className="mx-4" />
        <h1 className="font-semibold">Coverview</h1>
      </Link>

      <div className="ml-auto flex items-center gap-2 md:mr-4">
        <LanguageSwitcher />
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
}
