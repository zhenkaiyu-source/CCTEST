import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3003;
const JWT_SECRET = process.env.JWT_SECRET || 'ceramics-secret-key-2024';

// 中间件
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ============ 内存数据库 ============
const db = {
  users: [],
  works: [],
  orders: [],
  transactions: []
};

// 初始化一些测试数据
const initTestData = async () => {
  const hashedPassword = await bcrypt.hash('123456', 10);
  db.users.push({
    _id: '1',
    phone: '13800138000',
    password: hashedPassword,
    name: '张三丰',
    role: 'creator',
    verified: true,
    createdAt: new Date()
  });
};
initTestData();

// 辅助函数
const generateOrderNo = () => `ORD-${Date.now().toString().slice(-6)}`;

// ============ 中间件 ============

// 验证 JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: '未登录' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: '登录已过期' });
  }
};

// ============ API 接口 ============

// 认证
app.post('/api/auth/register', async (req, res) => {
  try {
    const { phone, password, name } = req.body;
    const existingUser = db.users.find(u => u.phone === phone);
    if (existingUser) {
      return res.status(400).json({ error: '手机号已注册' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      _id: uuidv4(),
      phone,
      password: hashedPassword,
      name: name || phone.slice(-4),
      role: 'creator',
      verified: false,
      createdAt: new Date()
    };
    db.users.push(user);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, phone: user.phone, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = db.users.find(u => u.phone === phone);
    if (!user) {
      return res.status(400).json({ error: '用户不存在' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: '密码错误' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, phone: user.phone, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  try {
    const user = db.users.find(u => u._id === req.userId);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 作品管理
app.get('/api/works', authMiddleware, (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    let works = db.works.filter(w => w.userId === req.userId);
    if (status) works = works.filter(w => w.status === status);
    if (category) works = works.filter(w => w.category === category);

    const total = works.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    works = works.slice(start, start + parseInt(limit));

    res.json({ works, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/works', authMiddleware, (req, res) => {
  try {
    const work = {
      _id: uuidv4(),
      ...req.body,
      userId: req.userId,
      status: req.body.status || 'draft',
      views: 0,
      sales: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    db.works.push(work);
    res.json(work);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/works/:id', authMiddleware, (req, res) => {
  try {
    const index = db.works.findIndex(w => w._id === req.params.id && w.userId === req.userId);
    if (index === -1) {
      return res.status(404).json({ error: '作品不存在' });
    }
    db.works[index] = { ...db.works[index], ...req.body, updatedAt: new Date() };
    res.json(db.works[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/works/:id', authMiddleware, (req, res) => {
  try {
    const index = db.works.findIndex(w => w._id === req.params.id && w.userId === req.userId);
    if (index !== -1) {
      db.works.splice(index, 1);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 订单管理
app.get('/api/orders', authMiddleware, (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let orders = db.orders.filter(o => o.sellerId === req.userId);
    if (status) orders = orders.filter(o => o.status === status);

    const total = orders.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    orders = orders.slice(start, start + parseInt(limit));

    res.json({ orders, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/orders/:id/ship', authMiddleware, (req, res) => {
  try {
    const index = db.orders.findIndex(o => o._id === req.params.id && o.sellerId === req.userId);
    if (index === -1) {
      return res.status(404).json({ error: '订单不存在' });
    }
    db.orders[index] = { ...db.orders[index], status: 'shipped', shippingNo: req.body.shippingNo, updatedAt: new Date() };
    res.json(db.orders[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 财务统计
app.get('/api/finance/stats', authMiddleware, (req, res) => {
  try {
    const orders = db.orders.filter(o => o.sellerId === req.userId && o.status === 'completed');
    const totalIncome = orders.reduce((sum, o) => sum + o.price, 0);
    const pendingOrders = db.orders.filter(o => o.sellerId === req.userId && ['pending', 'paid'].includes(o.status)).length;

    const transactions = db.transactions.filter(t => t.userId === req.userId && t.status === 'completed');
    const totalWithdraw = transactions
      .filter(t => t.type === 'withdraw')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    res.json({
      totalIncome,
      balance: totalIncome - totalWithdraw,
      pendingOrders,
      totalWithdraw
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/finance/transactions', authMiddleware, (req, res) => {
  try {
    const transactions = db.transactions
      .filter(t => t.userId === req.userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 50);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/finance/withdraw', authMiddleware, (req, res) => {
  try {
    const { amount, description } = req.body;
    const transaction = {
      _id: uuidv4(),
      userId: req.userId,
      type: 'withdraw',
      amount: -Math.abs(amount),
      description: description || '余额提现',
      status: 'pending',
      createdAt: new Date()
    };
    db.transactions.push(transaction);
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 数据分析
app.get('/api/analytics', authMiddleware, (req, res) => {
  try {
    const orders = db.orders.filter(o => o.sellerId === req.userId && o.status === 'completed');

    // 按天统计
    const dailyStats = {};
    orders.forEach(o => {
      const date = new Date(o.createdAt).toISOString().split('T')[0];
      dailyStats[date] = (dailyStats[date] || 0) + o.price;
    });

    // 作品排行
    const workStats = {};
    orders.forEach(o => {
      workStats[o.workId] = (workStats[o.workId] || 0) + o.price;
    });

    const topWorks = Object.entries(workStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([workId, revenue]) => {
        const work = db.works.find(w => w._id === workId);
        return { _id: workId, title: work?.title || '未知作品', revenue, sales: work?.sales || 0 };
      });

    res.json({
      dailyStats,
      topWorks,
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + o.price, 0)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📦 模式: 内存数据库 (无需MongoDB)`);
  console.log(`✅ 测试账号: 13800138000 / 123456`);
});
