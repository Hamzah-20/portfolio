import PageTransition from "../components/PageTransition";
import Experience from "../sections/Experience";
import TechStack from "../sections/TechStack";
import Footer from "../sections/Footer";
import NavBar from "../components/NavBar";
import Education from "../sections/Education";
import Certifications from "../sections/Certifications";
import Languages from "../sections/Languages";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

const About = () => {
  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        <ScrollToTopProgress />

        {/* ================= NAV ================= */}

        <NavBar />

        {/* ================= ABOUT HERO ================= */}

        <section
          className="
            px-6 md:px-12 lg:px-16
            pt-20 md:pt-28
            pb-10
          "
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="
                text-cyan-300
                uppercase
                tracking-[0.3em]
                text-sm
                mb-4
              "
            >
              About Me
            </p>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-semibold
                max-w-5xl
                leading-[1.05]
              "
            >
              From software development
              <br />
              to intelligent systems.
            </h1>

            <p
              className="
                text-white-50
                text-lg
                md:text-xl
                mt-6
                max-w-4xl
                leading-relaxed
              "
            >
              Computer Science graduate and AI & Machine Learning Engineer
              focused on building end-to-end intelligent systems across
              Generative AI, Retrieval-Augmented Generation, Computer Vision,
              predictive analytics, and Explainable AI.
            </p>
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}

        <Experience />

        {/* ================= EDUCATION ================= */}

        <Education />

        {/* ================= CERTIFICATIONS ================= */}
        <Certifications />

        {/* ================= LANGUAGES ================= */}

        <Languages />

        {/* ================= TECH STACK ================= */}

        <TechStack />

        {/* ================= CV CTA ================= */}

        <section
          className="
            px-6 md:px-12 lg:px-16
            py-20
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              rounded-3xl
              border
              border-white/10
              bg-white/[0.025]
              p-8 md:p-12
              flex
              flex-col
              md:flex-row
              items-start
              md:items-center
              justify-between
              gap-8
            "
          >
            <div>
              <p
                className="
                  text-cyan-300
                  uppercase
                  tracking-[0.2em]
                  text-sm
                "
              >
                Resume
              </p>

              <h2
                className="
                  text-white
                  text-3xl md:text-4xl
                  font-semibold
                  mt-3
                "
              >
                Want the full picture?
              </h2>

              <p className="text-white-50 mt-3 max-w-2xl">
                View my complete experience, education, projects,
                certifications, and technical skills.
              </p>
            </div>

            <a
              href="https://drive.google.com/file/d/1fW2q8xtladuBQlsbGff_YY-pUivLJEVU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-6
                py-3
                rounded-xl
                bg-white
                text-black
                font-medium
                transition-transform
                duration-300
                hover:-translate-y-1
              "
            >
              View CV ↗
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default About;
