import { app } from 'electron';

export const relunch = () => {
  app.relaunch({});
  app.quit();
};
