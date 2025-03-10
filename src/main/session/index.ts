import { session } from 'electron';

let _session: Electron.Session;

export const createSession = () => {
  if (_session) {
    return _session;
  }
  _session = session.fromPartition('persist:app');
  // Ignore certificate errors (for development only)
  _session.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'silky-assistant';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });
  _session.setCertificateVerifyProc((request, callback) => {
    callback(0); // 0 means trust the certificate
  });
  return _session;
};
