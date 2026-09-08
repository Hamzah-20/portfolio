import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import PageTransition from "../components/PageTransition";
import FinancialDataBackground from "../components/FinancialDataBackground";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  "Python",
  "Flask",
  "Scikit-Learn",
  "StatsModels",
  "Pandas",
  "NumPy",
  "K-Means",
];

const workflow = [
  {
    number: "01",
    title: "Upload",
    description: "Load CSV, Excel, JSON or sample banking data.",
  },
  {
    number: "02",
    title: "Select",
    description:
      "Choose Time Series, Regression, Classification or Clustering.",
  },
  {
    number: "03",
    title: "Configure",
    description: "Select target, features and model-specific parameters.",
  },
  {
    number: "04",
    title: "Analyze",
    description: "Train models, evaluate metrics and generate visualizations.",
  },
  {
    number: "05",
    title: "Export",
    description: "Generate reports, compare models and export analytical code.",
  },
];

const modelFamilies = [
  {
    label: "01",
    title: "Time Series",
    color: "cyan",
    models: ["AR", "MA", "ARMA", "ARIMA"],
    description:
      "Financial forecasting for revenue, stock prices and economic indicators.",
    metric: "AIC-based comparison and future forecasting.",
  },
  {
    label: "02",
    title: "Regression",
    color: "purple",
    models: ["Linear Regression", "Multiple Regression", "Ridge Regression"],
    description:
      "Continuous-value modeling for profit, growth and banking relationships.",
    metric: "MSE, R² and regression visualizations.",
  },
  {
    label: "03",
    title: "Classification",
    color: "amber",
    models: ["Logistic Regression", "Random Forest"],
    description:
      "Risk categorization and predictive classification for financial decisions.",
    metric: "Class prediction, probability and accuracy.",
  },
  {
    label: "04",
    title: "Clustering",
    color: "rose",
    models: ["K-Means"],
    description:
      "Unsupervised customer segmentation based on financial behavior.",
    metric: "Cluster assignments, centers and silhouette score.",
  },
];

const bankingUseCases = [
  {
    number: "01",
    title: "Revenue Forecasting",
    type: "Time Series",
    description:
      "Forecast future monthly revenue for financial planning and budgeting.",
  },
  {
    number: "02",
    title: "Credit Risk",
    type: "Classification",
    description: "Classify loan applicants into financial risk categories.",
  },
  {
    number: "03",
    title: "Profit Analysis",
    type: "Regression",
    description:
      "Model profit-margin relationships using financial predictors.",
  },
  {
    number: "04",
    title: "Customer Segmentation",
    type: "Clustering",
    description:
      "Group customers according to financial and transactional similarities.",
  },
];

const screenshots = [
  {
    title: "Financial Analytics Dashboard",
    description:
      "Main banking analytics workspace and guided five-step workflow.",
    image: "/images/projects/financial-analytics/dashboard.webp",
  },
  {
    title: "Data Upload & Preview",
    description:
      "Flexible ingestion for banking datasets with automatic data preview.",
    image: "/images/projects/financial-analytics/data-upload.webp",
  },
  {
    title: "Model Selection",
    description:
      "Choose between four predictive and analytical model families.",
    image: "/images/projects/financial-analytics/model-selection.webp",
  },
  {
    title: "Time Series Forecasting",
    description:
      "Financial forecasting with historical trends and future predictions.",
    image: "/images/projects/financial-analytics/time-series.webp",
  },
  {
    title: "Classification Results",
    description:
      "Risk-oriented classification results and predictive analysis.",
    image: "/images/projects/financial-analytics/classification.webp",
  },
  {
    title: "Clustering Visualization",
    description: "K-Means customer segmentation with visual cluster analysis.",
    image: "/images/projects/financial-analytics/clustering.webp",
  },
  {
    title: "Report Generation",
    description:
      "Analytical reporting and export workflow for reproducible analysis.",
    image: "/images/projects/financial-analytics/report-generation.webp",
  },
];

