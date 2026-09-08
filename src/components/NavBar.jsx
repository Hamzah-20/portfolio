import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleContactClick = () => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    navigate("/");

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  const navClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-lg transition-all duration-300 ${
      isActive ? "text-cyan-300" : "text-white-50 hover:text-white"
    }`;

  const mobileNavClass = ({ isActive }) =>
    `w-full px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "text-cyan-300 bg-cyan-400/[0.06]"
        : "text-white-50 hover:text-white hover:bg-white/[0.04]"
    }`;

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner relative">
        {/* ================= LOGO ================= */}
        <Link to="/" className="logo group flex items-center gap-2">
          <span>Hamzah</span>

          <span
            className="
              w-2 h-2
              rounded-full
              bg-cyan-300
              shadow-[0_0_10px_rgba(34,211,238,0.8)]
            "
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="desktop">
          <ul
            className="
              flex items-center
              !space-x-1
              p-1
              rounded-xl
              border border-white/5
              bg-white/[0.02]
            "
          >
            <li>
              <NavLink to="/projects" className={navClass}>
                {({ isActive }) => (
                  <>
                    <span>Projects</span>

                    <span
                      className={`
                        absolute
                        left-1/2
                        -translate-x-1/2
                        bottom-1
                        h-[2px]
                        rounded-full
                        bg-cyan-300
                        transition-all
                        duration-300
                        ${isActive ? "w-5 opacity-100" : "w-0 opacity-0"}
                      `}
                    />
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className={navClass}>
                {({ isActive }) => (
                  <>
                    <span>About</span>

                    <span
                      className={`
                        absolute
                        left-1/2
                        -translate-x-1/2
                        bottom-1
                        h-[2px]
                        rounded-full
                        bg-cyan-300
                        transition-all
                        duration-300
                        ${isActive ? "w-5 opacity-100" : "w-0 opacity-0"}
                      `}
                    />
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ================= DESKTOP CONTACT ================= */}
        <button
          type="button"
          onClick={handleContactClick}
          className="contact-btn group hidden lg:flex"
        >
          <div className="inner">
            <span>Let's Connect</span>

            <span
              className="
                ml-2
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-0.5
              "
            >
              ↗
            </span>
          </div>
        </button>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="
            lg:hidden
            relative
            z-[120]
            w-11 h-11
            rounded-xl
            border border-white/10
            bg-white/[0.03]
            flex flex-col
            items-center
            justify-center
            gap-[5px]
          "
        >
          <span
            className={`
              block
              w-5 h-[2px]
              bg-white
              rounded-full
              transition-all
              duration-300
              ${menuOpen ? "translate-y-[7px] rotate-45" : ""}
            `}
          />

          <span
            className={`
              block
              w-5 h-[2px]
              bg-white
              rounded-full
              transition-all
              duration-300
              ${menuOpen ? "opacity-0 scale-0" : "opacity-100"}
            `}
          />

          <span
            className={`
              block
              w-5 h-[2px]
              bg-white
              rounded-full
              transition-all
              duration-300
              ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}
            `}
          />
        </button>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`
            lg:hidden
            absolute
            top-[calc(100%+12px)]
            left-0
            right-0
            z-[110]
            rounded-2xl
            border border-white/10
            bg-black/95
            backdrop-blur-xl
            p-3
            shadow-2xl
            transition-all
            duration-300
            origin-top
            ${
              menuOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            }
          `}
        >
          <nav>
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink to="/projects" className={mobileNavClass}>
                  <div className="flex items-center justify-between">
                    <span>Projects</span>
                    <span className="text-cyan-300">↗</span>
                  </div>
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={mobileNavClass}>
                  <div className="flex items-center justify-between">
                    <span>About</span>
                    <span className="text-cyan-300">↗</span>
                  </div>
                </NavLink>
              </li>

              <li className="pt-2 mt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleContactClick}
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    bg-white
                    text-black
                    font-medium
                    flex
                    items-center
                    justify-between
                    transition-all
                    duration-300
                    hover:bg-cyan-50
                  "
                >
                  <span>Let's Connect</span>
                  <span>↗</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
