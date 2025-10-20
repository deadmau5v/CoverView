import React, { useContext, useState } from "react";
// import { exportComponentAsPNG } from "react-component-export-image";
import "./CoverImage.css";
import { ImgContext } from "../utils/ImgContext";
import unsplash from "../utils/unsplashConfig";
import domtoimage from "dom-to-image";

const ComponentToImg = (props: any) => {
  const [loading, setLoading] = useState(false);

  const { unsplashImage } = useContext(ImgContext);
  const componentRef = React.createRef<HTMLDivElement>();
  const downloadFormat = (props.downloadAs || "WEBP").toUpperCase();

  async function saveImage(data, filename) {
    const anchor = document.createElement("a");
    anchor.href = data;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  async function convertToWebp(data, quality = 0.8) {
    try {
      const image = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = data;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      if (!context) {
        return data;
      }

      context.drawImage(image, 0, 0);
      const webpData = canvas.toDataURL("image/webp", quality);
      if (webpData && webpData.startsWith("data:image/webp")) {
        return webpData;
      }

      return data;
    } catch (error) {
      console.error("Unable to convert image to WebP", error);
      return data;
    }
  }

  const downloadImage = async () => {
    // exportComponentAsPNG(componentRef, 'cover')
    setLoading(true);
    try {
      const element = componentRef.current;
      if (!element) {
        throw new Error("Missing component reference for export");
      }

      // console.log(element)
      // console.log(element.offsetHeight)

      const devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const scale = devicePixelRatio > 1 ? 1.6 : 1;
      const width = element.offsetWidth * scale;
      const height = element.offsetHeight * scale;

      const pngData = await domtoimage.toPng(element, {
        height,
        width,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${element.offsetWidth}px`,
          height: `${element.offsetHeight}px`,
        },
      });

      const shouldExportWebp = downloadFormat === "WEBP";
      const processedData = shouldExportWebp ? await convertToWebp(pngData) : pngData;
      const isWebp = processedData.startsWith("data:image/webp");
      const filename = isWebp ? "cover.webp" : "cover.png";
      await saveImage(processedData, filename);

      if (unsplashImage) {
        unsplash.photos.trackDownload({ downloadLocation: unsplashImage.downloadLink });
      }
    } catch (error) {
      console.error("Failed to export cover image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div ref={componentRef}>{props.children}</div>
      <button
        className="m-4 flex items-center rounded-lg border bg-gray-700 p-2 px-4 text-xl text-white hover:bg-gray-800"
        onClick={() => downloadImage()}
      >
        <span>
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate h-6 w-6 animate-spin text-white"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          )}
        </span>

        <span className="mx-2">下载</span>
      </button>
    </React.Fragment>
  );
};

export default ComponentToImg;
