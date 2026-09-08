const navLinks = [
  {
    name: "AI Projects",
    link: "#work",
  },
  {
    name: "Journey",
    link: "#experience",
  },
  {
    name: "AI Stack",
    link: "#skills",
  },
];

const words = [
  { text: "AI", imgPath: "/images/ideas.svg" },
  { text: "Data", imgPath: "/images/concepts.svg" },
  { text: "Models", imgPath: "/images/designs.svg" },
  { text: "Ideas", imgPath: "/images/code.svg" },
  { text: "AI", imgPath: "/images/ideas.svg" },
  { text: "Data", imgPath: "/images/concepts.svg" },
  { text: "Models", imgPath: "/images/designs.svg" },
  { text: "Ideas", imgPath: "/images/code.svg" },
];

const counterItems = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Satisfied Clients" },
  { value: 108, suffix: "+", label: "Completed Projects" },
  { value: 90, suffix: "%", label: "Client Retention Rate" },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "Python & AI",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "React",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Node.js",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Three.js",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Git & GitHub",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "Python",
    modelPath: "/models/python-transformed.glb",
    scale: 0.6,
    rotation: [0, 0, 0],
  },
  {
    name: "TensorFlow",
    svgPath: "/images/tech/tensorflow.svg",
    color: "#FF6F00",
    displayScale: 2.7,
    rotation: [0, 0, 0],
  },
  {
    name: "Scikit-Learn",
    svgPath: "/images/tech/scikitlearn.svg",
    color: "#F7931E",
    displayScale: 2.8,
    rotation: [0, 0, 0],
  },
  {
    name: "FastAPI",
    svgPath: "/images/tech/fastapi.svg",
    color: "#009688",
    displayScale: 2.65,
    rotation: [0, 0, 0],
  },
  {
    name: "Qdrant",
    svgPath: "/images/tech/qdrant.svg",
    color: "#DC244C",
    displayScale: 2.65,
    rotation: [0, 0, 0],
  },
  {
    name: "Ollama",
    svgPath: "/images/tech/ollama.svg",
    color: "#FFFFFF",
    displayScale: 2.55,
    rotation: [0, 0, 0],
  },
  {
    name: "Docker",
    svgPath: "/images/tech/docker.svg",
    color: "#2496ED",
    displayScale: 2.75,
    rotation: [0, 0, 0],
  },
  {
    name: "PostgreSQL",
    svgPath: "/images/tech/postgresql.svg",
    color: "#4169E1",
    displayScale: 2.65,
    rotation: [0, 0, 0],
  },
  {
    name: "React",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 0.75,
    rotation: [0, 0, 0],
  },
  {
    name: "Git & GitHub",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.03,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review:
      "Worked on educational web platforms, responsive interfaces, and performance optimization while collaborating with the team to deliver product requirements.",
    logoPath: "/images/experience/watad-logo-r.png",
    website: "https://watad.me/",
    title: "Web Developer",
    date: "July 2025 — June 2026",
    responsibilities: [
      "Developed and maintained educational web platforms for online learning.",
      "Built responsive interfaces to improve usability and user experience.",
      "Collaborated with teams to implement features and requirements.",
      "Optimized performance using code splitting and lazy loading.",
    ],
  },
  {
    review:
      "Worked on client-focused WordPress websites, including theme and plugin customization, responsive layouts, troubleshooting, and customized web solutions.",
    logoPath: "/images/experience/kz-logo2-r.png",
    website: "https://kabsetzr.com/",
    title: "Web Developer (WordPress)",
    date: "May 2025 — July 2025",
    responsibilities: [
      "Customized WordPress themes and plugins based on project and client requirements.",
      "Developed responsive web pages optimized for desktop and mobile devices.",
      "Identified and resolved technical issues related to website functionality, layout, and performance.",
      "Communicated with clients to gather requirements and deliver customized web solutions.",
    ],
  },
];

const socialImgs = [
  {
    name: "GitHub",
    imgPath: "/images/github-white-icon.webp",
    url: "https://github.com/Hamzah-20",
  },
  {
    name: "LinkedIn",
    imgPath: "/images/linkedin.png",
    url: "https://www.linkedin.com/in/hamzah-al-basyouni-967122369/",
  },
];

export {
  words,
  abilities,
  counterItems,
  expCards,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
};
