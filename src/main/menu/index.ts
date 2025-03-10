import { createEnterPage } from '../window/page/enter';
import { BrowserWindow, Menu, app } from 'electron';

import path from 'path';
import { getLogPath, log } from '../logger';
import { createAppPackagesPage } from '../window/page/app-packages';
import { relunch } from '../window/relunch';
export const loadMenu = () => {
  const template = [
    {
      label: app.name,
      submenu: [
        {
          label: '关于',
          role: 'about',
        },
        {
          label: '退出',
          click: () => {
            if (process.platform !== 'darwin') {
              app.quit();
            } else {
              app.exit();
            }
          },
        },
        // {
        //   label: '检查更新',
        //   click: () => {
        //     autoUpdater.checkForUpdatesAndNotify();
        //   },
        // },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { label: '复制', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      ],
    },
    {
      label: '查看',
      role: 'view',
      submenu: [
        {
          label: '刷新',
          role: 'reload',
        },
        {
          label: '强制刷新',
          role: 'forcereload',
        },
        {
          label: '重启',
          click: () => {
            relunch();
          },
        },
        {
          label: '打开开发者工具',
          click: () => {
            const mainWindow = BrowserWindow.getFocusedWindow();
            if (mainWindow) {
              openDevTools(mainWindow);
            }
          },
        },
      ],
    },
    {
      label: '帮助',
      role: 'help',
      submenu: [
        {
          label: '文档',
          click: async () => {
            const { shell } = require('electron');
            // shell.openExternal('http://adstudio.nisar.ai/docs/');
          },
        },
        {
          label: '打开日志',
          click: async () => {
            const { shell } = require('electron');
            log.transports.file.fileName;
            shell.openExternal('file://' + path.join(getLogPath()));
          },
        },
        {
          label: '打开配置',
          click: async () => {
            createEnterPage();
          },
        },
        {
          label: '打开应用市场',
          click: async () => {
            createAppPackagesPage();
          },
        },
      ],
    },
  ];
  // @ts-ignore
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

export const openDevTools = (mainWindow: BrowserWindow) => {
  let window = mainWindow.getBrowserView() ? mainWindow.getBrowserView() : mainWindow;
  if (window.webContents.isDevToolsOpened()) {
    window.webContents.closeDevTools();
  } else {
    window.webContents.openDevTools();
  }
};
