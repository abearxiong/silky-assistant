import { app } from 'electron';

export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

export const isMac = () => {
  return process.platform === 'darwin';
};

export const isWin = () => {
  return process.platform === 'win32';
};

export const isLinux = () => {
  return process.platform === 'linux';
};

export const getElectronResourcePath = () => {
  return app.getAppPath();
};
