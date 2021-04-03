import { BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

export default class Main {
    static mainWindow: Electron.BrowserWindow | null;
    static application: Electron.App;
    static BrowserWindow: typeof BrowserWindow;
    private static onWindowAllClosed() {
        // Quit when all windows are closed - (Not macOS - Darwin)
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object.
        Main.mainWindow = null;
    }

    private static onActivate() {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            Main.onReady();
        }
    }
    private static onReady() {
        Main.mainWindow = new Main.BrowserWindow({
            width: 900,
            height: 680,
            webPreferences: {
                preload: path.join(__dirname, './preload'),
                nodeIntegration: true,
                contextIsolation: false,
            },
        });

        Main.mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`);

        Main.mainWindow.on('closed', Main.onClose);

        // Open DevTools In Development
        if (isDev) {
            Main.mainWindow.webContents.openDevTools();
        }
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the
        // Electron.BrowserWindow into this function
        // so this class has no dependencies. This
        // makes the code easier to write tests for
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
        Main.application.on('activate', Main.onActivate);
    }
}
