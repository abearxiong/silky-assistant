import { BrowserWindow } from 'electron';
import { getOrigin } from '@/main/process/index.ts';
import { createWinodw } from './create-window.ts';

export const createEnterPage = (window?: BrowserWindow) => {
  const mainWindow = createWinodw(window);
  const url = new URL('/root/assistant-base-app/?link=enter', getOrigin());
  mainWindow.loadURL(url.toString());
  return mainWindow;
};
