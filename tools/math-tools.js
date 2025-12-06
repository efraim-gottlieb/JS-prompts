// כלים מתמטיים - Math Tools
// Mathematical utility functions

/**
 * חישוב סכום מערך מספרים
 * Calculate sum of array numbers
 * @param {number[]} numbers - מערך מספרים
 * @returns {number} סכום המערך
 */
function sum(numbers) {
    if (!Array.isArray(numbers)) {
        throw new Error('Input must be an array');
    }
    return numbers.reduce((total, num) => total + num, 0);
}

/**
 * חישוב ממוצע מערך מספרים
 * Calculate average of array numbers
 * @param {number[]} numbers - מערך מספרים
 * @returns {number} ממוצע המערך
 */
function average(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    return sum(numbers) / numbers.length;
}

/**
 * מציאת הערך הגבוה ביותר
 * Find maximum value
 * @param {number[]} numbers - מערך מספרים
 * @returns {number} הערך המקסימלי
 */
function max(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    return Math.max(...numbers);
}

/**
 * מציאת הערך הנמוך ביותר
 * Find minimum value
 * @param {number[]} numbers - מערך מספרים
 * @returns {number} הערך המינימלי
 */
function min(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    return Math.min(...numbers);
}

/**
 * חישוב חציון (median)
 * Calculate median
 * @param {number[]} numbers - מערך מספרים
 * @returns {number} החציון
 */
function median(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
}

/**
 * חישוב סטיית תקן
 * Calculate standard deviation
 * @param {number[]} numbers - מערך מספרים
 * @returns {number} סטיית התקן
 */
function standardDeviation(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null;
    }
    
    const avg = average(numbers);
    const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2));
    const avgSquaredDiff = average(squaredDiffs);
    
    return Math.sqrt(avgSquaredDiff);
}

/**
 * חישוב סטטיסטיקות מלאות
 * Calculate complete statistics
 * @param {number[]} numbers - מערך מספרים
 * @returns {object} אובייקט עם כל הסטטיסטיקות
 */
function getStatistics(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return {
            sum: 0,
            average: 0,
            min: null,
            max: null,
            median: null,
            standardDeviation: null,
            count: 0
        };
    }
    
    return {
        sum: sum(numbers),
        average: parseFloat(average(numbers).toFixed(2)),
        min: min(numbers),
        max: max(numbers),
        median: median(numbers),
        standardDeviation: parseFloat(standardDeviation(numbers).toFixed(2)),
        count: numbers.length
    };
}

/**
 * עיגול מספר לכמות עשרוניות מסוימת
 * Round number to specific decimal places
 * @param {number} number - המספר לעיגול
 * @param {number} decimals - כמות העשרוניות
 * @returns {number} המספר המעוגל
 */
function roundTo(number, decimals = 2) {
    return parseFloat(number.toFixed(decimals));
}

/**
 * המרת אחוזים
 * Convert to percentage
 * @param {number} value - הערך
 * @param {number} total - הכלל
 * @param {number} decimals - כמות עשרוניות
 * @returns {number} אחוז
 */
function toPercentage(value, total, decimals = 1) {
    if (total === 0) return 0;
    return roundTo((value / total) * 100, decimals);
}

/**
 * בדיקה אם מספר זוגי
 * Check if number is even
 * @param {number} number - המספר לבדיקה
 * @returns {boolean} האם זוגי
 */
function isEven(number) {
    return number % 2 === 0;
}

/**
 * בדיקה אם מספר אי-זוגי
 * Check if number is odd
 * @param {number} number - המספר לבדיקה
 * @returns {boolean} האם אי-זוגי
 */
function isOdd(number) {
    return !isEven(number);
}

/**
 * יצירת טווח מספרים
 * Generate range of numbers
 * @param {number} start - התחלה
 * @param {number} end - סיום
 * @param {number} step - צעד
 * @returns {number[]} מערך המספרים
 */
function range(start, end, step = 1) {
    const result = [];
    for (let i = start; i <= end; i += step) {
        result.push(i);
    }
    return result;
}

/**
 * יצירת מספר אקראי בטווח
 * Generate random number in range
 * @param {number} min - מינימום
 * @param {number} max - מקסימום
 * @returns {number} מספר אקראי
 */
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ייצוא כל הפונקציות
module.exports = {
    sum,
    average,
    max,
    min,
    median,
    standardDeviation,
    getStatistics,
    roundTo,
    toPercentage,
    isEven,
    isOdd,
    range,
    randomBetween
};