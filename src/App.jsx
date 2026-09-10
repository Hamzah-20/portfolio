import { lazy, Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import RouteSEO from "./components/RouteSEO";
import AskAIModal from "./components/AskAIModal";
import FloatingAIButton from "./components/FloatingAIButton";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const About = lazy(() => import("./pages/About"));
const ResearchRag = lazy(() => import("./pages/ResearchRag"));
const ChestXRay = lazy(() => import("./pages/ChestXRay"));
const CustomerChurn = lazy(() => import("./pages/CustomerChurn"));
const UniversalPrediction = lazy(() => import("./pages/UniversalPrediction"));
const FinancialAnalytics = lazy(() => import("./pages/FinancialAnalytics"));
const DiamondPricing = lazy(() => import("./pages/DiamondPricing"));

const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-cyan-300 animate-spin" />
  </div>
);

const App = () => {
  const [isAIOpen, setIsAIOpen] = useState(false);

  const openAI = () => {
    setIsAIOpen(true);
  };

  const closeAI = () => {
    setIsAIOpen(false);
  };

  return (
    <>
      <ScrollToTop />
      <RouteSEO />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home onOpenAI={openAI} />} />

          <Route path="/projects" element={<Projects />} />

          <Route path="/projects/research-rag" element={<ResearchRag />} />

          <Route path="/projects/chest-xray" element={<ChestXRay />} />

          <Route path="/projects/customer-churn" element={<CustomerChurn />} />

          <Route
            path="/projects/universal-prediction"
            element={<UniversalPrediction />}
          />

          <Route
            path="/projects/financial-analytics"
            element={<FinancialAnalytics />}
          />

          <Route
            path="/projects/diamond-pricing"
            element={<DiamondPricing />}
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>

      <FloatingAIButton onClick={openAI} isOpen={isAIOpen} />

      <AskAIModal isOpen={isAIOpen} onClose={closeAI} />
    </>
  );
};

export default App;
