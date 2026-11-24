import type { AvatarTone } from "@/components/Avatar";

// Illustrative UI preview content only; replace with server data when features are implemented.
export type SamplePost = {
  id: string;
  author: string;
  role: string;
  initials: string;
  tone: AvatarTone;
  time: string;
  body: string;
  tags: string[];
  likes: number;
  comments: { author: string; body: string }[];
};

export type SampleGuild = {
  slug: string;
  name: string;
  category: string;
  description: string;
  members: number;
  initials: string;
  tone: AvatarTone;
};

export type SampleEvent = {
  slug: string;
  title: string;
  topic: string;
  description: string;
  date: string;
  registrationDeadline: string;
  location: string;
  host: string;
  online: boolean;
  tone: "blue" | "cyan" | "violet";
  capacity: number;
  accepted: number;
  pending: number;
};

export const SAMPLE_POSTS: SamplePost[] = [
  {
    id: "prototype-day",
    author: "Mika Santos",
    role: "Product designer · Iloilo City",
    initials: "MS",
    tone: "violet",
    time: "2h",
    body: "A small reminder from our last build night: the best prototype is the one you let people try. We turned three rough sketches into a clickable flow before dinner.",
    tags: ["Build log", "Product design"],
    likes: 18,
    comments: [
      { author: "Paolo R.", body: "Love the fast-feedback approach." },
      { author: "Jules D.", body: "Would be keen to join the next one." },
    ],
  },
  {
    id: "api-night",
    author: "Andrei Cruz",
    role: "Full-stack developer · Iloilo",
    initials: "AC",
    tone: "blue",
    time: "5h",
    body: "Looking for a designer who enjoys making useful tools for campus orgs. I have a working event check-in flow and a very long list of ideas.",
    tags: ["Looking for collaborators", "Web development"],
    likes: 12,
    comments: [{ author: "Nina V.", body: "I have a few campus orgs that could test this." }],
  },
];

export const SAMPLE_GUILDS: SampleGuild[] = [
  {
    slug: "build-iloilo",
    name: "Build Iloilo",
    category: "Developers · Open source",
    description: "A welcoming place to ship small projects, share feedback, and learn by building together.",
    members: 128,
    initials: "BI",
    tone: "blue",
  },
  {
    slug: "pixel-and-product",
    name: "Pixel & Product",
    category: "Design · Product",
    description: "Designers and product thinkers exploring better digital experiences through practice.",
    members: 74,
    initials: "P+",
    tone: "violet",
  },
  {
    slug: "campus-founders",
    name: "Campus Founders",
    category: "Students · Startups",
    description: "Student builders turning useful ideas into experiments, prototypes, and real projects.",
    members: 96,
    initials: "CF",
    tone: "cyan",
  },
];

export const SAMPLE_EVENTS: SampleEvent[] = [
  {
    slug: "western-visayas-build-weekend",
    title: "Western Visayas Build Weekend",
    topic: "48-hour hackathon",
    description: "Form a small team, pick a local challenge, and take an idea from whiteboard to demo.",
    date: "Dec 12–13, 2026",
    registrationDeadline: "Dec 5, 2026",
    location: "Iloilo City",
    host: "Build Iloilo",
    online: false,
    tone: "blue",
    capacity: 48,
    accepted: 32,
    pending: 9,
  },
  {
    slug: "open-source-sprint",
    title: "Open Source Sprint: First PR",
    topic: "Community workshop",
    description: "A friendly, guided session for developers making their first contribution to an open project.",
    date: "Dec 19, 2026",
    registrationDeadline: "Dec 16, 2026",
    location: "Online",
    host: "Campus Founders",
    online: true,
    tone: "cyan",
    capacity: 60,
    accepted: 24,
    pending: 8,
  },
  {
    slug: "design-for-real-life",
    title: "Design for Real Life",
    topic: "Design jam",
    description: "Pair up with other designers to explore a real-world problem and share what you learn.",
    date: "Jan 10, 2027",
    registrationDeadline: "Jan 3, 2027",
    location: "Iloilo City",
    host: "Pixel & Product",
    online: false,
    tone: "violet",
    capacity: 30,
    accepted: 18,
    pending: 12,
  },
];

export const SAMPLE_MEMBERS = [
  { name: "Mika Santos", role: "Product designer", initials: "MS", tone: "violet" as const, interests: ["UX", "Prototyping"] },
  { name: "Andrei Cruz", role: "Full-stack developer", initials: "AC", tone: "blue" as const, interests: ["Next.js", "Open source"] },
  { name: "Nina Villanueva", role: "Computer science student", initials: "NV", tone: "cyan" as const, interests: ["AI", "Community"] },
];
