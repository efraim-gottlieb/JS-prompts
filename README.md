# JavaScript Tools Collection - אוסף כלים ל-JavaScript

מאגר מאורגן של כלים ודוגמאות שימושיות לעבודה עם JavaScript.

## 📁 מבנה הפרויקט

```
JS-prompts/
├── tools/          # כלים מאורגנים לפי קטגוריות
├── examples/       # דוגמאות שימוש
├── data/          # נתוני דוגמא
└── index.js       # קובץ ייבוא מרכזי
```

## 🛠️ כלים זמינים

### 📊 `tools/math-tools.js`
כלים מתמטיים:
- חישוב סכום, ממוצע, חציון
- מציאת ערכים קיצוניים
- סטטיסטיקות מלאות
- חישוב אחוזים ועיגולים
- יצירת טווחים ומספרים אקראיים

### 🔢 `tools/array-tools.js`
כלי מערכים:
- סינון, מיון וקיבוץ
- הסרת כפילויות
- ערבוב וחלוקה לחלקים
- חיפוש וספירה
- פעולות מתקדמות על מערכים

### 📄 `tools/json-tools.js`
כלי JSON:
- המרה בטוחה לJSON ומJSON
- עותק עמוק והשוואה
- מיזוג אובייקטים
- גישה לנתונים לפי נתיב
- ניקוי ושטיחת אובייקטים

### ⚙️ `tools/utils-tools.js`
כלים עזר כלליים:
- וולידציות (אימייל, URL, מספרים)
- ניהול זמן ותאריכים
- יצירת מזהים ייחודיים
- Debounce ו-Throttle
- פורמטים שונים

## 🎯 דוגמאות

### 💡 `examples/math-examples.js`
דוגמאות לשימוש בכלים המתמטיים

### 📚 `examples/array-examples.js`
דוגמאות לעבודה עם מערכים

### 📝 `examples/json-examples.js`
דוגמאות לעבודה עם JSON

## 📊 נתוני דוגמא

### 📋 `data/sample-data.js`
נתוני דוגמא לתרגול:
- רשימת סטודנטים וציונים
- נתוני מכירות
- מוצרים וקטגוריות
- תקציב משפחתי

## 🚀 איך להתחיל

### התקנה מהירה:
```bash
cd "c:\Users\Efraim\Desktop\JS-prompts"
node index.js  # הצגת מידע כללי
```

### הרצת דוגמאות:
```bash
node examples/math-examples.js     # דוגמאות מתמטיקה
node examples/array-examples.js    # דוגמאות מערכים
node examples/json-examples.js     # דוגמאות JSON
node data/sample-data.js           # נתוני דוגמא
```

## 💡 שימוש בכלים

### ייבוא כלים ספציפיים:
```javascript
const mathTools = require('./tools/math-tools');
const arrayTools = require('./tools/array-tools');

// שימוש
const grades = [85, 92, 78, 96, 88];
console.log('ממוצע:', mathTools.average(grades));

const students = [{name: "אלי", grade: 85}, {name: "דנה", grade: 92}];
const topStudents = arrayTools.filterBy(students, s => s.grade >= 90);
```

### ייבוא מהקובץ הראשי:
```javascript
const tools = require('./index');

// שימוש ישיר
console.log('סכום:', tools.sum([1, 2, 3, 4, 5]));
console.log('ממוצע:', tools.average([1, 2, 3, 4, 5]));

// שימוש בקטגוריות
const data = [{name: "טסט", value: 10}];
const filtered = tools.array.filterBy(data, item => item.value > 5);
```

## 📖 דוגמאות מהירות

### חישוב ממוצע:
```javascript
const mathTools = require('./tools/math-tools');
const grades = [85, 92, 78, 96, 88];
const average = mathTools.average(grades);
console.log('ממוצע:', average); // 87.8
```

### סינון מערך:
```javascript
const arrayTools = require('./tools/array-tools');
const students = [
    { name: "אלי", grade: 85 },
    { name: "דנה", grade: 92 }
];
const topStudents = arrayTools.filterBy(students, s => s.grade >= 90);
```

### עבודה עם JSON:
```javascript
const jsonTools = require('./tools/json-tools');
const data = { name: "יוסי", grades: [85, 90] };
const jsonString = jsonTools.safeStringify(data, 2);
const parsed = jsonTools.safeParse(jsonString);
```

### יצירת מזהה ייחודי:
```javascript
const utilsTools = require('./tools/utils-tools');
const id = utilsTools.generateId(8);
console.log('מזהה חדש:', id);
```

## 🎯 תרגילים מומלצים

1. **מתמטיקה**: חשב סטטיסטיקות מלאות לציוני הכיתה
2. **מערכים**: מיין סטודנטים לפי ציון וקבץ לפי עיר
3. **JSON**: צור מערכת הגדרות עם ברירות מחדל
4. **כלים עזר**: בנה מערכת validation לטופס
5. **משולב**: צור דוח מלא על נתוני המכירות

## 💡 טיפים

- **השתמש ב-`getStatistics()`** לקבלת סטטיסטיקות מלאות
- **השתמש ב-`filterBy()` ו-`sortBy()`** לעבודה נוחה עם מערכים
- **השתמש ב-`safeStringify()` ו-`safeParse()`** למניעת שגיאות
- **השתמש ב-`deepClone()`** ליצירת עותקים עמוקים
- **תמיד בדוק את התוצאות** עם `console.table()` למערכי אובייקטים

---

**בהצלחה בלימוד JavaScript! 🚀**

## איך להשתמש

1. **העתק את הקבצים לפרויקט שלך**
2. **בחר את הדוגמאות הרלוונטיות**
3. **התאם את הקוד לצרכים שלך**
4. **הרץ את הדוגמאות**:
   ```bash
   node json-examples.js
   node array-operations.js
   node sample-data.js
   ```

## דוגמאות שימוש מהירות

### חישוב ממוצע מערך:
```javascript
const grades = [85, 92, 78, 96, 88];
const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
console.log("Average:", average);
```

### עבודה עם JSON:
```javascript
const student = { name: "יוסי", age: 25, grades: [85, 92, 78] };
const jsonString = JSON.stringify(student);
const parsedStudent = JSON.parse(jsonString);
```

### סינון מערך:
```javascript
const students = [
    { name: "אלי", grade: 85 },
    { name: "דנה", grade: 92 }
];
const topStudents = students.filter(student => student.grade > 80);
```

## טיפים מהירים

- **השתמש ב-`reduce()`** לחישובי סכום וממוצע
- **השתמש ב-`filter()`** לסינון נתונים
- **השתמש ב-`map()`** להמרת נתונים
- **תמיד הוסף `try/catch`** לפעולות שעלולות להיכשל
- **השתמש ב-`console.table()`** לתצוגה נאה של מערכים

## תרגילים מומלצים

1. חשב ממוצע ציונים לכל סטודנט מ-`sample-data.js`
2. מצא את המוצר הכי יקר בכל קטגוריה
3. חשב אחוז השגת יעד מנתוני המכירות
4. צור פונקציה לחישוב סטטיסטיקות מלאות של מערך
5. בנה מערכת פשוטה לניהול רשימת מטלות

---

**בהצלחה בלימוד JavaScript! 🚀**# JS-prompts
