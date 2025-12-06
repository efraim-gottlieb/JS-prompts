// דוגמאות שימוש בכלים המתמטיים
// Examples using math tools

const mathTools = require('../tools/math-tools');

console.log('=== דוגמאות לשימוש בכלים המתמטיים ===\n');

// נתונים לדוגמא
const grades = [85, 92, 78, 96, 88, 91, 83];
const prices = [150.50, 99.99, 200.00, 75.25, 310.80];

console.log('1. חישוב סכום וממוצע:');
console.log('ציונים:', grades);
console.log('סכום:', mathTools.sum(grades));
console.log('ממוצע:', mathTools.average(grades));

console.log('\n2. מציאת ערכים קיצוניים:');
console.log('הציון הגבוה ביותר:', mathTools.max(grades));
console.log('הציון הנמוך ביותר:', mathTools.min(grades));
console.log('חציון:', mathTools.median(grades));

console.log('\n3. סטטיסטיקות מלאות:');
const gradeStats = mathTools.getStatistics(grades);
console.log('סטטיסטיקות ציונים:');
console.table(gradeStats);

console.log('\n4. חישוב אחוזים:');
const passedGrades = grades.filter(grade => grade >= 80);
const passRate = mathTools.toPercentage(passedGrades.length, grades.length);
console.log(`${passedGrades.length} מתוך ${grades.length} סטודנטים עברו (${passRate}%)`);

console.log('\n5. עבודה עם טווחים:');
const numbers1to10 = mathTools.range(1, 10);
console.log('מספרים מ-1 עד 10:', numbers1to10);

const evenNumbers = numbers1to10.filter(mathTools.isEven);
const oddNumbers = numbers1to10.filter(mathTools.isOdd);
console.log('זוגיים:', evenNumbers);
console.log('אי-זוגיים:', oddNumbers);

console.log('\n6. מספרים אקראיים:');
console.log('3 מספרים אקראיים בין 1 ל-100:');
for (let i = 0; i < 3; i++) {
    console.log(mathTools.randomBetween(1, 100));
}

console.log('\n7. עיגול מחירים:');
console.log('מחירים מקוריים:', prices);
console.log('מחירים מעוגלים:', prices.map(price => mathTools.roundTo(price, 0)));

console.log('\n8. ניתוח מכירות:');
const salesTarget = 1000;
const actualSales = 1250;
const salesIncrease = mathTools.toPercentage(actualSales - salesTarget, salesTarget);
console.log(`יעד מכירות: ${salesTarget}`);
console.log(`מכירות בפועל: ${actualSales}`);
console.log(`עלייה: ${salesIncrease}%`);

// פונקציה מותאמת אישית המשתמשת בכלים
function analyzeStudentPerformance(studentGrades) {
    const stats = mathTools.getStatistics(studentGrades);
    
    console.log('\n=== ניתוח ביצועי סטודנט ===');
    console.log(`כמות מבחנים: ${stats.count}`);
    console.log(`ממוצע: ${stats.average}`);
    console.log(`טווח ציונים: ${stats.min} - ${stats.max}`);
    
    let level;
    if (stats.average >= 90) level = 'מצוין';
    else if (stats.average >= 80) level = 'טוב';
    else if (stats.average >= 70) level = 'בינוני';
    else level = 'נדרש שיפור';
    
    console.log(`רמה: ${level}`);
    
    const improveBy = Math.max(0, 85 - stats.average);
    if (improveBy > 0) {
        console.log(`נדרש שיפור של ${mathTools.roundTo(improveBy, 1)} נקודות להגיע לרמה טובה`);
    }
}

// דוגמא לשימוש
analyzeStudentPerformance([75, 82, 69, 88, 77]);