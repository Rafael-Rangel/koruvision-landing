/**
 * KORUVISION Motion System v5 — shared utilities
 * docs/KORUVISION-Motion-System.md
 */
(function (global) {
  const BUILD_END = 0.48;
  const PEAK_END = 0.72;

  const smoothstep = (t) => {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  };
  const smoothrange = (t, a, b) => {
    if (b <= a) return t >= b ? 1 : 0;
    return smoothstep((t - a) / (b - a));
  };
  const lerp = (a, b, t) => a + (b - a) * t;

  function phase(local) {
    if (local < BUILD_END) return { name: "build", t: local / BUILD_END };
    if (local < PEAK_END) return { name: "peak", t: (local - BUILD_END) / (PEAK_END - BUILD_END) };
    return { name: "exit", t: (local - PEAK_END) / (1 - PEAK_END) };
  }

  function elementState(local, enterLo, enterHi, exitLo, exitHi, opts = {}) {
    const { yIn = 24, yOut = -14, scaleIn = 0.92, xOut = 0, rotOut = 0, xIn = 0 } = opts;
    const ph = phase(local);
    if (ph.name === "build") {
      const e = smoothrange(ph.t, enterLo / BUILD_END, enterHi / BUILD_END);
      return { opacity: e, y: yIn * (1 - e), x: xIn * (1 - e), scale: scaleIn + (1 - scaleIn) * e, rot: 0 };
    }
    if (ph.name === "peak") return { opacity: 1, y: 0, x: 0, scale: 1, rot: 0 };
    const x = smoothrange(ph.t, (exitLo - PEAK_END) / (1 - PEAK_END), (exitHi - PEAK_END) / (1 - PEAK_END));
    return {
      opacity: 1 - x * 0.25,
      y: yOut * x,
      x: xOut * x,
      scale: 1 - x * 0.1,
      rot: rotOut * x
    };
  }

  function applyState(el, st) {
    if (!el) return;
    gsap.set(el, { opacity: st.opacity, y: st.y, x: st.x, scale: st.scale, rotation: st.rot });
  }

  function pinSection(id, vhDesktop, vhMobile, scrub, onUpdate) {
    const wrap = document.querySelector(id);
    if (!wrap) return;
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: isMobile ? `+=${vhMobile || Math.round(vhDesktop * 0.6)}%` : `+=${vhDesktop}%`,
      pin: true,
      scrub: isMobile ? (scrub * 0.6) : scrub,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => onUpdate(self.progress, self)
    });
  }

  function staggerReveal(selector, trigger, opts = {}) {
    gsap.from(selector, {
      scrollTrigger: { trigger, start: "top 75%", toggleActions: "play none none reverse" },
      y: opts.y || 40,
      opacity: 0,
      scale: opts.scale || 0.94,
      duration: opts.duration || 0.8,
      stagger: opts.stagger || 0.1,
      ease: "power3.out"
    });
  }

  function counter(el, target, suffix = "") {
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 80%" },
      onUpdate: () => {
        el.textContent = Math.round(obj.val).toLocaleString("pt-BR") + suffix;
      }
    });
  }

  function magnetic(el) {
    if (!el || window.matchMedia("(max-width: 900px)").matches) return;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.35;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.6)" });
    });
  }

  function splitWords(el) {
    if (!el) return [];
    const text = el.textContent;
    el.innerHTML = text.split(/(\s+)/).map((w) =>
      w.trim() ? `<span class="word">${w}</span>` : w
    ).join("");
    return el.querySelectorAll(".word");
  }

  global.KoruMotion = {
    BUILD_END, PEAK_END, smoothstep, smoothrange, lerp, phase,
    elementState, applyState, pinSection, staggerReveal, counter, magnetic, splitWords
  };
})(window);
