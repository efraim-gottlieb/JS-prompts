// דוגמאות שימוש בכלי התאריכים
// Examples using date tools

const dateTools = require('../tools/date-tools');

console.log('=== דוגמאות לשימוש בכלי תאריכים ===\n');

// תאריכים לדוגמא
const birthDate = new Date('1990-05-15');
const today = new Date();
const meetingDate = new Date('2025-12-25');

console.log('1. חישוב גיל:');
console.log(`תאריך לידה: ${birthDate.toLocaleDateString('he-IL')}`);
console.log(`גיל: ${dateTools.calculateAge(birthDate)} שנים`);

console.log('\n2. חישוב הפרש ימים:');
const startProject = new Date('2025-01-01');
const endProject = new Date('2025-12-31');
console.log(`מתחילת השנה: ${dateTools.daysDifference(startProject, today)} ימים`);
console.log(`עד סוף השנה: ${dateTools.daysDifference(today, endProject)} ימים`);

console.log('\n3. בדיקת סוף שבוע:');
const dates = [
    new Date('2025-12-05'), // חמישי
    new Date('2025-12-06'), // שישי
    new Date('2025-12-07'), // שבת
    new Date('2025-12-08')  // ראשון
];

dates.forEach(date => {
    console.log(`${dateTools.formatHebrewDate(date, 'long')}: ${dateTools.isWeekend(date) ? 'סוף שבוע' : 'יום עבודה'}`);
});

console.log('\n4. מציאת התאריך הבא:');
const nextFriday = dateTools.getNextDay(5); // שישי
const nextSunday = dateTools.getNextDay(0); // ראשון
console.log(`שישי הבא: ${dateTools.formatHebrewDate(nextFriday)}`);
console.log(`ראשון הבא: ${dateTools.formatHebrewDate(nextSunday)}`);

console.log('\n5. פורמטים שונים של תאריכים:');
const sampleDate = new Date();
console.log('קצר:', dateTools.formatHebrewDate(sampleDate, 'short'));
console.log('בינוני:', dateTools.formatHebrewDate(sampleDate, 'medium'));
console.log('ארוך:', dateTools.formatHebrewDate(sampleDate, 'long'));
console.log('ישראלי:', dateTools.toIsraeliFormat(sampleDate));

console.log('\n6. זמן יחסי:');
const pastDates = [
    new Date(Date.now() - 5 * 60 * 1000),      // לפני 5 דקות
    new Date(Date.now() - 2 * 60 * 60 * 1000), // לפני 2 שעות
    new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // לפני 3 ימים
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // לפני חודש
    new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)  // לפני שנה
];

pastDates.forEach(date => {
    console.log(`${dateTools.formatHebrewDate(date)}: ${dateTools.timeAgo(date)}`);
});

console.log('\n7. בדיקת שנה מעוברת:');
const years = [2020, 2021, 2024, 2025];
years.forEach(year => {
    console.log(`${year}: ${dateTools.isLeapYear(year) ? 'מעוברת' : 'רגילה'} (${dateTools.getDaysInMonth(2, year)} ימים בפברואר)`);
});

console.log('\n8. טווח תאריכים:');
const rangeStart = new Date('2025-12-01');
const rangeEnd = new Date('2025-12-07');
const dateRange = dateTools.createDateRange(rangeStart, rangeEnd);
console.log('טווח מ-1 עד 7 בדצמבר:');
dateRange.forEach(date => {
    console.log(`  ${dateTools.formatHebrewDate(date)}`);
});

console.log('\n9. המרת אזורי זמן:');
const utcDate = new Date();
console.log('זמן מקומי (ישראל):', utcDate.toLocaleString('he-IL'));
console.log('ניו יורק:', dateTools.convertTimezone(utcDate, 'America/New_York'));
console.log('לונדון:', dateTools.convertTimezone(utcDate, 'Europe/London'));
console.log('טוקיו:', dateTools.convertTimezone(utcDate, 'Asia/Tokyo'));

console.log('\n10. חישוב שעות עבודה:');
const projectStart = new Date('2025-12-01');
const projectEnd = new Date('2025-12-15');
const workingHours = dateTools.calculateWorkingHours(projectStart, projectEnd);
console.log(`פרויקט מ-${dateTools.toIsraeliFormat(projectStart)} עד ${dateTools.toIsraeliFormat(projectEnd)}`);
console.log(`שעות עבודה: ${workingHours} (${workingHours / 8} ימי עבודה)`);

// פונקציה מתקדמת - ניהול לוח שנה
function createCalendarView(year, month) {
    console.log('\n=== לוח שנה ===');
    
    const monthNames = [
        'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];
    
    console.log(`${monthNames[month - 1]} ${year}`);
    console.log('ראש שני שלי רבי חמי שבת');
    
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    let calendar = '';
    
    // רווחים לתחילת החודש
    for (let i = 0; i < startingDay; i++) {
        calendar += '     ';
    }
    
    // ימי החודש
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month - 1, day);
        const isWeekendDay = dateTools.isWeekend(currentDate);
        const dayStr = day.toString().padStart(2, ' ');
        
        if (isWeekendDay) {
            calendar += `[${dayStr}]`;
        } else {
            calendar += ` ${dayStr} `;
        }
        
        // שורה חדשה אחרי שבת
        if ((startingDay + day) % 7 === 0) {
            calendar += '\n';
        }
    }
    
    console.log(calendar);
    console.log('[] = סוף שבוע');
}

// הצגת לוח השנה לחודש הנוכחי
const currentDate = new Date();
createCalendarView(currentDate.getFullYear(), currentDate.getMonth() + 1);

// דוגמא לחישוב מועדים
function calculateHolidays() {
    console.log('\n=== חישוב מועדים (דוגמא) ===');
    
    const holidays = [
        { name: 'ראש השנה', date: new Date('2025-09-15') },
        { name: 'יום כיפור', date: new Date('2025-09-24') },
        { name: 'חנוכה', date: new Date('2025-12-25') }
    ];
    
    holidays.forEach(holiday => {
        const daysUntil = dateTools.daysDifference(new Date(), holiday.date);
        const timeAgo = dateTools.timeAgo(holiday.date);
        
        console.log(`${holiday.name}: ${dateTools.formatHebrewDate(holiday.date)}`);
        console.log(`  ${daysUntil} ימים מהיום`);
        console.log(`  ${timeAgo}`);
    });
}

calculateHolidays();