import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import PageTransition from "../components/PageTransition";
import MedicalVisionBackground from "../components/MedicalVisionBackground";
import ScrollToTopProgress from "../components/ScrollToTopProgress";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  "TensorFlow",
  "Keras",
  "EfficientNetV2B0",
  "OpenCV",
  "Scikit-Learn",
  "Streamlit",
  "Grad-CAM",
];

const pipeline = [
  {
    number: "01",
    title: "Dataset",
    description: "Chest X-ray images labeled NORMAL or PNEUMONIA",
  },
  {
    number: "02",
    title: "Preprocess",
    description: "Resize images to 224 × 224 and prepare model inputs",
  },
  {
    number: "03",
    title: "Augment",
    description: "Horizontal flip, rotation and zoom",
  },
  {
    number: "04",
    title: "Transfer Learn",
    description: "ImageNet pretrained EfficientNetV2B0",
  },
  {
    number: "05",
    title: "Fine-Tune",
    description: "Adapt pretrained features to chest X-ray classification",
  },
  {
    number: "06",
    title: "Evaluate",
    description: "Accuracy, Precision, Recall, F1 and ROC-AUC",
  },
  {
    number: "07",
    title: "Optimize",
    description: "Decision threshold evaluated from 0.50 to 0.80",
  },
  {
    number: "08",
    title: "Explain",
    description: "Grad-CAM highlights influential image regions",
  },
];

const modelComparison = [
  {
    model: "EfficientNetB0",
    accuracy: "91%",
  },
  {
    model: "DenseNet121",
    accuracy: "91%",
  },
  {
    model: "EfficientNetV2B0",
    accuracy: "91.51%",
    selected: true,
  },
];

const performanceMetrics = [
  {
    label: "Accuracy",
    value: 91.51,
  },
  {
    label: "Precision",
    value: 92.02,
  },
  {
    label: "Recall",
    value: 94.62,
  },
  {
    label: "F1 Score",
    value: 93.3,
  },
  {
    label: "ROC-AUC",
    value: 96.59,
  },
];

const screenshots = [
  {
    title: "AI Dashboard",
    description: "Main application workspace for chest X-ray analysis.",
    image: "/images/projects/chest-xray/dashboard.webp",
  },
  {
    title: "Single Image Prediction",
    description:
      "Prediction result with class probability and decision output.",
    image: "/images/projects/chest-xray/single_prediction.webp",
  },
  {
    title: "Grad-CAM Explainability",
    description:
      "Visual explanation highlighting influential regions used by the model.",
    image: "/images/projects/chest-xray/gradcam.webp",
  },
  {
    title: "Batch Analysis",
    description: "Analyze multiple X-rays and export prediction results.",
    image: "/images/projects/chest-xray/batch_analysis.webp",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Performance metrics, threshold analysis and model evaluation views.",
    image: "/images/projects/chest-xray/analytics_dashboard.webp",
  },
];

const trainingConfig = [
  ["Input Size", "224 × 224 × 3"],
  ["Batch Size", "16"],
  ["Optimizer", "Adam"],
  ["Initial LR", "1e-3"],
  ["Fine-Tuning LR", "1e-5"],
  ["Loss", "Binary Cross-Entropy"],
  ["Output", "Sigmoid"],
  ["Pretrained Weights", "ImageNet"],
];

