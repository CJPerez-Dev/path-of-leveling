const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getActs: () => ipcRenderer.invoke('getActs'),

  moveStepToFinished: (actIndex, step) => ipcRenderer.invoke('moveToFinished', actIndex, step),

  moveStepToUnfinished: (actIndex, step) => ipcRenderer.invoke('moveToUnfinished', actIndex, step),
});