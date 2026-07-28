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

  function formatList(values) {
    if (values.length < 2) return values.join("");
    if (values.length === 2) return values.join(" and ");
    return values.slice(0, -1).join(", ") + ", and " + values[values.length - 1];
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

  function renderOpenSourceLaunch() {
    document.querySelectorAll("[data-open-source-only]").forEach(function (element) {
      element.hidden = !config.openSourceLaunchEnabled;
    });

    if (config.openSourceLaunchEnabled) {
      document.querySelectorAll("meta[data-open-source-description]").forEach(function (element) {
        element.setAttribute(
          "content",
          "ReadBooster is an open-source browser extension that turns conversations from ChatGPT, Google Gemini, Mistral AI, and Claude into readable, navigable documents.",
        );
      });
    }
  }

  function renderInstallActions() {
    document.querySelectorAll("[data-install-container]").forEach(function (container) {
      var compact = container.hasAttribute("data-compact");
      var links = [];

      if (isSafeHttpUrl(config.chromeWebStoreUrl)) {
        var chromeLink = document.createElement("a");
        chromeLink.href = config.chromeWebStoreUrl;
        chromeLink.target = "_blank";
        chromeLink.rel = "noopener noreferrer";
        chromeLink.className = "button button-primary" + (compact ? " button-small" : "");
        chromeLink.textContent = "Get ReadBooster for Chrome";
        chromeLink.setAttribute(
          "aria-label",
          "Get ReadBooster for Chrome from the Chrome Web Store (opens in a new tab)",
        );
        links.push(chromeLink);
      }

      if (isSafeHttpUrl(config.firefoxAddonsUrl)) {
        var firefoxLink = document.createElement("a");
        firefoxLink.href = config.firefoxAddonsUrl;
        firefoxLink.target = "_blank";
        firefoxLink.rel = "noopener noreferrer";
        firefoxLink.className = "button button-secondary" + (compact ? " button-small" : "");
        firefoxLink.textContent = "Get ReadBooster for Firefox";
        firefoxLink.setAttribute(
          "aria-label",
          "Get ReadBooster for Firefox from Firefox Add-ons (opens in a new tab)",
        );
        links.push(firefoxLink);
      }

      if (links.length > 0) {
        container.classList.add("install-actions");
        container.replaceChildren.apply(container, links);
      }
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
      fragment.appendChild(
        makePlatformRow(name, "Supported", config.supportedPlatformMilestones[name]),
      );
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
      operatingSystem: "Chrome, Firefox",
      softwareVersion: config.currentVersion,
      description: config.openSourceLaunchEnabled
        ? "ReadBooster is an open-source browser extension that transforms ChatGPT, Google Gemini, Mistral AI, and Claude conversations into readable, navigable documents."
        : "ReadBooster transforms ChatGPT, Google Gemini, Mistral AI, and Claude conversations into readable, navigable documents.",
      url: "https://inspiringsource.github.io/ReadBooster/",
      image:
        "https://inspiringsource.github.io/ReadBooster/Screenshots/Screenshot1.jpg",
      browserRequirements: "Requires Google Chrome or Mozilla Firefox",
      featureList: [
        "Continuous Document Mode",
        "Focus Mode",
        "Grouped document outline",
        "Custom section titles and local Stickers",
        "Improved table modes",
        "Syntax-aware code presentation and copying",
        "Static document blocks",
        "Conversation refresh",
        "Responsive Optimize Reading control",
        "Default, Serif, Dyslexia-friendly, and Fast Reading styles",
        "Copy and Print / Save as PDF",
        "Local-first conversation formatting",
      ],
    };

    if (isSafeHttpUrl(config.chromeWebStoreUrl)) application.installUrl = config.chromeWebStoreUrl;
    if (config.openSourceLaunchEnabled && isSafeHttpUrl(config.repositoryUrl)) {
      application.codeRepository = config.repositoryUrl;
      application.license = config.licenseUrl;
      application.sameAs = [
        config.repositoryUrl,
        config.chromeWebStoreUrl,
        config.firefoxAddonsUrl,
      ].filter(isSafeHttpUrl);
    }
    appendStructuredData(application);

    var faqEntries = Array.from(document.querySelectorAll(".faq-item:not([hidden])"))
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
  setText("[data-supported-list]", formatList(config.supportedPlatforms));
  setText("[data-planned-list]", formatList(config.plannedPlatforms));
  setText("[data-store-review-note]", config.storeReviewTimingNote);
  setText("[data-copyright-year]", String(new Date().getFullYear()));
  setConfiguredLinks();
  renderOpenSourceLaunch();
  renderInstallActions();
  renderPlatforms();
  setupNavigation();
  addHomepageStructuredData();
})();
