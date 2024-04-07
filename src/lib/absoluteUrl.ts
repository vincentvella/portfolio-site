export function absoluteUrl(path: string) {
  return `${process.env?.NEXT_PUBLIC_DOMAIN || "http://localhost:3000"}${path}`;
}
