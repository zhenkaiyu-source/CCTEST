#!/usr/bin/env node

/**
 * 瓷韵后台服务启动脚本
 * 自动启动 Node.js 后端服务
 */

const { spawn, kill } = require('child_process')
const path = require('path')

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

// 处理进程退出
process.on('exit', stopBackend)
process.on('SIGINT', () => {
  stopBackend()
  process.exit(0)
})
process.on('SIGTERM', () => {
  stopBackend()
  process.exit(0)
})

// 启动后台
startBackend()

module.exports = { startBackend, stopBackend }
