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
          "ReadBooster is an open-source browser extension that turns ChatGPT, Google Gemini, Mistral AI, and Claude conversations into readable documents with navigation, highlights, notes, tables, code tools, and print support.",
        );
      });
    }
  }

  function renderInstallActions() {
    var stores = [
      {
        browser: "firefox",
        urlKey: "firefoxAddonsUrl",
        shortLabel: "Firefox",
        accessibleLabel: "Get ReadBooster for Firefox from Firefox Add-ons",
        iconUrl: "/ReadBooster/assets/store-badges/firefox.svg",
        badgeUrl: "/ReadBooster/assets/store-badges/firefox-addons.png",
        badgeWidth: 172,
        badgeHeight: 60,
        badgeAlt: "Get ReadBooster from Firefox Add-ons",
      },
      {
        browser: "chrome",
        urlKey: "chromeWebStoreUrl",
        shortLabel: "Chrome",
        accessibleLabel: "View ReadBooster in the Chrome Web Store",
        iconUrl: "/ReadBooster/assets/store-badges/chrome.svg",
        badgeUrl: "/ReadBooster/assets/store-badges/chrome-web-store.png",
        badgeWidth: 340,
        badgeHeight: 96,
        badgeAlt: "View ReadBooster in the Chrome Web Store",
      },
    ];

    document.querySelectorAll("[data-install-container]").forEach(function (container) {
      var variant = container.getAttribute("data-install-variant") || "compact";
      var links = [];

      stores.forEach(function (store) {
        var href = config[store.urlKey];
        if (!isSafeHttpUrl(href)) return;

        var link = document.createElement("a");
        link.href = href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", store.accessibleLabel + " (opens in a new tab)");

        var image = document.createElement("img");
        if (variant === "badge") {
          link.className = "store-badge-link store-badge-" + store.browser;
          image.src = store.badgeUrl;
          image.width = store.badgeWidth;
          image.height = store.badgeHeight;
          image.alt = store.badgeAlt;
          link.appendChild(image);
        } else {
          link.className =
            "browser-store-control browser-store-control-" + store.browser;
          image.src = store.iconUrl;
          image.width = 20;
          image.height = 20;
          image.alt = "";
          image.setAttribute("aria-hidden", "true");

          var label = document.createElement("span");
          label.textContent = store.shortLabel;
          link.append(image, label);
        }

        links.push(link);
      });

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
        ? "ReadBooster is an open-source browser extension maintained as part of AviCloud that transforms ChatGPT, Google Gemini, Mistral AI, and Claude conversations into readable documents with navigation, highlights, notes, and print support."
        : "ReadBooster transforms ChatGPT, Google Gemini, Mistral AI, and Claude conversations into readable documents with navigation, highlights, notes, and print support.",
      url: "https://inspiringsource.github.io/ReadBooster/",
      image:
        "https://inspiringsource.github.io/ReadBooster/Screenshots/Screenshot1.jpg",
      browserRequirements: "Requires Google Chrome or Mozilla Firefox",
      releaseNotes: config.storeStatusSummary,
      featureList: [
        "Continuous Document Mode",
        "Focus Mode",
        "Grouped document outline",
        "Persistent local highlights with overview and navigation",
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

    if (isSafeHttpUrl(config.firefoxAddonsUrl)) application.installUrl = config.firefoxAddonsUrl;
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
  setText("[data-chrome-version]", config.chromeCurrentVersion);
  setText("[data-chrome-current-status]", config.chromeCurrentStatus);
  setText("[data-chrome-update-status]", config.chromeUpdateStatus);
  setText("[data-chrome-release-status]", config.chromeReleaseStatus);
  setText("[data-chrome-release-summary]", config.chromeReleaseSummary);
  setText("[data-firefox-version]", config.firefoxCurrentVersion);
  setText("[data-firefox-release-status]", config.firefoxReleaseStatus);
  setText("[data-supported-list]", formatList(config.supportedPlatforms));
  setText("[data-planned-list]", formatList(config.plannedPlatforms));
  setText("[data-store-review-note]", config.storeReviewTimingNote);
  setText("[data-store-status-summary]", config.storeStatusSummary);
  setText("[data-copyright-year]", String(new Date().getFullYear()));
  setConfiguredLinks();
  renderOpenSourceLaunch();
  renderInstallActions();
  renderPlatforms();
  setupNavigation();
  addHomepageStructuredData();
})();
