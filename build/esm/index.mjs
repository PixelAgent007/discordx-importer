import glob from "glob";
import path from "path";
import { fileURLToPath } from "url";
export const isESM = true;
export function dirname(url) {
    return path.dirname(fileURLToPath(url));
}
export function resolve(ignore, ...paths) {
    const imports = [];
    paths.forEach((ps) => {
        const files = glob.sync(ps.split(path.sep).join("/"));
        files.forEach((file) => {
            if (!imports.includes(file) && !file.includes(ignore))
                imports.push("file://" + file);
        });
    });
    return imports;
}
/**
 * Bulk import files.
 * @param {string} ignore Don't import files that contain this string. Leave "null" to import all files.
 * @param {string[]} paths Paths to import
 */
export async function importx(ignore, ...paths) {
    const files = resolve(ignore, ...paths);
    await Promise.all(files.map((file) => import(file)));
}
//# sourceMappingURL=index.mjs.map