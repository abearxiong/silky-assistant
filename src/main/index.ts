import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { createSession } from './session/index.ts';
import { handle } from './handle/index.ts';
import { loadMenu } from './menu/index.ts';
import { getLogPath, log } from './app.ts';
import { checkShowPage } from './window/page/index.ts';
import { closeProcess, createProcess } from './process/index.ts';
import { getElectronResourcePath, isMac } from './system/env.ts';
// import { checkForUpdates } from './updater/index.ts';
import { createTransWindow, createDemoWinodw } from './browsers/trans.ts';

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow: BrowserWindow | null;

async function createWindow() {
  const resourcePath = getElectronResourcePath();
  log.info('resourcePath', resourcePath);
  log.info('createWindow');
  log.info('path', getLogPath());
  loadMenu();
  // await checkShowPage(mainWindow);
  let transWindow = createDemoWinodw();
  transWindow.on('closed', () => {
    transWindow = null;
  });
  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });
}

app.on('ready', async () => {
  // await createProcess();
  createWindow();
  // if (!isMac()) {
  //   checkForUpdates();
  // }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
  closeProcess();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

handle();
