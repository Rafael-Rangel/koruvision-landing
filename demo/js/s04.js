/** S04 Demo — KORUVISION Motion System */
function initS04() {
  if (!document.getElementById("s04-pin-wrap")) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(500, 33);

  const ACTS = [
    { title: "Lead chega no WhatsApp", desc: "Nova mensagem. A IA detecta intenção de compra em segundos — antes de você abrir o app." },
    { title: "IA responde com personalidade", desc: "Tom humano, delay natural. Qualificação automática enquanto o lead ainda digita." },
    { title: "Funil CRM em movimento", desc: "Maria entra qualificada no Kanban. O card viaja pelo pipeline com um gesto seu." },
    { title: "Agendamento automático", desc: "Evento criado no calendário. Lembrete enviado — zero intervenção manual." },
    { title: "Visão completa do negócio", desc: "Pipeline, conversões e métricas em tempo real. Tudo num único painel." }
  ];

  const CAM_CONFIGS = [
    { z: -40, rx: 10, ry: -14, sc: 0.92 },
    { z: 50, rx: 4, ry: -6, sc: 1.04 },
    { z: 80, rx: -6, ry: 10, sc: 1.08 },
    { z: 35, rx: 8, ry: -8, sc: 1.02 },
    { z: -30, rx: -3, ry: 2, sc: 0.90 }
  ];

  const isMobile = window.matchMedia("(max-width: 900px)").matches;
  const pinAmount = isMobile ? "+=380%" : "+=620%";
  

  /* Motion System — docs/KORUVISION-Motion-System.md */
  const BUILD_END = 0.48;
  const PEAK_END  = 0.72;

  const smoothstep = (t) => {
    t = Math.max(0, Math.min(1, t));
    return t * t * (3 - 2 * t);
  };
  const smoothrange = (t, a, b) => smoothstep((t - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;

  function phase(local) {
    if (local < BUILD_END) return { name: "build", t: local / BUILD_END };
    if (local < PEAK_END)  return { name: "peak",  t: (local - BUILD_END) / (PEAK_END - BUILD_END) };
    return { name: "exit", t: (local - PEAK_END) / (1 - PEAK_END) };
  }

  /** Entrada → permanência no peak → saída com transform (não fade seco) */
  function elementState(local, enterLo, enterHi, exitLo, exitHi, opts = {}) {
    const { yIn = 24, yOut = -14, scaleIn = 0.92, xOut = 0, rotOut = 0 } = opts;
    const ph = phase(local);

    if (ph.name === "build") {
      const e = smoothrange(ph.t, enterLo / BUILD_END, enterHi / BUILD_END);
      return { opacity: e, y: yIn * (1 - e), x: 0, scale: scaleIn + (1 - scaleIn) * e, rot: 0 };
    }
    if (ph.name === "peak") {
      return { opacity: 1, y: 0, x: 0, scale: 1, rot: 0 };
    }
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
    gsap.set(el, {
      opacity: st.opacity,
      y: st.y,
      x: st.x,
      scale: st.scale,
      rotation: st.rot
    });
  }

  const actNav = document.getElementById("actNav");
  ACTS.forEach(() => {
    const p = document.createElement("div");
    p.className = "act-pip";
    actNav.appendChild(p);
  });

  const calGrid = document.getElementById("calGrid");
  for (let i = 1; i <= 28; i++) {
    const c = document.createElement("div");
    c.className = "cal-cell";
    c.textContent = i;
    calGrid.appendChild(c);
  }

  const layerVoid = document.getElementById("layerVoid");
  if (layerVoid) {
    layerVoid.style.background = "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(178,75,255,0.22), transparent 60%), linear-gradient(165deg, #0A0E1C, #010208)";
  }

  const screens = [...document.querySelectorAll(".ui-screen")];
  const pips = [...document.querySelectorAll(".act-pip")];
  const actTitle = document.getElementById("actTitle");
  const actDesc = document.getElementById("actDesc");
  const actCopyWrap = document.getElementById("actCopyWrap");
  const actNum = document.getElementById("actNum");
  const ctaBtn = document.getElementById("ctaBtn");
  const ringFg = document.getElementById("ringFg");
  const riverPath = document.getElementById("riverPath");
  const riverLen = riverPath.getTotalLength();
  riverPath.style.strokeDasharray = riverLen;
  riverPath.style.strokeDashoffset = riverLen;

  const camera = document.getElementById("camera");
  const deviceStack = document.getElementById("deviceStack");
  const setCamera = gsap.quickSetter(camera, "transform");
  const setDeviceStack = gsap.quickSetter(deviceStack, "transform");

  const FLOAT_PANELS = [
    { el: document.getElementById("fpNotif"), acts: [0, 1], enter: 0.40 },
    { el: document.getElementById("fpIa"), acts: [1, 2], enter: 0.42 },
    { el: document.getElementById("fpPipeline"), acts: [2, 3, 4], enter: 0.38 },
    { el: document.getElementById("fpMetric"), acts: [4], enter: 0.48 }
  ];

  let lastCopyAct = -1;
  let copyFadeTimer = null;
  let kanbanLayout = null;
  let kanbanPathEl = null;
  let displayMetrics = [0, 0];
  let parX = 0, parY = 0;
  let scrollState = { act: 0, local: 0, phaseName: "build" };
  let barHoverScale = [1, 1, 1, 1, 1, 1];
  let globalProgress = 0;
  let floatPhase = 0;

  const stageZone = document.getElementById("stageZone");
  const cursorGlow = document.getElementById("cursorGlow");

  function updateDepthParallax(progress, cam) {
    gsap.set("#layerGrid", {
      y: progress * 30,
      rotateX: 68 + cam.rx * 0.3,
      x: parX * 0.15
    });
    gsap.set("#layerFogFar", { y: progress * -20 + parY * 0.2, x: parX * 0.25 });
    gsap.set("#layerFogNear", { x: parX * 0.45, y: parY * 0.35 });
    gsap.set("#layerVoid", { scale: 1.55 + progress * 0.05, y: progress * 10 });
  }

  function updateFloatPanels(act, local) {
    FLOAT_PANELS.forEach((fp) => {
      if (!fp.el) return;
      const active = fp.acts.includes(act);
      let op = 0;
      if (active) {
        const ph = phase(local);
        if (ph.name === "build") op = smoothrange(local, fp.enter, fp.enter + 0.14);
        else if (ph.name === "peak") op = 1;
        else op = 1 - smoothrange(ph.t, 0, 0.45);
      }
      fp.el.style.opacity = op;
    });
  }

  function updateOrbParallax() {
    if (isMobile) return;
    document.querySelectorAll(".float-orb").forEach((orb, i) => {
      const d = +(orb.dataset.depth || -100);
      const bob = Math.sin(floatPhase + i * 1.4) * 12;
      const sway = Math.cos(floatPhase * 0.75 + i * 0.8) * 10;
      gsap.set(orb, {
        z: d,
        x: sway + parX * (0.15 + i * 0.05),
        y: bob + parY * 0.12 + globalProgress * 6
      });
    });
    document.querySelectorAll(".float-panel").forEach((p, i) => {
      if (parseFloat(p.style.opacity || 0) < 0.08) return;
      const z = +(p.dataset.z || 140);
      gsap.set(p, {
        z,
        y: Math.sin(floatPhase + i * 1.1) * 6,
        x: Math.cos(floatPhase * 0.65 + i) * 4 + parX * 0.08
      });
    });
  }

  function isPeakExplore() {
    return scrollState.phaseName === "peak" && !isMobile;
  }

  function measureKanban() {
    const scr = screens[2];
    const body = scr?.querySelector(".ui-body");
    if (!body) return;
    const prev = scr.style.opacity;
    scr.style.opacity = "1";
    const bodyRect = body.getBoundingClientRect();
    const cols = ["colQual", "colProp", "colFech"].map((id) => {
      const el = document.getElementById(id);
      const r = el.getBoundingClientRect();
      return { x: r.left - bodyRect.left + 8, y: r.top - bodyRect.top + 36 };
    });
    scr.style.opacity = prev;
    kanbanLayout = cols;

    kanbanPathEl = document.getElementById("kanbanMotionPath");
    const svg = document.getElementById("kanbanPathSvg");
    if (kanbanPathEl && svg && cols.length === 3) {
      svg.setAttribute("width", bodyRect.width);
      svg.setAttribute("height", bodyRect.height);
      const [c0, c1, c2] = cols;
      const cardW = bodyRect.width * 0.22;
      const d = [
        `M ${c0.x + cardW * 0.4} ${c0.y}`,
        `C ${c0.x + cardW * 0.4} ${c0.y - 48}`,
        `${c1.x + cardW * 0.4} ${c1.y - 40}`,
        `${c1.x + cardW * 0.4} ${c1.y}`,
        `S ${c2.x + cardW * 0.4} ${c2.y - 36}`,
        `${c2.x + cardW * 0.4} ${c2.y}`
      ].join(" ");
      kanbanPathEl.setAttribute("d", d);
    }
  }

  function pointOnKanbanPath(t) {
    if (!kanbanPathEl) return null;
    const len = kanbanPathEl.getTotalLength();
    if (!len) return null;
    const pt = kanbanPathEl.getPointAtLength(len * Math.max(0, Math.min(1, t)));
    const cardW = kanbanPathEl.ownerSVGElement
      ? kanbanPathEl.ownerSVGElement.clientWidth * 0.22
      : 60;
    return { x: pt.x - cardW * 0.15, y: pt.y - 12 };
  }

  function updateKanbanPathReveal(local) {
    if (!kanbanPathEl) return;
    const ph = phase(local);
    let op = 0;
    let dash = 1;
    if (ph.name === "build") {
      op = smoothrange(local, 0.20, 0.40) * 0.55;
      dash = smoothrange(local, 0.22, 0.55);
    } else if (ph.name === "peak") {
      op = 0.55;
      dash = 1;
    } else {
      op = 0.55 * (1 - smoothrange(ph.t, 0, 0.5));
      dash = 1;
    }
    const len = kanbanPathEl.getTotalLength() || 200;
    kanbanPathEl.style.opacity = op;
    kanbanPathEl.style.strokeDasharray = len;
    kanbanPathEl.style.strokeDashoffset = len * (1 - dash);
  }

  function getCameraAt(actF) {
    const idx = Math.min(CAM_CONFIGS.length - 2, Math.max(0, Math.floor(actF)));
    const blend = smoothstep(actF - idx);
    const a = CAM_CONFIGS[idx];
    const b = CAM_CONFIGS[idx + 1];
    const local = actF - Math.floor(actF);
    const ph = phase(local);

    let drift = 0;
    if (ph.name === "build") drift = smoothrange(ph.t, 0, 1) * 1.5;
    else if (ph.name === "exit")  drift = smoothrange(ph.t, 0, 1) * 1.5;

    return {
      z: lerp(a.z, b.z, blend),
      rx: lerp(a.rx, b.rx, blend) + (ph.name === "peak" ? 0 : drift * 0.4),
      ry: lerp(a.ry, b.ry, blend) + (ph.name === "peak" ? 0 : drift * 0.6),
      sc: lerp(a.sc, b.sc, blend)
    };
  }

  /** Tela visível: entrada breve → peak longo → saída com overlap à próxima */
  function screenOpacity(index, actF) {
    const peakStart = index + 0.05;
    const peakEnd   = index + 0.74;
    const end       = index + 1.0;

    if (actF < index) return 0;
    if (actF >= end) return 0;
    if (actF < peakStart) return smoothrange(actF, index, peakStart);
    if (actF <= peakEnd) return 1;
    return 1 - smoothrange(actF, peakEnd, end);
  }

  /** Morph de tela saindo: escala + perspectiva em vez de sumir */
  function screenExitTransform(index, actF) {
    const local = actF - index;
    if (local < PEAK_END || local >= 1) return { scale: 1, y: 0, rotY: 0, filter: 0 };
    const ph = phase(local);
    if (ph.name !== "exit") return { scale: 1, y: 0, rotY: 0, filter: 0 };
    const x = smoothstep(ph.t);
    return {
      scale: 1 - x * 0.06,
      y: -8 * x,
      rotY: -6 * x,
      filter: x * 4
    };
  }

  function updateCopy(i, local) {
    actNum.textContent = i + 1;
    pips.forEach((p, j) => {
      p.classList.remove("active", "done");
      if (j < i) p.classList.add("done");
      if (j === i) {
        p.classList.add("active");
        p.style.setProperty("--fill", local);
      }
    });

    if (i !== lastCopyAct) {
      if (lastCopyAct === -1) {
        actTitle.textContent = ACTS[i].title;
        actDesc.textContent = ACTS[i].desc;
      } else {
        clearTimeout(copyFadeTimer);
        actCopyWrap.classList.add("is-fading");
        copyFadeTimer = setTimeout(() => {
          actTitle.textContent = ACTS[i].title;
          actDesc.textContent = ACTS[i].desc;
          actCopyWrap.classList.remove("is-fading");
        }, 180);
      }
      lastCopyAct = i;
    }

    const ctaSt = elementState(local, 0.50, 0.62, 0.90, 1.0, { yIn: 12, yOut: 0 });
    if (i === 4) {
      ctaBtn.style.opacity = ctaSt.opacity;
      if (scrollState.phaseName !== "peak") {
        gsap.set(ctaBtn, { y: ctaSt.y, x: 0 });
      }
      ctaBtn.style.pointerEvents = ctaSt.opacity > 0.6 ? "auto" : "none";
    } else {
      ctaBtn.style.opacity = 0;
      ctaBtn.style.pointerEvents = "none";
      gsap.set(ctaBtn, { x: 0, y: 0 });
    }
  }

  function updateScreens(actF) {
    screens.forEach((s, j) => {
      const op = screenOpacity(j, actF);
      const ex = screenExitTransform(j, actF);
      s.style.opacity = op;
      s.style.transform = `scale(${ex.scale}) translateY(${ex.y}px) rotateY(${ex.rotY}deg)`;
      s.style.filter = ex.filter ? `blur(${ex.filter}px)` : "none";
      s.classList.toggle("visible", op > 0.5);
    });
  }

  function updateAct0(local) {
    const header = document.querySelector('[data-act="0"] .ui-header');
    const status = document.querySelector('[data-act="0"] .ui-status');
    const ph = phase(local);
    applyState(status, elementState(local, 0.04, 0.14, 0.80, 0.94, { yIn: 10 }));
    applyState(header, elementState(local, 0.08, 0.20, 0.82, 0.96, { yIn: 16 }));

    const badge = document.getElementById("badgeNew");
    applyState(badge, elementState(local, 0.16, 0.28, 0.78, 0.92, { scaleIn: 0.6, yOut: -20, xOut: 40 }));

    document.querySelectorAll('[data-act="0"] .bubble').forEach((b, j) => {
      if (ph.name === "peak" && b.classList.contains("explore-hover")) return;
      if (ph.name === "peak") {
        gsap.set(b, { opacity: 1, y: 0, scale: 1, rotation: 0 });
        return;
      }
      applyState(b, elementState(local, 0.20 + j * 0.12, 0.34 + j * 0.12, 0.80 + j * 0.04, 0.96, {
        yOut: -12, xOut: 15 * (j ? 1 : -1), rotOut: j ? 3 : -2
      }));
    });

    const chipSt = elementState(local, 0.36, 0.46, 0.76, 0.90, { yOut: -30, xOut: 55, scaleIn: 0.85 });
    gsap.set("#chip1", { opacity: chipSt.opacity, x: chipSt.x, y: chipSt.y, scale: chipSt.scale });
  }

  function updateAct1(local) {
    const ph = phase(local);
    const agentCard = document.getElementById("agentCard");
    if (!(ph.name === "peak" && agentCard.classList.contains("explore-hover"))) {
      applyState(agentCard, elementState(local, 0.06, 0.22, 0.80, 0.94, { yIn: 28, xOut: -20, yOut: -10 }));
    }

    const tagSt = elementState(local, 0.28, 0.40, 0.82, 0.95, { scaleIn: 0.7, yOut: -8 });
    gsap.set("#intentTag", { opacity: tagSt.opacity, scale: tagSt.scale, y: tagSt.y });

    let typeOp = 0;
    if (ph.name === "build") typeOp = smoothrange(ph.t, 0.22 / BUILD_END, 0.36 / BUILD_END);
    else if (ph.name === "peak") typeOp = 0;
    else typeOp = 1 - smoothrange(ph.t, 0.05, 0.35);
    gsap.set("#typing", { opacity: typeOp });

    const reply = document.querySelector('[data-act="1"] .bubble');
    if (ph.name === "peak") {
      gsap.set(reply, { opacity: 1, y: 0, scale: 1 });
    } else {
      applyState(reply, elementState(local, 0.38, 0.46, 0.84, 0.97, { yIn: 14, yOut: -18, xOut: 25, rotOut: 2 }));
    }
  }

  function updateAct2(local) {
    const fly = document.getElementById("flyCard");
    if (!kanbanLayout) measureKanban();
    if (!kanbanLayout) return;

    const ph = phase(local);
    const cols = document.querySelectorAll(".k-col");
    cols.forEach((col, j) => {
      if (ph.name === "peak" && col.classList.contains("explore-hover")) return;
      applyState(col, elementState(local, 0.04 + j * 0.05, 0.16 + j * 0.05, 0.84, 0.97, { yIn: 18, scaleIn: 0.94 }));
      if (ph.name === "peak") gsap.set(col, { opacity: 1, y: 0, scale: 1 });
    });

    updateKanbanPathReveal(local);

    const cardIn = elementState(local, 0.22, 0.34, 0.78, 0.92, { scaleIn: 0.8, yIn: 30 });
    fly.style.display = cardIn.opacity > 0.02 || local > 0.22 ? "block" : "none";

    if (local >= 0.22 && local <= PEAK_END) {
      const pathT = local < 0.55 ? smoothrange(local, 0.22, 0.55) : 1;
      const pt = pointOnKanbanPath(pathT);
      if (pt) {
        const tangent = pathT < 0.99 ? pointOnKanbanPath(pathT + 0.01) : pt;
        const rot = Math.atan2(tangent.y - pt.y, tangent.x - pt.x) * (180 / Math.PI);
        gsap.set(fly, {
          opacity: 1,
          left: pt.x,
          top: pt.y,
          scale: 0.94 + pathT * 0.08,
          rotation: rot * 0.35,
          x: 0,
          y: 0
        });
      }
    } else if (ph.name === "exit") {
      const x = smoothstep(ph.t);
      const endPt = pointOnKanbanPath(1) || { x: 0, y: 0 };
      gsap.set(fly, {
        opacity: 1 - x * 0.2,
        left: endPt.x + 30 * x,
        top: endPt.y - 20 * x,
        scale: 1.02 - x * 0.08,
        rotation: 4 * x,
        x: 0,
        y: 0
      });
    } else {
      const startPt = pointOnKanbanPath(0) || kanbanLayout[0];
      gsap.set(fly, { opacity: cardIn.opacity, left: startPt.x, top: startPt.y, scale: cardIn.scale });
    }

    const chipSt = elementState(local, 0.40, 0.48, 0.80, 0.93, { yOut: -25, xOut: -40 });
    gsap.set("#chip2", { opacity: chipSt.opacity, x: chipSt.x, y: chipSt.y, scale: chipSt.scale });
  }

  function updateAct3(local) {
    applyState("#calHeader", elementState(local, 0.06, 0.18, 0.82, 0.95, { yIn: 12 }));

    document.querySelectorAll(".cal-cell").forEach((cell, j) => {
      const row = Math.floor(j / 7);
      applyState(cell, elementState(local, 0.10 + row * 0.04, 0.22 + row * 0.04, 0.85, 0.97, { yIn: 8, scaleIn: 0.9 }));
    });

    const evSt = elementState(local, 0.32, 0.44, 0.80, 0.94, { scaleIn: 0.88, yOut: -16, xOut: 20 });
    gsap.set("#calEvent", { opacity: evSt.opacity, scale: evSt.scale, y: evSt.y, x: evSt.x });
  }

  function updateAct4(local) {
    const ph = phase(local);
    document.querySelectorAll(".metric").forEach((m, j) => {
      if (ph.name === "peak" && m.classList.contains("explore-hover")) return;
      const st = elementState(local, 0.08 + j * 0.10, 0.24 + j * 0.10, 0.86, 0.98, { yIn: 20, yOut: -10 });
      gsap.set(m, { opacity: st.opacity, y: st.y, scale: st.scale });
      if (ph.name === "peak") gsap.set(m, { opacity: 1, y: 0, scale: 1 });

      const val = m.querySelector(".val");
      const target = +val.dataset.count;
      let targetFrac = 0;
      if (ph.name === "build") targetFrac = smoothrange(ph.t, (0.08 + j * 0.1) / BUILD_END, (0.30 + j * 0.1) / BUILD_END);
      else if (ph.name === "peak") targetFrac = 1;
      else targetFrac = 1;

      displayMetrics[j] = lerp(displayMetrics[j], target * targetFrac, ph.name === "peak" ? 1 : 0.18);
      if (j === 0) val.textContent = "R$ " + Math.round(displayMetrics[j]).toLocaleString("pt-BR");
      else val.textContent = Math.round(displayMetrics[j]) + "%";
    });

    const chartSt = elementState(local, 0.28, 0.40, 0.88, 1.0, { yIn: 16, scaleIn: 0.95 });
    gsap.set("#dashChart", { opacity: chartSt.opacity, y: chartSt.y, scale: chartSt.scale });

    if (ph.name !== "build" || ph.t > 0.5) {
      document.querySelectorAll(".bar").forEach((b, j) => {
        const base = elementState(local, 0.34 + j * 0.05, 0.46 + j * 0.05, 0.92, 1.0, { yIn: 0 }).opacity;
        const hoverMul = barHoverScale[j] || 1;
        gsap.set(b, { scaleY: base * hoverMul });
      });
    }
  }

  const actUpdaters = [updateAct0, updateAct1, updateAct2, updateAct3, updateAct4];

  function render(progress) {
    globalProgress = progress;
    const actF = progress * ACTS.length;
    const i = Math.min(ACTS.length - 1, Math.floor(actF));
    const local = actF - i;
    const cam = getCameraAt(actF);

    setCamera(
      `perspective(2000px) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg) translateZ(${cam.z}px)`
    );
    setDeviceStack(
      `translate(calc(-50% + ${parX * 0.6}px), calc(-50% + ${parY * 0.5}px)) translateZ(90px) scale(${cam.sc}) rotateY(${cam.ry * 0.5}deg) rotateX(${cam.rx * 0.32}deg)`
    );

    updateDepthParallax(progress, cam);
    updateScreens(actF);
    updateCopy(i, local);

    const actLocal = actF - i;
    scrollState = { act: i, local: actLocal, phaseName: phase(actLocal).name };

    stageZone.classList.toggle("peak-explore", isPeakExplore());
    document.body.classList.toggle("peak-explore", isPeakExplore());

    actUpdaters[i](actLocal);
    updateFloatPanels(i, actLocal);

    if (i < ACTS.length - 1 && actLocal > PEAK_END) {
      const nextLocal = Math.max(0, actF - (i + 1));
      if (nextLocal < BUILD_END * 0.6) actUpdaters[i + 1](nextLocal);
    }

    if (riverPath) riverPath.style.strokeDashoffset = riverLen * (1 - progress);
    if (ringFg) ringFg.style.strokeDashoffset = 125.6 * (1 - progress);

    gsap.set("#layerGlow", { opacity: 0.45 + progress * 0.55 });
    gsap.set("#layerGlowGold", { opacity: progress * 0.75 });
  }

  ScrollTrigger.create({
    trigger: "#s04-pin-wrap",
    start: "top top",
    end: pinAmount,
    pin: true,
    scrub: isMobile ? 1.6 : 2.8,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onRefresh: () => {
      kanbanLayout = null;
      measureKanban();
    },
    onUpdate: (self) => render(self.progress)
  });

  window.addEventListener("resize", () => {
    kanbanLayout = null;
    ScrollTrigger.refresh();
  });

  if (!isMobile && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    const qGlow = gsap.quickSetter("#layerGlow", "transform");
    let mx = 0, my = 0, tx = 0, ty = 0;

    document.addEventListener("mousemove", (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
      if (isPeakExplore() && cursorGlow) {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
      }
    });

    gsap.ticker.add(() => {
      floatPhase += 0.014;
      tx += (mx * 12 - tx) * 0.05;
      ty += (my * 8 - ty) * 0.05;
      parX += (mx * 6 - parX) * 0.05;
      parY += (my * 4.5 - parY) * 0.05;
      qGlow(`translate(${tx}px, ${ty}px)`);
      gsap.set("#layerGlowGold", { x: parX * 0.3, y: parY * 0.25 });
      updateOrbParallax();
    });

    /* —— PEAK Explore Mode —— */
    document.querySelectorAll('[data-act="0"] .bubble').forEach((b) => {
      b.addEventListener("mouseenter", () => {
        if (scrollState.act !== 0 || scrollState.phaseName !== "peak") return;
        b.classList.add("explore-hover");
        gsap.to(b, { scale: 1.04, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      });
      b.addEventListener("mouseleave", () => {
        b.classList.remove("explore-hover");
        gsap.to(b, { scale: 1, duration: 0.4, ease: "power2.out" });
      });
    });

    const agentCard = document.getElementById("agentCard");
    agentCard.addEventListener("mouseenter", () => {
      if (scrollState.act !== 1 || scrollState.phaseName !== "peak") return;
      agentCard.classList.add("explore-hover");
      gsap.to(agentCard, { scale: 1.02, y: -4, duration: 0.35, ease: "power2.out" });
    });
    agentCard.addEventListener("mouseleave", () => {
      agentCard.classList.remove("explore-hover");
      gsap.to(agentCard, { scale: 1, y: 0, duration: 0.4, ease: "power2.out" });
    });

    document.querySelectorAll(".k-col").forEach((col) => {
      col.addEventListener("mouseenter", () => {
        if (scrollState.act !== 2 || scrollState.phaseName !== "peak") return;
        col.classList.add("explore-hover");
        gsap.to(col, { scale: 1.04, duration: 0.3, ease: "power2.out" });
      });
      col.addEventListener("mouseleave", () => {
        col.classList.remove("explore-hover");
        gsap.to(col, { scale: 1, duration: 0.35, ease: "power2.out" });
      });
    });

    document.querySelectorAll(".bar").forEach((bar, j) => {
      bar.addEventListener("mouseenter", () => {
        if (scrollState.act !== 4 || scrollState.phaseName !== "peak") return;
        bar.classList.add("explore-hover");
        barHoverScale[j] = 1.18;
        gsap.to(bar, { scaleY: barHoverScale[j], duration: 0.45, ease: "elastic.out(1, 0.55)" });
      });
      bar.addEventListener("mouseleave", () => {
        bar.classList.remove("explore-hover");
        barHoverScale[j] = 1;
        gsap.to(bar, { scaleY: 1, duration: 0.5, ease: "power2.out" });
      });
    });

    document.querySelectorAll(".metric").forEach((m) => {
      m.addEventListener("mouseenter", () => {
        if (scrollState.act !== 4 || scrollState.phaseName !== "peak") return;
        m.classList.add("explore-hover");
        gsap.to(m, { scale: 1.03, duration: 0.3, ease: "power2.out" });
      });
      m.addEventListener("mouseleave", () => {
        m.classList.remove("explore-hover");
        gsap.to(m, { scale: 1, duration: 0.35, ease: "power2.out" });
      });
    });

    document.querySelectorAll(".float-panel").forEach((panel) => {
      panel.addEventListener("mouseenter", () => {
        if (!isPeakExplore()) return;
        gsap.to(panel, { scale: 1.06, z: "+=15", duration: 0.35, ease: "power2.out" });
      });
      panel.addEventListener("mouseleave", () => {
        const z = +(panel.dataset.z || 140);
        gsap.to(panel, { scale: 1, z, duration: 0.45, ease: "power2.out" });
      });
    });

    /* Magnetic CTA — ato 5 peak */
    ctaBtn.classList.add("magnetic-ready");
    ctaBtn.addEventListener("mousemove", (e) => {
      if (scrollState.act !== 4 || scrollState.phaseName !== "peak") return;
      const r = ctaBtn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.38;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.38;
      gsap.to(ctaBtn, { x: dx, y: dy, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    });
    ctaBtn.addEventListener("mouseleave", () => {
      gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.65, ease: "elastic.out(1, 0.6)" });
    });
  }

  requestAnimationFrame(() => {
    measureKanban();
    render(0);
  });
}
