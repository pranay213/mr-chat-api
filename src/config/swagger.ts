// src/config/swagger.ts
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load the YAML file
const swaggerSpec = YAML.load(path.resolve(__dirname, '../../swagger.yaml'));

export { swaggerSpec };
