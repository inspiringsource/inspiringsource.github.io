// Theme
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isLight = theme === "light";
  btn.setAttribute("aria-pressed", String(isLight));
  btn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  btn.querySelector(".theme-icon").textContent = isLight ? "☀️" : "🌙";
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (prefersDark ? "dark" : "light"));

document.getElementById("theme-toggle").addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  requestStarfieldPerspectiveUpdate();
});

// Starfield perspective
const starfield = document.querySelector(".starfield");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let starfieldTicking = false;
let starfieldPerspectiveActive = false;

function resetStarfieldPerspective() {
  if (!starfield || !starfieldPerspectiveActive) return;

  starfield.style.removeProperty("--star-x");
  starfield.style.removeProperty("--star-y");
  starfield.style.removeProperty("--star-tilt-x");
  starfield.style.removeProperty("--star-tilt-y");
  starfieldPerspectiveActive = false;
}

function shouldAnimateStarfield() {
  return (
    starfield &&
    document.documentElement.dataset.theme === "dark" &&
    !reducedMotionQuery.matches
  );
}

function updateStarfieldPerspective() {
  if (!shouldAnimateStarfield()) {
    resetStarfieldPerspective();
    starfieldTicking = false;
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollY = Math.max(0, Math.min(window.scrollY, maxScroll));
  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

  const tiltX = 0;
  const tiltY = 0;
  const starY = progress * -18;
  const starX = 0;

  starfieldPerspectiveActive = true;
  starfield.style.setProperty("--star-x", `${starX}px`);
  starfield.style.setProperty("--star-y", `${starY}px`);
  starfield.style.setProperty("--star-tilt-x", `${tiltX}deg`);
  starfield.style.setProperty("--star-tilt-y", `${tiltY}deg`);

  starfieldTicking = false;
}

function requestStarfieldPerspectiveUpdate() {
  if (!starfield || starfieldTicking) return;

  starfieldTicking = true;
  requestAnimationFrame(updateStarfieldPerspective);
}

window.addEventListener("scroll", requestStarfieldPerspectiveUpdate, { passive: true });
window.addEventListener("resize", requestStarfieldPerspectiveUpdate);
if (reducedMotionQuery.addEventListener) {
  reducedMotionQuery.addEventListener("change", requestStarfieldPerspectiveUpdate);
} else {
  reducedMotionQuery.addListener(requestStarfieldPerspectiveUpdate);
}
requestStarfieldPerspectiveUpdate();

const chFlag = '<img src="flags/ch.svg" alt="" aria-hidden="true">';
const gbFlag = '<img src="flags/gb.svg" alt="" aria-hidden="true">';

const translations = {
  de: {
    name: "Avi Bobrovsky",
    fullSubtitle: "Informatikstudent | IT-Systeme & Cloud Support",
    mobileSubtitle: "IT-Systeme & Cloud Support",
    paragraph1:
      "Ich bin Informatikstudent an der FHNW mit praktischer Erfahrung im Betrieb von IT-Systemen, der Fehleranalyse sowie der Unterstützung von Anwendern in Cloud- und Benutzerumgebungen.",
    whatI_do_heading: "Was ich mache",
    whatI_do_item1: "Support und Wartung cloudbasierter Systeme",
    whatI_do_item2:
      "Fehleranalyse bei Deployment-, Infrastruktur- und Benutzerproblemen",
    whatI_do_item3: "Ursachenanalyse und strukturiertes Problemlösen",
    whatI_do_item4:
      "Technische Dokumentation, Betriebsabläufe und Incident Response",
    whatI_do_item5: "Website- und Full-Stack-Anwendungsentwicklung",
    whatI_do_item6: "Hosting, DNS, Domains und E-Mail-Konfiguration",
    whatI_do_item7: "Fokus auf stabile, sichere und zuverlässige Systeme",
    selected_work_heading: "Ausgewählte Arbeiten",
    selected_work_item1:
      "PasteGuard – Local-first Tool zur Erkennung und Reduktion sensibler Daten beim Copy-Paste",
    selected_work_item2:
      "AI Context Map – CLI-Tool zur Navigation in Codebasen mittels strukturierter Kontext- und Planungslogik",
    selected_work_item3:
      "Azure DevOps Service Starter – Wiederverwendbare Vorlage für CI/CD, Docker, Azure-Infrastruktur (Bicep), Betriebsdokumentation, Incident Management und IT-Operations-Workflows",
    selected_work_item4:
      "AviCloud – Kundenportal für Anfrageverfolgung, Projektdokumentation und laufenden IT-/Web-Support",
    client_portal: "AviCloud Portal",
  },
  en: {
    name: "Avi Bobrovsky",
    fullSubtitle: "Computer Science Student | IT Systems & Cloud Support",
    mobileSubtitle: "IT Systems & Cloud Support",
    paragraph1:
      "I'm a Computer Science student at FHNW with hands-on experience supporting IT systems, troubleshooting cloud and user environments, and documenting operational processes.",
    whatI_do_heading: "What I do",
    whatI_do_item1: "Support and maintenance of cloud-based systems",
    whatI_do_item2:
      "Troubleshooting deployment, infrastructure, and user issues",
    whatI_do_item3: "Root-cause analysis and structured problem solving",
    whatI_do_item4:
      "Technical documentation, operational procedures, and incident response",
    whatI_do_item5: "Website and full-stack application development",
    whatI_do_item6: "Hosting, DNS, domains, and email configuration",
    whatI_do_item7: "Focus on stable, secure, and reliable systems",
    selected_work_heading: "Selected work",
    selected_work_item1:
      "PasteGuard – Local-first tool that detects and redacts sensitive data during copy-paste",
    selected_work_item2:
      "AI Context Map – CLI tool that helps developers and AI agents navigate codebases using structured memory and task-aware planning",
    selected_work_item3:
      "Azure DevOps Service Starter – Reusable template for CI/CD, Docker, Azure infrastructure (Bicep), operational runbooks, incident management, and IT operations workflows",
    selected_work_item4:
      "AviCloud – Client portal for request tracking, project documentation and ongoing IT/web support",
    client_portal: "AviCloud Portal",
  },
};

let subtitleTypingTimer = null;
let currentSubtitleText = "";

function getSubtitleForViewport(lang) {
  return window.innerWidth <= 640
    ? translations[lang].mobileSubtitle
    : translations[lang].fullSubtitle;
}

function typeSubtitleOnce(text) {
  const el = document.querySelector(".typed-subtitle");
  if (!el) return;

  if (subtitleTypingTimer) {
    clearTimeout(subtitleTypingTimer);
    subtitleTypingTimer = null;
  }

  el.textContent = "";
  let i = 0;

  (function typeChar() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      subtitleTypingTimer = setTimeout(typeChar, 100);
    } else {
      subtitleTypingTimer = null;
    }
  })();
}

