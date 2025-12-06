// כלים לעבודה עם מערכים - Array Tools
// Array utility functions

/**
 * סינון מערך לפי תנאי
 * Filter array by condition
 * @param {Array} array - המערך
 * @param {function} condition - פונקציית התנאי
 * @returns {Array} המערך המסונן
 */
function filterBy(array, condition) {
    return array.filter(condition);
}

/**
 * מיון מערך לפי מפתח
 * Sort array by property
 * @param {Array} array - המערך
 * @param {string} key - המפתח למיון
 * @param {boolean} ascending - מיון עולה/יורד
 * @returns {Array} המערך הממוין
 */
function sortBy(array, key, ascending = true) {
    return [...array].sort((a, b) => {
        const valueA = typeof a === 'object' ? a[key] : a;
        const valueB = typeof b === 'object' ? b[key] : b;
        
        if (ascending) {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
}

/**
 * קיבוץ מערך לפי מפתח
 * Group array by property
 * @param {Array} array - המערך
 * @param {string} key - המפתח לקיבוץ
 * @returns {Object} אובייקט מקובץ
 */
function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const groupKey = typeof item === 'object' ? item[key] : item;
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {});
}

/**
 * הסרת כפילויות מהמערך
 * Remove duplicates from array
 * @param {Array} array - המערך
 * @returns {Array} מערך ללא כפילויות
 */
function unique(array) {
    return [...new Set(array)];
}

/**
 * הסרת כפילויות באובייקטים לפי מפתח
 * Remove duplicate objects by key
 * @param {Array} array - מערך אובייקטים
 * @param {string} key - המפתח לבדיקה
 * @returns {Array} מערך ללא כפילויות
 */
function uniqueBy(array, key) {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value)) {
            return false;
        }
        seen.add(value);
        return true;
    });
}

/**
 * ערבוב מערך (shuffle)
 * Shuffle array randomly
 * @param {Array} array - המערך
 * @returns {Array} מערך מעורבב
 */
function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/**
 * חלוקת מערך לחלקים
 * Split array into chunks
 * @param {Array} array - המערך
 * @param {number} size - גודל החלק
 * @returns {Array[]} מערך של חלקים
 */
function chunk(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}

/**
 * שטיחת מערך מרובה רמות
 * Flatten nested array
 * @param {Array} array - המערך המקונן
 * @returns {Array} מערך שטוח
 */
function flatten(array) {
    return array.flat(Infinity);
}

/**
 * מציאת הפריט הראשון שעונה לתנאי
 * Find first item matching condition
 * @param {Array} array - המערך
 * @param {function} condition - התנאי
 * @returns {*} הפריט או null
 */
function findFirst(array, condition) {
    return array.find(condition) || null;
}

/**
 * מציאת האינדקס הראשון שעונה לתנאי
 * Find first index matching condition
 * @param {Array} array - המערך
 * @param {function} condition - התנאי
 * @returns {number} האינדקס או -1
 */
function findIndex(array, condition) {
    return array.findIndex(condition);
}

/**
 * ספירת פריטים שעונים לתנאי
 * Count items matching condition
 * @param {Array} array - המערך
 * @param {function} condition - התנאי
 * @returns {number} כמות הפריטים
 */
function countBy(array, condition) {
    return array.filter(condition).length;
}

/**
 * בדיקה אם כל הפריטים עונים לתנאי
 * Check if all items match condition
 * @param {Array} array - המערך
 * @param {function} condition - התנאי
 * @returns {boolean} האם כולם עונים
 */
function allMatch(array, condition) {
    return array.every(condition);
}

/**
 * בדיקה אם לפחות פריט אחד עונה לתנאי
 * Check if any item matches condition
 * @param {Array} array - המערך
 * @param {function} condition - התנאי
 * @returns {boolean} האם יש כזה
 */
function anyMatch(array, condition) {
    return array.some(condition);
}

/**
 * הסרת פריטים מהמערך
 * Remove items from array
 * @param {Array} array - המערך
 * @param {function} condition - תנאי ההסרה
 * @returns {Array} מערך חדש ללא הפריטים
 */
function remove(array, condition) {
    return array.filter(item => !condition(item));
}

/**
 * לקיחת מספר פריטים מההתחלה
 * Take first N items
 * @param {Array} array - המערך
 * @param {number} count - כמות הפריטים
 * @returns {Array} הפריטים הראשונים
 */
function take(array, count) {
    return array.slice(0, count);
}

/**
 * דילוג על מספר פריטים מההתחלה
 * Skip first N items
 * @param {Array} array - המערך
 * @param {number} count - כמות הפריטים לדלג
 * @returns {Array} יתרת המערך
 */
function skip(array, count) {
    return array.slice(count);
}

// ייצוא כל הפונקציות
module.exports = {
    filterBy,
    sortBy,
    groupBy,
    unique,
    uniqueBy,
    shuffle,
    chunk,
    flatten,
    findFirst,
    findIndex,
    countBy,
    allMatch,
    anyMatch,
    remove,
    take,
    skip
};