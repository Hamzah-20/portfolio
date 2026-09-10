const FloatingAIButton = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open Hamzah's AI assistant"
      className="
        floating-ai-button
        group
        fixed
        right-4 md:right-7
        bottom-5 md:bottom-7
        z-[90]
        flex
        items-center
        gap-3
      "
    >
      <span
        className="
          floating-ai-label
          hidden md:block
          rounded-full
          border border-cyan-300/20
          bg-black/80
          backdrop-blur-xl
          px-4 py-2
          text-sm
          font-medium
          text-white
          opacity-0
          translate-x-3
          pointer-events-none
          transition-all
          duration-300
          group-hover:opacity-100
          group-hover:translate-x-0
        "
      >
        Ask My AI
      </span>

      <span
        className="
          floating-ai-orb
          relative
          flex
          size-14 md:size-16
          items-center
          justify-center
          rounded-full
        "
      >
        <span className="floating-ai-ring floating-ai-ring-one" />
        <span className="floating-ai-ring floating-ai-ring-two" />

        <span
          className="
            floating-ai-core
            relative z-10
            flex
            size-11 md:size-12
            items-center
            justify-center
            rounded-full
            border border-cyan-200/30
            bg-black
            text-cyan-200
            text-xl md:text-2xl
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          ✦
        </span>

        <span className="floating-ai-particle floating-ai-particle-one" />
        <span className="floating-ai-particle floating-ai-particle-two" />
      </span>
    </button>
  );
};

export default FloatingAIButton;
