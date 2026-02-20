import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        fs: {
          allow: ['..']
        },
        middlewares: [
          {
            apply: 'pre',
            async handle(req: any, res: any, next: any) {
              // Handle archive (3) paths with URL encoding
              const decodedUrl = decodeURIComponent(req.url);
              if (decodedUrl.includes('archive (3)')) {
                const filePath = path.join(process.cwd(), decodedUrl.substring(1));
                try {
                  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                    const file = fs.readFileSync(filePath);
                    res.setHeader('Content-Type', 'video/mp4');
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.end(file);
                    return;
                  }
                } catch (e) {
                  console.error(`Error serving ${filePath}:`, e);
                }
              }
              next();
            }
          } as any
        ]
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), '.'),
        }
      },
      publicDir: 'Videos'
    };
});
