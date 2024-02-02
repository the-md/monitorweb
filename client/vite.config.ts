import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT: number = Number(process.env.PORT)

export default defineConfig({
    plugins: [react()],
    server: {
        port: PORT
    },
    build: {
        outDir: 'build'
    }
})
