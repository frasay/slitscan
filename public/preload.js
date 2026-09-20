const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  processVideo: (params) => ipcRenderer.invoke('process-video', params),
  selectOutputPath: () => ipcRenderer.invoke('select-output-path'),
  selectVideoFile: () => ipcRenderer.invoke('select-video-file'),
  onProgress: (callback) => ipcRenderer.on('process-progress', (event, data) => callback(data)),
});
