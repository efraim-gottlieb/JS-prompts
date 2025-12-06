// דוגמאות שימוש בכלי מערכים
// Examples using array tools

const arrayTools = require('../tools/array-tools');

console.log('=== דוגמאות לשימוש בכלי מערכים ===\n');

// נתוני סטודנטים לדוגמא
const students = [
    { name: "אלי", grade: 85, age: 20, city: "תל אביב" },
    { name: "דנה", grade: 92, age: 22, city: "חיפה" },
    { name: "רון", grade: 78, age: 19, city: "באר שבע" },
    { name: "מיה", grade: 96, age: 21, city: "ירושלים" },
    { name: "תום", grade: 88, age: 23, city: "תל אביב" },
    { name: "שרה", grade: 91, age: 20, city: "חיפה" }
];

console.log('1. סינון סטודנטים לפי ציון:');
const topStudents = arrayTools.filterBy(students, student => student.grade >= 90);
console.log('סטודנטים מצטיינים (90+):');
console.table(topStudents);

console.log('\n2. מיון לפי ציונים:');
const sortedByGrades = arrayTools.sortBy(students, 'grade', false); // יורד
console.log('סטודנטים ממוינים לפי ציון (יורד):');
console.table(sortedByGrades.map(s => ({ name: s.name, grade: s.grade })));

console.log('\n3. קיבוץ לפי עיר:');
const studentsByCity = arrayTools.groupBy(students, 'city');
console.log('סטודנטים מקובצים לפי עיר:');
Object.entries(studentsByCity).forEach(([city, cityStudents]) => {
    console.log(`${city}: ${cityStudents.map(s => s.name).join(', ')}`);
});

console.log('\n4. הסרת כפילויות:');
const ages = students.map(s => s.age);
console.log('כל הגילאים:', ages);
console.log('גילאים ייחודיים:', arrayTools.unique(ages));

console.log('\n5. ערבוב מערך:');
const names = students.map(s => s.name);
console.log('שמות מקוריים:', names);
console.log('שמות מעורבבים:', arrayTools.shuffle(names));

console.log('\n6. חלוקה לקבוצות:');
const groups = arrayTools.chunk(students, 2);
console.log('חלוקה לקבוצות של 2:');
groups.forEach((group, index) => {
    console.log(`קבוצה ${index + 1}:`, group.map(s => s.name));
});

console.log('\n7. מציאת סטודנטים:');
const bestStudent = arrayTools.findFirst(students, student => student.grade > 95);
console.log('הסטודנט הראשון עם ציון מעל 95:', bestStudent?.name || 'לא נמצא');

const youngStudentIndex = arrayTools.findIndex(students, student => student.age < 20);
console.log('האינדקס של הסטודנט הראשון מתחת לגיל 20:', youngStudentIndex);

console.log('\n8. ספירות וסטטיסטיקות:');
const adultCount = arrayTools.countBy(students, student => student.age >= 21);
console.log('כמות סטודנטים בגיל 21+:', adultCount);

const allPassed = arrayTools.allMatch(students, student => student.grade >= 70);
console.log('כל הסטודנטים עברו (70+):', allPassed ? 'כן' : 'לא');

const anyExcellent = arrayTools.anyMatch(students, student => student.grade >= 95);
console.log('יש לפחות סטודנט מצוין (95+):', anyExcellent ? 'כן' : 'לא');

console.log('\n9. לקיחה ודילוג על פריטים:');
const topThree = arrayTools.take(sortedByGrades, 3);
console.log('3 הסטודנטים הטובים ביותר:');
console.table(topThree.map(s => ({ name: s.name, grade: s.grade })));

const exceptTopTwo = arrayTools.skip(sortedByGrades, 2);
console.log('כל הסטודנטים חוץ מ-2 הטובים ביותר:');
console.table(exceptTopTwo.map(s => ({ name: s.name, grade: s.grade })));

console.log('\n10. הסרת פריטים לפי תנאי:');
const withoutFailures = arrayTools.remove(students, student => student.grade < 80);
console.log('סטודנטים ללא כישלונות (80+):');
console.table(withoutFailures.map(s => ({ name: s.name, grade: s.grade })));

// דוגמא מתקדמת - יצירת דוח מלא
function createStudentReport(students) {
    console.log('\n=== דוח מלא על הסטודנטים ===');
    
    // מיון לפי ציונים
    const sorted = arrayTools.sortBy(students, 'grade', false);
    
    // קיבוץ לפי רמות
    const byLevel = arrayTools.groupBy(students, student => {
        if (student.grade >= 90) return 'מצוין';
        if (student.grade >= 80) return 'טוב';
        if (student.grade >= 70) return 'בינוני';
        return 'נדרש שיפור';
    });
    
    // סטטיסטיקות כלליות
    const totalStudents = students.length;
    const averageAge = students.reduce((sum, s) => sum + s.age, 0) / totalStudents;
    const cities = arrayTools.unique(students.map(s => s.city));
    
    console.log(`סה"כ סטודנטים: ${totalStudents}`);
    console.log(`גיל ממוצע: ${averageAge.toFixed(1)}`);
    console.log(`מספר עיירים: ${cities.length} (${cities.join(', ')})`);
    
    console.log('\nפיזור לפי רמות:');
    Object.entries(byLevel).forEach(([level, levelStudents]) => {
        const percentage = ((levelStudents.length / totalStudents) * 100).toFixed(1);
        console.log(`${level}: ${levelStudents.length} סטודנטים (${percentage}%)`);
    });
    
    console.log('\nטופ 3:');
    arrayTools.take(sorted, 3).forEach((student, index) => {
        console.log(`${index + 1}. ${student.name} - ${student.grade}`);
    });
}

// הרצת הדוח
createStudentReport(students);

// דוגמא לעבודה עם מערך של מערכים
console.log('\n=== עבודה עם מערכים מקוננים ===');
const nestedArray = [[1, 2], [3, 4], [[5, 6], 7], 8];
console.log('מערך מקונן:', nestedArray);
console.log('מערך שטוח:', arrayTools.flatten(nestedArray));