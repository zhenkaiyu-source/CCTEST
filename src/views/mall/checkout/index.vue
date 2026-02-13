<template>
  <div class="checkout-page">
    <h2 class="page-title">📋 确认订单</h2>

    <div class="checkout-layout">
      <div class="checkout-main">
        <!-- 收货地址 -->
        <div class="section address-section">
          <h3>收货地址</h3>
          <div class="address-list">
            <div
              v-for="addr in addresses"
              :key="addr.id"
              class="address-card"
              :class="{ selected: selectedAddress === addr.id }"
              @click="selectedAddress = addr.id"
            >
              <div class="address-info">
                <div class="addr-user">
                  <span class="name">{{ addr.name }}</span>
                  <span class="phone">{{ addr.phone }}</span>
                  <span v-if="addr.isDefault" class="default-tag">默认</span>
                </div>
                <p class="addr-detail">{{ addr.province }}{{ addr.city }}{{ addr.district }}{{ addr.detail }}</p>
              </div>
              <span class="check-icon" v-if="selectedAddress === addr.id">✓</span>
            </div>
            <div class="address-card add-address" @click="showAddAddress = true">
              <span class="add-icon">+</span>
              <span>添加新地址</span>
            </div>
          </div>
        </div>

        <!-- 商品清单 -->
        <div class="section goods-section">
          <h3>商品清单</h3>
          <div class="goods-list">
            <div v-for="item in checkoutItems" :key="item.id" class="goods-item">
              <div class="goods-image" :style="{ background: item.imageGradient }">
                {{ item.emoji }}
              </div>
              <div class="goods-info">
                <router-link :to="`/works/${item.id}`" class="goods-title">{{ item.title }}</router-link>
                <p class="goods-spec">{{ item.spec }} × {{ item.quantity }}</p>
                <p class="goods-creator">{{ item.creatorName }}</p>
              </div>
              <div class="goods-price">¥{{ item.price }}</div>
            </div>
          </div>
        </div>

        <!-- 支付方式 -->
        <div class="section payment-section">
          <h3>支付方式</h3>
          <div class="payment-options">
            <label
              v-for="method in paymentMethods"
              :key="method.value"
              class="payment-option"
              :class="{ selected: selectedPayment === method.value }"
            >
              <input type="radio" :value="method.value" v-model="selectedPayment" />
              <span class="method-icon">{{ method.icon }}</span>
              <span class="method-name">{{ method.name }}</span>
            </label>
          </div>
        </div>

        <!-- 配送方式 -->
        <div class="section shipping-section">
          <h3>配送方式</h3>
          <div class="shipping-options">
            <label
              class="shipping-option"
              :class="{ selected: selectedShipping === 'express' }"
            >
              <input type="radio" value="express" v-model="selectedShipping" />
              <span class="shipping-icon">📦</span>
              <div class="shipping-info">
                <span class="shipping-name">快递配送</span>
                <span class="shipping-desc">免运费（西藏、内蒙古除外）</span>
              </div>
            </label>
            <label
              class="shipping-option"
              :class="{ selected: selectedShipping === 'self' }"
            >
              <input type="radio" value="self" v-model="selectedShipping" />
              <span class="shipping-icon">🏪</span>
              <div class="shipping-info">
                <span class="shipping-name">到店自提</span>
                <span class="shipping-desc">景德镇瓷韵艺术馆</span>
              </div>
            </label>
          </div>
        </div>

        <!-- 备注 -->
        <div class="section remark-section">
          <h3>订单备注</h3>
          <textarea
            v-model="remark"
            placeholder="选填，请输入订单备注（限100字）"
            maxlength="100"
          ></textarea>
        </div>
      </div>

      <!-- 结算栏 -->
      <div class="checkout-sidebar">
        <div class="order-summary">
          <h3>订单总结</h3>
          <div class="summary-row">
            <span>商品金额</span>
            <span>¥{{ subtotal }}</span>
          </div>
          <div class="summary-row">
            <span>运费</span>
            <span>¥{{ shippingFee }}</span>
          </div>
          <div class="summary-row" v-if="discount > 0">
            <span>优惠</span>
            <span>-¥{{ discount }}</span>
          </div>
          <div class="summary-row total">
            <span>应付金额</span>
            <span>¥{{ total }}</span>
          </div>
        </div>
        <button class="submit-btn" @click="submitOrder">
          提交订单 ¥{{ total }}
        </button>
        <p class="agree-text">提交订单即表示同意 <a href="#">《瓷韵服务协议》</a></p>
      </div>
    </div>

    <!-- 添加地址弹窗 -->
    <div v-if="showAddAddress" class="modal-overlay" @click.self="showAddAddress = false">
      <div class="modal-content">
        <h3>添加新地址</h3>
        <div class="form-group">
          <label>收货人</label>
          <input type="text" v-model="newAddr.name" placeholder="请输入收货人姓名" />
        </div>
        <div class="form-group">
          <label>手机号</label>
          <input type="tel" v-model="newAddr.phone" placeholder="请输入手机号" />
        </div>
        <div class="form-group">
          <label>所在地区</label>
          <div class="region-select">
            <select v-model="newAddr.province">
              <option value="">省份</option>
              <option value="北京市">北京市</option>
              <option value="上海市">上海市</option>
              <option value="广东省">广东省</option>
            </select>
            <select v-model="newAddr.city">
              <option value="">城市</option>
              <option value="深圳市">深圳市</option>
              <option value="广州市">广州市</option>
            </select>
            <select v-model="newAddr.district">
              <option value="">区县</option>
              <option value="南山区">南山区</option>
              <option value="福田区">福田区</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>详细地址</label>
          <input type="text" v-model="newAddr.detail" placeholder="请输入详细地址" />
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showAddAddress = false">取消</button>
          <button class="btn-confirm" @click="addAddress">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const addresses = ref([
  { id: '1', name: '张三', phone: '138****8888', province: '北京市', city: '北京市', district: '朝阳区', detail: 'xxx街道xxx号xxx小区1号楼101', isDefault: true },
  { id: '2', name: '李四', phone: '139****9999', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园xxx大厦xxx室', isDefault: false }
])

const selectedAddress = ref('1')
const selectedPayment = ref('wechat')
const selectedShipping = ref('express')
const remark = ref('')
const showAddAddress = ref(false)

const newAddr = ref({
  name: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  detail: ''
})

const checkoutItems = ref([])

const paymentMethods = [
  { value: 'wechat', name: '微信支付', icon: '💬' },
  { value: 'alipay', name: '支付宝', icon: '💳' },
  { value: 'card', name: '银行卡', icon: '🏦' }
]

onMounted(() => {
  const items = JSON.parse(localStorage.getItem('checkout_items') || '[]')
  if (items.length === 0) {
    router.push('/cart')
    return
  }
  checkoutItems.value = items.map(item => ({
    ...item,
    imageGradient: getRandomGradient()
  }))
})

const getRandomGradient = () => {
  const gradients = [
    'linear-gradient(135deg, #1e3a5f, #3b82f6)',
    'linear-gradient(135deg, #7c3aed, #a855f7)',
    'linear-gradient(135deg, #059669, #10b981)'
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}

const subtotal = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shippingFee = computed(() => {
  return selectedShipping.value === 'express' ? 0 : 0
})

const discount = computed(() => {
  return subtotal.value >= 500 ? 50 : 0
})

const total = computed(() => {
  return subtotal.value + shippingFee.value - discount.value
})

const addAddress = () => {
  if (!newAddr.value.name || !newAddr.value.phone || !newAddr.value.detail) {
    alert('请填写完整信息')
    return
  }

  const id = String(Date.now())
  addresses.value.push({
    id,
    ...newAddr.value,
    isDefault: false
  })
  selectedAddress.value = id
  showAddAddress.value = false
  newAddr.value = { name: '', phone: '', province: '', city: '', district: '', detail: '' }
}

const submitOrder = () => {
  // 生成订单
  const orderNo = `ORD-${Date.now().toString().slice(-8)}`
  const order = {
    orderNo,
    items: checkoutItems.value,
    address: addresses.value.find(a => a.id === selectedAddress.value),
    subtotal: subtotal.value,
    shippingFee: shippingFee.value,
    discount: discount.value,
    total: total.value,
    paymentMethod: selectedPayment.value,
    shippingMethod: selectedShipping.value,
    remark: remark.value,
    status: 'pending',
    createdAt: new Date().toISOString()
  }

  // 保存订单
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  orders.unshift(order)
  localStorage.setItem('orders', JSON.stringify(orders))

  // 清空购物车
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const cartIds = checkoutItems.value.map(i => i.id)
  const newCart = cart.filter(item => !cartIds.includes(item.id))
  localStorage.setItem('cart', JSON.stringify(newCart))

  // 跳转到订单详情
  router.push(`/orders/${orderNo}`)
}
</script>

<style lang="scss" scoped>
.checkout-page {
  padding: 24px 0;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.checkout-layout {
  display: flex;
  gap: 24px;
}

.checkout-main {
  flex: 1;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 20px;
  }
}

.address-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.address-card {
  width: 280px;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    border-color: #d97706;
  }

  &.selected {
    border-color: #d97706;
    background: rgba(217, 119, 6, 0.02);
  }

  &.add-address {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
    border-style: dashed;

    .add-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }
  }
}

