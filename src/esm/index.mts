import glob from "glob";
import path from "path";
import { fileURLToPath } from "url";

export const isESM = true;

export function dirname(url: string): string {
  return path.dirname(fileURLToPath(url));
}

export function resolve(ignore: string, ...paths: string[]): string[] {
  const imports: string[] = [];

  paths.forEach((ps) => {
    const files = glob.sync(ps.split(path.sep).join("/"));

    files.forEach((file) => {
      if (!imports.includes(file) && !file.includes(ignore)) imports.push("file://" + file);
    });

  });

  return imports;
}

/**
 * Bulk import files.
 * @param {string} ignore Don't import files that contain this string. Leave "null" to import all files.
 * @param {string[]} paths Paths to import
 */
export async function importx(ignore: string, ...paths: string[]): Promise<void> {
  const files = resolve(ignore, ...paths);
  await Promise.all(files.map((file) => import(file)));
}
