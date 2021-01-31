const {BrowserWindow, app, Menu, Tray} = require("electron")

const menu = Menu.buildFromTemplate([
  {
    label: "Shortcuts",
    submenu: [
      {
        role: "toggleDevTools",
      },
      {
        role: "reload",
      },
      {
        role: "forceReload",
      }
    ]
  }
])

app.whenReady().then(() => {
  const win = new BrowserWindow({center: true})
  win.on("closed", () => {
    win.destroy()
  })
  win.setMenuBarVisibility(false)
  win.loadURL("https://gitpod.io")
  win.webContents.on("new-window", function(event, url) {
    event.preventDefault()
    const newWin = new BrowserWindow()
    newWin.setMenuBarVisibility(false)
    newWin.on("closed", () => {
      newWin.destroy()
    })
    newWin.loadURL(url)
  })
  //tray
  const tray = new Tray("./build/gitpod." + process.platform === "win32" ? "ico" : "png")
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

Menu.setApplicationMenu(menu)