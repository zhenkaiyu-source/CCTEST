<template>
  <div class="favorites-page">
    <div class="page-header">
      <router-link to="/user" class="back-link">← 返回个人中心</router-link>
      <h2>我的收藏</h2>
    </div>

    <div v-if="favorites.length === 0" class="empty-favorites">
      <span class="empty-icon">❤️</span>
      <p>暂无收藏的商品</p>
      <router-link to="/" class="go-shopping">去逛逛</router-link>
    </div>

    <div v-else class="favorites-list">
      <div v-for="item in favorites" :key="item.id" class="favorite-item">
        <router-link :to="`/works/${item.id}`" class="item-image" :style="{ background: item.imageGradient }">
          {{ item.emoji }}
        </router-link>
        <div class="item-info">
          <router-link :to="`/works/${item.id}`" class="item-title">{{ item.title }}</router-link>
          <p class="item-creator">{{ item.creatorName }}</p>
          <div class="item-price">
            <span class="price">¥{{ item.price }}</span>
            <span class="sales">销量 {{ item.sales }}</span>
          </div>
        </div>
        <div class="item-actions">
          <button class="btn-cart" @click="addToCart(item)">加入购物车</button>
          <button class="btn-delete" @click="removeFavorite(item)">取消收藏</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const favorites = ref([])

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (favorites.value.length === 0) {
    favorites.value = [
      { id: '1', title: '青花茶具套装-事事如意', creatorName: '景德镇青花斋', price: 1280, sales: 856, emoji: '🍵', imageGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)' },
      { id: '2', title: '紫砂壶-石瓢', creatorName: '紫砂王工作室', price: 3280, sales: 623, emoji: '🫖', imageGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
      { id: '3', title: '青瓷餐具-江南', creatorName: '龙泉青瓷坊', price: 2380, sales: 512, emoji: '🍽️', imageGradient: 'linear-gradient(135deg, #059669, #10b981)' }
    ]
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
})

const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const existing = cart.find(i => i.id === item.id)
  if (existing) {
    existing.quantity++
  } else {
    cart.push({
      id: item.id,
      title: item.title,
      price: item.price,
      spec: '默认规格',
      quantity: 1,
      emoji: item.emoji,
      creatorName: item.creatorName
    })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  alert('已加入购物车')
}

const removeFavorite = (item) => {
  if (confirm('取消收藏？')) {
    const index = favorites.value.findIndex(f => f.id === item.id)
    if (index > -1) {
      favorites.value.splice(index, 1)
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }
}
</script>

<style lang="scss" scoped>
.favorites-page {
  padding: 24px 0;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;

  .back-link {
    color: #666;
    text-decoration: none;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
  }
}

.empty-favorites {
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

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.favorite-item {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 20px;
  gap: 20px;
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  text-decoration: none;
}

.item-info {
  flex: 1;
}

.item-title {
  font-size: 16px;
  color: #1a1a2e;
  text-decoration: none;
  margin-bottom: 8px;
  display: block;

  &:hover {
    color: #d97706;
  }
}

.item-creator {
  font-size: 13px;
  color: #9ca3af;
  margin-bottom: 12px;
}

.item-price {
  .price {
    font-size: 20px;
    font-weight: 700;
    color: #ef4444;
    margin-right: 16px;
  }

  .sales {
    font-size: 12px;
    color: #9ca3af;
  }
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    padding: 10px 24px;
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }
}

.btn-cart {
  background: #d97706;
  color: white;
  border: none;

  &:hover {
    background: #b45309;
  }
}

.btn-delete {
  background: white;
  color: #9ca3af;
  border: 1px solid #e5e7eb;

  &:hover {
    color: #ef4444;
    border-color: #ef4444;
  }
}
</style>
