declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

import { app, BrowserWindow } from 'electron';
import path from "path"

const preload = path.resolve(__dirname, "../main/preload.js")

if (require('electron-squirrel-startup')) {
    app.quit();
}

const createWindow = (): void => {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload
        }
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
