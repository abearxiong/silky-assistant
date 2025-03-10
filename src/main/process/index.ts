// import { AssistantProcess } from '@kevisual/assistant-module/assistant-process';

import path from 'path';
import { fork } from 'child_process';
import { log } from '../app.ts';
import { isMac, isDev, getElectronResourcePath } from '../system/env.ts';
import { setProcessPid, getProcessPid, removeProcessPid } from '../../modules/config/process-pid.ts';

export const getAssistantCenterPath = () => {
  const resourcePath = getElectronResourcePath();
  if (isDev) {
    return path.join(resourcePath, '../dist');
  }
  if (isMac()) {
    return path.join(resourcePath, 'dist');
  }
  return path.join(resourcePath, 'dist');
};
// export const assistantCenterPath = path.join(__dirname, '../dist');
export const assistantCenterPath = getAssistantCenterPath();
export const assistantProcessPath = path.join(assistantCenterPath, 'dist/app.mjs');
// export const assistantProcess = new AssistantProcess(assistantPath);
export const processConfig = {
  assistantCenterPath,
  assistantProcessPath,
  port: 51015,
  process: null,
};
export const getOrigin = () => {
  return `https://localhost:${processConfig.port}`;
};
export const createProcess = async () => {
  log.info('createProcess', assistantProcessPath, 'cwd', assistantCenterPath);
  const pid = getProcessPid();
  if (pid) {
    removeProcessPid();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return new Promise((resolve, reject) => {
    // const signal = new AbortSignal();
    try {
      const assistantProcess = fork(assistantProcessPath, {
        cwd: assistantCenterPath,
        // signal,
        stdio: 'inherit',
        env: {
          ...process.env,
          // KEVISUAL_URL: 'https://kevisual.xiongxiao.me',
          KEVISUAL_URL: 'https://kevisual.silkyai.cn',
          NODE_ENV_PARENT: 'fork',
        },
      });
      assistantProcess.on('message', (message) => {
        log.log('assistantProcess message', typeof message, message);
        // if (message.toString().includes(checkString)) {
        // resolve(assistantProcess);
        // }
        if (typeof message === 'object') {
          const msg = message as { type: string; data?: { port?: number } };
          if (msg.type === 'fork') {
            resolve({ process: assistantProcess, port: msg.data?.port || processConfig.port });
          }
        }
      });
      assistantProcess.on('error', (error) => {
        log.error(error);
      });
      processConfig.process = assistantProcess;
      setProcessPid(assistantProcess.pid);
      return assistantProcess;
    } catch (error) {
      log.error(error);
      reject(error);
    }
  });
};

export const closeProcess = () => {
  log.info('closeProcess');
  removeProcessPid();
};
