const chFlag = '<img src="flags/ch.svg" alt="" aria-hidden="true">';
const gbFlag = '<img src="flags/gb.svg" alt="" aria-hidden="true">';

const translations = {
  de: {
    name: "Avi Bobrovsky",
    fullSubtitle: "Informatikstudent | IT-Systeme & Cloud Support",
    mobileSubtitle: "IT-Systeme & Cloud Support",
    paragraph1:
      "Ich bin Informatikstudent an der FHNW und habe praktische Erfahrung in der Betreuung von Produktivsystemen, der Lösung von Incidents sowie im Troubleshooting von Cloud- und Benutzerumgebungen.",
    whatI_do_heading: "Was ich mache",
    whatI_do_item1: "Betreuung und Betrieb von Cloud-Systemen",
    whatI_do_item2:
      "Troubleshooting von Deployment-, Infrastruktur- und Benutzerproblemen",
    whatI_do_item3:
      "Analyse von Ursachen und strukturierte Problemlösung",
    whatI_do_item4: "Fokus auf stabile und zuverlässige Systeme",
    selected_work_heading: "Ausgewählte Arbeiten",
    selected_work_item1:
      "PasteGuard – Local-first Tool zur Erkennung und Reduktion sensibler Daten beim Copy-Paste",
    selected_work_item2:
      "AI Context Map – CLI-Tool zur Navigation in Codebasen mittels strukturierter Kontext- und Planungslogik",
    selected_work_item3:
      "Azure DevOps Service Starter – Wiederverwendbares Service-Template für CI/CD, Docker und Azure-Infrastruktur (Bicep)",
  },
  en: {
    name: "Avi Bobrovsky",
    fullSubtitle: "Computer Science Student | IT Systems & Cloud Support",
    mobileSubtitle: "IT Systems & Cloud Support",
    paragraph1:
      "I'm a Computer Science student at FHNW with hands-on experience supporting production systems, resolving incidents, and troubleshooting issues across cloud and user environments.",
    whatI_do_heading: "What I do",
    whatI_do_item1: "Support and maintenance of cloud-based systems",
    whatI_do_item2:
      "Troubleshooting deployment, infrastructure, and user issues",
    whatI_do_item3: "Root-cause analysis and structured problem solving",
    whatI_do_item4: "Focus on stable and reliable systems",
    selected_work_heading: "Selected work",
    selected_work_item1:
      "PasteGuard – Local-first tool that detects and redacts sensitive data during copy-paste",
    selected_work_item2:
      "AI Context Map – CLI tool that helps developers and AI agents navigate codebases using structured memory and task-aware planning",
    selected_work_item3:
      "Azure DevOps Service Starter – Reusable template for CI/CD, Docker, and Azure infrastructure (Bicep)",
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
