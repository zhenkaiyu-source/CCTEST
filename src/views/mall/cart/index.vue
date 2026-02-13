<template>
  <div class="cart-page">
    <h2 class="page-title">🛒 购物车</h2>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <span class="empty-icon">🛒</span>
      <p>购物车空空如也</p>
      <router-link to="/" class="go-shopping">去逛逛</router-link>
    </div>

    <div v-else class="cart-content">
      <!-- 商品列表 -->
      <div class="cart-list">
        <div class="cart-header">
          <label class="checkbox-label">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
            全选
          </label>
          <span class="header-item">商品信息</span>
          <span class="header-item">单价</span>
          <span class="header-item">数量</span>
          <span class="header-item">小计</span>
          <span class="header-item">操作</span>
        </div>

        <div v-for="item in cartItems" :key="item.id + item.spec" class="cart-item">
          <label class="checkbox-label">
            <input type="checkbox" v-model="item.selected" />
          </label>
          <div class="item-info">
            <router-link :to="`/works/${item.id}`" class="item-image" :style="{ background: item.imageGradient }">
              {{ item.emoji }}
            </router-link>
            <div class="item-detail">
              <router-link :to="`/works/${item.id}`" class="item-title">{{ item.title }}</router-link>
              <p class="item-spec">{{ item.spec }}</p>
            </div>
          </div>
          <div class="item-price">¥{{ item.price }}</div>
          <div class="item-quantity">
            <button @click="updateQuantity(item, -1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item, 1)">+</button>
          </div>
          <div class="item-subtotal">¥{{ item.price * item.quantity }}</div>
          <div class="item-actions">
            <button class="btn-delete" @click="removeItem(item)">删除</button>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="checkout-section">
        <div class="promotion-info">
          <span class="promo-icon">📦</span>
          <span>满500减50，已享优惠 ¥50</span>
        </div>
        <div class="checkout-summary">
          <div class="summary-row">
            <span>已选 {{ selectedCount }} 件商品</span>
            <span>小计：¥{{ subtotal }}</span>
          </div>
          <div class="summary-row discount">
            <span>优惠</span>
            <span>-¥{{ discount }}</span>
          </div>
          <div class="summary-row total">
            <span>合计</span>
            <span>¥{{ total }}</span>
          </div>
        </div>
        <router-link :to="total > 0 ? '/checkout' : ''" class="checkout-btn" :class="{ disabled: total === 0 }">
          去结算 ({{ selectedCount }})
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const cartItems = ref([])

const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cartItems.value = cart.map(item => ({
    ...item,
    selected: true,
    imageGradient: getRandomGradient()
  }))
}

const getRandomGradient = () => {
  const gradients = [
    'linear-gradient(135deg, #1e3a5f, #3b82f6)',
    'linear-gradient(135deg, #7c3aed, #a855f7)',
    'linear-gradient(135deg, #059669, #10b981)',
    'linear-gradient(135deg, #f59e0b, #fbbf24)',
    'linear-gradient(135deg, #ef4444, #f87171)'
  ]
  return gradients[Math.floor(Math.random() * gradients.length)]
}

const selectAll = computed({
  get: () => cartItems.value.length > 0 && cartItems.value.every(item => item.selected),
  set: (val) => {
    cartItems.value.forEach(item => item.selected = val)
  }
})

const selectedCount = computed(() => {
  return cartItems.value.filter(item => item.selected).reduce((sum, item) => sum + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.filter(item => item.selected).reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const discount = computed(() => {
  return subtotal.value >= 500 ? 50 : 0
})

const total = computed(() => {
  return Math.max(0, subtotal.value - discount.value)
})

const toggleSelectAll = () => {
  const allSelected = cartItems.value.every(item => item.selected)
  cartItems.value.forEach(item => item.selected = !allSelected)
}

const updateQuantity = (item, delta) => {
  const newQty = item.quantity + delta
  if (newQty < 1) return
  item.quantity = newQty
  saveCart()
}

const removeItem = (item) => {
  const index = cartItems.value.findIndex(i => i.id === item.id && i.spec === item.spec)
  if (index > -1) {
    cartItems.value.splice(index, 1)
    saveCart()
  }
}

const saveCart = () => {
  const cart = cartItems.value.map(item => ({
    id: item.id,
    title: item.title,
    price: item.price,
    spec: item.spec,
    quantity: item.quantity,
    emoji: item.emoji,
    creatorName: item.creatorName
  }))
  localStorage.setItem('cart', JSON.stringify(cart))
}

watch(cartItems, saveCart, { deep: true })

onMounted(() => {
  loadCart()
})
</script>

<style lang="scss" scoped>
.cart-page {
  padding: 24px 0;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.empty-cart {
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

.cart-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.cart-list {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.cart-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  color: #666;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: 80px;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}

.header-item {
  flex: 1;
  text-align: center;

  &:first-of-type {
    text-align: left;
  }
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #f3f4f6;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  text-decoration: none;
}

.item-title {
  font-size: 14px;
  color: #1a1a2e;
  text-decoration: none;
  margin-bottom: 4px;
  display: block;

  &:hover {
    color: #d97706;
  }
}

.item-spec {
  font-size: 12px;
  color: #9ca3af;
}

.item-price {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #374151;
}

.item-quantity {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  button {
    width: 28px;
    height: 28px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #f3f4f6;
    }
  }

  span {
    width: 40px;
    text-align: center;
    font-size: 14px;
  }
}

.item-subtotal {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #ef4444;
}

.item-actions {
  width: 80px;
  text-align: center;

  .btn-delete {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: #ef4444;
    }
  }
}

.checkout-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
}

.promotion-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fef3c7;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #92400e;
}

.checkout-summary {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;

  &.discount {
    color: #10b981;
  }

  &.total {
    font-size: 18px;
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

.checkout-btn {
  display: block;
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #d97706, #b45309);
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}
</style>
