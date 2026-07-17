(function () {
  "use strict";

  var config = window.READBOOSTER_CONFIG;

  if (!config) {
    document.documentElement.classList.add("config-unavailable");
    return;
  }

  function isSafeHttpUrl(value) {
    if (typeof value !== "string" || value.length === 0) return false;

    try {
      var url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch (error) {
      return false;
    }
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  function setConfiguredLinks() {
    document.querySelectorAll("[data-config-link]").forEach(function (link) {
      var key = link.getAttribute("data-config-link");
      var url = key ? config[key] : null;

      if (isSafeHttpUrl(url)) {
        link.setAttribute("href", url);
      } else {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
      }
    });
  }

  function renderInstallActions() {
    document.querySelectorAll("[data-install-container]").forEach(function (container) {
      var compact = container.hasAttribute("data-compact");
      var element;

      if (isSafeHttpUrl(config.chromeWebStoreUrl)) {
        element = document.createElement("a");
        element.href = config.chromeWebStoreUrl;
        element.target = "_blank";
        element.rel = "noopener noreferrer";
        element.className = "button button-primary" + (compact ? " button-small" : "");
        element.textContent = "Install from the Chrome Web Store";
        element.setAttribute("aria-label", "Install ReadBooster from the Chrome Web Store");
      } else {
        element = document.createElement("span");
        element.className = "button-pending" + (compact ? " button-small" : "");
        element.setAttribute("role", "status");

        var dot = document.createElement("span");
        dot.className = "pending-dot";
        dot.setAttribute("aria-hidden", "true");
        element.appendChild(dot);
        element.appendChild(document.createTextNode(config.chromePendingLabel));
      }

      container.replaceChildren(element);
    });
  }

  function makePlatformRow(name, status, milestone) {
    var article = document.createElement("article");
    article.className = "platform-row";

    var label = document.createElement("span");
    label.className = "status-label status-" + status.toLowerCase();
    label.textContent = milestone ? status + " · " + milestone : status;

    var heading = document.createElement("h3");
    heading.textContent = name;

    article.append(heading, label);
    return article;
  }

  function renderPlatforms() {
    var grid = document.querySelector("[data-platform-grid]");
    if (!grid) return;

    var fragment = document.createDocumentFragment();
    config.supportedPlatforms.forEach(function (name) {
      fragment.appendChild(makePlatformRow(name, "Supported"));
    });
    config.plannedPlatforms.forEach(function (name) {
      fragment.appendChild(
        makePlatformRow(name, "Planned", config.plannedPlatformMilestones[name]),
      );
    });
    grid.replaceChildren(fragment);
  }

  function setupNavigation() {
    var button = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-site-nav]");
    if (!button || !nav) return;

    function setOpen(open) {
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      nav.dataset.open = String(open);
    }

    button.addEventListener("click", function () {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        button.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) setOpen(false);
    });
  }

  function appendStructuredData(value) {
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(value);
    document.head.appendChild(script);
  }

  function addHomepageStructuredData() {
    if (document.body.dataset.page !== "home") return;

    var application = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: config.name,
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome",
      softwareVersion: config.currentVersion,
      description:
        "ReadBooster transforms ChatGPT and Google Gemini conversations into structured, continuous documents with clear navigation, improved tables, and adaptable reading modes.",
      url: "https://inspiringsource.github.io/ReadBooster/",
      image:
        "https://inspiringsource.github.io/ReadBooster/Screenshots/Screenshot1.jpg",
      browserRequirements: "Requires Google Chrome",
      featureList: [
        "Continuous Document Mode",
        "Focus Mode",
        "Grouped document outline",
        "Improved table modes",
        "Dyslexia-friendly reading options",
        "Copy and Print / Save as PDF",
        "Local-first conversation formatting",
      ],
    };

    if (isSafeHttpUrl(config.chromeWebStoreUrl)) application.installUrl = config.chromeWebStoreUrl;
    appendStructuredData(application);

    var faqEntries = Array.from(document.querySelectorAll(".faq-item"))
      .map(function (item) {
        var question = item.querySelector("summary");
        var answer = item.querySelector(".faq-answer");
        if (!question || !answer) return null;
        return {
          "@type": "Question",
          name: question.textContent.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: answer.textContent.trim(),
          },
        };
      })
      .filter(Boolean);

    appendStructuredData({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqEntries,
    });
  }

  setText("[data-config-name]", config.name);
  setText("[data-current-version]", config.currentVersion);
  setText("[data-supported-list]", config.supportedPlatforms.join(" and "));
  setText("[data-planned-list]", config.plannedPlatforms.join(" and "));
  setText("[data-copyright-year]", String(new Date().getFullYear()));
  setConfiguredLinks();
  renderInstallActions();
  renderPlatforms();
  setupNavigation();
  addHomepageStructuredData();
})();
