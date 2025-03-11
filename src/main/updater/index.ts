import { autoUpdater } from 'electron-updater';

autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://kevisual.silkyai.cn/root/silky-assistant/',
});

export const checkForUpdates = () => {
  autoUpdater.checkForUpdatesAndNotify();
};
