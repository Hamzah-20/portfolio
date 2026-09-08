# Hamzah Al-Basyouni — AI & Machine Learning Portfolio

A modern interactive portfolio showcasing my work across Artificial Intelligence, Machine Learning, Generative AI, Retrieval-Augmented Generation, Computer Vision, Explainable AI, and Predictive Analytics.

The portfolio combines a responsive React interface with interactive 3D experiences, dedicated project case studies, technical project metrics, and direct links to source code and live applications.

## Featured Projects

### Neural Research — RAG Research Assistant

A full-stack Retrieval-Augmented Generation research assistant featuring hybrid retrieval, reranking, grounded answers, document management, and local LLM integration.

**Technologies:** React, TypeScript, FastAPI, PostgreSQL, Qdrant, Ollama, Docker

### Chest X-Ray Pneumonia Detection

A deep-learning medical imaging system for pneumonia detection with explainable predictions using Grad-CAM.

**Technologies:** Python, TensorFlow, Keras, EfficientNetV2B0, OpenCV, Streamlit

### Customer Churn Intelligence Platform

An explainable machine-learning platform for predicting customer churn and understanding the factors behind individual predictions.

**Technologies:** Python, XGBoost, Scikit-Learn, SHAP, SMOTETomek, Flask

### Universal Prediction System

An automated machine-learning application supporting classification, regression, forecasting, model training, analysis, and prediction workflows.

### AI Financial Analytics System

A financial analytics platform combining machine learning, clustering, classification, time-series forecasting, and automated reporting.

### Diamond Price Prediction Dashboard

An interactive machine-learning dashboard for diamond price prediction with model comparison, exploratory analysis, and feature importance.

## Portfolio Features

- Interactive 3D hero experience
- Responsive desktop and mobile design
- Dedicated AI/ML project case studies
- Dynamic route-specific SEO metadata
- Optimized WebP project imagery
- Lazy-loaded routes and project pages
- Smooth GSAP animations
- Interactive technology showcase
- Experience, education, certifications, and skills sections
- EmailJS contact form
- GitHub and LinkedIn integration
- Lighthouse-optimized accessibility and SEO

## Tech Stack

### Frontend

- React 19
- React Router
- Vite
- Tailwind CSS
- GSAP

### 3D & Animation

- Three.js
- React Three Fiber
- Drei
- React Three Postprocessing

### Other

- EmailJS
- Mona Sans
- Sharp for image optimization
- ESLint

## Project Structure

```text
src/
├── components/
│   ├── models/
│   └── ...
├── constants/
├── pages/
├── sections/
├── App.jsx
├── index.css
└── main.jsx

public/
├── images/
├── models/
└── robots.txt
```

## Routes

```text
/
├── /about
├── /projects
├── /projects/research-rag
├── /projects/chest-xray
├── /projects/customer-churn
├── /projects/universal-prediction
├── /projects/financial-analytics
└── /projects/diamond-pricing
```

## Local Development

Clone the repository:

```bash
git clone https://github.com/Hamzah-20/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Quality Checks

```bash
npm run lint
npm audit
npm run build
```

The portfolio has been optimized for:

- Responsive design
- Accessibility
- Search engine optimization
- Image delivery
- Production code splitting
- Reduced asset size

## Image Optimization

Project screenshots are optimized using Sharp and WebP.

The included `optimize-images.mjs` script can be used when new project screenshots are added.

## Contact

**Hamzah Al-Basyouni**

AI & Machine Learning Engineer

- GitHub: https://github.com/Hamzah-20
- LinkedIn: https://www.linkedin.com/in/hamzah-al-basyouni-967122369/
- Email: hamzahalbasyouni@gmail.com

## Acknowledgment

The portfolio was originally inspired by the 3D portfolio tutorial and design foundation from JavaScript Mastery / Adrian Hajdin and has been substantially customized and extended with new architecture, content, AI/ML project case studies, responsive improvements, SEO, accessibility, optimization, and custom 3D experiences.
