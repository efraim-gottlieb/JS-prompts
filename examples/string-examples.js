// דוגמאות שימוש בכלי הטקסט
// Examples using string tools

const stringTools = require('../tools/string-tools');

console.log('=== דוגמאות לשימוש בכלי טקסט ===\n');

// טקסט לדוגמא
const hebrewText = "שלום עולם! זהו טקסט לדוגמא עם תווים מיוחדים @#$%";
const englishText = "Hello World! This is a sample text.";
const mixedText = "Hello שלום World עולם 123!@#";

console.log('1. ניקוי טקסט מתווים מיוחדים:');
console.log('מקורי:', mixedText);
console.log('נקי:', stringTools.sanitizeText(mixedText));

console.log('\n2. המרת טקסט לכותרת:');
console.log('מקורי:', 'hello world from javascript');
console.log('כותרת:', stringTools.toTitleCase('hello world from javascript'));

console.log('\n3. קיצור טקסט:');
const longText = "זהו טקסט ארוך מאוד שצריך להיות מקוצר לאורך מסוים כדי להתאים למקום המוגבל";
console.log('מקורי:', longText);
console.log('מקוצר:', stringTools.truncate(longText, 30));
console.log('מקוצר עם סיומת אחרת:', stringTools.truncate(longText, 25, '...'));

console.log('\n4. טרנסליטרציה מעברית לאנגלית:');
const hebrewNames = ["יוסי כהן", "דנה לוי", "אלי מור"];
console.log('שמות בעברית:');
hebrewNames.forEach(name => {
    console.log(`${name} -> ${stringTools.hebrewToEnglish(name)}`);
});

console.log('\n5. הדגשת טקסט:');
const textToHighlight = "JavaScript הוא שפת תכנות מעולה ל-JavaScript developers";
console.log('טקסט עם הדגשה:');
console.log(stringTools.highlightText(textToHighlight, 'JavaScript'));

console.log('\n6. ספירת מילים:');
const texts = [
    "מילה אחת",
    "זהו טקסט עם כמה מילים",
    "טקסט ארוך יותר עם הרבה מילים שונות ומגוונות"
];
texts.forEach(text => {
    console.log(`"${text}" -> ${stringTools.wordCount(text)} מילים`);
});

console.log('\n7. יצירת slug:');
const titles = [
    "כיצד ללמוד JavaScript",
    "מדריך למתחילים בתכנות",
    "השפה הטובה ביותר לפיתוח Web!"
];
titles.forEach(title => {
    console.log(`"${title}" -> ${stringTools.createSlug(title)}`);
});

console.log('\n8. בדיקת שפת הטקסט:');
const testTexts = [
    "שלום עולם",
    "Hello World",
    "Mixed שפה text"
];
testTexts.forEach(text => {
    console.log(`"${text}"`);
    console.log(`  עברית בלבד: ${stringTools.isHebrewOnly(text)}`);
    console.log(`  אנגלית בלבד: ${stringTools.isEnglishOnly(text)}`);
});

console.log('\n9. המרת מספרים למילים בעברית:');
const numbers = [0, 1, 5, 12, 25, 100, 123, 500];
numbers.forEach(num => {
    console.log(`${num} -> ${stringTools.numberToHebrewWords(num)}`);
});

console.log('\n10. ראשי תיבות:');
const fullNames = [
    "יוסף בן דוד",
    "דנה כהן לוי", 
    "אליהו מור אבני",
    "Israel Defence Forces"
];
fullNames.forEach(name => {
    console.log(`${name} -> ${stringTools.getInitials(name)}`);
});

// פונקציה מתקדמת - עיבוד רשימת לקוחות
function processCustomerList(customers) {
    console.log('\n=== עיבוד רשימת לקוחות ===');
    
    return customers.map(customer => {
        const cleanName = stringTools.sanitizeText(customer.name);
        const englishName = stringTools.hebrewToEnglish(cleanName);
        const initials = stringTools.getInitials(cleanName);
        const slug = stringTools.createSlug(englishName);
        
        return {
            ...customer,
            cleanName,
            englishName,
            initials,
            slug,
            wordCount: stringTools.wordCount(customer.description || ''),
            shortDescription: stringTools.truncate(customer.description || '', 50)
        };
    });
}

// דוגמא לשימוש
const customers = [
    {
        name: "יוסף כהן@#$",
        description: "לקוח VIP שמזמין הרבה מוצרים ותמיד משלם בזמן. יש לו חנות גדולה במרכז העיר."
    },
    {
        name: "דנה לוי!!!",
        description: "לקוחה חדשה ופעילה"
    }
];

const processedCustomers = processCustomerList(customers);
console.log('לקוחות מעובדים:');
console.table(processedCustomers);

// דוגמא לחיפוש והדגשה
function searchAndHighlight(data, searchTerm) {
    console.log('\n=== חיפוש והדגשה ===');
    console.log(`חיפוש: "${searchTerm}"`);
    
    data.forEach((item, index) => {
        const highlighted = stringTools.highlightText(item.description, searchTerm, 'found');
        console.log(`${index + 1}. ${item.name}`);
        console.log(`   ${highlighted}`);
    });
}

searchAndHighlight(customers, 'לקוח');