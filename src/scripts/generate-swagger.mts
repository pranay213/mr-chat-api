import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import mongooseToSwagger from 'mongoose-to-swagger';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========= Step 1: Extract Route Prefixes =========
const appFilePath = path.join(__dirname, '../app.ts');
const appContent = fs.readFileSync(appFilePath, 'utf-8');
const baseRouteRegex = /app\.use\(['"`](.*?)['"`],\s*(\w+)Router/g;

const baseRoutes: Record<string, string> = {};
let routeMatch;
while ((routeMatch = baseRouteRegex.exec(appContent)) !== null) {
    const routePrefix = routeMatch[1];
    const routerName = routeMatch[2];
    baseRoutes[routerName] = routePrefix;
}

// ========= Step 2: Extract Endpoints from Routes =========
const routesPath = path.join(__dirname, '../routes');
const paths: Record<string, any> = {};
const routeFiles = fs.readdirSync(routesPath).filter(f => f.endsWith('.ts'));
const routeRegex = /\.([get|post|put|delete|patch]+)\(['"`]([^'"`]+)['"`]/g;

for (const file of routeFiles) {
    const filePath = path.join(routesPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const routerName = path.basename(file, '.ts').replace(/^[a-z]/, c => c.toUpperCase());
    const basePath = baseRoutes[routerName];
    if (!basePath) continue;

    let match;
    while ((match = routeRegex.exec(content)) !== null) {
        const method = match[1].toLowerCase();
        const subPath = match[2];
        const fullPath = `${basePath}${subPath === '/' ? '' : subPath.startsWith('/') ? subPath : '/' + subPath}`;
        if (!paths[fullPath]) paths[fullPath] = {};

        paths[fullPath][method] = {
            summary: `${method.toUpperCase()} ${fullPath}`,
            tags: [routerName],
            requestBody: {
                content: {
                    'application/json': {
                        example: {
                            message: 'Sample request body'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Success',
                    content: {
                        'application/json': {
                            example: {
                                success: true,
                                message: 'Request successful',
                                data: {}
                            }
                        }
                    }
                }
            }
        };
    }
}

// ========= Step 3: Load Mongoose Schemas =========
const modelsPath = path.join(__dirname, '../models');
const schemas: Record<string, any> = {};

async function collectMongooseSchemas(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            await collectMongooseSchemas(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
            const modelModule = await import(`file://${fullPath}`);
            for (const key in modelModule) {
                const model = modelModule[key];
                if (model?.schema) {
                    schemas[key] = mongooseToSwagger(model);
                }
            }
        }
    }
}

await collectMongooseSchemas(modelsPath);

// ========= Step 4: Generate Swagger Object =========
const swaggerDoc = {
    openapi: '3.0.0',
    info: {
        title: 'MR Chat API',
        version: '1.0.0'
    },
    paths,
    components: {
        schemas
    }
};

// ========= Step 5: Write Files =========
const outYaml = path.join(__dirname, '../../swagger.yaml');
const outJson = path.join(__dirname, '../../swagger.json');

fs.writeFileSync(outYaml, YAML.stringify(swaggerDoc), 'utf-8');
fs.writeFileSync(outJson, JSON.stringify(swaggerDoc, null, 2), 'utf-8');


console.log('✅ swagger.yaml, swagger.json, and swagger.ts generated!');
