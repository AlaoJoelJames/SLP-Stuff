const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    title: "MSWDO Malitbog Monitoring System",
    icon: path.join(__dirname, './assets/malitbog_logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
      
    }
  });

  mainWindow.loadFile('login.html');
  mainWindow.webContents.on('did-finish-load', () => {
    if (mainWindow.webContents.getURL().endsWith('list.html')) {
      mainWindow.maximize();
    }
  });
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('get-directory', (event) => {
  // Replace this with the actual directory path
  return './excel';
});