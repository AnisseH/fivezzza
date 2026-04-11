/**
 * Generates all favicon assets from image_assets/pizza_logo_no_text.png
 * Run once: node scripts/generate-favicons.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'image_assets/pizza_logo_no_text.png');
const pub = resolve(root, 'public');

async function resize(size, outName) {
  await sharp(src)
    .resize(size, size, { fit: 'contain', background: '#1A1720' })
    .png()
    .toFile(resolve(pub, outName));
  console.log(`✓ ${outName}`);
}

/** Build a valid .ico containing a single embedded PNG */
async function buildIco(pngPath, icoPath) {
  const png = readFileSync(pngPath);
  const pngLen = png.length;
  const offset = 6 + 16; // ICONDIR (6) + one ICONDIRENTRY (16)

  const buf = Buffer.alloc(offset + pngLen);

  // ICONDIR header
  buf.writeUInt16LE(0, 0);  // reserved
  buf.writeUInt16LE(1, 2);  // type: 1 = icon
  buf.writeUInt16LE(1, 4);  // image count

  // ICONDIRENTRY
  buf.writeUInt8(32, 6);    // width  (0 = 256)
  buf.writeUInt8(32, 7);    // height (0 = 256)
  buf.writeUInt8(0, 8);     // color count (0 = >256 colors)
  buf.writeUInt8(0, 9);     // reserved
  buf.writeUInt16LE(1, 10); // planes
  buf.writeUInt16LE(32, 12);// bit count
  buf.writeUInt32LE(pngLen, 14); // bytes in resource
  buf.writeUInt32LE(offset, 18); // offset to image data

  png.copy(buf, offset);
  writeFileSync(icoPath, buf);
  console.log('✓ favicon.ico');
}

// Generate PNG sizes
await resize(32,  'favicon-32x32.png');
await resize(180, 'apple-touch-icon.png');
await resize(192, 'favicon-192x192.png');
await resize(512, 'favicon-512x512.png');

// Build ICO from the 32x32 PNG
await buildIco(
  resolve(pub, 'favicon-32x32.png'),
  resolve(pub, 'favicon.ico'),
);

console.log('\nAll favicon assets written to public/');
