// scripts/embed-swagger.ts
import fs from 'fs';
import path from 'path';

const swaggerPath = path.resolve('swagger.json');
const swaggerJson = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

const output = `// AUTO-GENERATED. Do not edit.
export const swaggerSpec = ${JSON.stringify(swaggerJson, null, 2)};
`;

fs.writeFileSync(path.resolve('src/config/swagger.ts'), output);
console.log('✅ Swagger embedded into src/config/swagger.ts');
