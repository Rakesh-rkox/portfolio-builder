import { useEffect, useState } from "react";

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Writes scroll progress (0→1) of a tall wrapper into a CSS variable on that element. */
export function useScrollVar(ref, varName = "--hp") {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      el.style.setProperty(varName, clamp(total > 0 ? -r.top / total : 0).toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, varName]);
}

/** Adds .is-in to elements with [data-reveal] when they enter the viewport. */
export function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useTypewriter(text, speed = 28, startDelay = 500) {
  const reduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [n, setN] = useState(reduced ? text.length : 0);
  useEffect(() => {
    if (reduced) return;
    let i = 0, id;
    const t = setTimeout(() => {
      id = setInterval(() => {
        i += 1; setN(i);
        if (i >= text.length) clearInterval(id);
      }, speed);
    }, startDelay);
    return () => { clearTimeout(t); clearInterval(id); };
  }, [text, speed, startDelay, reduced]);
  return { typed: text.slice(0, n), done: n >= text.length };
}
