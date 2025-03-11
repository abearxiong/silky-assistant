import { getCacheAssistantConfig } from '@/modules/config/index.ts';
import { createEnterPage } from './enter.ts';
import { createAppPackagesPage } from './app-packages.ts';
import { BrowserWindow } from 'electron';
import { getOrigin } from '@/main/process/index.ts';
import { createWinodw } from './create-window.ts';

/**
 *
 * @param window
 * @param openUrl /web/note
 * @returns
 */
export const checkShowPage = async (window?: BrowserWindow, openUrl?: string) => {
  const assistantConfig = getCacheAssistantConfig();
  const { pageApi, proxy, loadURL } = assistantConfig;
  if (!pageApi) {
    return createEnterPage(window);
  }
  if (!proxy || proxy.length === 0) {
    return createAppPackagesPage(window);
  }
  window = createWinodw(window);
  let defaultURL = getOrigin() + '/web/note/';
  if (openUrl) {
    defaultURL = getOrigin() + openUrl;
    window?.loadURL(defaultURL);
    return window;
  }
  if (loadURL) {
    const url = new URL(loadURL, getOrigin());
    const urls = url.pathname.split('/');
    const [_, user, app] = urls;
    let _loadURL = url.toString();
    if (!user && !app) {
      _loadURL = defaultURL;
    }
    if (app && urls.length === 3) {
      _loadURL = url.toString() + '/';
    }
    console.log('url loadURL', _loadURL);
    window?.loadURL(_loadURL);
    return window;
  }
  window?.loadURL(defaultURL);
  return window;
};
