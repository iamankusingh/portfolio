import SkillsConstellation from "../components/sections/SkillsConstellation";
import { anku } from "../data/anku";

export default function AboutPage() {
  const { profile, about } = anku;

  return (
    <>
      <title>About — Anku Singh</title>
      <section
        aria-labelledby="profile-title"
        className="bg-bg-light px-page pt-[calc(var(--navigation-top)+var(--navigation-control-size)+3rem)] pb-section-md text-text-dark"
      >
        <div className="mx-auto max-w-content">
          <p className="border-t border-line-light pt-5 text-small tracking-[0.16em] text-text-muted-light uppercase">
            About me
          </p>
          <h1
            id="profile-title"
            className="mt-6 mb-10 font-display text-display-xl leading-[0.95] tracking-[-0.04em] sm:mb-16"
          >
            I’m {anku.name}
            <span className="text-water">.</span>
          </h1>

          <div className="grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <figure className="min-w-0">
              <img
                src={about.portrait.src}
                alt={about.portrait.alt}
                fetchPriority="high"
                decoding="async"
                className="aspect-4/5 w-full bg-surface-light object-cover object-top"
              />
              <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-small text-text-muted-light">
                <span>{anku.name}</span>
                <span>{anku.slogan}</span>
              </figcaption>
            </figure>

            <div className="min-w-0 md:pt-3">
              <p className="text-small tracking-[0.12em] text-text-muted-light uppercase">
                {profile.label}
              </p>
              <h2 className="mt-5 font-display text-h2 leading-[1.12] tracking-[-0.02em]">
                {profile.heading}
              </h2>
              <p className="mt-7 text-body-lg leading-relaxed">
                {profile.introduction}
              </p>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-text-muted-light">
                {profile.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="mt-8 border-t border-line-light">
                <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line-light py-4">
                  <dt className="text-small text-text-muted-light">Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line-light py-4">
                  <dt className="text-small text-text-muted-light">Focus</dt>
                  <dd>{profile.focus}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <SkillsConstellation />
    </>
  );
}
