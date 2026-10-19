import { useState } from "react";
import type { CSSProperties } from "react";
import { skillConnections, skills } from "../../data/skills";

type NodeStyle = CSSProperties & {
  "--node-x": string;
  "--node-y": string;
  "--mobile-x": string;
  "--mobile-y": string;
};

export default function SkillsConstellation() {
  const [selectedId, setSelectedId] = useState("javascript");
  const selected = skills.find((skill) => skill.id === selectedId) ?? skills[3];
  const relatedIds = skillConnections.flatMap(([from, to]) =>
    from === selected.id ? [to] : to === selected.id ? [from] : [],
  );
  const related = skills.filter((skill) => relatedIds.includes(skill.id));

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      tabIndex={-1}
      className="bg-bg-dark px-page py-section-md text-text-light"
    >
      <div className="mx-auto max-w-content">
        <div className="border-t border-line-dark pt-5">
          <p className="text-small tracking-[0.16em] text-text-muted-dark uppercase">
            My skills
          </p>
          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2
              id="skills-title"
              className="max-w-2xl font-display text-display-md leading-none tracking-[-0.03em]"
            >
              A constellation
              <br />
              of <span className="italic">connected skills.</span>
            </h2>
            <p
              id="skills-instructions"
              className="max-w-sm text-small leading-relaxed text-text-muted-dark"
            >
              From the first wireframe to the systems behind the screen. Select
              a skill to explore how it connects to the others.
            </p>
          </div>
        </div>

        <div className="relative mt-8 h-304 md:h-192">
          {/* Two coordinate sets keep labels readable without shrinking the graph on mobile. */}
          {(["mobilePosition", "position"] as const).map((layout) => (
            <svg
              key={layout}
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className={`pointer-events-none absolute inset-0 size-full ${layout === "position" ? "hidden md:block" : "md:hidden"}`}
            >
              {skillConnections.map(([fromId, toId]) => {
                const from = skills.find((skill) => skill.id === fromId);
                const to = skills.find((skill) => skill.id === toId);
                if (!from || !to) return null;
                const active = fromId === selected.id || toId === selected.id;
                return (
                  <line
                    key={`${fromId}-${toId}`}
                    x1={from[layout].x}
                    y1={from[layout].y}
                    x2={to[layout].x}
                    y2={to[layout].y}
                    vectorEffect="non-scaling-stroke"
                    stroke="currentColor"
                    strokeWidth={active ? 1.5 : 1}
                    className={`transition-colors duration-200 motion-reduce:transition-none ${active ? "text-sun/70" : "text-mist/25"}`}
                  />
                );
              })}
            </svg>
          ))}

          <ul
            aria-label="Skills constellation"
            aria-describedby="skills-instructions"
            className="absolute inset-0 m-0 list-none p-0"
          >
            {skills.map((skill) => {
              const active = skill.id === selected.id;
              const connected = relatedIds.includes(skill.id);
              const style: NodeStyle = {
                "--node-x": `${skill.position.x}%`,
                "--node-y": `${skill.position.y}%`,
                "--mobile-x": `${skill.mobilePosition.x}%`,
                "--mobile-y": `${skill.mobilePosition.y}%`,
              };
              return (
                <li
                  key={skill.id}
                  style={style}
                  className="absolute top-(--mobile-y) left-(--mobile-x) -translate-x-1/2 -translate-y-1/2 md:top-(--node-y) md:left-(--node-x)"
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-controls="skill-detail"
                    onClick={() => setSelectedId(skill.id)}
                    className="group relative flex h-32 w-28 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-sun md:w-24"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute size-14 rounded-sm bg-water/40 opacity-0 shadow-[0_0_24px_8px_rgb(39_109_255/0.55),0_0_64px_24px_rgb(39_109_255/0.28)] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none forced-colors:hidden"
                    />
                    <span
                      aria-hidden="true"
                      className={`relative grid size-14 place-items-center rounded-sm bg-bg-light ring-2 ring-offset-4 ring-offset-bg-dark transition-shadow duration-200 motion-reduce:transition-none ${active ? "ring-sun" : connected ? "ring-mist/70" : "ring-transparent group-hover:ring-mist/70"}`}
                    >
                      <img
                        src={skill.logo}
                        alt=""
                        width={44}
                        height={44}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="size-11 object-contain"
                      />
                    </span>
                    <span
                      className={`absolute top-[calc(50%+2.25rem)] bg-bg-dark px-1 text-small whitespace-nowrap md:text-base ${active ? "text-sun" : "text-text-light"}`}
                    >
                      {skill.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          id="skill-detail"
          aria-live="polite"
          aria-atomic="true"
          className="grid min-h-64 gap-5 border-t border-line-dark pt-7 md:min-h-48 md:grid-cols-[1fr_2fr] md:gap-12"
        >
          <div>
            <p className="text-micro tracking-[0.12em] text-text-muted-dark uppercase">
              {selected.area}
            </p>
            <h3 className="mt-2 font-display text-h2 leading-tight">
              {selected.label}
            </h3>
          </div>
          <div className="max-w-2xl">
            <p className="text-body-lg leading-relaxed">
              {selected.description}
            </p>
            <p className="mt-4 text-small text-text-muted-dark">
              Connected to{" "}
              <span className="text-text-light">
                {related.map((skill) => skill.label).join(" · ")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
