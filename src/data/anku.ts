import portrait from "../assets/anku.webp";

type PersonalProfile = {
  name: string;
  proffesion: string;
  role: string;
  slogan: string;
  description: string;
  about: {
    label: string;
    previewLabel: string;
    heading: string;
    paragraphs: string[];
    domain: string[];
    portrait: { src: string; alt: string };
  };
  profile: {
    label: string;
    heading: string;
    introduction: string;
    paragraphs: string[];
    location: string;
    focus: string;
  };
};

export const anku: PersonalProfile = {
  name: "Anku Singh",
  proffesion: "A Software Developer",
  role: "Creative technologist",
  slogan: "Technology × Nature × Human Experience",
  description:
    "Exploring the space between design, engineering, and the natural world. Turning curiosity into thoughtful digital experiences.",
  about: {
    label: "Behind the work",
    previewLabel: "About me",
    heading: "A curious mind. A human perspective.",
    paragraphs: [
      "I’m drawn to the place where thoughtful design meets the possibilities of code. From the first sketch to the smallest interaction.",
      "Nature offers a different way of looking: slower rhythms, unexpected details, and room to notice.",
    ],
    domain: [
      "Web Design",
      "Software Developement",
      "Database Design",
      "System Architecture",
      "User Experience",
      "Visual Storytelling",
    ],
    portrait: { src: portrait, alt: "Portrait of Anku Singh" },
  },
  profile: {
    label: "My expertise is in Computers",
    heading: "Software developer. Database designer. System architect.",
    introduction:
      "I build web applications and design the systems behind them — connecting thoughtful interfaces, application logic, and well-structured data.",
    paragraphs: [
      "My work spans the journey from wireframes and prototypes to responsive interfaces, backend services, and database design. I like understanding how the pieces fit together, then making those connections clear and useful.",
      "I care about the details people feel and the structure they don’t see: how an interface responds, how information flows, and how a system can stay understandable as it grows.",
    ],
    location: "Gandhidam, India",
    focus: "Web experiences, data & application architecture",
  },
};
