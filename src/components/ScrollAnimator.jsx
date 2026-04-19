import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollAnimator({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    const scan = () => {
      document.querySelectorAll("[data-animate]:not(.is-visible)").forEach((el) => {
        observer.observe(el);
      });
    };

    // Initial scan
    scan();

    // Re-scan when new elements are added to the DOM (e.g. after data loads)
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname]);

  return children;
}
