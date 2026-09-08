import { useEffect } from "react";
import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";
import PageTransition from "../components/PageTransition";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

const projects = [
  {
    id: "research-rag",
    number: "01",
    category: "Generative AI & RAG",
    title: "Neural Research — AI Research Assistant",
    description:
      "A full-stack Retrieval-Augmented Generation platform for grounded research across multiple documents, combining hybrid retrieval, reranking, source-backed answers, persistent conversations, and local LLM inference.",
    stack: [
      "RAG",
      "FastAPI",
      "React",
      "Qdrant",
      "Ollama",
      "PostgreSQL",
      "Docker",
    ],
    image: "/images/ai-projects/research-rag.webp",
    github: "https://github.com/Hamzah-20/research-rag",
    caseStudy: "/projects/research-rag",
    featured: true,
  },
  {
    id: "chest-xray",
    number: "02",
    category: "Computer Vision",
    title: "Chest X-Ray Pneumonia Detection",

    description:
      "An end-to-end deep learning system using EfficientNetV2B0 for pneumonia detection, with Grad-CAM explainability, threshold optimization, model evaluation, batch analysis, and an interactive Streamlit application.",

    stack: [
      "TensorFlow",
      "EfficientNetV2B0",
      "Grad-CAM",
      "OpenCV",
      "Streamlit",
    ],

    highlights: ["91.51% Accuracy", "93.30% F1", "96.59% ROC-AUC"],

    image: "/images/ai-projects/dashboard.webp",

    github: "https://github.com/Hamzah-20/chest-xray-pneumonia-detection",

    caseStudy: "/projects/chest-xray",
  },
  {
    id: "customer-churn",
    number: "03",
    category: "Explainable Machine Learning",
    title: "Customer Churn Intelligence Platform",
    description:
      "An explainable customer churn prediction system using machine learning and SHAP to identify high-risk customers and provide insight into the factors driving individual predictions.",
    stack: ["Python", "Scikit-Learn", "XGBoost", "SHAP", "Flask"],
    image: "/images/ai-projects/customer-churn.webp",
    github: "https://github.com/Hamzah-20/customer-churn-prediction",

    caseStudy: "/projects/customer-churn",
  },
  {
    id: "universal-prediction",
    number: "04",
    category: "Machine Learning",
    title: "Universal Prediction System",

    description:
      "An AI-powered prediction platform supporting classification, regression, and time-series forecasting through a unified machine learning workflow and interactive web application.",

    stack: [
      "Python",
      "Scikit-Learn",
      "Flask",
      "Classification",
      "Regression",
      "Forecasting",
    ],

    image: "/images/ai-projects/universal-prediction.webp",

    live: "https://universal-prediction-system.onrender.com/",

    github: "https://github.com/Hamzah-20/universal-prediction-system",

    caseStudy: "/projects/universal-prediction",
  },
  {
    id: "financial-analytics",
    number: "05",
    category: "Financial Machine Learning",
    title: "AI Financial Analytics System",

    description:
      "A financial machine learning platform combining forecasting, regression, classification, clustering, banking-specific preprocessing, visual analytics, and analytical reporting.",

    stack: ["Python", "Flask", "Scikit-Learn", "StatsModels", "K-Means"],

    image: "/images/ai-projects/financial-analytics.webp",

    github: "https://github.com/Hamzah-20/ai-financial-analytics-system",

    caseStudy: "/projects/financial-analytics",
  },
  {
    id: "diamond-price",
    number: "06",
    category: "Predictive Analytics",
    title: "Diamond Pricing Intelligence Dashboard",

    description:
      "An end-to-end regression platform for diamond price prediction, model comparison, feature importance analysis, interactive analytics, and business-oriented pricing insights.",
    stack: [
      "Python",
      "XGBoost",
      "CatBoost",
      "Scikit-Learn",
      "Streamlit",
      "Regression",
    ],
    image: "/images/ai-projects/diamond-price.webp",
    live: "https://diamond-price-prediction-dashboard-snwf2qbkmkzyr6ftghppxi.streamlit.app/",
    github: "https://github.com/Hamzah-20/diamond-price-prediction-dashboard",
    caseStudy: "/projects/diamond-pricing",
  },
];

const ProjectImage = ({ project }) => {
  if (project.caseStudy) {
    return (
      <Link
        to={project.caseStudy}
        className="block w-full h-full"
        aria-label={`Open ${project.title} case study`}
      >
        <img
          src={project.image}
          alt={`${project.title} interface`}
          loading={project.featured ? "eager" : "lazy"}
          decoding="async"
          className="
            w-full
            h-full
            object-cover
            object-top
            transition-transform
            duration-700
            group-hover:scale-[1.025]
          "
        />
      </Link>
    );
  }

  const link = project.live || project.github;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-full"
      aria-label={`Open ${project.title}`}
    >
      <img
        src={project.image}
        alt={`${project.title} interface`}
        loading={project.featured ? "eager" : "lazy"}
        decoding="async"
        className="
          w-full
          h-full
          object-cover
          object-top
          transition-transform
          duration-700
          group-hover:scale-[1.025]
        "
      />
    </a>
  );
};

