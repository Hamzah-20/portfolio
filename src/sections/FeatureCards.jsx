const features = [
  {
    number: "01",
    title: "Machine Learning & Deep Learning",
    description:
      "Training and fine-tuning models to solve real-world problems, with a focus on computer vision and predictive systems.",
    tags: ["TensorFlow", "Keras", "Scikit-learn"],
  },
  {
    number: "02",
    title: "Explainable & Evaluated AI",
    description:
      "Going beyond accuracy by analyzing model behavior, optimizing thresholds, and making predictions easier to understand.",
    tags: ["Grad-CAM", "Evaluation", "Model Analysis"],
  },
  {
    number: "03",
    title: "AI-Powered Applications",
    description:
      "Turning trained models into usable software through interactive interfaces, APIs, and modern web technologies.",
    tags: ["Python", "Streamlit", "React", "Django"],
  },
];

const FeatureCards = () => {
  return (
    <section className="w-full padding-x-lg py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm mb-3">
            What I Build
          </p>

          <h2 className="text-white text-4xl md:text-5xl font-semibold max-w-3xl">
            AI systems from model to application.
          </h2>

          <p className="text-white-50 text-lg md:text-xl mt-4 max-w-3xl">
            I focus on the complete AI workflow — from training and evaluation
            to explainability and software integration.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="
                group
                min-h-[320px]
                rounded-2xl
                border border-white/10
                bg-white/[0.03]
                p-7
                flex flex-col
                transition-all duration-300
                hover:-translate-y-2
                hover:border-cyan-400/30
                hover:bg-cyan-400/[0.04]
              "
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 text-sm font-medium">
                  {feature.number}
                </span>

                <div
                  className="
                    w-10 h-10
                    rounded-full
                    border border-white/10
                    flex items-center justify-center
                    text-white-50
                    transition-all duration-300
                    group-hover:border-cyan-400/40
                    group-hover:text-cyan-300
                  "
                >
                  ↗
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-white text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="text-white-50 mt-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="
                        px-3 py-1
                        rounded-full
                        border border-white/10
                        text-sm
                        text-white-50
                        bg-black/20
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
