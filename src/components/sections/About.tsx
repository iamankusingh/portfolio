import { anku } from "../../data/anku";

export default function About() {
  const { about } = anku;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      tabIndex={-1}
      className="bg-bg-light px-page py-section-lg text-text-dark"
    >
      <div className="mx-auto max-w-content">
        <div className="mb-10 border-t border-line-light pt-5 sm:mb-16">
          <p className="text-small tracking-[0.16em] uppercase">
            {about.label}
          </p>
          <h2
            id="about-title"
            className="mt-5 font-display text-display-lg leading-none tracking-[-0.035em]"
          >
            {anku.name}
          </h2>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-10 lg:gap-24">
          <figure className="min-w-0">
            <div className="bg-surface-light">
              <img
                src={about.portrait.src}
                alt={about.portrait.alt}
                loading="lazy"
                decoding="async"
                className="aspect-4/5 w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex flex-wrap justify-between gap-x-6 gap-y-1 text-small">
              <span>{anku.name}</span>
              <span className="text-text-muted-light">{anku.role}</span>
            </figcaption>
          </figure>

          <div className="min-w-0 md:pt-8">
            <p className="mb-5 text-micro tracking-[0.08em] text-text-muted-light uppercase">
              {about.previewLabel}
            </p>
            <h3 className="max-w-lg font-display text-h2 leading-[1.1] tracking-[-0.02em]">
              {about.heading}
            </h3>
            <div className="mt-8 max-w-lg space-y-5 text-body-lg leading-relaxed">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-10 border-t border-line-light">
              {about.details.map((detail) => (
                <div
                  key={detail.label}
                  className="border-b border-line-light py-5"
                >
                  <dt className="text-micro tracking-[0.12em] text-text-muted-light uppercase">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-small">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