const Projects = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-black text-white">
        <ScrollToTopProgress />
        <NavBar />

        <section
          className="
            px-6
            md:px-12
            lg:px-16
            pt-16
            md:pt-20
            pb-14
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
              AI Projects
            </p>

            <h1
              className="
                text-[40px] sm:text-5xl
                md:text-7xl
                font-semibold
                max-w-5xl
                leading-[1.05]
              "
            >
              From models to
              <br />
              intelligent systems.
            </h1>

            <p
              className="
    text-white-50
    text-lg
    md:text-xl
    mt-6
    max-w-3xl
    leading-relaxed
  "
            >
              Selected projects across Generative AI, RAG, Computer Vision,
              Explainable Machine Learning, Predictive Analytics, and applied
              AI.
            </p>
          </div>
        </section>

        <section
          className="
            px-6
            md:px-12
            lg:px-16
            pb-28
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >
            {projects.map((project) => (
              <article
                key={project.id}
                className={`
                  group
                  flex
                  flex-col
                  h-full
                  border
                  border-white/10
                  bg-white/[0.025]
                  rounded-3xl
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:border-cyan-400/30
                  hover:bg-white/[0.035]
                  ${project.featured ? "md:col-span-2" : ""}
                  ${
                    project.id === "diamond-price"
                      ? "md:col-span-2 md:w-[calc(50%-0.75rem)] md:justify-self-center"
                      : ""
                  }
                `}
              >
                <div
                  className={`
                    relative
                    overflow-hidden
                    bg-[#050b10]
                    border-b
                    border-white/[0.06]
                    ${
                      project.featured
                        ? "h-[340px] md:h-[520px]"
                        : "h-[280px] md:h-[340px]"
                    }
                  `}
                >
                  <ProjectImage project={project} />

                  {project.live && (
                    <div
                      className="
                        absolute
                        top-4
                        right-4
                        flex
                        items-center
                        gap-2
                        px-3
                        py-1.5
                        rounded-full
                        bg-black/70
                        backdrop-blur-md
                        border
                        border-green-400/30
                        text-green-300
                        text-xs
                      "
                    >
                      <span
                        className="
                          w-2
                          h-2
                          rounded-full
                          bg-green-400
                          shadow-[0_0_8px_rgba(74,222,128,0.8)]
                        "
                      />
                      LIVE
                    </div>
                  )}
                </div>

                <div className="p-7 md:p-9 flex flex-col flex-1">
                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <p
                      className="
                        text-cyan-300
                        uppercase
                        tracking-[0.18em]
                        text-xs
                      "
                    >
                      {project.category}
                    </p>

                    {project.featured ? (
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          border
                          border-cyan-400/20
                          bg-cyan-400/[0.04]
                          text-cyan-300
                          text-xs
                        "
                      >
                        Flagship
                      </span>
                    ) : (
                      <span
                        className="
                          text-white/20
                          text-sm
                          font-medium
                        "
                      >
                        {project.number}
                      </span>
                    )}
                  </div>

                  <h2
                    className="
                      text-white
                      text-2xl
                      md:text-3xl
                      font-semibold
                      mt-4
                    "
                  >
                    {project.title}
                  </h2>

                  <p
                    className="
                      text-white-50
                      mt-4
                      leading-relaxed
                      max-w-4xl
                    "
                  >
                    {project.description}
                  </p>

                  {project.highlights && (
                    <div
                      className="
                        flex
                        flex-wrap
                        gap-2
                        mt-5
                      "
                    >
                      {project.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="
                            px-3
                            py-1.5
                            rounded-lg
                            bg-cyan-400/[0.05]
                            border
                            border-cyan-400/20
                            text-cyan-300
                            text-sm
                          "
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                      mt-6
                    "
                  >
                    {project.stack.map((technology) => (
                      <span
                        key={technology}
                        className="
                          px-3
                          py-1.5
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.025]
                          text-white-50
                          text-sm
                        "
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-auto pt-7">
                    {project.caseStudy && (
                      <Link
                        to={project.caseStudy}
                        className="
                          group/button
                          inline-flex
                          items-center
                          gap-2
                          px-5
                          py-2.5
                          rounded-xl
                          bg-cyan-300
                          text-black
                          font-medium
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:bg-cyan-200
                        "
                      >
                        View Case Study
                        <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                          →
                        </span>
                      </Link>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-5
                          py-2.5
                          rounded-xl
                          bg-cyan-300
                          text-black
                          font-medium
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:bg-cyan-200
                        "
                      >
                        Live Demo
                        <span>↗</span>
                      </a>
                    )}

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        px-5
                        py-2.5
                        rounded-xl
                        bg-white
                        text-black
                        font-medium
                        transition-transform
                        duration-300
                        hover:-translate-y-1
                      "
                    >
                      View on GitHub
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="
            px-6
            md:px-12
            lg:px-16
            pb-24
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              border
              border-white/10
              rounded-3xl
              p-8
              md:p-12
              flex
              flex-col
              md:flex-row
              items-start
              md:items-center
              justify-between
              gap-8
              bg-white/[0.025]
            "
          >
            <div>
              <p
                className="
                  text-cyan-300
                  text-sm
                  uppercase
                  tracking-[0.2em]
                "
              >
                Let's Connect
              </p>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  font-semibold
                  mt-3
                "
              >
                Interested in my work?
              </h2>

              <p className="text-white-50 mt-3">
                I'm open to AI opportunities, collaborations, and
                research-oriented work.
              </p>
            </div>

            <Link
              to="/#contact"
              className="
                px-6
                py-3
                bg-white
                text-black
                rounded-xl
                font-medium
                transition-transform
                duration-300
                hover:-translate-y-1
              "
            >
              Contact Me →
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Projects;
