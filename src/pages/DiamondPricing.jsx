import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import PageTransition from "../components/PageTransition";
import DiamondPricingBackground from "../components/DiamondPricingBackground";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  "Python",
  "Scikit-Learn",
  "CatBoost",
  "XGBoost",
  "Streamlit",
  "Plotly",
  "Pandas",
];

const workflow = [
  ["01", "Clean", "Clean data and remove duplicated observations."],
  ["02", "Handle", "Detect and manage pricing outliers."],
  ["03", "Engineer", "Create volume and price-related features."],
  ["04", "Transform", "Apply logarithmic transformations where useful."],
  ["05", "Split", "Create train and test datasets."],
  ["06", "Train", "Train multiple regression model families."],
  ["07", "Tune", "Optimize models using GridSearchCV."],
  ["08", "Validate", "Evaluate cross-validation stability."],
  ["09", "Compare", "Compare R², MAE and RMSE."],
  ["10", "Explain", "Analyze feature importance and pricing drivers."],
  ["11", "Predict", "Generate real-time diamond price estimates."],
  ["12", "Deploy", "Deliver the system through Streamlit."],
];

const models = [
  "Linear Regression",
  "Ridge Regression",
  "Random Forest",
  "XGBoost",
  "CatBoost",
];

const engineeredFeatures = [
  {
    title: "Diamond Volume",
    description:
      "Combines physical dimensions into a derived size-related feature.",
  },
  {
    title: "Price per Carat",
    description: "Provides a normalized view of diamond pricing behavior.",
  },
  {
    title: "Log Price",
    description: "Transforms the target distribution for analytical stability.",
  },
  {
    title: "Log Carat",
    description: "Captures nonlinear relationships between size and price.",
  },
];

const screenshots = [
  {
    title: "Pricing Dashboard",
    description: "Main Streamlit workspace for analytics and prediction.",
    image: "/images/projects/diamond-pricing/dashboard.webp",
  },
  {
    title: "Exploratory Data Analysis",
    description:
      "Distribution, correlation and outlier-oriented visual analysis.",
    image: "/images/projects/diamond-pricing/eda.webp",
  },
  {
    title: "Model Performance Comparison",
    description:
      "Regression models compared using multiple evaluation metrics.",
    image: "/images/projects/diamond-pricing/model-comparison.webp",
  },
  {
    title: "Feature Importance Analysis",
    description:
      "Model-derived analysis of the factors influencing predicted price.",
    image: "/images/projects/diamond-pricing/feature-importance.webp",
  },
  {
    title: "Business Impact & ROI",
    description:
      "Demonstration-oriented business analytics built around pricing scenarios.",
    image: "/images/projects/diamond-pricing/business-impact.webp",
  },
];

