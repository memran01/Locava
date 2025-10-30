'use strict';

/**
 * Locava Image Optimizer
 * ----------------------
 * Converts every .jpg/.jpeg/.png file inside `/images` (recursively) into a
 * high-quality .webp sibling using the Sharp library.
 *
 * Usage:
 *   1. Install dependencies (run once):
 *        npm install sharp
 *   2. Execute the script from the project root:
 *        node scripts/convert-images.js
 *
 * The original files are preserved. Already converted images are skipped.
 */

const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

const IMAGE_DIR = path.resolve(__dirname, '..', 'images');
const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const WEBP_QUALITY = 80;

async function collectImagePaths(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await collectImagePaths(fullPath);
      files.push(...nested);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (SUPPORTED_EXTENSIONS.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertToWebp(imagePath) {
  const ext = path.extname(imagePath);
  const outputPath = imagePath.slice(0, -ext.length) + '.webp';

  try {
    await fs.access(outputPath);
    console.log(`• Skipping (already exists): ${path.relative(IMAGE_DIR, outputPath)}`);
    return;
  } catch {
    // File does not exist, continue
  }

  await sharp(imagePath)
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toFile(outputPath);

  console.log(`✔ Converted: ${path.relative(IMAGE_DIR, imagePath)} → ${path.relative(IMAGE_DIR, outputPath)}`);
}

async function main() {
  console.log('Locava WebP conversion starting…');
  console.log(`Source directory: ${IMAGE_DIR}`);

  const imagePaths = await collectImagePaths(IMAGE_DIR);

  if (!imagePaths.length) {
    console.log('No JPEG or PNG images found. Nothing to do.');
    return;
  }

  for (const imagePath of imagePaths) {
    try {
      await convertToWebp(imagePath);
    } catch (error) {
      console.error(`✖ Failed to process ${imagePath}:`, error.message);
    }
  }

  console.log('All done! WebP assets are ready.');
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
