import type { Work } from "../../data/works";

type WorkContentProps = {
  work: Work;
  index: number;
  total: number;
  constrained: boolean;
  active?: boolean;
  heading?: "h2" | "h3";
  priority?: boolean;
};

export default function WorkContent({
  work,
  index,
  total,
  constrained,
  active = true,
  heading: Heading = "h3",
  priority = false,
}: WorkContentProps) {
  return (
    <>
      <div className="min-h-0 min-w-0 bg-surface-light">
        <img
          src={new URL(`../../assets/work/${work.image}`, import.meta.url).href}
          alt={work.imageAlt}
          width="1600"
          height="1000"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={
            constrained
              ? "h-full w-full object-contain"
              : "aspect-8/5 w-full object-contain lg:h-full lg:aspect-auto"
          }
        />
      </div>
      <div
        tabIndex={constrained && active ? 0 : undefined}
        role="region"
        aria-label={`Work ${index + 1} details`}
        className={`min-h-0 min-w-0 bg-bg-light p-5 sm:p-6 xl:p-8 ${constrained ? "overflow-y-auto" : ""}`}
      >
        <p className="mb-4 text-micro tracking-[0.14em] uppercase">
          Work {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <Heading
          id={`${work.slug}-title`}
          className="font-display text-h1 leading-none tracking-tight"
        >
          {work.title}
        </Heading>
        <p className="mt-5 max-w-sm text-small leading-relaxed text-text-muted-light">
          {work.description}
        </p>
        <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-line-light pt-5 text-small">
          <div>
            <dt className="mb-1 text-micro text-text-muted-light">Role</dt>
            <dd>{work.role}</dd>
          </div>
          <div>
            <dt className="mb-1 text-micro text-text-muted-light">
              Built with
            </dt>
            <dd>{work.technologies}</dd>
          </div>
        </dl>
      </div>
    </>
  );
}
