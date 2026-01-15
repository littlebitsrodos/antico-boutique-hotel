const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imgDir = path.join(__dirname, "images");
const files = fs.readdirSync(imgDir);

files.forEach(async (file) => {
  const ext = path.extname(file).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".webp"].includes(ext)) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(imgDir, "opt_" + file);

    try {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);

      const oldSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;

      if (newSize < oldSize) {
        fs.renameSync(outputPath, inputPath);
        console.log(
          `Optimized ${file}: ${(oldSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB`,
        );
      } else {
        fs.unlinkSync(outputPath);
        console.log(`Skipped ${file} (already optimal)`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }
});
