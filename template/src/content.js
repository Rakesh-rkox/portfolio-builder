// ============================================================
//  EDIT THIS FILE ONLY — all text, links and projects live here.
//  Theme colours are at the top of src/styles.css (:root).
// ============================================================

export const profile = {
  name: "Your Name",
  firstName: "Your",            // shown big in script font
  role: "Your Role Here",
  typedIntro:
    "A one or two sentence intro about what you build and what you care about.",
  // Put your image at public/portrait.png (transparent PNG/WebP works best), then change this:
  portrait: "/portrait.svg",
  previousPortfolio: { label: "Previous Portfolio", href: "" }, // leave href "" to hide
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  email: "you@example.com",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const projects = [
  {
    title: "Project One",
    blurb: "One-line description of what it does and why it matters.",
    tags: ["React", "Node"],
    link: "", // live demo / repo URL
    image: "", // optional: "/projects/one.png"
  },
  {
    title: "Project Two",
    blurb: "One-line description of what it does and why it matters.",
    tags: ["Python", "ML"],
    link: "",
    image: "",
  },
  {
    title: "Project Three",
    blurb: "One-line description of what it does and why it matters.",
    tags: ["TypeScript"],
    link: "",
    image: "",
  },
  {
    title: "Project Four",
    blurb: "One-line description of what it does and why it matters.",
    tags: ["Game", "Canvas"],
    link: "",
    image: "",
  },
];

// Horizontal-scroll cards in the About section. Add/remove freely.
export const aboutCards = [
  {
    kicker: "01 // IDENTITY",
    badge: "PROFILE",
    title: "Your Name",
    subtitle: "Your Role",
    chips: ["Skill A", "Skill B", "Skill C", "Skill D"],
  },
  {
    kicker: "02 // NARRATIVE",
    badge: "NOW / HOME",
    title: "Your headline",
    body: "A short paragraph about you: what you study or do, what you enjoy building, and where you want to go next.",
    footer: ["Currently: learning X", "Since: 20XX"],
  },
  {
    kicker: "03 // EDUCATION",
    badge: "ACADEMICS",
    title: "Where I’ve learned",
    body: "Degree, institution, years. Add courses, certifications or anything else worth noting.",
    footer: ["Status: in progress"],
  },
];

export const skills = {
  heading: "Skills & Technologies",
  groupLabel: "More comfortable",
  groupSub: "The tools I feel most at home with.",
  items: [
    { name: "Skill One", desc: "What you use it for.", meta: "v1.0", level: "Daily driver" },
    { name: "Skill Two", desc: "What you use it for.", meta: "tooling", level: "Proficient" },
    { name: "Skill Three", desc: "What you use it for.", meta: "frontend", level: "Daily driver" },
    { name: "Skill Four", desc: "What you use it for.", meta: "systems", level: "Learning" },
  ],
};

export const contact = {
  heading: "A short, friendly call to action. Reach out!",
  button: "Say hello",
};
