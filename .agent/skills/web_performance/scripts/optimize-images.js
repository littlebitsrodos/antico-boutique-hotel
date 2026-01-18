const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Default configuration
const CONFIG = {
  quality: 80,
  effort: 6,
  targetDir: "./images",
  extensions: [".png", ".jpg", ".jpeg", ".webp"],
};

const imgDir = path.resolve(process.cwd(), CONFIG.targetDir);

if (!fs.existsSync(imgDir)) {
  console.error(`Target directory not found: ${imgDir}`);
  process.exit(1);
}

const files = fs.readdirSync(imgDir);

console.log(`Scanning ${imgDir} for images...`);

files.forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();

  // Skip already optimized files if they follow a naming convention (optional)
  // Here we just overwrite or update in place if smaller

  if (CONFIG.extensions.includes(ext)) {
    const inputPath = path.join(imgDir, file);
    // Create a temporary output path
    const outputPath = path.join(imgDir, "temp_" + file);

    try {
      const oldSize = fs.statSync(inputPath).size;

      // Optimize
      await sharp(inputPath)
        .webp({ quality: CONFIG.quality, effort: CONFIG.effort })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;

      // Only replace if we actually saved space
      if (newSize < oldSize) {
        fs.renameSync(outputPath, inputPath); // Overwrite original
        const savings = Math.round(((oldSize - newSize) / oldSize) * 100);
        console.log(
          `✅ Optimized ${file}: ${(oldSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (${savings}% saved)`,
        );
      } else {
        fs.unlinkSync(outputPath); // Delete temp file
        console.log(`Skipped ${file} (no savings)`);
      }
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
      // Clean up temp file if it exists
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    }
  }
});
