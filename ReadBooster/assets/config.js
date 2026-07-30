/**
 * ReadBooster public-site configuration.
 *
 * This is the single source for mutable product and release values. A future
 * release workflow may update this file without rewriting either page.
 */
window.READBOOSTER_CONFIG = Object.freeze({
  name: "ReadBooster",
  currentVersion: "0.7.3",
  chromeCurrentVersion: "0.7.1",
  chromeCurrentStatus: "Version 0.7.1 available",
  chromeUpdateStatus: "0.7.3 update awaiting review",
  chromeReleaseStatus:
    "Version 0.7.1 available · 0.7.3 update awaiting review",
  chromeReleaseSummary: "0.7.1 available; 0.7.3 awaiting review",
  firefoxCurrentVersion: "0.7.3",
  firefoxReleaseStatus: "Version 0.7.3 available",
  chromeWebStoreUrl:
    "https://chromewebstore.google.com/detail/dgkgecgijplbfllnhcolplieaejjnmhd",
  firefoxAddonsUrl: "https://addons.mozilla.org/en-US/firefox/addon/readbooster/",
  feedbackUrl: "https://tally.so/r/QKWqjp",
  portfolioUrl: "https://inspiringsource.github.io/",
  aviCloudUrl: "https://avicloud.ch/",
  openSourceLaunchEnabled: true,
  repositoryUrl: "https://github.com/inspiringsource/ReadBooster",
  issuesUrl: "https://github.com/inspiringsource/ReadBooster/issues",
  issueChooserUrl: "https://github.com/inspiringsource/ReadBooster/issues/new/choose",
  bugReportUrl:
    "https://github.com/inspiringsource/ReadBooster/issues/new?template=bug_report.yml",
  featureRequestUrl:
    "https://github.com/inspiringsource/ReadBooster/issues/new?template=feature_request.yml",
  platformRequestUrl:
    "https://github.com/inspiringsource/ReadBooster/issues/new?template=platform_support.yml",
  contributingUrl:
    "https://github.com/inspiringsource/ReadBooster/blob/main/CONTRIBUTING.md",
  addingPlatformUrl:
    "https://github.com/inspiringsource/ReadBooster/blob/main/docs/adding-a-platform.md",
  licenseUrl: "https://github.com/inspiringsource/ReadBooster/blob/main/LICENSE",
  securityUrl: "https://github.com/inspiringsource/ReadBooster/blob/main/SECURITY.md",
  storeReviewTimingNote:
    "Chrome and Firefox review and publish updates independently, so a new ReadBooster version may become available in one store before the other.",
  storeStatusSummary:
    "ReadBooster 0.7.3 is available on Firefox. Chrome offers version 0.7.1 while the 0.7.3 update is awaiting Chrome Web Store review.",
  supportedPlatforms: Object.freeze([
    "ChatGPT",
    "Google Gemini",
    "Mistral AI",
    "Claude",
  ]),
  supportedPlatformMilestones: Object.freeze({
    "Mistral AI": "0.6 milestone",
    Claude: "0.7 milestone",
  }),
  plannedPlatforms: Object.freeze(["Perplexity", "Kimi"]),
  plannedPlatformMilestones: Object.freeze({
    Perplexity: "0.8 milestone",
    Kimi: "0.9 milestone",
  }),
});
