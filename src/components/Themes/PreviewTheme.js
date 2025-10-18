import React, { useState, useContext } from 'react';
import { ImgContext } from '../../utils/ImgContext';

const PreviewTheme = ({ config }) => {
    const { title, font, fontSize } = config;
    const { themeColors } = useContext(ImgContext);

    const [image, setImage] = useState()

    return (
        <div className="w-full h-full bg-white">


            <div className={`overflow-y-hidden flex flex-col px-4 pt-4 w-full h-full`}
                style={{ backgroundColor: themeColors.background }}
            >

                <h1 className={`${font} ${fontSize} p-10 font-bold text-center`}
                    style={{ color: themeColors.foreground }}
                >{title}</h1>

                <div className="w-10/12 group mx-auto mt-auto mb-0 shadow-lg flex flex-col rounded-t-xl"
                    style={{ backgroundColor: themeColors.card, borderColor: themeColors.card }}
                >
                    <div className="h-8 w-full p-2 flex items-center rounded-t-xl"
                        style={{ backgroundColor: themeColors.muted }}
                    >
                        <div className="bg-red-400 h-3 w-3 rounded-full mx-1"></div>
                        <div className="bg-yellow-400 h-3 w-3 rounded-full mx-1"></div>
                        <div className="bg-green-400 h-3 w-3 rounded-full mx-1"></div>
                        <button
                            onClick={() => setImage('')}
                            className="ml-auto mr-4 cursor-pointer">
                            <svg className="group-hover:inline-block hidden w-4 h-4 rounded-full z-10" 
                                style={{ color: themeColors.foreground }}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>

                        </button>
                    </div>


                    {image ?
                        <div className="">
                            <img src={image && image} className="object-cover " alt="preview" />

                        </div>
                        :
                        <div className="flex flex-col p-20 py-28 items-center justify-center"
                            style={{ backgroundColor: themeColors.card }}
                        >
                            <input type="file"
                                className="text-xl cursor-pointer mb-2 rounded border"
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

export default PreviewTheme;