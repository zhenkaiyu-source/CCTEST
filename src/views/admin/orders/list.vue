<template>
  <div class="orders-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2>订单管理</h2>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-row">
      <div class="mini-stat">
        <span class="mini-value">{{ stats.todayOrders }}</span>
        <span class="mini-label">今日订单</span>
      </div>
      <div class="mini-stat">
        <span class="mini-value">¥{{ formatMoney(stats.todayAmount) }}</span>
        <span class="mini-label">今日成交额</span>
      </div>
      <div class="mini-stat warning">
        <span class="mini-value">{{ stats.pendingShip }}</span>
        <span class="mini-label">待发货</span>
      </div>
      <div class="mini-stat danger">
        <span class="mini-value">{{ stats.refundCount }}</span>
        <span class="mini-label">退款申请</span>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <label>订单状态</label>
          <select v-model="filters.status">
            <option value="">全部</option>
            <option value="pending">待支付</option>
            <option value="paid">已支付</option>
            <option value="shipped">已发货</option>
            <option value="completed">已完成</option>
            <option value="cancelled">已取消</option>
          </select>
        </div>
        <div class="filter-item">
          <label>下单时间</label>
          <input type="date" v-model="filters.startDate" />
          <span>至</span>
          <input type="date" v-model="filters.endDate" />
        </div>
        <div class="filter-item">
          <input type="text" v-model="filters.keyword" placeholder="订单号/艺术家/买家" />
        </div>
        <button class="btn-primary" @click="handleSearch">查询</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>订单编号</th>
            <th>下单时间</th>
            <th>买家</th>
            <th>艺术家</th>
            <th>商品信息</th>
            <th>订单金额</th>
            <th>支付状态</th>
            <th>订单状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orderList" :key="order.id">
            <td class="td-id">{{ order.no }}</td>
            <td class="td-time">{{ order.time }}</td>
            <td>
              <div class="buyer-cell">
                <span>{{ order.buyerName }}</span>
                <span class="buyer-phone">{{ order.buyerPhone }}</span>
              </div>
            </td>
            <td>{{ order.artist }}</td>
            <td class="td-product">
              <div class="product-info">
                <span class="product-name">{{ order.productName }}</span>
                <span class="product-qty">x{{ order.quantity }}</span>
              </div>
            </td>
            <td class="td-price">¥{{ order.amount }}</td>
            <td>
              <span class="pay-status" :class="'pay-' + order.payStatus">
                {{ order.payStatusText }}
              </span>
            </td>
            <td>
              <span class="order-status" :class="'status-' + order.status">
                {{ order.statusText }}
              </span>
            </td>
            <td>
              <button class="btn-link" @click="viewDetail(order)">查看</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <span class="pagination-info">共 {{ total }} 条</span>
      <div class="pagination-controls">
        <button :disabled="page <= 1" @click="page--">上一页</button>
        <span class="page-num">{{ page }} / {{ pages }}</span>
        <button :disabled="page >= pages" @click="page++">下一页</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const page = ref(1)
const pages = ref(15)
const total = ref(1428)

const stats = ref({
  todayOrders: 28,
  todayAmount: 15680,
  pendingShip: 18,
  refundCount: 3
})

const filters = reactive({
  status: '',
  startDate: '',
  endDate: '',
  keyword: ''
})

const orderList = ref([
  { id: 1, no: 'ORD-231215-001', time: '2024-02-12 14:30', buyerName: '李**', buyerPhone: '138****8888', artist: '张三丰', productName: '手绘青花缠枝莲纹品茗杯', quantity: 1, amount: '299.00', payStatus: 'paid', payStatusText: '已支付', status: 'pending', statusText: '待发货' },
  { id: 2, no: 'ORD-231215-002', time: '2024-02-12 13:15', buyerName: '王**', buyerPhone: '139****6666', artist: '李青花', productName: '粉彩花鸟赏瓶', quantity: 1, amount: '1,280.00', payStatus: 'paid', payStatusText: '已支付', status: 'shipped', statusText: '已发货' },
  { id: 3, no: 'ORD-231215-003', time: '2024-02-12 11:45', buyerName: '张**', buyerPhone: '137****5555', artist: '王粉彩', productName: '天青色汝窑茶具套装', quantity: 1, amount: '899.00', payStatus: 'paid', payStatusText: '已支付', status: 'completed', statusText: '已完成' },
  { id: 4, no: 'ORD-231214-001', time: '2024-02-11 18:20', buyerName: '赵**', buyerPhone: '136****4444', artist: '赵汝窑', productName: '青花釉里红盖碗', quantity: 2, amount: '916.00', payStatus: 'paid', payStatusText: '已支付', status: 'cancelled', statusText: '已取消' },
  { id: 5, no: 'ORD-231214-002', time: '2024-02-11 16:30', buyerName: '钱**', buyerPhone: '135****3333', artist: '钱釉里红', productName: '窑变釉茶具', quantity: 1, amount: '680.00', payStatus: 'pending', payStatusText: '待支付', status: 'pending', statusText: '待支付' }
])

const formatMoney = (num) => {
  return num.toLocaleString()
}

const handleSearch = () => {
  console.log('搜索:', filters)
}

const viewDetail = (order) => {
  console.log('查看订单:', order.id)
}
</script>

<style lang="scss" scoped>
.orders-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  margin-bottom: 24px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
  }
}

.stats-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.mini-stat {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &.warning { background: linear-gradient(135deg, #fef3c7, #fde68a); }
  &.danger { background: linear-gradient(135deg, #fee2e2, #fecaca); }
}

.mini-value {
  display: block;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.mini-label {
  font-size: 13px;
  color: #64748b;
}

.filter-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  gap: 16px;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    color: #64748b;
  }

  select, input {
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 13px;
    outline: none;

    &:focus { border-color: #f59e0b; }
  }

  span {
    padding: 0 8px;
    color: #94a3b8;
  }
}

.btn-primary {
  padding: 8px 16px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.data-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;

  table { width: 100%; border-collapse: collapse; }

  th, td {
    padding: 14px 12px;
    text-align: left;
    font-size: 13px;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
  }

  td { border-bottom: 1px solid #f1f5f9; }

  tr:hover td { background: #f8fafc; }
}

.buyer-cell {
  display: flex;
  flex-direction: column;

  .buyer-phone {
    font-size: 12px;
    color: #94a3b8;
  }
}

.td-product { max-width: 200px; }

.product-info {
  display: flex;
  flex-direction: column;

  .product-name {
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-qty {
    font-size: 12px;
    color: #94a3b8;
  }
}

.td-id { font-family: monospace; color: #64748b; }
.td-time { color: #64748b; font-size: 12px; }
.td-price { font-weight: 700; color: #0f172a; }

.pay-status, .order-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;

  &.pay-paid { background: #ecfdf5; color: #059669; }
  &.pay-pending { background: #fef3c7; color: #d97706; }
  &.status-pending { background: #fef3c7; color: #d97706; }
  &.status-shipped { background: #eff6ff; color: #2563eb; }
  &.status-completed { background: #ecfdf5; color: #059669; }
  &.status-cancelled { background: #f1f5f9; color: #64748b; }
}

.btn-link {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 12px;
  cursor: pointer;

  &:hover { text-decoration: underline; }
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
}

.pagination-info { font-size: 13px; color: #64748b; }

.pagination-controls {
  display: flex;
  gap: 12px;

  button {
    padding: 6px 14px;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;

    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
}

.page-num { font-size: 13px; color: #334155; }
</style>
