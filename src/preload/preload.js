const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getActs: () => ipcRenderer.invoke('getActs'),

  moveExerciseToFinished: (actIndex, exercise) => ipcRenderer.invoke('moveToFinished', actIndex, exercise),

  moveExerciseToUnfinished: (actIndex, exercise) => ipcRenderer.invoke('moveToUnfinished', actIndex, exercise),
});