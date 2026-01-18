const fs = require("fs");
const path = require("path");

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comments
    .replace(/\s+/g, " ") // Collapse whitespace
    .replace(/\s*([{};:,])\s*/g, "$1") // Remove spaces around delimiters
    .replace(/;}/g, "}") // Remove trailing semicolon
    .trim();
}

const targetDir = path.join(process.cwd(), "css");
const files = fs
  .readdirSync(targetDir)
  .filter((f) => f.endsWith(".css") && !f.endsWith(".min.css"));

files.forEach((file) => {
  const inputPath = path.join(targetDir, file);
  const outputPath = path.join(targetDir, file.replace(".css", ".min.css"));

  try {
    const css = fs.readFileSync(inputPath, "utf8");
    const minified = minifyCSS(css);
    fs.writeFileSync(outputPath, minified);

    const oldSize = css.length;
    const newSize = minified.length;
    const savings = Math.round(((oldSize - newSize) / oldSize) * 100);

    console.log(
      `✅ Minified ${file}: ${(oldSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (${savings}% saved)`,
    );
  } catch (err) {
    console.error(`❌ Error minifying ${file}:`, err.message);
  }
});
