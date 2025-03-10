import { ipcMain } from 'electron';
import { getAppList, getCacheAssistantConfig, setConfig } from '@/modules/config/index.ts';
import { installApp, uninstallApp } from '../proxy/install.ts';
import { relunch } from '../window/relunch.ts';

export const handle = () => {
  ipcMain.handle('get-app-list', (event, data) => {
    // 获取应用路径
    const appList = getAppList();
    return appList;
  });

  ipcMain.handle('install-app', (event, data) => {
    console.log('install-app', data.user, data.key, data.version);
    return installApp(data);
  });

  ipcMain.handle('uninstall-app', (event, data) => {
    console.log('uninstall-app', data.user, data.key, data.version);
    return uninstallApp(data);
  });

  ipcMain.handle('save-app-config', (event, data) => {
    console.log('save-app-config', data);
    if (!data) {
      return getCacheAssistantConfig();
    }
    const config = getCacheAssistantConfig();
    return setConfig({ ...config, ...data });
  });

  ipcMain.handle('relunch', () => {
    relunch();
  });
};
