// lib/utils/helpers.js

export function fixCasing(word) {
  const formattedWord = word.replace(/-/g, " ");
  return formattedWord.replace(/\b\w/g, (l) => l.toUpperCase());
}

export function bytesToFileSize(bytes) {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log2(bytes) / 10);
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}
