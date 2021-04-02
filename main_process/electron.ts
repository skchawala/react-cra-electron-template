import {app,BrowserWindow} from 'electron'
import Main from './main_src/Main';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}


Main.main(app, BrowserWindow);
