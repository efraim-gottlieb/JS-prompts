// קובץ דוגמא לנתונים לתרגול
// Sample data file for practice

// נתוני סטודנטים לתרגול
const studentsData = [
    {
        id: 1,
        name: "אלי כהן",
        age: 20,
        city: "תל אביב",
        grades: [85, 92, 78, 95, 88],
        courses: ["מתמטיקה", "פיזיקה", "אנגלית", "תכנות", "חשבונאות"]
    },
    {
        id: 2,
        name: "דנה לוי",
        age: 22,
        city: "חיפה",
        grades: [90, 87, 94, 89, 91],
        courses: ["ביולוגיה", "כימיה", "אנגלית", "סטטיסטיקה", "מחקר"]
    },
    {
        id: 3,
        name: "רון אבני",
        age: 19,
        city: "באר שבע",
        grades: [76, 82, 79, 85, 80],
        courses: ["היסטוריה", "גיאוגרפיה", "אנגלית", "ספרות", "אמנות"]
    },
    {
        id: 4,
        name: "מיה שקד",
        age: 21,
        city: "ירושלים",
        grades: [96, 94, 98, 92, 95],
        courses: ["מתמטיקה", "פיזיקה", "כימיה", "תכנות", "הנדסה"]
    },
    {
        id: 5,
        name: "תום ברק",
        age: 23,
        city: "ראשון לציון",
        grades: [82, 79, 84, 87, 81],
        courses: ["כלכלה", "ניהול", "אנגלית", "משפטים", "פסיכולוגיה"]
    }
];

// נתוני מכירות לתרגול
const salesData = [
    { month: "ינואר", sales: 15000, target: 12000 },
    { month: "פברואר", sales: 18000, target: 15000 },
    { month: "מרץ", sales: 12000, target: 14000 },
    { month: "אפריל", sales: 22000, target: 18000 },
    { month: "מאי", sales: 25000, target: 20000 },
    { month: "יוני", sales: 19000, target: 17000 }
];

// נתוני מוצרים לתרגול
const products = [
    {
        id: 101,
        name: "מחשב נייד",
        price: 2500,
        category: "אלקטרוניקה",
        inStock: 15,
        rating: 4.5
    },
    {
        id: 102,
        name: "טלפון חכם",
        price: 1200,
        category: "אלקטרוניקה",
        inStock: 8,
        rating: 4.7
    },
    {
        id: 103,
        name: "ספר תכנות",
        price: 120,
        category: "ספרים",
        inStock: 25,
        rating: 4.3
    },
    {
        id: 104,
        name: "כיסא משרדי",
        price: 350,
        category: "ריהוט",
        inStock: 12,
        rating: 4.1
    },
    {
        id: 105,
        name: "מקלדת",
        price: 180,
        category: "אלקטרוניקה",
        inStock: 30,
        rating: 4.4
    }
];

// נתוני תקציב משפחתי לתרגול
const familyBudget = {
    income: 12000,
    expenses: {
        rent: 4000,
        food: 2500,
        transportation: 800,
        utilities: 600,
        entertainment: 500,
        savings: 1000,
        other: 800
    }
};

// נתוני ציונים לפי מקצועות
const gradesBySubject = {
    "מתמטיקה": [85, 92, 78, 88, 95, 82, 90],
    "אנגלית": [88, 85, 90, 87, 92, 84, 89],
    "פיזיקה": [82, 88, 85, 90, 87, 83, 91],
    "תכנות": [95, 88, 92, 85, 90, 87, 94],
    "כימיה": [80, 85, 83, 88, 86, 82, 87]
};

// תרגילים מומלצים לתרגול:

// 1. חשב את הממוצע של כל סטודנט
console.log("=== תרגיל 1: ממוצע ציונים לכל סטודנט ===");
studentsData.forEach(student => {
    const average = student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length;
    console.log(`${student.name}: ${average.toFixed(2)}`);
});

// 2. מצא את הסטודנט עם הממוצע הגבוה ביותר
console.log("\n=== תרגיל 2: הסטודנט עם הממוצע הגבוה ביותר ===");
const topStudent = studentsData.reduce((best, current) => {
    const bestAvg = best.grades.reduce((sum, grade) => sum + grade, 0) / best.grades.length;
    const currentAvg = current.grades.reduce((sum, grade) => sum + grade, 0) / current.grades.length;
    return currentAvg > bestAvg ? current : best;
});

const topAverage = topStudent.grades.reduce((sum, grade) => sum + grade, 0) / topStudent.grades.length;
console.log(`הסטודנט עם הממוצע הגבוה ביותר: ${topStudent.name} (${topAverage.toFixed(2)})`);

// 3. חשב סך המכירות והאחוז השגת יעד
console.log("\n=== תרגיל 3: ניתוח מכירות ===");
const totalSales = salesData.reduce((sum, month) => sum + month.sales, 0);
const totalTarget = salesData.reduce((sum, month) => sum + month.target, 0);
const achievementRate = (totalSales / totalTarget * 100).toFixed(1);

console.log(`סך המכירות: ${totalSales.toLocaleString()}`);
console.log(`סך היעד: ${totalTarget.toLocaleString()}`);
console.log(`אחוז השגת יעד: ${achievementRate}%`);

// 4. מצא את המוצר היקר ביותר בכל קטגוריה
console.log("\n=== תרגיל 4: המוצר היקר ביותר בכל קטגוריה ===");
const expensiveByCategory = products.reduce((result, product) => {
    if (!result[product.category] || product.price > result[product.category].price) {
        result[product.category] = product;
    }
    return result;
}, {});

Object.entries(expensiveByCategory).forEach(([category, product]) => {
    console.log(`${category}: ${product.name} (₪${product.price})`);
});

// 5. חשב את יתרת התקציב
console.log("\n=== תרגיל 5: ניתוח תקציב ===");
const totalExpenses = Object.values(familyBudget.expenses).reduce((sum, expense) => sum + expense, 0);
const balance = familyBudget.income - totalExpenses;

console.log(`הכנסה: ₪${familyBudget.income.toLocaleString()}`);
console.log(`סך ההוצאות: ₪${totalExpenses.toLocaleString()}`);
console.log(`יתרה: ₪${balance.toLocaleString()}`);

if (balance >= 0) {
    console.log("התקציב מאוזן ✅");
} else {
    console.log("חריגה מהתקציב ⚠️");
}

// ייצוא הנתונים לשימוש בקבצים אחרים
module.exports = {
    studentsData,
    salesData,
    products,
    familyBudget,
    gradesBySubject
};