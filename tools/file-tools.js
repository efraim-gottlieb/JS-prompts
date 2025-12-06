// כלי קבצים ונתונים - File Tools
// File and data utility functions

const fs = require('fs');
const path = require('path');

/**
 * קריאת קובץ JSON בצורה בטוחה
 * Read JSON file safely
 * @param {string} filePath - נתיב הקובץ
 * @returns {Object|null} תוכן הקובץ או null
 */
function readJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
        }
        
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading JSON file ${filePath}:`, error.message);
        return null;
    }
}

/**
 * כתיבת קובץ JSON בצורה בטוחה
 * Write JSON file safely
 * @param {string} filePath - נתיב הקובץ
 * @param {Object} data - הנתונים לכתיבה
 * @param {boolean} createDir - צור תיקיות אם לא קיימות
 * @returns {boolean} האם הכתיבה הצליחה
 */
function writeJsonFile(filePath, data, createDir = true) {
    try {
        if (createDir) {
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        }
        
        const jsonString = JSON.stringify(data, null, 2);
        fs.writeFileSync(filePath, jsonString, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing JSON file ${filePath}:`, error.message);
        return false;
    }
}

/**
 * קריאת קובץ CSV לאובייקט
 * Read CSV file to object
 * @param {string} filePath - נתיב הקובץ
 * @param {string} delimiter - מפריד (ברירת מחדל: ,)
 * @returns {Array|null} מערך אובייקטים או null
 */
function readCsvFile(filePath, delimiter = ',') {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
        }
        
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.trim().split('\n');
        
        if (lines.length === 0) return [];
        
        const headers = lines[0].split(delimiter).map(h => h.trim());
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(delimiter).map(v => v.trim());
            const obj = {};
            
            headers.forEach((header, index) => {
                obj[header] = values[index] || '';
            });
            
            result.push(obj);
        }
        
        return result;
    } catch (error) {
        console.error(`Error reading CSV file ${filePath}:`, error.message);
        return null;
    }
}

/**
 * כתיבת מערך אובייקטים לקובץ CSV
 * Write array of objects to CSV file
 * @param {string} filePath - נתיב הקובץ
 * @param {Array} data - מערך האובייקטים
 * @param {Array} headers - כותרות העמודות (אופציונלי)
 * @returns {boolean} האם הכתיבה הצליחה
 */
