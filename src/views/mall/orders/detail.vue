<template>
  <div class="order-detail-page">
    <div class="page-header">
      <router-link to="/orders" class="back-link">← 返回订单列表</router-link>
    </div>

    <div v-if="order" class="order-content">
      <!-- 订单状态 -->
      <div class="status-card" :class="order.status">
        <div class="status-info">
          <span class="status-icon">{{ getStatusIcon(order.status) }}</span>
          <div class="status-text">
            <h2>{{ getStatusText(order.status) }}</h2>
            <p>{{ getStatusDesc(order.status) }}</p>
          </div>
        </div>
        <div class="countdown" v-if="order.status === 'pending'">
          请在 23:59:59 内完成支付
        </div>
      </div>

      <!-- 物流信息 -->
      <div class="section logistics-section" v-if="order.shippingNo">
        <h3>📦 物流信息</h3>
        <div class="logistics-info">
          <div class="logistics-icon">🚚</div>
          <div class="logistics-detail">
            <p class="shipping-company">顺丰快递</p>
            <p class="tracking-no">运单号：{{ order.shippingNo }}</p>
            <p class="trace">正在运输中...</p>
          </div>
          <button class="btn-trace">查看物流轨迹</button>
        </div>
      </div>

      <!-- 收货地址 -->
      <div class="section address-section">
        <h3>📍 收货地址</h3>
        <div class="address-info">
          <div class="addr-user">
            <span class="name">{{ order.address.name }}</span>
            <span class="phone">{{ order.address.phone }}</span>
          </div>
          <p class="addr-detail">
            {{ order.address.province }}{{ order.address.city }}{{ order.address.district }}{{ order.address.detail }}
          </p>
        </div>
      </div>

      <!-- 商品清单 -->
      <div class="section goods-section">
        <h3>📋 商品清单</h3>
        <div class="goods-list">
          <div v-for="item in order.items" :key="item.id" class="goods-item">
            <router-link :to="`/works/${item.id}`" class="goods-image" :style="{ background: item.imageGradient }">
              {{ item.emoji }}
            </router-link>
            <div class="goods-info">
              <router-link :to="`/works/${item.id}`" class="goods-title">{{ item.title }}</router-link>
              <p class="goods-spec">{{ item.spec }} × {{ item.quantity }}</p>
              <p class="goods-creator">{{ item.creatorName }}</p>
            </div>
            <div class="goods-price">¥{{ item.price }}</div>
          </div>
        </div>
      </div>

      <!-- 订单信息 -->
      <div class="section info-section">
        <h3>📝 订单信息</h3>
        <div class="info-grid">
          <div class="info-row">
            <span class="label">订单编号</span>
            <span class="value">{{ order.orderNo }}</span>
          </div>
          <div class="info-row">
            <span class="label">下单时间</span>
            <span class="value">{{ formatDate(order.createdAt) }}</span>
          </div>
          <div class="info-row">
            <span class="label">支付方式</span>
            <span class="value">{{ getPaymentMethod(order.paymentMethod) }}</span>
          </div>
          <div class="info-row">
            <span class="label">配送方式</span>
            <span class="value">{{ order.shippingMethod === 'express' ? '快递配送' : '到店自提' }}</span>
          </div>
          <div class="info-row" v-if="order.remark">
            <span class="label">备注</span>
            <span class="value">{{ order.remark }}</span>
          </div>
        </div>
      </div>

      <!-- 费用明细 -->
      <div class="section fee-section">
        <h3>💰 费用明细</h3>
        <div class="fee-list">
          <div class="fee-row">
            <span>商品金额</span>
            <span>¥{{ order.subtotal }}</span>
          </div>
          <div class="fee-row">
            <span>运费</span>
            <span>¥{{ order.shippingFee || 0 }}</span>
          </div>
          <div class="fee-row discount" v-if="order.discount > 0">
            <span>优惠</span>
            <span>-¥{{ order.discount }}</span>
          </div>
          <div class="fee-row total">
            <span>实付金额</span>
            <span>¥{{ order.total }}</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-bar" v-if="order.status !== 'cancelled' && order.status !== 'completed'">
        <template v-if="order.status === 'pending'">
          <button class="btn-primary" @click="payOrder">立即支付</button>
          <button class="btn-secondary" @click="cancelOrder">取消订单</button>
        </template>
        <template v-else-if="order.status === 'shipped'">
          <button class="btn-primary" @click="confirmReceive">确认收货</button>
        </template>
        <button class="btn-link" @click="contactService">联系客服</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderNo = route.params.id
