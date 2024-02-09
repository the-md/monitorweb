import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
    plugins: [react(), Inspect()],
    envPrefix: 'APP_',
    server: {
        port: 3000
    },
    build: {
        outDir: 'build'
    }
})
