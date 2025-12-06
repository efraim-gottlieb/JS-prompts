// דוגמאות שימוש בכלי הוולידציה
// Examples using validation tools

const validationTools = require('../tools/validation-tools');

console.log('=== דוגמאות לשימוש בכלי וולידציה ===\n');

console.log('1. וולידציה של תעודות זהות ישראליות:');
const israeliIds = [
    '123456789',  // תקין
    '000000018',  // תקין
    '123456788',  // לא תקין
    '12345678',   // קצר מדי
    'abc123456'   // לא מספרי
];

israeliIds.forEach(id => {
    console.log(`${id}: ${validationTools.validateIsraeliId(id) ? 'תקין ✓' : 'לא תקין ✗'}`);
});

console.log('\n2. וולידציה של מספרי טלפון ישראליים:');
const phoneNumbers = [
    '052-1234567',  // תקין
    '03-1234567',   // תקין
    '052 123 4567', // תקין
    '0521234567',   // תקין
    '521234567',    // תקין
    '123-4567890',  // לא תקין
    '050-123456'    // קצר
];

phoneNumbers.forEach(phone => {
    console.log(`${phone}: ${validationTools.validateIsraeliPhone(phone) ? 'תקין ✓' : 'לא תקין ✗'}`);
});

console.log('\n3. וולידציה של כתובות אימייל:');
const emails = [
    'user@example.com',      // תקין
    'test.email@domain.co.il', // תקין
    'invalid-email',         // לא תקין
    '@domain.com',           // לא תקין
    'user@',                 // לא תקין
    'user@domain'            // לא תקין
];

emails.forEach(email => {
    console.log(`${email}: ${validationTools.validateEmail(email) ? 'תקין ✓' : 'לא תקין ✗'}`);
});

console.log('\n4. וולידציה של כרטיסי אשראי:');
const creditCards = [
    '4111111111111111',      // Visa תקין
    '5555555555554444',      // MasterCard תקין
    '4111111111111112',      // לא תקין
    '1234567890123456',      // לא תקין
    '411111111111111'        // קצר
];

creditCards.forEach(card => {
    const masked = card.slice(0, 4) + '****' + card.slice(-4);
    console.log(`${masked}: ${validationTools.validateCreditCard(card) ? 'תקין ✓' : 'לא תקין ✗'}`);
});

console.log('\n5. וולידציה של סיסמאות:');
const passwords = [
    'Password123!',   // חזקה
    'password',       // חלשה
    'PASSWORD123',    // בינונית
    'Pass123!',       // בינונית
    '12345678'        // חלשה
];

passwords.forEach(password => {
    const validation = validationTools.validatePassword(password);
    const masked = '*'.repeat(password.length);
    console.log(`${masked} (${password.length} תווים):`);
    console.log(`  תקינה: ${validation.isValid ? 'כן' : 'לא'}`);
    console.log(`  חוזק: ${validation.strength}`);
    if (!validation.isValid) {
        validation.errors.forEach(error => console.log(`  - ${error}`));
    }
    console.log();
});

console.log('6. וולידציה של תאריכים:');
const dates = [
    '25/12/2025',    // תקין
    '31/02/2025',    // לא תקין (פברואר אין 31)
    '29/02/2024',    // תקין (שנה מעוברת)
    '29/02/2025',    // לא תקין (לא שנה מעוברת)
    '15/13/2025',    // לא תקין (חודש 13)
    '2025-12-25'     // תקין (פורמט אחר)
];

dates.forEach(date => {
    console.log(`${date}: ${validationTools.validateDate(date) ? 'תקין ✓' : 'לא תקין ✗'}`);
});

console.log('\n7. וולידציה של מספרים שלמים:');
const numbers = [
    { value: '25', options: { min: 18, max: 65 } },
    { value: '15', options: { min: 18, max: 65 } },
    { value: '70', options: { min: 18, max: 65 } },
    { value: 'abc', options: { min: 0, max: 100 } },
    { value: '50.5', options: {} }
];

