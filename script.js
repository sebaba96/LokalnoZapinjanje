const header = document.getElementById("header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const progress = document.getElementById("progress");
const navLinks = [...document.querySelectorAll(".nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function closeNav() {
  nav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

function updateChrome() {
  header.classList.toggle("is-scrolled", window.scrollY > 40);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, ratio * 100)}%`;

  const marker = window.scrollY + window.innerHeight * 0.32;
  let current = sections[0];
  sections.forEach((section) => {
    if (section.offsetTop <= marker) current = section;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current.id}`);
  });
}

window.addEventListener("scroll", updateChrome, { passive: true });
updateChrome();

const reveals = document.querySelectorAll(".reveal");
if (reduceMotion) {
  reveals.forEach((el) => el.classList.add("is-in"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
}

const heroImage = document.querySelector(".hero-media img");
if (heroImage && !reduceMotion) {
  window.addEventListener(
    "scroll",
    () => {
      heroImage.style.transform = `scale(1.06) translateY(${Math.min(50, window.scrollY * 0.1)}px)`;
    },
    { passive: true }
  );
}
