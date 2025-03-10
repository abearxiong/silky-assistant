import { App } from '@kevisual/router';
import { httpsConfig } from './modules/config';
export const app = new App({
  serverOptions: {
    httpType: 'https',
    httpsCert: httpsConfig.cert.toString(),
    httpsKey: httpsConfig.key.toString(),
  },
});
app
  .route({
    path: 'demo',
  })
  .define(async (ctx) => {
    ctx.body = 'hello world';
  })
  .addTo(app);
console.log('httpsConfig', `https://localhost:51015/api/router?path=demo`);
app.listen(51015, () => {
  console.log('Router App is running on https://localhost:51015');
});
