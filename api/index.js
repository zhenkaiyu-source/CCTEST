// Vercel Serverless Function

const db = {
  users: [
    { id: 1, phone: '13800138000', password: '123456', name: '张三', role: 'user' },
    { id: 2, phone: '13800138000', password: '123456', name: '李艺术家', role: 'creator' },
    { id: 3, phone: 'admin', password: 'admin123', name: '管理员', role: 'admin' }
  ],
  works: [
    { id: 1, title: '青花瓷茶具套装', price: 1280, category: '茶具', image: 'https://picsum.photos/seed/1/400/300', creatorName: '李艺术家', sales: 23 },
    { id: 2, title: '粉彩花瓶', price: 2680, category: '花瓶', image: 'https://picsum.photos/seed/2/400/300', creatorName: '李艺术家', sales: 15 },
    { id: 3, title: '紫砂壶', price: 3880, category: '茶具', image: 'https://picsum.photos/seed/3/400/300', creatorName: '李艺术家', sales: 42 },
    { id: 4, title: '青瓷碗具', price: 680, category: '餐具', image: 'https://picsum.photos/seed/4/400/300', creatorName: '李艺术家', sales: 56 },
    { id: 5, title: '彩釉盘', price: 480, category: '餐具', image: 'https://picsum.photos/seed/5/400/300', creatorName: '李艺术家', sales: 89 },
    { id: 6, title: '陶艺摆件', price: 1580, category: '摆件', image: 'https://picsum.photos/seed/6/400/300', creatorName: '李艺术家', sales: 34 }
  ]
}

function sendJson(res, data, status = 200) {
  res.status(status).setHeader('Content-Type', 'application/json').send(JSON.stringify(data))
}

function parseQuery(url) {
  const [, path, query] = url.match(/^\/api([^?]*)\??(.*)/) || []
  const params = {}
  if (query) {
    query.split('&').forEach(([k, v]) => {
      const [key, val] = k.split('=')
      params[key] = val
    })
  }
  return { path: path || '/', params }
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const { path, params } = parseQuery(req.url || '')
  const method = req.method

  // 登录
  if (path === '/login' && method === 'POST') {
    const { phone, password } = req.body || {}
    const user = db.users.find(u => u.phone === phone && u.password === password)
    if (user) {
      const token = Buffer.from(JSON.stringify({ id: user.id, phone: user.phone, role: user.role })).toString('base64')
      return sendJson(res, { code: 0, data: { token, user: { id: user.id, name: user.name, phone: user.phone, role: user.role } } })
    }
    return sendJson(res, { code: 401, message: '账号或密码错误' }, 401)
  }

  // 作品列表
  if (path === '/works/list' && method === 'GET') {
    return sendJson(res, { code: 0, data: db.works })
  }

  // 作品详情
  const workMatch = path.match(/^\/works\/(\d+)$/)
  if (workMatch && method === 'GET') {
    const id = parseInt(workMatch[1])
    const work = db.works.find(w => w.id === id)
    if (work) return sendJson(res, { code: 0, data: work })
    return sendJson(res, { code: 404, message: '作品不存在' }, 404)
  }

  // 统计
  if (path === '/stats' && method === 'GET') {
    const stats = {
      totalWorks: db.works.length,
      totalUsers: db.users.length,
      totalSales: db.works.reduce((sum, w) => sum + w.sales, 0)
    }
    return sendJson(res, { code: 0, data: stats })
  }

  // 分类
  if (path === '/categories' && method === 'GET') {
    const categories = [...new Set(db.works.map(w => w.category))]
    return sendJson(res, { code: 0, data: categories })
  }

  sendJson(res, { error: 'Not Found' }, 404)
}
