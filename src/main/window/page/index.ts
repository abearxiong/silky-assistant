import { getCacheAssistantConfig, LocalElectronAppUrl } from '@/modules/config';
import { createEnterPage } from './enter';
import { createAppPackagesPage } from './app-packages';
import { BrowserWindow } from 'electron';

export const checkShowPage = async (window?: BrowserWindow) => {
  const assistantConfig = getCacheAssistantConfig();
  const { pageApi, proxy } = assistantConfig;
  if (!pageApi) {
    createEnterPage(window);
    return;
  }
  if (!proxy || proxy.length === 0) {
    createAppPackagesPage(window);
    return;
  }
  return window?.loadURL(LocalElectronAppUrl);
};
