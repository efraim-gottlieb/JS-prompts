// קובץ דוגמאות לעבודה עם מערכים - סכימה וממצוע
// Examples for working with Arrays - Sum and Average

// 1. חישוב סכום מערך מספרים
// Calculating sum of array numbers
const numbers = [10, 25, 30, 45, 15];

// דרך פשוטה עם reduce
const sum = numbers.reduce((total, num) => total + num, 0);
console.log("Sum:", sum); // 125

// דרך עם לולאה
let sumLoop = 0;
for (let i = 0; i < numbers.length; i++) {
    sumLoop += numbers[i];
}
console.log("Sum with loop:", sumLoop);

// 2. חישוב ממוצע
// Calculating average
const average = sum / numbers.length;
console.log("Average:", average); // 25

// פונקציה לחישוב ממוצע
function calculateAverage(arr) {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((total, num) => total + num, 0);
    return sum / arr.length;
}

console.log("Average function result:", calculateAverage(numbers));

// 3. מערך של ציונים - דוגמא מעשית
// Array of grades - practical example
const grades = [85, 92, 78, 96, 88, 91, 83];

const gradeStats = {
    sum: grades.reduce((total, grade) => total + grade, 0),
    average: 0,
    highest: Math.max(...grades),
    lowest: Math.min(...grades),
    count: grades.length
};

gradeStats.average = gradeStats.sum / gradeStats.count;

console.log("Grade Statistics:", gradeStats);

// 4. עבודה עם מערך של אובייקטים
// Working with array of objects
const students = [
    { name: "אלי", grade: 85 },
    { name: "דנה", grade: 92 },
    { name: "רון", grade: 78 },
    { name: "מיה", grade: 96 },
    { name: "תום", grade: 88 }
];

// סכום כל הציונים
const totalGrades = students.reduce((sum, student) => sum + student.grade, 0);

// ממוצע הכיתה
const classAverage = totalGrades / students.length;

console.log(`Total grades: ${totalGrades}`);
console.log(`Class average: ${classAverage.toFixed(2)}`);

// מציאת הסטודנט עם הציון הגבוה ביותר
const topStudent = students.reduce((max, student) => 
    student.grade > max.grade ? student : max
);

console.log("Top student:", topStudent);

// 5. פונקציות שימושיות למערכים
// Useful array functions

// פונקציה לחישוב סטטיסטיקות מלאות
function getArrayStats(arr) {
    if (arr.length === 0) {
        return { sum: 0, average: 0, min: 0, max: 0, count: 0 };
    }
    
    const sum = arr.reduce((total, num) => total + num, 0);
    const average = sum / arr.length;
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    
    return {
        sum: sum,
        average: parseFloat(average.toFixed(2)),
        min: min,
        max: max,
        count: arr.length
    };
}

// דוגמא לשימוש
const testScores = [75, 82, 90, 67, 88, 95, 73, 91];
const stats = getArrayStats(testScores);
console.log("Test scores statistics:", stats);

// 6. סינון מערכים לפי תנאים
// Filtering arrays by conditions

// ציונים מעל ממוצע
const aboveAverage = students.filter(student => student.grade > classAverage);
console.log("Students above average:", aboveAverage);

// ציונים מתחת ל-80
const needImprovement = students.filter(student => student.grade < 80);
console.log("Students need improvement:", needImprovement);

// 7. מיון מערך לפי ציונים
// Sorting array by grades
const sortedByGrades = students.sort((a, b) => b.grade - a.grade); // יורד
console.log("Students sorted by grades (descending):", sortedByGrades);

// 8. קיבוץ לפי רמות
// Grouping by levels
function groupStudentsByLevel(students) {
    return students.reduce((groups, student) => {
        let level;
        if (student.grade >= 90) level = "מצוין";
        else if (student.grade >= 80) level = "טוב";
        else if (student.grade >= 70) level = "בינוני";
        else level = "נדרש שיפור";
        
        if (!groups[level]) groups[level] = [];
        groups[level].push(student);
        
        return groups;
    }, {});
}

const groupedStudents = groupStudentsByLevel(students);
console.log("Students grouped by level:", groupedStudents);