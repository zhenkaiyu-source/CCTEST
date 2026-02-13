// Vercel Serverless Function
// 使用 /api/* 路径自动映射

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

function generateToken(user) {
  return Buffer.from(JSON.stringify({ id: user.id, phone: user.phone, role: user.role })).toString('base64')
}

module.exports = (req, res) => {
  const { url } = req

  // CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // 路由分发
  try {
    if (url === '/api/login' && req.method === 'POST') {
      const { phone, password } = req.body
      const user = db.users.find(u => u.phone === phone && u.password === password)
      if (user) {
        return res.json({ code: 0, data: { token: generateToken(user), user: { id: user.id, name: user.name, phone: user.phone, role: user.role, avatar: user.avatar } } })
      }
      return res.status(401).json({ code: 401, message: '账号或密码错误' })
    }

    if (url === '/api/users/list' && req.method === 'GET') {
      return res.json({ code: 0, data: db.users.map(u => ({ id: u.id, name: u.name, phone: u.phone, role: u.role })) })
    }

    if (url === '/api/works/list' && req.method === 'GET') {
      return res.json({ code: 0, data: db.works.filter(w => w.status === 'active') })
    }

    if (url.match(/^\/api\/works\/\d+$/) && req.method === 'GET') {
      const id = parseInt(url.split('/')[3])
      const work = db.works.find(w => w.id === id)
      if (work) return res.json({ code: 0, data: work })
      return res.status(404).json({ code: 404, message: '作品不存在' })
    }

    if (url === '/api/categories' && req.method === 'GET') {
      const categories = [...new Set(db.works.map(w => w.category))]
      return res.json({ code: 0, data: categories })
    }

    if (url === '/api/stats' && req.method === 'GET') {
      return res.json({ code: 0, data: { totalWorks: db.works.length, totalUsers: db.users.length, totalOrders: db.orders.length, totalSales: db.works.reduce((sum, w) => sum + w.sales, 0) } })
    }

    return res.status(404).json({ error: 'Not Found' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
