type SkillId =
  | "figma" | "html" | "css" | "javascript" | "nextjs"
  | "threejs" | "mern" | "php" | "laravel" | "mysql";

type Skill = {
  id: SkillId;
  label: string;
  area: string;
  description: string;
  position: { x: number; y: number };
  mobilePosition: { x: number; y: number };
};

export const skills: Skill[] = [
  {
    id: "figma", label: "Figma", area: "Interface design",
    description: "Exploring interface ideas, shaping layouts, and connecting screens into interactive prototypes before development.",
    position: { x: 14, y: 20 }, mobilePosition: { x: 22, y: 8 },
  },
  {
    id: "html", label: "HTML", area: "Web foundations",
    description: "Giving content a meaningful structure with semantic markup, accessible forms, and clear document hierarchy.",
    position: { x: 17, y: 49 }, mobilePosition: { x: 22, y: 23 },
  },
  {
    id: "css", label: "CSS", area: "Web foundations",
    description: "Turning layouts into responsive interfaces through typography, composition, styling, and considered motion.",
    position: { x: 32, y: 27 }, mobilePosition: { x: 76, y: 16 },
  },
  {
    id: "javascript", label: "JavaScript", area: "Interaction & application logic",
    description: "Connecting interfaces to behavior and data, from small interactions to complete web applications.",
    position: { x: 45, y: 49 }, mobilePosition: { x: 49, y: 37 },
  },
  {
    id: "nextjs", label: "Next.js", area: "React applications",
    description: "Building React applications with routing, rendering, and server-side capabilities in one framework.",
    position: { x: 55, y: 16 }, mobilePosition: { x: 19, y: 48 },
  },
  {
    id: "threejs", label: "Three.js", area: "Creative development",
    description: "Bringing interactive scenes, spatial storytelling, and real-time 3D to the browser with JavaScript.",
    position: { x: 77, y: 28 }, mobilePosition: { x: 80, y: 48 },
  },
  {
    id: "mern", label: "MERN stack", area: "Full-stack JavaScript",
    description: "Connecting MongoDB, Express, React, and Node.js to build an application from its interface through its API and data layer.",
    position: { x: 41, y: 79 }, mobilePosition: { x: 30, y: 65 },
  },
  {
    id: "php", label: "PHP", area: "Backend development",
    description: "Writing server-side application logic, handling requests, and connecting web interfaces to persistent data.",
    position: { x: 83, y: 60 }, mobilePosition: { x: 79, y: 66 },
  },
  {
    id: "laravel", label: "Laravel", area: "Backend applications",
    description: "Organizing PHP applications with routing, validation, database models, and maintainable application structure.",
    position: { x: 84, y: 86 }, mobilePosition: { x: 79, y: 83 },
  },
  {
    id: "mysql", label: "MySQL", area: "Database design",
    description: "Designing relational schemas, defining how records connect, and writing queries that support application needs.",
    position: { x: 63, y: 81 }, mobilePosition: { x: 30, y: 88 },
  },
];

// Connections express working relationships, not proficiency or prerequisites.
export const skillConnections: ReadonlyArray<readonly [SkillId, SkillId]> = [
  ["figma", "html"], ["figma", "css"], ["html", "css"],
  ["html", "javascript"], ["css", "javascript"],
  ["javascript", "nextjs"], ["javascript", "threejs"],
  ["javascript", "mern"], ["nextjs", "mern"],
  ["php", "laravel"], ["php", "mysql"], ["laravel", "mysql"],
];
