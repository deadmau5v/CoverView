import React, { useState, useContext } from 'react';
import { ImgContext } from '../../utils/ImgContext';

const MobileMockupTheme = ({ config }) => {
    const { title, font, fontSize } = config;
    const { themeColors } = useContext(ImgContext);

    const [image, setImage] = useState()

    return (
        <div className={`bg-white w-full h-full`}>


            <div className={`overflow-y-hidden flex flex-row px-10 items-center w-full h-full justify-center pt-4`}
                style={{ backgroundColor: themeColors.background }}
            >


                <h1 className={`${font} ${fontSize} w-1/2 px-4 font-bold text-left`}
                    style={{ color: themeColors.foreground }}
                >{title}</h1>

                <div className="w-5/12 mx-auto m-4 mt-10 group h-full shadow-lg flex flex-col border-t-8 border-x-8 rounded-t-3xl"
                    style={{ backgroundColor: themeColors.card, borderColor: themeColors.muted }}
                >
                    <div className="h-8 w-full p-2 pb-3 flex items-center rounded-t"
                        style={{ backgroundColor: themeColors.muted }}
                    >

                        <div className="flex mx-auto items-center">

                            <div className="h-3 w-3 rounded-full mx-1" style={{ backgroundColor: themeColors.card }}></div>
                            <div className="h-2 w-20 rounded-full mx-1" style={{ backgroundColor: themeColors.card }}></div>

                        </div>


                    </div>



                    {image ?
                        <div className="group relative">
                            <img src={image && image} className="object-cover rounded -translate-y-1 h-full" alt="preview" />
                            <button
                                onClick={() => setImage('')}
                                className="ml-auto mr-4 cursor-pointer">
                                <svg className="group-hover:inline-block absolute top-4 right-2 hidden w-8 h-8 p-2 rounded-full z-10" 
                                    style={{ backgroundColor: themeColors.muted, color: themeColors.foreground }}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                            </button>
                        </div>
                        :
                        <div className="flex flex-col px-4 rounded-xl py-20 items-center justify-center"
                            style={{ backgroundColor: themeColors.card }}
                        >
                            <input type="file"
                                className="text-sm flex flex-col cursor-pointer mb-2 rounded border"
                                style={{ backgroundColor: themeColors.card, color: themeColors.foreground, borderColor: themeColors.border }}
                                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                            />
                            <span className="text-center italic" 
                                style={{ color: themeColors.muted }}
                            >click to upload a screenshot</span>
                        </div>

                    }
                </div>





            </div>


        </div>
    );
}

export default MobileMockupTheme;