import path from 'path';
import fs from 'fs';

const root = process.cwd();
const buildPath = path.join(root, 'build');

export const main = () => {
  //列出buildPath目录下的所有文件夹，并删除
  const files = fs.readdirSync(buildPath);
  files.forEach((file) => {
    const filePath = path.join(buildPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    }
  });

  // 获取目录下的所有文件，生成一个文件列表，生成一个index.html，包函下载列表，相对路径
  const _files = fs.readdirSync(buildPath);
  let html = `
  <html>
  <body>
  <ul>
  `;
  _files.forEach((file) => {
    html += `<li><a href="./${file}">${file}</a></li>`;
  });
  html += `
  </ul>
  </body>
  </html>
  `;
  fs.writeFileSync(path.join(buildPath, 'index.html'), html);
};

main()