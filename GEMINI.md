# Project Context: Palazzo Antico

## Session Learnings

### CI/CD & Tooling
- **Pattern**: This project uses `Prettier` for code formatting and `linkinator` for broken link detection in CI.
- **Gotcha**: `linkinator` treats placeholder GTM URLs (e.g., `https://www.googletagmanager.com/ns.html?id=GTM-PLACEHOLDER`) as broken links because they return 404s.
  - **Fix**: These URLs must be explicitly skipped in the `lint:links` script in `package.json`.
- **Gotcha**: Ensure all local assets referenced in HTML (images, icons) actually exist in the repository, or `lint:links` will fail.
  - **Example**: `icon_history.svg` was missing and had to be removed (relied on emoji fallback).

### Local Development
- **Context**: Run `npm start` to launch `live-server` for local development.
