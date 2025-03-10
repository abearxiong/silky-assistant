import fs from 'fs';

export const checkFileExists = (filePath: string, checkIsFile = false) => {
  try {
    fs.accessSync(filePath);
    if (checkIsFile) {
      return fs.statSync(filePath).isFile();
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const createDir = (dirPath: string) => {
  if (!checkFileExists(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  return dirPath;
};
