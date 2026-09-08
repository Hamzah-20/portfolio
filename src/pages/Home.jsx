import Navbar from "../components/NavBar";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Hero from "../sections/Hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import FeatureCards from "../sections/FeatureCards";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const element = document.querySelector(location.hash);

    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location]);
  return (
    <PageTransition>
      <>
        <Navbar />

        <main>
          <Hero />

          <ShowcaseSection />

          <FeatureCards />

          <section
            className="
          w-full
          padding-x-lg
          py-20 md:py-28
        "
          >
            <div
              className="
            mx-auto
            max-w-7xl
            rounded-3xl
            border
            border-white/10
            bg-white/[0.025]
            p-8 md:p-12
          "
            >
              <p
                className="
              text-cyan-300
              uppercase
              tracking-[0.3em]
              text-sm
            "
              >
                My Journey
              </p>

              <h2
                className="
                text-white
                text-[28px]
                leading-[0.98]
                sm:text-3xl
                md:text-5xl
                md:leading-normal
                font-semibold
                mt-4
                max-w-4xl
              "
              >
                From professional software development to AI and intelligent
                systems.
              </h2>

              <p
                className="
                text-white-50
                text-lg md:text-xl
                mt-5
                max-w-3xl
                leading-relaxed
              "
              >
                My background combines professional web development with a
                growing focus on machine learning, generative AI, RAG, and
                full-stack intelligent applications.
              </p>

              <Link
                to="/about"
                className="
                inline-flex
                mt-8
                px-6 py-3
                rounded-xl
                border
                border-cyan-400/30
                bg-cyan-400/[0.05]
                text-cyan-300
                font-medium
                transition-all
                duration-300
                hover:bg-cyan-400/[0.1]
                hover:-translate-y-1
              "
              >
                Explore My Journey →
              </Link>
            </div>
          </section>

          <Contact />
        </main>

        <Footer />
      </>
    </PageTransition>
  );
};

export default Home;