function writeCsvFile(filePath, data, headers = null) {
    try {
        if (!Array.isArray(data) || data.length === 0) {
            console.warn('No data to write to CSV');
            return false;
        }
        
        const actualHeaders = headers || Object.keys(data[0]);
        let csvContent = actualHeaders.join(',') + '\n';
        
        data.forEach(row => {
            const values = actualHeaders.map(header => {
                const value = row[header] || '';
                // אם הערך מכיל פסיק, עוטף בגרשיים
                return value.toString().includes(',') ? `"${value}"` : value;
            });
            csvContent += values.join(',') + '\n';
        });
        
        fs.writeFileSync(filePath, csvContent, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing CSV file ${filePath}:`, error.message);
        return false;
    }
}

/**
 * קבלת מידע על קובץ
 * Get file information
 * @param {string} filePath - נתיב הקובץ
 * @returns {Object|null} מידע על הקובץ
 */
function getFileInfo(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return null;
        }
        
        const stats = fs.statSync(filePath);
        return {
            name: path.basename(filePath),
            path: filePath,
            size: stats.size,
            sizeFormatted: formatFileSize(stats.size),
            extension: path.extname(filePath),
            created: stats.birthtime,
            modified: stats.mtime,
            isDirectory: stats.isDirectory(),
            isFile: stats.isFile()
        };
    } catch (error) {
        console.error(`Error getting file info for ${filePath}:`, error.message);
        return null;
    }
}

/**
 * פורמט גודל קובץ
 * Format file size
 * @param {number} bytes - גודל בבייטים
 * @returns {string} גודל מעוצב
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * רשימת קבצים בתיקיה
 * List files in directory
 * @param {string} dirPath - נתיב התיקיה
 * @param {Object} options - אפשרויות
 * @returns {Array} רשימת קבצים
 */
function listFiles(dirPath, options = {}) {
    const { 
        recursive = false, 
        extensions = null, 
        includeHidden = false 
    } = options;
    
    try {
        if (!fs.existsSync(dirPath)) {
            console.warn(`Directory not found: ${dirPath}`);
            return [];
        }
        
        const files = [];
        const items = fs.readdirSync(dirPath);
        
        items.forEach(item => {
            if (!includeHidden && item.startsWith('.')) return;
            
            const fullPath = path.join(dirPath, item);
            const stats = fs.statSync(fullPath);
            
            if (stats.isDirectory() && recursive) {
                files.push(...listFiles(fullPath, options));
            } else if (stats.isFile()) {
                const ext = path.extname(item).toLowerCase();
                
                if (!extensions || extensions.includes(ext)) {
                    files.push({
                        name: item,
                        path: fullPath,
                        size: stats.size,
                        extension: ext,
                        modified: stats.mtime
                    });
                }
            }
        });
        
        return files;
    } catch (error) {
        console.error(`Error listing files in ${dirPath}:`, error.message);
        return [];
    }
}

/**
 * יצירת גיבוי קובץ
 * Create file backup
 * @param {string} filePath - נתיב הקובץ
 * @returns {string|null} נתיב הגיבוי או null
 */
function backupFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${filePath}`);
            return null;
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const ext = path.extname(filePath);
        const base = path.basename(filePath, ext);
        const dir = path.dirname(filePath);
        
        const backupPath = path.join(dir, `${base}_backup_${timestamp}${ext}`);
        
        fs.copyFileSync(filePath, backupPath);
        return backupPath;
    } catch (error) {
        console.error(`Error creating backup for ${filePath}:`, error.message);
        return null;
    }
}

/**
 * מיזוג קבצי JSON
 * Merge JSON files
 * @param {Array} filePaths - נתיבי הקבצים
 * @param {string} outputPath - נתיב הקובץ המאוחד
 * @returns {boolean} האם המיזוג הצליח
 */
function mergeJsonFiles(filePaths, outputPath) {
    try {
        const merged = {};
        
        filePaths.forEach(filePath => {
            const data = readJsonFile(filePath);
            if (data) {
                Object.assign(merged, data);
            }
        });
        
        return writeJsonFile(outputPath, merged);
    } catch (error) {
        console.error('Error merging JSON files:', error.message);
        return false;
    }
}

/**
 * חיפוש טקסט בקבצים
 * Search text in files
 * @param {string} searchTerm - מחרוזת החיפוש
 * @param {string} dirPath - נתיב התיקיה
 * @param {Array} extensions - סיומות קבצים
 * @returns {Array} תוצאות החיפוש
 */
function searchInFiles(searchTerm, dirPath, extensions = ['.txt', '.js', '.json']) {
    try {
        const files = listFiles(dirPath, { recursive: true, extensions });
        const results = [];
        
        files.forEach(file => {
            try {
                const content = fs.readFileSync(file.path, 'utf8');
                const lines = content.split('\n');
                
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(searchTerm.toLowerCase())) {
                        results.push({
                            file: file.name,
                            path: file.path,
                            line: index + 1,
                            content: line.trim()
                        });
                    }
                });
            } catch (error) {
                // דלג על קבצים שלא ניתן לקרוא
            }
        });
        
        return results;
    } catch (error) {
        console.error('Error searching in files:', error.message);
        return [];
    }
}

// ייצוא כל הפונקציות
module.exports = {
    readJsonFile,
    writeJsonFile,
    readCsvFile,
    writeCsvFile,
    getFileInfo,
    formatFileSize,
    listFiles,
    backupFile,
    mergeJsonFiles,
    searchInFiles
};