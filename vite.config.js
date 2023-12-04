import { defineConfig } from "vite";
import progress from "vite-plugin-progress"
import { fileURLToPath,URL } from "url";

export default defineConfig({
    plugins: [
        progress()
    ],
    resolve:{
        alias:{
            "@": fileURLToPath(new URL('./src', import.meta.url)),
            "@assets": fileURLToPath(new URL('./src/assets', import.meta.url)),
        }
    },
    build:{
        assetsInlineLimit: (80*1024)
    },
    server:{
        port: 12405,
        open: true,
        /*strictPort: true*/
        host: true
    }
})

