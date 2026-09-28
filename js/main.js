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
    fullSubtitle: "Informatikstudent | Python, Backend & Cloud",
    mobileSubtitle: "Python, Backend & Cloud",
    paragraph1:
      "Ich bin Informatikstudent an der FHNW mit praktischer Erfahrung in Python-, Backend- und Webentwicklung sowie im Betrieb cloudbasierter Systeme. Ich entwickle praktische Tools, automatisiere Arbeitsabläufe und integriere KI-APIs in zuverlässige Anwendungen.",
    whatI_do_heading: "Was ich mache",
    whatI_do_item1: "Python- und Backend-Entwicklung, inklusive APIs und Datenverarbeitung",
    whatI_do_item2:
      "Integration von KI-APIs wie Gemini, mit strukturierten Ausgaben und menschlicher Prüfung",
    whatI_do_item3:
      "Entwicklertools und Kommandozeilenanwendungen, die den Arbeitsalltag vereinfachen",
    whatI_do_item4: "Automatisierung von Arbeitsabläufen mit Python und Shell-Skripten",
    whatI_do_item5: "SQL, SQLite und Integration strukturierter Datenquellen",
    whatI_do_item6: "Website- und Full-Stack-Anwendungsentwicklung",
    whatI_do_item7: "Testing, CI/CD und wartbarer Code",
    whatI_do_item8: "Cloud-Deployment, Betrieb und Fehleranalyse",
    whatI_do_item9: "Hosting, DNS, Domains und professionelle E-Mail-Konfiguration",
    selected_work_heading: "Ausgewählte Arbeiten",
    selected_work_item1:
      "Priverna – Projekt zum Schutz sensibler Informationen beim Austausch zwischen Menschen, Cloud-Diensten und KI-Tools",
    selected_work_item2:
      "pwdNote – Python-CLI für verschlüsselte, projektbezogene Notizen mit VS-Code-Erweiterung",
    selected_work_item3:
      "PasteGuard – Local-first Tool zur Erkennung und Reduktion sensibler Daten beim Copy-Paste",
    selected_work_item4:
      "AI Context Map – CLI-Tool zur Navigation in Codebasen mittels strukturierter Kontext- und Planungslogik",
    selected_work_item5:
      "Azure DevOps Service Starter – Wiederverwendbare Vorlage für CI/CD, Docker, Azure-Infrastruktur (Bicep), Betriebsdokumentation, Incident Management und IT-Operations-Workflows",
    client_portal: "AviCloud",
  },
  en: {
    name: "Avi Bobrovsky",
    fullSubtitle: "Computer Science Student | Python, Backend & Cloud",
    mobileSubtitle: "Python, Backend & Cloud",
    paragraph1:
      "I'm a Computer Science student at FHNW with hands-on experience in Python, backend and web development, as well as operating cloud-based systems. I build practical tools, automate workflows and integrate AI APIs into reliable applications.",
    whatI_do_heading: "What I do",
    whatI_do_item1: "Python and backend development, including APIs and data processing",
    whatI_do_item2:
      "AI API integration",
    whatI_do_item3:
      "Developer tools and command-line applications that simplify everyday work",
    whatI_do_item4: "Workflow automation with Python and shell scripts",
    whatI_do_item5: "SQL, SQLite and integration of structured data sources",
    whatI_do_item6: "Website and full-stack application development",
    whatI_do_item7: "Testing, CI/CD and maintainable code",
    whatI_do_item8: "Cloud deployment, operation and troubleshooting",
    whatI_do_item9: "Hosting, DNS, domains and professional email configuration",
    selected_work_heading: "Selected work",
    selected_work_item1:
      "Priverna – Project exploring ways to protect sensitive information shared between people, cloud services and AI tools",
    selected_work_item2:
      "pwdNote – Python CLI for encrypted, project-local notes with a VS Code extension",
    selected_work_item3:
      "PasteGuard – Local-first tool that detects and redacts sensitive data during copy-paste",
    selected_work_item4:
      "AI Context Map – CLI tool that helps developers and AI agents navigate codebases using structured memory and task-aware planning",
    selected_work_item5:
      "Azure DevOps Service Starter – Reusable template for CI/CD, Docker, Azure infrastructure (Bicep), operational runbooks, incident management, and IT operations workflows",
    client_portal: "AviCloud",
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
