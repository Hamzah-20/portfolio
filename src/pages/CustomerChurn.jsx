import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import PageTransition from "../components/PageTransition";
import CustomerRiskBackground from "../components/CustomerRiskBackground";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  "Python",
  "XGBoost",
  "Scikit-Learn",
  "SHAP",
  "SMOTETomek",
  "Flask",
  "Pandas",
];

const pipeline = [
  {
    number: "01",
    title: "Clean",
    description: "Prepare telecom customer data and remove inconsistencies.",
  },
  {
    number: "02",
    title: "Engineer",
    description: "Create behavioral, pricing, service and contract features.",
  },
  {
    number: "03",
    title: "Encode",
    description: "Transform categorical variables using one-hot encoding.",
  },
  {
    number: "04",
    title: "Split",
    description: "Separate held-out test data before training transformations.",
  },
  {
    number: "05",
    title: "Balance",
    description: "Apply SMOTETomek only inside training data.",
  },
  {
    number: "06",
    title: "Select",
    description:
      "Use Mutual Information and L1 regularization for feature selection.",
  },
  {
    number: "07",
    title: "Evaluate",
    description:
      "Compare models with leakage-free repeated stratified cross-validation.",
  },
  {
    number: "08",
    title: "Explain",
    description: "Use SHAP to reveal individual and global churn drivers.",
  },
];

const modelResults = [
  {
    model: "Logistic Regression",
    accuracy: "78.32%",
    precision: "58.19%",
    recall: "65.51%",
    f1: "61.64%",
    auc: "83.59%",
  },
  {
    model: "Random Forest",
    accuracy: "77.11%",
    precision: "55.73%",
    recall: "67.65%",
    f1: "61.11%",
    auc: "83.74%",
  },
  {
    model: "Gradient Boosting",
    accuracy: "77.61%",
    precision: "57.70%",
    recall: "59.09%",
    f1: "58.39%",
    auc: "82.59%",
  },
  {
    model: "XGBoost",
    accuracy: "74.20%",
    precision: "50.95%",
    recall: "79.14%",
    f1: "61.99%",
    auc: "83.21%",
    selected: true,
  },
];

const cvResults = [
  {
    model: "Logistic Regression",
    meanF1: "63.03%",
    deviation: "±1.22%",
  },
  {
    model: "Random Forest",
    meanF1: "63.40%",
    deviation: "±1.37%",
  },
  {
    model: "Gradient Boosting",
    meanF1: "60.10%",
    deviation: "±1.67%",
  },
  {
    model: "XGBoost",
    meanF1: "62.79%",
    deviation: "±1.17%",
  },
];

const businessInsights = [
  {
    number: "01",
    title: "Contract Type",
    description:
      "Month-to-month contracts showed the highest churn probability.",
  },
  {
    number: "02",
    title: "Internet Service",
    description: "Fiber optic users showed higher churn risk than DSL users.",
  },
  {
    number: "03",
    title: "Customer Tenure",
    description: "Long-term customers were significantly less likely to churn.",
  },
  {
    number: "04",
    title: "Payment Method",
    description:
      "Electronic check payment was strongly associated with customer churn.",
  },
];

const screenshots = [
  {
    title: "Customer Intelligence Dashboard",
    description:
      "Interactive interface for churn prediction and customer risk analysis.",
    image: "/images/projects/customer-churn/dashboard.webp",
  },
  {
    title: "SHAP Explainability",
    description:
      "Feature-level explanations reveal the factors driving churn predictions.",
    image: "/images/projects/customer-churn/shap-explainability.webp",
  },
  {
    title: "Confusion Matrix",
    description:
      "Held-out test evaluation showing classification behavior and error trade-offs.",
    image: "/images/projects/customer-churn/confusion-matrix.webp",
  },
  {
    title: "Batch Customer Prediction",
    description:
      "Upload customer CSV data and generate churn probabilities at scale.",
    image: "/images/projects/customer-churn/batch-prediction.webp",
  },
];

