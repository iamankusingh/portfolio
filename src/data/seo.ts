export type PageMetadata = {
  title: string;
  description: string;
};

export const siteOrigin = "https://iamankusingh.vercel.app";

export const pageMetadata: Record<string, PageMetadata> = {
  "/": {
    title: "Anku Singh — Creative Technologist",
    description:
      "Anku Singh is a creative technologist working across design, engineering, and visual storytelling to build thoughtful digital experiences.",
  },
  "/about": {
    title: "About — Anku Singh, Creative Technologist",
    description:
      "Learn about Anku Singh, a software developer focused on web experiences, data, and application architecture.",
  },
  "/work": {
    title: "Selected Work — Anku Singh",
    description:
      "Explore the portfolio's upcoming web design and software development case studies by Anku Singh. Project details are being prepared.",
  },
  "/photography": {
    title: "Photography — Anku Singh",
    description:
      "Browse photographs by Anku Singh, featuring landscapes, places, and details observed along the way.",
  },
  "/contact": {
    title: "Contact Anku Singh",
    description:
      "Contact Anku Singh about software development, web experiences, design, and collaboration.",
  },
  "/lab": {
    title: "Flowpaper — Anku Singh Lab",
    description:
      "Explore Flowpaper, an interactive fluid wallpaper experiment by Anku Singh.",
  },
  "/legal": {
    title: "Legal, Privacy & Credits — Anku Singh",
    description:
      "Read the portfolio's terms, privacy information, photography permissions, and 3D model credits.",
  },
};
