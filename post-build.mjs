import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, './dist');

// Regex matches:
// import xyz from './abc'
// import { x } from '../abc'
// export * from './abc'
const importExportRegex = /(import|export)\s+[^'"]*?['"](\.\/[^'"]+|\.{2}\/[^'"]+)['"]/g;

function fixImportExtensions(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    const updated = content.replace(importExportRegex, (match, keyword, importPath) => {
        if (!importPath.endsWith('.js')) {
            return match.replace(importPath, `${importPath}.js`);
        }
        return match;
    });

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`🔧 Fixed imports in: ${filePath}`);
    }
}

function walkDirAndFix(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
            walkDirAndFix(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            fixImportExtensions(fullPath);
        }
    }
}

walkDirAndFix(distDir);
