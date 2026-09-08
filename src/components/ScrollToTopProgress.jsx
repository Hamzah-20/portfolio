import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollToTopProgress = () => {
  const circleRef = useRef(null);
  const triggerRef = useRef(null);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const circle = circleRef.current;

    if (!circle) return;

    gsap.set(circle, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });

    const setProgress = gsap.quickTo(circle, "strokeDashoffset", {
      duration: 0.35,
      ease: "power2.out",
    });

    triggerRef.current = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const offset = circumference * (1 - self.progress);

        setProgress(offset);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggerRef.current?.kill();
    };
  }, [circumference]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className="
        fixed
        right-5
        md:right-8
        bottom-5
        md:bottom-8
        z-[200]
        w-14
        h-14
        rounded-full
        bg-black/65
        backdrop-blur-xl
        border
        border-white/10
        flex
        items-center
        justify-center
        transition-all
        duration-300
        hover:scale-110
        hover:border-cyan-300/30
        hover:bg-black/85
        group
      "
    >
      <svg
        className="
          absolute
          inset-0
          w-full
          h-full
          -rotate-90
        "
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />

        <circle
          ref={circleRef}
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#67e8f9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <span
        className="
          relative
          z-10
          text-white
          text-xl
          transition-all
          duration-300
          group-hover:text-cyan-300
          group-hover:-translate-y-0.5
        "
      >
        ↑
      </span>

      <div
        className="
          absolute
          inset-[8px]
          rounded-full
          bg-cyan-300/[0.025]
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      />
    </button>
  );
};

export default ScrollToTopProgress;
