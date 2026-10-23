import LinkButton from "../ui/LinkButton";

export default function Lab() {
  return (
    <>
      <section
        id="lab"
        tabIndex={-1}
        aria-labelledby="lab-title"
        className="bg-bg-light px-page py-section-lg text-text-dark scheme-light"
      >
        <div>
          <div className="mb-10 border-t border-line-light pt-5 sm:mb-16">
            <p className="text-small tracking-[0.16em] uppercase">Lab</p>
            <div className="flex flex-col md:flex-row items-end">
              <h2
                id="lab-title"
                className="mt-5 max-w-5xl font-display text-display-lg leading-none tracking-[-0.035em]"
              >
                Curiosity, with room to <em>play.</em>
              </h2>
              <p className="mt-8 max-w-lg text-body-lg text-text-muted-light">
                Small experiments at the intersection of code, nature, human
                interaction and Art.
              </p>
            </div>
          </div>
          <article className="grid overflow-hidden rounded-md border border-line-light bg-surface-light md:grid-cols-[1.35fr_1fr]">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-bg-light p-8 sm:min-h-96">
              <svg
                viewBox="0 0 640 400"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="flowpaper-ribbon"
                    x1="0"
                    y1="1"
                    x2="1"
                    y2="0"
                  >
                    <stop stopColor="#1253AD" />
                    <stop offset="0.5" stopColor="#168FA8" />
                    <stop offset="1" stopColor="#397E76" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                  <path
                    key={index}
                    d={`M-80 ${300 + index * 10} C90 ${400 - index * 20}, 120 ${20 + index * 15}, 310 ${135 + index * 10} S480 ${400 - index * 17}, 720 ${80 + index * 12}`}
                    fill="none"
                    stroke="url(#flowpaper-ribbon)"
                    strokeWidth={12 - index}
                    opacity={0.65 - index * 0.06}
                  />
                ))}
              </svg>
              <span className="absolute top-5 left-5 rounded-full border border-line-light bg-bg-light px-3 py-1 text-[10px] tracking-widest uppercase">
                Flowpaper
              </span>
              <span className="absolute right-5 bottom-5 text-[10px] tracking-widest text-text-muted-light uppercase">
                Fluid / Color / Motion
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <p className="text-[10px] tracking-[0.18em] text-text-muted-light uppercase">
                Interactive wallpaper studio
              </p>
              <h3 className="mt-4 font-display text-display-md leading-none">
                Flowpaper<span className="text-water">.</span>
              </h3>
              <p className="my-6 max-w-sm text-small text-text-muted-light">
                Turn a gesture into flowing ink. Find your colors, shape the
                motion, and take a little piece of the unexpected with you.
              </p>
              <LinkButton to="/lab" className="w-fit">
                Experience The Lab
              </LinkButton>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
