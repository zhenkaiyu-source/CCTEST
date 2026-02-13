<template>
  <div class="order-list-page">
    <h2 class="page-title">📦 我的订单</h2>

    <div class="order-tabs">
      <span
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <span class="count" v-if="tab.count">{{ tab.count }}</span>
      </span>
    </div>

    <div v-if="filteredOrders.length === 0" class="empty-orders">
      <span class="empty-icon">📦</span>
      <p>暂无相关订单</p>
      <router-link to="/" class="go-shopping">去逛逛</router-link>
    </div>

    <div v-else class="order-list">
      <div v-for="order in filteredOrders" :key="order.orderNo" class="order-card">
        <div class="order-header">
          <div class="order-info">
            <span class="order-no">订单号：{{ order.orderNo }}</span>
            <span class="order-time">{{ formatDate(order.createdAt) }}</span>
          </div>
          <span class="order-status" :class="order.status">{{ getStatusText(order.status) }}</span>
        </div>

        <div class="order-goods">
          <div v-for="item in order.items" :key="item.id" class="goods-item">
            <div class="goods-image" :style="{ background: item.imageGradient }">
              {{ item.emoji }}
            </div>
            <div class="goods-info">
              <h4>{{ item.title }}</h4>
              <p>{{ item.spec }} × {{ item.quantity }}</p>
            </div>
            <div class="goods-price">¥{{ item.price }}</div>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-total">
            共 {{ order.items.length }} 件商品
            <span class="total-price">合计：¥{{ order.total }}</span>
          </div>
          <div class="order-actions">
            <template v-if="order.status === 'pending'">
              <button class="btn-primary" @click="payOrder(order)">立即支付</button>
              <button class="btn-secondary" @click="cancelOrder(order)">取消订单</button>
            </template>
            <template v-else-if="order.status === 'paid'">
              <button class="btn-primary" @click="viewLogistics(order)">查看物流</button>
              <button class="btn-secondary" @click="confirmReceive(order)">确认收货</button>
            </template>
            <template v-else-if="order.status === 'shipped'">
              <button class="btn-primary" @click="viewLogistics(order)">查看物流</button>
              <button class="btn-secondary" @click="confirmReceive(order)">确认收货</button>
            </template>
            <template v-else-if="order.status === 'completed'">
              <button class="btn-primary" @click="goToComment(order)">评价</button>
              <button class="btn-secondary" @click="buyAgain(order)">再次购买</button>
            </template>
            <button class="btn-link" @click="viewDetail(order)">订单详情</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('all')

const tabs = [
  { value: 'all', label: '全部', count: 3 },
  { value: 'pending', label: '待付款', count: 1 },
  { value: 'paid', label: '待发货', count: 0 },
  { value: 'shipped', label: '待收货', count: 1 },
  { value: 'completed', label: '已完成', count: 1 }
]

const orders = ref([])

