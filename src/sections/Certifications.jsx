import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    issuer: "Microsoft",
    title: "DP-900: Azure Data Fundamentals",
    image: "/images/certificates/DP-900.png",
    url: "https://drive.google.com/file/d/1ilyaHkul2tGQXW_NxXLYN8EPGZqrV8x-/view?usp=sharing",
    featured: true,
  },
  {
    issuer: "IBM",
    title: "Machine Learning with Python",
    image: "/images/certificates/Machine Learning with Python.png",
    url: "https://drive.google.com/file/d/1gzw5EY-KadxGFQJN0x4eYsntsJrYL_ae/view?usp=sharing",
  },
  {
    issuer: "IBM",
    title: "Generative AI Essentials",
    image: "/images/certificates/Generative AI Essentials.png",
    url: "https://drive.google.com/file/d/1IL8ul68Gk4ZCynmY4xbqgHj01qE2N4sE/view?usp=sharing",
  },
  {
    issuer: "Google",
    title: "Generative AI",
    image: "/images/certificates/Generative AI.png",
    url: "https://drive.google.com/file/d/1Fe5q-JdXPNBXn0KaPOVSCy9fibyEd5lY/view?usp=sharing",
  },
  {
    issuer: "IBM",
    title: "Data Analysis with Python",
    image: "/images/certificates/Data Analysis with Python.png",
    url: "https://drive.google.com/file/d/1LjgRhFvzyOgL9F-v4DC8lSdtJAyHELPd/view?usp=sharing",
  },
  {
    issuer: "Cisco",
    title: "Data Analytics Essentials",
    image: "/images/certificates/Data Analytics Essentials.png",
    url: "https://drive.google.com/file/d/1pnzE_0Flvp5z8PJKUx95H8ydT4634tuQ/view?usp=sharing",
  },
  {
    issuer: "IBM",
    title: "Python 101 for Data Science",
    image: "/images/certificates/Python 101 for Data Science.png",
    url: "https://drive.google.com/file/d/1g0hhS70T2aKzoEhjlw3vTlt6C343gRtd/view?usp=sharing",
  },
  {
    issuer: "MinnaLearn",
    title: "Elements of AI",
    image: "/images/certificates/Elements of AI.png",
    url: "https://drive.google.com/file/d/1eL3eC6tIaiJtcTY9WaZvfENV_SdeiiIP/view?usp=sharing",
  },
  {
    issuer: "Udemy",
    title: "REST APIs with Django",
    image: "/images/certificates/REST APIs with Django.png",
    url: "https://drive.google.com/file/d/1XetVaYWJqiymhAYYBd_MEwxir_BRU-hF/view",
  },
  {
    issuer: "IBM",
    title: "Data Visualization with Python",
    image: "/images/certificates/Data Visualization with Python.png",
    url: "https://drive.google.com/file/d/1noaMhtjZinF7pMb-cT77QiUp-X6m--4D/view?usp=sharing",
  },
  {
    issuer: "IBM",
    title: "AI Practitioner: Ready to use AI",
    image: "/images/certificates/AI Practitioner Ready to use AI.png",
    url: "https://drive.google.com/file/d/13zRWN_R6CUP-3FdaGwISeXD6pDPjmi7v/view?usp=sharing",
  },
  {
    issuer: "VTC",
    title: "Prompt Engineering",
    image: "/images/certificates/Prompt Engineering.png",
    url: "https://drive.google.com/file/d/1Blipk_HT42CNsZgqC2jhNKDekzHqHpJA/view?usp=sharing",
  },
  {
    issuer: "Udemy",
    title: "React, Next.js & TypeScript",
    image: "/images/certificates/React, Next.js & TypeScript.png",
    url: "https://drive.google.com/file/d/1Jvfgl-UHZlZJLo5J-dLC8XPdAF-q5Dyr/view",
  },
];

