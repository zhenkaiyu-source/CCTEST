<template>
  <div class="work-list-page">
    <!-- 分类筛选项 -->
    <div class="filter-bar">
      <div class="filter-tabs">
        <span
          v-for="cat in categories"
          :key="cat.name"
          class="filter-tab"
          :class="{ active: activeCategory === cat.name }"
          @click="activeCategory = cat.name"
        >
          {{ cat.name }}
        </span>
      </div>
      <div class="sort-options">
        <span
          v-for="sort in sortOptions"
          :key="sort.value"
          class="sort-item"
          :class="{ active: activeSort === sort.value }"
          @click="activeSort = sort.value"
        >
          {{ sort.label }}
        </span>
      </div>
    </div>

    <!-- 作品列表 -->
    <div class="work-grid">
      <router-link
        v-for="work in filteredWorks"
        :key="work.id"
        :to="`/works/${work.id}`"
        class="work-card"
      >
        <div class="work-image" :style="{ background: work.imageGradient }">
          <span class="work-emoji">{{ work.emoji }}</span>
          <span v-if="work.discount" class="discount-tag">{{ work.discount }}折</span>
        </div>
        <div class="work-content">
          <h4 class="work-title">{{ work.title }}</h4>
          <p class="work-creator">{{ work.creatorName }}</p>
          <div class="work-meta">
            <span class="work-price">
              <span class="price">¥{{ work.price }}</span>
              <span v-if="work.originalPrice" class="original">¥{{ work.originalPrice }}</span>
            </span>
            <span class="work-sales">已售 {{ work.sales }}</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- 加载更多 -->
    <div class="load-more">
      <button class="load-btn" @click="loadMore" v-if="hasMore">
        加载更多
      </button>
      <span v-else class="no-more">没有更多了</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeCategory = ref(route.query.category || '全部')
const activeSort = ref('comprehensive')
const page = ref(1)

const categories = [
  { name: '全部' },
  { name: '茶具' },
  { name: '餐具' },
  { name: '花瓶' },
  { name: '摆件' },
  { name: '装饰画' },
  { name: '香薰' },
  { name: '灯具' },
  { name: '其他' }
]

const sortOptions = [
  { label: '综合', value: 'comprehensive' },
  { label: '销量', value: 'sales' },
  { label: '价格↑', value: 'price_asc' },
  { label: '价格↓', value: 'price_desc' },
  { label: '最新', value: 'newest' }
]

const allWorks = [
  { id: '1', title: '青花茶具套装-事事如意', category: '茶具', creatorName: '景德镇青花斋', price: 1280, originalPrice: null, sales: 856, emoji: '🍵', imageGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)' },
  { id: '2', title: '紫砂壶-石瓢', category: '茶具', creatorName: '紫砂王工作室', price: 3280, originalPrice: null, sales: 623, emoji: '🫖', imageGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
  { id: '3', title: '青瓷餐具-江南', category: '餐具', creatorName: '龙泉青瓷坊', price: 2380, originalPrice: null, sales: 512, emoji: '🍽️', imageGradient: 'linear-gradient(135deg, #059669, #34d399)' },
  { id: '4', title: '白瓷花瓶-雪白', category: '花瓶', creatorName: '德化白瓷轩', price: 980, originalPrice: null, sales: 445, emoji: '🏺', imageGradient: 'linear-gradient(135deg, #e5e7eb, #f9fafb)' },
  { id: '5', title: '茶宠-貔貅', category: '摆件', creatorName: '景德镇青花斋', price: 360, originalPrice: null, sales: 398, emoji: '🦄', imageGradient: 'linear-gradient(135deg, #ef4444, #f87171)' },
  { id: '6', title: '青花笔筒-雅致', category: '其他', creatorName: '景德镇青花斋', price: 288, originalPrice: 480, sales: 356, emoji: '🖊️', imageGradient: 'linear-gradient(135deg, #1e3a5f, #60a5fa)', discount: 6 },
  { id: '7', title: '香薰炉-雅韵', category: '香薰', creatorName: '紫砂王工作室', price: 520, originalPrice: null, sales: 289, emoji: '🌸', imageGradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { id: '8', title: '陶瓷台灯-夜明珠', category: '灯具', creatorName: '龙泉青瓷坊', price: 880, originalPrice: null, sales: 234, emoji: '💡', imageGradient: 'linear-gradient(135deg, #fbbf24, #fde68a)' },
  { id: '9', title: '瓷板画-山水', category: '装饰画', creatorName: '景德镇青花斋', price: 5680, originalPrice: null, sales: 156, emoji: '🖼️', imageGradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
  { id: '10', title: '茶碗套装-雨后天青', category: '茶具', creatorName: '龙泉青瓷坊', price: 1680, originalPrice: null, sales: 423, emoji: '🥣', imageGradient: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' },
  { id: '11', title: '小摆件-福猪', category: '摆件', creatorName: '德化白瓷轩', price: 156, originalPrice: 260, sales: 567, emoji: '🐷', imageGradient: 'linear-gradient(135deg, #f472b6, #f9a8d4)', discount: 6 },
  { id: '12', title: '茶垫-青莲', category: '其他', creatorName: '紫砂王工作室', price: 108, originalPrice: 180, sales: 789, emoji: '🟣', imageGradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', discount: 6 }
]

const filteredWorks = computed(() => {
  let result = [...allWorks]

  if (activeCategory.value !== '全部') {
    result = result.filter(w => w.category === activeCategory.value)
  }

  switch (activeSort.value) {
    case 'sales':
      result.sort((a, b) => b.sales - a.sales)
      break
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      result.reverse()
      break
  }

  return result.slice(0, page.value * 12)
})

const hasMore = computed(() => {
  let result = [...allWorks]
  if (activeCategory.value !== '全部') {
    result = result.filter(w => w.category === activeCategory.value)
  }
  return result.length > page.value * 12
})

const loadMore = () => {
  page.value++
}
</script>

<style lang="scss" scoped>
.work-list-page {
  padding: 24px 0;
}

.filter-bar {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 8px 16px;
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
}

.sort-options {
  display: flex;
  gap: 4px;
}

.sort-item {
  padding: 6px 12px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    color: #d97706;
  }

  &.active {
    color: #d97706;
    background: rgba(217, 119, 6, 0.1);
  }
}

.work-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.work-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.work-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.work-emoji {
  font-size: 64px;
}

.discount-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
}

.work-content {
  padding: 16px;
}

.work-title {
  font-size: 14px;
  color: #1a1a2e;
  margin-bottom: 6px;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.work-creator {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 10px;
}

.work-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.work-price {
  .price {
    font-size: 18px;
    font-weight: 700;
    color: #ef4444;
  }

  .original {
    font-size: 12px;
    color: #9ca3af;
    text-decoration: line-through;
    margin-left: 6px;
  }
}

.work-sales {
  font-size: 11px;
  color: #9ca3af;
}

.load-more {
  text-align: center;
  padding: 40px;
}

.load-btn {
  padding: 12px 48px;
  background: white;
  border: 2px solid #d97706;
  color: #d97706;
  border-radius: 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #d97706;
    color: white;
  }
}

.no-more {
  color: #9ca3af;
  font-size: 14px;
}
</style>
