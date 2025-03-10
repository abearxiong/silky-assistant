import { BrowserWindow } from 'electron';

export class WindowsManager {
  static window: BrowserWindow;
  static setWindow = (window: BrowserWindow) => {
    WindowsManager.window = window;
  };
  static getWindow = () => {
    return WindowsManager.window;
  };
}
