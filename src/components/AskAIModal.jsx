import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const containsArabic = (text) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);

const suggestedQuestions = [
  "What AI projects has Hamzah built?",
  "Does Hamzah have RAG experience?",
  "What technologies does Hamzah use?",
  "Tell me about Hamzah's Computer Vision work.",
];

const AskAIModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const turnstileContainerRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);

  const [turnstileToken, setTurnstileToken] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    const maxHeight = 120;
    const newHeight = Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

    if (!siteKey) {
      console.error("Turnstile site key is missing.");
      return undefined;
    }

    let cancelled = false;

    const renderTurnstile = () => {
      if (cancelled || !window.turnstile || !turnstileContainerRef.current) {
        return;
      }

      if (turnstileWidgetIdRef.current !== null) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      }

      turnstileWidgetIdRef.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: siteKey,
          theme: "dark",
          appearance: "interaction-only",
          action: "portfolio_ai",

          callback: (token) => {
            setTurnstileToken(token);
            setError("");
          },

          "expired-callback": () => {
            setTurnstileToken("");
          },

          "error-callback": () => {
            setTurnstileToken("");
          },
        },
      );
    };

    if (window.turnstile) {
      renderTurnstile();
    } else {
      let script = document.querySelector(
        'script[data-turnstile-script="true"]',
      );

      if (!script) {
        script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.dataset.turnstileScript = "true";

        document.head.appendChild(script);
      }

      script.addEventListener("load", renderTurnstile, {
        once: true,
      });
    }

    return () => {
      cancelled = true;

      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.remove(turnstileWidgetIdRef.current);
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [isOpen]);

  const sendMessage = async (question = input) => {
    const cleanMessage = question.trim();

    if (!cleanMessage || isLoading) return;

    if (!turnstileToken) return;

    const history = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const userMessage = {
      role: "user",
      content: cleanMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: cleanMessage,
          history,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate a response.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (requestError) {
      console.error("Ask AI request failed:", requestError);

      setError("I couldn't generate a response right now. Please try again.");
    } finally {
      setIsLoading(false);
      setTurnstileToken("");

      if (window.turnstile && turnstileWidgetIdRef.current !== null) {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        ask-ai-overlay
        fixed inset-0 z-[100]
        flex items-center justify-center
        px-4 py-6
        bg-black/75
        backdrop-blur-md
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-ai-title"
        className="
          ask-ai-panel
          relative
          flex flex-col
          w-full max-w-3xl
          h-[min(760px,90vh)]
          overflow-hidden
          rounded-3xl
          border border-cyan-300/20
          bg-[#050505]
          shadow-[0_0_80px_rgba(34,211,238,0.12)]
        "
      >
        <div
          className="
            flex items-center justify-between
            gap-4
            px-5 md:px-7
            py-5
            border-b border-white/10
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex size-11
                items-center justify-center
                rounded-xl
                border border-cyan-300/25
                bg-cyan-300/[0.07]
                text-cyan-300
                text-xl
                shadow-[0_0_25px_rgba(34,211,238,0.08)]
              "
            >
              ✦
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="ask-ai-title"
                  className="text-white text-lg md:text-xl font-semibold"
                >
                  Ask My AI
                </h2>

                <span
                  className={`
                    size-2
                    rounded-full
                    transition-all duration-300
                    ${
                      turnstileToken
                        ? "bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                        : "bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.6)] animate-pulse"
                    }
                `}
                />
              </div>

              <p className="text-white-50 text-xs md:text-sm mt-1">
                Ask anything about Hamzah&apos;s work, skills, and experience.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close AI assistant"
            className="
              flex size-10
              shrink-0
              items-center justify-center
              rounded-full
              border border-white/10
              text-white-50
              transition-all duration-300
              hover:border-white/20
              hover:bg-white/5
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        <div className="ask-ai-messages flex-1 overflow-y-auto px-5 md:px-7 py-6">
          <div className="flex gap-3 md:gap-4">
            <div
              className="
                flex size-9
                shrink-0
                items-center justify-center
                rounded-full
                border border-cyan-300/20
                bg-cyan-300/[0.06]
                text-cyan-300
              "
            >
              ✦
            </div>

            <div
              className="
                max-w-[85%]
                rounded-2xl rounded-tl-sm
                border border-white/10
                bg-white/[0.035]
                px-5 py-4
              "
            >
              <p className="text-white leading-relaxed">
                Hi! I&apos;m Hamzah&apos;s portfolio AI assistant.
              </p>

              <p className="mt-2 text-white-50 leading-relaxed">
                You can ask me about his AI projects, technical skills,
                experience, education, or how to contact him.
              </p>
            </div>
          </div>

          {messages.length === 0 && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white-50">
                Suggested Questions
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={!turnstileToken || isLoading}
                    onClick={() => sendMessage(question)}
                    className="
                      disabled:opacity-50
                      disabled:cursor-wait
                      text-left
                      rounded-xl
                      border border-white/10
                      bg-white/[0.02]
                      px-4 py-3
                      text-sm
                      text-white-50
                      transition-all duration-300
                      hover:border-cyan-300/25
                      hover:bg-cyan-300/[0.035]
                      hover:text-white
                    "
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-7 space-y-5">
            {messages.map((message, index) => {
              const isUser = message.role === "user";
              const isArabic = containsArabic(message.content);

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <div
                      className="
                        flex size-9
                        shrink-0
                        items-center justify-center
                        rounded-full
                        border border-cyan-300/20
                        bg-cyan-300/[0.06]
                        text-cyan-300
                      "
                    >
                      ✦
                    </div>
                  )}

                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    lang={isArabic ? "ar" : "en"}
                    className={`
                        selectable
                        ask-ai-message-content
                        max-w-[85%]
                        whitespace-pre-wrap
                        rounded-2xl
                        px-5 py-4
                        leading-relaxed
                        ${
                          isUser
                            ? `
                            rounded-tr-sm
                            border border-cyan-300/20
                            bg-cyan-300/[0.08]
                            text-white
                            `
                            : `
                            rounded-tl-sm
                            border border-white/10
                            bg-white/[0.035]
                            text-white-50
                            `
                        }
                    `}
                  >
                    {isUser ? (
                      message.content
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0 leading-relaxed text-start">
                              {children}
                            </p>
                          ),

                          strong: ({ children }) => (
                            <strong className="font-semibold text-white">
                              {children}
                            </strong>
                          ),

                          ul: ({ children }) => (
                            <ul className="my-3 space-y-2 list-disc ps-5 text-start">
                              {children}
                            </ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="my-3 space-y-3 list-decimal ps-5 text-start">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="pl-1 leading-relaxed">{children}</li>
                          ),

                          code: ({ children }) => (
                            <code className="rounded-md border border-cyan-300/10 bg-cyan-300/[0.06] px-1.5 py-0.5 text-sm text-cyan-200">
                              {children}
                            </code>
                          ),

                          a: ({ href, children }) => {
                            const isContactLink =
                              href === "#contact" ||
                              href?.endsWith("/#contact") ||
                              href?.endsWith("#contact");
                            const isEmailLink = href?.startsWith("mailto:");

                            return (
                              <a
                                href={href}
                                target={
                                  isContactLink || isEmailLink
                                    ? undefined
                                    : "_blank"
                                }
                                rel={
                                  isContactLink || isEmailLink
                                    ? undefined
                                    : "noreferrer"
                                }
                                onClick={(event) => {
                                  if (!isContactLink) return;

                                  event.preventDefault();

                                  onClose();

                                  window.setTimeout(() => {
                                    document
                                      .querySelector("#contact")
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                      });
                                  }, 150);
                                }}
                                className="
        selectable
        text-cyan-300
        underline
        decoration-cyan-300/40
        underline-offset-4
        break-all
        transition-colors
        hover:text-cyan-200
      "
                              >
                                {children}
                              </a>
                            );
                          },
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex size-9
                    shrink-0
                    items-center justify-center
                    rounded-full
                    border border-cyan-300/20
                    bg-cyan-300/[0.06]
                    text-cyan-300
                  "
                >
                  ✦
                </div>

                <div
                  className="
                    flex items-center gap-1.5
                    rounded-2xl rounded-tl-sm
                    border border-white/10
                    bg-white/[0.035]
                    px-5 py-4
                  "
                >
                  <span className="ask-ai-dot" />
                  <span className="ask-ai-dot" />
                  <span className="ask-ai-dot" />
                </div>
              </div>
            )}

            {error && (
              <div
                className="
                  ml-auto
                  max-w-[85%]
                  rounded-xl
                  border border-red-400/20
                  bg-red-400/[0.05]
                  px-4 py-3
                  text-sm
                  text-red-200
                "
              >
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-white/10 p-4 md:p-5">
          <form
            className="
              flex items-end gap-3
              rounded-2xl
              border border-white/10
              bg-white/[0.025]
              p-2
              transition-colors duration-300
              focus-within:border-cyan-300/30
            "
            onSubmit={handleSubmit}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Hamzah..."
              rows={1}
              disabled={isLoading}
              className="
                ask-ai-textarea
                selectable
                flex-1
                resize-none
                bg-transparent
                px-3 py-3
                min-h-[48px]
                max-h-[120px]
                overflow-y-hidden
                text-white
                leading-6
                placeholder:text-white-50
                outline-none
                disabled:opacity-60
              "
            />

            <button
              type="submit"
              disabled={!input.trim() || isLoading || !turnstileToken}
              aria-label="Send message"
              className="
                ask-ai-send
                group
                relative
                flex size-12
                shrink-0
                items-center justify-center
                overflow-hidden
                rounded-2xl
                border border-cyan-300/30
                bg-black
                transition-all duration-300
                hover:scale-105
                active:scale-95
                disabled:pointer-events-none
                disabled:opacity-40
              "
            >
              <span className="ask-ai-send-glow" />

              <span
                className="
                  relative z-10
                  flex size-9
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-cyan-200
                  via-cyan-400
                  to-purple-500
                  text-black
                  shadow-[0_0_25px_rgba(34,211,238,0.35)]
                  transition-all duration-300
                  group-hover:shadow-[0_0_40px_rgba(34,211,238,0.65)]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="
                    size-5
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                  aria-hidden="true"
                >
                  <path
                    d="M4 12L20 4L15 20L11.5 13L4 12Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </form>
          <div ref={turnstileContainerRef} className="flex justify-center" />

          <p className="mt-3 text-center text-[11px] text-white-50">
            Enter to send · Shift + Enter for a new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default AskAIModal;
