const fs = require("fs");
const path = require("path");

const dir = ".lighthouseci";
const files = fs
  .readdirSync(dir)
  .filter((f) => f.startsWith("lhr-") && f.endsWith(".json"));

// Sort by mtime desc
const sortedFiles = files
  .map((f) => ({
    name: f,
    time: fs.statSync(path.join(dir, f)).mtime.getTime(),
  }))
  .sort((a, b) => b.time - a.time)
  .slice(0, 50); // Get recent reports

console.log(
  "| Page | Performance | Accessibility | Best Practices | SEO | PWA |",
);
console.log("|---|---|---|---|---|---|");

sortedFiles.reverse().forEach((fileData) => {
  // Reverse to show in chronological order of run
  const content = fs.readFileSync(path.join(dir, fileData.name), "utf8");
  const json = JSON.parse(content);
  const url = json.finalUrl;
  const cats = json.categories;

  console.log(
    `| ${path.basename(url)} | ${cats.performance.score} | ${cats.accessibility.score} | ${cats["best-practices"].score} | ${cats.seo.score} | ${cats.pwa.score} |`,
  );
});
