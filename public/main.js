'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const os = require('os');
const isDev = require('electron-is-dev');

const {
    DISPLAY_SOLUTION,
    SOLUTION_TEXT
} = require('../src/constants');

let win;

if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true');
    app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });


    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, 'dist/index.html')}`);

    win.once('ready-to-show', () => {
        win.show();
        if(isDev) {
            win.webContents.openDevTools();
            BrowserWindow.addDevToolsExtension(
                path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.4.0_0')
            );

        }
    });

    // Emitted when the window is closed.
    win.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}



ipcMain.on(DISPLAY_SOLUTION, () => {
    console.log('we have to display the solution');
});

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
});
