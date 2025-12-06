// כלים עזר כלליים - Utility Tools
// General utility functions

/**
 * בדיקת סוג נתון
 * Check data type
 * @param {*} value - הערך לבדיקה
 * @returns {string} סוג הנתון
 */
function getType(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    return typeof value;
}

/**
 * בדיקה אם ערך הוא מספר
 * Check if value is a number
 * @param {*} value - הערך לבדיקה
 * @returns {boolean} האם מספר תקין
 */
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * בדיקה אם ערך הוא מחרוזת לא ריקה
 * Check if value is non-empty string
 * @param {*} value - הערך לבדיקה
 * @returns {boolean} האם מחרוזת לא ריקה
 */
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

/**
 * המתנה (delay)
 * Wait for specified time
 * @param {number} ms - זמן במילישניות
 * @returns {Promise} Promise שמסתיים אחרי הזמן
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * יצירת ID ייחודי
 * Generate unique ID
 * @param {number} length - אורך המזהה
 * @returns {string} מזהה ייחודי
 */
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * יצירת timestamp
 * Generate timestamp
 * @returns {number} timestamp נוכחי
 */
function timestamp() {
    return Date.now();
}

/**
 * פורמט תאריך בעברית
 * Format date in Hebrew
 * @param {Date|string|number} date - התאריך
 * @returns {string} תאריך מעוצב
 */
function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    };
    
    return new Date(date).toLocaleDateString('he-IL', defaultOptions);
}

/**
 * פורמט זמן
 * Format time
 * @param {Date|string|number} date - התאריך
 * @returns {string} זמן מעוצב
 */
function formatTime(date) {
    return new Date(date).toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * Debounce - עיכוב ביצוע פונקציה
 * Debounce function execution
 * @param {Function} func - הפונקציה
 * @param {number} wait - זמן ההמתנה
 * @returns {Function} פונקציה עם debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle - הגבלת תדירות ביצוע פונקציה
 * Throttle function execution
 * @param {Function} func - הפונקציה
 * @param {number} limit - הגבלת הזמן
 * @returns {Function} פונקציה עם throttle
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * המרת גדלים (bytes)
 * Convert bytes to human readable format
 * @param {number} bytes - גודל בבייטים
 * @param {number} decimals - כמות עשרוניות
 * @returns {string} גודל מעוצב
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

/**
 * טיפול בשגיאות בצורה בטוחה
 * Safe error handling
 * @param {Function} operation - הפעולה
 * @param {*} defaultValue - ערך ברירת מחדל
 * @returns {*} תוצאה או ערך ברירת מחדל
 */
function tryCatch(operation, defaultValue = null) {
    try {
        return operation();
    } catch (error) {
        console.error('Operation failed:', error.message);
        return defaultValue;
    }
}

/**
 * בדיקה אם כתובת URL תקינה
 * Check if URL is valid
 * @param {string} url - הכתובת לבדיקה
 * @returns {boolean} האם תקינה
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * בדיקה אם כתובת אימייל תקינה
 * Check if email is valid
 * @param {string} email - האימייל לבדיקה
 * @returns {boolean} האם תקין
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * ניקוי טקסט מרווחים מיותרים
 * Clean text from extra spaces
 * @param {string} text - הטקסט
 * @returns {string} טקסט נקי
 */
function cleanText(text) {
    if (typeof text !== 'string') return '';
    return text.trim().replace(/\s+/g, ' ');
}

/**
 * המרת מחרוזת לכותרת (capitalize)
 * Convert string to title case
 * @param {string} str - המחרוזת
 * @returns {string} כותרת
 */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * יצירת אובייקט URL מחרוזת שאילתה
 * Parse URL query string
 * @param {string} queryString - מחרוזת השאילתה
 * @returns {Object} אובייקט עם הפרמטרים
 */
function parseQuery(queryString) {
    const params = {};
    const urlParams = new URLSearchParams(queryString);
    
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    
    return params;
}

/**
 * יצירת מחרוזת שאילתה מאובייקט
 * Create query string from object
 * @param {Object} params - האובייקט
 * @returns {string} מחרוזת השאילתה
 */
function buildQuery(params) {
    const urlParams = new URLSearchParams();
    
    for (const [key, value] of Object.entries(params)) {
        if (value !== null && value !== undefined) {
            urlParams.append(key, value);
        }
    }
    
    return urlParams.toString();
}

// ייצוא כל הפונקציות
module.exports = {
    getType,
    isNumber,
    isNonEmptyString,
    delay,
    generateId,
    timestamp,
    formatDate,
    formatTime,
    debounce,
    throttle,
    formatBytes,
    tryCatch,
    isValidUrl,
    isValidEmail,
    cleanText,
    toTitleCase,
    parseQuery,
    buildQuery
};