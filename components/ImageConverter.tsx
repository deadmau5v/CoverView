"use client";

import Link from "next/link";
import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

const formatOptions = [
  { value: "image/png", extension: "png", labelKey: "converter.formats.png" },
  { value: "image/jpeg", extension: "jpg", labelKey: "converter.formats.jpeg" },
  { value: "image/webp", extension: "webp", labelKey: "converter.formats.webp" },
] as const;

type OutputFormat = (typeof formatOptions)[number]["value"];

type SourceImage = {
  file: File;
  url: string;
  width: number;
  height: number;
};

type ConvertedImage = {
  blob: Blob;
  url: string;
  format: OutputFormat;
  quality: number;
};

function getImageFileFromTransfer(dataTransfer: DataTransfer | null): File | null {
  if (!dataTransfer) {
    return null;
  }

  if (dataTransfer.files && dataTransfer.files.length > 0) {
    const imageFile = Array.from(dataTransfer.files).find((file) => file.type.startsWith("image/"));
    if (imageFile) {
      return imageFile;
    }
  }

  if (dataTransfer.items && dataTransfer.items.length > 0) {
    for (const item of Array.from(dataTransfer.items)) {
      if (item.kind === "file" && item.type.startsWith("image/")) {
        const imageFile = item.getAsFile();
        if (imageFile) {
          return imageFile;
        }
      }
    }
  }

  return null;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const fractionDigits = value >= 10 ? 1 : 2;
  return `${value.toFixed(fractionDigits)} ${units[unitIndex]}`;
}

async function readImageSizeFromUrl(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => {
      resolve({
        width: image.naturalWidth,
        height: image.naturalHeight,
      });
    };
    image.onerror = () => {
      reject(new Error("Unable to read image size."));
    };
    image.src = url;
  });
}

function getFormatMeta(format: OutputFormat) {
  return formatOptions.find((option) => option.value === format) ?? formatOptions[0];
}

