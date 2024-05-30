const { app, BrowserWindow } = require('electron/main');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 300,
        minHeight: 450,
    });
    win.loadFile('index.html');
    win.setMenu(null);
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
