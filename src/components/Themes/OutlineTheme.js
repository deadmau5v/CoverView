import React, { useContext } from 'react';
import { ImgContext } from '../../utils/ImgContext';

const OutlineTheme = ({ config }) => {
    const { title, author, icon, font, fontSize, customIcon } = config;
    const { themeColors } = useContext(ImgContext);

    return (
        <div className="w-full h-full bg-white ">


            <div className={`overflow-y-hidden flex flex-col px-10 h-full`}
                style={{ backgroundColor: themeColors.background }}
            >


                <div className={`${font} rounded-2xl py-6 flex flex-col  `}>
                    {
                        customIcon ?
                            <div className=" m-6">
                                <img src={customIcon} alt="img" className="rounded-full object-cover w-24 h-24 p-1 border" 
                                    style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }} />
                            </div>
                            :
                            <div className="mr-auto ml-2 items-center justify-center flex">
                                <i className={`devicon-${icon.value}-plain p-4 dev-icon text-8xl`}
                                    style={{ color: themeColors.primary }}
                                ></i>
                            </div>
                    }
                    <h1 className={`${fontSize} p-4 font-bold`}
                        style={{ color: themeColors.foreground }}
                    >{title}</h1>

                    <div className={`${font} w-full h-16 flex mt-auto mb-0 p-2 px-6 items-center `}>

                        <h2 className="text-2xl font-semibold"
                            style={{ color: themeColors.accent }}
                        >{author}</h2>

                    </div>
                </div>



            </div>


        </div>
    );
}

export default OutlineTheme;