const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const htmlFiles = fs
  .readdirSync(rootDir)
  .filter((file) => path.extname(file) === ".html");

const DEFAULT_SIZES = "(max-width: 768px) 100vw, 50vw";
const HERO_SIZES = "100vw";
const CARD_SIZES = "(max-width: 768px) 100vw, 400px";

function updateHtmlFiles() {
  htmlFiles.forEach((file) => {
    let content = fs.readFileSync(path.join(rootDir, file), "utf8");
    let modified = false;

    // Regex to find img tags.
    // Captures: 1=before src, 2=src value, 3=after src
    const imgRegex = /(<img\s+[^>]*src=["'])([^"']+\.webp)(["'][^>]*>)/gi;

    content = content.replace(imgRegex, (match, before, src, after) => {
      if (!src.includes("images/")) return match;

      const baseName = path.basename(src, ".webp");
      const dirName = path.dirname(src);

      const srcset = `
            ${dirName}/${baseName}_400.webp 400w, 
            ${dirName}/${baseName}_800.webp 800w, 
            ${dirName}/${baseName}_1200.webp 1200w,
            ${src} 1920w`
        .replace(/\s+/g, " ")
        .trim();

      let sizes = DEFAULT_SIZES;
      if (
        after.includes('fetchpriority="high"') ||
        after.includes('class="hero-img"')
      ) {
        sizes = HERO_SIZES;
      } else if (after.includes("venue-card") || after.includes("card-img")) {
        sizes = CARD_SIZES;
      }

      if (after.includes("srcset=") || before.includes("srcset=")) {
        return match;
      }

      modified = true;

      // Robustly strip the existing closing tag (>, />, or > with spaces)
      const newAfter = after.replace(/\s*\/?>\s*$/, "");

      const output = `${before}${src}${newAfter} srcset="${srcset}" sizes="${sizes}" />`;

      console.log(`Updated ${src} in ${file}`);
      return output;
    });

    if (modified) {
      fs.writeFileSync(path.join(rootDir, file), content, "utf8");
      console.log(`Saved ${file}`);
    }
  });
}

updateHtmlFiles();
