import React, { useContext } from 'react';
import { ImgContext } from '../../utils/ImgContext';


const ModernTheme = ({ config }) => {

    const { title, pattern, author, icon, font, fontSize, customIcon } = config;
    const { themeColors } = useContext(ImgContext);

    return (
        <div className="w-full h-full bg-white ">
            <div className=" overflow-y-hidden w-full h-full flex  items-center">
                <div className={`h-full w-full p-4 flex items-center ${pattern} `}
                    style={{ backgroundColor: themeColors.background }}
                >

                    {
                        customIcon ?
                            <div className="mx-auto items-center justify-center flex">
                                <img src={customIcon} alt="img" className="w-28 h-28 rounded-full border-4" 
                                    style={{ backgroundColor: themeColors.card, borderColor: themeColors.card }} />
                            </div>
                            :
                            <div className=" rounded-full p-6 w-32 h-32 mx-auto items-center justify-center flex"
                                style={{ backgroundColor: themeColors.card }}
                            >
                                <i className={`devicon-${icon.value}-plain p-4 dev-icon text-7xl`}
                                    style={{ color: themeColors.primary }}
                                ></i>
                            </div>
                    }


                    <div className="h-full w-2/3">
                        <div className={`${font} px-12 justify-center text-left rounded-xl h-full p-4 flex flex-col`}
                            style={{ backgroundColor: themeColors.card }}
                        >
                            <h1 className={`${fontSize} font-bold`}
                                style={{ color: themeColors.foreground }}
                            >{title}</h1>
                            <h2 className="text-xl mt-10 font-semibold text-left"
                                style={{ color: themeColors.muted }}
                            >{author}</h2>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ModernTheme;