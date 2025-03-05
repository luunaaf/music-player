const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    closeApp: () => ipcRenderer.send('close'),
    minimizeApp: () => ipcRenderer.send('minimize')
});


console.log("Preload detected");