const DiamondPricing = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".dp-hero > *",
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        ".dp-hero-image",
        {
          opacity: 0,
          x: 70,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.15,
        },
      );

      gsap.utils.toArray(".dp-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    },
    {
      scope: pageRef,
    },
  );

  return (
    <PageTransition>
      <main
        ref={pageRef}
        className="relative min-h-screen bg-black text-white overflow-hidden"
      >
        <DiamondPricingBackground />
        <ScrollToTopProgress />

        <div className="relative z-10">
          <NavBar />

          <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24">
            <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-12 items-center">
              <div className="dp-hero xl:col-span-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  Regression · Pricing Intelligence
                </div>

                <h1 className="text-5xl md:text-7xl xl:text-[76px] font-semibold leading-[0.98] tracking-[-0.04em] mt-7">
                  Diamond Pricing
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white">
                    Intelligence.
                  </span>
                </h1>

                <p className="text-white-50 text-lg md:text-xl leading-relaxed max-w-xl mt-8">
                  An end-to-end regression platform I built to estimate diamond
                  prices, compare advanced machine learning models, analyze
                  feature importance and translate predictions into
                  business-oriented pricing insights.
                </p>

                <div className="flex flex-wrap gap-2 mt-8">
                  {technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-black/40 backdrop-blur-sm px-3 py-1.5 text-white/55 text-xs"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-10">
                  <a
                    href="https://diamond-price-prediction-dashboard-snwf2qbkmkzyr6ftghppxi.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl bg-cyan-300 text-black font-medium px-6 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-200"
                  >
                    Live Demo
                    <span>↗</span>
                  </a>

                  <a
                    href="https://github.com/Hamzah-20/diamond-price-prediction-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl bg-white text-black font-medium px-6 py-3.5 transition-all duration-300 hover:-translate-y-1"
                  >
                    View GitHub
                    <span>↗</span>
                  </a>
                </div>

                <p className="text-white/25 text-xs uppercase tracking-[0.18em] mt-8">
                  Designed & built end-to-end by Hamzah Al-Basyouni
                </p>
              </div>

              <div className="dp-hero-image xl:col-span-7 relative">
                <div className="relative rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-md p-2 md:p-3">
                  <div className="rounded-[23px] overflow-hidden border border-white/[0.07] bg-black">
                    <div className="h-11 border-b border-white/[0.07] flex items-center px-4 gap-2 bg-black/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />

                      <span className="ml-4 text-white/25 text-[10px]">
                        pricing-intelligence / diamond-valuation
                      </span>
                    </div>

                    <img
                      src="/images/projects/diamond-pricing/dashboard.webp"
                      alt="Diamond Pricing Intelligence Dashboard"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top"
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute -left-8 top-[17%] rounded-2xl border border-cyan-300/15 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Regression Models
                  </p>

                  <p className="text-cyan-300 text-3xl font-semibold mt-1">5</p>

                  <p className="text-white/35 text-xs mt-1">Compared</p>
                </div>

                <div className="hidden md:block absolute -right-5 bottom-[12%] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Optimization
                  </p>

                  <p className="text-white font-medium mt-2">GridSearchCV</p>

                  <p className="text-cyan-300 text-xs mt-1">
                    + Cross Validation
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 pb-24">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10">
              {[
                ["5", "Regression Models"],
                ["12", "ML Workflow Steps"],
                ["4", "Engineered Features"],
                ["2", "Core Error Metrics"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-black/50 backdrop-blur-sm p-6 md:p-8"
                >
                  <p className="text-cyan-300 text-2xl md:text-3xl font-semibold">
                    {value}
                  </p>

                  <p className="text-white/40 text-sm mt-2">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="dp-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/55 backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-amber-300 text-xs uppercase tracking-[0.25em]">
                  The Problem
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold mt-5">
                  Diamond pricing
                  <br />
                  depends on more
                  <br />
                  than carat.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  Price is influenced by interacting physical and categorical
                  characteristics such as size, cut, color, clarity and
                  proportions.
                </p>
              </div>

              <div className="dp-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  The Solution
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold mt-5">
                  Predict price.
                  <br />
                  Compare models.
                  <br />
                  Explain value.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  The system combines feature engineering, tuned regression
                  models, cross-validation and feature importance analysis
                  inside an interactive pricing dashboard.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="dp-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Machine Learning Workflow
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  From raw diamonds
                  <br />
                  <span className="text-white/40">
                    to pricing intelligence.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {workflow.map(([number, title, description]) => (
                  <div
                    key={number}
                    className="dp-reveal relative min-h-[220px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 overflow-hidden"
                  >
                    <span className="absolute right-4 bottom-[-15px] text-[90px] font-bold text-white/[0.025]">
                      {number}
                    </span>

                    <p className="text-cyan-300 text-xs tracking-[0.2em]">
                      STEP {number}
                    </p>

                    <h3 className="text-white text-2xl font-semibold mt-8">
                      {title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed mt-3">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="dp-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Model Comparison
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Multiple regressors.
                  <br />
                  <span className="text-white/40">
                    One evaluation framework.
                  </span>
                </h2>
              </div>

              <div className="dp-reveal rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {models.map((model, index) => (
                    <div
                      key={model}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-6"
                    >
                      <p className="text-cyan-300 text-xs">0{index + 1}</p>

                      <p className="text-white font-medium mt-4">{model}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  {[
                    ["R²", "Explained variance"],
                    ["MAE", "Absolute prediction error"],
                    ["RMSE", "Error magnitude sensitivity"],
                  ].map(([metric, description]) => (
                    <div
                      key={metric}
                      className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.025] p-6"
                    >
                      <p className="text-cyan-300 text-2xl font-semibold">
                        {metric}
                      </p>

                      <p className="text-white/35 text-sm mt-2">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="dp-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Feature Engineering
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Better representation
                  <br />
                  <span className="text-white/40">
                    before better prediction.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {engineeredFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="dp-reveal rounded-[24px] border border-white/10 bg-black/50 backdrop-blur-sm p-6 min-h-[220px]"
                  >
                    <div className="w-10 h-10 rotate-45 border border-cyan-300/25 bg-cyan-300/[0.04]" />

                    <h3 className="text-white text-xl font-semibold mt-8">
                      {feature.title}
                    </h3>

                    <p className="text-white/35 text-sm leading-relaxed mt-3">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="dp-reveal xl:col-span-5 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 flex flex-col">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Explainability
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold mt-5">
                  What drives
                  <br />
                  diamond value?
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  Feature importance analysis helps identify which
                  characteristics contribute most strongly to the model's
                  pricing behavior.
                </p>
              </div>

              <a
                href="/images/projects/diamond-pricing/feature-importance.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="dp-reveal xl:col-span-7 rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-sm p-2 overflow-hidden"
              >
                <div className="rounded-[24px] overflow-hidden">
                  <img
                    src="/images/projects/diamond-pricing/feature-importance.webp"
                    alt="Diamond feature importance analysis"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </a>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-[1450px] mx-auto">
              <div className="dp-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Application Experience
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Prediction meets
                  <br />
                  <span className="text-white/40">visual analytics.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.title}
                    className="dp-reveal group rounded-[28px] border border-white/10 bg-black/45 backdrop-blur-sm p-2 overflow-hidden transition-all duration-500 hover:border-cyan-300/25"
                  >
                    <a
                      href={screenshot.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[21px] overflow-hidden bg-black h-[420px] md:h-[500px]"
                    >
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </a>

                    <div className="px-5 pt-5 pb-4">
                      <p className="text-white text-xl font-semibold">
                        {screenshot.title}
                      </p>

                      <p className="text-white/35 text-sm mt-1">
                        {screenshot.description}
                      </p>

                      <p className="text-cyan-300/50 text-xs mt-3">
                        Click image to view full size ↗
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="dp-reveal lg:col-span-5 rounded-[30px] border border-purple-300/15 bg-purple-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-purple-300 text-xs uppercase tracking-[0.25em]">
                  Business Intelligence
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  From prediction
                  <br />
                  to pricing support.
                </h2>

                <p className="text-white/40 leading-relaxed mt-8">
                  The dashboard connects model output with pricing consistency,
                  valuation analysis and scenario-based business insights.
                </p>
              </div>

              <div className="dp-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Pricing Consistency",
                    "Revenue Impact",
                    "Feature Impact",
                    "Valuation Support",
                    "Model Comparison",
                    "Data-Driven Recommendations",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5 text-white/50"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-300/[0.025] p-5">
                  <p className="text-amber-200 text-sm">
                    Business impact and ROI metrics shown in the application are
                    hypothetical and intended for demonstration purposes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="dp-reveal lg:col-span-5 rounded-[30px] border border-amber-300/15 bg-amber-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-amber-300 text-xs uppercase tracking-[0.25em]">
                  Future Engineering
                </p>

                <h2 className="text-white text-3xl md:text-4xl font-semibold mt-5">
                  Toward production
                  <br />
                  pricing ML.
                </h2>
              </div>

              <div className="dp-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Cloud Deployment",
                    "Real-Time API",
                    "Advanced Hyperparameter Search",
                    "Docker Support",
                    "MLOps Integration",
                    "Deep Learning Experiments",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5 text-white/50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-24 md:py-32">
            <div className="dp-reveal max-w-7xl mx-auto rounded-[36px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-14">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Explore the Project
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold mt-4">
                    Predict value.
                    <br />
                    Understand the drivers.
                  </h2>

                  <p className="text-white-50 text-lg mt-5 max-w-2xl">
                    Try the deployed dashboard or inspect the machine learning
                    workflow, model comparison and analytical implementation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <a
                    href="https://diamond-price-prediction-dashboard-snwf2qbkmkzyr6ftghppxi.streamlit.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-cyan-300 text-black rounded-xl px-6 py-3.5 font-medium hover:-translate-y-1 transition-transform"
                  >
                    Live Demo ↗
                  </a>

                  <a
                    href="https://github.com/Hamzah-20/diamond-price-prediction-dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black rounded-xl px-6 py-3.5 font-medium hover:-translate-y-1 transition-transform"
                  >
                    GitHub ↗
                  </a>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/10 px-6 py-3.5 text-white hover:border-cyan-300/30 transition-all"
                  >
                    ← All Projects
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </PageTransition>
  );
};

export default DiamondPricing;
