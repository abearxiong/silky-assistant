import { BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createAppPackagesPage = (window?: BrowserWindow) => {
  const mainWindow =
    window ||
    new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 如果有 preload 脚本
    },
  });
  mainWindow.loadFile(path.join(__dirname, '../renderer/packages/index.html')); // Vite 构建后的文件
  return mainWindow;
};
