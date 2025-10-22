import React from "react";
import { useTranslation, Trans } from "react-i18next";
import logo from "../assets/icons/logo.png";
import { Link } from "react-router-dom";
import cover1 from "../assets/images/cover1.webp";
import cover2 from "../assets/images/cover2.webp";
import cover3 from "../assets/images/cover3.webp";
import cover4 from "../assets/images/cover4.webp";

import step1 from "../assets/images/step1.png";
import step2 from "../assets/images/step2.png";

import hashnodeLogo from "../assets/images/hashnode-logo.png";
import devLogo from "../assets/images/dev-logo.png";

import WallOfLove from "./walloflove";
import LanguageSwitcher from "./LanguageSwitcher";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      <div className="">
        <div className="mx-auto flex items-center p-2 text-xl md:w-10/12">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="mx-2 h-8 w-8" />
            <h1 className="font-Inter text-lg font-semibold md:text-xl">Coverview</h1>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="https://github.com/deadmau5v/CoverView"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center rounded-xl bg-gray-700 font-Inter font-semibold text-white duration-300 hover:translate-x-2"
            >
              <span className="px-2 py-1 text-xs md:px-4 md:py-2 md:text-sm">
                {t("header.starOnGithub")}
              </span>
            </a>
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center py-6 md:px-20">
          <h1 className="mx-6 my-10 text-center font-Anek text-4xl font-extrabold text-gray-700 md:mx-10 md:w-7/12 md:text-5xl">
            {t("home.hero.title")}
          </h1>
          <Link
            to="/editor"
            className="group mx-auto rounded-full border-4 border-gray-100 bg-gray-700 p-2 px-6 font-Poppins text-base font-semibold text-white duration-300 hover:translate-x-2 hover:bg-gray-800 md:p-4 md:px-8 md:text-2xl"
          >
            <span className="text-lg font-semibold md:text-2xl">{t("home.hero.cta")}</span>
          </Link>
        </div>

        <div className="mx-auto flex flex-row items-center justify-center md:w-10/12">
          <div className="animate m-4 flex w-1/5 -translate-y-20 rotate-6 transform flex-col rounded-lg border bg-white p-2 shadow-lg shadow-gray-50 duration-100 hover:-rotate-3 hover:scale-105">
            <img src={cover2} className="mb-2 rounded border border-gray-100" alt="cover1" />
            <p className="animate mb-2 h-2 animate-pulse rounded bg-gray-50 md:h-5"></p>
            <p className="animate mb-2 h-2 w-8/12 animate-pulse rounded bg-gray-50 md:h-5"></p>
          </div>

          <div className="m-4 flex w-1/3 -rotate-2 transform flex-col rounded-lg bg-white p-4 shadow-lg shadow-gray-50 duration-300 hover:rotate-3 hover:scale-105">
            <img src={cover1} className="mb-2 rounded border border-gray-100" alt="cover-2" />
            <p className="animate mb-2 h-3 animate-pulse rounded bg-gray-50 md:h-6"></p>
            <p className="animate mb-2 h-3 w-8/12 animate-pulse rounded bg-gray-50 md:h-6"></p>
          </div>

          <div className="animate sshadow-lg m-4 flex w-1/5 -translate-y-20 -rotate-6 transform flex-col rounded-lg border bg-white p-2 shadow-gray-50 duration-100 hover:rotate-3 hover:scale-105">
            <img src={cover3} className="mb-2 rounded border border-gray-100" alt="cover3" />
            <p className="animate mb-2 h-2 animate-pulse rounded bg-gray-50 md:h-5"></p>
            <p className="animate mb-2 h-2 w-8/12 animate-pulse rounded bg-gray-50 md:odd:h-5"></p>
          </div>
        </div>
      </div>

      <div className="my-t0 mx-auto md:mt-32">
        <div className="mx-auto flex flex-col md:w-10/12">
          <div className="mx-auto w-full p-10 text-center md:p-4">
            <h2 className="mx-auto px-4 font-Anek text-3xl font-bold text-gray-700 md:w-9/12 md:text-5xl">
              {t("home.section1.title")}
            </h2>
          </div>

          <div className="mx-auto flex flex-col justify-center gap-2 md:flex-row md:gap-6">
            <div className="flex flex-col gap-4 rounded-xl p-10 shadow-gray-100 md:w-4/12">
              <div className="mx-auto my-2 flex h-24 w-24 items-center justify-center rounded-full bg-purple-300 p-4 md:mx-0">
                <svg
                  className="h-20 w-20 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  ></path>
                </svg>
              </div>
              <p className="text-center font-Nunito text-xl md:text-left md:text-2xl">
                <Trans i18nKey="home.section1.feature1.description">
                  <span className="font-bold"></span>
                </Trans>
              </p>
            </div>

            <div className="flex flex-col gap-4 rounded-xl p-10 shadow-gray-100 md:w-4/12">
              <div className="mx-auto my-2 flex h-24 w-24 items-center justify-center rounded-full bg-green-300 p-4 md:mx-0">
                <svg
                  className="h-20 w-20 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <p className="text-center font-Nunito text-xl md:text-left md:text-2xl">
                <Trans i18nKey="home.section1.feature2.description">
                  <span className="font-bold"></span>
                </Trans>
              </p>
            </div>
          </div>
        </div>

        <h2 className="mx-10 mt-12 text-center font-Anek text-3xl font-bold text-gray-700 md:mx-auto md:mt-32 md:w-7/12 md:text-5xl">
          <Trans i18nKey="home.section2.title">
            <span className="text-indigo-400"></span>
          </Trans>
        </h2>

        <div className="mx-auto flex flex-col gap-4 p-4 md:my-16 md:w-8/12 md:flex-row">
          <div className="flex flex-col rounded-xl border-gray-50 px-4 pt-6 md:mx-10 md:w-1/2 md:border md:shadow-sm md:shadow-gray-50">
            <div className="text-center">
              <div className="mx-auto w-max rounded-full bg-indigo-400 px-4 py-1 font-Anek text-xl font-semibold text-white">
                {t("home.section2.step1Title")}
              </div>

              <p className="mx-auto my-2 p-4 text-center font-Inter text-2xl font-semibold text-gray-700 md:text-3xl">
                {t("home.section2.step1Description")}
              </p>
            </div>
            <img
              src={step1}
              alt="preview"
              className="mx-auto mt-2 w-10/12 rounded-t-xl shadow-sm"
            />
          </div>

          <div className="flex flex-col rounded-xl px-4 pt-6 md:mx-10 md:w-1/2 md:border md:border-gray-50 md:shadow-sm md:shadow-gray-50">
            <div className="text-center">
              <div className="mx-auto w-max rounded-full bg-indigo-400 px-4 py-1 font-Anek text-xl font-semibold text-white">
                {t("home.section2.step2Title")}
              </div>

              <p className="mx-auto my-2 p-4 text-center font-Inter text-2xl font-semibold text-gray-700 md:text-3xl">
                {t("home.section2.step2Description")}
              </p>
            </div>
            <img
              src={step2}
              alt="preview"
              className="mx-auto mb-0 mt-auto w-10/12 rounded-t-xl shadow-sm"
            />
          </div>
        </div>

        <div className="mx-auto flex flex-col items-center justify-center rounded-xl p-6 md:w-7/12 md:flex-row md:border md:border-gray-50 md:shadow-sm md:shadow-gray-50">
          <div className="m-4 text-center md:w-1/2">
            <div className="mx-auto w-max rounded-full bg-indigo-400 px-4 py-1 font-Anek text-xl font-semibold text-white">
              {t("home.section2.step3Title")}
            </div>
            <p className="mx-auto my-2 mt-4 pb-2 text-center font-Inter text-2xl font-semibold text-gray-700 md:text-3xl">
              {t("home.section2.step3Description")}
            </p>

            <p className="text-lg text-gray-500 md:text-xl">{t("home.section2.step3Subtitle")}</p>
          </div>

          <div className="hideout flex p-6 md:w-1/2">
            <div className="flex w-1/2 flex-col">
              <img
                src={cover1}
                alt="preview"
                className="m-2 rounded-lg shadow-sm duration-300 hover:scale-105"
              />
              <img
                src={cover2}
                alt="preview"
                className="m-2 rounded-lg shadow-sm duration-300 hover:scale-105"
              />
            </div>

            <div className="mt-4 flex w-1/2 flex-col">
              <img
                src={cover3}
                alt="preview"
                className="m-2 rounded-lg shadow-sm duration-300 hover:scale-105"
              />
              <img
                src={cover4}
                alt="preview"
                className="m-2 rounded-lg shadow-sm duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mb-6 md:my-20 md:w-6/12">
          <div className="m-6 px-6 text-center">
            <p className="my-2 font-Inter text-xl font-semibold text-gray-700 md:text-2xl">
              {t("home.section3.description")}
            </p>
          </div>
          <div className="mx-auto flex justify-center gap-4">
            <img src={hashnodeLogo} className="w-10 md:w-20" alt="hashnode" />
            <img src={devLogo} className="w-10 md:w-20" alt="dev" />
          </div>
        </div>

        <WallOfLove />

        <div className="bg-gray-800 p-2 text-white">
          <div className="mx-auto p-6 pt-32 md:w-8/12">
            <h2 className="mx-auto text-center font-Anek text-4xl font-bold md:text-6xl">
              {t("home.footer.tagline")}
            </h2>
            <p className="mx-auto py-4 text-center font-Inter text-lg text-gray-300 md:w-8/12 md:text-2xl">
              {t("home.footer.subtitle")}
            </p>
            <Link to="/editor">
              <button className="mx-auto my-4 flex rounded-full bg-indigo-500 p-4 px-8 font-Nunito text-base font-semibold text-white duration-300 hover:translate-x-2 hover:bg-indigo-600 md:text-xl">
                {t("home.footer.cta")}
              </button>
            </Link>
          </div>

          <footer className="mx-auto flex w-full flex-col-reverse items-center justify-center gap-2 p-10 font-Inter md:w-10/12 md:flex-row md:justify-between md:px-20">
            <div className="flex flex-col gap-3">
              <span className="text-sm md:text-lg">
                {t("home.footer.builtBy")}{" "}
                <a
                  href="https://github.com/deadmau5v"
                  className="font-semibold underline decoration-wavy underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  deadmau5v
                </a>{" "}
                {t("home.footer.and")}{" "}
                <a
                  href="https://rutik.dev"
                  className="font-semibold underline decoration-wavy underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rutik Wankhade
                </a>
              </span>
              <a
                href="https://www.netlify.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white md:text-base"
              >
                <span>{t("home.footer.poweredBy")}</span>
                <img
                  src="https://www.netlify.com/v3/img/components/netlify-color-accent.svg"
                  alt="Netlify"
                  className="h-6"
                />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 text-sm md:text-lg">
              <Link to="/faq" className="hover:underline">
                {t("home.footer.links.guide")}
              </Link>
              <Link to="/code-of-conduct" className="hover:underline">
                {t("home.footer.links.codeOfConduct")}
              </Link>
              <a
                href="https://github.com/deadmau5v/CoverView"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {t("home.footer.links.github")}
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
