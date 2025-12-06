// קובץ אינדקס לייבוא כל הכלים
// Main index file for importing all tools

// ייבוא כל הכלים
const mathTools = require('./tools/math-tools');
const arrayTools = require('./tools/array-tools');
const jsonTools = require('./tools/json-tools');
const utilsTools = require('./tools/utils-tools');

// ייצוא מאוחד של כל הכלים
module.exports = {
    // כלים מתמטיים
    math: mathTools,
    
    // כלי מערכים
    array: arrayTools,
    
    // כלי JSON
    json: jsonTools,
    
    // כלים עזר
    utils: utilsTools,
    
    // גישה ישירה לפונקציות פופולריות
    sum: mathTools.sum,
    average: mathTools.average,
    getStats: mathTools.getStatistics,
    
    filterBy: arrayTools.filterBy,
    sortBy: arrayTools.sortBy,
    groupBy: arrayTools.groupBy,
    
    safeParse: jsonTools.safeParse,
    safeStringify: jsonTools.safeStringify,
    deepClone: jsonTools.deepClone,
    
    delay: utilsTools.delay,
    generateId: utilsTools.generateId,
    formatDate: utilsTools.formatDate
};

// מידע על הכלים הזמינים
const toolsInfo = {
    description: 'JavaScript Tools Collection - אוסף כלים ל-JavaScript',
    version: '1.0.0',
    tools: {
        math: {
            description: 'כלים מתמטיים',
            functions: Object.keys(mathTools)
        },
        array: {
            description: 'כלי מערכים',
            functions: Object.keys(arrayTools)
        },
        json: {
            description: 'כלי JSON',
            functions: Object.keys(jsonTools)
        },
        utils: {
            description: 'כלים עזר כלליים',
            functions: Object.keys(utilsTools)
        }
    }
};

// פונקציה להצגת מידע על הכלים
function showToolsInfo() {
    console.log('=== JavaScript Tools Collection ===');
    console.log(`תיאור: ${toolsInfo.description}`);
    console.log(`גרסה: ${toolsInfo.version}\n`);
    
    Object.entries(toolsInfo.tools).forEach(([toolName, toolInfo]) => {
        console.log(`📁 ${toolName.toUpperCase()}: ${toolInfo.description}`);
        console.log(`   פונקציות זמינות: ${toolInfo.functions.length}`);
        console.log(`   ${toolInfo.functions.slice(0, 5).join(', ')}${toolInfo.functions.length > 5 ? '...' : ''}\n`);
    });
}

// הוספת פונקציה להצגת מידע לייצוא
module.exports.showInfo = showToolsInfo;
module.exports.toolsInfo = toolsInfo;

// דוגמא לשימוש אם הקובץ מורץ ישירות
if (require.main === module) {
    console.log('🚀 JavaScript Tools Collection');
    showToolsInfo();
    
    console.log('דוגמאות שימוש מהירות:\n');
    
    // דוגמאות מתמטיקה
    const numbers = [1, 2, 3, 4, 5];
    console.log('מספרים:', numbers);
    console.log('סכום:', mathTools.sum(numbers));
    console.log('ממוצע:', mathTools.average(numbers));
    
    // דוגמאות מערכים
    const data = [
        { name: 'אלי', grade: 85 },
        { name: 'דנה', grade: 92 },
        { name: 'רון', grade: 78 }
    ];
    console.log('\nנתוני סטודנטים:');
    console.table(data);
    
    const topStudents = arrayTools.filterBy(data, student => student.grade >= 85);
    console.log('סטודנטים מצטיינים:');
    console.table(topStudents);
    
    // דוגמת JSON
    const jsonData = jsonTools.safeStringify(data, 2);
    console.log('\nנתונים כ-JSON:');
    console.log(jsonData);
    
    // דוגמת כלים עזר
    console.log('\nמזהה ייחודי:', utilsTools.generateId());
    console.log('תאריך נוכחי:', utilsTools.formatDate(new Date()));
    
    console.log('\n📖 לדוגמאות מפורטות, הרץ את הקבצים בתיקיית examples/');
    console.log('📊 לנתוני דוגמא, ראה בתיקיית data/');
}