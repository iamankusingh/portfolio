import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { photographCollection } from "../data/photograph";
import usePhotoViewer from "../hooks/usePhotoViewer";

const orderedPhotographs = [...photographCollection].sort(
  (a, b) => parseInt(a.image, 10) - parseInt(b.image, 10),
);

export default function PhotographyPage() {
  const { openPhoto, photoViewer } = usePhotoViewer();
  const gallery = useRef<HTMLUListElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoPinned, setInfoPinned] = useState(false);

  useEffect(() => {
    if (!infoOpen) return;
    const dismiss = () => {
      setInfoOpen(false);
      setInfoPinned(false);
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !info.current?.contains(event.target))
        dismiss();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [infoOpen]);

  useLayoutEffect(() => {
    const element = gallery.current;
    if (!element) return;
    const items = Array.from(element.children).filter(
      (child): child is HTMLLIElement => child instanceof HTMLLIElement,
    );
    const arrange = () => {
      const styles = getComputedStyle(element);
      const columns = styles.gridTemplateColumns.split(" ").length;
      const gap = parseFloat(styles.columnGap);
      const width = (element.clientWidth - gap * (columns - 1)) / columns;
      const heights = Array<number>(columns).fill(0);

      // Place each next numbered photo in the earliest available space.
      // Equal heights resolve left to right; DOM and keyboard order stay numeric.
      items.forEach((item, index) => {
        const photo = orderedPhotographs[index];
        const column = heights.indexOf(Math.min(...heights));
        const height = Math.ceil((width * photo.height) / photo.width + gap);
        item.style.gridColumn = String(column + 1);
        item.style.gridRow = `${heights[column] + 1} / span ${height}`;
        heights[column] += height;
      });
    };

    arrange();
    const observer = new ResizeObserver(arrange);
    observer.observe(element);
    window.addEventListener("resize", arrange);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", arrange);
      items.forEach((item) => {
        item.style.removeProperty("grid-column");
        item.style.removeProperty("grid-row");
      });
    };
  }, []);

  return (
    <>
      <title>Photography by Anku Singh</title>
      <section
        aria-labelledby="photography-page-title"
        className="bg-bg-light px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+1rem)] pb-section-md text-text-dark"
      >
        <header className="mb-8 grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center border-b border-line-light pb-6">
          <h1
            id="photography-page-title"
            className="col-start-2 text-center font-display text-h2 leading-none tracking-tight"
          >
            Photography
          </h1>
          <div
            ref={info}
            className="relative"
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setInfoOpen(true);
            }}
            onPointerLeave={() => {
              if (!infoPinned && !info.current?.querySelector(":focus-visible"))
                setInfoOpen(false);
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setInfoOpen(false);
                setInfoPinned(false);
              }
            }}
          >
            <button
              type="button"
              aria-label="About these photographs"
              aria-expanded={infoOpen}
              aria-controls="photography-info"
              className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-surface-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-water"
              onFocus={() => setInfoOpen(true)}
              onClick={() => {
                setInfoPinned(!infoPinned);
                setInfoOpen(!infoPinned);
              }}
            >
              <span
                aria-hidden="true"
                className="grid size-6 place-items-center rounded-full border border-current font-display text-lg leading-none"
              >
                i
              </span>
            </button>
            <div
              id="photography-info"
              hidden={!infoOpen}
              className="absolute top-full right-0 z-20 w-80 max-w-[calc(100vw-2*var(--spacing-page))] pt-2"
            >
              <p className="rounded-md border border-line-light bg-bg-light p-4 text-small leading-relaxed shadow-lg">
                All photos are clicked in phones by myself (Anku Singh) and not
                colour graded.
              </p>
            </div>
          </div>
        </header>
        <p className="mb-section-sm font-display text-display-md leading-[1.05] tracking-tight text-balance">
          I don't just write code,
          <br /> I capture stories in camera too..
        </p>

        <ul
          ref={gallery}
          className="grid auto-rows-0.25 grid-cols-2 gap-x-4 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8"
        >
          {orderedPhotographs.map((photo, index) => (
            <li
              key={photo.id}
              className="min-w-0 self-start pb-4 md:pb-6 lg:pb-8"
            >
              <button
                type="button"
                aria-label={`View ${photo.alt} fullscreen`}
                aria-haspopup="dialog"
                data-cursor="view"
                className="block w-full cursor-zoom-in focus-visible:outline-3 focus-visible:-outline-offset-4 focus-visible:outline-sun"
                onClick={(event) => openPhoto(photo, event.currentTarget)}
              >
                <img
                  src={photo.source}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="block h-auto w-full"
                />
              </button>
            </li>
          ))}
        </ul>
      </section>
      {photoViewer}
    </>
  );
}
