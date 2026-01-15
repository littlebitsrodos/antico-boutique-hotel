const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imgDir = path.join(__dirname, "images");
const files = fs.readdirSync(imgDir);

const sizes = [400, 800, 1200];

async function processImages() {
  for (const file of files) {
    if (path.extname(file).toLowerCase() === ".webp") {
      // Skip if it's already a resized variant or inside a subdirectory
      if (
        file.includes("_400") ||
        file.includes("_800") ||
        file.includes("_1200")
      )
        continue;

      const inputPath = path.join(imgDir, file);

      for (const size of sizes) {
        const outputPath = path.join(
          imgDir,
          file.replace(".webp", `_${size}.webp`),
        );

        if (fs.existsSync(outputPath)) {
          console.log(`Skipping ${file} -> ${size}px (already exists)`);
          continue;
        }

        try {
          await sharp(inputPath)
            .resize(size)
            .webp({ quality: 80, effort: 4 }) // Effort 4 is faster
            .toFile(outputPath);
          console.log(`Generated ${file} -> ${size}px`);
        } catch (err) {
          console.error(`Error processing ${file} at ${size}px:`, err.message);
        }
      }
    }
  }
}

processImages();
