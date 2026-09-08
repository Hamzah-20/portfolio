import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import PageTransition from "../components/PageTransition";
import Project3DBackground from "../components/Project3DBackground";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "React 19",
  "TypeScript",
  "FastAPI",
  "PostgreSQL",
  "Qdrant",
  "Ollama",
  "Docker",
  "Nginx",
];

const pipeline = [
  {
    number: "01",
    title: "Ingest",
    description: "PDF, DOCX, XLSX and CSV documents",
  },
  {
    number: "02",
    title: "Process",
    description: "Parse, extract, clean and chunk text",
  },
  {
    number: "03",
    title: "Represent",
    description: "Dense embeddings + sparse features",
  },
  {
    number: "04",
    title: "Index",
    description: "Store vector representations in Qdrant",
  },
  {
    number: "05",
    title: "Retrieve",
    description: "Dense + sparse hybrid retrieval",
  },
  {
    number: "06",
    title: "Rerank",
    description: "CrossEncoder evidence reranking",
  },
  {
    number: "07",
    title: "Generate",
    description: "Local generation through Ollama",
  },
  {
    number: "08",
    title: "Ground",
    description: "Answer with source attribution",
  },
];

const features = [
  {
    number: "01",
    title: "Hybrid Retrieval",
    description:
      "Combines dense semantic retrieval and sparse search with Reciprocal Rank Fusion.",
    accent: "Dense + Sparse",
  },
  {
    number: "02",
    title: "Evidence Reranking",
    description:
      "CrossEncoder reranking improves the ordering of retrieved evidence before generation.",
    accent: "CrossEncoder",
  },
  {
    number: "03",
    title: "Multi-Document Research",
    description:
      "Research across complete project libraries or restrict retrieval to a single document.",
    accent: "Project Scope",
  },
  {
    number: "04",
    title: "Grounded Generation",
    description:
      "Local LLM responses are constructed from retrieved context and returned with source references.",
    accent: "Source Aware",
  },
  {
    number: "05",
    title: "Document Lifecycle",
    description:
      "Upload, index, inspect, replace, reindex and delete research documents from one workspace.",
    accent: "Full Lifecycle",
  },
  {
    number: "06",
    title: "Persistent Research",
    description:
      "Projects, metadata, conversations, messages and research state persist through PostgreSQL.",
    accent: "Persistent",
  },
];

const retrievalResults = [
  {
    name: "Dense",
    recall: 57.96,
    mrr: 55.81,
    latency: "17 ms",
  },
  {
    name: "Sparse",
    recall: 76.36,
    mrr: 73.59,
    latency: "24.2 ms",
  },
  {
    name: "Hybrid",
    recall: 79.22,
    mrr: 68.13,
    latency: "43.5 ms",
  },
  {
    name: "Hybrid + Reranker",
    recall: 83.41,
    mrr: 78.33,
    latency: "749.7 ms",
    best: true,
  },
];

const promptVariants = [
  {
    name: "A",
    title: "Baseline",
    highlight: "90.3%",
    label: "Claim Support",
    description:
      "Strongest claim support and fastest generation, but lower answer relevance.",
  },
  {
    name: "B",
    title: "Evidence-first",
    highlight: "83.3%",
    label: "Answer Relevance",
    description:
      "Highest answer relevance and reference-fact coverage with the lowest observed false-abstention rate.",
  },
  {
    name: "C",
    title: "Abstention Gate",
    highlight: "33.3%",
    label: "False Abstention",
    description:
      "The explicit abstention gate increased unnecessary abstentions in this pilot evaluation.",
  },
  {
    name: "D",
    title: "Claim Citation",
    highlight: "38.1%",
    label: "Citation Coverage",
    description:
      "Improved claim-level citation coverage and achieved 3/3 strict success on document discrimination.",
  },
];

const screenshots = [
  {
    title: "Research Dashboard",
    subtitle: "Projects, indexing status and research activity",
    image: "/images/projects/research-rag/dashboard.webp",
  },
  {
    title: "Project Workspace",
    subtitle: "Dedicated multi-document research workspace",
    image: "/images/projects/research-rag/project_workspace.webp",
  },
  {
    title: "Document Library",
    subtitle: "Global research document management",
    image: "/images/projects/research-rag/document_library.webp",
  },
  {
    title: "Grounded Research",
    subtitle: "Evidence-based answers with source references",
    image: "/images/projects/research-rag/grounded_research.webp",
  },
];

