# inspiringsource.github.io

Minimalist personal website — hosted on GitHub Pages.

## Project structure

```
/
├── index.html          # Main page (HTML only, no inline CSS or JS)
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Language toggle, typing animation, i18n
├── flags/
│   ├── ch.svg          # Swiss flag (used in language toggle)
│   └── gb.svg          # UK flag (used in language toggle)
├── favicon/            # Favicon set (ico, png, svg, webmanifest)
├── logo/               # GitHub and LeetCode logo images
├── Rocket.html         # Standalone rocket animation page
└── README.md
```

This is a plain static site — no framework, no bundler, no npm. It deploys directly from the `main` branch via GitHub Pages.

## Features

- GitHub avatar and name
- Language toggle (German / English) with flag icons
- Typing animation for the subtitle
- Mobile-responsive layout
- Custom favicons for all devices and browsers

## Resources

The rocket design is based on a public domain rocket from [Public Domain Vectors](https://publicdomainvectors.org/en/free-clipart/Colorful-missle-vector-image/74243.html). The stars effect was inspired by [WheresDara's CodePen](https://codepen.io/wheresdara/pen/wvXBpwa). I used the CSS code and adapted it for [this project](https://inspiringsource.github.io/Rocket). The typing effect is inspired by this [CodePen project by HubSpot](https://codepen.io/hubspot/pen/abKBJbM).
