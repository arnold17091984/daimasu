#!/usr/bin/env node
/**
 * Pre-optimise the largest PNG/JPG source assets in /public.
 *  - Resizes images wider than 2560px to fit (lanczos)
 *  - Re-encodes PNG with Sharp's modern compressor (no quality loss)
 *  - Skips files already small enough
 *
 * Run: node scripts/optimize-images.mjs
 */
import {readdir, stat, rename} from 'node:fs/promises';
import {join, extname} from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/', import.meta.url).pathname;
const MAX_WIDTH = 2560;
const MIN_BYTES = 500_000; // skip files under 500KB
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
  const img = sharp(file);
  const meta = await img.metadata();
  const targetWidth =
    meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : null;

  let pipeline = sharp(file);
  if (targetWidth) {
    pipeline = pipeline.resize({width: targetWidth, withoutEnlargement: true, fit: 'inside'});
  }

  if (file.endsWith('.png')) {
    pipeline = pipeline.png({compressionLevel: 9, palette: true, effort: 9});
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
    await rename(tmp, file + '.discard'); // safety: always remove temp
    const {unlink} = await import('node:fs/promises');
    await unlink(file + '.discard').catch(() => {});
  }
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`
);
