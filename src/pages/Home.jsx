import Navbar from "../components/NavBar";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import JourneySection from "../sections/JourneySection";
import PageTransition from "../components/PageTransition";
import Hero from "../sections/Hero";
import ShowcaseSection from "../sections/ShowcaseSection";
import FeatureCards from "../sections/FeatureCards";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";

const Home = ({ onOpenAI }) => {
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
          <Hero onOpenAI={onOpenAI} />

          <ShowcaseSection />

          <FeatureCards />

          <JourneySection />

          <Contact />
        </main>

        <Footer />
      </>
    </PageTransition>
  );
};

export default Home;
