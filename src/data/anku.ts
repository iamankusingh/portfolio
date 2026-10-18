import portrait from "../assets/anku.webp";

type PersonalProfile = {
  name: string;
  role: string;
  proffesion: string;
  description: string;
  profile: {
    heading: string;
    introduction: string;
    paragraphs: string[];
    location: string;
    focus: string;
    copyNote: string;
  };
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
  proffesion: "Software Developer",
  description:
    "Exploring the space between design, engineering, and the natural world. Turning curiosity into thoughtful digital experiences.",
  profile: {
    heading: "Software developer. Database designer. System architect.",
    introduction:
      "I build web applications and design the systems behind them — connecting thoughtful interfaces, application logic, and well-structured data.",
    paragraphs: [
      "My work spans the journey from wireframes and prototypes to responsive interfaces, backend services, and database design. I like understanding how the pieces fit together, then making those connections clear and useful.",
      "I care about the details people feel and the structure they don’t see: how an interface responds, how information flows, and how a system can stay understandable as it grows.",
    ],
    location: "TBD",
    focus: "Web experiences, data & application architecture",
    copyNote:
      "Draft introduction based on my stated disciplines; final wording in progress.",
  },
  about: {
    label: "Behind the work",
    heading: "A curious mind. A human perspective.",
    previewLabel: "About me",
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
