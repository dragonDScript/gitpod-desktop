const {BrowserWindow, app, Menu, Tray} = require("electron")

app.whenReady().then(() => {
  const win = new BrowserWindow({center: true})
  win.loadURL("https://gitpod.io")
  win.webContents.on("new-window", function(event, url) {
    event.preventDefault()
    const newWin = new BrowserWindow()
    newWin.on("closed", () => {
      newWin.destroy()
    })
    newWin.loadURL(url)
  })
  //tray
  const tray = new Tray("gitpod." + process.platform === "win32" ? "ico" : "png")
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit', click: () => app.quit()},
  ])
  tray.setContextMenu(contextMenu)
})

app.on("window-all-closed", () => {
  if(process.platform != "darwin") {
    app.quit()
  }
})

Menu.setApplicationMenu(null)