const engineeringPractices = [
  "Train/Test Separation",
  "Leakage-Free Cross Validation",
  "SMOTETomek Inside Training Folds",
  "Fold-Level Feature Selection",
  "Pipeline-Based Preprocessing",
  "Baseline Model Comparison",
  "SHAP Explainability",
  "Cross-Validation Stability",
];

const CustomerChurn = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cc-hero > *",
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
        ".cc-hero-image",
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

      gsap.utils.toArray(".cc-reveal").forEach((element) => {
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

      gsap.fromTo(
        ".cc-recall-bar",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: ".cc-recall-section",
            start: "top 80%",
            once: true,
          },
        },
      );
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
        <CustomerRiskBackground />
        <ScrollToTopProgress />

        <div className="relative z-10">
          <NavBar />

          <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24">
            <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-12 items-center">
              <div className="cc-hero xl:col-span-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  Explainable Machine Learning
                </div>

                <h1 className="text-5xl md:text-7xl xl:text-[78px] font-semibold leading-[0.98] tracking-[-0.04em] mt-7">
                  Customer Churn
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white">
                    Intelligence.
                  </span>
                </h1>

                <p className="text-white-50 text-lg md:text-xl leading-relaxed max-w-xl mt-8">
                  A full-stack machine learning platform I built to predict
                  telecom customer churn, explain individual risk factors with
                  SHAP and transform model output into actionable retention
                  insights.
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
                    href="https://github.com/Hamzah-20/customer-churn-prediction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl bg-white text-black font-medium px-6 py-3.5 transition-all duration-300 hover:-translate-y-1"
                  >
                    View GitHub
                    <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </a>

                  <a
                    href="#model-selection"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 backdrop-blur-sm text-white px-6 py-3.5 transition-all duration-300 hover:border-cyan-300/30"
                  >
                    Explore Evaluation
                    <span className="text-cyan-300">↓</span>
                  </a>
                </div>

                <p className="text-white/25 text-xs uppercase tracking-[0.18em] mt-8">
                  Designed & built end-to-end by Hamzah Al-Basyouni
                </p>
              </div>

              <div className="cc-hero-image xl:col-span-7 relative">
                <div className="relative rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-md p-2 md:p-3 shadow-[0_30px_120px_rgba(34,211,238,0.08)]">
                  <div className="rounded-[23px] overflow-hidden border border-white/[0.07] bg-black">
                    <div className="h-11 border-b border-white/[0.07] flex items-center px-4 gap-2 bg-black/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />

                      <span className="ml-4 text-white/25 text-[10px] tracking-wide">
                        customer-intelligence / churn-risk
                      </span>
                    </div>

                    <img
                      src="/images/projects/customer-churn/dashboard.webp"
                      alt="Customer Churn Intelligence dashboard"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top"
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute -left-8 top-[17%] rounded-2xl border border-rose-300/15 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Churn Recall
                  </p>

                  <p className="text-rose-300 text-3xl font-semibold mt-1">
                    79.14%
                  </p>

                  <p className="text-white/35 text-xs mt-1">XGBoost</p>
                </div>

                <div className="hidden md:block absolute -right-5 bottom-[12%] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Explainability
                  </p>

                  <p className="text-white font-medium mt-2">SHAP</p>

                  <p className="text-cyan-300 text-xs mt-1">
                    Feature-level reasoning
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 pb-24">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm">
              {[
                ["74.20%", "Accuracy"],
                ["50.95%", "Precision"],
                ["79.14%", "Recall"],
                ["61.99%", "F1 Score"],
                ["83.21%", "ROC-AUC"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="bg-black/50 backdrop-blur-sm p-6 md:p-8"
                >
                  <p
                    className={`text-2xl md:text-3xl font-semibold ${
                      label === "Recall" ? "text-rose-300" : "text-cyan-300"
                    }`}
                  >
                    {value}
                  </p>

                  <p className="text-white/40 text-sm mt-2">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="cc-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/55 backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-rose-300 text-xs uppercase tracking-[0.25em]">
                  The Business Problem
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  Predicting churn
                  <br />
                  is only half
                  <br />
                  the problem.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  A retention team needs more than a binary prediction. It needs
                  to know which customers are at risk, what factors are driving
                  that risk and where intervention may have the greatest value.
                </p>
              </div>

              <div className="cc-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  The ML Solution
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  Detect risk.
                  <br />
                  Explain why.
                  <br />
                  Support retention.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12 max-w-3xl">
                  The system combines engineered customer behavior features,
                  class-imbalance handling, leakage-free evaluation, XGBoost
                  prediction and SHAP explainability inside a complete Flask
                  application.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cc-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Machine Learning Pipeline
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  From customer data
                  <br />
                  <span className="text-white/40">to explainable risk.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pipeline.map((step) => (
                  <div
                    key={step.number}
                    className="cc-reveal group relative min-h-[230px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 hover:border-cyan-300/30 hover:-translate-y-1"
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="cc-reveal cc-recall-section lg:col-span-7 rounded-[30px] border border-rose-300/15 bg-rose-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-rose-300 text-xs uppercase tracking-[0.25em]">
                  Business Objective
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold mt-5">
                  Why Recall
                  <br />
                  matters more.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-7 max-w-3xl">
                  In churn prediction, missing a customer who is likely to leave
                  can mean lost revenue. Contacting a customer who would have
                  stayed generally carries a smaller cost.
                </p>

                <div className="mt-10">
                  <div className="flex justify-between mb-3">
                    <p className="text-white/50 text-sm">
                      XGBoost Churn Recall
                    </p>

                    <p className="text-rose-300 font-medium">79.14%</p>
                  </div>

                  <div className="h-3 rounded-full overflow-hidden bg-white/[0.05]">
                    <div
                      className="cc-recall-bar h-full rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-rose-300"
                      style={{ width: "79.14%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="cc-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-white/25 text-xs uppercase tracking-[0.2em]">
                  Classification Trade-Off
                </p>

                <div className="mt-8 space-y-6">
                  <div>
                    <p className="text-rose-300 text-sm font-medium">
                      False Negative
                    </p>

                    <p className="text-white text-xl mt-2">
                      Missed at-risk customer
                    </p>

                    <p className="text-white/35 text-sm mt-2">
                      Potential lost customer and lost revenue.
                    </p>
                  </div>

                  <div className="h-px bg-white/[0.07]" />

                  <div>
                    <p className="text-cyan-300 text-sm font-medium">
                      False Positive
                    </p>

                    <p className="text-white text-xl mt-2">
                      Unnecessary retention offer
                    </p>

                    <p className="text-white/35 text-sm mt-2">
                      Typically a lower-cost business error.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="model-selection"
            className="px-6 md:px-12 lg:px-16 py-20 md:py-24"
          >
            <div className="max-w-7xl mx-auto">
              <div className="cc-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Model Comparison
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Accuracy did not
                  <br />
                  <span className="text-white/40">choose the winner.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {modelResults.map((result) => (
                  <div
                    key={result.model}
                    className={`
                      cc-reveal
                      rounded-[26px]
                      border
                      p-7
                      backdrop-blur-sm
                      transition-all
                      duration-500
                      ${
                        result.selected
                          ? "border-rose-300/25 bg-rose-300/[0.03]"
                          : "border-white/10 bg-black/50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-white text-xl md:text-2xl font-semibold">
                        {result.model}
                      </h3>

                      {result.selected && (
                        <span className="rounded-full border border-rose-300/20 bg-rose-300/[0.04] px-3 py-1 text-rose-300 text-[10px] uppercase tracking-[0.15em]">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8">
                      {[
                        ["Accuracy", result.accuracy],
                        ["Precision", result.precision],
                        ["Recall", result.recall],
                        ["F1", result.f1],
                        ["ROC-AUC", result.auc],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-white/25 text-[10px] uppercase tracking-[0.15em]">
                            {label}
                          </p>

                          <p
                            className={`font-medium mt-2 ${
                              result.selected && label === "Recall"
                                ? "text-rose-300 text-xl"
                                : "text-white"
                            }`}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cc-reveal mt-6 rounded-[28px] border border-cyan-300/15 bg-cyan-300/[0.03] backdrop-blur-sm p-7 md:p-9">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.2em]">
                  Final Model
                </p>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-4">
                  <div>
                    <h3 className="text-white text-3xl md:text-4xl font-semibold">
                      XGBoost
                    </h3>

                    <p className="text-white/40 leading-relaxed mt-4 max-w-3xl">
                      Selected for its strongest held-out churn detection
                      capability while maintaining stable F1 performance between
                      test evaluation and leakage-free cross-validation.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <p className="text-rose-300 text-5xl font-semibold">
                      79.14%
                    </p>

                    <p className="text-white/35 text-sm mt-2">
                      Held-out Recall
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cc-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Leakage-Free Evaluation
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Evaluation without
                  <br />
                  <span className="text-white/40">information leakage.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="cc-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      ["01", "Create training fold"],
                      ["02", "Apply SMOTETomek to training only"],
                      ["03", "Select features on training only"],
                      ["04", "Train selected model"],
                      ["05", "Evaluate unseen validation fold"],
                      ["06", "Repeat across stratified folds"],
                    ].map(([number, label]) => (
                      <div
                        key={number}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5"
                      >
                        <p className="text-cyan-300 text-xs tracking-[0.18em]">
                          {number}
                        </p>

                        <p className="text-white mt-3">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cc-reveal lg:col-span-5 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.03] backdrop-blur-sm p-8 md:p-10">
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.2em]">
                    Why it matters
                  </p>

                  <h3 className="text-white text-3xl font-semibold mt-5">
                    Resampling and feature selection never see validation data.
                  </h3>

                  <p className="text-white/40 leading-relaxed mt-7">
                    Each fold performs preprocessing independently on its
                    training split, providing a more trustworthy estimate of
                    real-world generalization.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {cvResults.map((result) => (
                  <div
                    key={result.model}
                    className="cc-reveal rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6"
                  >
                    <p className="text-white/35 text-xs">{result.model}</p>

                    <p className="text-cyan-300 text-2xl font-semibold mt-4">
                      {result.meanF1}
                    </p>

                    <p className="text-white/25 text-xs mt-1">
                      Mean F1 · {result.deviation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cc-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Feature Engineering
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Features built around
                  <br />
                  <span className="text-white/40">customer behavior.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  [
                    "Customer Lifecycle",
                    "Tenure behavior and customer lifecycle patterns",
                  ],
                  [
                    "Price Sensitivity",
                    "Pricing and customer cost sensitivity metrics",
                  ],
                  [
                    "Service Bundling",
                    "Service adoption and bundling behavior",
                  ],
                  [
                    "Retention Signals",
                    "Contract and high-risk customer indicators",
                  ],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="cc-reveal rounded-[24px] border border-white/10 bg-black/50 backdrop-blur-sm p-6 min-h-[220px]"
                  >
                    <div className="w-9 h-9 rounded-full border border-cyan-300/20 bg-cyan-300/[0.035] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-cyan-300" />
                    </div>

                    <h3 className="text-white text-xl font-semibold mt-8">
                      {title}
                    </h3>

                    <p className="text-white/35 text-sm leading-relaxed mt-3">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="cc-reveal xl:col-span-5 rounded-[30px] border border-rose-300/15 bg-rose-300/[0.025] backdrop-blur-sm p-8 md:p-10 flex flex-col">
                <p className="text-rose-300 text-xs uppercase tracking-[0.25em]">
                  Explainable AI
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold mt-5">
                  Not just
                  <br />
                  who will churn.
                  <br />
                  Why.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  SHAP exposes the features driving individual and global model
                  behavior, turning churn probability into an interpretable
                  customer risk explanation.
                </p>
              </div>

              <div className="cc-reveal xl:col-span-7 rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-sm p-2 overflow-hidden">
                <div className="rounded-[24px] overflow-hidden bg-black max-h-[680px] overflow-y-auto">
                  <img
                    src="/images/projects/customer-churn/shap-explainability.webp"
                    alt="SHAP customer churn explainability"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cc-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Business Insights
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  What the model
                  <br />
                  <span className="text-white/40">revealed about churn.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {businessInsights.map((insight) => (
                  <div
                    key={insight.number}
                    className="cc-reveal group rounded-[26px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 min-h-[240px] transition-all duration-500 hover:border-rose-300/20 hover:-translate-y-1"
                  >
                    <div className="flex justify-between">
                      <span className="text-cyan-300 text-xs tracking-[0.18em]">
                        INSIGHT {insight.number}
                      </span>

                      <span className="text-white/[0.08] text-5xl font-bold">
                        {insight.number}
                      </span>
                    </div>

                    <h3 className="text-white text-2xl font-semibold mt-8">
                      {insight.title}
                    </h3>

                    <p className="text-white/40 leading-relaxed mt-4">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cc-reveal mt-6 rounded-[28px] border border-cyan-300/15 bg-cyan-300/[0.03] backdrop-blur-sm p-7 md:p-9">
                <p className="text-white/40 leading-relaxed">
                  SHAP analysis identified contract type, tenure, monthly
                  charges and internet service among the most influential churn
                  drivers in the trained model.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-[1450px] mx-auto">
              <div className="cc-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                <div>
                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Application Experience
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                    From ML model
                    <br />
                    <span className="text-white/40">
                      to customer intelligence.
                    </span>
                  </h2>
                </div>

                <p className="text-white-50 text-lg leading-relaxed max-w-xl">
                  The Flask application supports real-time churn prediction,
                  batch CSV analysis, explainability and interactive business
                  analytics.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.title}
                    className="cc-reveal group rounded-[28px] border border-white/10 bg-black/45 backdrop-blur-sm p-2 overflow-hidden transition-all duration-500 hover:border-cyan-300/25 hover:-translate-y-1"
                  >
                    <div className="rounded-[21px] overflow-hidden bg-black max-h-[560px]">
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
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
              <div className="cc-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Batch Prediction
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  Analyze customer
                  <br />
                  risk at scale.
                </h2>

                <p className="text-white/40 leading-relaxed mt-7">
                  Users can upload CSV customer data, run the complete
                  preprocessing pipeline automatically and generate churn
                  probabilities for each customer.
                </p>
              </div>

              <div className="cc-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    ["01", "Upload CSV"],
                    ["02", "Preprocess"],
                    ["03", "Predict Risk"],
                    ["04", "Review Insights"],
                  ].map(([number, label]) => (
                    <div
                      key={number}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.018] p-5"
                    >
                      <p className="text-rose-300 text-xs">{number}</p>

                      <p className="text-white mt-4">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cc-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Engineering Practices
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Built for
                  <br />
                  <span className="text-white/40">trustworthy evaluation.</span>
                </h2>
              </div>

              <div className="cc-reveal rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-7 md:p-10">
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
            <div className="cc-reveal max-w-7xl mx-auto rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <p className="text-white/25 text-xs uppercase tracking-[0.2em]">
                    Next Engineering Steps
                  </p>

                  <h2 className="text-white text-4xl font-semibold mt-5">
                    From strong prototype
                    <br />
                    to production ML.
                  </h2>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Automated Hyperparameter Optimization",
                    "MLflow Experiment Tracking",
                    "Data Drift Monitoring",
                    "FastAPI Prediction API",
                    "Cloud Deployment",
                    "Continuous Training Pipeline",
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
            <div className="cc-reveal max-w-7xl mx-auto relative overflow-hidden rounded-[36px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-14">
              <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] rounded-full bg-rose-300/[0.035] blur-[120px]" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Explore the Project
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight mt-4">
                    See the model.
                    <br />
                    Understand the decisions.
                  </h2>

                  <p className="text-white-50 text-lg mt-5 max-w-2xl leading-relaxed">
                    The repository includes feature engineering, leakage-free
                    model evaluation, SHAP explainability, batch prediction and
                    the complete Flask application.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <a
                    href="https://github.com/Hamzah-20/customer-churn-prediction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-white text-black rounded-xl px-6 py-3.5 font-medium transition-transform duration-300 hover:-translate-y-1"
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

export default CustomerChurn;