const FlowNode = ({ title, subtitle, accent = false }) => {
  return (
    <div
      className={`
        relative
        rounded-2xl
        border
        px-5
        py-4
        text-center
        transition-all
        duration-500
        hover:-translate-y-1
        ${
          accent
            ? "border-cyan-300/30 bg-cyan-300/[0.06]"
            : "border-white/10 bg-white/[0.025]"
        }
      `}
    >
      <p
        className={
          accent ? "text-cyan-300 font-medium" : "text-white font-medium"
        }
      >
        {title}
      </p>

      {subtitle && <p className="text-white/35 text-xs mt-1">{subtitle}</p>}
    </div>
  );
};

const Arrow = () => {
  return (
    <div className="flex justify-center py-2">
      <div className="flex flex-col items-center">
        <span className="w-px h-5 bg-gradient-to-b from-cyan-300/60 to-white/10" />
        <span className="text-cyan-300/60 text-xs">▼</span>
      </div>
    </div>
  );
};

const ResearchRag = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".rr-hero-copy > *",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".rr-hero-visual",
        {
          opacity: 0,
          x: 70,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      gsap.utils.toArray(".rr-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 55,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      gsap.fromTo(
        ".rr-metric",
        {
          opacity: 0,
          y: 35,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".rr-metrics",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".retrieval-bar",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".retrieval-results",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.to(".rr-orbit", {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".rr-float", {
        y: -10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: pageRef,
    },
  );

  return (
    <PageTransition>
      <main
        ref={pageRef}
        className="relative min-h-screen bg-black text-white overflow-hidden"
      >
        <Project3DBackground />
        <ScrollToTopProgress />

        <div className="relative z-10">
          <NavBar />

          <section
            className="
            relative
            min-h-screen
            flex
            items-center
            px-6
            md:px-12
            lg:px-16
            pt-32
            md:pt-40
            pb-24
          "
          >
            <div
              className="
              pointer-events-none
              absolute
              top-[-250px]
              right-[-150px]
              w-[800px]
              h-[800px]
              rounded-full
              bg-cyan-400/[0.055]
              blur-[180px]
            "
            />

            <div
              className="
              pointer-events-none
              absolute
              bottom-[-200px]
              left-[-250px]
              w-[700px]
              h-[700px]
              rounded-full
              bg-blue-500/[0.035]
              blur-[170px]
            "
            />

            <div
              className="
              relative
              max-w-[1450px]
              mx-auto
              w-full
              grid
              grid-cols-1
              xl:grid-cols-12
              gap-14
              xl:gap-10
              items-center
            "
            >
              <div className="rr-hero-copy xl:col-span-5 relative z-20">
                <div
                  className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-cyan-300/20
                  bg-cyan-300/[0.045]
                  px-4
                  py-2
                  text-xs
                  uppercase
                  tracking-[0.22em]
                  text-cyan-300
                "
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  Flagship AI Project
                </div>

                <h1
                  className="
                  text-5xl
                  md:text-7xl
                  xl:text-[84px]
                  font-semibold
                  leading-[0.96]
                  tracking-[-0.04em]
                  mt-7
                "
                >
                  Neural
                  <br />
                  <span
                    className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-cyan-300
                    via-blue-300
                    to-white
                  "
                  >
                    Research.
                  </span>
                </h1>

                <p
                  className="
                  text-white-50
                  text-lg
                  md:text-xl
                  leading-relaxed
                  max-w-xl
                  mt-8
                "
                >
                  A full-stack Retrieval-Augmented Generation platform I
                  designed and built for grounded research across single and
                  multiple documents, combining hybrid retrieval, reranking,
                  local LLM inference and evidence-backed answers.
                </p>

                <div className="flex flex-wrap gap-2 mt-8">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.025]
                      px-3
                      py-1.5
                      text-white/55
                      text-xs
                      transition-all
                      duration-300
                      hover:border-cyan-300/25
                      hover:text-cyan-300
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-10">
                  <a
                    href="https://github.com/Hamzah-20/research-rag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-white
                    text-black
                    font-medium
                    px-6
                    py-3.5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                  >
                    View GitHub
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>

                  <a
                    href="#rag-architecture"
                    className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    text-white
                    px-6
                    py-3.5
                    transition-all
                    duration-300
                    hover:border-cyan-300/30
                    hover:bg-cyan-300/[0.035]
                  "
                  >
                    Explore Architecture
                    <span className="text-cyan-300 transition-transform duration-300 group-hover:translate-y-1">
                      ↓
                    </span>
                  </a>
                </div>

                <p
                  className="
                  text-white/25
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  mt-8
                "
                >
                  Designed & built end-to-end by Hamzah Al-Basyouni
                </p>
              </div>

              <div className="rr-hero-visual xl:col-span-7 relative">
                <div
                  className="
                  rr-float
                  relative
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/[0.025]
                  p-2
                  md:p-3
                  shadow-[0_30px_120px_rgba(34,211,238,0.08)]
                "
                >
                  <div
                    className="
                    rounded-[23px]
                    overflow-hidden
                    border
                    border-white/[0.07]
                    bg-[#06080a]
                  "
                  >
                    <div
                      className="
                      h-11
                      border-b
                      border-white/[0.07]
                      flex
                      items-center
                      px-4
                      gap-2
                      bg-black/60
                    "
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />

                      <div
                        className="
                        ml-4
                        rounded-md
                        bg-white/[0.04]
                        border
                        border-white/[0.05]
                        px-4
                        py-1
                        text-white/25
                        text-[10px]
                        tracking-wide
                      "
                      >
                        neural-research / grounded-research
                      </div>
                    </div>

                    <img
                      src="/images/projects/research-rag/grounded_research.webp"
                      alt="Neural Research grounded research interface"
                      fetchPriority="high"
                      decoding="async"
                      className="
    w-full
    aspect-[16/10]
    object-cover
    object-top
  "
                    />
                  </div>
                </div>

                <div
                  className="
                  hidden
                  md:block
                  absolute
                  -left-8
                  top-[18%]
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/80
                  backdrop-blur-xl
                  px-5
                  py-4
                  shadow-2xl
                "
                >
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Evidence Recall@5
                  </p>

                  <p className="text-cyan-300 text-3xl font-semibold mt-1">
                    0.8341
                  </p>

                  <p className="text-white/35 text-xs mt-1">
                    Hybrid + Reranker
                  </p>
                </div>

                <div
                  className="
                  hidden
                  md:block
                  absolute
                  -right-5
                  bottom-[12%]
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/80
                  backdrop-blur-xl
                  px-5
                  py-4
                  shadow-2xl
                "
                >
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                    </span>

                    <span className="text-white/50 text-xs">Local LLM</span>
                  </div>

                  <p className="text-white font-medium mt-2">
                    Qwen2.5 3B Instruct
                  </p>
                </div>

                <div
                  className="
                  rr-orbit
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  w-52
                  h-52
                  rounded-full
                  border
                  border-cyan-300/[0.08]
                "
                >
                  <span
                    className="
                    absolute
                    top-1/2
                    -left-1
                    w-2
                    h-2
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_16px_rgba(34,211,238,0.8)]
                  "
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 pb-24">
            <div
              className="
                rr-metrics
                max-w-7xl
                mx-auto
                grid
                grid-cols-2
                lg:grid-cols-4
                gap-px
                rounded-3xl
                overflow-hidden
                border
                border-white/10
                bg-white/10
                backdrop-blur-sm
              "
            >
              <div className="rr-metric bg-black/50 backdrop-blur-[2px] p-6 md:p-8">
                <p className="text-cyan-300 text-3xl md:text-4xl font-semibold">
                  0.8341
                </p>

                <p className="text-white/45 text-sm mt-2">Evidence Recall@5</p>
              </div>

              <div className="rr-metric bg-black/50 backdrop-blur-[2px] p-6 md:p-8">
                <p className="text-cyan-300 text-3xl md:text-4xl font-semibold">
                  0.7833
                </p>

                <p className="text-white/45 text-sm mt-2">Evidence MRR</p>
              </div>

              <div className="rr-metric bg-black/50 backdrop-blur-[2px] p-6 md:p-8">
                <p className="text-cyan-300 text-3xl md:text-4xl font-semibold">
                  33
                </p>

                <p className="text-white/45 text-sm mt-2">
                  Multi-document questions
                </p>
              </div>

              <div className="rr-metric bg-black/50 backdrop-blur-[2px] p-6 md:p-8">
                <p className="text-cyan-300 text-3xl md:text-4xl font-semibold">
                  28
                </p>

                <p className="text-white/45 text-sm mt-2">
                  Backend tests passed
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
              <div
                className="
                rr-reveal
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-6
              "
              >
                <div
                  className="
                  lg:col-span-5
                  rounded-[30px]
                  border
                  border-white/10
                  rr-glass
                  p-8
                  md:p-10
                  min-h-[430px]
                  flex
                  flex-col
                  relative
                  overflow-hidden
                "
                >
                  <div
                    className="
                    absolute
                    -top-32
                    -left-32
                    w-72
                    h-72
                    rounded-full
                    bg-red-400/[0.035]
                    blur-[90px]
                  "
                  />

                  <p className="text-red-300/80 text-xs uppercase tracking-[0.25em]">
                    The Problem
                  </p>

                  <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                    Research answers
                    <br />
                    without evidence
                    <br />
                    are not enough.
                  </h2>

                  <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                    General-purpose LLMs can produce fluent answers while losing
                    the connection between individual claims and the research
                    evidence required to support them.
                  </p>
                </div>

                <div
                  className="
                    lg:col-span-7
                    rounded-[30px]
                    rr-glass-cyan
                    p-8
                    md:p-10
                    min-h-[430px]
                    flex
                    flex-col
                    relative
                    overflow-hidden
                  "
                >
                  <div
                    className="
                    absolute
                    -right-28
                    -bottom-28
                    w-96
                    h-96
                    rounded-full
                    bg-cyan-300/[0.055]
                    blur-[100px]
                  "
                  />

                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    The Solution
                  </p>

                  <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5 max-w-3xl">
                    Retrieve first.
                    <br />
                    Rank the evidence.
                    <br />
                    Then generate.
                  </h2>

                  <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12 max-w-3xl">
                    Neural Research connects document processing, dense and
                    sparse retrieval, hybrid search, evidence reranking and a
                    local LLM into one research workspace where generated
                    answers remain connected to their sources.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section
            id="rag-architecture"
            className="px-6 md:px-12 lg:px-16 py-24 md:py-32"
          >
            <div className="max-w-7xl mx-auto">
              <div className="rr-reveal mb-14 md:mb-20">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-cyan-300" />

                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Architecture
                  </p>
                </div>

                <h2 className="text-white text-4xl md:text-6xl font-semibold leading-[1.05] mt-5">
                  Two systems.
                  <br />
                  <span className="text-white/40">One grounded response.</span>
                </h2>
              </div>

              <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
              "
              >
                <div
                  className="
                  rr-reveal
                  rounded-[30px]
                  border
                  border-white/10
                  rr-glass
                  p-6
                  md:p-9
                "
                >
                  <p className="text-white text-xl font-semibold">
                    RAG Retrieval Architecture
                  </p>

                  <p className="text-white/35 text-sm mt-2">
                    Evidence discovery and grounded generation
                  </p>

                  <div className="mt-10 max-w-lg mx-auto">
                    <FlowNode
                      title="Research Documents"
                      subtitle="PDF · DOCX · XLSX · CSV"
                    />

                    <Arrow />

                    <FlowNode
                      title="Document Processing"
                      subtitle="Parse · Extract · Chunk"
                    />

                    <Arrow />

                    <div className="grid grid-cols-2 gap-3">
                      <FlowNode title="Dense Embeddings" subtitle="Semantic" />

                      <FlowNode title="Sparse Features" subtitle="Lexical" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Arrow />
                      <Arrow />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <FlowNode title="Qdrant" subtitle="Vector Index" />

                      <FlowNode
                        title="Sparse Retrieval"
                        subtitle="BM25-style"
                      />
                    </div>

                    <Arrow />

                    <FlowNode
                      title="Hybrid Search"
                      subtitle="Reciprocal Rank Fusion"
                      accent
                    />

                    <Arrow />

                    <FlowNode
                      title="CrossEncoder Reranker"
                      subtitle="Optional"
                    />

                    <Arrow />

                    <FlowNode
                      title="Ollama Local LLM"
                      subtitle="qwen2.5:3b-instruct"
                    />

                    <Arrow />

                    <FlowNode title="Grounded Answer + Sources" accent />
                  </div>
                </div>

                <div
                  className="
                  rr-reveal
                  rounded-[30px]
                  border
                  border-white/10
                  rr-glass
                  p-6
                  md:p-9
                "
                >
                  <p className="text-white text-xl font-semibold">
                    Full-Stack Architecture
                  </p>

                  <p className="text-white/35 text-sm mt-2">
                    Application, persistence and AI infrastructure
                  </p>

                  <div className="mt-10 max-w-lg mx-auto">
                    <FlowNode
                      title="User / Researcher"
                      subtitle="Research Workspace"
                    />

                    <Arrow />

                    <FlowNode
                      title="React + TypeScript"
                      subtitle="Interactive Frontend"
                      accent
                    />

                    <Arrow />

                    <FlowNode title="Nginx" subtitle="Frontend Serving" />

                    <Arrow />

                    <FlowNode
                      title="FastAPI"
                      subtitle="Application Backend"
                      accent
                    />

                    <Arrow />

                    <div className="grid grid-cols-3 gap-3">
                      <FlowNode title="PostgreSQL" subtitle="App Data" />

                      <FlowNode title="Qdrant" subtitle="Vectors" />

                      <FlowNode title="Ollama" subtitle="Local LLM" />
                    </div>

                    <Arrow />

                    <FlowNode title="Grounded Research Response" accent />

                    <div
                      className="
                      mt-10
                      rounded-2xl
                      border
                      border-white/[0.07]
                      bg-white/[0.02]
                      p-5
                    "
                    >
                      <p className="text-white/35 text-xs uppercase tracking-[0.18em]">
                        Deployment
                      </p>

                      <div className="flex flex-wrap gap-2 mt-4">
                        {[
                          "Docker Compose",
                          "Nginx",
                          "GitHub Actions",
                          "Alembic",
                        ].map((item) => (
                          <span
                            key={item}
                            className="
                            border
                            border-white/10
                            rounded-full
                            px-3
                            py-1
                            text-white/50
                            text-xs
                          "
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
              <div className="rr-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  RAG Pipeline
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  From document
                  <br />
                  <span className="text-white/40">to grounded answer.</span>
                </h2>
              </div>

              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
              "
              >
                {pipeline.map((step) => (
                  <div
                    key={step.number}
                    className="
                    rr-reveal
                    group
                    relative
                    min-h-[230px]
                    rounded-2xl
                    border
                    border-white/10
                    rr-glass
                    p-6
                    overflow-hidden
                    transition-all
                    duration-500
                    hover:border-cyan-300/30
                    hover:-translate-y-1
                  "
                  >
                    <span
                      className="
                      absolute
                      right-4
                      bottom-[-15px]
                      text-[100px]
                      font-bold
                      leading-none
                      text-white/[0.025]
                      group-hover:text-cyan-300/[0.045]
                      transition-all
                      duration-500
                    "
                    >
                      {step.number}
                    </span>

                    <p className="text-cyan-300 text-xs tracking-[0.2em]">
                      STEP {step.number}
                    </p>

                    <h3 className="text-white text-2xl font-semibold mt-8">
                      {step.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed mt-3 max-w-[240px]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
              <div className="rr-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Core Capabilities
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  More than
                  <br />
                  <span className="text-white/40">chat with a PDF.</span>
                </h2>
              </div>

              <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-5
              "
              >
                {features.map((feature) => (
                  <div
                    key={feature.number}
                    className="
                    rr-reveal
                    group
                    relative
                    rounded-[26px]
                    border
                    border-white/10
                    rr-glass
                    p-7
                    min-h-[280px]
                    flex
                    flex-col
                    overflow-hidden
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-cyan-300/30
                  "
                  >
                    <div
                      className="
                      absolute
                      -top-24
                      -right-24
                      w-52
                      h-52
                      rounded-full
                      bg-cyan-300/[0.03]
                      blur-[70px]
                      opacity-0
                      group-hover:opacity-100
                      transition-opacity
                      duration-500
                    "
                    />

                    <div className="flex justify-between gap-5 relative z-10">
                      <span className="text-white/20 text-sm">
                        {feature.number}
                      </span>

                      <span
                        className="
                        rounded-full
                        border
                        border-cyan-300/15
                        bg-cyan-300/[0.03]
                        px-3
                        py-1
                        text-cyan-300
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                      "
                      >
                        {feature.accent}
                      </span>
                    </div>

                    <div className="relative z-10 mt-auto pt-16">
                      <h3 className="text-white text-2xl font-semibold">
                        {feature.title}
                      </h3>

                      <p className="text-white/40 leading-relaxed mt-4">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="max-w-[1450px] mx-auto">
              <div
                className="
                rr-reveal
                flex
                flex-col
                lg:flex-row
                lg:items-end
                justify-between
                gap-8
                mb-14
              "
              >
                <div>
                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Product Experience
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                    A complete
                    <br />
                    <span className="text-white/40">research workspace.</span>
                  </h2>
                </div>

                <p className="text-white-50 text-lg leading-relaxed max-w-xl">
                  Project management, document workflows and grounded research
                  are integrated into one responsive full-stack application.
                </p>
              </div>

              <div
                className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-6
              "
              >
                {screenshots.map((screenshot) => (
                  <div
                    className="
    rr-reveal
    group
    rounded-[28px]
    rr-glass-soft
    p-2
    overflow-hidden
    transition-all
    duration-500
    hover:border-cyan-300/25
    hover:-translate-y-1
  "
                  >
                    <div className="rounded-[21px] overflow-hidden bg-black">
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        loading="lazy"
                        decoding="async"
                        className="
                        w-full
                        aspect-[16/10]
                        object-cover
                        object-top
                        transition-transform
                        duration-700
                        group-hover:scale-[1.025]
                      "
                      />
                    </div>

                    <div className="px-5 pt-5 pb-4">
                      <p className="text-white text-xl font-semibold">
                        {screenshot.title}
                      </p>

                      <p className="text-white/35 text-sm mt-1">
                        {screenshot.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
              <div className="rr-reveal mb-14">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-px bg-cyan-300" />

                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Evaluation
                  </p>
                </div>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  I did not just build it.
                  <br />
                  <span className="text-white/40">I measured it.</span>
                </h2>

                <p className="text-white-50 text-lg leading-relaxed max-w-3xl mt-6">
                  Multi-document retrieval was evaluated across Attention Is All
                  You Need, ResNet and BERT using 33 manually constructed
                  research questions.
                </p>
              </div>

              <div
                className="
                retrieval-results
                rr-reveal
                rounded-[30px]
                border
                border-white/10
                rr-glass
                p-6
                md:p-10
              "
              >
                <div className="flex flex-col gap-7">
                  {retrievalResults.map((result) => (
                    <div key={result.name}>
                      <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-end
                        justify-between
                        gap-3
                        mb-3
                      "
                      >
                        <div className="flex items-center gap-3">
                          <p
                            className={
                              result.best
                                ? "text-cyan-300 font-medium"
                                : "text-white font-medium"
                            }
                          >
                            {result.name}
                          </p>

                          {result.best && (
                            <span
                              className="
                              rounded-full
                              border
                              border-cyan-300/20
                              bg-cyan-300/[0.04]
                              px-2.5
                              py-1
                              text-cyan-300
                              text-[9px]
                              uppercase
                              tracking-[0.15em]
                            "
                            >
                              Best Evidence Recall
                            </span>
                          )}
                        </div>

                        <div
                          className="
                          flex
                          flex-wrap
                          gap-x-6
                          gap-y-1
                          text-xs
                        "
                        >
                          <span className="text-white/35">
                            Evidence Recall@5{" "}
                            <strong className="text-white font-medium">
                              {(result.recall / 100).toFixed(4)}
                            </strong>
                          </span>

                          <span className="text-white/35">
                            MRR{" "}
                            <strong className="text-white font-medium">
                              {(result.mrr / 100).toFixed(4)}
                            </strong>
                          </span>

                          <span className="text-white/35">
                            Latency{" "}
                            <strong className="text-white font-medium">
                              {result.latency}
                            </strong>
                          </span>
                        </div>
                      </div>

                      <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                        <div
                          className={`
                          retrieval-bar
                          h-full
                          rounded-full
                          ${result.best ? "bg-cyan-300" : "bg-white/20"}
                        `}
                          style={{
                            width: `${result.recall}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="
                  mt-10
                  pt-8
                  border-t
                  border-white/[0.07]
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-5
                "
                >
                  <div>
                    <p className="text-white/25 text-xs uppercase tracking-[0.18em]">
                      Best Evidence Recall
                    </p>

                    <p className="text-cyan-300 text-2xl font-semibold mt-2">
                      0.8341
                    </p>

                    <p className="text-white/35 text-sm mt-1">
                      Hybrid + Reranker
                    </p>
                  </div>

                  <div>
                    <p className="text-white/25 text-xs uppercase tracking-[0.18em]">
                      Efficient Alternative
                    </p>

                    <p className="text-white text-2xl font-semibold mt-2">
                      0.7922
                    </p>

                    <p className="text-white/35 text-sm mt-1">
                      Hybrid at 43.5 ms
                    </p>
                  </div>

                  <div>
                    <p className="text-white/25 text-xs uppercase tracking-[0.18em]">
                      Reranking Cost
                    </p>

                    <p className="text-white text-2xl font-semibold mt-2">
                      17.2×
                    </p>

                    <p className="text-white/35 text-sm mt-1">
                      Slower than Hybrid
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="
                rr-reveal
                mt-6
                rounded-[30px]
                border
                border-white/10
                rr-glass
                p-6
                md:p-10
              "
              >
                <div
                  className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-end
                  justify-between
                  gap-6
                "
                >
                  <div>
                    <p className="text-cyan-300 text-xs uppercase tracking-[0.22em]">
                      Prompt Ablation
                    </p>

                    <h3 className="text-white text-3xl md:text-4xl font-semibold mt-3">
                      Grounding behavior
                      <br />
                      is a trade-off.
                    </h3>
                  </div>

                  <p className="text-white/40 max-w-xl leading-relaxed">
                    Four prompt variants were evaluated while retrieval was
                    frozen. No variant improved strict end-to-end success beyond
                    the baseline.
                  </p>
                </div>

                <div
                  className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  xl:grid-cols-4
                  gap-4
                  mt-10
                "
                >
                  {promptVariants.map((variant) => (
                    <div
                      className="
    rr-reveal
    group
    rounded-[28px]
    rr-glass-soft
    p-2
    overflow-hidden
    transition-all
    duration-500
    hover:border-cyan-300/25
    hover:-translate-y-1
  "
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className="
                          w-9
                          h-9
                          rounded-full
                          border
                          border-cyan-300/20
                          flex
                          items-center
                          justify-center
                          text-cyan-300
                          text-sm
                        "
                        >
                          {variant.name}
                        </span>

                        <span className="text-white/15 text-3xl font-semibold">
                          {variant.highlight}
                        </span>
                      </div>

                      <h4 className="text-white text-xl font-semibold mt-8">
                        {variant.title}
                      </h4>

                      <p className="text-cyan-300 text-xs mt-2">
                        {variant.highlight} {variant.label}
                      </p>

                      <p className="text-white/35 text-sm leading-relaxed mt-auto pt-6">
                        {variant.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="
                  mt-6
                  rounded-2xl
                  border
                  border-cyan-300/15
                  bg-cyan-300/[0.025]
                  p-6
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  justify-between
                  gap-5
                "
                >
                  <div>
                    <p className="text-white/35 text-xs uppercase tracking-[0.18em]">
                      Strict Success
                    </p>

                    <p className="text-white text-lg mt-2">
                      Every prompt configuration finished at the same strict
                      end-to-end success rate.
                    </p>
                  </div>

                  <p className="text-cyan-300 text-4xl font-semibold shrink-0">
                    41.7%
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">
              <div
                className="
                rr-reveal
                rounded-[32px]
                border
                border-white/10
                rr-glass
                overflow-hidden
              "
              >
                <div
                  className="
                  p-8
                  md:p-12
                  border-b
                  border-white/[0.07]
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-end
                  justify-between
                  gap-8
                "
                >
                  <div>
                    <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                      Engineering Quality
                    </p>

                    <h2 className="text-white text-4xl md:text-5xl font-semibold mt-4">
                      Built as a system.
                      <br />
                      <span className="text-white/40">
                        Not a notebook demo.
                      </span>
                    </h2>
                  </div>

                  <p className="text-white/40 max-w-xl leading-relaxed">
                    The backend is modularized across ingestion, retrieval,
                    reranking, generation and research responsibilities, with
                    persistent storage and a fully containerized application
                    stack.
                  </p>
                </div>

                <div
                  className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-px
                  bg-white/[0.07]
                "
                >
                  {[
                    ["28", "Backend Tests"],
                    ["Passed", "TypeScript Build"],
                    ["Passed", "Docker Builds"],
                    ["Healthy", "API + Services"],
                  ].map(([value, label]) => (
                    <div key={label} className="rr-glass p-6 md:p-8">
                      <p className="text-cyan-300 text-xl md:text-2xl font-semibold">
                        {value}
                      </p>

                      <p className="text-white/35 text-sm mt-2">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="
                rr-reveal
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-6
                mt-6
              "
              >
                <div
                  className="
                  lg:col-span-5
                  rounded-[28px]
                  border
                  border-white/10
                  rr-glass
                  p-8
                "
                >
                  <p className="text-white/25 text-xs uppercase tracking-[0.2em]">
                    What the evaluation revealed
                  </p>

                  <h3 className="text-white text-3xl font-semibold mt-4">
                    Better retrieval
                    <br />
                    has a cost.
                  </h3>

                  <p className="text-white/40 leading-relaxed mt-6">
                    Reranking improved evidence selection and ranking, but
                    introduced substantial latency. Hybrid retrieval offered a
                    strong middle ground between evidence coverage and response
                    speed.
                  </p>
                </div>

                <div
                  className="
                  lg:col-span-7
                  rounded-[28px]
                  border
                  border-white/10
                  rr-glass
                  p-8
                "
                >
                  <p className="text-white/25 text-xs uppercase tracking-[0.2em]">
                    Current Limitation
                  </p>

                  <h3 className="text-white text-3xl font-semibold mt-4">
                    Cross-document evidence
                    <br />
                    remains the hardest problem.
                  </h3>

                  <p className="text-white/40 leading-relaxed mt-6 max-w-3xl">
                    Questions requiring evidence distributed across multiple
                    documents remained significantly more difficult than
                    single-document retrieval. The evaluation intentionally
                    treats this as an open limitation rather than hiding it
                    behind aggregate metrics.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div
              className="
              rr-reveal
              max-w-7xl
              mx-auto
              relative
              overflow-hidden
              rounded-[36px]
              border
              rr-glass-cyan
              p-8
              md:p-14
            "
            >
              <div
                className="
                absolute
                -right-40
                -bottom-40
                w-[500px]
                h-[500px]
                rounded-full
                bg-cyan-300/[0.055]
                blur-[120px]
              "
              />

              <div
                className="
                relative
                z-10
                flex
                flex-col
                lg:flex-row
                lg:items-end
                justify-between
                gap-10
              "
              >
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Explore the Engineering
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight mt-4">
                    Read the code.
                    <br />
                    Reproduce the results.
                  </h2>

                  <p className="text-white-50 text-lg mt-5 max-w-2xl leading-relaxed">
                    The repository includes the full application, containerized
                    infrastructure, evaluation datasets, machine-readable
                    outputs and implementation details.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <a
                    href="https://github.com/Hamzah-20/research-rag"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    bg-white
                    text-black
                    rounded-xl
                    px-6
                    py-3.5
                    font-medium
                    transition-transform
                    duration-300
                    hover:-translate-y-1
                  "
                  >
                    View GitHub
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>

                  <Link
                    to="/projects"
                    className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    px-6
                    py-3.5
                    text-white
                    transition-all
                    duration-300
                    hover:border-cyan-300/30
                  "
                  >
                    ← All Projects
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </PageTransition>
  );
};

export default ResearchRag;
