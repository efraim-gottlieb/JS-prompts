// כלי טקסט ומחרוזות - String Tools
// String utility functions

/**
 * ניקוי טקסט מתווים מיוחדים
 * Clean text from special characters
 * @param {string} text - הטקסט לניקוי
 * @returns {string} טקסט נקי
 */
function sanitizeText(text) {
    if (typeof text !== 'string') return '';
    return text.replace(/[^\u0590-\u05FFa-zA-Z0-9\s\-\.]/g, '');
}

/**
 * המרת טקסט לכותרת
 * Convert to title case
 * @param {string} text - הטקסט
 * @returns {string} כותרת
 */
function toTitleCase(text) {
    return text.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

/**
 * קיצור טקסט
 * Truncate text
 * @param {string} text - הטקסט
 * @param {number} length - אורך מקסימלי
 * @param {string} suffix - סיומת
 * @returns {string} טקסט מקוצר
 */
function truncate(text, length, suffix = '...') {
    if (text.length <= length) return text;
    return text.substring(0, length - suffix.length) + suffix;
}

/**
 * המרת עברית לאנגלית (טרנסליטרציה)
 * Hebrew to English transliteration
 * @param {string} hebrewText - טקסט בעברית
 * @returns {string} טקסט באנגלית
 */
function hebrewToEnglish(hebrewText) {
    const hebrewToEnglishMap = {
        'א': 'a', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h', 'ו': 'v',
        'ז': 'z', 'ח': 'ch', 'ט': 't', 'י': 'y', 'כ': 'k', 'ך': 'k',
        'ל': 'l', 'מ': 'm', 'ם': 'm', 'נ': 'n', 'ן': 'n', 'ס': 's',
        'ע': 'a', 'פ': 'p', 'ף': 'f', 'צ': 'ts', 'ץ': 'ts', 'ק': 'q',
        'ר': 'r', 'ש': 'sh', 'ת': 't', ' ': ' '
    };
    
    return hebrewText.split('').map(char => hebrewToEnglishMap[char] || char).join('');
}

/**
 * חיפוש והדגשה
 * Search and highlight
 * @param {string} text - הטקסט
 * @param {string} searchTerm - המילה לחיפוש
 * @param {string} highlightClass - כיתה להדגשה
 * @returns {string} טקסט עם הדגשה
 */
function highlightText(text, searchTerm, highlightClass = 'highlight') {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, `<span class="${highlightClass}">$1</span>`);
}

/**
 * ספירת מילים
 * Count words
 * @param {string} text - הטקסט
 * @returns {number} כמות המילים
 */
function wordCount(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * יצירת slug מטקסט
 * Create slug from text
 * @param {string} text - הטקסט
 * @returns {string} slug
 */
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/**
 * בדיקה אם מחרוזת מכילה רק עברית
 * Check if string contains only Hebrew
 * @param {string} text - הטקסט לבדיקה
 * @returns {boolean} האם עברית בלבד
 */
function isHebrewOnly(text) {
    return /^[\u0590-\u05FF\s]+$/.test(text);
}

/**
 * בדיקה אם מחרוזת מכילה רק אנגלית
 * Check if string contains only English
 * @param {string} text - הטקסט לבדיקה
 * @returns {boolean} האם אנגלית בלבד
 */
function isEnglishOnly(text) {
    return /^[a-zA-Z\s]+$/.test(text);
}

/**
 * המרת מספר למילים בעברית
 * Convert number to Hebrew words
 * @param {number} num - המספר
 * @returns {string} המספר במילים
 */
function numberToHebrewWords(num) {
    const ones = ['', 'אחד', 'שניים', 'שלושה', 'ארבעה', 'חמישה', 'שישה', 'שבעה', 'שמונה', 'תשעה'];
    const tens = ['', '', 'עשרים', 'שלושים', 'ארבעים', 'חמישים', 'שישים', 'שבעים', 'שמונים', 'תשעים'];
    const teens = ['עשר', 'אחד עשר', 'שניים עשר', 'שלושה עשר', 'ארבעה עשר', 'חמישה עשר', 'שישה עשר', 'שבעה עשר', 'שמונה עשר', 'תשעה עשר'];
    
    if (num === 0) return 'אפס';
    if (num < 0) return 'מינוס ' + numberToHebrewWords(-num);
    if (num >= 1000) return num.toString(); // מעל 1000 נחזיר כמספר
    
    let result = '';
    
    // מאות
    if (num >= 100) {
        const hundreds = Math.floor(num / 100);
        if (hundreds === 1) result += 'מאה ';
        else if (hundreds === 2) result += 'מאתיים ';
        else result += ones[hundreds] + ' מאות ';
        num %= 100;
    }
    
    // עשרות ויחידות
    if (num >= 20) {
        result += tens[Math.floor(num / 10)];
        if (num % 10 > 0) result += ' ו' + ones[num % 10];
    } else if (num >= 10) {
        result += teens[num - 10];
    } else if (num > 0) {
        result += ones[num];
    }
    
    return result.trim();
}

/**
 * יצירת ראשי תיבות
 * Create initials/acronym
 * @param {string} text - הטקסט
 * @returns {string} ראשי תיבות
 */
function getInitials(text) {
    return text
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('');
}

// ייצוא כל הפונקציות
module.exports = {
    sanitizeText,
    toTitleCase,
    truncate,
    hebrewToEnglish,
    highlightText,
    wordCount,
    createSlug,
    isHebrewOnly,
    isEnglishOnly,
    numberToHebrewWords,
    getInitials
};