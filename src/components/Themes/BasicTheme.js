import React, { useContext } from 'react';
import { ImgContext } from '../../utils/ImgContext';


const BasicTheme = ({ config }) => {
    const { title, pattern, author, icon, font, fontSize, customIcon } = config;
    const { themeColors } = useContext(ImgContext);

    return (
        <div className=" bg-white w-full h-full ">
            <div className={`overflow-y-hidden flex items-center h-full ${pattern} `}
                style={{ backgroundColor: themeColors.background }}
            >

                <div className={`${font} md:w-10/12 m-auto flex flex-col pt-12 rounded-xl`}
                    style={{ backgroundColor: themeColors.card }}
                >
                    <div className="px-12">
                        <div>
                            <h1 className={`${fontSize} font-bold text-center`}
                                style={{ color: themeColors.foreground }}
                            >{title}</h1>
                        </div>
                    </div>

                    <div className=" flex mx-4  p-4 rounded-xl items-center"
                        style={{ backgroundColor: themeColors.card }}
                    >
                        {
                            customIcon ?
                                <div className="w-12 h-12  ">
                                    <img src={customIcon} alt="img" className="rounded-full p-1 border" 
                                        style={{ backgroundColor: themeColors.card, borderColor: themeColors.border }} />
                                </div>
                                :
                                <div className="mr-auto ml-2 items-center justify-center flex">
                                    <i className={`devicon-${icon.value}-plain p-4 dev-icon text-5xl`}
                                        style={{ color: themeColors.primary }}
                                    ></i>
                                </div>
                        }


                        <h2 className="text-xl ml-auto mr-2 font-semibold"
                            style={{ color: themeColors.foreground }}
                        >{author}</h2>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BasicTheme;