import fs from 'fs';
import path from 'path';

const pemDir = path.join(process.cwd(), 'router-app', 'pem');

export const httpsConfig = {
  key: fs.readFileSync(path.join(pemDir, 'https-key.pem')),
  cert: fs.readFileSync(path.join(pemDir, 'https-cert.pem')),
};
