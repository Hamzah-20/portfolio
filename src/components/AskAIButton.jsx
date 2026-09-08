const AskAIButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        md:w-64 md:h-16
        w-56 h-12
        rounded-xl
        border border-cyan-400/30
        bg-cyan-400/5
        text-white
        font-medium
        flex items-center justify-center gap-3
        transition-all duration-300
        hover:bg-cyan-400/10
        hover:border-cyan-300/60
        hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
        relative z-20
      "
    >
      <span className="text-cyan-300 text-xl">✦</span>
      <span>Ask My AI</span>
    </button>
  );
};

export default AskAIButton;
