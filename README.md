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

### ⚡️ `tools/utils-tools.js`
כלים עזר כלליים:
- וולידציות (אימייל, URL, מספרים)
- ניהול זמן ותאריכים
- יצירת מזהים ייחודיים
- Debounce ו-Throttle
- פורמטים שונים

### 🅰️ `tools/string-tools.js`
כלי טקסט ומחרוזות:
- ניקוי וסניטייזציה של טקסט
- טרנסליטרציה עברית-אנגלית
- קיצור ועיצוב טקסט
- חיפוש והדגשה
- בדיקות שפה ופורמט

### 🗺️ `tools/date-tools.js`
כלי תאריכים וזמנים:
- חישוב גיל והפרשי זמן
- פורמט תאריך בעברית
- זמן יחסי (לפני כמה זמן)
- טווחי תאריכים
- חישוב שעות עבודה

### ✅ `tools/validation-tools.js`
כלי וולידציה:
- וולידציה ישראלית (ת"ז, טלפון)
- אימות אימייל ו-URL
- בדיקת חוזק סיסמאות
- וולידציה של כרטיסי אשראי
- בדיקות נתונים כלליות

### 🗋 `tools/file-tools.js`
כלי קבצים ונתונים:
- קריאה/כתיבה של JSON ו-CSV
- חיפוש בקבצים
- ניהול תיקיות
- גיבוי ומיזוג
- מידע על קבצים

## 🎯 דוגמאות

### 💡 `examples/math-examples.js`
דוגמאות לשימוש בכלים המתמטיים

### 📋 `examples/array-examples.js`
דוגמאות לעבודה עם מערכים

### 📝 `examples/json-examples.js`
דוגמאות לעבודה עם JSON

### 🅰️ `examples/string-examples.js`
דוגמאות לעיבוד טקסט ומחרוזות

### 🗺️ `examples/date-examples.js`
דוגמאות לעבודה עם תאריכים וזמנים

### ✅ `examples/validation-examples.js`
דוגמאות לוולידציה ואימות נתונים

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
node examples/math-examples.js        # דוגמאות מתמטיקה
node examples/array-examples.js       # דוגמאות מערכים
node examples/json-examples.js        # דוגמאות JSON
node examples/string-examples.js      # דוגמאות טקסט
node examples/date-examples.js        # דוגמאות תאריכים
node examples/validation-examples.js  # דוגמאות וולידציה
node data/sample-data.js              # נתוני דוגמא
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

### עיבוד טקסט בעברית:
```javascript
const stringTools = require('./tools/string-tools');
const hebrewText = "שלום עולם";
const englishText = stringTools.hebrewToEnglish(hebrewText);
console.log('באנגלית:', englishText); // "shalom olam"
```

### חישוב גיל:
```javascript
const dateTools = require('./tools/date-tools');
const age = dateTools.calculateAge('1990-01-01');
console.log('גיל:', age);
```

### וולידציה ישראלית:
```javascript
const validationTools = require('./tools/validation-tools');
const isValidId = validationTools.validateIsraeliId('123456789');
const isValidPhone = validationTools.validateIsraeliPhone('052-1234567');
```

## 🎯 תרגילים מומלצים

1. **מתמטיקה**: חשב סטטיסטיקות מלאות לציוני הכיתה
2. **מערכים**: מיין סטודנטים לפי ציון וקבץ לפי עיר
3. **JSON**: צור מערכת הגדרות עם ברירות מחדל
4. **טקסט**: בנה מערכת חיפוש וסינון לרשימת אנשים
5. **תאריכים**: צור מערכת ניהול מועדים ואירועים
6. **וולידציה**: בנה טופס הרשמה מלא עם בדיקות
7. **קבצים**: צור מערכת ניהול נתונים עם CSV
8. **משולב**: צור דשבורד מלא עם כל הכלים

## 💡 טיפים

- **השתמש ב-`getStatistics()`** לקבלת סטטיסטיקות מלאות
- **השתמש ב-`filterBy()` ו-`sortBy()`** לעבודה נוחה עם מערכים
- **השתמש ב-`safeStringify()` ו-`safeParse()`** למניעת שגיאות
- **השתמש ב-`deepClone()`** ליצירת עותקים עמוקים
- **השתמש ב-`hebrewToEnglish()`** לטרנסליטרציה מהירה
- **השתמש ב-`validateIsraeliId()`** לבדיקת תעודות זהות
- **השתמש ב-`calculateAge()`** לחישוב גיל מדויק
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
