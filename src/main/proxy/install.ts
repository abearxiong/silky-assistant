import path from 'path';
import fs from 'fs';
import { appDir, kevisualUrl, addAppConfig, getAppConfig, setAppConfig, getCacheAssistantConfig, setConfig } from '../../modules/config/index.ts';

export const demoData = {
  id: '471ee96f-d7d8-4da1-b84f-4a34f4732f16',
  title: 'tiptap',
  description: '',
  data: {
    files: [
      {
        name: 'README.md',
        path: 'user/tiptap/0.0.1/README.md',
      },
      {
        name: 'app.css',
        path: 'user/tiptap/0.0.1/app.css',
      },
      {
        name: 'app.js',
        path: 'user/tiptap/0.0.1/app.js',
      },
      {
        name: 'create-BxEwtceK.js',
        path: 'user/tiptap/0.0.1/create-BxEwtceK.js',
      },
      {
        name: 'index.CrTXFMOJ.js',
        path: 'user/tiptap/0.0.1/index.CrTXFMOJ.js',
      },
      {
        name: 'index.html',
        path: 'user/tiptap/0.0.1/index.html',
      },
    ],
  },
  version: '0.0.1',
  domain: '',
  appType: '',
  key: 'tiptap',
  type: '',
  uid: '2bebe6a0-3c64-4a64-89f9-cc47fd082a07',
  pid: null,
  proxy: false,
  user: 'user',
  status: 'running',
  createdAt: '2024-12-14T15:39:30.684Z',
  updatedAt: '2024-12-14T15:39:55.714Z',
  deletedAt: null,
};

type DownloadTask = {
  downloadPath: string;
  downloadUrl: string;
  user: string;
  key: string;
  version: string;
};
export const installApp = async (app: any) => {
  // const _app = demoData;
  const _app = app;
  try {
    let files = _app.data.files || [];
    const version = _app.version;
    const user = _app.user;
    const key = _app.key;

    const downFiles = files.map((file: any) => {
      const noVersionPath = file.path.replace(`/${version}`, '');
      return {
        ...file,
        downloadPath: path.join(appDir, noVersionPath),
        downloadUrl: `${kevisualUrl}/${noVersionPath}`,
      };
    });
    const downloadTasks: DownloadTask[] = downFiles as any;
    for (const file of downloadTasks) {
      const downloadPath = file.downloadPath;
      const downloadUrl = file.downloadUrl;
      const dir = path.dirname(downloadPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const res = await fetch(downloadUrl);
      const blob = await res.blob();
      fs.writeFileSync(downloadPath, Buffer.from(await blob.arrayBuffer()));
    }
    let indexHtml = files.find((file: any) => file.name === 'index.html');
    if (!indexHtml) {
      files.push({
        name: 'index.html',
        path: `${user}/${key}/index.html`,
      });
      fs.writeFileSync(path.join(appDir, `${user}/${key}/index.html`), JSON.stringify(app, null, 2));
    }
    _app.data.files = files;
    addAppConfig(_app);
    return {
      code: 200,
      data: _app,
      message: 'Install app success',
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: 'Install app failed',
    };
  }
};

export const uninstallApp = async (app: any) => {
  try {
    const { user, key } = app;
    const appConfig = getAppConfig();
    const index = appConfig.list.findIndex((item: any) => item.user === user && item.key === key);
    if (index !== -1) {
      appConfig.list.splice(index, 1);
      setAppConfig(appConfig);
      // 删除appDir和文件
      fs.rmSync(path.join(appDir, user, key), { recursive: true });
      // 删除proxy
      const proxyConfig = getCacheAssistantConfig();
      const proxyIndex = proxyConfig.proxy.findIndex((item: any) => item.user === user && item.key === key);
      if (proxyIndex !== -1) {
        proxyConfig.proxy.splice(proxyIndex, 1);
        setConfig(proxyConfig);
      }
    }
    return {
      code: 200,
      message: 'Uninstall app success',
    };
  } catch (error) {
    console.error(error);
    return {
      code: 500,
      message: 'Uninstall app failed',
    };
  }
};
