import { BrowserWindow } from 'electron';

export const createTransWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
  });
  window.loadURL('https://www.baidu.com');
  setTimeout(() => {
    window.setPosition(0, 0, true);
  }, 1000);
  return window;
};
