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

const iconSizes = [16, 24, 32, 48, 64, 128, 256] as const;

type SourceImage = {
  file: File;
  url: string;
  width: number;
  height: number;
};

type GeneratedIcon = {
  size: number;
  blob: Blob;
  url: string;
};

type BundleIcon = {
  blob: Blob;
  url: string;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
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

  return `${value.toFixed(value >= 10 ? 1 : 2)} ${units[unitIndex]}`;
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });

  if (!blob) {
    throw new Error("Canvas conversion failed.");
  }

  return blob;
}

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

function encodeIco(entries: Array<{ size: number; pngData: ArrayBuffer }>): Blob {
  const count = entries.length;
  const headerSize = 6 + count * 16;
  const headerBuffer = new ArrayBuffer(headerSize);
  const view = new DataView(headerBuffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);

  let offset = headerSize;

  entries.forEach((entry, index) => {
    const entryOffset = 6 + index * 16;
    const normalizedSize = entry.size >= 256 ? 0 : entry.size;

    view.setUint8(entryOffset, normalizedSize);
    view.setUint8(entryOffset + 1, normalizedSize);
    view.setUint8(entryOffset + 2, 0);
    view.setUint8(entryOffset + 3, 0);
    view.setUint16(entryOffset + 4, 1, true);
    view.setUint16(entryOffset + 6, 32, true);
    view.setUint32(entryOffset + 8, entry.pngData.byteLength, true);
    view.setUint32(entryOffset + 12, offset, true);

    offset += entry.pngData.byteLength;
  });

  return new Blob([new Uint8Array(headerBuffer), ...entries.map((entry) => entry.pngData)], {
    type: "image/x-icon",
  });
}

