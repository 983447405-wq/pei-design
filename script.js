const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasGSAP = Boolean(window.gsap);

const canvas = document.getElementById("signalField");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let particles = [];
let pointer = { x: 0, y: 0, active: false };

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = canvas.offsetWidth;
  height = canvas.offsetHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = width > 900 ? 78 : 42;
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    size: index % 9 === 0 ? 2.2 : 1.15,
    color: index % 6 === 0 ? "#a1ff4f" : index % 7 === 0 ? "#ff6b35" : "#f8faf2",
  }));
}

function drawField() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((point, index) => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height + 20;
    if (point.y > height + 20) point.y = -20;

    if (pointer.active) {
      const dx = pointer.x - point.x;
      const dy = pointer.y - point.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 180) {
        point.x -= dx * 0.002;
        point.y -= dy * 0.002;
      }
    }

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      if (distance < 118) {
        ctx.strokeStyle = `rgba(248, 250, 242, ${0.13 - distance / 1180})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!prefersReduced) requestAnimationFrame(drawField);
}

resizeCanvas();
drawField();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("pointermove", (event) => {
  pointer = { x: event.clientX, y: event.clientY, active: true };
});
window.addEventListener("pointerleave", () => {
  pointer.active = false;
});

function initFallbackReveal() {
  document.body.classList.add("native-cursor");
  document.querySelectorAll(".cursor-dot, .cursor-ring, .cursor-aurora").forEach((item) => {
    item.style.opacity = "0";
    item.style.visibility = "hidden";
  });
  document.querySelectorAll(".project-card, .resume-card, .media-slot, .career-timeline li").forEach((item) => {
    item.style.opacity = "1";
    item.style.transform = "none";
    item.style.clipPath = "none";
  });
}

function addRevealClasses() {
  document
    .querySelectorAll(
      ".intro-lockup, .project-head, .project-card, .resume-head, .resume-card, .career-timeline li, .media-section h2, .media-slot, .contact-panel"
    )
    .forEach((item) => item.classList.add("gradient-reveal"));
}

function splitIntoGraphemes(text) {
  if (window.Intl?.Segmenter) {
    return Array.from(new Intl.Segmenter("zh-CN", { granularity: "grapheme" }).segment(text), (item) => item.segment);
  }
  return Array.from(text);
}

function tokenContainsCJK(token) {
  return /[\u3400-\u9fff\uf900-\ufaff]/.test(token);
}

function appendSplitToken(parent, token) {
  if (!token) return;

  if (/^\s+$/.test(token)) {
    const space = document.createElement("span");
    space.className = "split-space";
    space.setAttribute("aria-hidden", "true");
    space.innerHTML = "&nbsp;";
    parent.append(space);
    return;
  }

  const chars = splitIntoGraphemes(token);
  const target = tokenContainsCJK(token) ? parent : document.createElement("span");

  if (target !== parent) {
    target.className = "split-word";
    target.setAttribute("aria-hidden", "true");
    parent.append(target);
  }

  chars.forEach((char) => {
    const charNode = document.createElement("span");
    charNode.className = "split-char";
    charNode.setAttribute("aria-hidden", "true");
    charNode.textContent = char;
    target.append(charNode);
  });
}

function splitTextElement(element, variant = "section") {
  if (!element || element.dataset.splitTextReady === "true") return;

  const existingLines = Array.from(element.children)
    .map((child) => child.textContent.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const lines = existingLines.length ? existingLines : [element.textContent.replace(/\s+/g, " ").trim()];
  const label = lines.join(" ");

  element.textContent = "";
  element.classList.add("split-parent", `split-${variant}`);
  element.dataset.splitTextReady = "true";
  element.setAttribute("aria-label", label);

  lines.forEach((lineText) => {
    const line = document.createElement("span");
    line.className = "split-line";
    line.setAttribute("aria-hidden", "true");
    lineText.split(/(\s+)/).forEach((token) => appendSplitToken(line, token));
    element.append(line);
  });
}

function initSplitText() {
  splitTextElement(document.querySelector(".hero-title"), "hero");
  document
    .querySelectorAll(".intro-lockup h2, .project-head h2, .resume-head h2, .media-section h2, .contact-panel h2")
    .forEach((heading) => splitTextElement(heading, "section"));
}

function initGSAP() {
  if (!hasGSAP) {
    initFallbackReveal();
    return;
  }

  const { gsap } = window;
  const { ScrollTrigger } = window;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.defaults({ ease: "power3.out", duration: 0.75 });

  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 1152px)",
      reduceMotion: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const { isDesktop, reduceMotion } = context.conditions;
      if (reduceMotion) {
        initFallbackReveal();
        return;
      }

      addRevealClasses();

      const intro = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      intro
        .from(".brand, .site-nav, .nav-cta", { y: -24, autoAlpha: 0, stagger: 0.08, duration: 0.55 })
        .from(".framer-aura", { scale: 0.94, duration: 1.1 }, "-=0.3")
        .from(".hero-kicker", { y: 24, autoAlpha: 0 }, "-=0.65")
        .from(
          ".hero-title .split-char",
          {
            yPercent: 112,
            rotationX: -72,
            scaleY: 1.16,
            autoAlpha: 0,
            filter: "blur(14px)",
            transformOrigin: "50% 100%",
            stagger: { each: 0.012, from: "center" },
            duration: 0.92,
          },
          "-=0.24"
        )
        .from(".hero-copy", { y: 28, autoAlpha: 0 }, "-=0.45")
        .from(".command-panel", { x: 90, y: 60, rotation: -22, autoAlpha: 0, duration: 0.95 }, "-=0.85")
        .from(".orbit-card", { y: 34, rotation: -8, autoAlpha: 0, stagger: 0.08 }, "-=0.65");

      intro.play(0);

      gsap.to(".command-panel", { y: -18, rotation: -7, repeat: -1, yoyo: true, duration: 4.8, ease: "sine.inOut" });
      gsap.to(".orbit-card-a", { y: -14, repeat: -1, yoyo: true, duration: 3.8, ease: "sine.inOut" });
      gsap.to(".orbit-card-b", { y: 16, repeat: -1, yoyo: true, duration: 4.4, ease: "sine.inOut" });
      gsap.to(".orbit-card-c", { y: -12, repeat: -1, yoyo: true, duration: 5.1, ease: "sine.inOut" });
      gsap.to(".framer-aura", { scale: 1.035, rotation: 0.8, repeat: -1, yoyo: true, duration: 6.6, ease: "sine.inOut" });

      if (ScrollTrigger) {
        gsap.to(".page-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: () => ScrollTrigger.maxScroll(window),
            scrub: 0.2,
          },
        });

        document.querySelectorAll(".split-section").forEach((heading) => {
          const chars = heading.querySelectorAll(".split-char");
          gsap.fromTo(
            chars,
            { yPercent: 108, rotationX: -46, autoAlpha: 0, filter: "blur(10px)" },
            {
              yPercent: 0,
              rotationX: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.78,
              ease: "power4.out",
              stagger: { amount: 0.48, from: "start" },
              scrollTrigger: {
                trigger: heading,
                start: "top 84%",
                once: true,
              },
            }
          );
        });

        ScrollTrigger.batch(
          ".intro-lockup, .project-head, .project-card, .resume-head, .resume-card, .career-timeline li, .media-section h2, .media-slot, .contact-panel",
          {
          start: "top 82%",
          onEnter: (items) => {
            gsap.set(items, { "--sweep-opacity": 1, "--sweep-x": "-130%" });
            gsap.fromTo(
              items,
              { y: 64, autoAlpha: 0, clipPath: "inset(0% 0% 100% 0%)" },
              {
                y: 0,
                autoAlpha: 1,
                clipPath: "inset(0% 0% 0% 0%)",
                stagger: 0.08,
                duration: 0.92,
                overwrite: true,
              }
            );
            gsap.to(items, { "--sweep-x": "130%", stagger: 0.08, duration: 1.1, ease: "power2.inOut" });
            gsap.to(items, { "--sweep-opacity": 0, stagger: 0.08, duration: 0.3, delay: 0.78 });
          },
          onLeaveBack: (items) => {
            gsap.to(items, {
              y: 44,
              autoAlpha: 0,
              clipPath: "inset(0% 0% 100% 0%)",
              stagger: 0.04,
              overwrite: true,
            });
          },
        }
        );

        if (isDesktop) {
          const track = document.querySelector(".project-track");
          const viewport = document.querySelector(".project-viewport");
          const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: ".project-lab",
              start: "top top",
              end: () => `+=${travel() + window.innerHeight * 0.7}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      return () => {};
    }
  );
}

