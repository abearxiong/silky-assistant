import { BrowserWindow } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const createTransWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
  });
  window.loadURL(process?.env?.ASSISTANT_HOME ?? 'https://kevisual.silkyai.cn/root/talkshow-admin/');
  setTimeout(() => {
    window.setPosition(0, 0, true);
  }, 1000);
  return window;
};

export const createDemoWinodw = (window?: BrowserWindow, opts?: any) => {
  if (window) return window;
  window = new BrowserWindow({
    width: 800,
    height: 600,
    ...opts,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 如果有 preload 脚本
      webSecurity: false,
      ...opts?.webPreferences,
    },
  });
  window.loadURL(process?.env?.ASSISTANT_HOME ?? 'https://kevisual.silkyai.cn/root/talkshow-admin/');
  return window;
};
