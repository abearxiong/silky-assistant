import { app, BrowserWindow, ipcMain, session } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { LocalElectronAppUrl } from '../modules/config';
import { createSession } from './session';
import { handle } from './handle';
import { loadMenu } from './menu';
import { checkShowPage } from './window/page';
import { createIntroducePage } from './window/page/introduce';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null;

async function createWindow() {
  const _session = createSession();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 如果有 preload 脚本
      session: _session,
    },
  });
  loadMenu();
  await checkShowPage(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

handle();
