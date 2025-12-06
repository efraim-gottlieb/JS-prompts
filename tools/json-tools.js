// כלים לעבודה עם JSON - JSON Tools
// JSON utility functions

/**
 * המרה בטוחה לJSON
 * Safe JSON stringify
 * @param {*} data - הנתונים להמרה
 * @param {number} spaces - כמות רווחים לעיצוב
 * @returns {string|null} מחרוזת JSON או null
 */
function safeStringify(data, spaces = 0) {
    try {
        return JSON.stringify(data, null, spaces);
    } catch (error) {
        console.error('Error stringifying JSON:', error.message);
        return null;
    }
}

/**
 * פירוק בטוח של JSON
 * Safe JSON parse
 * @param {string} jsonString - מחרוזת JSON
 * @returns {*|null} האובייקט או null
 */
function safeParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return null;
    }
}

/**
 * בדיקה אם מחרוזת היא JSON תקין
 * Check if string is valid JSON
 * @param {string} jsonString - המחרוזת לבדיקה
 * @returns {boolean} האם JSON תקין
 */
function isValidJson(jsonString) {
    if (typeof jsonString !== 'string') {
        return false;
    }
    
    try {
        JSON.parse(jsonString);
        return true;
    } catch {
        return false;
    }
}

/**
 * יצירת עותק עמוק של אובייקט
 * Create deep copy of object
 * @param {*} obj - האובייקט להעתקה
 * @returns {*} עותק עמוק
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (error) {
        console.error('Error cloning object:', error.message);
        return null;
    }
}

/**
 * השוואה עמוקה בין שני אובייקטים
 * Deep comparison of two objects
 * @param {*} obj1 - אובייקט ראשון
 * @param {*} obj2 - אובייקט שני
 * @returns {boolean} האם זהים
 */
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    
    if (obj1 == null || obj2 == null) return false;
    
    if (typeof obj1 !== typeof obj2) return false;
    
    if (typeof obj1 !== 'object') return obj1 === obj2;
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
    }
    
    return true;
}

/**
 * מיזוג אובייקטים עמוק
 * Deep merge objects
 * @param {...Object} objects - האובייקטים למיזוג
 * @returns {Object} אובייקט ממוזג
 */
function deepMerge(...objects) {
    const result = {};
    
    for (const obj of objects) {
        if (obj && typeof obj === 'object') {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                        result[key] = deepMerge(result[key] || {}, obj[key]);
                    } else {
                        result[key] = obj[key];
                    }
                }
            }
        }
    }
    
    return result;
}

/**
 * קבלת ערך מאובייקט לפי נתיב
 * Get value from object by path
 * @param {Object} obj - האובייקט
 * @param {string} path - הנתיב (למשל: 'user.profile.name')
 * @returns {*} הערך או undefined
 */
function getByPath(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

/**
 * הגדרת ערך באובייקט לפי נתיב
 * Set value in object by path
 * @param {Object} obj - האובייקט
 * @param {string} path - הנתיב
 * @param {*} value - הערך החדש
 */
function setByPath(obj, path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    
    const target = keys.reduce((current, key) => {
        if (!current[key] || typeof current[key] !== 'object') {
            current[key] = {};
        }
        return current[key];
    }, obj);
    
    target[lastKey] = value;
}

/**
 * בדיקה אם אובייקט ריק
 * Check if object is empty
 * @param {Object} obj - האובייקט לבדיקה
 * @returns {boolean} האם ריק
 */
function isEmpty(obj) {
    if (obj == null) return true;
    if (Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
}

/**
 * ניקוי אובייקט מערכים ריקים ו-null
 * Clean object from empty values and null
 * @param {Object} obj - האובייקט לניקוי
 * @returns {Object} אובייקט נקי
 */
function cleanObject(obj) {
    const result = {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            
            if (value === null || value === undefined || value === '') {
                continue;
            }
            
            if (typeof value === 'object' && !Array.isArray(value)) {
                const cleaned = cleanObject(value);
                if (!isEmpty(cleaned)) {
                    result[key] = cleaned;
                }
            } else if (Array.isArray(value) && value.length > 0) {
                result[key] = value;
            } else if (typeof value !== 'object') {
                result[key] = value;
            }
        }
    }
    
    return result;
}

/**
 * המרת אובייקט שטוח לאובייקט מקונן
 * Convert flat object to nested object
 * @param {Object} flatObj - אובייקט שטוח
 * @param {string} separator - מפריד הנתיבים
 * @returns {Object} אובייקט מקונן
 */
function unflatten(flatObj, separator = '.') {
    const result = {};
    
    for (const key in flatObj) {
        if (flatObj.hasOwnProperty(key)) {
            setByPath(result, key.replace(new RegExp(separator, 'g'), '.'), flatObj[key]);
        }
    }
    
    return result;
}

/**
 * המרת אובייקט מקונן לאובייקט שטוח
 * Convert nested object to flat object
 * @param {Object} obj - אובייקט מקונן
 * @param {string} prefix - קידומת
 * @param {string} separator - מפריד
 * @returns {Object} אובייקט שטוח
 */
function flatten(obj, prefix = '', separator = '.') {
    const result = {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const newKey = prefix ? `${prefix}${separator}${key}` : key;
            
            if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
                Object.assign(result, flatten(obj[key], newKey, separator));
            } else {
                result[newKey] = obj[key];
            }
        }
    }
    
    return result;
}

// ייצוא כל הפונקציות
module.exports = {
    safeStringify,
    safeParse,
    isValidJson,
    deepClone,
    deepEqual,
    deepMerge,
    getByPath,
    setByPath,
    isEmpty,
    cleanObject,
    unflatten,
    flatten
};