import { lazy, Suspense, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AskAIButton from "../components/AskAIButton";
import Button from "../components/Button";
import { words } from "../constants";

const HeroExperience = lazy(
  () => import("../components/models/hero_models/HeroExperience"),
);

const Hero = ({ onOpenAI }) => {
  const [show3D, setShow3D] = useState(() => {
    if (typeof window === "undefined") return false;

    return !window.matchMedia("(max-width: 767px)").matches;
  });

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!isMobile) {
      setShow3D(true);
      return undefined;
    }

    let delayId;
    let idleId;
    let cancelled = false;

    const reveal3D = () => {
      if (!cancelled) {
        setShow3D(true);
      }
    };

    const schedule3D = () => {
      delayId = window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          idleId = window.requestIdleCallback(reveal3D, {
            timeout: 1500,
          });
        } else {
          reveal3D();
        }
      }, 1500);
    };

    if (document.readyState === "complete") {
      schedule3D();
    } else {
      window.addEventListener("load", schedule3D, { once: true });
    }

    return () => {
      cancelled = true;

      window.removeEventListener("load", schedule3D);

      if (delayId) {
        window.clearTimeout(delayId);
      }

      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" },
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img
          src="/images/bg-large.webp"
          alt=""
          decoding="async"
          width="418"
          height="327"
        />
      </div>

      <div className="hero-layout">
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Building
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          decoding="async"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              <h1>Systems that Solve</h1>

              <h1>Real-World Problems</h1>
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none xl:max-w-2xl max-w-xl">
              AI & Machine Learning Engineer building end-to-end systems across
              Generative AI, Computer Vision, and Predictive Analytics.
            </p>

            <div className="flex flex-wrap items-center gap-4 relative z-20">
              <Button
                text="Explore My AI Work"
                className="md:w-80 md:h-16 w-60 h-12"
                targetId="work"
              />

              <AskAIButton onClick={onOpenAI} />
            </div>
          </div>
        </header>

        <figure>
          <div className="hero-3d-layout">
            {show3D && (
              <Suspense fallback={null}>
                <HeroExperience />
              </Suspense>
            )}
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
