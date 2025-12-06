// קובץ דוגמאות לעבודה עם JSON ב-JavaScript
// Examples for working with JSON in JavaScript

// 1. יצירת אובייקט JSON פשוט
// Creating a simple JSON object
const student = {
    name: "יוסי",
    age: 25,
    city: "תל אביב",
    grades: [85, 92, 78, 95],
    isActive: true
};

// 2. המרת אובייקט ל-JSON string
// Converting object to JSON string
const jsonString = JSON.stringify(student);
console.log("JSON String:", jsonString);

// 3. המרת JSON string חזרה לאובייקט
// Converting JSON string back to object
const parsedObject = JSON.parse(jsonString);
console.log("Parsed Object:", parsedObject);

// 4. קריאת JSON מקובץ (לדוגמא עם fetch)
// Reading JSON from file (example with fetch)
async function readJsonFile() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        console.log("Data from file:", data);
    } catch (error) {
        console.error("Error reading JSON:", error);
    }
}

// 5. עיבוד JSON עם validation
// Processing JSON with validation
function validateAndProcessStudent(jsonData) {
    try {
        const student = JSON.parse(jsonData);
        
        // בדיקת שדות חובה
        if (!student.name || !student.age) {
            throw new Error("Missing required fields: name or age");
        }
        
        // עיבוד הנתונים
        const processedData = {
            ...student,
            fullName: student.name,
            ageGroup: student.age < 18 ? "קטין" : "בוגר",
            averageGrade: student.grades ? 
                student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length 
                : 0
        };
        
        return processedData;
    } catch (error) {
        console.error("Validation error:", error.message);
        return null;
    }
}

// 6. JSON עם nested objects
// JSON with nested objects
const complexStudent = {
    personalInfo: {
        name: "שרה",
        age: 22,
        contact: {
            email: "sara@email.com",
            phone: "052-1234567"
        }
    },
    academic: {
        courses: [
            { name: "מתמטיקה", grade: 90 },
            { name: "פיזיקה", grade: 85 },
            { name: "כימיה", grade: 88 }
        ],
        gpa: 0
    }
};

// חישוב ממוצע ועדכון הנתונים
complexStudent.academic.gpa = 
    complexStudent.academic.courses.reduce((sum, course) => sum + course.grade, 0) 
    / complexStudent.academic.courses.length;

console.log("Complex student data:", JSON.stringify(complexStudent, null, 2));

// 7. סינון והמרת JSON
// Filtering and transforming JSON
const studentsArray = [
    { name: "אלי", age: 20, grade: 85 },
    { name: "דנה", age: 22, grade: 92 },
    { name: "רון", age: 19, grade: 78 }
];

// סינון סטודנטים עם ציון מעל 80
const topStudents = studentsArray
    .filter(student => student.grade > 80)
    .map(student => ({
        ...student,
        status: "מצטיין"
    }));

console.log("Top students:", JSON.stringify(topStudents, null, 2));