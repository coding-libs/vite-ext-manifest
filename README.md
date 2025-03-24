# vite-ext-manifest

A Vite plugin to dynamically generate browser extension manifest files.

## Installation

```bash
npm install vite-ext-manifest
```

## Examples

```js
// vite.config.js
import { defineConfig } from 'vite';
import { viteExtManifest } from 'vite-ext-manifest';

export default defineConfig({
  plugins: [
    viteExtManifest({
      manifest: {
        manifest_version: 3,
        name: 'My Extension',
        version: '1.0.0',
        // ... your manifest content
      },
    }),
  ],
});
```

###OR

```js
// manifest.config.ts

import packageJson from './package.json';

const {version} = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = '0'] = version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/g, '') // Remove non-numeric characters
    .split(/[.-]/); // Split into version parts

export function defineManifest(env) {
    return {
        manifest_version: 3,
        name: env.mode === 'staging'
            ? '[Staging] __MSG_extension_name__'
            : '__MSG_extension_name__',
        // up to four numbers separated by dots
        short_name: "__MSG_extension_short_name__",
        version: `${major}.${minor}.${patch}.${label}`,
        version_name: version,
        description: '__MSG_extension_description__',
        default_locale: "en",
        content_security_policy: {
            extension_pages: `default-src 'self'; style-src 'unsafe-inline'; script-src 'self'; connect-src 'self' img-src 'self' data:`,
        },
        minimum_chrome_version: "126",
        update_url: "https://clients2.google.com/service/update2/crx",
        permissions: [
        ],
        host_permissions: [
            "http://*/*",
            "https://*/*"
        ],
        action: {
            default_popup: "index.html",
            default_title: "__MSG_extension_name__",
            default_icon: {
                "16": "src/assets/icons/icon16.png",
                "32": "src/assets/icons/icon32.png",
                "48": "src/assets/icons/icon48.png",
                "128": "src/assets/icons/icon128.png"
            }
        },
      //.............
    }
}




// vite.config.js
import {defineManifest} from './manifest.config'; // Import function
import {viteExtManifest} from "vite-ext-manifest";

export default defineConfig(() => {
    return {
        plugins: [
            vue(),
            viteExtManifest({manifest: defineManifest(env)})
        ],
        //.......
    };
});
```