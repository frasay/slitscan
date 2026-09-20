const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { SlitScanProcessor } = require('../src/slitScanProcessor');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
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

// Handle video processing
ipcMain.handle('process-video', async (event, {
  videoPath,
  slitWidth,
  slitPosition,
  direction,
  outputPath,
}) => {
  try {
    const processor = new SlitScanProcessor({
      videoPath,
      slitWidth,
      slitPosition,
      direction,
    });

    processor.on('progress', (progress) => {
      mainWindow.webContents.send('process-progress', progress);
    });

    const result = await processor.process(outputPath);
    return { success: true, file: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Handle file dialog
ipcMain.handle('select-output-path', async () => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: 'slit-scan-output.mp4',
    filters: [
      { name: 'MP4 Video', extensions: ['mp4'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  return result;
});

ipcMain.handle('select-video-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      {
        name: 'Video Files',
        extensions: ['mp4', 'mov', 'avi', 'mkv', 'webm'],
      },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  return result.filePaths[0] || null;
});
