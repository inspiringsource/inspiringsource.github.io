/**
 * ReadBooster public-site configuration.
 *
 * This is the single source for mutable product and release values. A future
 * release workflow may update this file without rewriting either page.
 */
window.READBOOSTER_CONFIG = Object.freeze({
  name: "ReadBooster",
  currentVersion: "0.6.2",
  chromeWebStoreUrl: null,
  pendingReleaseLabel: "Chrome release pending · Firefox release pending",
  feedbackUrl: "https://tally.so/r/QKWqjp",
  portfolioUrl: "https://inspiringsource.github.io/",
  supportedPlatforms: Object.freeze(["ChatGPT", "Google Gemini", "Mistral AI"]),
  supportedPlatformMilestones: Object.freeze({
    "Mistral AI": "0.6 milestone",
  }),
  plannedPlatforms: Object.freeze(["Claude", "Perplexity"]),
  plannedPlatformMilestones: Object.freeze({
    Claude: "0.7 milestone",
    Perplexity: "0.8 milestone",
  }),
});