const FinancialAnalytics = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".fa-hero > *",
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
        ".fa-hero-image",
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

      gsap.utils.toArray(".fa-reveal").forEach((element) => {
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
        <FinancialDataBackground />
        <ScrollToTopProgress />

        <div className="relative z-10">
          <NavBar />

          <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24">
            <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-12 items-center">
              <div className="fa-hero xl:col-span-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  Financial Machine Learning
                </div>

                <h1 className="text-5xl md:text-7xl xl:text-[76px] font-semibold leading-[0.98] tracking-[-0.04em] mt-7">
                  AI Financial
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white">
                    Analytics System.
                  </span>
                </h1>

                <p className="text-white-50 text-lg md:text-xl leading-relaxed max-w-xl mt-8">
                  A full-stack financial machine learning platform I built for
                  forecasting, predictive modeling, risk analysis, customer
                  segmentation and banking-oriented analytics.
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
                    href="https://github.com/Hamzah-20/ai-financial-analytics-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl bg-white text-black font-medium px-6 py-3.5 transition-all duration-300 hover:-translate-y-1"
                  >
                    View GitHub
                    <span>↗</span>
                  </a>

                  <a
                    href="#financial-models"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 backdrop-blur-sm text-white px-6 py-3.5 transition-all duration-300 hover:border-cyan-300/30"
                  >
                    Explore Models
                    <span className="text-cyan-300">↓</span>
                  </a>
                </div>

                <p className="text-white/25 text-xs uppercase tracking-[0.18em] mt-8">
                  Designed & built end-to-end by Hamzah Al-Basyouni
                </p>
              </div>

              <div className="fa-hero-image xl:col-span-7 relative">
                <div className="relative rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-md p-2 md:p-3 shadow-[0_30px_120px_rgba(34,211,238,0.08)]">
                  <div className="rounded-[23px] overflow-hidden border border-white/[0.07] bg-black">
                    <div className="h-11 border-b border-white/[0.07] flex items-center px-4 gap-2 bg-black/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />

                      <span className="ml-4 text-white/25 text-[10px] tracking-wide">
                        financial-intelligence / banking-analytics
                      </span>
                    </div>

                    <img
                      src="/images/projects/financial-analytics/dashboard.webp"
                      alt="AI Financial Analytics System dashboard"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top"
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute -left-8 top-[17%] rounded-2xl border border-cyan-300/15 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Model Families
                  </p>

                  <p className="text-cyan-300 text-3xl font-semibold mt-1">4</p>

                  <p className="text-white/35 text-xs mt-1">
                    Financial workflows
                  </p>
                </div>

                <div className="hidden md:block absolute -right-5 bottom-[12%] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Workflow
                  </p>

                  <p className="text-white font-medium mt-2">5 Guided Steps</p>

                  <p className="text-cyan-300 text-xs mt-1">Data → Report</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 pb-24">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm">
              {[
                ["4", "Model Families"],
                ["5", "Workflow Steps"],
                ["3", "File Formats"],
                ["1–100", "Forecast Periods"],
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
              <div className="fa-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/55 backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-amber-300 text-xs uppercase tracking-[0.25em]">
                  The Problem
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  Financial data
                  <br />
                  needs more than
                  <br />
                  one model.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  Banking datasets can involve temporal trends, continuous
                  values, risk categories or unlabeled customer groups. Each
                  analytical objective requires a different modeling strategy.
                </p>
              </div>

              <div className="fa-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  The Solution
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  Forecast.
                  <br />
                  Predict.
                  <br />
                  Segment.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12 max-w-3xl">
                  The system provides four analytical paths inside one financial
                  workflow, combining model configuration, training,
                  visualization, prediction and reporting.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="fa-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Financial Workflow
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Five steps from
                  <br />
                  <span className="text-white/40">raw data to insight.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {workflow.map((step) => (
                  <div
                    key={step.number}
                    className="fa-reveal group relative min-h-[250px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 hover:border-cyan-300/30 hover:-translate-y-1"
                  >
                    <span className="absolute right-3 bottom-[-12px] text-[90px] font-bold leading-none text-white/[0.025]">
                      {step.number}
                    </span>

                    <p className="text-cyan-300 text-xs tracking-[0.2em]">
                      STEP {step.number}
                    </p>

                    <h3 className="text-white text-2xl font-semibold mt-8">
                      {step.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed mt-3">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="financial-models"
            className="px-6 md:px-12 lg:px-16 py-20 md:py-24"
          >
            <div className="max-w-7xl mx-auto">
              <div className="fa-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Financial Model Families
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Four analytical
                  <br />
                  <span className="text-white/40">perspectives.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {modelFamilies.map((family) => {
                  const styles = {
                    cyan: {
                      border: "border-cyan-300/20",
                      background: "bg-cyan-300/[0.03]",
                      text: "text-cyan-300",
                    },
                    purple: {
                      border: "border-purple-300/20",
                      background: "bg-purple-300/[0.025]",
                      text: "text-purple-300",
                    },
                    amber: {
                      border: "border-amber-300/20",
                      background: "bg-amber-300/[0.025]",
                      text: "text-amber-300",
                    },
                    rose: {
                      border: "border-rose-300/20",
                      background: "bg-rose-300/[0.025]",
                      text: "text-rose-300",
                    },
                  };

                  const theme = styles[family.color];

                  return (
                    <div
                      key={family.title}
                      className={`
                        fa-reveal
                        rounded-[28px]
                        border
                        backdrop-blur-sm
                        p-7
                        min-h-[390px]
                        flex
                        flex-col
                        ${theme.border}
                        ${theme.background}
                      `}
                    >
                      <div className="flex justify-between">
                        <p
                          className={`${theme.text} text-xs uppercase tracking-[0.18em]`}
                        >
                          MODEL FAMILY {family.label}
                        </p>

                        <p className="text-white/[0.07] text-5xl font-bold">
                          {family.label}
                        </p>
                      </div>

                      <h3 className="text-white text-3xl font-semibold mt-8">
                        {family.title}
                      </h3>

                      <p className="text-white/40 leading-relaxed mt-4">
                        {family.description}
                      </p>

                      <div className="mt-7">
                        <p className="text-white/25 text-xs uppercase tracking-[0.15em]">
                          Algorithms
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {family.models.map((model) => (
                            <span
                              key={model}
                              className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-white/55 text-xs"
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p
                        className={`${theme.text} text-sm leading-relaxed mt-auto pt-8`}
                      >
                        {family.metric}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="fa-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Banking Applications
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Machine learning
                  <br />
                  <span className="text-white/40">applied to finance.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bankingUseCases.map((item) => (
                  <div
                    key={item.number}
                    className="fa-reveal rounded-[26px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 min-h-[235px]"
                  >
                    <div className="flex justify-between">
                      <p className="text-cyan-300 text-xs uppercase tracking-[0.18em]">
                        {item.type}
                      </p>

                      <p className="text-white/[0.08] text-5xl font-bold">
                        {item.number}
                      </p>
                    </div>

                    <h3 className="text-white text-2xl font-semibold mt-7">
                      {item.title}
                    </h3>

                    <p className="text-white/40 leading-relaxed mt-4">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="fa-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Financial Data Handling
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  Financial values
                  <br />
                  need cleaning
                  <br />
                  before modeling.
                </h2>

                <p className="text-white/40 leading-relaxed mt-8">
                  The ingestion layer handles financial formatting such as
                  currency symbols, percentages and thousands separators while
                  detecting numeric and date columns.
                </p>
              </div>

              <div className="fa-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.03] backdrop-blur-sm p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    ["$1,250", "Currency"],
                    ["14.7%", "Percentages"],
                    ["2026-08", "Dates"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/[0.08] bg-black/25 p-6"
                    >
                      <p className="text-cyan-300 text-2xl font-semibold">
                        {value}
                      </p>

                      <p className="text-white/35 text-sm mt-2">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[
                    "Automatic Column Detection",
                    "Numeric Conversion",
                    "Date Recognition",
                    "Input Validation",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/[0.08] bg-black/25 p-5 text-white/50"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-[1450px] mx-auto">
              <div className="fa-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                <div>
                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Application Experience
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                    Financial analytics
                    <br />
                    <span className="text-white/40">through one workflow.</span>
                  </h2>
                </div>

                <p className="text-white-50 text-lg leading-relaxed max-w-xl">
                  The application guides users from banking-data ingestion
                  through model training, visualization, prediction and
                  analytical reporting.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.title}
                    className="fa-reveal group rounded-[28px] border border-white/10 bg-black/45 backdrop-blur-sm p-2 overflow-hidden transition-all duration-500 hover:border-cyan-300/25 hover:-translate-y-1"
                  >
                    <div
                      className={`
                        rounded-[21px]
                        bg-black
                        h-[420px]
                        md:h-[500px]
                        ${
                          screenshot.title === "Time Series Forecasting" ||
                          screenshot.title === "Classification Results" ||
                          screenshot.title === "Clustering Visualization" ||
                          screenshot.title === "Report Generation"
                            ? "overflow-y-auto overflow-x-hidden"
                            : "overflow-hidden"
                        }
                      `}
                    >
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        loading="lazy"
                        decoding="async"
                        className={`
                          w-full
                          transition-transform
                          duration-700
                          ${
                            screenshot.title === "Time Series Forecasting" ||
                            screenshot.title === "Classification Results" ||
                            screenshot.title === "Clustering Visualization" ||
                            screenshot.title === "Report Generation"
                              ? "h-auto"
                              : "h-full object-cover object-top group-hover:scale-[1.02]"
                          }
                        `}
                      />
                    </div>

                    <div className="px-5 pt-5 pb-4">
                      <p className="text-white text-xl font-semibold">
                        {screenshot.title}
                      </p>

                      <p className="text-white/35 text-sm mt-1">
                        {screenshot.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="fa-reveal lg:col-span-5 rounded-[30px] border border-purple-300/15 bg-purple-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-purple-300 text-xs uppercase tracking-[0.25em]">
                  Reporting & Export
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  Analysis should
                  <br />
                  be reproducible.
                </h2>

                <p className="text-white/40 leading-relaxed mt-8">
                  The reporting workflow supports analytical summaries, model
                  comparison and exportable Python analysis for continued
                  offline work.
                </p>
              </div>

              <div className="fa-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    ["Report", "Generate analysis"],
                    ["Compare", "Review model alternatives"],
                    ["Export", "Download Python analysis"],
                  ].map(([title, description]) => (
                    <div
                      key={title}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-6"
                    >
                      <p className="text-cyan-300 text-xl font-semibold">
                        {title}
                      </p>

                      <p className="text-white/35 text-sm mt-3">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="fa-reveal lg:col-span-5 rounded-[30px] border border-amber-300/15 bg-amber-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-amber-300 text-xs uppercase tracking-[0.25em]">
                  Current Limitations
                </p>

                <h2 className="text-white text-3xl md:text-4xl font-semibold mt-5">
                  A broad analytics
                  <br />
                  platform still has
                  <br />
                  boundaries.
                </h2>

                <div className="space-y-4 mt-8 text-white/40">
                  <p>
                    Time-series workflows require sufficient historical data.
                  </p>

                  <p>Classification currently has target-type limitations.</p>

                  <p>
                    Very large files can result in slower upload and processing.
                  </p>

                  <p>Real-time streaming is not currently supported.</p>
                </div>
              </div>

              <div className="fa-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Future Engineering
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {[
                    "LSTM Time-Series Models",
                    "Hyperparameter Optimization",
                    "Model Export",
                    "Docker Deployment",
                    "Database Integration",
                    "Real-Time Data Streaming",
                    "Authentication",
                    "Financial Stress Testing",
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
            <div className="fa-reveal max-w-7xl mx-auto relative overflow-hidden rounded-[36px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-14">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Explore the System
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight mt-4">
                    Financial data.
                    <br />
                    Multiple analytical paths.
                  </h2>

                  <p className="text-white-50 text-lg mt-5 max-w-2xl leading-relaxed">
                    Review the Flask implementation, financial preprocessing,
                    predictive models, clustering workflow and reporting system
                    on GitHub.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <a
                    href="https://github.com/Hamzah-20/ai-financial-analytics-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black rounded-xl px-6 py-3.5 font-medium transition-transform duration-300 hover:-translate-y-1"
                  >
                    View GitHub
                    <span>↗</span>
                  </a>

                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/10 px-6 py-3.5 text-white transition-all duration-300 hover:border-cyan-300/30"
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

export default FinancialAnalytics;
