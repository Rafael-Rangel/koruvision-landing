/**
 * KORUVISION FlowIA Landing — GSAP init S01-S03, S05-S19
 */
(function () {
  "use strict";
  const KM = window.KoruMotion;
  if (!KM || typeof gsap === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(500, 33);

  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const { pinSection, staggerReveal, counter, magnetic, splitWords, elementState, applyState, phase, smoothrange } = KM;

  /* —— Nav scroll —— */
  const nav = document.querySelector(".site-nav");
  ScrollTrigger.create({
    start: 80,
    onUpdate: (self) => nav?.classList.toggle("scrolled", self.scroll() > 40)
  });

  document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id?.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* —— Global Data River —— */
  const riverPath = document.getElementById("riverGlobalPath");
  if (riverPath) {
    const len = riverPath.getTotalLength();
    riverPath.style.strokeDasharray = len;
    riverPath.style.strokeDashoffset = len;
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      onUpdate: (self) => {
        riverPath.style.strokeDashoffset = len * (1 - self.progress);
        const p = self.progress;
        if (p < 0.08) riverPath.style.stroke = "url(#riverGlobalGrad)";
        else if (p < 0.18) riverPath.style.stroke = "url(#riverDangerGrad)";
        else riverPath.style.stroke = "url(#riverGlobalGrad)";
      }
    });
  }

  /* —— S01 Hero —— */
  (function initS01() {
    const wrap = document.getElementById("s01-pin");
    if (!wrap) return;
    const hl = document.getElementById("s01-headline");
    const words = splitWords(hl);
    const device = document.querySelector(".s01-device");
    const chips = document.querySelectorAll(".s01-chip");
    const canvas = document.getElementById("s01-particles");

    if (canvas && !isMobile) {
      const ctx = canvas.getContext("2d");
      const particles = Array.from({ length: 40 }, () => ({
        x: Math.random(), y: Math.random(),
        r: 1 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002
      }));
      const resize = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      };
      resize();
      window.addEventListener("resize", resize);
      gsap.ticker.add(() => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > 1) p.vx *= -1;
          if (p.y < 0 || p.y > 1) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(178,75,255,0.5)";
          ctx.fill();
        });
      });
    }

    pinSection("#s01-pin", 400, 240, 1.2, (progress) => {
      const local = progress;
      words.forEach((w, i) => {
        const st = elementState(local, 0.04 + i * 0.04, 0.18 + i * 0.04, 0.78, 0.94, { yIn: 30, scaleIn: 0.88 });
        applyState(w, st);
      });
      if (device) {
        const st = elementState(local, 0.12, 0.32, 0.80, 0.96, { yIn: 60, scaleIn: 0.85 });
        gsap.set(device, { opacity: st.opacity, y: st.y, scale: st.scale, rotateY: -8 + local * 4 });
      }
      chips.forEach((c, i) => {
        const st = elementState(local, 0.28 + i * 0.08, 0.40 + i * 0.08, 0.82, 0.95, { yIn: 20, xOut: i ? -30 : 30 });
        applyState(c, st);
      });
    });

    document.querySelectorAll("#s01-pin .btn-primary, #s19 .btn-primary").forEach(magnetic);
  })();

  /* —— S02 Problem —— */
  (function initS02() {
    const stat = document.getElementById("s02-stat-val");
    pinSection("#s02-pin", 280, 180, 1, (progress) => {
      document.querySelectorAll(".pain-card").forEach((card, i) => {
        const st = elementState(progress, 0.06 + i * 0.08, 0.22 + i * 0.08, 0.78, 0.94, { yIn: 40, scaleIn: 0.88 });
        gsap.set(card, { opacity: st.opacity, y: st.y, scale: st.scale, rotateX: (1 - st.opacity) * 8 });
      });
      if (stat) stat.textContent = Math.round(smoothrange(progress, 0.1, 0.5) * 78) + "%";
    });
  })();

  /* —— S03 Bridge —— */
  (function initS03() {
    const rings = document.querySelectorAll(".s03-tunnel circle");
    pinSection("#s03-pin", 350, 220, 1.2, (progress) => {
      rings.forEach((r, i) => {
        const s = 0.5 + progress * (2 + i * 0.3);
        gsap.set(r, { scale: s, opacity: 0.15 + progress * 0.35, transformOrigin: "50% 50%" });
      });
      document.querySelectorAll(".pillar-card").forEach((p, i) => {
        const st = elementState(progress, 0.12 + i * 0.06, 0.28 + i * 0.06, 0.80, 0.94, { yIn: 30, scaleIn: 0.9 });
        applyState(p, st);
      });
    });
  })();

  /* —— S05 Portals —— */
  (function initS05() {
    pinSection("#s05-pin", 360, 220, 1, (progress) => {
      document.querySelectorAll(".portal-mono").forEach((p, i) => {
        const st = elementState(progress, 0.08 + i * 0.12, 0.28 + i * 0.12, 0.82, 0.96, { yIn: 40, scaleIn: 0.9 });
        gsap.set(p, { opacity: st.opacity, y: st.y, scale: st.scale, z: i * 20 - 20 });
      });
      const qr = document.querySelector(".s05-qr");
      if (qr) gsap.set(qr, { opacity: smoothrange(progress, 0.2, 0.5), scale: 0.8 + smoothrange(progress, 0.2, 0.5) * 0.2 });
    });
  })();

  /* —— S06 Agents horizontal —— */
  (function initS06() {
    const track = document.querySelector(".s06-track");
    if (!track) return;
    const cards = track.children.length;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: "none",
      scrollTrigger: {
        trigger: "#s06-pin",
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
    document.querySelectorAll(".agent-card-lg").forEach((c, i) => {
      gsap.from(c, {
        scrollTrigger: { trigger: "#s06-pin", start: "top 80%" },
        opacity: 0, x: 40, delay: i * 0.05, duration: 0.6
      });
    });
    const toggle = document.querySelector(".s06-toggle");
    toggle?.addEventListener("click", () => toggle.classList.toggle("on"));
  })();

  /* —— S07 Inbox —— */
  (function initS07() {
    pinSection("#s07-pin", 280, 180, 1, (progress) => {
      document.querySelectorAll(".inbox-col").forEach((col, i) => {
        const st = elementState(progress, 0.06 + i * 0.1, 0.22 + i * 0.1, 0.85, 0.97, { yIn: 24 });
        applyState(col, st);
      });
      document.querySelectorAll(".callout").forEach((c, i) => {
        const st = elementState(progress, 0.2 + i * 0.08, 0.36 + i * 0.08, 0.82, 0.94, { xOut: 30 });
        applyState(c, st);
      });
    });
  })();

  /* —— S08 Funnel —— */
  (function initS08() {
    const fly = document.getElementById("s08-fly-card");
    const cols = document.querySelectorAll(".s08-col");
    const counterEl = document.getElementById("s08-counter");
    pinSection("#s08-pin", 320, 200, 1.2, (progress) => {
      cols.forEach((col, i) => {
        const st = elementState(progress, 0.06 + i * 0.06, 0.20 + i * 0.06, 0.85, 0.96, { yIn: 20 });
        applyState(col, st);
      });
      if (fly) {
        const t = smoothrange(progress, 0.15, 0.75);
        const idx = Math.min(3, Math.floor(t * 4));
        const col = cols[idx];
        if (col) {
          const r = col.getBoundingClientRect();
          const wrap = document.getElementById("s08-kanban-wrap");
          const wr = wrap?.getBoundingClientRect();
          if (wr) {
            gsap.set(fly, {
              opacity: t > 0.1 ? 1 : 0,
              left: r.left - wr.left + 12,
              top: r.top - wr.top + 40,
              position: "absolute"
            });
          }
        }
      }
      if (counterEl) counterEl.textContent = "R$ " + Math.round(smoothrange(progress, 0.3, 0.7) * 2400).toLocaleString("pt-BR");
    });
  })();

  /* —— S09 Workflow —— */
  (function initS09() {
    const path = document.getElementById("s09-wf-path");
    pinSection("#s09-pin", 300, 180, 1, (progress) => {
      if (path) {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len * (1 - progress);
      }
      document.querySelectorAll(".wf-node").forEach((n, i) => {
        const st = elementState(progress, 0.08 + i * 0.1, 0.24 + i * 0.1, 0.85, 0.96, { scaleIn: 0.8 });
        applyState(n, st);
      });
    });
  })();

  /* —— S10 Constellation —— */
  (function initS10() {
    const nodes = document.querySelectorAll(".star-node");
    gsap.from(nodes, {
      scrollTrigger: { trigger: "#s10", start: "top 70%" },
      scale: 0, opacity: 0, duration: 0.5, stagger: 0.06, ease: "back.out(1.4)"
    });
  })();

  /* —— S11 Slider —— */
  (function initS11() {
    const after = document.querySelector(".s11-panel.after");
    const handle = document.querySelector(".s11-handle");
    let pct = 30;
    function setPct(v) {
      pct = Math.max(5, Math.min(95, v));
      if (after) after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      if (handle) handle.style.left = pct + "%";
    }
    setPct(30);
    if (handle && !isMobile) {
      let dragging = false;
      handle.addEventListener("mousedown", () => { dragging = true; });
      window.addEventListener("mouseup", () => { dragging = false; });
      window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        const wrap = handle.parentElement;
        const r = wrap.getBoundingClientRect();
        setPct(((e.clientX - r.left) / r.width) * 100);
      });
    }
    pinSection("#s11-pin", 280, 180, 1, (progress) => {
      if (progress > 0.6) setPct(30 + smoothrange(progress, 0.6, 0.95) * 40);
    });
  })();

  /* —— S12 Cases horizontal —— */
  (function initS12() {
    const track = document.querySelector(".s12-track");
    if (!track) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + 80),
      ease: "none",
      scrollTrigger: {
        trigger: "#s12-pin",
        start: "top top",
        end: "+=350%",
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
      }
    });
  })();

  /* —— S13 Social —— */
  (function initS13() {
    counter(document.getElementById("s13-c1"), 2400, "+");
    counter(document.getElementById("s13-c2"), 98, "%");
    counter(document.getElementById("s13-c3"), 47, "M");
    counter(document.getElementById("s13-c4"), 12, "min");
    const mq = document.querySelector(".marquee-track");
    if (mq) {
      const clone = mq.innerHTML;
      mq.innerHTML = clone + clone;
    }
  })();

  /* —— S14 Orbit —— */
  (function initS14() {
    const sats = document.querySelectorAll(".s14-sat");
    pinSection("#s14-pin", 280, 180, 1, (progress) => {
      sats.forEach((s, i) => {
        const angle = progress * Math.PI * 2 + (i / sats.length) * Math.PI * 2;
        const rx = 200 + (i % 3) * 40;
        const ry = 160 + (i % 2) * 30;
        gsap.set(s, {
          left: `calc(50% + ${Math.cos(angle) * rx}px - 24px)`,
          top: `calc(50% + ${Math.sin(angle) * ry}px - 24px)`,
          opacity: elementState(progress, 0.05 + i * 0.03, 0.2 + i * 0.03, 0.85, 0.96).opacity
        });
      });
    });
  })();

  /* —— S15 Agency —— */
  (function initS15() {
    const mrr = document.getElementById("s15-mrr");
    pinSection("#s15-pin", 300, 200, 1, (progress) => {
      document.querySelectorAll(".tenant-chip").forEach((t, i) => {
        const st = elementState(progress, 0.1 + i * 0.05, 0.28 + i * 0.05, 0.85, 0.96, { scaleIn: 0.85 });
        applyState(t, st);
      });
      if (mrr) mrr.textContent = "R$ " + Math.round(smoothrange(progress, 0.2, 0.6) * 89000).toLocaleString("pt-BR");
    });
  })();

  /* —— S16 Shield —— */
  (function initS16() {
    const shield = document.getElementById("s16-shield-path");
    if (shield) {
      const len = shield.getTotalLength();
      shield.style.strokeDasharray = len;
      shield.style.strokeDashoffset = len;
      ScrollTrigger.create({
        trigger: "#s16",
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        onUpdate: (self) => { shield.style.strokeDashoffset = len * (1 - self.progress); }
      });
    }
    staggerReveal(".badge-pill", "#s16", { stagger: 0.08 });
  })();

  /* —— S17 Pricing —— */
  (function initS17() {
    gsap.from(".price-card", {
      scrollTrigger: { trigger: "#s17", start: "top 75%" },
      y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out"
    });
    const toggle = document.getElementById("s17-toggle");
    const prices = document.querySelectorAll("[data-monthly]");
    toggle?.addEventListener("click", () => {
      toggle.classList.toggle("on");
      const annual = toggle.classList.contains("on");
      prices.forEach((p) => {
        p.textContent = annual ? p.dataset.annual : p.dataset.monthly;
      });
    });
    document.querySelectorAll("#s17 .btn-primary").forEach(magnetic);
  })();

  /* —— S18 FAQ —— */
  (function initS18() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector(".faq-a");
      q?.addEventListener("click", () => {
        const open = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach((i) => {
          i.classList.remove("open");
          gsap.to(i.querySelector(".faq-a"), { height: 0, duration: 0.35 });
        });
        if (!open) {
          item.classList.add("open");
          gsap.to(a, { height: "auto", duration: 0.4, ease: "power2.out" });
        }
      });
    });
    const search = document.getElementById("faq-search");
    search?.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      document.querySelectorAll(".faq-item").forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = !q || text.includes(q) ? "" : "none";
      });
    });
  })();

  /* —— S19 CTA —— */
  (function initS19() {
    const hl = document.getElementById("s19-headline");
    const words = splitWords(hl);
    pinSection("#s19-pin", 350, 220, 1.2, (progress) => {
      words.forEach((w, i) => {
        const st = elementState(progress, 0.04 + i * 0.03, 0.2 + i * 0.03, 0.82, 0.96, { yIn: 24, scaleIn: 0.9 });
        applyState(w, st);
      });
      gsap.set(".s19-shockwave circle", {
        scale: 1 + progress * 0.5,
        opacity: 0.3 * (1 - progress * 0.5),
        transformOrigin: "50% 50%"
      });
    });
    document.querySelectorAll("#s19-pin .btn-primary").forEach(magnetic);
  })();

  /* —— Init S04 + refresh —— */
  if (typeof initS04 === "function") initS04();

  /* Global cursor glow */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && !isMobile) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }

  ScrollTrigger.refresh();
})();
