<template>
  <div class="work-detail-page" v-if="work">
    <!-- 商品信息区域 -->
    <div class="product-area">
      <!-- 图片画廊 -->
      <div class="gallery-section">
        <div class="main-image">
          <span class="work-emoji">{{ work.emoji }}</span>
        </div>
        <div class="thumbnail-list">
          <div
            v-for="(img, index) in thumbnails"
            :key="index"
            class="thumbnail"
            :class="{ active: activeThumb === index }"
            @click="activeThumb = index"
          >
            {{ img }}
          </div>
        </div>
      </div>

      <!-- 商品信息 -->
      <div class="product-info">
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <span>/</span>
          <router-link :to="`/works?category=${work.category}`">{{ work.category }}</router-link>
          <span>/</span>
          <span>{{ work.title }}</span>
        </div>

        <h1 class="product-title">{{ work.title }}</h1>

        <router-link :to="`/creators/${work.creatorId}`" class="creator-link">
          <div class="creator-info">
            <span class="creator-avatar">{{ work.creatorName[0] }}</span>
            <span class="creator-name">{{ work.creatorName }}</span>
            <span class="follow-btn">+ 关注</span>
          </div>
        </router-link>

        <div class="product-stats">
          <div class="stat">
            <span class="label">评分</span>
            <span class="value">⭐ 4.8</span>
          </div>
          <div class="stat">
            <span class="label">月销</span>
            <span class="value">{{ work.sales }}</span>
          </div>
          <div class="stat">
            <span class="label">好评</span>
            <span class="value">98%</span>
          </div>
        </div>

        <div class="price-section">
          <span class="current-price">¥{{ work.price }}</span>
          <span v-if="work.originalPrice" class="original-price">¥{{ work.originalPrice }}</span>
          <span v-if="work.discount" class="discount-tag">{{ work.discount }}折</span>
        </div>

        <div class="promotion-section">
          <div class="promo-item">
            <span class="promo-tag">促销</span>
            <span class="promo-text">满500减50，满1000减120</span>
          </div>
          <div class="promo-item">
            <span class="promo-tag">配送</span>
            <span class="promo-text">快递免运费（西藏、内蒙古除外）</span>
          </div>
          <div class="promo-item">
            <span class="promo-tag">服务</span>
            <span class="promo-text">7天无理由退货 · 品质保障 · 假一赔十</span>
          </div>
        </div>

        <!-- 规格选择 -->
        <div class="spec-section">
          <h4>选择规格</h4>
          <div class="spec-list">
            <span
              v-for="spec in specs"
              :key="spec.name"
              class="spec-item"
              :class="{ active: selectedSpec === spec.name, disabled: spec.stock === 0 }"
              @click="selectedSpec = spec.name"
            >
              {{ spec.name }}
              <span v-if="spec.stock === 0" class="stock-out">已售罄</span>
            </span>
          </div>
        </div>

        <!-- 数量选择 -->
        <div class="quantity-section">
          <h4>数量</h4>
          <div class="quantity-control">
            <button @click="quantity > 1 && quantity--">-</button>
            <span>{{ quantity }}</span>
            <button @click="quantity < maxStock && quantity++">+</button>
          </div>
          <span class="stock-info">库存 {{ maxStock }} 件</span>
        </div>

        <!-- 按钮区域 -->
        <div class="action-buttons">
          <button class="btn-cart" @click="addToCart">
            🛒 加入购物车
          </button>
          <button class="btn-buy" @click="buyNow">
            💰 立即购买
          </button>
          <button class="btn-favorite" :class="{ active: isFavorite }" @click="toggleFavorite">
            {{ isFavorite ? '❤️ 已收藏' : '🤍 收藏' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Tab 区域 -->
    <div class="detail-tabs">
      <div class="tab-header">
        <span
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </span>
      </div>

      <div class="tab-content">
        <!-- 商品详情 -->
        <div v-show="activeTab === 'detail'" class="detail-content">
          <div class="params-table">
            <div class="param-row">
              <span class="param-label">品牌</span>
              <span class="param-value">{{ work.creatorName }}</span>
            </div>
            <div class="param-row">
              <span class="param-label">材质</span>
              <span class="param-value">高温陶瓷</span>
            </div>
            <div class="param-row">
              <span class="param-label">工艺</span>
              <span class="param-value">青花手绘</span>
            </div>
            <div class="param-row">
              <span class="param-label">产地</span>
              <span class="param-value">景德镇</span>
            </div>
            <div class="param-row">
              <span class="param-label">包装</span>
              <span class="param-value">礼盒包装</span>
            </div>
          </div>
          <div class="detail-images">
            <div class="detail-image" v-for="i in 4" :key="i">
              <span>商品详情图 {{ i }}</span>
            </div>
          </div>
        </div>

        <!-- 评价 -->
        <div v-show="activeTab === 'reviews'" class="reviews-content">
          <div class="review-summary">
            <div class="score">
              <span class="score-num">4.8</span>
              <span class="score-label">综合评分</span>
            </div>
            <div class="stars">
              <span v-for="i in 5" :key="i">⭐</span>
            </div>
          </div>
          <div class="review-list">
            <div v-for="review in reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <span class="reviewer">{{ review.userName }}</span>
                <span class="review-date">{{ review.date }}</span>
              </div>
              <div class="review-stars">
                <span v-for="i in review.rating" :key="i">⭐</span>
              </div>
              <p class="review-content">{{ review.content }}</p>
              <div class="review-spec">{{ review.spec }}</div>
            </div>
          </div>
        </div>

        <!-- 艺术家 -->
        <div v-show="activeTab === 'creator'" class="creator-content">
          <router-link :to="`/creators/${work.creatorId}`" class="creator-card">
            <div class="creator-avatar-lg">{{ work.creatorName[0] }}</div>
            <div class="creator-detail">
              <h3>{{ work.creatorName }}</h3>
              <p>专注青花瓷创作，传承千年陶瓷文化</p>
              <div class="creator-stats">
                <span>作品 {{ work.creatorWorks }}</span>
                <span>销量 {{ work.creatorSales }}</span>
                <span>好评 99%</span>
              </div>
            </div>
            <button class="btn-follow">进入主页</button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 加入购物车成功弹窗 -->
    <div v-if="showCartToast" class="cart-toast">
      <span>✅ 已加入购物车</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const workId = route.params.id

const activeThumb = ref(0)
const activeTab = ref('detail')
const selectedSpec = ref('套装A (5件套)')
const quantity = ref(1)
const isFavorite = ref(false)
const showCartToast = ref(false)

const thumbnails = ['🍵', '🫖', '🥣', '🏺']

const tabs = [
  { key: 'detail', label: '商品详情' },
  { key: 'reviews', label: '评价 (56)' },
  { key: 'creator', label: '艺术家' }
]

const specs = [
  { name: '套装A (5件套)', stock: 5 },
  { name: '套装B (7件套)', stock: 3 },
  { name: '单品(1件)', stock: 0 }
]

const maxStock = computed(() => {
  const spec = specs.find(s => s.name === selectedSpec.value)
  return spec ? spec.stock : 0
})

const reviews = [
  { id: 1, userName: '用户1234', date: '2024-01-15', rating: 5, content: '包装很好，没有破损。陶瓷质感很棒，青花图案精美，非常满意！', spec: '套装A (5件套)' },
  { id: 2, userName: '艺术品收藏', date: '2024-01-12', rating: 5, content: '送给朋友的乔迁礼物，朋友们都很喜欢。发货很快，客服态度也很好。', spec: '套装B (7件套)' },
  { id: 3, userName: '茶道爱好者', date: '2024-01-10', rating: 4, content: '品质不错，就是运输过程中有点小瑕疵，不过不影响使用。', spec: '单品(1件)' }
]

// 模拟数据
const work = ref({
  id: workId,
  title: '青花茶具套装-事事如意',
  category: '茶具',
  creatorId: '1',
  creatorName: '景德镇青花斋',
  creatorWorks: 128,
  creatorSales: 3560,
  price: 1280,
  originalPrice: null,
  sales: 856,
  emoji: '🍵'
})

const addToCart = () => {
  if (maxStock.value === 0) {
    alert('所选规格已售罄')
    return
  }

  let cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const existing = cart.find(item => item.id === work.value.id && item.spec === selectedSpec.value)

  if (existing) {
    existing.quantity += quantity.value
  } else {
    cart.push({
      id: work.value.id,
      title: work.value.title,
      price: work.value.price,
      spec: selectedSpec.value,
      quantity: quantity.value,
      emoji: work.value.emoji,
      creatorName: work.value.creatorName
    })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  showCartToast.value = true
  setTimeout(() => showCartToast.value = false, 2000)
}

const buyNow = () => {
  if (maxStock.value === 0) {
    alert('所选规格已售罄')
    return
  }

  const item = {
    id: work.value.id,
    title: work.value.title,
    price: work.value.price,
    spec: selectedSpec.value,
    quantity: quantity.value,
    emoji: work.value.emoji
  }

  localStorage.setItem('checkout_items', JSON.stringify([item]))
  router.push('/checkout')
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>

<style lang="scss" scoped>
.work-detail-page {
  padding: 24px 0;
}

.product-area {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.gallery-section {
  width: 480px;
  flex-shrink: 0;
}

.main-image {
  background: linear-gradient(135deg, #1e3a5f, #3b82f6);
  height: 480px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.work-emoji {
  font-size: 200px;
}

.thumbnail-list {
  display: flex;
  gap: 12px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  border: 2px solid transparent;

  &.active {
    border-color: #d97706;
  }
}

.product-info {
  flex: 1;
}

.breadcrumb {
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 16px;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      color: #d97706;
    }
  }

  span {
    margin: 0 6px;
  }
}

.product-title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 16px;
}

.creator-link {
  text-decoration: none;
  display: block;
  margin-bottom: 20px;
}

.creator-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.creator-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e3a5f, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.creator-name {
  font-size: 15px;
  color: #374151;
}

.follow-btn {
  font-size: 12px;
  color: #d97706;
  border: 1px solid #d97706;
  padding: 4px 12px;
  border-radius: 12px;
}

.product-stats {
  display: flex;
  gap: 32px;
  margin-bottom: 20px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 8px;

  .stat {
    text-align: center;
  }

  .label {
    font-size: 12px;
    color: #9ca3af;
    display: block;
    margin-bottom: 4px;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
  }
}

.price-section {
  margin-bottom: 20px;

  .current-price {
    font-size: 32px;
    font-weight: 700;
    color: #ef4444;
    margin-right: 12px;
  }

  .original-price {
    font-size: 16px;
    color: #9ca3af;
    text-decoration: line-through;
  }

  .discount-tag {
    background: #ef4444;
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    margin-left: 8px;
  }
}

.promotion-section {
  margin-bottom: 24px;

  .promo-item {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .promo-tag {
    background: #fee2e2;
    color: #ef4444;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
  }

  .promo-text {
    color: #666;
  }
}

.spec-section,
.quantity-section {
  margin-bottom: 24px;

  h4 {
    font-size: 14px;
    color: #374151;
    margin-bottom: 12px;
  }
}

.spec-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.spec-item {
  padding: 10px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #d97706;
  }

  &.active {
    border-color: #d97706;
    background: rgba(217, 119, 6, 0.05);
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .stock-out {
    font-size: 10px;
    color: #ef4444;
    margin-left: 4px;
  }
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-right: 16px;

  button {
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    font-size: 18px;
    cursor: pointer;

    &:hover {
      background: #f3f4f6;
    }
  }

  span {
    width: 48px;
    text-align: center;
    font-size: 16px;
  }
}

.stock-info {
  font-size: 13px;
  color: #9ca3af;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 32px;

  button {
    padding: 14px 32px;
    border-radius: 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
}

.btn-cart {
  background: white;
  border: 2px solid #d97706;
  color: #d97706;

  &:hover {
    background: #fef3c7;
  }
}

.btn-buy {
  background: linear-gradient(135deg, #d97706, #b45309);
  border: none;
  color: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
  }
}

.btn-favorite {
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  color: #666;

  &.active {
    background: #fee2e2;
    border-color: #ef4444;
    color: #ef4444;
  }
}

.detail-tabs {
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

.tab-header {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tab-item {
  padding: 16px 32px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  border-bottom: 2px solid transparent;

  &:hover {
    color: #d97706;
  }

  &.active {
    color: #d97706;
    border-bottom-color: #d97706;
  }
}

.tab-content {
  padding: 32px;
}

.params-table {
  max-width: 600px;
}

.param-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.param-label {
  width: 100px;
  color: #9ca3af;
  font-size: 14px;
}

.param-value {
  flex: 1;
  color: #374151;
  font-size: 14px;
}

.detail-images {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.detail-image {
  background: #f9fafb;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 16px;
  border-radius: 8px;
}

.review-summary {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.score-num {
  font-size: 48px;
  font-weight: 700;
  color: #ef4444;
  margin-right: 8px;
}

.score-label {
  font-size: 14px;
  color: #9ca3af;
  display: block;
}

.stars {
  font-size: 24px;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #f3f4f6;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.reviewer {
  font-size: 14px;
  color: #374151;
}

.review-date {
  font-size: 12px;
  color: #9ca3af;
}

.review-stars {
  margin-bottom: 8px;
  font-size: 14px;
}

.review-content {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
}

.review-spec {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 8px;
}

.creator-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  text-decoration: none;
}

.creator-avatar-lg {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #1e3a5f, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 700;
  flex-shrink: 0;
}

.creator-detail {
  flex: 1;

  h3 {
    font-size: 18px;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
  }
}

.creator-stats {
  display: flex;
  gap: 24px;
  font-size: 13px;
  color: #9ca3af;
}

.btn-follow {
  padding: 10px 24px;
  background: #d97706;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.cart-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 16px;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
</style>
