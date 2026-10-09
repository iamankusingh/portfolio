import { anku } from "../../data/anku";

export default function Introduction() {
  return (
    <div
      id="introduction"
      tabIndex={-1}
      className="relative mx-auto flex min-h-svh max-w-content items-center px-page py-[max(7rem,18svh)]"
    >
      <div className="max-w-xl opacity-(--intro-opacity,1)">
        <p className="mb-5 text-small tracking-[0.16em] uppercase sm:mb-7">
          {anku.role}
        </p>
        <h1
          id="hero-title"
          className="font-display text-display-lg leading-[0.95] tracking-[-0.035em]"
        >
          {anku.name}
        </h1>
        <p className="mt-7 max-w-sm text-body-lg leading-relaxed text-text-light sm:mt-9">
          {anku.description}
        </p>
      </div>
    </div>
  );
}
