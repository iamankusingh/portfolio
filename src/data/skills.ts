import cssLogo from "../assets/tech/CSS3.webp";
import expressLogo from "../assets/tech/Express.webp";
import figmaLogo from "../assets/tech/Figma.webp";
import htmlLogo from "../assets/tech/HTML5.webp";
import javascriptLogo from "../assets/tech/JavaScript.webp";
import laravelLogo from "../assets/tech/Laravel.webp";
import mongodbLogo from "../assets/tech/MongoDB.webp";
import mysqlLogo from "../assets/tech/MySQL.webp";
import nextjsLogo from "../assets/tech/Next.js.webp";
import nodejsLogo from "../assets/tech/Node.js.webp";
import phpLogo from "../assets/tech/PHP.webp";
import reactLogo from "../assets/tech/React.webp";
import tailwindLogo from "../assets/tech/TailwindCSS.webp";
import threejsLogo from "../assets/tech/Three.js.webp";

type SkillId =
  | "figma"
  | "html"
  | "css"
  | "javascript"
  | "nextjs"
  | "threejs"
  | "mongodb"
  | "express"
  | "react"
  | "nodejs"
  | "tailwind"
  | "php"
  | "laravel"
  | "mysql";

type Skill = {
  id: SkillId;
  label: string;
  logo: string;
  area: string;
  description: string;
  position: { x: number; y: number };
  mobilePosition: { x: number; y: number };
};

export const skills: Skill[] = [
  {
    id: "figma",
    label: "Figma",
    logo: figmaLogo,
    area: "Interface design",
    description:
      "Exploring interface ideas, shaping layouts, and connecting screens into interactive prototypes before development.",
    position: { x: 12, y: 14 },
    mobilePosition: { x: 22, y: 6 },
  },
  {
    id: "html",
    label: "HTML",
    logo: htmlLogo,
    area: "Web foundations",
    description:
      "Giving content a meaningful structure with semantic markup, accessible forms, and clear document hierarchy.",
    position: { x: 25, y: 40 },
    mobilePosition: { x: 22, y: 19 },
  },
  {
    id: "css",
    label: "CSS",
    logo: cssLogo,
    area: "Web foundations",
    description:
      "Turning layouts into responsive interfaces through typography, composition, styling, and considered motion.",
    position: { x: 29, y: 22 },
    mobilePosition: { x: 76, y: 12 },
  },
  {
    id: "javascript",
    label: "JavaScript",
    logo: javascriptLogo,
    area: "Interaction & application logic",
    description:
      "Connecting interfaces to behavior and data, from small interactions to complete web applications.",
    position: { x: 48, y: 34 },
    mobilePosition: { x: 22, y: 33 },
  },
  {
    id: "nextjs",
    label: "Next.js",
    logo: nextjsLogo,
    area: "React applications",
    description:
      "Building React applications with routing, rendering, and server-side capabilities in one framework.",
    position: { x: 80, y: 12 },
    mobilePosition: { x: 76, y: 52 },
  },
  {
    id: "threejs",
    label: "Three.js",
    logo: threejsLogo,
    area: "Creative development",
    description:
      "Bringing interactive scenes, spatial storytelling, and real-time 3D to the browser with JavaScript.",
    position: { x: 70, y: 38 },
    mobilePosition: { x: 76, y: 39 },
  },
  {
    id: "react",
    label: "React",
    logo: reactLogo,
    area: "MERN stack · Interfaces",
    description:
      "Building component-based interfaces with React, connecting application state and user interactions to the rest of the MERN stack.",
    position: { x: 61, y: 14 },
    mobilePosition: { x: 22, y: 47 },
  },
  {
    id: "nodejs",
    label: "Node.js",
    logo: nodejsLogo,
    area: "MERN stack · Runtime",
    description:
      "Running JavaScript on the server to handle application logic and support the APIs behind a full-stack experience.",
    position: { x: 35, y: 59 },
    mobilePosition: { x: 22, y: 61 },
  },
  {
    id: "express",
    label: "Express",
    logo: expressLogo,
    area: "MERN stack · APIs",
    description:
      "Structuring Node.js APIs with routes and middleware to connect a React interface with server logic and data.",
    position: { x: 20, y: 72 },
    mobilePosition: { x: 76, y: 66 },
  },
  {
    id: "mongodb",
    label: "MongoDB",
    logo: mongodbLogo,
    area: "MERN stack · Data",
    description:
      "Organizing document-based data and connecting it to Node.js and Express services in the MERN stack.",
    position: { x: 45, y: 75 },
    mobilePosition: { x: 22, y: 75 },
  },
  {
    id: "tailwind",
    label: "Tailwind CSS",
    logo: tailwindLogo,
    area: "Interface styling",
    description:
      "Composing responsive interfaces with CSS utilities while keeping spacing, typography, and visual states consistent.",
    position: { x: 40, y: 10 },
    mobilePosition: { x: 76, y: 25 },
  },
  {
    id: "php",
    label: "PHP",
    logo: phpLogo,
    area: "Backend development",
    description:
      "Writing server-side application logic, handling requests, and connecting web interfaces to persistent data.",
    position: { x: 70, y: 60 },
    mobilePosition: { x: 76, y: 80 },
  },
  {
    id: "laravel",
    label: "Laravel",
    logo: laravelLogo,
    area: "Backend applications",
    description:
      "Organizing PHP applications with routing, validation, database models, and maintainable application structure.",
    position: { x: 60, y: 74 },
    mobilePosition: { x: 22, y: 89 },
  },
  {
    id: "mysql",
    label: "MySQL",
    logo: mysqlLogo,
    area: "Database design",
    description:
      "Designing relational schemas, defining how records connect, and writing queries that support application needs.",
    position: { x: 78, y: 75 },
    mobilePosition: { x: 76, y: 93 },
  },
];

// Connections express working relationships, not proficiency or prerequisites.
export const skillConnections: ReadonlyArray<readonly [SkillId, SkillId]> = [
  ["figma", "html"],
  ["figma", "css"],
  ["html", "css"],
  ["html", "javascript"],
  ["css", "javascript"],
  ["css", "tailwind"],
  ["javascript", "threejs"],
  ["javascript", "react"],
  ["react", "nextjs"],
  ["javascript", "nodejs"],
  ["nodejs", "express"],
  ["express", "mongodb"],
  ["nodejs", "mongodb"],
  ["php", "laravel"],
  ["php", "mysql"],
  ["laravel", "mysql"],
];
