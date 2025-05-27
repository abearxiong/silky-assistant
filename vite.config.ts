// vite.config.ts
import path from 'path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
            // external: ['electron-updater', 'electron-log'],
            // external: ['electron-updater'],
          },
          outDir: 'app-dist', // 主进程输出目录
        },
      },
    }),

    // viteStaticCopy({
    //   targets: [
    //     { src: 'src/renderer/assistant-center/*', dest: '../dist' },
    //     {
    //       src: 'src/main/preload.js',
    //       dest: '../app-dist',
    //     },
    //   ],
    // }),
  ],
  define: {},
  build: {
    outDir: 'dist', // 渲染进程输出目录
    rollupOptions: {},
  },
});
