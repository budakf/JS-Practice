const {app, BrowserWindow} = require('electron')
const fs = require('fs')



function createWindow () {
    console.log(fs.readdirSync('/Users/budakf/Desktop'))
    let window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    window.loadURL('https://github.com/electron/electron-quick-start')
}

app.whenReady().then( createWindow )

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
})
