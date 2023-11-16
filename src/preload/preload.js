// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getActs: () => ipcRenderer.invoke('getActs'),

  toggleStepFinishState: (actIndex, stepIndex, finished) =>
    ipcRenderer.invoke('toggleStepFinishState', actIndex, stepIndex, finished),
});
