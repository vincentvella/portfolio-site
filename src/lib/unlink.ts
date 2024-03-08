export function unlink(link?: string) {
  if (!link) return "";

  return link
    .replace("tel:", "")
    .replace("mailto:", "")
    .replace("https://", "")
    .replace("github.com/", "");
}
