export const markdownToArray = (markdown: string): string[] =>
  markdown.trim().split("\n\n");
