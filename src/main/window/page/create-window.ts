import { BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import { createSession } from '../../session/index.ts';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createWinodw = (window: BrowserWindow, opts?: any) => {
  if (window) return window;
  const _session = createSession();
  return new BrowserWindow({
    width: 800,
    height: 600,
    ...opts,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 如果有 preload 脚本
      session: _session,
      webSecurity: false,
      ...opts?.webPreferences,
    },
  });
};
