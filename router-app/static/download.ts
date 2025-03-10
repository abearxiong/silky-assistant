import fs from 'fs';

const apps = [
  { user: 'root', key: 'enter', version: '1.0.0' }, //
  { user: 'root', key: 'packages', version: '1.0.0' },
];

const baseURL = 'https://kevisual.silkyai.cn';

const downloadApps = () => {
  //
};

export const downloadLink = async (url: string, path: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  fs.writeFileSync(path, Buffer.from(await blob.arrayBuffer()));
};