const order = ref(null)

onMounted(() => {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  order.value = orders.find(o => o.orderNo === orderNo)
})

const getStatusIcon = (status) => {
  const icons = {
    pending: '⏰',
    paid: '📦',
    shipped: '🚚',
    completed: '✅',
    cancelled: '❌'
  }
  return icons[status] || '📋'
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

const getStatusDesc = (status) => {
  const descs = {
    pending: '请尽快完成支付，订单将在24小时后自动取消',
    paid: '卖家正在准备商品',
    shipped: '您的商品正在运输中',
    completed: '交易已完成，感谢您的购买',
    cancelled: '订单已取消'
  }
  return descs[status] || ''
}

const getPaymentMethod = (method) => {
  const methods = {
    wechat: '微信支付',
    alipay: '支付宝',
    card: '银行卡'
  }
  return methods[method] || method
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}

const payOrder = () => {
  alert('跳转支付...')
}

const cancelOrder = () => {
  if (confirm('确定取消该订单吗？')) {
    order.value.status = 'cancelled'
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const index = orders.findIndex(o => o.orderNo === orderNo)
    if (index > -1) {
      orders[index] = order.value
      localStorage.setItem('orders', JSON.stringify(orders))
    }
  }
}

const confirmReceive = () => {
  if (confirm('确认收货？')) {
    order.value.status = 'completed'
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const index = orders.findIndex(o => o.orderNo === orderNo)
    if (index > -1) {
      orders[index] = order.value
      localStorage.setItem('orders', JSON.stringify(orders))
    }
  }
}

const contactService = () => {
  alert('联系客服：400-888-8888')
}
</script>

<style lang="scss" scoped>
.order-detail-page {
  padding: 24px 0;
}

.page-header {
  margin-bottom: 24px;
}

.back-link {
  color: #666;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #d97706;
  }
}

.status-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.pending { background: linear-gradient(135deg, #fef3c7, #fde68a); }
  &.paid { background: linear-gradient(135deg, #dbeafe, #bfdbfe); }
  &.shipped { background: linear-gradient(135deg, #ede9fe, #ddd6fe); }
  &.completed { background: linear-gradient(135deg, #d1fae5, #a7f3d0); }
  &.cancelled { background: linear-gradient(135deg, #f3f4f6, #e5e7eb); }
}

.status-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-icon {
  font-size: 48px;
}

.status-text {
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
}

.countdown {
  font-size: 18px;
  font-weight: 600;
  color: #d97706;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 20px;
  }
}

.logistics-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logistics-icon {
  font-size: 40px;
}

.logistics-detail {
  flex: 1;

  .shipping-company {
    font-size: 16px;
    font-weight: 500;
    color: #1a1a2e;
    margin-bottom: 4px;
  }

  .tracking-no {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }

  .trace {
    font-size: 13px;
    color: #10b981;
  }
}

.btn-trace {
  padding: 8px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  color: #666;
  cursor: pointer;
}

.address-info {
  .addr-user {
    margin-bottom: 8px;

    .name {
      font-weight: 600;
      color: #1a1a2e;
      margin-right: 16px;
    }

    .phone {
      color: #666;
    }
  }

  .addr-detail {
    font-size: 14px;
    color: #666;
  }
}

.goods-list {
  .goods-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
    }
  }
}

.goods-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  text-decoration: none;
  margin-right: 16px;
}

.goods-info {
  flex: 1;

  .goods-title {
    font-size: 15px;
    color: #1a1a2e;
    text-decoration: none;
    margin-bottom: 4px;
    display: block;

    &:hover {
      color: #d97706;
    }
  }

  .goods-spec {
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 4px;
  }

  .goods-creator {
    font-size: 13px;
    color: #666;
  }
}

.goods-price {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-row {
  .label {
    font-size: 13px;
    color: #9ca3af;
    display: block;
    margin-bottom: 4px;
  }

  .value {
    font-size: 14px;
    color: #374151;
  }
}

.fee-list {
  .fee-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 14px;
    color: #666;

    &.discount {
      color: #10b981;
    }

    &.total {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a2e;
      border-top: 1px solid #e5e7eb;
      margin-top: 8px;
      padding-top: 16px;

      span:last-child {
        color: #ef4444;
      }
    }
  }
}

.action-bar {
  background: white;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  gap: 16px;
  justify-content: flex-end;

  button {
    padding: 12px 32px;
    border-radius: 24px;
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
