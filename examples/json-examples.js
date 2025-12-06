// דוגמאות שימוש בכלי JSON
// Examples using JSON tools

const jsonTools = require('../tools/json-tools');

console.log('=== דוגמאות לשימוש בכלי JSON ===\n');

// נתוני דוגמא
const studentData = {
    personalInfo: {
        name: "יוסי כהן",
        age: 22,
        email: "yossi@example.com",
        address: {
            street: "רחוב הרצל 123",
            city: "תל אביב",
            zipCode: "12345"
        }
    },
    academic: {
        courses: [
            { name: "מתמטיקה", grade: 90 },
            { name: "פיזיקה", grade: 85 },
            { name: "כימיה", grade: 88 }
        ],
        gpa: 87.7,
        year: 3
    },
    metadata: {
        createdAt: "2023-01-15",
        lastUpdated: null,
        isActive: true
    }
};

console.log('1. המרה בטוחה לJSON:');
const jsonString = jsonTools.safeStringify(studentData, 2);
console.log('נתוני הסטודנט כ-JSON:');
console.log(jsonString);

console.log('\n2. פירוק בטוח של JSON:');
const parsedData = jsonTools.safeParse(jsonString);
console.log('האם הפירוק הצליח:', parsedData !== null);

console.log('\n3. בדיקת תקינות JSON:');
const validJson = '{"name": "test", "value": 123}';
const invalidJson = '{"name": "test", "value": 123';
console.log(`"${validJson}" הוא JSON תקין:`, jsonTools.isValidJson(validJson));
console.log(`"${invalidJson}" הוא JSON תקין:`, jsonTools.isValidJson(invalidJson));

console.log('\n4. יצירת עותק עמוק:');
const originalData = { name: "מקור", items: [1, 2, 3] };
const clonedData = jsonTools.deepClone(originalData);
clonedData.name = "עותק";
clonedData.items.push(4);

console.log('נתונים מקוריים:', originalData);
console.log('נתונים משוכפלים:', clonedData);

console.log('\n5. השוואה עמוקה:');
const data1 = { a: 1, b: { c: 2 } };
const data2 = { a: 1, b: { c: 2 } };
const data3 = { a: 1, b: { c: 3 } };

console.log('data1 === data2:', jsonTools.deepEqual(data1, data2));
console.log('data1 === data3:', jsonTools.deepEqual(data1, data3));

console.log('\n6. מיזוג אובייקטים:');
const defaults = {
    settings: { theme: "light", language: "he" },
    features: { darkMode: false }
};

const userPreferences = {
    settings: { language: "en" },
    features: { darkMode: true, notifications: true }
};

const merged = jsonTools.deepMerge(defaults, userPreferences);
console.log('הגדרות ממוזגות:');
console.log(JSON.stringify(merged, null, 2));

console.log('\n7. גישה לנתונים לפי נתיב:');
const studentName = jsonTools.getByPath(studentData, 'personalInfo.name');
const streetAddress = jsonTools.getByPath(studentData, 'personalInfo.address.street');
const nonExistent = jsonTools.getByPath(studentData, 'personalInfo.phone');

console.log('שם הסטודנט:', studentName);
console.log('כתובת הרחוב:', streetAddress);
console.log('טלפון (לא קיים):', nonExistent);

console.log('\n8. הגדרת נתונים לפי נתיב:');
const tempData = jsonTools.deepClone(studentData);
jsonTools.setByPath(tempData, 'personalInfo.phone', '052-1234567');
jsonTools.setByPath(tempData, 'academic.status', 'active');

console.log('טלפון נוסף:', jsonTools.getByPath(tempData, 'personalInfo.phone'));
console.log('סטטוס אקדמי:', jsonTools.getByPath(tempData, 'academic.status'));

console.log('\n9. בדיקת אובייקטים ריקים:');
console.log('האם {} ריק:', jsonTools.isEmpty({}));
console.log('האם [] ריק:', jsonTools.isEmpty([]));
console.log('האם studentData ריק:', jsonTools.isEmpty(studentData));

console.log('\n10. ניקוי אובייקט:');
const dirtyData = {
    name: "טסט",
    value: null,
    description: "",
    count: 0,
    items: [],
    settings: {
        enabled: true,
        config: null,
        options: {
            theme: "dark",
            empty: ""
        }
    }
};

console.log('נתונים לפני ניקוי:');
console.log(JSON.stringify(dirtyData, null, 2));

const cleanedData = jsonTools.cleanObject(dirtyData);
console.log('נתונים אחרי ניקוי:');
console.log(JSON.stringify(cleanedData, null, 2));

console.log('\n11. שטיחת אובייקט:');
const flatData = jsonTools.flatten(studentData);
console.log('נתונים שטוחים:');
console.log(JSON.stringify(flatData, null, 2));

console.log('\n12. החזרת אובייקט לצורה מקוננת:');
const unflattenedData = jsonTools.unflatten(flatData);
console.log('נתונים מקוננים חזרה:');
console.log('האם זהים למקור:', jsonTools.deepEqual(studentData, unflattenedData));

// דוגמא מעשית - ניהול הגדרות משתמש
function manageUserSettings() {
    console.log('\n=== דוגמא: ניהול הגדרות משתמש ===');
    
    // הגדרות ברירת מחדל
    const defaultSettings = {
        appearance: { theme: "light", fontSize: 14 },
        notifications: { email: true, push: false },
        privacy: { analytics: false, cookies: true }
    };
    
    // הגדרות המשתמש (חלקיות)
    const userSettings = {
        appearance: { theme: "dark" },
        notifications: { push: true },
        newFeature: { enabled: true }
    };
    
    // מיזוג ההגדרות
    const finalSettings = jsonTools.deepMerge(defaultSettings, userSettings);
    console.log('הגדרות סופיות:');
    console.log(JSON.stringify(finalSettings, null, 2));
    
    // שמירה כ-JSON
    const settingsJson = jsonTools.safeStringify(finalSettings);
    
    // טעינה וולידציה
    const loadedSettings = jsonTools.safeParse(settingsJson);
    const isValid = loadedSettings !== null && 
                   jsonTools.getByPath(loadedSettings, 'appearance.theme') !== undefined;
    
    console.log('ההגדרות נשמרו ונטענו בהצלחה:', isValid);
}

manageUserSettings();

// דוגמא לטיפול בשגיאות JSON
function handleJsonErrors() {
    console.log('\n=== דוגמא: טיפול בשגיאות JSON ===');
    
    const problematicData = {
        circular: {}
    };
    // יצירת הפניה מעגלית
    problematicData.circular.ref = problematicData;
    
    console.log('ניסיון המרה של אובייקט עם הפניה מעגלית:');
    const result = jsonTools.safeStringify(problematicData);
    console.log('תוצאה:', result === null ? 'נכשל (כצפוי)' : 'הצליח');
    
    console.log('\nניסיון פירוק JSON לא תקין:');
    const invalidResult = jsonTools.safeParse('{ invalid json }');
    console.log('תוצאה:', invalidResult === null ? 'נכשל (כצפוי)' : 'הצליח');
}