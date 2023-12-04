import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import viteProgressBar from "vite-plugin-progress";

export default defineConfig({
    plugins: [
        viteProgressBar()
    ],
    resolve:{
        alias:{
            "@": fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets',import.meta.url)),
            '@models': fileURLToPath(new URL('./src/model', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
        }
    },
    server:{
        port: 8080
    }
})