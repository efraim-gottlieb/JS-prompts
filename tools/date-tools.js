// כלי תאריכים וזמנים - Date Tools
// Date and time utility functions

/**
 * חישוב גיל מתאריך לידה
 * Calculate age from birth date
 * @param {Date|string} birthDate - תאריך לידה
 * @returns {number} גיל
 */
function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

/**
 * חישוב הפרש ימים בין תאריכים
 * Calculate days difference between dates
 * @param {Date|string} date1 - תאריך ראשון
 * @param {Date|string} date2 - תאריך שני
 * @returns {number} הפרש בימים
 */
function daysDifference(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

/**
 * בדיקה אם תאריך הוא בסוף השבוע
 * Check if date is weekend
 * @param {Date|string} date - התאריך
 * @returns {boolean} האם סוף שבוע
 */
function isWeekend(date) {
    const day = new Date(date).getDay();
    return day === 5 || day === 6; // שישי ושבת
}

/**
 * קבלת התאריך הבא של יום מסוים
 * Get next occurrence of a specific day
 * @param {number} targetDay - יום השבוע (0=ראשון, 6=שבת)
 * @returns {Date} התאריך הבא
 */
function getNextDay(targetDay) {
    const today = new Date();
    const currentDay = today.getDay();
    const daysToAdd = (targetDay - currentDay + 7) % 7;
    
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + (daysToAdd === 0 ? 7 : daysToAdd));
    
    return nextDate;
}

/**
 * פורמט תאריך בעברית
 * Format date in Hebrew
 * @param {Date|string} date - התאריך
 * @param {string} format - פורמט (short/medium/long)
 * @returns {string} תאריך מעוצב
 */
function formatHebrewDate(date, format = 'medium') {
    const d = new Date(date);
    const options = {
        short: { day: 'numeric', month: 'numeric', year: '2-digit' },
        medium: { day: 'numeric', month: 'long', year: 'numeric' },
        long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    };
    
    return d.toLocaleDateString('he-IL', options[format]);
}

/**
 * פורמט זמן יחסי (לפני כמה זמן)
 * Format relative time (time ago)
 * @param {Date|string} date - התאריך
 * @returns {string} זמן יחסי
 */
function timeAgo(date) {
    const now = new Date();
    const diff = now - new Date(date);
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    
    if (years > 0) return `לפני ${years} ${years === 1 ? 'שנה' : 'שנים'}`;
    if (months > 0) return `לפני ${months} ${months === 1 ? 'חודש' : 'חודשים'}`;
    if (days > 0) return `לפני ${days} ${days === 1 ? 'יום' : 'ימים'}`;
    if (hours > 0) return `לפני ${hours} ${hours === 1 ? 'שעה' : 'שעות'}`;
    if (minutes > 0) return `לפני ${minutes} ${minutes === 1 ? 'דקה' : 'דקות'}`;
    return 'עכשיו';
}

/**
 * בדיקה אם שנה מעוברת
 * Check if year is leap year
 * @param {number} year - השנה
 * @returns {boolean} האם מעוברת
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * קבלת מספר ימים בחודש
 * Get days in month
 * @param {number} month - החודש (1-12)
 * @param {number} year - השנה
 * @returns {number} מספר הימים
 */
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

/**
 * יצירת טווח תאריכים
 * Create date range
 * @param {Date|string} startDate - תאריך התחלה
 * @param {Date|string} endDate - תאריך סיום
 * @returns {Date[]} מערך תאריכים
 */
function createDateRange(startDate, endDate) {
    const dates = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
    }
    
    return dates;
}

/**
 * המרת זמן לאזור זמן אחר
 * Convert time to different timezone
 * @param {Date|string} date - התאריך
 * @param {string} timezone - אזור הזמן
 * @returns {string} זמן באזור זמן חדש
 */
function convertTimezone(date, timezone) {
    return new Date(date).toLocaleString('he-IL', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

/**
 * חישוב שעות עבודה בין תאריכים
 * Calculate working hours between dates
 * @param {Date|string} startDate - תאריך התחלה
 * @param {Date|string} endDate - תאריך סיום
 * @param {number} dailyHours - שעות עבודה ביום
 * @returns {number} שעות עבודה כוללות
 */
function calculateWorkingHours(startDate, endDate, dailyHours = 8) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workingDays = 0;
    
    const current = new Date(start);
    while (current <= end) {
        // לא סוף שבוע (ראשון-חמישי)
        if (!isWeekend(current)) {
            workingDays++;
        }
        current.setDate(current.getDate() + 1);
    }
    
    return workingDays * dailyHours;
}

/**
 * יצירת תאריך ישראלי (DD/MM/YYYY)
 * Create Israeli date format
 * @param {Date|string} date - התאריך
 * @returns {string} תאריך בפורמט ישראלי
 */
function toIsraeliFormat(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

// ייצוא כל הפונקציות
module.exports = {
    calculateAge,
    daysDifference,
    isWeekend,
    getNextDay,
    formatHebrewDate,
    timeAgo,
    isLeapYear,
    getDaysInMonth,
    createDateRange,
    convertTimezone,
    calculateWorkingHours,
    toIsraeliFormat
};