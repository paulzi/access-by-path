import { split } from 'escaping';

/**
 * Normalize input param path
 * @param path
 * @param splitChar
 * @param escapeChar
 * @return {Array}
 */
function normalize(path, splitChar, escapeChar) {
    return typeof path === 'string' ? split(path, splitChar || '.', escapeChar || '\\') : path;
}

/**
 * Get value in object by path
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} [defaultValue]
 * @param {string} [splitChar]
 * @param {string} [escapeChar]
 * @returns {*}
 */
export function getByPath(obj, path, defaultValue, splitChar, escapeChar) {
    let cur = obj;
    path = normalize(path, splitChar, escapeChar);
    for (let i = 0; i < path.length; i++) {
        let item = path[i];
        if (cur[item] === undefined) {
            return defaultValue;
        }
        cur = cur[item];
    }
    return cur !== undefined ? cur : defaultValue;
}

/**
 * Set value in object by path
 * @param {Object} obj
 * @param {string|Array} path
 * @param {string} [splitChar]
 * @param {string} [escapeChar]
 * @param {*} value
 */
export function setByPath(obj, path, value, splitChar, escapeChar) {
    let cur = obj;
    path = normalize(path, splitChar, escapeChar);
    let len = path.length;
    for (let i = 0; i < len; i++) {
        let item = path[i];
        if (i === len - 1) {
            cur[item] = value;
        } else if (cur[item] === undefined) {
            cur[item] = {};
        }
        cur = cur[item];
    }
}
