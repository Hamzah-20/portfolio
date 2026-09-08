import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const mainProjectRef = useRef(null);
  const workspaceRef = useRef(null);
  const researchRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1.2,
      },
    );

    const cards = [
      mainProjectRef.current,
      workspaceRef.current,
      researchRef.current,
    ];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        },
      );
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        {/* =========================
            SECTION HEADER
        ========================== */}

        <div className="mb-12 md:mb-16">
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-3">
            Featured AI Project
          </p>

          <h2 className="text-white text-4xl md:text-5xl font-semibold">
            Building AI systems grounded in real information.
          </h2>

          <p className="text-white-50 text-lg md:text-xl mt-4 max-w-3xl">
            A full-stack research assistant combining Retrieval-Augmented
            Generation, hybrid search, local LLM inference, and source-backed
            answers.
          </p>
        </div>

        <div className="showcaselayout">
          {/* =========================
              MAIN FEATURED PROJECT
          ========================== */}

          <div ref={mainProjectRef} className="first-project-wrapper">
            {/* MAIN IMAGE */}
            <div className="image-wrapper relative overflow-hidden">
              <img
                src="/images/ai-projects/research-rag-740.webp"
                alt="Neural Research AI research dashboard"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />

              <div className="absolute top-5 left-5">
                <span
                  className="
                    px-4 py-2
                    rounded-full
                    bg-black/70
                    border border-cyan-400/30
                    text-cyan-300
                    text-sm
                    backdrop-blur-md
                  "
                >
                  Flagship AI Project
                </span>
              </div>
            </div>

            {/* MAIN PROJECT CONTENT */}
            <div className="text-content">
              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  "Generative AI",
                  "RAG",
                  "Hybrid Retrieval",
                  "LLMs",
                  "Full-Stack AI",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="
                      px-3 py-1
                      rounded-full
                      border border-white/10
                      bg-white/5
                      text-white-50
                      text-sm
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-cyan-300 uppercase tracking-[0.2em] text-sm">
                Neural Research
              </p>

              <h2 className="mt-2">
                Full-Stack Retrieval-Augmented Generation Research Platform
              </h2>

              <p className="text-white-50 md:text-xl mt-4">
                An end-to-end AI research assistant for organizing documents,
                retrieving relevant evidence across multiple sources, and
                generating grounded answers with source references using a local
                language model.
              </p>

              {/* =========================
                  PROJECT CAPABILITIES
              ========================== */}

              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-3
                  md:gap-4
                  mt-7
                "
              >
                <div
                  className="
                    border
                    border-white/10
                    bg-white/5
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-white-50 text-sm">Retrieval</p>

                  <p className="text-white text-lg font-semibold mt-2">
                    Hybrid Search
                  </p>

                  <p className="text-cyan-300 text-sm mt-1">Dense + Sparse</p>
                </div>

                <div
                  className="
                    border
                    border-white/10
                    bg-white/5
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-white-50 text-sm">Answers</p>

                  <p className="text-white text-lg font-semibold mt-2">
                    Grounded
                  </p>

                  <p className="text-cyan-300 text-sm mt-1">Source-backed</p>
                </div>

                <div
                  className="
                    border
                    border-white/10
                    bg-white/5
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-white-50 text-sm">Generation</p>

                  <p className="text-white text-lg font-semibold mt-2">
                    Local LLM
                  </p>

                  <p className="text-cyan-300 text-sm mt-1">Ollama</p>
                </div>

                <div
                  className="
                    border
                    border-white/10
                    bg-white/5
                    rounded-xl
                    p-4
                  "
                >
                  <p className="text-white-50 text-sm">Architecture</p>

                  <p className="text-white text-lg font-semibold mt-2">
                    Full-Stack
                  </p>

                  <p className="text-cyan-300 text-sm mt-1">Dockerized</p>
                </div>
              </div>

              {/* =========================
                  TECHNOLOGIES
              ========================== */}

              <div className="flex flex-wrap gap-3 mt-6 text-sm text-white-50">
                <span>React</span>
                <span>•</span>

                <span>TypeScript</span>
                <span>•</span>

                <span>FastAPI</span>
                <span>•</span>

                <span>PostgreSQL</span>
                <span>•</span>

                <span>Qdrant</span>
                <span>•</span>

                <span>Ollama</span>
                <span>•</span>

                <span>Docker</span>
              </div>

              {/* =========================
                  BUTTONS
              ========================== */}

              <div className="flex flex-wrap gap-4 mt-7">
                <a
                  href="https://github.com/Hamzah-20/research-rag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-6 py-3
                    rounded-xl
                    bg-white
                    text-black
                    font-medium
                    transition-transform
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  View on GitHub ↗
                </a>

                <Link
                  to="/projects"
                  className="
    px-6 py-3
    rounded-xl
    border
    border-cyan-400/30
    text-cyan-300
    bg-cyan-400/5
    transition-all
    duration-300
    hover:bg-cyan-400/10
    hover:-translate-y-1
  "
                >
                  See All Projects →
                </Link>
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDE PROJECT DETAILS
          ========================== */}

          <div className="project-list-wrapper overflow-hidden">
            {/* =========================
                WORKSPACE
            ========================== */}

            <div className="project" ref={workspaceRef}>
              <div
                className="
                  image-wrapper
                  bg-[#03111a]
                  relative
                  overflow-hidden
                "
              >
                <img
                  src="/images/ai-projects/rag-workspace.webp"
                  alt="Neural Research multi-document project workspace"
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full
                    h-full
                    object-cover
                    object-top
                    transition-transform
                    duration-500
                    hover:scale-[1.02]
                  "
                />
              </div>

              <div className="mt-5">
                <p
                  className="
                    text-cyan-300
                    text-sm
                    uppercase
                    tracking-wider
                    mb-2
                  "
                >
                  Research Workspace
                </p>

                <h2>Multi-Document Research Projects</h2>

                <p className="text-white-50 mt-3">
                  Organize research projects, upload and index documents, manage
                  searchable knowledge, and work across multiple research
                  sources.
                </p>
              </div>
            </div>

            {/* =========================
                GROUNDED RESEARCH
            ========================== */}

            <div className="project" ref={researchRef}>
              <div
                className="
                  image-wrapper
                  bg-[#03111a]
                  relative
                  overflow-hidden
                "
              >
                <img
                  src="/images/ai-projects/rag-research.webp"
                  alt="Grounded RAG research with retrieved evidence"
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full
                    h-full
                    object-cover
                    object-top
                    transition-transform
                    duration-500
                    hover:scale-[1.02]
                  "
                />
              </div>

              <div className="mt-5">
                <p
                  className="
                    text-cyan-300
                    text-sm
                    uppercase
                    tracking-wider
                    mb-2
                  "
                >
                  Grounded Research
                </p>

                <h2>Evidence-Backed AI Answers</h2>

                <p className="text-white-50 mt-3">
                  Retrieve relevant evidence using hybrid search and generate
                  grounded responses connected directly to the original source
                  documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
