export const checkIsElectron = () => {
  return typeof window !== 'undefined' && typeof window.electron === 'object';
};
export const getElectron = () => {
  return window.electron;
};
export const getAppList = async () => {
  const check = checkIsElectron();
  if (!check) {
    console.log('not electron');
    return [];
  }
  const electron = getElectron();
  console.log('electron', electron);
  const appList = await electron.ipcRenderer.invoke('get-app-list');

  console.log('appList', appList);
  return appList;
};

export const installApp = async (app) => {
  const check = checkIsElectron();
  if (!check) {
    console.log('not electron');
    return [];
  }
  const electron = getElectron();
  console.log('installApp', app);
  const result = await electron.ipcRenderer.invoke('install-app', app);
  console.log('installApp result', result);
  return result;
};

export const uninstallApp = async (app) => {
  const check = checkIsElectron();
  if (!check) {
    console.log('not electron');
    return [];
  }
  const electron = getElectron();
  console.log('uninstallApp', app);
  const result = await electron.ipcRenderer.invoke('uninstall-app', app);
  console.log('uninstallApp result', result);
  return result;
};