function initCursor() {
  if (!hasGSAP || window.matchMedia("(pointer: coarse)").matches || prefersReduced) return;
  const { gsap } = window;
  const dotX = gsap.quickTo(".cursor-dot", "x", { duration: 0.16, ease: "power3" });
  const dotY = gsap.quickTo(".cursor-dot", "y", { duration: 0.16, ease: "power3" });
  const ringX = gsap.quickTo(".cursor-ring", "x", { duration: 0.46, ease: "power3" });
  const ringY = gsap.quickTo(".cursor-ring", "y", { duration: 0.46, ease: "power3" });
  const auroraX = gsap.quickTo(".cursor-aurora", "x", { duration: 0.62, ease: "power3" });
  const auroraY = gsap.quickTo(".cursor-aurora", "y", { duration: 0.62, ease: "power3" });
  const heroAuraX = gsap.quickTo(".framer-aura", "x", { duration: 1.2, ease: "power3" });
  const heroAuraY = gsap.quickTo(".framer-aura", "y", { duration: 1.2, ease: "power3" });

  window.addEventListener("pointermove", (event) => {
    dotX(event.clientX);
    dotY(event.clientY);
    ringX(event.clientX);
    ringY(event.clientY);
    auroraX(event.clientX);
    auroraY(event.clientY);
    heroAuraX((event.clientX / window.innerWidth - 0.5) * 22);
    heroAuraY((event.clientY / window.innerHeight - 0.5) * 14);
    gsap.to(".cursor-aurora", { autoAlpha: 1, duration: 0.28, overwrite: true });
  });

  window.addEventListener("pointerleave", () => {
    gsap.to(".cursor-aurora", { autoAlpha: 0, duration: 0.35, overwrite: true });
  });

  document.querySelectorAll("a, button, .project-card").forEach((target) => {
    target.addEventListener("pointerenter", () => {
      gsap.to(".cursor-ring", { scale: 1.85, duration: 0.25, overwrite: true });
      gsap.to(".cursor-aurora", { scale: 1.18, duration: 0.35, overwrite: true });
    });
    target.addEventListener("pointerleave", () => {
      gsap.to(".cursor-ring", { scale: 1, duration: 0.25, overwrite: true });
      gsap.to(".cursor-aurora", { scale: 1, duration: 0.35, overwrite: true });
    });
  });
}

