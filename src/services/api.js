// API 服务 - Vercel 部署版本
const API_BASE = import.meta.env.PROD ? '/api' : 'http://localhost:3003/api'

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('ceramics_token')

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '请求失败')
  }

  return data
}

export const api = {
  // 认证
  login: (phone, password) =>
    request('/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    }),

  register: (phone, password, name) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ phone, password, name }),
    }),

  getProfile: () => request('/users/list'),

  // 作品
  getWorks: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return request(`/works/list${query ? '?' + query : ''}`)
  },

  getWork: (id) => request(`/works/${id}`),

  getCategories: () => request('/categories'),

  createWork: (data) =>
    request('/works', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateWork: (id, data) =>
    request(`/works/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteWork: (id) => request(`/works/${id}`, { method: 'DELETE' }),

  // 购物车
  getCart: (userId = 1) => request(`/cart/${userId}`),

  addToCart: (workId, quantity = 1) =>
    request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ userId: 1, workId, quantity }),
    }),

  // 收藏
  getFavorites: (userId = 1) => request(`/favorites/${userId}`),

  addToFavorites: (workId) =>
    request('/favorites/add', {
      method: 'POST',
      body: JSON.stringify({ userId: 1, workId }),
    }),

  // 订单
  getOrders: (userId = 1) => request(`/orders/${userId}`),

  createOrder: (items, total) =>
    request('/orders/create', {
      method: 'POST',
      body: JSON.stringify({ userId: 1, items, total }),
    }),

  // 艺术家
  getCreatorWorks: (creatorId) => request(`/creator/works/${creatorId}`),

  // 统计
  getStats: () => request('/stats'),
}

export default api
