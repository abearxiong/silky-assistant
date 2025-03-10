import log from 'electron-log';
// $Home/Library/Logs/ads-desktop-electron/main.log
log.initialize({ preload: true });
export { log };

export const getLogPath = () => log.transports.file.getFile().path;
