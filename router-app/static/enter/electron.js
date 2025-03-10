export const checkIsElectron = () => {
  return typeof window !== 'undefined' && typeof window.electron === 'object';
};
export const getElectron = () => {
  return window.electron;
};
export const saveAppConfig = async (config) => {
  const check = checkIsElectron();
  if (!check) {
    console.log('not electron');
    return [];
  }
  const electron = getElectron();
  const saveResult = await electron.ipcRenderer.invoke('save-app-config', config);
  return saveResult;
};
export const relunch = async () => {
  const check = checkIsElectron();
  if (!check) {
    console.log('not electron');
    return [];
  }
};