export default function IconGenerator() {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadIdRef = useRef(0);

  const [sourceImage, setSourceImage] = useState<SourceImage | null>(null);
  const [cropSize, setCropSize] = useState(0);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([16, 32, 48, 64, 128, 256]);
  const [generatedIcons, setGeneratedIcons] = useState<GeneratedIcon[]>([]);
  const [bundleIcon, setBundleIcon] = useState<BundleIcon | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isLoadingSource, setIsLoadingSource] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearGeneratedOutput = useCallback(() => {
    setGeneratedIcons((current) => {
      current.forEach((icon) => {
        URL.revokeObjectURL(icon.url);
      });
      return [];
    });
    setBundleIcon((current) => {
      if (current?.url) {
        URL.revokeObjectURL(current.url);
      }
      return null;
    });
  }, []);

  const resetAll = useCallback(() => {
    clearGeneratedOutput();
    setErrorMessage("");
    setSelectedSizes([16, 32, 48, 64, 128, 256]);
    setCropSize(0);
    setCropX(0);
    setCropY(0);
    setSourceImage((current) => {
      if (current?.url) {
        URL.revokeObjectURL(current.url);
      }
      return null;
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [clearGeneratedOutput]);

  const handleIncomingFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setErrorMessage(
          t("iconGenerator.errors.notImage", { defaultValue: "Please provide an image file." })
        );
        return;
      }

      const loadId = loadIdRef.current + 1;
      loadIdRef.current = loadId;

      clearGeneratedOutput();
      setErrorMessage("");
      setIsLoadingSource(true);

      const sourceUrl = URL.createObjectURL(file);

      try {
        const size = await readImageSizeFromUrl(sourceUrl);

        if (loadIdRef.current !== loadId) {
          URL.revokeObjectURL(sourceUrl);
          return;
        }

        const initialCropSize = Math.min(size.width, size.height);
        const initialCropX = Math.floor((size.width - initialCropSize) / 2);
        const initialCropY = Math.floor((size.height - initialCropSize) / 2);

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
        setCropSize(initialCropSize);
        setCropX(initialCropX);
        setCropY(initialCropY);
      } catch (error) {
        URL.revokeObjectURL(sourceUrl);
        setErrorMessage(
          t("iconGenerator.errors.loadFailed", {
            defaultValue: "Image loading failed, please try another file.",
          })
        );
      } finally {
        if (loadIdRef.current === loadId) {
          setIsLoadingSource(false);
        }
      }
    },
    [clearGeneratedOutput, t]
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
      generatedIcons.forEach((icon) => {
        URL.revokeObjectURL(icon.url);
      });
      if (bundleIcon?.url) {
        URL.revokeObjectURL(bundleIcon.url);
      }
    };
  }, [bundleIcon?.url, generatedIcons]);

  useEffect(() => {
    if (!sourceImage || cropSize <= 0 || !previewCanvasRef.current) {
      return;
    }

    const canvas = previewCanvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const image = new window.Image();
    image.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, cropX, cropY, cropSize, cropSize, 0, 0, canvas.width, canvas.height);
    };
    image.src = sourceImage.url;
  }, [cropSize, cropX, cropY, sourceImage]);

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
          t("iconGenerator.errors.dropFailed", {
            defaultValue: "No image found in dropped content.",
          })
        );
        return;
      }

      void handleIncomingFile(file);
    },
    [handleIncomingFile, t]
  );

  const maxCropSize = sourceImage ? Math.min(sourceImage.width, sourceImage.height) : 0;
  const minCropSize = maxCropSize > 0 ? Math.min(16, maxCropSize) : 1;
  const maxCropX = sourceImage ? Math.max(0, sourceImage.width - cropSize) : 0;
  const maxCropY = sourceImage ? Math.max(0, sourceImage.height - cropSize) : 0;

  const generateIcons = useCallback(async () => {
    if (!sourceImage || cropSize <= 0) {
      return;
    }

    if (selectedSizes.length === 0) {
      setErrorMessage(
        t("iconGenerator.errors.noSize", { defaultValue: "Select at least one icon size." })
      );
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");
    clearGeneratedOutput();

    try {
      const image = new window.Image();
      const loaded = new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Image decode failed"));
      });
      image.src = sourceImage.url;
      await loaded;

      const sortedSizes = [...selectedSizes].sort((a, b) => a - b);
      const perSizeIcons: GeneratedIcon[] = [];
      const bundleEntries: Array<{ size: number; pngData: ArrayBuffer }> = [];

      for (const size of sortedSizes) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas context unavailable");
        }

        context.clearRect(0, 0, size, size);
        context.drawImage(image, cropX, cropY, cropSize, cropSize, 0, 0, size, size);

        const pngBlob = await canvasToBlob(canvas);
        const pngData = await pngBlob.arrayBuffer();

        bundleEntries.push({ size, pngData });

        const singleIcoBlob = encodeIco([{ size, pngData }]);
        perSizeIcons.push({
          size,
          blob: singleIcoBlob,
          url: URL.createObjectURL(singleIcoBlob),
        });
      }

      const bundleBlob = encodeIco(bundleEntries);
      setGeneratedIcons(perSizeIcons);
      setBundleIcon({
        blob: bundleBlob,
        url: URL.createObjectURL(bundleBlob),
      });
    } catch (error) {
      setErrorMessage(
        t("iconGenerator.errors.generateFailed", {
          defaultValue: "Failed to generate icon files. Please try again.",
        })
      );
    } finally {
      setIsGenerating(false);
    }
  }, [clearGeneratedOutput, cropSize, cropX, cropY, selectedSizes, sourceImage, t]);

  const baseFileName = useMemo(() => {
    if (!sourceImage) {
      return "icon";
    }
    return sourceImage.file.name.replace(/\.[^/.]+$/, "") || "icon";
  }, [sourceImage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-Inter text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            {t("iconGenerator.backHome", { defaultValue: "Back to Home" })}
          </Link>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/editor"
              className="rounded-xl bg-gray-700 px-4 py-2 font-Inter text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800"
            >
              {t("iconGenerator.openEditor", { defaultValue: "Open Cover Editor" })}
            </Link>
            <Link
              href="/image-converter"
              className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-Inter text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              {t("iconGenerator.openConverter", { defaultValue: "Open Image Converter" })}
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="font-Anek text-3xl font-extrabold text-slate-800 md:text-5xl">
            {t("iconGenerator.title", { defaultValue: "ICO Icon Generator" })}
          </h1>
          <p className="mt-3 max-w-3xl font-Inter text-base text-slate-600 md:text-lg">
            {t("iconGenerator.subtitle", {
              defaultValue:
                "Upload, paste, or drag an image. Crop to square, then export multiple ICO files in different sizes.",
            })}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-Poppins text-xl font-semibold text-slate-800 md:text-2xl">
                {t("iconGenerator.inputTitle", { defaultValue: "Source Icon" })}
              </h2>
              <button
                type="button"
                onClick={resetAll}
                className="rounded-lg border border-slate-300 px-3 py-1.5 font-Inter text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                {t("iconGenerator.reset", { defaultValue: "Reset" })}
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
                    {t("iconGenerator.dropzone.primary", {
                      defaultValue: "Drop image here or click to upload",
                    })}
                  </p>
                  <p className="mt-2 font-Inter text-sm text-slate-500 md:text-base">
                    {t("iconGenerator.dropzone.secondary", {
                      defaultValue: "Supports clipboard paste and drag upload",
                    })}
                  </p>
                </div>
              )}

              {sourceImage && (
                <div>
                  <img
                    src={sourceImage.url}
                    alt={t("iconGenerator.sourceAlt", { defaultValue: "Source image preview" })}
                    className="mx-auto max-h-[360px] w-auto rounded-xl border border-slate-200 bg-white object-contain"
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
              {t("iconGenerator.pasteHint", {
                defaultValue: "Tip: Press Ctrl/Cmd + V anywhere to paste clipboard image.",
              })}
            </p>

            {isLoadingSource && (
              <p className="mt-3 font-Inter text-sm font-medium text-indigo-600">
                {t("iconGenerator.loadingSource", { defaultValue: "Reading image..." })}
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
              {t("iconGenerator.cropTitle", { defaultValue: "Crop and Export" })}
            </h2>

            {!sourceImage && (
              <p className="rounded-xl bg-slate-100 px-4 py-3 font-Inter text-sm text-slate-600">
                {t("iconGenerator.cropEmpty", {
                  defaultValue: "Upload an image first to configure crop and icon sizes.",
                })}
              </p>
            )}

            {sourceImage && (
              <div className="space-y-5">
                <div>
                  <p className="mb-2 font-Inter text-sm font-semibold text-slate-700">
                    {t("iconGenerator.previewLabel", { defaultValue: "Crop Preview (256x256)" })}
                  </p>
                  <canvas
                    ref={previewCanvasRef}
                    width={256}
                    height={256}
                    className="h-48 w-48 rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    clearGeneratedOutput();
                    const centeredX = Math.floor((sourceImage.width - cropSize) / 2);
                    const centeredY = Math.floor((sourceImage.height - cropSize) / 2);
                    setCropX(centeredX);
                    setCropY(centeredY);
                  }}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 font-Inter text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  {t("iconGenerator.centerCrop", { defaultValue: "Center Crop" })}
                </button>

                <div>
                  <label className="mb-2 block font-Inter text-sm font-semibold text-slate-700">
                    {t("iconGenerator.cropSize", { defaultValue: "Crop Size" })}: {cropSize}px
                  </label>
                  <input
                    type="range"
                    min={minCropSize}
                    max={maxCropSize}
                    step={1}
                    value={cropSize}
                    onChange={(event) => {
                      clearGeneratedOutput();
                      const nextSize = Number(event.target.value);
                      const nextX = clamp(cropX, 0, Math.max(0, sourceImage.width - nextSize));
                      const nextY = clamp(cropY, 0, Math.max(0, sourceImage.height - nextSize));
                      setCropSize(nextSize);
                      setCropX(nextX);
                      setCropY(nextY);
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-Inter text-sm font-semibold text-slate-700">
                    {t("iconGenerator.cropX", { defaultValue: "Horizontal Offset" })}: {cropX}px
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={maxCropX}
                    step={1}
                    value={cropX}
                    onChange={(event) => {
                      clearGeneratedOutput();
                      setCropX(Number(event.target.value));
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-Inter text-sm font-semibold text-slate-700">
                    {t("iconGenerator.cropY", { defaultValue: "Vertical Offset" })}: {cropY}px
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={maxCropY}
                    step={1}
                    value={cropY}
                    onChange={(event) => {
                      clearGeneratedOutput();
                      setCropY(Number(event.target.value));
                    }}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
                  />
                </div>

                <div>
                  <p className="mb-2 font-Inter text-sm font-semibold text-slate-700">
                    {t("iconGenerator.sizeLabel", { defaultValue: "ICO Sizes" })}
                  </p>
                  <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
                    {iconSizes.map((size) => (
                      <label
                        key={size}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 font-Inter text-xs text-slate-700"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => {
                            clearGeneratedOutput();
                            setSelectedSizes((current) => {
                              if (current.includes(size)) {
                                return current.filter((item) => item !== size);
                              }
                              return [...current, size].sort((a, b) => a - b);
                            });
                          }}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => void generateIcons()}
                  disabled={isGenerating || isLoadingSource}
                  className="w-full rounded-xl bg-indigo-500 px-4 py-2.5 font-Poppins text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isGenerating
                    ? t("iconGenerator.generating", { defaultValue: "Generating..." })
                    : t("iconGenerator.generate", { defaultValue: "Generate ICO Files" })}
                </button>

                {(bundleIcon || generatedIcons.length > 0) && (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-3 font-Inter text-sm font-semibold text-slate-700">
                      {t("iconGenerator.resultTitle", { defaultValue: "Generated Icons" })}
                    </p>

                    {bundleIcon && (
                      <a
                        href={bundleIcon.url}
                        download={`${baseFileName}.ico`}
                        className="mb-3 inline-flex rounded-lg bg-gray-700 px-4 py-2 font-Inter text-sm font-semibold text-white transition hover:bg-gray-800"
                      >
                        {t("iconGenerator.downloadBundle", {
                          defaultValue: "Download multi-size bundle (.ico)",
                        })}
                      </a>
                    )}

                    <div className="space-y-2">
                      {generatedIcons.map((icon) => (
                        <a
                          key={icon.size}
                          href={icon.url}
                          download={`${baseFileName}-${icon.size}x${icon.size}.ico`}
                          className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 font-Inter text-sm text-slate-700 transition hover:border-indigo-300"
                        >
                          <span>
                            {icon.size} x {icon.size}.ico
                          </span>
                          <span className="text-xs text-slate-500">
                            {formatBytes(icon.blob.size)}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
