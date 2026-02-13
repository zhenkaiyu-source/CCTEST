// Vercel Serverless API Handler
// 适配 Vercel 无服务器部署

const express = require('express')
const cors = require('cors')
const app = express()

// 中间件
app.use(cors())
app.use(express.json())

// ============== 内存数据库 ==============
const db = {
  users: [
    { id: 1, phone: '13800138000', password: '123456', name: '张三', role: 'user', avatar: '张', createdAt: new Date().toISOString() },
    { id: 2, phone: '13800138000', password: '123456', name: '李艺术家', role: 'creator', avatar: '李', createdAt: new Date().toISOString() },
    { id: 3, phone: 'admin', password: 'admin123', name: '管理员', role: 'admin', avatar: '管', createdAt: new Date().toISOString() }
  ],
  works: [
    { id: 1, title: '青花瓷茶具套装', price: 1280, category: '茶具', image: 'https://picsum.photos/seed/1/400/300', creatorId: 2, creatorName: '李艺术家', stock: 5, sales: 23, description: '手工青花瓷茶具套装', status: 'active', createdAt: new Date().toISOString() },
    { id: 2, title: '粉彩花瓶', price: 2680, category: '花瓶', image: 'https://picsum.photos/seed/2/400/300', creatorId: 2, creatorName: '李艺术家', stock: 3, sales: 15, description: '精美粉彩花瓶', status: 'active', createdAt: new Date().toISOString() },
    { id: 3, title: '紫砂壶', price: 3880, category: '茶具', image: 'https://picsum.photos/seed/3/400/300', creatorId: 2, creatorName: '李艺术家', stock: 2, sales: 42, description: '宜兴紫砂壶', status: 'active', createdAt: new Date().toISOString() },
    { id: 4, title: '青瓷碗具', price: 680, category: '餐具', image: 'https://picsum.photos/seed/4/400/300', creatorId: 2, creatorName: '李艺术家', stock: 10, sales: 56, description: '龙泉青瓷碗具套装', status: 'active', createdAt: new Date().toISOString() },
    { id: 5, title: '彩釉盘', price: 480, category: '餐具', image: 'https://picsum.photos/seed/5/400/300', creatorId: 2, creatorName: '李艺术家', stock: 20, sales: 89, description: '手工彩釉装饰盘', status: 'active', createdAt: new Date().toISOString() },
    { id: 6, title: '陶艺摆件', price: 1580, category: '摆件', image: 'https://picsum.photos/seed/6/400/300', creatorId: 2, creatorName: '李艺术家', stock: 5, sales: 34, description: '现代陶艺装饰摆件', status: 'active', createdAt: new Date().toISOString() }
  ],
  orders: [],
  cart: [],
  favorites: []
}

// Token 生成（简化版）
function generateToken(user) {
  return Buffer.from(JSON.stringify({ id: user.id, phone: user.phone, role: user.role })).toString('base64')
}

// ============== API 路由 ==============

// 登录
app.post('/api/login', (req, res) => {
  const { phone, password } = req.body
  const user = db.users.find(u => u.phone === phone && u.password === password)

  if (user) {
    res.json({
      code: 0,
      data: {
        token: generateToken(user),
        user: { id: user.id, name: user.name, phone: user.phone, role: user.role, avatar: user.avatar }
      }
    })
  } else {
    res.json({ code: 401, message: '账号或密码错误' })
  }
})

// 用户列表
app.get('/api/users/list', (req, res) => {
  res.json({
    code: 0,
    data: db.users.map(u => ({ id: u.id, name: u.name, phone: u.phone, role: u.role }))
  })
})

// 作品列表
app.get('/api/works/list', (req, res) => {
  res.json({
    code: 0,
    data: db.works.filter(w => w.status === 'active')
  })
})

// 作品详情
app.get('/api/works/:id', (req, res) => {
  const work = db.works.find(w => w.id === parseInt(req.params.id))
  if (work) {
    res.json({ code: 0, data: work })
  } else {
    res.json({ code: 404, message: '作品不存在' })
  }
})

// 分类列表
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(db.works.map(w => w.category))]
  res.json({ code: 0, data: categories })
})

// 购物车
app.get('/api/cart/:userId', (req, res) => {
  const items = db.cart.filter(c => c.userId === parseInt(req.params.userId))
  res.json({ code: 0, data: items })
})

app.post('/api/cart/add', (req, res) => {
  const { userId, workId, quantity } = req.body
  db.cart.push({ id: Date.now(), userId, workId, quantity, createdAt: new Date().toISOString() })
  res.json({ code: 0, message: '添加成功' })
})

// 收藏
app.get('/api/favorites/:userId', (req, res) => {
  const items = db.favorites.filter(f => f.userId === parseInt(req.params.userId))
  res.json({ code: 0, data: items })
})

app.post('/api/favorites/add', (req, res) => {
  const { userId, workId } = req.body
  db.favorites.push({ id: Date.now(), userId, workId, createdAt: new Date().toISOString() })
  res.json({ code: 0, message: '收藏成功' })
})

// 订单
app.get('/api/orders/:userId', (req, res) => {
  const items = db.orders.filter(o => o.userId === parseInt(req.params.userId))
  res.json({ code: 0, data: items })
})

app.post('/api/orders/create', (req, res) => {
  const { userId, items, total } = req.body
  const order = {
    id: Date.now(),
    orderNo: `DD${Date.now()}`,
    userId,
    items,
    total,
    status: 'paid',
    createdAt: new Date().toISOString()
  }
  db.orders.push(order)
  res.json({ code: 0, data: order, message: '订单创建成功' })
})

// 艺术家作品
app.get('/api/creator/works/:creatorId', (req, res) => {
  const items = db.works.filter(w => w.creatorId === parseInt(req.params.creatorId))
  res.json({ code: 0, data: items })
})

// 统计数据
app.get('/api/stats', (req, res) => {
  res.json({
    code: 0,
    data: {
      totalWorks: db.works.length,
      totalUsers: db.users.length,
      totalOrders: db.orders.length,
      totalSales: db.works.reduce((sum, w) => sum + w.sales, 0)
    }
  })
})

module.exports = app
