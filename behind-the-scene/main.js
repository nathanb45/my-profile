// Behind The Scene — petites interactions, sans dépendance.

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 1. Apparition des éléments au scroll
//    Les éléments déjà visibles au chargement ne sont jamais masqués.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("is-pending");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
if (!reducedMotion) {
  document.querySelectorAll(".reveal").forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add("is-pending");
      revealObserver.observe(el);
    }
  });
}

// 2. Timecode du viseur (24 images/seconde)
const timecode = document.querySelector("[data-timecode]");
if (timecode && !reducedMotion) {
  const start = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  const tick = (now) => {
    const frames = Math.floor(((now - start) / 1000) * 24);
    const f = frames % 24;
    const s = Math.floor(frames / 24) % 60;
    const m = Math.floor(frames / 1440) % 60;
    const h = Math.floor(frames / 86400);
    timecode.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// 3. Visuel du manifeste : un making-of → des dizaines de formats verticaux
const multiply = document.querySelector("[data-multiply]");
if (multiply) {
  const count = window.innerWidth <= 560 ? 48 : 96;
  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");
    span.style.transitionDelay = `${i * 18}ms`;
    multiply.appendChild(span);
  }
}

// 4. Reels : lecture au survol (desktop) ou quand la carte est visible (mobile)
const canHover = window.matchMedia("(hover: hover)").matches;
document.querySelectorAll(".reel").forEach((reel) => {
  const video = reel.querySelector("video");
  if (!video) return;

  const play = () => video.play().then(() => reel.classList.add("is-playing")).catch(() => {});
  const pause = () => { video.pause(); reel.classList.remove("is-playing"); };

  if (canHover) {
    reel.addEventListener("mouseenter", play);
    reel.addEventListener("mouseleave", pause);
  } else {
    new IntersectionObserver(
      ([entry]) => (entry.intersectionRatio > 0.6 ? play() : pause()),
      { threshold: [0, 0.6, 1] }
    ).observe(reel);
  }
});

// 5. Année du pied de page
const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
