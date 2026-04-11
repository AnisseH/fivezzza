/**
 * Removes the black background from pizza_logo_no_text.png
 * by using max(R,G,B) as the alpha channel.
 * Run: node scripts/make-transparent-logo.mjs
 */
import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const { data, info } = await sharp(resolve(root, 'image_assets/pizza_logo_no_text.png'))
  .raw()
  .toBuffer({ resolveWithObject: true });

const rgba = Buffer.alloc(info.width * info.height * 4);
for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * 3];
  const g = data[i * 3 + 1];
  const b = data[i * 3 + 2];
  rgba[i * 4]     = r;
  rgba[i * 4 + 1] = g;
  rgba[i * 4 + 2] = b;
  rgba[i * 4 + 3] = Math.max(r, g, b); // black → transparent, white/blue → opaque
}

await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(resolve(root, 'public/pizza-mascot.png'));

console.log('✓ public/pizza-mascot.png');
