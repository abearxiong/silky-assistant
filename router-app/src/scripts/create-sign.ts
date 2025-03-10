import { createCert } from '@kevisual/router/sign';
import { writeFileSync } from 'fs';
import path from 'path';
const pemDir = path.join(process.cwd(), 'router-app', 'pem');

const { key, cert } = createCert([
  {
    name: 'commonName',
    value: 'localhost',
  },
  {
    name: 'organizationName',
    value: 'kevisual',
  },
]);

writeFileSync(path.join(pemDir, 'https-key.pem'), key);
writeFileSync(path.join(pemDir, 'https-cert.pem'), cert);
