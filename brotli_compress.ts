import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { compress } from 'brotli';

readdirSync('dist/').forEach(file => {
    if (file.endsWith('.js') ||
        file.endsWith('.css') ||
        file.endsWith('.html') ||
        file.endsWith('.svg') ||
        file.endsWith('.txt') ||
        file.endsWith('.eot') ||
        file.endsWith('.otf') ||
        file.endsWith('.ttf') ||
        file.endsWith('.gif')) {
        const result = compress(readFileSync('dist/' + file), {
            mode: 1, // 0 = generic, 1 = text, 2 = font (WOFF2).
            quality: 11, // The Brotli quality level, possible levels are 0-11. The default level is 11.
            lgwin: 22 // The LZ77 window size, default is 22.
        });
        writeFileSync('dist/' + file + '.br', result); // Write compressed file.
        //unlinkSync(file); // Remove old file.
    }
});