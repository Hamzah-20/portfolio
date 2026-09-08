import { lazy, Suspense, useEffect, useRef, useState } from "react";

import TitleHeader from "../components/TitleHeader";

const ContactExperience = lazy(
  () => import("../components/models/contact/ContactExperience"),
);

const Contact = () => {
  const formRef = useRef(null);
  const experienceRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [loadExperience, setLoadExperience] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const element = experienceRef.current;

    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadExperience(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "400px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const { sendForm } = await import("@emailjs/browser");

      await sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setStatus("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Let's Build Something Intelligent"
          sub="Open to AI opportunities and research collaborations."
        />

        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your Name</label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity, research idea, or project..."
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" disabled={loading} className="w-full">
                  <div className="cta-button group">
                    <div className="bg-circle" />

                    <p className="text !text-sm md:!text-lg">
                      {loading ? "Sending..." : "Send Message"}
                    </p>

                    <div className="arrow-wrapper !right-3 md:!right-10 !size-8 md:!size-10">
                      <img
                        src="/images/arrow-down.svg"
                        alt="arrow"
                        className="!size-4 md:!size-5"
                      />
                    </div>
                  </div>
                </button>

                {status === "success" && (
                  <p className="text-cyan-300 text-sm">
                    Message sent successfully. I'll get back to you soon.
                  </p>
                )}

                {status === "error" && (
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again.
                  </p>
                )}

                <div className="pt-5 border-t border-white/10 text-center">
                  <p className="text-white-50 text-sm">
                    Prefer email directly?
                  </p>

                  <a
                    href="mailto:hamzahalbasyouni@gmail.com"
                    className="inline-block mt-2 hover:text-cyan-200 transition-colors"
                  >
                    hamzahalbasyouni@gmail.com
                  </a>
                </div>
              </form>
            </div>
          </div>

          <div
            ref={experienceRef}
            className="xl:col-span-7 h-[340px] md:h-[460px] xl:h-auto xl:min-h-96"
          >
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              {loadExperience && (
                <Suspense fallback={null}>
                  <ContactExperience />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
