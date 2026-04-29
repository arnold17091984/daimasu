#!/usr/bin/env node
/**
 * Pre-optimise source assets in /public for the luxury site.
 *
 *   1. Resize anything wider than MAX_WIDTH (1920px) — luxury hero photos
 *      don't need 4K originals; next/image will downscale per breakpoint
 *      anyway, so storing 4K wastes ~70% of the bytes.
 *   2. Re-encode PNG with palette + max compression. For very large or
 *      photographic PNGs the palette mode loses detail, so we fall back
 *      to lossless `compressionLevel: 9` for those.
 *   3. Re-encode JPG with mozjpeg quality 82, progressive.
 *
 *   AVIF / WebP variants are generated on-demand by next/image at
 *   request time (next.config.ts already enables both formats with a
 *   one-year cache TTL). We only optimise the originals here.
 *
 * Run: node scripts/optimize-images.mjs
 */
import {readdir, stat, rename, unlink} from 'node:fs/promises';
import {join, extname} from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/', import.meta.url).pathname;
const MAX_WIDTH = 1920;
const MIN_BYTES = 200_000; // skip files under 200KB
const exts = new Set(['.png', '.jpg', '.jpeg']);

async function* walk(dir) {
  for (const ent of await readdir(dir, {withFileTypes: true})) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(p);
    else if (exts.has(extname(ent.name).toLowerCase())) yield p;
  }
}

let totalBefore = 0;
let totalAfter = 0;

for await (const file of walk(ROOT)) {
  const before = (await stat(file)).size;
  if (before < MIN_BYTES) continue;

  const tmp = `${file}.opt.tmp`;
  const meta = await sharp(file).metadata();
  const targetWidth =
    meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : null;

  let pipeline = sharp(file);
  if (targetWidth) {
    pipeline = pipeline.resize({
      width: targetWidth,
      withoutEnlargement: true,
      fit: 'inside'
    });
  }

  if (file.endsWith('.png')) {
    // Photographic PNGs do badly under palette mode (banding, dithering
    // artefacts on skin). Files >2MB are almost always photos at this
    // size, so use lossless compressionLevel 9 there. Smaller PNGs are
    // typically icons/logos and survive palette mode fine.
    if (before > 2_000_000) {
      pipeline = pipeline.png({compressionLevel: 9, effort: 10});
    } else {
      pipeline = pipeline.png({compressionLevel: 9, palette: true, effort: 10});
    }
  } else {
    pipeline = pipeline.jpeg({quality: 82, progressive: true, mozjpeg: true});
  }

  await pipeline.toFile(tmp);
  const after = (await stat(tmp)).size;

  if (after < before * 0.95) {
    await rename(tmp, file);
    totalBefore += before;
    totalAfter += after;
    console.log(
      `${file.replace(ROOT, '')}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (${((1 - after / before) * 100).toFixed(0)}% smaller${targetWidth ? `, resized to ${targetWidth}px` : ''})`
    );
  } else {
    await unlink(tmp).catch(() => {});
  }
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`
);
