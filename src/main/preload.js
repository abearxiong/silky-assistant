const { contextBridge, ipcRenderer } = require('electron');

const windowChannels = ['relunch'];
const validChannels = ['get-app-list', 'install-app', 'uninstall-app', 'save-app-config', ...windowChannels];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on(channel, func) {
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, func);
      }
    },
    invoke(channel, ...args) {
      if (validChannels.includes(channel)) {
        return ipcRenderer.invoke(channel, ...args);
      }
    },
  },
});
