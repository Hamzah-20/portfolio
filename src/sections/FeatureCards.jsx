import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const systems = [
  {
    number: "01",
    title: "Generative AI & RAG",
    description:
      "Building grounded AI assistants that combine retrieval, language models, vector search, APIs, and intelligent interfaces.",
    tags: ["RAG", "Qdrant", "Ollama", "FastAPI"],
    style: { left: "3%", top: "5%" },
  },
  {
    number: "02",
    title: "Computer Vision",
    description:
      "Training and fine-tuning deep learning models for visual understanding with explainability and real-world evaluation.",
    tags: ["TensorFlow", "Keras", "Grad-CAM"],
    style: { right: "3%", top: "5%" },
  },
  {
    number: "03",
    title: "Predictive Analytics",
    description:
      "Designing machine learning systems for classification, regression, forecasting, and explainable business predictions.",
    tags: ["Scikit-Learn", "XGBoost", "SHAP"],
    style: { left: "3%", bottom: "7%" },
  },
  {
    number: "04",
    title: "Full-Stack AI",
    description:
      "Turning models into complete applications through modern front ends, APIs, databases, and production-ready workflows.",
    tags: ["React", "Django", "FastAPI", "PostgreSQL"],
    style: { right: "3%", bottom: "7%" },
  },
];

