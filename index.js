import fs from 'fs';
import path from 'path';

/**
 * Vite Plugin: Generate Browser Extension Manifest
 * @param {Object} options
 * @param {Object} options.manifest - The manifest object to write
 * @returns {Object} Vite plugin config
 */
export function viteExtManifest({manifest}) {
    return {
        name: 'vite-ext-manifest',
        apply: 'build',
        
        writeBundle(options) {
            const outDir = options.dir || 'dist';
            const manifestPath = path.join(outDir, 'manifest.json');

            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, {recursive: true});
            }

            fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
            console.log(`✅ Manifest generated at: ${manifestPath}`);
        },
    };
}