numbers.forEach(({ value, options }) => {
    const validation = validationTools.validateInteger(value, options);
    console.log(`${value}:`);
    console.log(`  תקין: ${validation.isValid ? 'כן' : 'לא'}`);
    if (validation.isValid) {
        console.log(`  ערך: ${validation.value}`);
    } else {
        validation.errors.forEach(error => console.log(`  - ${error}`));
    }
});

console.log('\n8. וולידציה של URLs:');
const urls = [
    'https://www.example.com',
    'http://localhost:3000',
    'ftp://files.example.com',
    'www.example.com',  // לא תקין (חסר protocol)
    'https://',         // לא תקין
    'invalid-url'       // לא תקין
];

urls.forEach(url => {
    console.log(`${url}: ${validationTools.validateUrl(url) ? 'תקין ✓' : 'לא תקין ✗'}`);
});

console.log('\n9. וולידציה של מחרוזות נדרשות:');
const strings = [
    { value: 'טקסט תקין', options: { minLength: 5, maxLength: 50 } },
    { value: '   ', options: { minLength: 1 } },
    { value: 'קצר', options: { minLength: 10 } },
    { value: 'a'.repeat(100), options: { maxLength: 50 } },
    { value: 123, options: {} }
];

strings.forEach(({ value, options }) => {
    const validation = validationTools.validateRequiredString(value, options);
    console.log(`"${value}" (${typeof value}):`);
    console.log(`  תקין: ${validation.isValid ? 'כן' : 'לא'}`);
    if (validation.isValid) {
        console.log(`  ערך מנוקה: "${validation.value}"`);
    } else {
        validation.errors.forEach(error => console.log(`  - ${error}`));
    }
});

// פונקציה מתקדמת - טופס הרשמה
function validateRegistrationForm(formData) {
    console.log('\n=== וולידציה של טופס הרשמה ===');
    
    const errors = [];
    
    // וולידציה של שם
    const nameValidation = validationTools.validateRequiredString(formData.name, {
        minLength: 2,
        maxLength: 50
    });
    if (!nameValidation.isValid) {
        errors.push(...nameValidation.errors);
    }
    
    // וולידציה של אימייל
    if (!validationTools.validateEmail(formData.email)) {
        errors.push('כתובת אימייל לא תקינה');
    }
    
    // וולידציה של טלפון
    if (!validationTools.validateIsraeliPhone(formData.phone)) {
        errors.push('מספר טלפון לא תקין');
    }
    
    // וולידציה של תעודת זהות
    if (!validationTools.validateIsraeliId(formData.id)) {
        errors.push('תעודת זהות לא תקינה');
    }
    
    // וולידציה של גיל
    const ageValidation = validationTools.validateInteger(formData.age, {
        min: 16,
        max: 120
    });
    if (!ageValidation.isValid) {
        errors.push(...ageValidation.errors);
    }
    
    // וולידציה של תאריך לידה
    if (!validationTools.validateDate(formData.birthDate)) {
        errors.push('תאריך לידה לא תקין');
    }
    
    // וולידציה של סיסמה
    const passwordValidation = validationTools.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
        errors.push(...passwordValidation.errors);
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// דוגמאות טפסים
const forms = [
    {
        name: 'יוסי כהן',
        email: 'yossi@example.com',
        phone: '052-1234567',
        id: '123456789',
        age: '25',
        birthDate: '15/05/1999',
        password: 'SecurePass123!'
    },
    {
        name: 'א',  // קצר מדי
        email: 'invalid-email',
        phone: '123',
        id: '111111111',  // לא תקין
        age: '15',        // צעיר מדי
        birthDate: '31/02/2000',  // תאריך לא תקין
        password: '123'   // סיסמה חלשה
    }
];

forms.forEach((form, index) => {
    console.log(`\nטופס ${index + 1}:`);
    const validation = validateRegistrationForm(form);
    
    if (validation.isValid) {
        console.log('✓ הטופס תקין!');
    } else {
        console.log('✗ הטופס מכיל שגיאות:');
        validation.errors.forEach(error => console.log(`  - ${error}`));
    }
});