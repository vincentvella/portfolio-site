import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

export type ImageDims = { width: number; height: number; aspectRatio: number };

/**
 * Read width/height from a public image. Currently supports PNG and JPG.
 * Returns undefined for any other type or if the file can't be read.
 */
export function getPublicImageDims(
  publicPath: string | undefined,
): ImageDims | undefined {
  if (!publicPath) return undefined;
  const fullPath = path.join(process.cwd(), "public", publicPath);
  if (!existsSync(fullPath)) return undefined;

  try {
    const buf = readFileSync(fullPath);

    // PNG: 8-byte signature, then IHDR chunk with width/height as big-endian
    // uint32 at offsets 16 and 20.
    if (
      buf.length >= 24 &&
      buf[0] === 0x89 &&
      buf[1] === 0x50 &&
      buf[2] === 0x4e &&
      buf[3] === 0x47
    ) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      if (width > 0 && height > 0) {
        return { width, height, aspectRatio: width / height };
      }
    }

    // JPG: walk segments looking for SOFn (0xFFC0–0xFFCF, except 0xFFC4/C8/CC).
    if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
      let i = 2;
      while (i < buf.length - 8) {
        if (buf[i] !== 0xff) break;
        const marker = buf[i + 1];
        // Skip standalone markers
        if (marker === 0xd8 || marker === 0xd9) {
          i += 2;
          continue;
        }
        const segLength = buf.readUInt16BE(i + 2);
        if (
          marker >= 0xc0 &&
          marker <= 0xcf &&
          marker !== 0xc4 &&
          marker !== 0xc8 &&
          marker !== 0xcc
        ) {
          const height = buf.readUInt16BE(i + 5);
          const width = buf.readUInt16BE(i + 7);
          if (width > 0 && height > 0) {
            return { width, height, aspectRatio: width / height };
          }
          break;
        }
        i += 2 + segLength;
      }
    }
  } catch {
    // fall through
  }

  return undefined;
}
