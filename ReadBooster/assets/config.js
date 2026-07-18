/**
 * ReadBooster public-site configuration.
 *
 * This is the single source for mutable product and release values. A future
 * release workflow may update this file without rewriting either page.
 */
window.READBOOSTER_CONFIG = Object.freeze({
  name: "ReadBooster",
  currentVersion: "0.5.3",
  chromeWebStoreUrl: null,
  chromePendingLabel: "Chrome release pending",
  feedbackUrl: "https://tally.so/r/QKWqjp",
  portfolioUrl: "https://inspiringsource.github.io/",
  supportedPlatforms: Object.freeze(["ChatGPT", "Google Gemini"]),
  plannedPlatforms: Object.freeze(["Mistral AI", "Claude"]),
  plannedPlatformMilestones: Object.freeze({
    "Mistral AI": "0.6 milestone",
    Claude: "0.7 milestone",
  }),
});
