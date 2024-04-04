// Not all markdown is using escaped newlines, so we need to account for both
export const markdownToArray = (markdown: string): string[] =>
  markdown.trim().split(/\n\n|\\n\\n/);
