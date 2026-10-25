import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { createFluidEngine } from "../features/flowpaper/fluidEngine";
import type { FluidEngine } from "../features/flowpaper/fluidEngine";
import {
  defaultSettings,
  formats,
  palettes,
  randomPalette,
  sliders,
} from "../features/flowpaper/settings";
import type {
  FluidSettings,
  Format,
  TextureMode,
} from "../features/flowpaper/settings";

type TrayItem =
  | "canvas"
  | "colors"
  | "fluid"
  | "finish"
  | "reset"
  | "randomize"
  | "playback"
  | "capture";
type Panel = Exclude<TrayItem, "reset" | "randomize" | "playback">;
type IconName = TrayItem | "play" | "close";

const instructionsStorageKey = "flowpaper:instructions-dismissed";
const instructionsExpiryMs = 30 * 24 * 60 * 60 * 1000;
// Use the same expiry in memory when browser storage is unavailable.
let instructionsDismissedUntil = 0;

const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line-dark px-4 text-sm font-medium hover:border-text-muted-dark hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40";
const panels: { id: TrayItem; label: string }[] = [
  { id: "canvas", label: "Canvas" },
  { id: "colors", label: "Colors" },
  { id: "fluid", label: "Fluid" },
  { id: "finish", label: "Finish" },
  { id: "reset", label: "Reset" },
  { id: "randomize", label: "Randomize" },
  { id: "playback", label: "Playback" },
  { id: "capture", label: "Capture" },
];
const iconPaths: Record<IconName, string> = {
  canvas: "M3 5h18v14H3ZM8 5v14M3 14h18",
  colors:
    "M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-3.7 1.5 1.5 0 0 1 1-2.8h2a4 4 0 0 0 4-4C21 6.4 17 3 12 3ZM7 10h.01M10 7h.01M15 7h.01M17 10h.01",
  fluid:
    "M3 6c3-4 6 4 9 0s6 4 9 0M3 12c3-4 6 4 9 0s6 4 9 0M3 18c3-4 6 4 9 0s6 4 9 0",
  finish:
    "M4 4h16v16H4ZM8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01",
  reset: "M3 10a9 9 0 1 1 2 8M3 4v6h6",
  randomize:
    "m17 3 4 4-4 4M3 7h3c6 0 6 10 12 10h3m-4-4 4 4-4 4M3 17h3c2 0 3-1 4-3m4-4c1-2 2-3 4-3h3",
  playback: "M8 5v14M16 5v14",
  play: "m8 4 12 8-12 8Z",
  capture: "M4 7h4l2-3h4l2 3h4v13H4ZM16 13a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  close: "m6 6 12 12M6 18 18 6",
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

export default function LabPage() {
  const instructionsRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<FluidEngine | null>(null);
  const trayRef = useRef<HTMLDivElement>(null);
  const panelTitleRef = useRef<HTMLHeadingElement>(null);
  const triggerRefs = useRef<
    Partial<Record<TrayItem, HTMLButtonElement | null>>
  >({});
  const captureBusy = useRef(false);
  const captureRequest = useRef(0);
  const mounted = useRef(false);
  const [generation, setGeneration] = useState(0);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [activePanel, setActivePanel] = useState<Panel | null>(null);
  const [settings, setSettings] = useState<FluidSettings>(defaultSettings);
  const [format, setFormat] = useState<Format>("fullscreen");
  const [palette, setPalette] = useState(palettes[0].colors);
  const [paletteName, setPaletteName] = useState("Ocean");
  const [activeColor, setActiveColor] = useState(-1);
  const [texture, setTexture] = useState<TextureMode>("grain");
  const [intensity, setIntensity] = useState(25);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [capturing, setCapturing] = useState(false);
  const [preview, setPreview] = useState<{
    url: string;
    format: Format;
    width: number;
    height: number;
  } | null>(null);
  const [captureError, setCaptureError] = useState("");
  const [notice, setNotice] = useState("");
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showInstructions, setShowInstructions] = useState(() => {
    try {
      // The previous permanent "true" value is invalid, so existing users
      // get to choose whether to remember dismissal under the new policy.
      const expiresAt = Number(localStorage.getItem(instructionsStorageKey));
      return !Number.isFinite(expiresAt) || expiresAt <= Date.now();
    } catch {
      return instructionsDismissedUntil <= Date.now();
    }
  });

  useEffect(() => {
    if (!showInstructions) return;
    const dialog = instructionsRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, [showInstructions]);

  function dismissInstructions(remember: boolean) {
    instructionsDismissedUntil = remember
      ? Date.now() + instructionsExpiryMs
      : 0;
    try {
      if (remember) {
        localStorage.setItem(
          instructionsStorageKey,
          String(instructionsDismissedUntil),
        );
      } else {
        localStorage.removeItem(instructionsStorageKey);
      }
    } catch {
      // Only a checked preference is remembered in memory, with the same expiry.
    }
    instructionsRef.current?.close();
    setShowInstructions(false);
    const target = ready ? canvasRef.current : triggerRefs.current.canvas;
    target?.focus({ preventScroll: true });
  }

  useEffect(() => {
    // Invalidate captures from an earlier effect lifetime, including StrictMode replay.
    captureRequest.current++;
    mounted.current = true;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      if (media.matches) setPlaying(false);
    };
    media.addEventListener("change", change);
    return () => {
      mounted.current = false;
      media.removeEventListener("change", change);
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!canvasRef.current || !stageRef.current) return;
      try {
        const engine = createFluidEngine(
          canvasRef.current,
          stageRef.current,
          (message) => {
            setError(message);
            setReady(false);
          },
        );
        engineRef.current = engine;
        engine.randomize();
        setReady(true);
      } catch (cause) {
        console.error("Flowpaper initialization failed", cause);
        engineRef.current?.dispose();
        engineRef.current = null;
        setError(
          cause instanceof Error
            ? cause.message
            : "Unable to start the fluid canvas.",
        );
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, [generation]);

  useEffect(() => {
    if (!ready) return;
    const engine = engineRef.current;
    engine?.setSettings(settings);
    engine?.setPalette(palette, activeColor);
    engine?.setFormat(format);
    engine?.setTexture(texture, intensity / 100);
    engine?.setPaused(
      !playing || capturing || preview !== null || showInstructions,
    );
  }, [
    ready,
    settings,
    palette,
    activeColor,
    format,
    texture,
    intensity,
    playing,
    capturing,
    preview,
    showInstructions,
  ]);

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview.url);
  }, [preview]);

  useEffect(() => {
    if (!activePanel) return;
    panelTitleRef.current?.focus({ preventScroll: true });
    function dismiss(event: PointerEvent | KeyboardEvent) {
      if (document.querySelector("dialog[open]")) return;
      if (event instanceof KeyboardEvent) {
        if (event.key !== "Escape" || event.defaultPrevented) return;
        event.preventDefault();
        if (activePanel)
          triggerRefs.current[activePanel]?.focus({ preventScroll: true });
      } else if (
        !(event.target instanceof Node) ||
        trayRef.current?.contains(event.target)
      )
        return;
      captureRequest.current++;
      setActivePanel(null);
      setPreview(null);
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
    };
  }, [activePanel]);

  const disabled = !ready || Boolean(error);
  const panelLabel = panels.find(({ id }) => id === activePanel)?.label;

  function activateTrayItem(item: TrayItem) {
    captureRequest.current++;
    setPreview(null);
    setCaptureError("");
    if (item === "reset" || item === "randomize" || item === "playback") {
      setActivePanel(null);
      if (item === "reset") {
        engineRef.current?.reset();
        setNotice("Canvas cleared.");
      } else if (item === "randomize") {
        engineRef.current?.randomize();
        setNotice("New composition created.");
      } else {
        setPlaying(!playing);
        setNotice(playing ? "Simulation paused." : "Simulation playing.");
      }
      return;
    }
    setActivePanel(activePanel === item ? null : item);
    if (item === "capture" && activePanel !== "capture") void capture();
  }

  function cancelCapture() {
    captureRequest.current++;
    setPreview(null);
    setActivePanel(null);
    triggerRefs.current.capture?.focus({ preventScroll: true });
  }

  function choosePalette(colors: string[], name: string) {
    setPalette([...colors]);
    setPaletteName(name);
    setActiveColor(-1);
    setNotice(`${name} palette selected.`);
  }

  function restart() {
    setReady(false);
    setError("");
    setNotice("");
    setActivePanel(null);
    setPreview(null);
    captureRequest.current++;
    setGeneration((value) => value + 1);
  }

  async function capture() {
    const engine = engineRef.current;
    if (!engine || captureBusy.current || disabled) return;
    captureBusy.current = true;
    const request = ++captureRequest.current;
    setCapturing(true);
    setCaptureError("");
    try {
      const { width, height } = engine.getDimensions();
      const blob = await engine.capture();
      if (mounted.current && request === captureRequest.current) {
        setPreview({ url: URL.createObjectURL(blob), format, width, height });
        setNotice("Capture ready. Download PNG from the Capture panel.");
      }
    } catch (cause) {
      if (mounted.current && request === captureRequest.current) {
        setCaptureError(
          cause instanceof Error
            ? cause.message
            : "Capture failed. Please try again.",
        );
      }
    } finally {
      captureBusy.current = false;
      if (mounted.current) setCapturing(false);
    }
  }

  return (
    <>
      <title>Flowpaper — Anku Singh Lab</title>
      <dialog
        ref={instructionsRef}
        id="flowpaper-instructions"
        aria-labelledby="flowpaper-welcome-title"
        aria-describedby="flowpaper-welcome-subtitle flowpaper-instructions-copy"
        onCancel={(event) => {
          event.preventDefault();
          dismissInstructions(false);
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[min(32rem,calc(100%-2rem))] overflow-y-auto overscroll-contain rounded-2xl border border-line-dark bg-surface-dark p-6 text-text-light shadow-2xl backdrop:bg-black/75 sm:p-8"
      >
        <h2
          id="flowpaper-welcome-title"
          className="font-display text-5xl leading-none"
        >
          Flowpaper<span className="text-sun">.</span>
        </h2>
        <p id="flowpaper-welcome-subtitle" className="mt-3 text-base">
          A little chaos. Something beautiful.
        </p>
        <div
          id="flowpaper-instructions-copy"
          className="mt-6 space-y-4 text-sm leading-relaxed text-text-muted-dark"
        >
          <p>
            Drag your mouse or finger across the canvas to paint with flowing
            ink.
          </p>
          <p>Use the bottom tray for more options.</p>
          <p>Capture takes a snapshot. Choose Download to save it</p>
          <p>
            Use arrow keys to paint, or Enter / Space to add ink. Escape closes
            a panel.
          </p>
        </div>
        <label className="mt-5 flex min-h-11 cursor-pointer items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={dontShowAgain}
            onChange={(event) => setDontShowAgain(event.target.checked)}
            aria-describedby="flowpaper-remember-expiry"
            className="size-4 accent-sun"
          />
          Don't show again
        </label>
        <button
          type="button"
          autoFocus
          onClick={() => dismissInstructions(dontShowAgain)}
          className={`${buttonClass} mt-7 w-full border-sun bg-sun text-bg-deep hover:border-sun hover:bg-sun/90`}
        >
          OK
        </button>
      </dialog>
      <section
        aria-labelledby="flowpaper-title"
        className="relative h-dvh min-h-80 overflow-hidden bg-bg-deep text-text-light"
      >
        <h1 id="flowpaper-title" className="sr-only">
          Flowpaper
        </h1>
        <p id="flowpaper-help" className="sr-only">
          Drag to paint. With the canvas focused, use arrow keys to paint or
          Enter and Space to add ink. Use the bottom tray to configure the
          wallpaper. Escape closes an open panel.
        </p>
        <p role="status" className="sr-only">
          {notice}
        </p>

        <div
          ref={stageRef}
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <canvas
            key={generation}
            ref={canvasRef}
            tabIndex={disabled ? -1 : 0}
            role="img"
            aria-label="Interactive fluid wallpaper"
            aria-describedby="flowpaper-help"
            className={`cursor-crosshair touch-none bg-bg-deep outline-offset-4 ${error ? "invisible" : ""}`}
          >
            Interactive fluid wallpaper.
          </canvas>
          {!ready && !error && (
            <p
              role="status"
              className="absolute rounded-full bg-surface-dark px-5 py-3 text-sm"
            >
              Preparing canvas…
            </p>
          )}
          {error && (
            <div className="absolute inset-x-6 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4 text-center">
              <p role="alert" className="max-w-sm text-sm">
                {error}
              </p>
              <button type="button" className={buttonClass} onClick={restart}>
                Restart canvas
              </button>
              <Link
                to="/#lab"
                className="min-h-11 py-2 text-sm underline underline-offset-4"
              >
                Return to homepage
              </Link>
            </div>
          )}
        </div>

        <div
          ref={trayRef}
          className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-10 w-[calc(100%-1.5rem)] max-w-lg -translate-x-1/2"
        >
          {activePanel && (
            <section
              key={activePanel}
              id={`flowpaper-panel-${activePanel}`}
              aria-labelledby="flowpaper-panel-title"
              className="absolute inset-x-0 bottom-[calc(100%+0.75rem)] max-h-[calc(100dvh-var(--navigation-top)-var(--navigation-control-size)-7rem-env(safe-area-inset-bottom))] overflow-y-auto overscroll-contain rounded-2xl border border-line-dark bg-surface-dark p-5 shadow-2xl sm:p-6"
            >
              <h2
                ref={panelTitleRef}
                id="flowpaper-panel-title"
                tabIndex={-1}
                className="mb-5 text-base font-semibold outline-none"
              >
                {panelLabel}
              </h2>
              <fieldset
                disabled={disabled && activePanel !== "capture"}
                className="min-w-0 disabled:opacity-40"
              >
                <legend className="sr-only">{panelLabel} settings</legend>

                {activePanel === "canvas" && (
                  <>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(Object.keys(formats) as Format[]).map((key) => (
                        <button
                          key={key}
                          type="button"
                          aria-pressed={format === key}
                          className={`min-h-16 rounded-lg border px-2 text-sm ${format === key ? "border-bg-light bg-bg-light text-bg-deep" : "border-line-dark hover:border-text-muted-dark"}`}
                          onClick={() => {
                            setFormat(key);
                            setNotice(
                              "Canvas format changed. Artwork reshaped to fit.",
                            );
                          }}
                        >
                          {formats[key].label}
                          <span className="mt-1 block text-xs opacity-70">
                            {key === "desktop"
                              ? "16:9"
                              : key === "mobile"
                                ? "9:16"
                                : key === "square"
                                  ? "1:1"
                                  : "Viewport"}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-xs tabular-nums text-text-muted-dark">
                      {format === "fullscreen"
                        ? "Matches your screen"
                        : `${formats[format].width} × ${formats[format].height} px`}
                    </p>
                  </>
                )}

                {activePanel === "colors" && (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      {palettes.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          aria-pressed={paletteName === preset.name}
                          onClick={() =>
                            choosePalette(preset.colors, preset.name)
                          }
                          className={`min-h-16 rounded-lg border p-2 text-left text-xs ${paletteName === preset.name ? "border-text-light bg-white/5" : "border-line-dark hover:border-text-muted-dark"}`}
                        >
                          <span
                            aria-hidden="true"
                            className="mb-2 flex h-3 overflow-hidden rounded-full"
                          >
                            {preset.colors.map((color) => (
                              <span
                                key={color}
                                className="flex-1"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </span>
                          {preset.name}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {palette.map((color, index) => (
                        <label
                          key={index}
                          className="min-w-0 text-xs text-text-muted-dark"
                        >
                          Color {index + 1}
                          <input
                            type="color"
                            value={color}
                            aria-label={`Edit palette color ${index + 1}`}
                            className="mt-1 block h-11 w-full cursor-pointer rounded-md border border-line-dark bg-transparent p-1"
                            onChange={(event) => {
                              setPalette(
                                palette.map((entry, i) =>
                                  i === index ? event.target.value : entry,
                                ),
                              );
                              setPaletteName("Custom");
                            }}
                          />
                        </label>
                      ))}
                    </div>
                    <label className="mt-4 flex items-center justify-between gap-3 text-sm">
                      Paint with
                      <select
                        value={activeColor}
                        onChange={(event) =>
                          setActiveColor(Number(event.target.value))
                        }
                        className="min-h-11 min-w-0 rounded-lg border border-line-dark bg-bg-dark px-3"
                      >
                        <option value={-1}>Cycle colors</option>
                        {palette.map((_, index) => (
                          <option key={index} value={index}>
                            Color {index + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      className={`${buttonClass} mt-4 w-full`}
                      onClick={() => choosePalette(randomPalette(), "Random")}
                    >
                      <Icon name="randomize" />
                      Randomize palette
                    </button>
                  </>
                )}

                {activePanel === "fluid" && (
                  <div className="space-y-2">
                    {sliders.map(({ key, label, min, max, step }) => (
                      <label key={key} className="block text-sm">
                        <span className="flex items-center justify-between">
                          {label}
                          <output className="text-xs tabular-nums text-text-muted-dark">
                            {settings[key]}
                            {key === "speed" ? "×" : ""}
                          </output>
                        </span>
                        <input
                          type="range"
                          min={min}
                          max={max}
                          step={step}
                          value={settings[key]}
                          onChange={(event) =>
                            setSettings({
                              ...settings,
                              [key]: Number(event.target.value),
                            })
                          }
                          className="block h-11 w-full cursor-pointer accent-sun"
                        />
                      </label>
                    ))}
                  </div>
                )}

                {activePanel === "finish" && (
                  <>
                    <div className="flex gap-2">
                      {(
                        [
                          ["none", "None"],
                          ["grain", "Fine grain"],
                          ["paper", "Paper"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          aria-pressed={texture === value}
                          onClick={() => setTexture(value)}
                          className={`min-h-11 flex-1 rounded-lg border text-sm ${texture === value ? "border-text-light bg-white/5" : "border-line-dark hover:border-text-muted-dark"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <label
                      className={`mt-5 block text-sm ${texture === "none" ? "opacity-40" : ""}`}
                    >
                      <span className="flex justify-between">
                        Texture intensity
                        <output className="text-xs tabular-nums text-text-muted-dark">
                          {intensity}%
                        </output>
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={intensity}
                        disabled={texture === "none" || disabled}
                        onChange={(event) =>
                          setIntensity(Number(event.target.value))
                        }
                        className="block h-11 w-full accent-sun"
                      />
                    </label>
                  </>
                )}

                {activePanel === "capture" && (
                  <div className="space-y-4">
                    {capturing && (
                      <p role="status" className="text-sm">
                        Capturing…
                      </p>
                    )}
                    {preview && (
                      <>
                        <img
                          src={preview.url}
                          alt="Captured fluid wallpaper"
                          width={preview.width}
                          height={preview.height}
                          className="mx-auto max-h-[28dvh] w-auto max-w-full rounded-md object-contain"
                        />
                        <a
                          href={preview.url}
                          download={`flowpaper-${preview.format}.png`}
                          className={`${buttonClass} w-full border-sun bg-sun text-bg-deep hover:border-sun hover:bg-sun/90`}
                        >
                          Download PNG
                        </a>
                      </>
                    )}
                    <button
                      type="button"
                      className={`${buttonClass} w-full`}
                      onClick={cancelCapture}
                    >
                      Cancel
                    </button>
                    {captureError && (
                      <p role="alert" className="text-sm">
                        {captureError}
                      </p>
                    )}
                  </div>
                )}
              </fieldset>
            </section>
          )}

          <div
            role="group"
            aria-label="Flowpaper controls"
            className="overflow-x-auto overscroll-x-contain rounded-full border border-line-dark bg-surface-dark shadow-xl"
          >
            <div className="flex w-max min-w-full items-center justify-between p-1">
              {panels.map(({ id, label }) => {
                const open = activePanel === id;
                const direct =
                  id === "reset" || id === "randomize" || id === "playback";
                const name = open
                  ? `Close ${label}`
                  : id === "playback"
                    ? playing
                      ? "Pause"
                      : "Play"
                    : label;
                const icon: IconName = open
                  ? "close"
                  : id === "playback" && !playing
                    ? "play"
                    : id;
                return (
                  <button
                    key={id}
                    ref={(element) => {
                      triggerRefs.current[id] = element;
                    }}
                    type="button"
                    aria-label={name}
                    title={name}
                    disabled={
                      (direct && disabled) ||
                      (id === "capture" && !open && (disabled || capturing))
                    }
                    aria-expanded={direct ? undefined : open}
                    aria-controls={open ? `flowpaper-panel-${id}` : undefined}
                    onClick={() => activateTrayItem(id)}
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full outline-offset-[-3px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none ${open ? "bg-bg-light text-bg-deep" : "text-text-muted-dark hover:bg-white/5 hover:text-text-light"}`}
                  >
                    <Icon name={icon} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