function initMagnetic() {
  if (!hasGSAP || prefersReduced) return;
  const { gsap } = window;
  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      gsap.to(item, { x, y, duration: 0.35, overwrite: "auto" });
    });
    item.addEventListener("pointerleave", () => gsap.to(item, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.35)" }));
  });
}

function initFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll("[data-project]");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");
      const filter = chip.dataset.filter;

      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.type.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });

      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  });
}

function initProjectModal() {
  const modal = document.querySelector(".project-modal");
  const modalTitle = modal.querySelector("#modal-title");
  const modalRole = modal.querySelector(".modal-role");
  const modalSummary = modal.querySelector(".modal-summary");
  const modalImpact = modal.querySelector(".modal-impact");
  const modalMedia = modal.querySelector(".modal-media");
  const closeButtons = modal.querySelectorAll(".modal-close, .modal-close-inline");

  document.querySelectorAll(".project-open").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-project]");
      modalTitle.textContent = card.dataset.title;
      modalRole.textContent = card.dataset.role;
      modalSummary.textContent = card.dataset.summary;
      modalImpact.innerHTML = `<strong>Impact</strong>${card.dataset.impact}`;
      modalMedia.innerHTML = `<strong>Media plan</strong>${card.dataset.media}`;
      modal.showModal();
      document.body.classList.add("modal-open");

      if (hasGSAP && !prefersReduced) {
        window.gsap.fromTo(modal, { y: 38, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.42 });
        window.gsap.from(".modal-device span", { x: -24, autoAlpha: 0, stagger: 0.08, duration: 0.5, delay: 0.12 });
      }
    });
  });

  function closeModal() {
    if (hasGSAP && !prefersReduced) {
      window.gsap.to(modal, {
        y: 24,
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => {
          modal.close();
          document.body.classList.remove("modal-open");
          window.gsap.set(modal, { clearProps: "all" });
        },
      });
      return;
    }
    modal.close();
    document.body.classList.remove("modal-open");
  }

  closeButtons.forEach((button) => button.addEventListener("click", closeModal));
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

initSplitText();
initGSAP();
initCursor();
initMagnetic();
initFilters();
initProjectModal();