const CertificationCard = ({ certificate, index }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <a
      href={certificate.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className={`
        certification-card
        group
        relative
        overflow-hidden
        rounded-[26px]
        border
        border-white/10
        bg-[#08090a]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-300/30
        ${certificate.featured ? "lg:col-span-2" : "lg:col-span-1"}
      `}
    >
      {/* Mouse glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
        style={{
          background:
            "radial-gradient(420px circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.09), transparent 45%)",
        }}
      />

      {/* IMAGE */}

      <div
        className={`
          relative
          overflow-hidden
          border-b
          border-white/[0.07]
          bg-white/[0.02]
          ${
            certificate.featured
              ? "h-[300px] md:h-[340px]"
              : "h-[240px] md:h-[280px]"
          }
        `}
      >
        <img
          src={certificate.image}
          alt={`${certificate.title} certificate`}
          loading="lazy"
          decoding="async"
          className="
            w-full
            h-full
            object-contain
            p-3
            md:p-4
            opacity-85
            transition-all
            duration-700
            group-hover:scale-[1.035]
            group-hover:opacity-100
          "
        />

        {/* Image overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/25
            via-transparent
            to-transparent
          "
        />

        {/* Number */}

        <span
          className="
            absolute
            top-5
            right-5
            z-10
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-full
            border
            border-white/10
            bg-black/50
            backdrop-blur-md
            text-white/50
            text-xs
          "
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          p-6
          md:p-7
          min-h-[185px]
          flex
          flex-col
        "
      >
        <p
          className="
            text-cyan-300
            uppercase
            tracking-[0.22em]
            text-xs
            font-medium
          "
        >
          {certificate.issuer}
        </p>

        <h3
          className="
            text-white
            text-xl
            md:text-2xl
            font-semibold
            mt-3
            leading-tight
            max-w-xl
          "
        >
          {certificate.title}
        </h3>

        <div
          className="
            mt-auto
            pt-7
            flex
            items-center
            justify-between
            gap-5
          "
        >
          <span
            className="
              text-white/70
              text-sm
              font-medium
              transition-colors
              duration-300
              group-hover:text-cyan-300
            "
          >
            View Credential
          </span>

          <span
            className="
              w-9
              h-9
              rounded-full
              border
              border-white/10
              flex
              items-center
              justify-center
              text-cyan-300
              transition-all
              duration-500
              group-hover:border-cyan-300/30
              group-hover:bg-cyan-300/[0.05]
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          >
            ↗
          </span>
        </div>
      </div>

      {/* Bottom glow line */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-0
          group-hover:w-[70%]
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-300
          to-transparent
          transition-all
          duration-700
        "
      />
    </a>
  );
};

const Certifications = () => {
  const sectionRef = useRef(null);

  const [showAll, setShowAll] = useState(false);

  const visibleCertifications = showAll
    ? certifications
    : certifications.slice(0, 6);

  useGSAP(
    () => {
      gsap.fromTo(
        ".certification-header > *",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".certification-header",
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".certification-card",
        {
          opacity: 0,
          y: 65,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".certification-grid",
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

  useEffect(() => {
    if (!showAll) return;

    requestAnimationFrame(() => {
      const cards = sectionRef.current?.querySelectorAll(".certification-card");

      if (!cards) return;

      const newCards = Array.from(cards).slice(6);

      gsap.fromTo(
        newCards,
        {
          opacity: 0,
          y: 45,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
        },
      );
    });
  }, [showAll]);

  const handleToggle = () => {
    setShowAll((previous) => !previous);

    if (showAll) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  };

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
        md:py-32
      "
    >
      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          top-[35%]
          left-1/2
          -translate-x-1/2
          w-[900px]
          h-[700px]
          rounded-full
          bg-cyan-400/[0.02]
          blur-[160px]
        "
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}

        <div
          className="
            certification-header
            mb-14
            md:mb-20
          "
        >
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
              Certifications
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
            <div>
              <h2
                className="
                  text-white
                  text-4xl
                  md:text-6xl
                  font-semibold
                  leading-[1.05]
                  max-w-4xl
                "
              >
                Credentials that
                <br />
                <span className="text-white/40">support the work.</span>
              </h2>
            </div>

            <div className="max-w-xl">
              <p
                className="
                  text-white-50
                  text-lg
                  leading-relaxed
                "
              >
                Continuous learning across artificial intelligence, machine
                learning, data analytics, generative AI, and software
                development.
              </p>

              <div className="flex items-center gap-3 mt-5">
                <span
                  className="
                    text-cyan-300
                    text-3xl
                    font-semibold
                  "
                >
                  13
                </span>

                <span
                  className="
                    text-white/35
                    text-sm
                    leading-tight
                  "
                >
                  professional
                  <br />
                  certifications
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CERTIFICATES ================= */}

        <div
          className="
            certification-grid
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >
          {visibleCertifications.map((certificate, index) => (
            <CertificationCard
              key={`${certificate.issuer}-${certificate.title}`}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>

        {/* ================= VIEW ALL ================= */}

        <div className="flex justify-center mt-12">
          <button
            type="button"
            onClick={handleToggle}
            className="
              group
              relative
              overflow-hidden
              rounded-xl
              border
              border-white/10
              bg-white/[0.025]
              px-7
              py-3.5
              text-white
              transition-all
              duration-300
              hover:border-cyan-300/30
              hover:bg-cyan-300/[0.035]
            "
          >
            <span className="relative z-10 flex items-center gap-3">
              {showAll ? (
                <>
                  Show Featured
                  <span className="text-cyan-300">↑</span>
                </>
              ) : (
                <>
                  View All 13 Certifications
                  <span
                    className="
                      text-cyan-300
                      transition-transform
                      duration-300
                      group-hover:translate-y-1
                    "
                  >
                    ↓
                  </span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
