import portrait from "../assets/anku.avif";

type PersonalProfile = {
  name: string;
  role: string;
  description: string;
  about: {
    label: string;
    heading: string;
    previewLabel: string;
    paragraphs: string[];
    details: { label: string; value: string }[];
    portrait: { src: string; alt: string };
  };
};

export const anku: PersonalProfile = {
  name: "Anku Singh",
  role: "Creative technologist",
  description:
    "Exploring the space between design, engineering, and the natural world. Turning curiosity into thoughtful digital experiences.",
  about: {
    label: "Behind the work",
    heading: "A curious mind. A human perspective.",
    previewLabel: "Draft personal copy · Preview",
    paragraphs: [
      "I’m drawn to the place where thoughtful design meets the possibilities of code. From the first sketch to the smallest interaction, I like exploring how an idea can become something useful, intuitive, and full of character.",
      "Nature offers a different way of looking: slower rhythms, unexpected details, and room to notice. That sense of curiosity shapes the digital experiences I want to create — considered in how they work, personal in how they feel.",
    ],
    details: [
      { label: "Practice", value: "Design, engineering & visual storytelling" },
      { label: "Perspective", value: "Technology × Nature × Human Experience" },
    ],
    portrait: { src: portrait, alt: "Portrait of Anku Singh" },
  },
};
