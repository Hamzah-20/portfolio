import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import PageTransition from "../components/PageTransition";
import PredictiveFlowBackground from "../components/PredictiveFlowBackground";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  "Python",
  "Flask",
  "Scikit-Learn",
  "StatsModels",
  "Pandas",
  "NumPy",
  "Bootstrap",
];

const workflow = [
  {
    number: "01",
    title: "Upload",
    description: "CSV, Excel or JSON structured data.",
  },
  {
    number: "02",
    title: "Analyze",
    description: "Detect headers, columns and dataset characteristics.",
  },
  {
    number: "03",
    title: "Configure",
    description: "Select target and optional feature column.",
  },
  {
    number: "04",
    title: "Detect",
    description:
      "Automatically determine Time Series, Classification or Regression.",
  },
  {
    number: "05",
    title: "Train",
    description: "Train an appropriate model for the detected prediction task.",
  },
  {
    number: "06",
    title: "Predict",
    description: "Generate single or batch predictions.",
  },
  {
    number: "07",
    title: "Forecast",
    description: "Generate future values when the task is time series.",
  },
  {
    number: "08",
    title: "Visualize",
    description: "Display predictions, historical data and analysis results.",
  },
];

const predictionModes = [
  {
    label: "01",
    name: "Time Series",
    color: "cyan",
    models: ["ARIMA", "Holt-Winters", "Trend + Moving Average"],
    description:
      "Detected when date-like columns and temporal patterns are found.",
    output: "Future forecasting and prediction visualization.",
  },
  {
    label: "02",
    name: "Classification",
    color: "amber",
    models: ["Logistic Regression", "Random Forest"],
    description: "Detected for binary or low-cardinality categorical targets.",
    output: "Predicted class and probability or confidence.",
  },
  {
    label: "03",
    name: "Regression",
    color: "purple",
    models: ["Ridge Regression"],
    description:
      "Used for continuous numerical targets that do not follow a time-series pattern.",
    output: "Continuous numerical prediction.",
  },
];

const screenshots = [
  {
    title: "Prediction Dashboard",
    description: "Unified workspace for data upload, training and prediction.",
    image: "/images/projects/universal-prediction/dashboard.webp",
  },
  {
    title: "Data Upload & Preview",
    description:
      "Flexible structured-data ingestion with automatic header detection.",
    image: "/images/projects/universal-prediction/data-upload.webp",
  },
  {
    title: "Data Analysis",
    description: "Dataset statistics and automatic structural analysis.",
    image: "/images/projects/universal-prediction/data-analysis.webp",
  },
  {
    title: "Model Training",
    description: "Automatic training based on the detected prediction task.",
    image: "/images/projects/universal-prediction/model-training.webp",
  },
  {
    title: "Prediction Results",
    description: "Interactive result view for trained predictive models.",
    image: "/images/projects/universal-prediction/prediction-results.webp",
  },
  {
    title: "Batch Predictions",
    description: "Process multiple records and export generated predictions.",
    image: "/images/projects/universal-prediction/batch-predictions.webp",
  },
  {
    title: "Future Forecasting",
    description:
      "Generate future time-series predictions across configurable periods.",
    image: "/images/projects/universal-prediction/future-forecasting.webp",
  },
];

const engineeringPractices = [
  "Automatic Header Detection",
  "Flexible Column Matching",
  "Input Validation",
  "Malformed Data Fallbacks",
  "Secure Filename Handling",
  "NumPy / Pandas Serialization",
  "Dynamic Form Generation",
  "Batch Prediction",
];

