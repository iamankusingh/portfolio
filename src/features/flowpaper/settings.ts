export type FluidSettings = {
  brush: number;
  force: number;
  swirl: number;
  diffusion: number;
  speed: number;
};

export type TextureMode = "none" | "grain" | "paper";
export type Format = "fullscreen" | "desktop" | "mobile" | "square";

export const formats: Record<
  Format,
  { label: string } & (
    | { ratio: number; width: number; height: number }
    | { ratio: null; width: null; height: null }
  )
> = {
  fullscreen: { label: "Full screen", ratio: null, width: null, height: null },
  desktop: { label: "Desktop", ratio: 16 / 9, width: 2560, height: 1440 },
  mobile: { label: "Mobile", ratio: 9 / 16, width: 1440, height: 2560 },
  square: { label: "Square", ratio: 1, width: 2048, height: 2048 },
};

export function resolveFormat(format: Format, viewportWidth: number, viewportHeight: number) {
  const preset = formats[format];
  if (preset.ratio !== null) return preset;
  const ratio = Math.max(1, viewportWidth) / Math.max(1, viewportHeight);
  return {
    label: preset.label,
    ratio,
    width: Math.max(1, Math.round(ratio >= 1 ? 2560 : 2560 * ratio)),
    height: Math.max(1, Math.round(ratio >= 1 ? 2560 / ratio : 2560)),
  };
}

export const palettes = [
  { name: "Ocean", colors: ["#1253AD", "#168FA8", "#51D4CF", "#B5EADF"] },
  { name: "Sunset", colors: ["#D94F70", "#F18C54", "#F5CE87", "#754E9E"] },
  { name: "Neon", colors: ["#7847EB", "#E637AF", "#29D6CB", "#C7ED54"] },
  { name: "Pastel", colors: ["#DDA9C8", "#A6B9E5", "#B9D8CB", "#F0D3AA"] },
  { name: "Aurora", colors: ["#35C79C", "#298BAE", "#7462D5", "#CB97DB"] },
  { name: "Monochrome", colors: ["#58616B", "#8A959F", "#C2CCD2", "#F0EDE4"] },
];

export const defaultSettings: FluidSettings = {
  brush: 38,
  force: 55,
  swirl: 55,
  diffusion: 18,
  speed: 1,
};

export const sliders: {
  key: keyof FluidSettings;
  label: string;
  min: number;
  max: number;
  step: number;
}[] = [
  { key: "brush", label: "Brush size", min: 8, max: 100, step: 1 },
  { key: "force", label: "Flow strength", min: 0, max: 100, step: 1 },
  { key: "swirl", label: "Swirl", min: 0, max: 100, step: 1 },
  { key: "diffusion", label: "Diffusion", min: 0, max: 100, step: 1 },
  { key: "speed", label: "Speed", min: 0.1, max: 2, step: 0.1 },
];

export function randomPalette(): string[] {
  const hue = Math.random() * 360;
  return Array.from({ length: 4 }, (_, index) => {
    const h = ((hue + index * 32) % 360) / 60;
    const saturation = 0.55 + Math.random() * 0.25;
    const light = 0.45 + index * 0.09;
    const chroma = (1 - Math.abs(2 * light - 1)) * saturation;
    const x = chroma * (1 - Math.abs((h % 2) - 1));
    const channels =
      h < 1
        ? [chroma, x, 0]
        : h < 2
          ? [x, chroma, 0]
          : h < 3
            ? [0, chroma, x]
            : h < 4
              ? [0, x, chroma]
              : h < 5
                ? [x, 0, chroma]
                : [chroma, 0, x];
    return `#${channels
      .map((channel) =>
        Math.round((channel + light - chroma / 2) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")}`;
  });
}
