import { BrowserWindow } from 'electron';
import { getOrigin } from '@/main/process/index.ts';
import { createWinodw } from './create-window.ts';

export const createAppPackagesPage = (window?: BrowserWindow) => {
  const mainWindow = createWinodw(window);
  const url = new URL('/root/assistant-base-app/?link=packages', getOrigin());
  mainWindow.loadURL(url.toString());
  return mainWindow;
};
