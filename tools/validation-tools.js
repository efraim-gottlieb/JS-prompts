// כלי וולידציה - Validation Tools
// Validation utility functions

/**
 * וולידציה של תעודת זהות ישראלית
 * Validate Israeli ID number
 * @param {string|number} id - מספר תעודת הזהות
 * @returns {boolean} האם תקין
 */
function validateIsraeliId(id) {
    const idStr = id.toString().padStart(9, '0');
    if (idStr.length !== 9 || !/^\d+$/.test(idStr)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        let digit = parseInt(idStr[i]);
        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    
    return sum % 10 === 0;
}

/**
 * וולידציה של מספר טלפון ישראלי
 * Validate Israeli phone number
 * @param {string} phone - מספר הטלפון
 * @returns {boolean} האם תקין
 */
function validateIsraeliPhone(phone) {
    // ניקוי מספר הטלפון
    const cleaned = phone.replace(/[^\d]/g, '');
    
    // בדיקת אורך ומבנה
    if (cleaned.length === 10) {
        // 05X-XXXXXXX או 0X-XXXXXXX
        return /^05[0-9]/.test(cleaned) || /^0[2-4,8-9]/.test(cleaned);
    } else if (cleaned.length === 9) {
        // 5X-XXXXXXX או X-XXXXXXX
        return /^5[0-9]/.test(cleaned) || /^[2-4,8-9]/.test(cleaned);
    }
    
    return false;
}

/**
 * וולידציה של כתובת אימייל
 * Validate email address
 * @param {string} email - כתובת האימייל
 * @returns {boolean} האם תקין
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * וולידציה של מספר כרטיס אשראי
 * Validate credit card number (Luhn algorithm)
 * @param {string} cardNumber - מספר הכרטיס
 * @returns {boolean} האם תקין
 */
function validateCreditCard(cardNumber) {
    const cleaned = cardNumber.replace(/[^\d]/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned[i]);
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

/**
 * וולידציה של סיסמה חזקה
 * Validate strong password
 * @param {string} password - הסיסמה
 * @param {Object} options - אפשרויות וולידציה
 * @returns {Object} תוצאת וולידציה
 */
function validatePassword(password, options = {}) {
    const defaults = {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true
    };
    
    const opts = { ...defaults, ...options };
    const errors = [];
    
    if (password.length < opts.minLength) {
        errors.push(`הסיסמה חייבת להכיל לפחות ${opts.minLength} תווים`);
    }
    
    if (opts.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('הסיסמה חייבת להכיל לפחות אות גדולה אחת');
    }
    
    if (opts.requireLowercase && !/[a-z]/.test(password)) {
        errors.push('הסיסמה חייבת להכיל לפחות אות קטנה אחת');
    }
    
    if (opts.requireNumbers && !/\d/.test(password)) {
        errors.push('הסיסמה חייבת להכיל לפחות מספר אחד');
    }
    
    if (opts.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('הסיסמה חייבת להכיל לפחות תו מיוחד אחד');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors,
        strength: calculatePasswordStrength(password)
    };
}

/**
 * חישוב חוזק סיסמה
 * Calculate password strength
 * @param {string} password - הסיסמה
 * @returns {string} רמת החוזק
 */
function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    if (score <= 2) return 'חלש';
    if (score <= 4) return 'בינוני';
    return 'חזק';
}

/**
 * וולידציה של תאריך
 * Validate date
 * @param {string} dateString - מחרוזת התאריך
 * @param {string} format - פורמט התאריך
 * @returns {boolean} האם תקין
 */
function validateDate(dateString, format = 'DD/MM/YYYY') {
    if (format === 'DD/MM/YYYY') {
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dateString.match(regex);
        
        if (!match) return false;
        
        const day = parseInt(match[1]);
        const month = parseInt(match[2]);
        const year = parseInt(match[3]);
        
        const date = new Date(year, month - 1, day);
        return date.getDate() === day && 
               date.getMonth() === month - 1 && 
               date.getFullYear() === year;
    }
    
    return !isNaN(Date.parse(dateString));
}

/**
 * וולידציה של מספר שלם
 * Validate integer
 * @param {*} value - הערך לבדיקה
 * @param {Object} options - אפשרויות
 * @returns {Object} תוצאת וולידציה
 */
function validateInteger(value, options = {}) {
    const { min, max } = options;
    const num = parseInt(value);
    const errors = [];
    
    if (isNaN(num) || !Number.isInteger(num)) {
        errors.push('הערך חייב להיות מספר שלם');
        return { isValid: false, errors };
    }
    
    if (min !== undefined && num < min) {
        errors.push(`הערך חייב להיות לפחות ${min}`);
    }
    
    if (max !== undefined && num > max) {
        errors.push(`הערך חייב להיות לכל היותר ${max}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        value: num
    };
}

/**
 * וולידציה של URL
 * Validate URL
 * @param {string} url - הכתובת
 * @returns {boolean} האם תקין
 */
function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * וולידציה של מחרוזת לא ריקה
 * Validate non-empty string
 * @param {*} value - הערך
 * @param {Object} options - אפשרויות
 * @returns {Object} תוצאת וולידציה
 */
function validateRequiredString(value, options = {}) {
    const { minLength = 1, maxLength, pattern } = options;
    const errors = [];
    
    if (typeof value !== 'string') {
        errors.push('הערך חייב להיות מחרוזת');
        return { isValid: false, errors };
    }
    
    const trimmed = value.trim();
    
    if (trimmed.length < minLength) {
        errors.push(`הערך חייב להכיל לפחות ${minLength} תווים`);
    }
    
    if (maxLength && trimmed.length > maxLength) {
        errors.push(`הערך לא יכול להכיל יותר מ-${maxLength} תווים`);
    }
    
    if (pattern && !pattern.test(trimmed)) {
        errors.push('הערך לא עומד בפורמט הנדרש');
    }
    
    return {
        isValid: errors.length === 0,
        errors,
        value: trimmed
    };
}

// ייצוא כל הפונקציות
module.exports = {
    validateIsraeliId,
    validateIsraeliPhone,
    validateEmail,
    validateCreditCard,
    validatePassword,
    calculatePasswordStrength,
    validateDate,
    validateInteger,
    validateUrl,
    validateRequiredString
};