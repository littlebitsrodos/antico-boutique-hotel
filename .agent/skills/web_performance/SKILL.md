---
name: Web Performance Optimizer
description: A comprehensive guide and toolkit for optimizing web performance, accessibility, and SEO to achieve high Lighthouse scores.
---

# Web Performance Optimizer Skill

This skill provides a systematic workflow for auditing and optimizing web applications to meet Core Web Vitals and Lighthouse standards.

## 🎯 Objectives

- **Performance:** Eliminate render-blocking resources, optimize images, and ensure fast LCP.
- **Accessibility:** Ensure high contrast, semantic HTML, and proper ARIA labels.
- **Best Practices:** Use HTTPS, correct aspect ratios, and modern image formats.
- **SEO:** Optimize meta tags, structure data, and crawlability.
- **PWA:** Enable offline support and "Add to Home Screen" capabilities.

## 🛠️ Toolkit

### 1. Image Optimization

**Goal:** Serve images in modern formats (WebP) with proper sizing and compression.
**Tool:** `scripts/optimize-images.js` (uses `sharp`)

### 2. CSS Optimization

**Goal:** Minify CSS and eliminate render-blocking stylesheets.
**Tool:** `scripts/minify-css.js`

### 3. Font Loading

**Goal:** Prevent Flash of Invisible Text (FOIT) and reduce blocking time.
**Pattern:**

```html
<link rel="preload" href="font-url" as="style" />
<link
  rel="stylesheet"
  href="font-url"
  media="print"
  onload="this.media='all'"
/>
<noscript><link rel="stylesheet" href="font-url" /></noscript>
```

### 4. Layout Stability (CLS)

**Goal:** Prevent layout shifts.
**Checklist:**

- [ ] All `<img>` tags must have `width` and `height` attributes.
- [ ] All `<iframe>` tags must have `width` and `height` attributes.
- [ ] Hero sliders/carousels should have static containers or overlays outside the moving elements.

### 5. PWA & Caching

**Goal:** Enable offline access and efficient caching.
**Checklist:**

- [ ] `manifest.json` properly configured (relative paths if on GH Pages).
- [ ] `sw.js` (Service Worker) registered on _all_ pages.
- [ ] `offline.html` fallback page created.

## 🚀 Workflow

### Step 1: Initial Audit

Run Lighthouse CI or Chrome DevTools to identify baseline.

```bash
npm install -g @lhci/cli
lhci autorun
```

### Step 2: Optimize Assets

Run the optimization scripts located in this skill's `scripts/` folder.
_Note: You may need to copy these scripts to your project root or run them directly._

```bash
# Install dependencies
npm install sharp

# Run image optimization
node .agent/skills/web_performance/scripts/optimize-images.js

# Run CSS minification
node .agent/skills/web_performance/scripts/minify-css.js
```

### Step 3: Code Fixes

- **Fonts:** Update all HTML `<link>` tags for fonts to use the preload pattern.
- **CLS:** detailed pass to add dimensions to images/iframes.
- **PWA:** Ensure `sw.js` is registered:

```javascript
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}
```

### Step 4: Verification

Re-run Lighthouse to confirm improvements.

---

## 📦 Script Reference

### `optimize-images.js`

Scans for images and converts/compresses them to WebP.

### `minify-css.js`

Basic regex-based minifier for simple projects (use a build tool like Vite/Webpack for complex ones).
