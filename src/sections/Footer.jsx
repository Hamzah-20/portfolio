import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Identity */}
        <div className="flex flex-col justify-center">
          <p>AI & Machine Learning Engineer</p>
        </div>

        {/* Social Links */}
        <div className="socials">
          {socialImgs.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
              aria-label={social.name}
            >
              {social.imgPath ? (
                <img
                  src={social.imgPath}
                  alt={social.name}
                  width="20"
                  height="20"
                  className={
                    social.name === "GitHub"
                      ? "!w-7 !h-7 object-contain"
                      : "object-contain"
                  }
                />
              ) : (
                <span className="text-sm font-semibold">{social.label}</span>
              )}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Hamzah Al-Basyouni. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
