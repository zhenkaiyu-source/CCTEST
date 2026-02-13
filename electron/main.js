const { app, BrowserWindow, shell, Menu } = require('electron')
const path = require('path')
const { spawn } = require('child_process')
const isDev = process.env.NODE_ENV === 'development'

let mainWindow = null
let backendProcess = null

function startBackend() {
  const serverPath = path.join(__dirname, '..', 'server', 'index.js')

  console.log('启动后台服务...')

  backendProcess = spawn('node', [serverPath], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
    env: { ...process.env, PORT: 3003 }
  })

  backendProcess.stdout.on('data', (data) => {
    console.log(`[后台] ${data.toString().trim()}`)
  })

  backendProcess.stderr.on('data', (data) => {
    console.error(`[后台错误] ${data.toString().trim()}`)
  })

  backendProcess.on('close', (code) => {
    console.log(`后台服务已退出，退出码: ${code}`)
  })

  backendProcess.on('error', (err) => {
    console.error('启动后台服务失败:', err)
  })
}

function stopBackend() {
  if (backendProcess) {
    console.log('停止后台服务...')
    backendProcess.kill('SIGTERM')
    backendProcess = null
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: '瓷韵 · 陶瓷手作平台',
    icon: path.join(__dirname, 'public/icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    frame: true,
    show: false,
    backgroundColor: '#1a1a2e'
  })

  // 加载应用
  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'dist/index.html')}`

  mainWindow.loadURL(startUrl)

  // 开发环境打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools()
  }

  // 准备好显示窗口
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // 窗口关闭时退出
  mainWindow.on('closed', () => {
    mainWindow = null
    stopBackend()
    app.quit()
  })

  // 拦截外部链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: 'deny' }
  })

  // 创建应用菜单
  createMenu()
}

function createMenu() {
  const template = [
    {
      label: '文件',
      submenu: [
        { label: '刷新', accelerator: 'CmdOrCtrl+R', click: () => mainWindow && mainWindow.reload() },
        { type: 'separator' },
        { role: 'quit', label: '退出' }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo', label: '撤销' },
        { role: 'redo', label: '重做' },
        { type: 'separator' },
        { role: 'cut', label: '剪切' },
        { role: 'copy', label: '复制' },
        { role: 'paste', label: '粘贴' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload', label: '刷新' },
        { role: 'forceReload', label: '强制刷新' },
        { type: 'separator' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '缩小' },
        { role: 'resetZoom', label: '重置缩放' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全屏' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于瓷韵',
          click: () => showAboutDialog()
        },
        {
          label: '使用帮助',
          click: () => shell.openExternal('https://example.com/help')
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about', label: '关于' },
        { type: 'separator' },
        { role: 'services', label: '服务' },
        { type: 'separator' },
        { role: 'hide', label: '隐藏' },
        { role: 'hideOthers', label: '隐藏其他' },
        { role: 'unhide', label: '显示全部' },
        { type: 'separator' },
        { role: 'quit', label: '退出' }
      ]
    })
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function showAboutDialog() {
  const { dialog } = require('electron')
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: '关于瓷韵',
    message: '瓷韵 · 陶瓷手作平台',
    detail: `版本: ${app.getVersion()}\n\n一个连接艺术家与收藏家的陶瓷手作电商平台。\n\n© 2024 瓷韵科技`
  })
}

// 应用准备就绪
app.whenReady().then(() => {
  // 启动后台服务（非开发模式）
  if (!isDev) {
    startBackend()
  }
  createWindow()
})

// 所有窗口关闭时退出
app.on('window-all-closed', () => {
  stopBackend()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 应用激活时重新创建窗口
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 异常处理
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
})
