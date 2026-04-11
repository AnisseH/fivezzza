/**
 * Removes white background from the full logo and saves an optimized transparent PNG.
 * Run: node scripts/optimize-full-logo.mjs
 */
import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const src = 'C:/Users/Anisse/Downloads/FIVEZZZA (210 x 60 cm) (200 x 32 cm)(4).png';

const { data, info } = await sharp(src)
  .raw()
  .toBuffer({ resolveWithObject: true });

const rgba = Buffer.alloc(info.width * info.height * 4);

for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * info.channels];
  const g = data[i * info.channels + 1];
  const b = data[i * info.channels + 2];

  rgba[i * 4]     = r;
  rgba[i * 4 + 1] = g;
  rgba[i * 4 + 2] = b;
  // White background removal: alpha = 2× distance from white, clamped to 255
  rgba[i * 4 + 3] = Math.min(255, (255 - Math.min(r, g, b)) * 2);
}

await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(resolve(root, 'src/assets/logo-full.png'));

console.log(`✓ src/assets/logo-full.png  (${info.width}×${info.height})`);
