import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const languages = [
  {
    code: "AR",
    name: "Arabic",
    level: "Native / Bilingual",
    number: "01",
  },
  {
    code: "EN",
    name: "English",
    level: "Conversational",
    number: "02",
  },
];

const LanguageCard = ({ language }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateY = ((x - rect.width / 2) / rect.width) * 3;

    const rotateX = ((y - rect.height / 2) / rect.height) * -3;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -5,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        language-card
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-white/10
        bg-[#08090a]
        p-7
        md:p-9
        min-h-[260px]
        flex
        flex-col
        transition-colors
        duration-500
        hover:border-cyan-300/30
      "
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Mouse Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
        style={{
          background:
            "radial-gradient(380px circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.09), transparent 45%)",
        }}
      />

      {/* Grid */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.35) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom right, black, transparent 75%)",
        }}
      />

      {/* Number */}

      <span
        className="
          absolute
          right-6
          bottom-[-14px]
          text-[120px]
          font-bold
          leading-none
          text-white/[0.025]
          select-none
          transition-all
          duration-500
          group-hover:text-cyan-300/[0.045]
          group-hover:-translate-y-1
        "
      >
        {language.number}
      </span>

      {/* Code */}

      <div
        className="
          relative
          z-10
          w-14
          h-14
          rounded-2xl
          border
          border-cyan-300/20
          bg-cyan-300/[0.04]
          flex
          items-center
          justify-center
          text-cyan-300
          font-semibold
          tracking-[0.15em]
        "
      >
        {language.code}
      </div>

      {/* Main */}

      <div className="relative z-10 mt-auto pt-12">
        <p
          className="
            text-cyan-300
            uppercase
            tracking-[0.22em]
            text-xs
          "
        >
          Language
        </p>

        <div
          className="
            mt-3
            flex
            items-end
            justify-between
            gap-5
          "
        >
          <div>
            <h3
              className="
                text-white
                text-3xl
                md:text-4xl
                font-semibold
              "
            >
              {language.name}
            </h3>

            <p
              className="
                text-white-50
                text-base
                md:text-lg
                mt-3
              "
            >
              {language.level}
            </p>
          </div>

          <div
            className="
              w-3
              h-3
              rounded-full
              border
              border-cyan-300/40
              flex
              items-center
              justify-center
            "
          >
            <span
              className="
                w-1
                h-1
                rounded-full
                bg-cyan-300
                shadow-[0_0_8px_rgba(34,211,238,0.8)]
              "
            />
          </div>
        </div>
      </div>

      {/* Bottom Accent */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-0
          group-hover:w-[65%]
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-300
          to-transparent
          transition-all
          duration-700
        "
      />
    </article>
  );
};

const Languages = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".languages-header > *",
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".languages-header",
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".language-card",
        {
          opacity: 0,
          y: 55,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".languages-grid",
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        px-6
        md:px-12
        lg:px-16
        py-24
        md:py-28
      "
    >
      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[750px]
          h-[450px]
          rounded-full
          bg-cyan-400/[0.018]
          blur-[140px]
        "
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}

        <div className="languages-header mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-cyan-300" />

            <p
              className="
                text-cyan-300
                uppercase
                tracking-[0.3em]
                text-sm
              "
            >
              Languages
            </p>
          </div>

          <div
            className="
              mt-5
              flex
              flex-col
              lg:flex-row
              lg:items-end
              justify-between
              gap-8
            "
          >
            <h2
              className="
    text-white
    text-4xl
    md:text-6xl
    font-semibold
    leading-[1.05]
  "
            >
              Communication
              <br />
              <span className="text-white/40">across languages.</span>
            </h2>

            <p
              className="
    text-white-50
    text-lg
    max-w-xl
    leading-relaxed
  "
            >
              Arabic is my native language, with conversational proficiency in
              English.
            </p>
          </div>
        </div>

        {/* Cards */}

        <div
          className="
            languages-grid
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          {languages.map((language) => (
            <LanguageCard key={language.code} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
