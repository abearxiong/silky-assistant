import { app, BrowserWindow, ipcMain, session } from 'electron';
import { getCacheAssistantConfig, appDir, LocalElectronAppUrl } from '../../modules/config';
import { net } from 'electron';
import path from 'path';
import * as url from 'url';
import { checkFileExists } from '../../modules/file';
import { apiProxyList } from '../proxy/api-proxy';

let _session: Electron.Session;
export const createSession = () => {
  if (_session) {
    return _session;
  }
  // 创建一个持久化的会话
  _session = session.fromPartition('persist:app');

  _session.protocol.handle('https', async (req) => {
    const requrl = req.url;
    const newReqUrl = new URL(requrl);
    const localOrigin = new URL(LocalElectronAppUrl).origin;
    if (newReqUrl.origin !== localOrigin) {
      // 不拦截
      return net.fetch(req.url, { bypassCustomProtocolHandlers: true });
    }
    const apiProxy = apiProxyList.find((_proxy: any) => newReqUrl.pathname.startsWith(_proxy.path));
    if (apiProxy) {
      const pageApi = getCacheAssistantConfig().pageApi || '';
      if (!pageApi) {
        return new Response(`App Page Api Not Set, please set it first`);
      }
      const newPageUrl = new URL(req.url, pageApi);
      return net.fetch(newPageUrl.toString(), { bypassCustomProtocolHandlers: true });
    }
    const [user, key] = newReqUrl.pathname.split('/').slice(1);
    const proxyList = getCacheAssistantConfig().proxy || [];
    const proxy = proxyList.find((_proxy: any) => newReqUrl.pathname.startsWith(_proxy.path));
    if (proxy) {
      try {
        const relativePath = path.join(appDir, newReqUrl.pathname);
        const indexHtml = path.join(appDir, user, key, 'index.html');
        console.log('relativePath', relativePath);
        if (checkFileExists(relativePath, true)) {
          const res = await net.fetch(url.pathToFileURL(relativePath).toString());
          return res;
        } else {
          const res = await net.fetch(url.pathToFileURL(indexHtml).toString());
          return res;
        }
      } catch (error) {
        console.error(error);
      }
      return new Response('App is Running Error, please reinstall it or refresh the page');
    }
    return new Response(`App Not Install, please install it first,user/app: [${user}/${key}]`);
  });
  return _session;
};