const UniversalPrediction = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".up-hero > *",
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
        ".up-hero-image",
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

      gsap.utils.toArray(".up-reveal").forEach((element) => {
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
        <PredictiveFlowBackground />
        <ScrollToTopProgress />

        <div className="relative z-10">
          <NavBar />

          <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24">
            <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-12 items-center">
              <div className="up-hero xl:col-span-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  Automated Machine Learning
                </div>

                <h1 className="text-5xl md:text-7xl xl:text-[78px] font-semibold leading-[0.98] tracking-[-0.04em] mt-7">
                  Universal
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white">
                    Prediction System.
                  </span>
                </h1>

                <p className="text-white-50 text-lg md:text-xl leading-relaxed max-w-xl mt-8">
                  A full-stack machine learning platform I built to
                  automatically detect structured-data prediction tasks and
                  route them through Time Series, Classification or Regression
                  workflows.
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
                    href="https://universal-prediction-system.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl bg-cyan-300 text-black font-medium px-6 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-200"
                  >
                    Live Demo
                    <span>↗</span>
                  </a>

                  <a
                    href="https://github.com/Hamzah-20/universal-prediction-system"
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

              <div className="up-hero-image xl:col-span-7 relative">
                <div className="relative rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-md p-2 md:p-3 shadow-[0_30px_120px_rgba(34,211,238,0.08)]">
                  <div className="rounded-[23px] overflow-hidden border border-white/[0.07] bg-black">
                    <div className="h-11 border-b border-white/[0.07] flex items-center px-4 gap-2 bg-black/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />

                      <span className="ml-4 text-white/25 text-[10px] tracking-wide">
                        universal-ml / prediction-engine
                      </span>
                    </div>

                    <img
                      src="/images/projects/universal-prediction/dashboard.webp"
                      alt="Universal Prediction System dashboard"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top"
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute -left-8 top-[17%] rounded-2xl border border-cyan-300/15 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Prediction Modes
                  </p>

                  <p className="text-cyan-300 text-3xl font-semibold mt-1">3</p>

                  <p className="text-white/35 text-xs mt-1">Auto detected</p>
                </div>

                <div className="hidden md:block absolute -right-5 bottom-[12%] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Future Forecast
                  </p>

                  <p className="text-white font-medium mt-2">1 — 100 periods</p>

                  <p className="text-cyan-300 text-xs mt-1">Time Series</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 pb-24">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm">
              {[
                ["3", "Prediction Modes"],
                ["3", "File Formats"],
                ["1–100", "Forecast Periods"],
                ["10", "API Endpoints"],
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
              <div className="up-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/55 backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-amber-300 text-xs uppercase tracking-[0.25em]">
                  The Problem
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  Different datasets
                  <br />
                  require different
                  <br />
                  prediction logic.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  Most prediction applications are built around one fixed model
                  or one data format. Real structured datasets can represent
                  very different tasks and often require different preparation,
                  training and prediction workflows.
                </p>
              </div>

              <div className="up-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  The Solution
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  One interface.
                  <br />
                  Three ML paths.
                  <br />
                  Automatic routing.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12 max-w-3xl">
                  The platform analyzes uploaded structured data, determines the
                  prediction task and routes the workflow through time series
                  forecasting, classification or regression.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="up-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Automated Detection
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  The data chooses
                  <br />
                  <span className="text-white/40">the prediction path.</span>
                </h2>
              </div>

              <div className="up-reveal rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 md:p-10">
                <div className="max-w-4xl mx-auto">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
                    <p className="text-white/35 text-xs uppercase tracking-[0.2em]">
                      Input
                    </p>

                    <p className="text-white text-2xl font-semibold mt-2">
                      Structured Dataset
                    </p>
                  </div>

                  <div className="flex justify-center py-5">
                    <span className="text-cyan-300">↓</span>
                  </div>

                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.035] p-6 text-center">
                    <p className="text-white/35 text-xs uppercase tracking-[0.2em]">
                      Detection Engine
                    </p>

                    <p className="text-cyan-300 text-2xl font-semibold mt-2">
                      Analyze Target + Date + Data Type
                    </p>
                  </div>

                  <div className="flex justify-center py-5">
                    <span className="text-cyan-300">↓</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.03] p-6">
                      <p className="text-cyan-300 font-medium">Time Series</p>

                      <p className="text-white/35 text-sm mt-3">
                        Date column or recognized temporal pattern.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-300/20 bg-amber-300/[0.025] p-6">
                      <p className="text-amber-300 font-medium">
                        Classification
                      </p>

                      <p className="text-white/35 text-sm mt-3">
                        Binary or low-cardinality categorical target.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-purple-300/20 bg-purple-300/[0.025] p-6">
                      <p className="text-purple-300 font-medium">Regression</p>

                      <p className="text-white/35 text-sm mt-3">
                        Continuous numeric target.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="up-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  System Workflow
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  From raw data
                  <br />
                  <span className="text-white/40">to prediction.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {workflow.map((step) => (
                  <div
                    key={step.number}
                    className="up-reveal group relative min-h-[230px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 hover:border-cyan-300/30 hover:-translate-y-1"
                  >
                    <span className="absolute right-4 bottom-[-15px] text-[100px] font-bold leading-none text-white/[0.025]">
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

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="up-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Prediction Engines
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Three tasks.
                  <br />
                  <span className="text-white/40">
                    Different model strategies.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {predictionModes.map((mode) => {
                  const colorClasses = {
                    cyan: {
                      border: "border-cyan-300/20",
                      background: "bg-cyan-300/[0.03]",
                      text: "text-cyan-300",
                    },
                    amber: {
                      border: "border-amber-300/20",
                      background: "bg-amber-300/[0.025]",
                      text: "text-amber-300",
                    },
                    purple: {
                      border: "border-purple-300/20",
                      background: "bg-purple-300/[0.025]",
                      text: "text-purple-300",
                    },
                  };

                  const theme = colorClasses[mode.color];

                  return (
                    <div
                      key={mode.name}
                      className={`
                        up-reveal
                        rounded-[28px]
                        border
                        backdrop-blur-sm
                        p-7
                        min-h-[430px]
                        flex
                        flex-col
                        ${theme.border}
                        ${theme.background}
                      `}
                    >
                      <div className="flex justify-between">
                        <span
                          className={`text-xs tracking-[0.18em] ${theme.text}`}
                        >
                          PATH {mode.label}
                        </span>

                        <span className="text-white/[0.08] text-5xl font-bold">
                          {mode.label}
                        </span>
                      </div>

                      <h3 className="text-white text-3xl font-semibold mt-8">
                        {mode.name}
                      </h3>

                      <p className="text-white/40 leading-relaxed mt-4">
                        {mode.description}
                      </p>

                      <div className="mt-8">
                        <p className="text-white/25 text-xs uppercase tracking-[0.18em]">
                          Models
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {mode.models.map((model) => (
                            <span
                              key={model}
                              className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-white/55 text-xs"
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto pt-10">
                        <p className="text-white/25 text-xs uppercase tracking-[0.18em]">
                          Output
                        </p>

                        <p
                          className={`text-sm leading-relaxed mt-3 ${theme.text}`}
                        >
                          {mode.output}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="up-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Data Flexibility
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  Built for
                  <br />
                  messy structured
                  <br />
                  data.
                </h2>

                <p className="text-white/40 leading-relaxed mt-8">
                  The system handles multiple file types, attempts automatic
                  header detection and provides flexible column matching for
                  real-world datasets.
                </p>
              </div>

              <div className="up-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.03] backdrop-blur-sm p-8 md:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    ["CSV", "With or without headers"],
                    ["Excel", ".xlsx and .xls"],
                    ["JSON", "Structured records"],
                  ].map(([type, detail]) => (
                    <div
                      key={type}
                      className="rounded-2xl border border-white/[0.08] bg-black/25 p-6"
                    >
                      <p className="text-cyan-300 text-2xl font-semibold">
                        {type}
                      </p>

                      <p className="text-white/35 text-sm mt-2">{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[
                    "Automatic Header Detection",
                    "Automatic Column Detection",
                    "Flexible Column Matching",
                    "Comprehensive Validation",
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
              <div className="up-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                <div>
                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Application Experience
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                    One interface.
                    <br />
                    <span className="text-white/40">
                      Multiple ML workflows.
                    </span>
                  </h2>
                </div>

                <p className="text-white-50 text-lg leading-relaxed max-w-xl">
                  The application supports data preview, automatic analysis,
                  training, prediction, batch processing and future time-series
                  forecasting.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot.title}
                    className={`
                      up-reveal
                      group
                      rounded-[28px]
                      border
                      border-white/10
                      bg-black/45
                      backdrop-blur-sm
                      p-2
                      overflow-hidden
                      transition-all
                      duration-500
                      hover:border-cyan-300/25
                      hover:-translate-y-1
                      ${index === screenshots.length - 1 ? "xl:col-span-2" : ""}
                    `}
                  >
                    <div
                      className={`
    rounded-[21px]
    bg-black
    h-[420px]
    md:h-[500px]
    ${
      screenshot.title === "Future Forecasting"
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
                              screenshot.title === "Future Forecasting"
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
            <div className="max-w-7xl mx-auto">
              <div className="up-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Example Use Cases
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  One platform.
                  <br />
                  <span className="text-white/40">
                    Different prediction domains.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  [
                    "Sales Forecasting",
                    "Time Series",
                    "Predict future monthly sales from historical date and sales data.",
                  ],
                  [
                    "Customer Churn",
                    "Classification",
                    "Predict whether a customer belongs to a churn class.",
                  ],
                  [
                    "House Price",
                    "Regression",
                    "Estimate continuous property prices from numerical features.",
                  ],
                  [
                    "Stock Analysis",
                    "Time Series",
                    "Forecast future closing values from historical market data.",
                  ],
                ].map(([title, type, description]) => (
                  <div
                    key={title}
                    className="up-reveal rounded-[26px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 min-h-[240px]"
                  >
                    <p className="text-cyan-300 text-xs uppercase tracking-[0.18em]">
                      {type}
                    </p>

                    <h3 className="text-white text-2xl font-semibold mt-5">
                      {title}
                    </h3>

                    <p className="text-white/40 leading-relaxed mt-4">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="up-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Engineering Practices
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Built to handle
                  <br />
                  <span className="text-white/40">imperfect inputs.</span>
                </h2>
              </div>

              <div className="up-reveal rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 md:p-10">
                <div className="flex flex-wrap gap-3">
                  {engineeringPractices.map((practice) => (
                    <span
                      key={practice}
                      className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.03] px-4 py-2 text-cyan-200 text-sm"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="up-reveal lg:col-span-5 rounded-[30px] border border-amber-300/15 bg-amber-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-amber-300 text-xs uppercase tracking-[0.25em]">
                  Current Limitations
                </p>

                <h2 className="text-white text-3xl md:text-4xl font-semibold mt-5">
                  Universal does not
                  <br />
                  mean unlimited.
                </h2>

                <div className="space-y-4 mt-8 text-white/40">
                  <p>Time-series models require at least 3 data points.</p>

                  <p>
                    Classification currently supports numeric or binary
                    categorical targets.
                  </p>

                  <p>
                    Seasonal ARIMA behavior requires at least 12 months of data.
                  </p>
                </div>
              </div>

              <div className="up-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Future Engineering
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {[
                    "LSTM Time-Series Models",
                    "Hyperparameter Optimization",
                    "XGBoost / SVM Classification",
                    "Model Export",
                    "Docker Containerization",
                    "Database Integration",
                    "Authentication",
                    "Automated Reports",
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
            <div className="up-reveal max-w-7xl mx-auto relative overflow-hidden rounded-[36px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-14">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Try the System
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight mt-4">
                    Upload data.
                    <br />
                    Let the system choose.
                  </h2>

                  <p className="text-white-50 text-lg mt-5 max-w-2xl leading-relaxed">
                    Explore the live application or review the complete Flask
                    implementation, model detection logic and prediction
                    workflows on GitHub.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <a
                    href="https://universal-prediction-system.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-cyan-300 text-black rounded-xl px-6 py-3.5 font-medium transition-transform duration-300 hover:-translate-y-1"
                  >
                    Live Demo
                    <span>↗</span>
                  </a>

                  <a
                    href="https://github.com/Hamzah-20/universal-prediction-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black rounded-xl px-6 py-3.5 font-medium transition-transform duration-300 hover:-translate-y-1"
                  >
                    GitHub
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

export default UniversalPrediction;
