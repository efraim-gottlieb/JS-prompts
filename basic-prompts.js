// פרומפטים בסיסיים לניהול קוד JavaScript
// Basic JavaScript Management Prompts

// 1. הקמת פרויקט חדש
// Setting up a new project
/*
mkdir my-js-project
cd my-js-project
npm init -y
npm install --save-dev nodemon
*/

// 2. הוספת scripts ל-package.json
/*
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
*/

// 3. ייבוא וייצוא מודולים
// Import and export modules

// ייצוא פונקציות (module.exports)
function calculateSum(a, b) {
    return a + b;
}

function calculateAverage(numbers) {
    const sum = numbers.reduce((total, num) => total + num, 0);
    return sum / numbers.length;
}

module.exports = {
    calculateSum,
    calculateAverage
};

// ייבוא מודול
// const { calculateSum, calculateAverage } = require('./utils');

// 4. עבודה עם קבצים
// Working with files
const fs = require('fs');

// קריאת קובץ
function readFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return data;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return null;
    }
}

// כתיבת קובץ
function writeFile(filename, data) {
    try {
        fs.writeFileSync(filename, data, 'utf8');
        console.log('File saved successfully!');
        return true;
    } catch (error) {
        console.error('Error writing file:', error.message);
        return false;
    }
}

// 5. טיפול בשגיאות
// Error handling
function safeOperation(operation) {
    try {
        return operation();
    } catch (error) {
        console.error('Operation failed:', error.message);
        return null;
    }
}

// דוגמא לשימוש
const result = safeOperation(() => {
    // כאן יבוא קוד שעלול לזרוק שגיאה
    return JSON.parse('{"valid": "json"}');
});

// 6. עבודה עם Promises
// Working with Promises
function fetchData(url) {
    return new Promise((resolve, reject) => {
        // הדמיית קריאה לשרת
        setTimeout(() => {
            const success = Math.random() > 0.3; // 70% הצלחה
            
            if (success) {
                resolve({ data: "Sample data", status: "success" });
            } else {
                reject(new Error("Failed to fetch data"));
            }
        }, 1000);
    });
}

// שימוש ב-async/await
async function getData() {
    try {
        const result = await fetchData('https://api.example.com/data');
        console.log('Data received:', result);
        return result;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

// 7. ולידציה של נתונים
// Data validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateUser(user) {
    const errors = [];
    
    if (!user.name || user.name.trim() === '') {
        errors.push('Name is required');
    }
    
    if (!user.email || !validateEmail(user.email)) {
        errors.push('Valid email is required');
    }
    
    if (!user.age || user.age < 0 || user.age > 120) {
        errors.push('Valid age is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// 8. דיבאגינג וניפוי שגיאות
// Debugging and troubleshooting

// הדפסת משתנים עם תוויות
console.log('User data:', user);
console.table(arrayData); // לתצוגת טבלה נאה
console.time('operation'); // התחלת מדידת זמן
// ... קוד שאנחנו רוצים למדוד
console.timeEnd('operation'); // סיום מדידת זמן

// בדיקת סוגי נתונים
function debugVariable(variable, name) {
    console.log(`${name}:`, {
        value: variable,
        type: typeof variable,
        isArray: Array.isArray(variable),
        isNull: variable === null,
        isUndefined: variable === undefined
    });
}

// 9. פונקציות עזר שימושיות
// Useful utility functions

// המתנה (delay)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// יצירת ID ייחודי פשוט
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// פורמט תאריך בעברית
function formatDate(date) {
    return new Date(date).toLocaleDateString('he-IL');
}

// בדיקה אם אובייקט ריק
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// 10. ארגון קוד בפונקציות
// Code organization in functions

const Utils = {
    // פונקציות מערכים
    arrays: {
        sum: (arr) => arr.reduce((a, b) => a + b, 0),
        average: (arr) => arr.reduce((a, b) => a + b, 0) / arr.length,
        unique: (arr) => [...new Set(arr)],
        shuffle: (arr) => arr.sort(() => Math.random() - 0.5)
    },
    
    // פונקציות מחרוזות
    strings: {
        capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
        reverse: (str) => str.split('').reverse().join(''),
        wordCount: (str) => str.split(' ').filter(word => word.length > 0).length
    },
    
    // פונקציות תאריכים
    dates: {
        isToday: (date) => {
            const today = new Date();
            return date.toDateString() === today.toDateString();
        },
        daysFromNow: (days) => {
            const date = new Date();
            date.setDate(date.getDate() + days);
            return date;
        }
    }
};

// דוגמא לשימוש
console.log('Array sum:', Utils.arrays.sum([1, 2, 3, 4, 5]));
console.log('Capitalized:', Utils.strings.capitalize('hello world'));