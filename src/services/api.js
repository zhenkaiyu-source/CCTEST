const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('ceramics_token');

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || '请求失败');
  }

  return data;
}

export const api = {
  // 认证
  login: (phone, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, password }),
    }),

  register: (phone, password, name) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ phone, password, name }),
    }),

  getProfile: () => request('/auth/me'),

  // 作品
  getWorks: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/works${query ? '?' + query : ''}`);
  },

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

  deleteWork: (id) =>
    request(`/works/${id}`, { method: 'DELETE' }),

  // 订单
  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/orders${query ? '?' + query : ''}`);
  },

  shipOrder: (id, shippingNo) =>
    request(`/orders/${id}/ship`, {
      method: 'PUT',
      body: JSON.stringify({ shippingNo }),
    }),

  // 财务
  getFinanceStats: () => request('/finance/stats'),

  getTransactions: () => request('/finance/transactions'),

  withdraw: (amount, description) =>
    request('/finance/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, description }),
    }),

  // 分析
  getAnalytics: () => request('/analytics'),
};

export default api;
