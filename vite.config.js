import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                insights: resolve(__dirname, 'insights.html'),
                whitepaper: resolve(__dirname, 'the-human-helm.html'),
                success: resolve(__dirname, 'success.html'),
                wigglyville: resolve(__dirname, 'wigglyville/index.html'),
                dashboard: resolve(__dirname, 'dashboard/index.html'),
                roadmap: resolve(__dirname, 'roadmap/index.html')
            }
        }
    }
});