export default function ImageConverter() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const loadIdRef = useRef(0);

  const [sourceImage, setSourceImage] = useState<SourceImage | null>(null);
  const [convertedImage, setConvertedImage] = useState<ConvertedImage | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/webp");
  const [quality, setQuality] = useState(80);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoadingSource, setIsLoadingSource] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearConvertedImage = useCallback(() => {
    setConvertedImage((current) => {
      if (current?.url) {
        URL.revokeObjectURL(current.url);
      }
      return null;
    });
  }, []);

  const resetAll = useCallback(() => {
    setErrorMessage("");
    clearConvertedImage();
    setSourceImage((current) => {
      if (current?.url) {
        URL.revokeObjectURL(current.url);
      }
      return null;
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [clearConvertedImage]);

  const handleIncomingFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setErrorMessage(
          t("converter.errors.notImage", { defaultValue: "Please provide an image file." })
        );
        return;
      }

      const loadId = loadIdRef.current + 1;
      loadIdRef.current = loadId;

      setIsLoadingSource(true);
      setErrorMessage("");
      clearConvertedImage();

      const sourceUrl = URL.createObjectURL(file);
      try {
        const size = await readImageSizeFromUrl(sourceUrl);

        if (loadIdRef.current !== loadId) {
          URL.revokeObjectURL(sourceUrl);
          return;
        }

        setSourceImage((current) => {
          if (current?.url) {
            URL.revokeObjectURL(current.url);
          }
          return {
            file,
            url: sourceUrl,
            width: size.width,
            height: size.height,
          };
        });
      } catch (error) {
        URL.revokeObjectURL(sourceUrl);
        setErrorMessage(
          t("converter.errors.loadFailed", {
            defaultValue: "Image loading failed, please try another file.",
          })
        );
      } finally {
        if (loadIdRef.current === loadId) {
          setIsLoadingSource(false);
        }
      }
    },
    [clearConvertedImage, t]
  );

  const handleFilePickerChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }
      void handleIncomingFile(file);
    },
    [handleIncomingFile]
  );

  const handlePasteIntoDropZone = useCallback(
    (event: React.ClipboardEvent<HTMLLabelElement>) => {
      const file = getImageFileFromTransfer(event.clipboardData);
      if (!file) {
        return;
      }
      event.preventDefault();
      void handleIncomingFile(file);
    },
    [handleIncomingFile]
  );

  useEffect(() => {
    const handleWindowPaste = (event: ClipboardEvent) => {
      const file = getImageFileFromTransfer(event.clipboardData);
      if (!file) {
        return;
      }
      event.preventDefault();
      void handleIncomingFile(file);
    };

    window.addEventListener("paste", handleWindowPaste);
    return () => {
      window.removeEventListener("paste", handleWindowPaste);
    };
  }, [handleIncomingFile]);

  useEffect(() => {
    return () => {
      if (sourceImage?.url) {
        URL.revokeObjectURL(sourceImage.url);
      }
    };
  }, [sourceImage?.url]);

  useEffect(() => {
    return () => {
      if (convertedImage?.url) {
        URL.revokeObjectURL(convertedImage.url);
      }
    };
  }, [convertedImage?.url]);

  const handleDragOver = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault();
      setIsDragActive(false);

      const file = getImageFileFromTransfer(event.dataTransfer);
      if (!file) {
        setErrorMessage(
          t("converter.errors.dropFailed", {
            defaultValue: "No image found in dropped content.",
          })
        );
        return;
      }

      void handleIncomingFile(file);
    },
    [handleIncomingFile, t]
  );

  const convertImage = useCallback(async () => {
    if (!sourceImage) {
      return;
    }

    setIsConverting(true);
    setErrorMessage("");

    try {
      const image = new window.Image();
      const loaded = new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Image decode failed"));
      });
      image.src = sourceImage.url;
      await loaded;

      const canvas = document.createElement("canvas");
      canvas.width = sourceImage.width;
      canvas.height = sourceImage.height;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas context unavailable");
      }

      if (outputFormat === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.drawImage(image, 0, 0, sourceImage.width, sourceImage.height);

      const blob = await new Promise<Blob | null>((resolve) => {
        const qualityValue = outputFormat === "image/png" ? undefined : quality / 100;
        canvas.toBlob(resolve, outputFormat, qualityValue);
      });

      if (!blob) {
        throw new Error("Conversion failed");
      }

      const resultUrl = URL.createObjectURL(blob);
      setConvertedImage((current) => {
        if (current?.url) {
          URL.revokeObjectURL(current.url);
        }
        return {
          blob,
          url: resultUrl,
          format: outputFormat,
          quality,
        };
      });
    } catch (error) {
      setErrorMessage(
        t("converter.errors.convertFailed", {
          defaultValue: "Conversion failed for this format. Try another format.",
        })
      );
    } finally {
      setIsConverting(false);
    }
  }, [outputFormat, quality, sourceImage, t]);

  const convertedFileName = useMemo(() => {
    if (!sourceImage || !convertedImage) {
      return "converted-image";
    }
    const sourceName = sourceImage.file.name.replace(/\.[^/.]+$/, "") || "converted-image";
    const extension = getFormatMeta(convertedImage.format).extension;
    return `${sourceName}.${extension}`;
  }, [convertedImage, sourceImage]);

  const qualityInputDisabled = outputFormat === "image/png";
  const qualityText = qualityInputDisabled ? "100%" : `${quality}%`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-Inter text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            {t("converter.backHome", { defaultValue: "Back to Home" })}
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/editor"
              className="rounded-xl bg-gray-700 px-4 py-2 font-Inter text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
            >
              {t("converter.openEditor", { defaultValue: "Open Cover Editor" })}
            </Link>
            <Link
              href="/icon-generator"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-Inter text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {t("converter.openIconGenerator", { defaultValue: "Open ICO Generator" })}
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="font-Anek text-3xl font-extrabold text-slate-800 md:text-5xl">
            {t("converter.title", { defaultValue: "Image Converter" })}
          </h1>
          <p className="mt-3 max-w-3xl font-Inter text-base text-slate-600 md:text-lg">
            {t("converter.subtitle", {
              defaultValue:
                "Pure frontend conversion. Paste from clipboard, drag and drop, pick format, then control compression quality.",
            })}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-Poppins text-xl font-semibold text-slate-800 md:text-2xl">
                {t("converter.inputTitle", { defaultValue: "Input Image" })}
              </h2>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-lg border border-slate-300 px-3 py-1.5 font-Inter text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {t("converter.reset", { defaultValue: "Reset" })}
              </button>
            </div>

            <label
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onPaste={handlePasteIntoDropZone}
              tabIndex={0}
              className={`block cursor-pointer rounded-2xl border-2 border-dashed p-4 transition md:p-6 ${
                isDragActive
                  ? "border-indigo-400 bg-indigo-50"
                  : "border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/50"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFilePickerChange}
              />

              {!sourceImage && (
                <div className="py-10 text-center md:py-14">
                  <p className="font-Poppins text-xl font-semibold text-slate-700 md:text-2xl">
                    {t("converter.dropzone.primary", {
                      defaultValue: "Drop image here or click to upload",
                    })}
                  </p>
                  <p className="mt-2 font-Inter text-sm text-slate-500 md:text-base">
                    {t("converter.dropzone.secondary", {
                      defaultValue: "Supports clipboard paste, PNG, JPG, WEBP and more",
                    })}
                  </p>
                </div>
              )}

              {sourceImage && (
                <div>
                  <img
                    src={sourceImage.url}
                    alt={t("converter.sourceAlt", { defaultValue: "Source image preview" })}
                    className="mx-auto max-h-[440px] w-auto rounded-xl border border-slate-200 bg-white object-contain"
                  />
                  <div className="mt-3 flex flex-wrap items-center gap-3 font-Inter text-xs text-slate-600 md:text-sm">
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {sourceImage.width} x {sourceImage.height}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {formatBytes(sourceImage.file.size)}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {sourceImage.file.type}
                    </span>
                  </div>
                </div>
              )}
            </label>

            <p className="mt-3 font-Inter text-sm text-slate-500">
              {t("converter.pasteHint", {
                defaultValue: "Tip: Press Ctrl/Cmd + V anywhere to paste clipboard image.",
              })}
            </p>

            {isLoadingSource && (
              <p className="mt-3 font-Inter text-sm font-medium text-indigo-600">
                {t("converter.loadingSource", { defaultValue: "Reading image..." })}
              </p>
            )}

            {errorMessage && (
              <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-Inter text-sm text-red-700">
                {errorMessage}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <h2 className="mb-4 font-Poppins text-xl font-semibold text-slate-800 md:text-2xl">
              {t("converter.outputTitle", { defaultValue: "Output Settings" })}
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="outputFormat"
                  className="mb-2 block font-Inter text-sm font-semibold text-slate-700"
                >
                  {t("converter.formatLabel", { defaultValue: "Target Format" })}
                </label>
                <select
                  id="outputFormat"
                  value={outputFormat}
                  onChange={(event) => {
                    clearConvertedImage();
                    setOutputFormat(event.target.value as OutputFormat);
                  }}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-Inter text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                >
                  {formatOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey, { defaultValue: option.extension.toUpperCase() })}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="quality"
                    className="font-Inter text-sm font-semibold text-slate-700"
                  >
                    {t("converter.qualityLabel", { defaultValue: "Compression Quality" })}
                  </label>
                  <span className="font-Inter text-sm font-semibold text-slate-700">
                    {qualityText}
                  </span>
                </div>
                <input
                  id="quality"
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={quality}
                  disabled={qualityInputDisabled}
                  onChange={(event) => {
                    clearConvertedImage();
                    setQuality(Number(event.target.value));
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <p className="mt-2 font-Inter text-xs text-slate-500">
                  {qualityInputDisabled
                    ? t("converter.qualityHintPng", {
                        defaultValue: "PNG is lossless, quality slider does not change output.",
                      })
                    : t("converter.qualityHint", {
                        defaultValue: "Lower value = smaller size, higher value = better quality.",
                      })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => void convertImage()}
                disabled={!sourceImage || isConverting || isLoadingSource}
                className="w-full rounded-xl bg-indigo-500 px-4 py-2.5 font-Poppins text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isConverting
                  ? t("converter.converting", { defaultValue: "Converting..." })
                  : t("converter.convert", { defaultValue: "Convert Image" })}
              </button>

              {convertedImage && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 font-Inter text-sm font-semibold text-slate-700">
                    {t("converter.resultTitle", { defaultValue: "Converted Result" })}
                  </p>
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-Inter text-xs text-slate-600">
                    <span className="rounded-full bg-white px-2.5 py-1">
                      {formatBytes(convertedImage.blob.size)}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1">
                      {getFormatMeta(convertedImage.format).extension.toUpperCase()}
                    </span>
                    <span className="rounded-full bg-white px-2.5 py-1">
                      {convertedImage.format === "image/png"
                        ? "100%"
                        : `${convertedImage.quality}%`}
                    </span>
                  </div>
                  <a
                    href={convertedImage.url}
                    download={convertedFileName}
                    className="inline-flex rounded-lg bg-gray-700 px-4 py-2 font-Inter text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    {t("converter.download", { defaultValue: "Download Converted Image" })}
                  </a>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
