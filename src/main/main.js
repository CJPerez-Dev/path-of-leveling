// main.js
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
      devTools: false,
    },
  });

  mainWindow.setMenuBarVisibility(false);
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => (mainWindow = null));
}

if (!store.has('Acts')) {
  const initialActs = Array.from({ length: 10 }, (_, i) => ({
    actNumber: i + 1,
    steps: Array.from({ length: 10 }, (_, j) => ({
      name: `Step ${j + 1}`,
      finished: false,
    })),
  }));
  store.set('Acts', initialActs);
}

app.on('ready', createWindow);

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
  console.log('Retrieved Acts:', acts);
  return acts;
});

// Handle toggling the finished state of a step
ipcMain.handle('toggleStepFinishState', (event, actIndex, stepIndex, finished) => {
  const acts = store.get('Acts');
  if (actIndex >= 0 && actIndex < acts.length) {
    const act = acts[actIndex];
    if (stepIndex >= 0 && stepIndex < act.steps.length) {
      const step = act.steps[stepIndex];
      step.finished = finished;
      store.set('Acts', acts);
      return true;
    }
  }
  return false;
});
