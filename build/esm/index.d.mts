export declare const isESM = true;
export declare function dirname(url: string): string;
export declare function resolve(ignore: string, ...paths: string[]): string[];
/**
 * Bulk import files.
 * @param {string} ignore Don't import files that contain this string. Leave "null" to import all files.
 * @param {string[]} paths Paths to import
 */
export declare function importx(ignore: string, ...paths: string[]): Promise<void>;
