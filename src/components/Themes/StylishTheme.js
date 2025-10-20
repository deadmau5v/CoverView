import React, { useContext } from 'react';
import { ImgContext } from '../../utils/ImgContext';
import UnsplashSearch from '../UnsplashSearch';

const StylishTheme = ({ config }) => {
    const { title, author, font, fontSize, icon, customIcon } = config;
    const { unsplashImage, setUnsplashImage, themeColors } = useContext(ImgContext);


    return (
        <div className="bg-white w-full h-full">


            <div className={`overflow-y-hidden flex flex-col w-full h-full`}
                style={{ backgroundColor: themeColors.background }}
            >

                <div className="flex flex-row items-stretch justify-center w-full h-full">

                    <div className="h-full w-1/2 rounded-l-xl flex"
                        style={{ backgroundColor: themeColors.card }}
                    >
                        <div className={`${font} px-12 justify-center text-left rounded-xl h-full w-full p-6 md:p-10 flex flex-col gap-6`}>
                            <h1 className={`${fontSize} font-bold break-words`}
                                style={{ color: themeColors.foreground }}
                            >{title}</h1>
                            <div className="flex items-center gap-4 text-left">
                                {
                                    customIcon ?
                                        <div className="">
                                            <img src={customIcon} alt="img" className="w-12 h-12 rounded-full border" 
                                                style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }} />
                                        </div>
                                        :
                                        <div className="items-center justify-center flex">
                                            <i className={`devicon-${icon.value}-plain dev-icon text-3xl`}
                                                style={{ color: themeColors.primary }}
                                            ></i>
                                        </div>
                                }
                                <h2 className="text-xl font-semibold text-left"
                                    style={{ color: themeColors.muted }}
                                >{author}</h2>


                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 h-full">


                        {unsplashImage ?
                            <div className='relative w-full h-full flex group'>

                                <img src={unsplashImage.url && unsplashImage.url} className="object-cover w-full h-full" alt="preview" />


                                <button
                                    onClick={() => setUnsplashImage('')}
                                    className="absolute  top-4 right-2 cursor-pointer">
                                    <svg className="group-hover:inline-block hidden w-6 h-6 text-gray-800 bg-white p-1 rounded-full z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                                </button>

                                <div className="absolute  bottom-4 right-4 opacity-80">
                                    <div className=" group-hover:flex hidden items-center">
                                        <span className="text-sm text-white mx-2">Photo by</span>
                                        <a href={unsplashImage.profile} target="_blank" rel="noreferrer" className="cursor-pointer flex items-center bg-gray-300 rounded-full text-sm">
                                            <img src={unsplashImage.avatar && unsplashImage.avatar} alt={unsplashImage.name} className="h-6 w-6 rounded-full mr-2" />

                                            <span className="pr-2">{unsplashImage.name}</span>
                                        </a>

                                        <a href="https://unsplash.com/?utm_source=https://coverview.vercel.app&utm_medium=referral" className="text-sm text-white mx-2">Unsplash</a>
                                    </div>

                                </div>
                            </div>
                            :
                            <div className="flex h-full w-full flex-col items-center justify-center"
                                style={{ backgroundColor: themeColors.card }}
                            >

                                <UnsplashSearch />
                            </div>

                        }

                    </div>
                </div>


            </div>

        </div>
    );
}

export default StylishTheme;
