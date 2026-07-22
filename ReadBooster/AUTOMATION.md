# ReadBooster website release automation

## Current state

The ReadBooster pages deploy with the rest of `inspiringsource.github.io` directly from the
website repository's `main` branch. There is no site build step and no ReadBooster release workflow
has been enabled yet.

Runtime public values live in one file:

```text
ReadBooster/assets/config.js
```

The official Chrome Web Store and Firefox Add-ons listing URLs are configured, and both extensions
are publicly available. Both HTML pages also contain matching accessible fallback links for visitors
who load the page without JavaScript.

## Existing PWD Note pattern

PWD Note uses a workflow in the source repository, triggered by a trusted release tag. After tests
and publishing succeed, the workflow:

1. checks out `inspiringsource/inspiringsource.github.io` with a repository secret;
2. runs a source-controlled, marker-aware update script;
3. stages only `pwdnote/index.html`; and
4. commits and pushes only when the expected page changed.

This keeps release metadata in the product repository while GitHub Pages continues to deploy the
static website repository normally.

## Proposed ReadBooster flow

Reuse the same source-repository pattern after ReadBooster's release metadata schema is finalized:

```text
ReadBooster release or manual workflow
  -> run ReadBooster checks and build
  -> validate release/readbooster-site.json
  -> check out inspiringsource/inspiringsource.github.io
  -> update only ReadBooster/assets/config.js and reviewed release-content markers
  -> validate the changed website files
  -> commit and push the narrow website diff
  -> GitHub Pages deploys main
```

The planned source metadata should contain only controlled public values such as:

- version;
- release notes;
- supported and planned platform status;
- Chrome Web Store and Firefox Add-ons URLs, with a separate publication status where needed; and
- other reviewed public release metadata.

The updater should reject missing fields, unexpected types, unsupported platform states, non-HTTPS
URLs, duplicate markers, and edits outside the allowlisted ReadBooster files. It should escape any
release text before inserting it into HTML or JavaScript.

## Secret and permissions

Create `WEBSITE_REPO_TOKEN` in the **ReadBooster source repository**, not in the public website
content. The future ReadBooster release workflow is the only workflow that should use it.

Use a fine-grained GitHub token with:

- access limited to `inspiringsource/inspiringsource.github.io`;
- repository **Contents: Read and write** permission; and
- no organization, administration, issues, actions, packages, or unrelated repository access.

The workflow itself should declare `contents: read` for the ReadBooster repository. Do not make the
secret available to pull-request workflows or run the website update for untrusted fork content.
Prefer an explicit release tag or manual trigger over every push.

## Automated now

- GitHub Pages serves the checked-in static `ReadBooster/` directory from the website `main` branch.
- The two pages read mutable values from the shared configuration file.
- The shared renderer validates store URLs before replacing the accessible HTML fallback links.
- Chrome links to its published Web Store listing.
- Firefox links to its published Add-ons listing.

## Still manual

- ReadBooster release metadata is not yet copied from the extension repository.
- Store URL changes must keep the shared configuration and both HTML fallback link sets synchronized.
- Platform-status and release-note changes require a reviewed website update.
- The source-repository updater and release workflow must be implemented in the ReadBooster
  repository when its public metadata contract is finalized.
