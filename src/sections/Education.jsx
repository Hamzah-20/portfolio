import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const primaryEducation = {
  type: "Bachelor's Degree",
  title: "Computer Science",
  institution: "Al-Hussein Bin Talal University",
  date: "Feb 2022 — Jul 2025",
  status: "Completed",
};

const continuousLearning = [
  {
    number: "02",
    type: "Diploma",
    title: "Data Analysis using Artificial Intelligence",
    institution: "FinTech Academy",
    date: "Nov 2025 — Jan 2026",
    status: "Completed",
  },
  {
    number: "03",
    type: "Diploma",
    title: "Data Analytics and Business Intelligence",
    institution: "Elite Excellence Academy",
    date: "Feb 2026 — Present",
    status: "In Progress",
  },
  {
    number: "04",
    type: "Diploma",
    title: "Artificial Intelligence",
    institution: "Muheet Academy",
    date: "Feb 2026 — Present",
    status: "In Progress",
  },
];

const StatusBadge = ({ status }) => {
  const inProgress = status === "In Progress";

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        border
        text-xs
        ${
          inProgress
            ? "border-cyan-300/25 bg-cyan-300/[0.05] text-cyan-300"
            : "border-white/10 bg-white/[0.025] text-white-50"
        }
      `}
    >
      {inProgress ? (
        <span className="relative flex h-2 w-2">
          <span
            className="
              absolute
              inline-flex
              h-full
              w-full
              rounded-full
              bg-cyan-300
              opacity-70
              animate-ping
            "
          />

          <span
            className="
              relative
              inline-flex
              h-2
              w-2
              rounded-full
              bg-cyan-300
            "
          />
        </span>
      ) : (
        <span className="text-cyan-300">✓</span>
      )}

      {status}
    </div>
  );
};

const Education = () => {
  const sectionRef = useRef(null);
  const mainCardRef = useRef(null);

  useGSAP(
    () => {
      /*
       * Header animation
       */
      gsap.fromTo(
        ".education-header > *",
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
            trigger: ".education-header",
            start: "top 82%",
            once: true,
          },
        },
      );

      /*
       * Main education cards animation
       */
      const educationTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".education-layout",
          start: "top 82%",
          once: true,
        },
      });

      educationTimeline.fromTo(
        ".education-main-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          rotateY: -4,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
        },
      );

      /*
       * Diplomas appear one after another
       */
      educationTimeline.fromTo(
        ".education-learning-card",
        {
          opacity: 0,
          x: 70,
          scale: 0.96,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
        },
        "-=0.55",
      );

      /*
       * Decorative orbit animation
       */
      gsap.to(".education-orbit-dot", {
        rotate: 360,
        duration: 16,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      /*
       * Floating visual
       */
      gsap.to(".education-float", {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: sectionRef,
    },
  );

  /*
   * Main card mouse interaction
   */
  const handleMainMouseMove = (e) => {
    const card = mainCardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const rotateY = ((x - rect.width / 2) / rect.width) * 4;
    const rotateX = ((y - rect.height / 2) / rect.height) * -4;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -6,
      duration: 0.35,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleMainMouseLeave = () => {
    const card = mainCardRef.current;

    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
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
      {/* ================= BACKGROUND ================= */}

      <div
        className="
          pointer-events-none
          absolute
          top-[20%]
          left-[20%]
          w-[500px]
          h-[500px]
          rounded-full
          bg-cyan-400/[0.025]
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-[10%]
          w-[600px]
          h-[500px]
          rounded-full
          bg-blue-500/[0.02]
          blur-[150px]
        "
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ================= HEADER ================= */}

        <div className="education-header mb-14 md:mb-20">
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
              Education
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
                max-w-3xl
              "
            >
              Built on Computer Science.
              <br />
              <span className="text-white/40">Growing through AI.</span>
            </h2>

            <p
              className="
                text-white-50
                text-lg
                max-w-xl
                leading-relaxed
              "
            >
              A Computer Science foundation strengthened through continuous
              learning in artificial intelligence, data analytics, and business
              intelligence.
            </p>
          </div>
        </div>

        {/* ================= EDUCATION LAYOUT ================= */}

        <div
          className="
            education-layout
            grid
            grid-cols-1
            lg:grid-cols-12
            gap-5
            items-stretch
          "
        >
          {/* ================= PRIMARY DEGREE ================= */}

          <article
            ref={mainCardRef}
            onMouseMove={handleMainMouseMove}
            onMouseLeave={handleMainMouseLeave}
            className="
              education-main-card
              group
              relative
              lg:col-span-7
              min-h-[10px]
              rounded-[30px]
              border
              border-white/10
              bg-[#08090a]
              overflow-hidden
              p-8
              md:p-10
              flex
              flex-col
              hover:border-cyan-300/30
              transition-colors
              duration-500
            "
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Mouse glow */}

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
                  "radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(34,211,238,0.11), transparent 45%)",
              }}
            />

            {/* Background grid */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.035]
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
                backgroundSize: "46px 46px",
                maskImage:
                  "linear-gradient(to bottom right, transparent 15%, black, transparent 90%)",
              }}
            />

            {/* Cyan top accent */}

            <div
              className="
                absolute
                top-0
                left-[10%]
                w-[45%]
                h-px
                bg-gradient-to-r
                from-transparent
                via-cyan-300
                to-transparent
                opacity-60
              "
            />

            {/* Decorative AI orbit */}

            <div
              className="
                education-float
                pointer-events-none
                absolute
                -right-24
                -bottom-20
                w-[360px]
                h-[360px]
                opacity-30
              "
            >
              <div
                className="
                  absolute
                  inset-10
                  rounded-full
                  border
                  border-cyan-300/15
                "
              />

              <div
                className="
                  absolute
                  inset-20
                  rounded-full
                  border
                  border-white/10
                "
              />

              <div
                className="
                  absolute
                  inset-[120px]
                  rounded-full
                  bg-cyan-300/[0.06]
                  border
                  border-cyan-300/20
                  shadow-[0_0_80px_rgba(34,211,238,0.08)]
                "
              />

              <div className="education-orbit-dot absolute inset-0">
                <span
                  className="
                    absolute
                    left-1/2
                    top-9
                    w-2
                    h-2
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_14px_rgba(34,211,238,0.9)]
                  "
                />
              </div>
            </div>

            {/* Background number */}

            <div
              className="
                absolute
                right-7
                top-7
                text-[90px]
                md:text-[120px]
                leading-none
                font-bold
                text-white/[0.025]
                select-none
              "
            >
              01
            </div>

            {/* Card header */}

            <div
              className="
                relative
                z-10
                flex
                items-start
                justify-between
                gap-5
              "
            >
              <p
                className="
                  text-cyan-300
                  uppercase
                  tracking-[0.25em]
                  text-xs
                  md:text-sm
                  font-medium
                "
              >
                {primaryEducation.type}
              </p>

              <StatusBadge status={primaryEducation.status} />
            </div>

            {/* Degree information */}

            <div className="relative z-10 mt-24 md:mt-28">
              <p
                className="
                  text-white/30
                  uppercase
                  tracking-[0.22em]
                  text-xs
                "
              >
                Academic Foundation
              </p>

              <h3
                className="
                  text-white
                  text-4xl
                  md:text-5xl
                  lg:text-[58px]
                  font-semibold
                  leading-[1]
                  mt-4
                "
              >
                {primaryEducation.title}
              </h3>

              <p
                className="
                  text-white-50
                  text-lg
                  md:text-xl
                  mt-6
                "
              >
                {primaryEducation.institution}
              </p>
            </div>

            {/* Bottom */}

            <div
              className="
                relative
                z-10
                mt-auto
                pt-16
                flex
                flex-col
                sm:flex-row
                sm:items-end
                justify-between
                gap-5
              "
            >
              <div>
                <p
                  className="
                    text-white/30
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                  "
                >
                  Study Period
                </p>

                <p className="text-white mt-2">{primaryEducation.date}</p>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-cyan-300 text-sm">Computer Science</p>

                <p className="text-white/30 text-xs mt-1">
                  Foundation → AI & ML
                </p>
              </div>
            </div>
          </article>

          {/* ================= CONTINUOUS LEARNING ================= */}

          <div
            className="
              lg:col-span-5
              flex
              flex-col
              gap-5
            "
          >
            {continuousLearning.map((item) => (
              <article
                key={item.title}
                className="
                  education-learning-card
                  group
                  relative
                  flex-1
                  min-h-[165px]
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/10
                  bg-[#08090a]
                  p-6
                  md:p-7
                  transition-all
                  duration-500
                  hover:border-cyan-300/30
                  hover:bg-cyan-300/[0.018]
                  hover:-translate-y-1
                "
              >
                {/* Background glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-28
                    -top-28
                    w-60
                    h-60
                    rounded-full
                    bg-cyan-300/[0.035]
                    blur-[70px]
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  "
                />

                {/* Number */}

                <span
                  className="
    absolute
    right-5
    bottom-[-10px]
    text-[90px]
    font-bold
    leading-none
    text-white/[0.025]
    transition-all
    duration-500
    group-hover:text-cyan-300/[0.055]
    group-hover:-translate-y-2
    group-hover:-translate-x-1
  "
                >
                  {item.number}
                </span>

                {/* Left hover accent */}

                <div
                  className="
                    absolute
                    left-0
                    top-1/2
                    -translate-y-1/2
                    w-px
                    h-0
                    bg-cyan-300
                    group-hover:h-1/2
                    transition-all
                    duration-500
                  "
                />

                <div
                  className="
                    relative
                    z-10
                    h-full
                    flex
                    flex-col
                  "
                >
                  {/* Card header */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <p
                      className="
                        text-cyan-300
                        uppercase
                        tracking-[0.22em]
                        text-xs
                      "
                    >
                      {item.type}
                    </p>

                    <StatusBadge status={item.status} />
                  </div>

                  {/* Content */}

                  <div className="mt-6">
                    <h3
                      className="
                        text-white
                        text-xl
                        md:text-[25px]
                        font-semibold
                        leading-tight
                        max-w-[85%]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        text-white-50
                        text-sm
                        md:text-base
                        mt-2
                      "
                    >
                      {item.institution}
                    </p>
                  </div>

                  {/* Period */}

                  <div className="mt-auto pt-5">
                    <p className="text-white/35 text-xs">{item.date}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