function updateSubtitle(lang) {
  const nextSubtitleText = getSubtitleForViewport(lang);
  if (nextSubtitleText === currentSubtitleText) return;

  currentSubtitleText = nextSubtitleText;
  typeSubtitleOnce(nextSubtitleText);
}

function setLanguage(lang) {
  const nameEl = document.querySelector('[data-i18n="name"]');
  if (nameEl) nameEl.textContent = translations[lang].name;

  updateSubtitle(lang);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && key !== "name") {
      el.textContent = translations[lang][key] || el.textContent;
    }
  });

  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.getElementById("language-toggle").innerHTML = `
    <span class="language-toggle-inner" aria-hidden="true">
      <span class="language-option ${lang === "de" ? "active" : ""}">
        ${chFlag}
        <span>DE</span>
      </span>
      <span class="language-option ${lang === "en" ? "active" : ""}">
        ${gbFlag}
        <span>EN</span>
      </span>
    </span>
  `;
}

const defaultLang = "de";
const savedLang = localStorage.getItem("lang") || defaultLang;

setLanguage(savedLang);

document
  .getElementById("language-toggle")
  .addEventListener("click", () => {
    const currentLang = localStorage.getItem("lang") || defaultLang;
    const nextLang = currentLang === "de" ? "en" : "de";
    setLanguage(nextLang);
  });

let isMobileViewport = window.innerWidth <= 640;

window.addEventListener("resize", () => {
  const nextIsMobileViewport = window.innerWidth <= 640;
  if (nextIsMobileViewport === isMobileViewport) return;

  isMobileViewport = nextIsMobileViewport;
  const currentLang = localStorage.getItem("lang") || defaultLang;
  updateSubtitle(currentLang);
});
