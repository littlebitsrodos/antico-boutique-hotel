# Palazzo Antico

A boutique hotel website for Palazzo Antico in Rhodes.

## Development

### Prerequisites

- Node.js installed

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start a local development server with hot reload:

```bash
npm start
```

### Code Formatting

To format the code using Prettier:

```bash
npm run format
```

## DevOps

This project uses:

- **Prettier** for code formatting.
- **GitHub Actions** for CI to check formatting and links on pull requests.
- **Lighthouse CI (The Scoreboard)** for performance, SEO, and accessibility auditing.
- **Sharp (The Shrink)** for automatic image optimization and compression.

## Gamified Workflow

You can now control your dev session with two simple commands:

1.  **"Start"**: Run the following to start the server:
    ```bash
    npm start
    ```
2.  **"Game Over"**: When you are done, run this to format, save, and push everything automatically:
    ```bash
    npm run game-over
    ```
