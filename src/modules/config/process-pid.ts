import { configDir } from './index.ts';
import path from 'path';
import fs from 'fs';
import { checkFileExists } from '../file/index.ts';

export const processPidPath = path.join(configDir, 'process.pid');

export const getProcessPid = () => {
  if (checkFileExists(processPidPath)) {
    return fs.readFileSync(processPidPath, 'utf-8');
  }
  return null;
};

export const setProcessPid = (pid: string | number) => {
  fs.writeFileSync(processPidPath, pid + '', 'utf-8');
};

export const removeProcessPid = () => {
  const pid = getProcessPid();
  if (pid) {
    try {
      process.kill(parseInt(pid));
      fs.unlinkSync(processPidPath);
    } catch (error) {
    }
  }
};
