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
        outDir: 'build',
        rollupOptions: {
            external: ['jwt-decode'],
            output: {
                manualChunks (id) {
                    if (id.includes('node_modules/react-admin')) return 'react-admin'
                    if (id.includes('node_modules/ra-data-json-server')) return 'ra-data-json-server'
                }
            }
        }
    }
})
