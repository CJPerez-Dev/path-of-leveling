const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let mainWindow;

// Create a function to initialize the Electron Window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: isDev
        ? path.join(app.getAppPath(), './src/preload/preload.js')
        : path.join(app.getAppPath(), './out/preload/preload.js'),
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => mainWindow = null);
}

// Create and manage the initial data structure (if not already present)
if (!store.has('Acts')) {
  const initialActs = Array.from({ length: 10 }, (_, i) => ({
    name: `Act ${i + 1}`,
    unfinishedSteps: ['Ex1', 'Ex2', 'Ex3'],
    finishedSteps: [],
  }));
  store.set('Acts', initialActs);
}

app.on('ready', createWindow); // Call createWindow when Electron is ready

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Handle getting the 'Acts' data
ipcMain.handle('getActs', () => {
    const acts = store.get('Acts');
    return acts;
  });
  
// Handle moving a step from unfinishedSteps to finishedSteps
ipcMain.handle('moveToFinished', (event, actIndex, exercise) => {
const acts = store.get('Acts');
if (actIndex >= 0 && actIndex < acts.length) {
    const act = acts[actIndex];
    const unfinishedIndex = act.unfinishedSteps.indexOf(exercise);
    if (unfinishedIndex !== -1) {
    act.unfinishedSteps.splice(unfinishedIndex, 1);
    act.finishedSteps.push(exercise);
    store.set('Acts', acts);
    return true; // Success
    }
}
return false; // Step not found
});
  
// Handle moving a step from finishedSteps to unfinishedSteps
ipcMain.handle('moveToUnfinished', (event, actIndex, exercise) => {
const acts = store.get('Acts');
if (actIndex >= 0 && actIndex < acts.length) {
    const act = acts[actIndex];
    const finishedIndex = act.finishedSteps.indexOf(exercise);
    if (finishedIndex !== -1) {
    act.finishedSteps.splice(finishedIndex, 1);
    act.unfinishedSteps.push(exercise);
    store.set('Acts', acts);
    return true; // Success
    }
}
return false; // Step not found
});