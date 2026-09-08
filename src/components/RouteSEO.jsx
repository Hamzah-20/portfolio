import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pages = {
  "/": {
    title: "Hamzah Al-Basyouni | AI & Machine Learning Engineer",
    description:
      "Portfolio of Hamzah Al-Basyouni, an AI & Machine Learning Engineer building end-to-end systems across Generative AI, RAG, Computer Vision, Explainable AI, and Predictive Analytics.",
  },

  "/projects": {
    title: "AI & Machine Learning Projects | Hamzah Al-Basyouni",
    description:
      "Explore AI and Machine Learning projects by Hamzah Al-Basyouni across RAG, Generative AI, Computer Vision, Explainable AI, and Predictive Analytics.",
  },

  "/about": {
    title: "About | Hamzah Al-Basyouni",
    description:
      "Learn about Hamzah Al-Basyouni, a Computer Science graduate and AI & Machine Learning Engineer focused on building practical end-to-end intelligent systems.",
  },

  "/projects/research-rag": {
    title: "Neural Research — RAG Research Assistant | Hamzah Al-Basyouni",
    description:
      "A full-stack Retrieval-Augmented Generation research assistant combining hybrid retrieval, reranking, grounded answers, PostgreSQL, Qdrant, Ollama, FastAPI, and React.",
  },

  "/projects/chest-xray": {
    title: "Chest X-Ray Pneumonia Detection | Hamzah Al-Basyouni",
    description:
      "An AI-powered pneumonia detection system using EfficientNetV2B0, TensorFlow, Grad-CAM explainability, and Streamlit.",
  },

  "/projects/customer-churn": {
    title: "Customer Churn Intelligence Platform | Hamzah Al-Basyouni",
    description:
      "An explainable machine learning platform for customer churn prediction using XGBoost, SHAP, Scikit-Learn, and Flask.",
  },

  "/projects/universal-prediction": {
    title: "Universal Prediction System | Hamzah Al-Basyouni",
    description:
      "An automated machine learning system for classification, regression, and forecasting with data analysis, model training, and prediction workflows.",
  },

  "/projects/financial-analytics": {
    title: "AI Financial Analytics System | Hamzah Al-Basyouni",
    description:
      "An AI-powered financial analytics system combining machine learning, clustering, classification, forecasting, and automated reporting.",
  },

  "/projects/diamond-pricing": {
    title: "Diamond Price Prediction Dashboard | Hamzah Al-Basyouni",
    description:
      "A machine learning dashboard for diamond price prediction featuring model comparison, feature importance, EDA, and interactive predictions.",
  },
};

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const RouteSEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pages[pathname] ?? pages["/"];

    const canonicalUrl = `${window.location.origin}${pathname}`;
    const imageUrl = `${window.location.origin}/images/ai-projects/research-rag.png`;

    document.title = page.title;

    setMeta("name", "description", page.description);

    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);

    setMeta("name", "twitter:title", page.title);
    setMeta("name", "twitter:description", page.description);
    setMeta("name", "twitter:image", imageUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [pathname]);

  return null;
};

export default RouteSEO;
