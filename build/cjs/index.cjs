"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importx = exports.resolve = exports.dirname = exports.isESM = void 0;
const tslib_1 = require("tslib");
const glob = tslib_1.__importStar(require("glob"));
const path = tslib_1.__importStar(require("path"));
const url_1 = require("url");
exports.isESM = false;
function dirname(url) {
    return path.dirname((0, url_1.fileURLToPath)(url));
}
exports.dirname = dirname;
function resolve(ignore, ...paths) {
    const imports = [];
    paths.forEach((ps) => {
        const files = glob.sync(ps.split(path.sep).join("/"));
        files.forEach((file) => {
            if (!imports.includes(file) && (!file.includes(ignore)))
                imports.push(file);
        });
    });
    return imports;
}
exports.resolve = resolve;
/**
 * Bulk import files.
 * @param {string} ignore Don't import files that contain this string. Leave "null" to import all files.
 * @param {string[]} paths Paths to import
 */
async function importx(ignore, ...paths) {
    const files = resolve(ignore, ...paths);
    await Promise.all(files.map((file) => require(file)));
}
exports.importx = importx;
//# sourceMappingURL=index.cjs.map