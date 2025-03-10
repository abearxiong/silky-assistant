import path from 'path';
import { homedir } from 'os';
import fs from 'fs';
import { checkFileExists, createDir } from '../file/index.ts';

export const kevisualUrl = 'https://kevisual.xiongxiao.me';
export const configDir = createDir(path.join(homedir(), '.config/envision'));
export const configPath = path.join(configDir, 'assistant-config.json');
export const appConfigPath = path.join(configDir, 'assistant-app-config.json');
export const appDir = createDir(path.join(configDir, 'assistant-app/frontend'));

type AssistantConfig = {
  pageApi?: string; // https://kevisual.silkyai.cn
  loadURL?: string; // https://assistant.app/user/tiptap/
  proxy?: { user: string; key: string; path: string }[];
};
let assistantConfig: AssistantConfig;
export const getConfig = () => {
  try {
    if (!checkFileExists(configPath)) {
      fs.writeFileSync(configPath, JSON.stringify({ proxy: [] }, null, 2));
      return {
        loadURL: '',
        pageApi: '',
        proxy: [],
      };
    }
    assistantConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return assistantConfig;
  } catch (error) {
    console.error(error);
    return {
      loadURL: '',
      pageApi: '',
      proxy: [],
    };
  }
};
export const getCacheAssistantConfig = () => {
  if (assistantConfig) {
    return assistantConfig;
  }
  return getConfig();
};

export const setConfig = (config?: AssistantConfig) => {
  if (!config) {
    return assistantConfig;
  }
  assistantConfig = config;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  return assistantConfig;
};
type AppConfig = {
  list: any[];
};
/**
 * 应用配置
 * @returns
 */
export const getAppConfig = (): AppConfig => {
  if (!checkFileExists(appConfigPath)) {
    return {
      list: [],
    };
  }
  return JSON.parse(fs.readFileSync(appConfigPath, 'utf8'));
};

export const setAppConfig = (config: AppConfig) => {
  fs.writeFileSync(appConfigPath, JSON.stringify(config, null, 2));
  return config;
};

export const addAppConfig = (app: any) => {
  const config = getAppConfig();
  const assistantConfig = getCacheAssistantConfig();
  const _apps = config.list;
  const _proxy = assistantConfig.proxy || [];
  const { user, key } = app;
  const newProxyInfo = {
    user,
    key,
    path: `/${user}/${key}`,
  };
  const _proxyIndex = _proxy.findIndex((_proxy: any) => _proxy.path === newProxyInfo.path);
  if (_proxyIndex !== -1) {
    _proxy[_proxyIndex] = newProxyInfo;
  } else {
    _proxy.push(newProxyInfo);
  }

  const _app = _apps.findIndex((_app: any) => _app.id === app.id);
  if (_app !== -1) {
    _apps[_app] = app;
  } else {
    _apps.push(app);
  }
  setAppConfig({ ...config, list: _apps });
  setConfig({ ...assistantConfig, proxy: _proxy });
  return config;
};

export const getAppList = () => {
  const config = getAppConfig();
  return config.list || [];
};
