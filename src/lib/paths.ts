export const basePath =
  process.env.NEXT_PUBLIC_PAGES_BASE_PATH ?? process.env.PAGES_BASE_PATH ?? "";

export function withBasePath(path: string) {
  return `${basePath}${path}`;
}