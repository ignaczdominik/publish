import { fileURLToPath } from "url";
import { defineConfig } from "vite";

export default defineConfig({
    resolve:{
        alias:{
            "@": fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets',import.meta.url)),
            '@models': fileURLToPath(new URL('./src/model', import.meta.url))
        }
    },
    server:{
        port: 8080
    }
})