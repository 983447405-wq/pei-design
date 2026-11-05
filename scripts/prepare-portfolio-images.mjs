import { createRequire } from "node:module";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = path.resolve("public");
const files = [];
async function collect(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, item.name);
    if (item.isDirectory()) await collect(file);
    else if (/\.(png|jpe?g)$/i.test(file)) files.push(file);
  }
}
await collect(path.join(root, "project-details"));
await collect(path.join(root, "project-cases"));
files.push(path.join(root, "about-portrait.png"));
const manifest = {};
let original = 0,
  mobile = 0,
  desktop = 0;
for (const file of files.sort()) {
  const src = "/" + path.relative(root, file).split(path.sep).join("/");
  const name = path
    .relative(root, file)
    .replace(/\.[^.]+$/, "")
    .split(path.sep)
    .join("/");
  const meta = await sharp(file).metadata();
  const widths = [...new Set([Math.min(960, meta.width), Math.min(1920, meta.width)])];
  const variants = [];
  for (const width of widths) {
    const output = `/optimized/${name}-${width}.webp`;
    await mkdir(path.dirname(path.join(root, output)), { recursive: true });
    const result = await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88, effort: 5 })
      .toFile(path.join(root, output));
    variants.push({ src: output, width });
    if (width === widths[0]) mobile += result.size;
    if (width === widths.at(-1)) desktop += result.size;
  }
  const preview = await sharp(file).resize({ width: 24 }).webp({ quality: 25 }).toBuffer();
  manifest[src] = { width: meta.width, height: meta.height, variants, preview: `data:image/webp;base64,${preview.toString("base64")}` };
  original += (await stat(file)).size;
}
await writeFile("lib/portfolio-images.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(JSON.stringify({ images: files.length, original, mobile, desktop }));
