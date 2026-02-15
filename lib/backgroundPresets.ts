export type ImageSource = "unsplash" | "pexels" | "gradient";

export type BackgroundEffect = "none" | "softBlur" | "strongBlur" | "glass";

export interface GradientPreset {
  id: string;
  label: string;
  css: string;
}

export interface OverlayGradientPreset {
  id: string;
  label: string;
  css: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "aurora",
    label: "Aurora",
    css: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "sunset",
    label: "Sunset",
    css: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  },
  {
    id: "sea-breeze",
    label: "Sea Breeze",
    css: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  },
  {
    id: "deep-ocean",
    label: "Deep Ocean",
    css: "linear-gradient(120deg, #09203f 0%, #537895 100%)",
  },
  {
    id: "sweet-berry",
    label: "Sweet Berry",
    css: "linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)",
  },
  {
    id: "rose-neon",
    label: "Rose Neon",
    css: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "night-fall",
    label: "Night Fall",
    css: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
  {
    id: "mist-blue",
    label: "Mist Blue",
    css: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  },
];

export const IMAGE_OVERLAY_PRESETS: OverlayGradientPreset[] = [
  {
    id: "none",
    label: "无",
    css: "none",
  },
  {
    id: "cinematic",
    label: "电影感",
    css: "linear-gradient(135deg, rgba(15, 23, 42, 0.72) 0%, rgba(30, 41, 59, 0.42) 50%, rgba(59, 130, 246, 0.12) 100%)",
  },
  {
    id: "warm",
    label: "暖色",
    css: "linear-gradient(135deg, rgba(120, 53, 15, 0.45) 0%, rgba(249, 115, 22, 0.22) 55%, rgba(254, 243, 199, 0.1) 100%)",
  },
  {
    id: "cool",
    label: "冷色",
    css: "linear-gradient(135deg, rgba(7, 89, 133, 0.5) 0%, rgba(2, 132, 199, 0.26) 50%, rgba(224, 242, 254, 0.1) 100%)",
  },
  {
    id: "vignette",
    label: "暗角",
    css: "radial-gradient(circle at center, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.58) 100%)",
  },
];

export const BACKGROUND_EFFECT_OPTIONS: Array<{ value: BackgroundEffect; label: string }> = [
  { value: "none", label: "原图" },
  { value: "softBlur", label: "柔和模糊" },
  { value: "strongBlur", label: "强模糊" },
  { value: "glass", label: "毛玻璃" },
];

export function getOverlayGradientById(id: string): OverlayGradientPreset {
  return IMAGE_OVERLAY_PRESETS.find((preset) => preset.id === id) || IMAGE_OVERLAY_PRESETS[0];
}