.addr-user {
  margin-bottom: 8px;

  .name {
    font-weight: 600;
    color: #1a1a2e;
    margin-right: 12px;
  }

  .phone {
    color: #666;
    margin-right: 8px;
  }

  .default-tag {
    background: #d97706;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
  }
}

.addr-detail {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.check-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #d97706;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.goods-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
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
  margin-right: 16px;
}

.goods-info {
  flex: 1;
}

.goods-title {
  font-size: 14px;
  color: #1a1a2e;
  text-decoration: none;
  margin-bottom: 4px;
  display: block;

  &:hover {
    color: #d97706;
  }
}

.goods-spec {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.goods-creator {
  font-size: 12px;
  color: #666;
}

.goods-price {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.payment-options,
.shipping-options {
  display: flex;
  gap: 16px;
}

.payment-option,
.shipping-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  input {
    display: none;
  }

  &.selected {
    border-color: #d97706;
    background: rgba(217, 119, 6, 0.02);
  }
}

.method-icon {
  font-size: 24px;
}

.method-name {
  font-size: 14px;
  color: #374151;
}

.shipping-icon {
  font-size: 28px;
}

.shipping-info {
  .shipping-name {
    font-size: 14px;
    color: #374151;
    display: block;
  }

  .shipping-desc {
    font-size: 12px;
    color: #9ca3af;
  }
}

.remark-section {
  textarea {
    width: 100%;
    height: 80px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    resize: none;
    outline: none;

    &:focus {
      border-color: #d97706;
    }
  }
}

.checkout-sidebar {
  width: 360px;
  flex-shrink: 0;
}

.order-summary {
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

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  color: #666;

  &.total {
    font-size: 20px;
    font-weight: 700;
    color: #1a1a2e;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
    margin-top: 8px;

    span:last-child {
      color: #ef4444;
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #d97706, #b45309);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
  }
}

.agree-text {
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  margin-top: 16px;

  a {
    color: #d97706;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 480px;
  max-width: 90vw;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    color: #374151;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #d97706;
    }
  }
}

.region-select {
  display: flex;
  gap: 8px;

  select {
    flex: 1;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
  }
}

.modal-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  .btn-cancel {
    background: #f3f4f6;
    border: none;
    color: #666;
  }

  .btn-confirm {
    background: #d97706;
    border: none;
    color: white;
  }
}
</style>
