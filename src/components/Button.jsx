const Button = ({ text, className, targetId }) => {
  return (
    <a
      href={`#${targetId}`}
      onClick={(e) => {
        e.preventDefault();

        const target = document.getElementById(targetId);

        if (!target) return;

        const offset = window.innerHeight * 0.1;

        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }}
      className={`${className ?? ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />

        <p className="text">{text}</p>

        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="" />
        </div>
      </div>
    </a>
  );
};

export default Button;
