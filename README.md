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
