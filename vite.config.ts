// vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    electron({
      entry: {
        main: 'src/main/index.ts', // 主进程入口文件
      },
      vite: {
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './src'),
          },
        },
        build: {
          rollupOptions: {
            input: {
              main: 'src/main/index.ts', // 主进程入口文件
            },
            output: {
              format: 'esm', // 设置输出格式为 ESM
            },
          },
          outDir: 'dist/main', // 主进程输出目录
        },
      },
    }),

    viteStaticCopy({
      targets: [
        { src: 'src/renderer', dest: '' },
        {
          src: 'src/main/preload.js',
          dest: 'main',
        },
      ],
    }),
  ],
  define: {},
  build: {
    outDir: 'dist', // 渲染进程输出目录
    rollupOptions: {},
  },
});
