// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/server.ts'], // instead of server.ts
    outDir: 'prod',
    format: ['esm'],
    splitting: false,
    minify: true,
    clean: true,
    target: 'node18'
});
