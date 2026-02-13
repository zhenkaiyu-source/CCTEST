// Preload script for Electron
const { contextBridge, shell } = require('electron')

// 安全地暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 打开外部链接
  openExternal: (url) => shell.openExternal(url),

  // 获取应用版本
  getVersion: () => process.env.npm_package_version || '1.0.0',

  // 平台信息
  platform: process.platform,

  // 消息提示
  showNotification: (title, body) => {
    const { Notification } = require('electron')
    if (Notification.isSupported()) {
      new Notification({ title, body }).show()
    }
  }
})
