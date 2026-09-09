import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2022",
    title: "Computer Science",
    text: "Started building strong foundations in software engineering, algorithms, databases, and web development.",
  },
  {
    year: "2025",
    title: "Professional Development",
    text: "Graduated in Computer Science and gained professional experience building responsive production web applications.",
  },
  {
    year: "2026",
    title: "AI & Machine Learning",
    text: "Moved deeper into machine learning, computer vision, predictive analytics, and explainable AI systems.",
  },
  {
    year: "NOW",
    title: "Generative AI & RAG",
    text: "Building full-stack intelligent systems combining retrieval, LLMs, vector databases, APIs, and modern front-end experiences.",
  },
];

const JourneySection = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".journey-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-heading",
          start: "top 80%",
        },
      });

      gsap.from(".journey-node", {
        y: 60,
        opacity: 0,
        stagger: 0.18,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".journey-track",
          start: "top 75%",
        },
      });

      gsap.fromTo(
        ".journey-progress",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-track",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 1,
          },
        },
      );

      gsap.to(".journey-glow", {
        scale: 1.28,
        opacity: 0.95,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
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
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.04] blur-[120px]" />

        <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-purple-500/[0.04] blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="journey-heading text-center mx-auto max-w-4xl">
          <p className="text-cyan-300 uppercase tracking-[0.35em] text-xs md:text-sm">
            My Journey
          </p>

          <h2 className="mt-5 text-white text-4xl md:text-6xl font-semibold leading-tight">
            From software foundations to
            <span className="block bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
              intelligent systems.
            </span>
          </h2>

          <p className="mt-6 mx-auto max-w-2xl text-white-50 text-lg md:text-xl leading-relaxed">
            A path through software development, machine learning, and
            full-stack AI engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="journey-track relative mt-20 md:mt-28">
          {/* Desktop connector */}
          <div className="hidden md:block absolute left-[8%] right-[8%] top-[35px] h-[2px] bg-white/[0.12] overflow-hidden rounded-full">
            <div className="journey-progress origin-left h-full w-full rounded-full bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300 shadow-[0_0_28px_rgba(103,232,249,0.7)]" />
          </div>

          {/* Mobile connector */}
          <div className="md:hidden absolute left-[24px] top-8 bottom-8 w-px bg-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {milestones.map((item, index) => (
              <article
                key={item.year}
                className="journey-node relative pl-16 md:pl-0 md:text-center"
              >
                {/* Node */}
                <div className="absolute left-0 top-1 md:relative md:left-auto md:top-auto md:mx-auto flex size-12 md:size-[70px] items-center justify-center">
                  {index === milestones.length - 1 && (
                    <div className="journey-glow absolute inset-0 rounded-full bg-cyan-300/20 blur-xl" />
                  )}

                  <div
                    className="
                      relative
                      z-10
                      flex
                      size-12
                      md:size-[70px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-cyan-300/30
                      bg-black
                      shadow-[0_0_30px_rgba(34,211,238,0.12)]
                    "
                  >
                    <span className="text-xs md:text-sm font-semibold text-cyan-200">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div
                  className="
                    md:mt-8
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-6
                    text-left
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:border-cyan-300/30
                    hover:bg-cyan-300/[0.035]
                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                  "
                >
                  <h3 className="text-white text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-white-50 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/about"
            className="
              inline-flex
              items-center
              gap-3
              rounded-xl
              border
              border-cyan-300/25
              bg-cyan-300/[0.05]
              px-6
              py-3
              text-cyan-200
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-300/50
              hover:bg-cyan-300/[0.1]
              hover:shadow-[0_10px_40px_rgba(34,211,238,0.12)]
            "
          >
            Explore My Journey
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