const FeatureCard = ({ system }) => {
  return (
    <article
      style={system.style}
      className="
    system-node
    group
    lg:absolute
    lg:w-[36%]
    rounded-3xl
    border
    border-white/10
    bg-black/60
    backdrop-blur-xl
    p-6
    xl:p-7
    transition-all
    duration-500
    hover:-translate-y-2
    hover:scale-[1.01]
    hover:border-cyan-300/35
    hover:bg-cyan-300/[0.035]
    hover:shadow-[0_20px_70px_rgba(34,211,238,0.08)]
  "
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-cyan-300/70 text-xs tracking-[0.3em]">
          SYSTEM {system.number}
        </span>

        <div
          className="
            flex
            size-9
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            text-white-50
            transition-all
            duration-300
            group-hover:rotate-45
            group-hover:border-cyan-300/40
            group-hover:text-cyan-200
          "
        >
          ↗
        </div>
      </div>

      <h3 className="mt-7 text-white text-xl xl:text-2xl font-semibold">
        {system.title}
      </h3>

      <p className="mt-4 text-white-50 leading-relaxed text-sm xl:text-base">
        {system.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {system.tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              border
              border-white/10
              bg-white/[0.025]
              px-3
              py-1.5
              text-xs
              text-white-50
              transition-colors
              duration-300
              group-hover:border-cyan-300/20
              group-hover:text-cyan-100
            "
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};

const FeatureCards = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".systems-heading", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".systems-heading",
            start: "top 80%",
          },
        });

        gsap.fromTo(
          ".system-node",
          {
            y: 50,
            scale: 0.96,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: ".systems-stage",
              start: "top 72%",
            },
          },
        );

        gsap.from(".systems-core", {
          scale: 0.6,
          opacity: 0,
          duration: 1.2,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".systems-stage",
            start: "top 72%",
          },
        });

        gsap.fromTo(
          ".system-line",
          {
            strokeDashoffset: 180,
          },
          {
            strokeDashoffset: 0,
            stagger: 0.12,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".systems-stage",
              start: "top 70%",
            },
          },
        );

        gsap.to(".systems-orbit", {
          rotation: 360,
          duration: 18,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });

        gsap.to(".systems-orbit-reverse", {
          rotation: -360,
          duration: 26,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });

        gsap.to(".core-glow", {
          scale: 1.18,
          opacity: 0.75,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full padding-x-lg py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[700px]
            w-[700px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/[0.035]
            blur-[150px]
          "
        />

        <div
          className="
            absolute
            right-[10%]
            top-[20%]
            h-72
            w-72
            rounded-full
            bg-purple-500/[0.035]
            blur-[120px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="systems-heading mx-auto max-w-4xl text-center">
          <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs md:text-sm">
            What I Build
          </p>

          <h2 className="mt-5 text-white text-4xl md:text-6xl font-semibold leading-tight">
            AI systems engineered
            <span
              className="
                block
                bg-gradient-to-r
                from-cyan-300
                via-white
                to-purple-300
                bg-clip-text
                text-transparent
              "
            >
              from intelligence to application.
            </span>
          </h2>

          <p className="mt-6 mx-auto max-w-3xl text-white-50 text-lg md:text-xl leading-relaxed">
            I connect models, retrieval, explainability, APIs, databases, and
            interfaces into complete intelligent systems.
          </p>
        </div>

        {/* Desktop command center */}
        <div
          className="
            systems-stage
            relative
            hidden
            lg:block
            mt-20
            min-h-[760px]
            rounded-[40px]
            border
            border-white/[0.07]
            bg-white/[0.015]
            overflow-hidden
          "
        >
          {/* Grid */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.14]
              [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
              [background-size:42px_42px]
            "
          />

          {/* Connection lines */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="systemGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgb(103 232 249)" />
                <stop offset="50%" stopColor="rgb(168 85 247)" />
                <stop offset="100%" stopColor="rgb(103 232 249)" />
              </linearGradient>
            </defs>

            <path
              className="system-line"
              d="M50 50 L31 27"
              fill="none"
              stroke="url(#systemGradient)"
              strokeWidth="0.25"
              strokeDasharray="180"
              strokeDashoffset="180"
              opacity="0.55"
            />

            <path
              className="system-line"
              d="M50 50 L69 27"
              fill="none"
              stroke="url(#systemGradient)"
              strokeWidth="0.25"
              strokeDasharray="180"
              strokeDashoffset="180"
              opacity="0.55"
            />

            <path
              className="system-line"
              d="M50 50 L31 73"
              fill="none"
              stroke="url(#systemGradient)"
              strokeWidth="0.25"
              strokeDasharray="180"
              strokeDashoffset="180"
              opacity="0.55"
            />

            <path
              className="system-line"
              d="M50 50 L69 73"
              fill="none"
              stroke="url(#systemGradient)"
              strokeWidth="0.25"
              strokeDasharray="180"
              strokeDashoffset="180"
              opacity="0.55"
            />
          </svg>

          {/* Nodes */}
          {systems.map((system) => (
            <FeatureCard key={system.number} system={system} />
          ))}

          {/* AI Core */}
          <div
            className="
              systems-core
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              flex
              size-[230px]
              xl:size-[260px]
              items-center
              justify-center
            "
          >
            <div
              className="
                core-glow
                absolute
                inset-[18%]
                rounded-full
                bg-cyan-300/15
                blur-3xl
              "
            />

            {/* Orbit 1 */}
            <div
              className="
                systems-orbit
                absolute
                inset-0
                rounded-full
                border
                border-cyan-300/15
              "
            >
              <span
                className="
                  absolute
                  left-1/2
                  top-[-4px]
                  size-2.5
                  -translate-x-1/2
                  rounded-full
                  bg-cyan-200
                  shadow-[0_0_20px_rgba(103,232,249,0.9)]
                "
              />
            </div>

            {/* Orbit 2 */}
            <div
              className="
                systems-orbit-reverse
                absolute
                inset-[16%]
                rounded-full
                border
                border-purple-300/20
              "
            >
              <span
                className="
                  absolute
                  right-[-4px]
                  top-1/2
                  size-2
                  -translate-y-1/2
                  rounded-full
                  bg-purple-300
                  shadow-[0_0_18px_rgba(216,180,254,0.8)]
                "
              />
            </div>

            <div
              className="
                relative
                z-10
                flex
                size-[145px]
                xl:size-[165px]
                flex-col
                items-center
                justify-center
                rounded-full
                border
                border-cyan-300/25
                bg-black/90
                text-center
                shadow-[0_0_60px_rgba(34,211,238,0.12)]
              "
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-300/60">
                Intelligence Core
              </span>

              <span className="mt-2 text-white text-xl xl:text-2xl font-semibold">
                AI Systems
              </span>

              <span className="mt-2 text-xs text-white-50">End-to-End</span>
            </div>
          </div>
        </div>

        {/* Mobile / tablet */}
        <div className="lg:hidden relative mt-14">
          <div className="absolute left-[21px] top-5 bottom-5 w-px bg-gradient-to-b from-cyan-300/40 via-purple-400/25 to-cyan-300/10" />

          <div className="space-y-6">
            {systems.map((system) => (
              <div key={system.number} className="system-node relative pl-14">
                <div
                  className="
                    absolute
                    left-0
                    top-6
                    flex
                    size-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-cyan-300/30
                    bg-black
                    text-xs
                    text-cyan-200
                    shadow-[0_0_25px_rgba(34,211,238,0.1)]
                  "
                >
                  {system.number}
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-6
                  "
                >
                  <h3 className="text-white text-xl font-semibold">
                    {system.title}
                  </h3>

                  <p className="mt-4 text-white-50 leading-relaxed">
                    {system.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {system.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-black/20
                          px-3
                          py-1
                          text-xs
                          text-white-50
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