onMounted(() => {
  orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
  if (orders.value.length === 0) {
    // 添加示例订单
    orders.value = [
      {
        orderNo: 'ORD-12345678',
        items: [
          { id: '1', title: '青花茶具套装-事事如意', spec: '套装A (5件套)', quantity: 1, price: 1280, emoji: '🍵', imageGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)' }
        ],
        address: { name: '张三', phone: '138****8888', province: '北京市', city: '北京市', district: '朝阳区', detail: 'xxx街道xxx号' },
        subtotal: 1280,
        discount: 50,
        total: 1230,
        status: 'pending',
        createdAt: new Date().toISOString()
      },
      {
        orderNo: 'ORD-87654321',
        items: [
          { id: '2', title: '紫砂壶-石瓢', spec: '标准款', quantity: 1, price: 3280, emoji: '🫖', imageGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
          { id: '3', title: '茶垫-青莲', spec: '标准款', quantity: 2, price: 108, emoji: '🟣', imageGradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }
        ],
        address: { name: '李四', phone: '139****9999', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园xxx大厦' },
        subtotal: 3496,
        discount: 120,
        total: 3376,
        status: 'shipped',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        shippingNo: 'SF123456789'
      },
      {
        orderNo: 'ORD-11223344',
        items: [
          { id: '4', title: '青瓷餐具-江南', spec: '10人份', quantity: 1, price: 2380, emoji: '🍽️', imageGradient: 'linear-gradient(135deg, #059669, #10b981)' }
        ],
        address: { name: '王五', phone: '137****7777', province: '上海市', city: '上海市', district: '浦东新区', detail: 'xxx路xxx号' },
        subtotal: 2380,
        discount: 50,
        total: 2330,
        status: 'completed',
        createdAt: new Date(Date.now() - 604800000).toISOString()
      }
    ]
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }
})

const filteredOrders = computed(() => {
  if (activeTab.value === 'all') return orders.value
  return orders.value.filter(o => o.status === activeTab.value)
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

const getStatusText = (status) => {
  const texts = {
    pending: '待付款',
    paid: '待发货',
    shipped: '已发货',
    completed: '已完成',
    cancelled: '已取消'
  }
  return texts[status] || status
}

const payOrder = (order) => {
  alert(`跳转到支付页，订单号：${order.orderNo}`)
}

const cancelOrder = (order) => {
  if (confirm('确定取消该订单吗？')) {
    order.status = 'cancelled'
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }
}

const viewLogistics = (order) => {
  alert(`物流单号：${order.shippingNo || '暂无'}`)
}

const confirmReceive = (order) => {
  if (confirm('确认收货？')) {
    order.status = 'completed'
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }
}

const goToComment = (order) => {
  router.push(`/orders/${order.orderNo}`)
}

const buyAgain = (order) => {
  order.items.forEach(item => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
  })
  router.push('/cart')
}

const viewDetail = (order) => {
  router.push(`/orders/${order.orderNo}`)
}
</script>

<style lang="scss" scoped>
.order-list-page {
  padding: 24px 0;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.order-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.tab-item {
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  &.active {
    background: #d97706;
    color: white;
  }

  .count {
    font-size: 12px;
    margin-left: 4px;
    opacity: 0.8;
  }
}

.empty-orders {
  text-align: center;
  padding: 80px 0;
  background: white;
  border-radius: 12px;

  .empty-icon {
    font-size: 64px;
    display: block;
    margin-bottom: 16px;
  }

  p {
    color: #9ca3af;
    margin-bottom: 24px;
  }

  .go-shopping {
    display: inline-block;
    padding: 12px 32px;
    background: #d97706;
    color: white;
    text-decoration: none;
    border-radius: 24px;
    font-weight: 600;
  }
}

.order-card {
  background: white;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #f3f4f6;
}

.order-info {
  display: flex;
  gap: 24px;
}

.order-no {
  font-size: 14px;
  color: #374151;
}

.order-time {
  font-size: 13px;
  color: #9ca3af;
}

.order-status {
  font-size: 14px;
  font-weight: 500;

  &.pending { color: #d97706; }
  &.paid { color: #3b82f6; }
  &.shipped { color: #8b5cf6; }
  &.completed { color: #10b981; }
  &.cancelled { color: #9ca3af; }
}

.order-goods {
  padding: 16px 20px;
}

.goods-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
}

.goods-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
}

.goods-info {
  flex: 1;

  h4 {
    font-size: 14px;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  p {
    font-size: 12px;
    color: #9ca3af;
  }
}

.goods-price {
  font-size: 14px;
  color: #374151;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #f3f4f6;
}

.order-total {
  font-size: 14px;
  color: #666;

  .total-price {
    font-size: 18px;
    font-weight: 600;
    color: #ef4444;
    margin-left: 16px;
  }
}

.order-actions {
  display: flex;
  gap: 12px;

  button {
    padding: 8px 20px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
}

.btn-primary {
  background: #d97706;
  color: white;
  border: none;

  &:hover {
    background: #b45309;
  }
}

.btn-secondary {
  background: white;
  color: #666;
  border: 1px solid #e5e7eb;

  &:hover {
    border-color: #d97706;
    color: #d97706;
  }
}

.btn-link {
  background: none;
  border: none;
  color: #3b82f6;

  &:hover {
    text-decoration: underline;
  }
}
</style>
