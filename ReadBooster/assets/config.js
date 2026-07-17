/**
 * ReadBooster public-site configuration.
 *
 * This is the single source for mutable product and release values. A future
 * release workflow may update this file without rewriting either page.
 */
window.READBOOSTER_CONFIG = Object.freeze({
  name: "ReadBooster",
  currentVersion: "0.5.1",
  chromeWebStoreUrl: null,
  chromePendingLabel: "Chrome release pending",
  feedbackUrl: "https://tally.so/r/QKWqjp",
  repositoryUrl: "https://github.com/inspiringsource/ReadBooster",
  portfolioUrl: "https://inspiringsource.github.io/",
  supportedPlatforms: Object.freeze(["ChatGPT", "Gemini"]),
  plannedPlatforms: Object.freeze(["Mistral", "Claude"]),
});