const ChestXRay = () => {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cx-hero > *",
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
        ".cx-hero-image",
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

      gsap.utils.toArray(".cx-reveal").forEach((element) => {
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
        ".cx-performance-bar",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.1,
          transformOrigin: "left center",
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cx-performance",
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
        <MedicalVisionBackground />
        <ScrollToTopProgress />

        <div className="relative z-10">
          <NavBar />

          <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-16 pt-32 md:pt-40 pb-24">
            <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-14 xl:gap-12 items-center">
              <div className="cx-hero xl:col-span-5">
                <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-black/45 backdrop-blur-md px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                  </span>
                  Computer Vision · Medical AI
                </div>

                <h1 className="text-5xl md:text-7xl xl:text-[78px] font-semibold leading-[0.98] tracking-[-0.04em] mt-7">
                  Chest X-Ray
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-white">
                    Pneumonia Detection.
                  </span>
                </h1>

                <p className="text-white-50 text-lg md:text-xl leading-relaxed max-w-xl mt-8">
                  An end-to-end deep learning system I built for pneumonia
                  detection from chest X-ray images, combining transfer
                  learning, threshold optimization, Grad-CAM explainability and
                  an interactive Streamlit application.
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
                    href="https://github.com/Hamzah-20/chest-xray-pneumonia-detection"
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
                    href="#model-performance"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 backdrop-blur-sm text-white px-6 py-3.5 transition-all duration-300 hover:border-cyan-300/30"
                  >
                    Explore Performance
                    <span className="text-cyan-300">↓</span>
                  </a>
                </div>

                <p className="text-white/25 text-xs uppercase tracking-[0.18em] mt-8">
                  Designed & built end-to-end by Hamzah Al-Basyouni
                </p>
              </div>

              <div className="cx-hero-image xl:col-span-7 relative">
                <div className="relative rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-md p-2 md:p-3 shadow-[0_30px_120px_rgba(34,211,238,0.08)]">
                  <div className="rounded-[23px] overflow-hidden border border-white/[0.07] bg-black">
                    <div className="h-11 border-b border-white/[0.07] flex items-center px-4 gap-2 bg-black/60">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-300/60" />

                      <span className="ml-4 text-white/25 text-[10px] tracking-wide">
                        medical-ai / x-ray-analysis
                      </span>
                    </div>

                    <img
                      src="/images/projects/chest-xray/dashboard.webp"
                      alt="Chest X-Ray Pneumonia Detection dashboard"
                      fetchPriority="high"
                      decoding="async"
                      className="w-full aspect-[16/10] object-cover object-top"
                    />
                  </div>
                </div>

                <div className="hidden md:block absolute -left-8 top-[16%] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    ROC-AUC
                  </p>

                  <p className="text-cyan-300 text-3xl font-semibold mt-1">
                    96.59%
                  </p>
                </div>

                <div className="hidden md:block absolute -right-5 bottom-[12%] rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-5 py-4">
                  <p className="text-white/35 text-[10px] uppercase tracking-[0.18em]">
                    Final Model
                  </p>

                  <p className="text-white font-medium mt-2">
                    EfficientNetV2B0
                  </p>

                  <p className="text-cyan-300 text-xs mt-1">Threshold 0.80</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 pb-24">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-px rounded-3xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-sm">
              {[
                ["91.51%", "Accuracy"],
                ["92.02%", "Precision"],
                ["94.62%", "Recall"],
                ["93.30%", "F1 Score"],
                ["96.59%", "ROC-AUC"],
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
              <div className="cx-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/55 backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-red-300/80 text-xs uppercase tracking-[0.25em]">
                  The Problem
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  A prediction
                  <br />
                  without context
                  <br />
                  is incomplete.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                  A medical imaging classifier should not be presented as a
                  black box. Beyond prediction accuracy, users need model
                  confidence, explainability and clear handling of uncertain
                  cases.
                </p>
              </div>

              <div className="cx-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 min-h-[420px] flex flex-col">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  The Solution
                </p>

                <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mt-5">
                  Predict.
                  <br />
                  Explain.
                  <br />
                  Handle uncertainty.
                </h2>

                <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12 max-w-3xl">
                  The system combines EfficientNetV2B0 classification, threshold
                  optimization and Grad-CAM visualization with a complete
                  Streamlit application for single-image analysis, batch
                  prediction, analytics and reporting.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cx-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Deep Learning Pipeline
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  From pixels
                  <br />
                  <span className="text-white/40">
                    to explainable prediction.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pipeline.map((step) => (
                  <div
                    key={step.number}
                    className="cx-reveal group relative min-h-[230px] rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6 overflow-hidden transition-all duration-500 hover:border-cyan-300/30 hover:-translate-y-1"
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
              <div className="cx-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Model Selection
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Three models.
                  <br />
                  <span className="text-white/40">One final choice.</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {modelComparison.map((model) => (
                  <div
                    key={model.model}
                    className={`
                      cx-reveal
                      rounded-[26px]
                      border
                      p-7
                      min-h-[250px]
                      flex
                      flex-col
                      backdrop-blur-sm
                      ${
                        model.selected
                          ? "border-cyan-300/30 bg-cyan-300/[0.05]"
                          : "border-white/10 bg-black/50"
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
                        Transfer Learning
                      </p>

                      {model.selected && (
                        <span className="rounded-full border border-cyan-300/20 px-3 py-1 text-cyan-300 text-[10px] uppercase tracking-[0.15em]">
                          Selected
                        </span>
                      )}
                    </div>

                    <h3 className="text-white text-2xl font-semibold mt-auto">
                      {model.model}
                    </h3>

                    <p
                      className={`text-4xl font-semibold mt-4 ${
                        model.selected ? "text-cyan-300" : "text-white"
                      }`}
                    >
                      {model.accuracy}
                    </p>

                    <p className="text-white/35 text-sm mt-1">Test Accuracy</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="model-performance"
            className="px-6 md:px-12 lg:px-16 py-20 md:py-24"
          >
            <div className="max-w-7xl mx-auto">
              <div className="cx-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Model Performance
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Evaluated beyond
                  <br />
                  <span className="text-white/40">accuracy alone.</span>
                </h2>
              </div>

              <div className="cx-performance cx-reveal rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-6 md:p-10">
                <div className="flex flex-col gap-7">
                  {performanceMetrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between gap-6 mb-3">
                        <p className="text-white font-medium">{metric.label}</p>

                        <p className="text-cyan-300 font-medium">
                          {metric.value.toFixed(2)}%
                        </p>
                      </div>

                      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="cx-performance-bar h-full bg-cyan-300 rounded-full"
                          style={{
                            width: `${metric.value}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="cx-reveal lg:col-span-5 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Threshold Optimization
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  The default
                  <br />
                  threshold was
                  <br />
                  not assumed.
                </h2>

                <p className="text-white/40 leading-relaxed mt-8">
                  Decision thresholds from 0.50 through 0.80 were evaluated. A
                  threshold of 0.80 produced the best overall balance while
                  reducing false positive predictions.
                </p>
              </div>

              <div className="cx-reveal lg:col-span-7 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 flex flex-col justify-center">
                <div className="flex justify-between text-white/30 text-xs">
                  <span>0%</span>
                  <span>50%</span>
                  <span>80%</span>
                  <span>100%</span>
                </div>

                <div className="relative h-4 rounded-full overflow-hidden mt-4 bg-white/[0.05]">
                  <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-300/25" />
                  <div className="absolute inset-y-0 left-1/2 w-[30%] bg-amber-300/30" />
                  <div className="absolute inset-y-0 right-0 w-[20%] bg-cyan-300/60" />
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <p className="text-blue-200 font-medium">NORMAL</p>

                    <p className="text-white/30 text-xs mt-1">Below 50%</p>
                  </div>

                  <div>
                    <p className="text-amber-200 font-medium">REVIEW</p>

                    <p className="text-white/30 text-xs mt-1">50% – 79.99%</p>
                  </div>

                  <div>
                    <p className="text-cyan-300 font-medium">PNEUMONIA</p>

                    <p className="text-white/30 text-xs mt-1">80%+</p>
                  </div>
                </div>

                <div className="mt-10 rounded-2xl border border-cyan-300/15 bg-black/35 p-5">
                  <p className="text-white/35 text-xs uppercase tracking-[0.18em]">
                    Final Decision Threshold
                  </p>

                  <p className="text-cyan-300 text-5xl font-semibold mt-2">
                    0.80
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto">
              <div className="cx-reveal grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
                <div className="xl:col-span-5 rounded-[30px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-10 flex flex-col">
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Explainable AI
                  </p>

                  <h2 className="text-white text-4xl md:text-5xl font-semibold mt-5">
                    The model should
                    <br />
                    show where
                    <br />
                    it looked.
                  </h2>

                  <p className="text-white-50 text-lg leading-relaxed mt-auto pt-12">
                    Grad-CAM generates heatmaps highlighting the regions that
                    most influenced the network's prediction, making the system
                    more transparent than a probability score alone.
                  </p>
                </div>

                <div className="xl:col-span-7 rounded-[30px] border border-white/10 bg-black/45 backdrop-blur-sm p-2">
                  <div className="rounded-[24px] overflow-hidden">
                    <img
                      src="/images/projects/chest-xray/gradcam.webp"
                      alt="Grad-CAM pneumonia explanation"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-[1450px] mx-auto">
              <div className="cx-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
                <div>
                  <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                    Application Experience
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                    From model
                    <br />
                    <span className="text-white/40">to usable system.</span>
                  </h2>
                </div>

                <p className="text-white-50 text-lg leading-relaxed max-w-xl">
                  The Streamlit application supports individual predictions,
                  batch analysis, explainability, analytics, reports and
                  prediction history.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {screenshots.map((screenshot, index) => (
                  <div
                    key={screenshot.title}
                    className={`
                      cx-reveal
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
                      ${
                        index === screenshots.length - 1
                          ? "xl:col-span-2 xl:w-[calc(50%-0.75rem)] xl:justify-self-center"
                          : ""
                      }
                    `}
                  >
                    <div className="rounded-[21px] overflow-hidden bg-black">
                      <img
                        src={screenshot.image}
                        alt={screenshot.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
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
              <div className="cx-reveal mb-14">
                <p className="text-cyan-300 text-sm uppercase tracking-[0.3em]">
                  Training & Engineering
                </p>

                <h2 className="text-white text-4xl md:text-6xl font-semibold mt-5">
                  Transfer learning
                  <br />
                  <span className="text-white/40">
                    with controlled fine-tuning.
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {trainingConfig.map(([label, value]) => (
                  <div
                    key={label}
                    className="cx-reveal rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm p-6"
                  >
                    <p className="text-white/30 text-xs uppercase tracking-[0.15em]">
                      {label}
                    </p>

                    <p className="text-white text-lg font-medium mt-3">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cx-reveal mt-6 rounded-[28px] border border-white/10 bg-black/50 backdrop-blur-sm p-8">
                <div className="flex flex-wrap gap-3">
                  {[
                    "Transfer Learning",
                    "Fine-Tuning",
                    "Class Weights",
                    "Early Stopping",
                    "Learning Rate Scheduling",
                    "Image Augmentation",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.035] px-4 py-2 text-cyan-200 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="cx-reveal lg:col-span-7 rounded-[30px] border border-white/10 bg-black/50 backdrop-blur-sm p-8 md:p-10">
                <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                  Dataset
                </p>

                <h2 className="text-white text-4xl font-semibold mt-5">
                  5,856 chest
                  <br />
                  X-ray images.
                </h2>

                <div className="grid grid-cols-3 gap-4 mt-10">
                  {[
                    ["5,216", "Training"],
                    ["16", "Validation"],
                    ["624", "Testing"],
                  ].map(([value, label]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                    >
                      <p className="text-cyan-300 text-2xl font-semibold">
                        {value}
                      </p>

                      <p className="text-white/35 text-sm mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cx-reveal lg:col-span-5 rounded-[30px] border border-amber-300/15 bg-amber-300/[0.025] backdrop-blur-sm p-8 md:p-10">
                <p className="text-amber-200 text-xs uppercase tracking-[0.25em]">
                  Limitation
                </p>

                <h2 className="text-white text-3xl font-semibold mt-5">
                  The original
                  <br />
                  validation split
                  <br />
                  is very small.
                </h2>

                <p className="text-white/40 leading-relaxed mt-8">
                  The dataset provides only 16 validation images. A future
                  iteration should create a larger validation subset from the
                  training data to improve threshold selection and early
                  stopping reliability.
                </p>
              </div>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20">
            <div className="cx-reveal max-w-7xl mx-auto rounded-[28px] border border-amber-300/15 bg-black/55 backdrop-blur-md p-7 md:p-9 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-amber-200 text-xs uppercase tracking-[0.2em]">
                  Medical Disclaimer
                </p>

                <p className="text-white text-lg mt-2">
                  Educational and research AI system — not clinically validated.
                </p>
              </div>

              <p className="text-white/35 text-sm max-w-xl md:text-right">
                This project must not be used for medical diagnosis, treatment
                or clinical decision-making.
              </p>
            </div>
          </section>

          <section className="px-6 md:px-12 lg:px-16 py-20 md:py-24">
            <div className="cx-reveal max-w-7xl mx-auto relative overflow-hidden rounded-[36px] border border-cyan-300/15 bg-cyan-300/[0.035] backdrop-blur-sm p-8 md:p-14">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                <div>
                  <p className="text-cyan-300 text-xs uppercase tracking-[0.25em]">
                    Explore the Project
                  </p>

                  <h2 className="text-white text-4xl md:text-6xl font-semibold leading-tight mt-4">
                    See the model.
                    <br />
                    Review the evaluation.
                  </h2>

                  <p className="text-white-50 text-lg mt-5 max-w-2xl leading-relaxed">
                    The repository includes model training, evaluation,
                    threshold experiments, Grad-CAM explainability and the
                    complete Streamlit application.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 shrink-0">
                  <a
                    href="https://github.com/Hamzah-20/chest-xray-pneumonia-detection"
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

export default ChestXRay;
