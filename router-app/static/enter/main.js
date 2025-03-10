import { saveAppConfig } from './electron.js';

window.onload = async () => {
  const config = await saveAppConfig();
  const pageApi = document.getElementById('pageApi');
  const saveResult = document.getElementById('save-result');
  pageApi.value = config?.pageApi || 'https://kevisual.silkyai.cn';
  console.log('config', config);
  const form = document.getElementById('configForm');

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const config = {
      pageApi: pageApi.value,
    };
    const result = await saveAppConfig(config);

    const newPageApi = result?.pageApi || '';
    saveResult.innerHTML = `<h1>保存成功</h1>
    <p>new pageApi: ${newPageApi}</p>
    <button id="relunch">重启</button>`;
    const relunchButton = document.getElementById('relunch');
    relunchButton.addEventListener('click', () => {
      window.electron.ipcRenderer.invoke('relunch');
    });
  });
};
