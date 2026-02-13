<template>
  <div class="mall-home">
    <!-- 轮播图 -->
    <section class="banner-section">
      <div class="banner-swiper">
        <div
          v-for="(banner, index) in banners"
          :key="index"
          class="banner-item"
          :class="{ active: currentBanner === index }"
          @click="currentBanner = index"
        >
          <div class="banner-content" :style="{ background: banner.gradient }">
            <div class="banner-text">
              <h2>{{ banner.title }}</h2>
              <p>{{ banner.subtitle }}</p>
              <router-link :to="banner.link" class="banner-btn">{{ banner.btnText }}</router-link>
            </div>
            <div class="banner-image">{{ banner.emoji }}</div>
          </div>
        </div>
      </div>
      <div class="banner-dots">
        <span
          v-for="(banner, index) in banners"
          :key="index"
          class="dot"
          :class="{ active: currentBanner === index }"
          @click="currentBanner = index"
        ></span>
      </div>
    </section>

    <!-- 分类入口 -->
    <section class="category-section">
      <div class="category-grid">
        <router-link
          v-for="cat in categories"
          :key="cat.name"
          :to="`/works?category=${cat.name}`"
          class="category-item"
        >
          <span class="category-icon">{{ cat.icon }}</span>
          <span class="category-name">{{ cat.name }}</span>
        </router-link>
      </div>
    </section>

    <!-- 推荐艺术家 -->
    <section class="section">
      <div class="section-header">
        <h2>👨‍🎨 推荐艺术家</h2>
        <router-link to="/creators" class="more-link">查看更多 →</router-link>
      </div>
      <div class="creator-grid">
        <router-link
          v-for="creator in recommendCreators"
          :key="creator.id"
          :to="`/creators/${creator.id}`"
          class="creator-card"
        >
          <div class="creator-cover" :style="{ background: creator.coverGradient }">
            <div class="creator-avatar">{{ creator.avatar }}</div>
          </div>
          <div class="creator-info">
            <h4>{{ creator.name }}</h4>
            <p class="creator-tag">{{ creator.tag }}</p>
            <div class="creator-stats">
              <span>作品 {{ creator.worksCount }}</span>
              <span>销量 {{ creator.salesCount }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 新品首发 -->
    <section class="section">
      <div class="section-header">
        <h2>🆕 新品首发</h2>
        <router-link to="/works?sort=newest" class="more-link">查看更多 →</router-link>
      </div>
      <div class="waterfall-grid">
        <router-link
          v-for="work in newWorks"
          :key="work.id"
          :to="`/works/${work.id}`"
          class="work-card"
        >
          <div class="work-image" :style="{ background: work.imageGradient }">
            <span class="work-emoji">{{ work.emoji }}</span>
            <span v-if="work.isNew" class="new-tag">新品</span>
          </div>
          <div class="work-info">
            <h4>{{ work.title }}</h4>
            <p class="work-creator">{{ work.creatorName }}</p>
            <div class="work-price">
              <span class="price">¥{{ work.price }}</span>
              <span class="sales">销量 {{ work.sales }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 热销排行 -->
    <section class="section">
      <div class="section-header">
        <h2>📈 热销排行</h2>
        <router-link to="/works?sort=sales" class="more-link">查看更多 →</router-link>
      </div>
      <div class="rank-list">
        <router-link
          v-for="(work, index) in hotWorks"
          :key="work.id"
          :to="`/works/${work.id}`"
          class="rank-item"
        >
          <span class="rank-num" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
          <div class="rank-image" :style="{ background: work.imageGradient }">
            <span class="work-emoji">{{ work.emoji }}</span>
          </div>
          <div class="rank-info">
            <h4>{{ work.title }}</h4>
            <p class="rank-creator">{{ work.creatorName }}</p>
            <div class="rank-price">
              <span class="price">¥{{ work.price }}</span>
              <span class="sales">已售 {{ work.sales }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 今日特价 -->
    <section class="section special-section">
      <div class="section-header">
        <h2>🎁 今日特价</h2>
        <span class="countdown">距结束：{{ countdown }}</span>
      </div>
      <div class="special-grid">
        <router-link
          v-for="work in specialWorks"
          :key="work.id"
          :to="`/works/${work.id}`"
          class="special-card"
        >
          <div class="special-image" :style="{ background: work.imageGradient }">
            <span class="work-emoji">{{ work.emoji }}</span>
            <span class="discount-tag">{{ work.discount }}折</span>
          </div>
          <div class="special-info">
            <h4>{{ work.title }}</h4>
            <div class="special-price">
              <span class="current">¥{{ work.price }}</span>
              <span class="original">¥{{ work.originalPrice }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentBanner = ref(0)
const countdown = ref('02:30:45')

const banners = [
  {
    title: '青花瓷 · 传承千年',
    subtitle: '精选景德镇名师手作',
    btnText: '立即选购',
    link: '/works?category=茶具',
    emoji: '🏺',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)'
  },
  {
    title: '新品上架 · 限时优惠',
    subtitle: '首发作品享8折优惠',
    btnText: '抢先体验',
    link: '/works?sort=newest',
    emoji: '🆕',
    gradient: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)'
  },
  {
    title: '艺术家工作室',
    subtitle: '近距离了解陶瓷创作',
    btnText: '探访艺术家',
    link: '/creators',
    emoji: '👨‍🎨',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)'
  }
]

const categories = [
  { name: '茶具', icon: '🍵' },
  { name: '餐具', icon: '🍽️' },
  { name: '花瓶', icon: '🏺' },
  { name: '摆件', icon: '🎨' },
  { name: '装饰画', icon: '🖼️' },
  { name: '香薰', icon: '🌸' },
  { name: '灯具', icon: '💡' },
  { name: '其他', icon: '🎁' }
]

const recommendCreators = [
  {
    id: '1',
    name: '景德镇青花斋',
    tag: '非遗传承人',
    worksCount: 128,
    salesCount: 3560,
    avatar: '景',
    coverGradient: 'linear-gradient(135deg, #1e3a5f, #2d5a87)'
  },
  {
    id: '2',
    name: '紫砂王工作室',
    tag: '紫砂名家',
    worksCount: 86,
    salesCount: 2890,
    avatar: '紫',
    coverGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)'
  },
  {
    id: '3',
    name: '龙泉青瓷坊',
    tag: '龙泉窑嫡传',
    worksCount: 64,
    salesCount: 1980,
    avatar: '龙',
    coverGradient: 'linear-gradient(135deg, #059669, #10b981)'
  },
  {
    id: '4',
    name: '德化白瓷轩',
    tag: '白瓷艺术家',
    worksCount: 52,
    salesCount: 1560,
    avatar: '德',
    coverGradient: 'linear-gradient(135deg, #64748b, #94a3b8)'
  }
]

const newWorks = [
  { id: '1', title: '青花茶具套装-事事如意', creatorName: '景德镇青花斋', price: 1280, sales: 56, emoji: '🍵', imageGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)', isNew: true },
  { id: '2', title: '紫砂壶-西施', creatorName: '紫砂王工作室', price: 2680, sales: 23, emoji: '🫖', imageGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)', isNew: true },
  { id: '3', title: '青瓷花瓶-荷韵', creatorName: '龙泉青瓷坊', price: 880, sales: 45, emoji: '🏺', imageGradient: 'linear-gradient(135deg, #059669, #34d399)', isNew: true },
  { id: '4', title: '白瓷茶碗-雪韵', creatorName: '德化白瓷轩', price: 360, sales: 89, emoji: '🥣', imageGradient: 'linear-gradient(135deg, #e5e7eb, #f9fafb)', isNew: true },
  { id: '5', title: '釉下彩餐具-春晓', creatorName: '景德镇青花斋', price: 1580, sales: 34, emoji: '🍽️', imageGradient: 'linear-gradient(135deg, #ec4899, #f472b6)', isNew: true },
  { id: '6', title: '香薰炉-雅韵', creatorName: '紫砂王工作室', price: 520, sales: 67, emoji: '🌸', imageGradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', isNew: false }
]

const hotWorks = [
  { id: '1', title: '青花茶具套装-事事如意', creatorName: '景德镇青花斋', price: 1280, sales: 856, emoji: '🍵', imageGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)' },
  { id: '2', title: '紫砂壶-石瓢', creatorName: '紫砂王工作室', price: 3280, sales: 623, emoji: '🫖', imageGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
  { id: '3', title: '青瓷餐具-江南', creatorName: '龙泉青瓷坊', price: 2380, sales: 512, emoji: '🍽️', imageGradient: 'linear-gradient(135deg, #059669, #34d399)' },
  { id: '4', title: '白瓷花瓶-雪白', creatorName: '德化白瓷轩', price: 980, sales: 445, emoji: '🏺', imageGradient: 'linear-gradient(135deg, #e5e7eb, #f9fafb)' },
  { id: '5', title: '茶宠-貔貅', creatorName: '景德镇青花斋', price: 360, sales: 398, emoji: '🦄', imageGradient: 'linear-gradient(135deg, #ef4444, #f87171)' }
]

const specialWorks = [
  { id: '1', title: '青花笔筒-雅致', originalPrice: 480, price: 288, discount: 6, emoji: '🖊️', imageGradient: 'linear-gradient(135deg, #1e3a5f, #60a5fa)' },
  { id: '2', title: '小摆件-福猪', originalPrice: 260, price: 156, discount: 6, emoji: '🐷', imageGradient: 'linear-gradient(135deg, #f472b6, #f9a8d4)' },
  { id: '3', title: '茶垫-青莲', originalPrice: 180, price: 108, discount: 6, emoji: '🟣', imageGradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }
]

let timer = null

const updateCountdown = () => {
  const now = new Date()
  const end = new Date()
  end.setHours(24, 0, 0, 0)
  const diff = end - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  countdown.value = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.mall-home {
  padding: 24px 0;
}

// Banner
.banner-section {
  position: relative;
  margin-bottom: 32px;
}

.banner-swiper {
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  height: 360px;
}

.banner-item {
  flex: 1;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.5;
  min-width: 0;

  &.active {
    opacity: 1;
    flex: 3;
  }
}

.banner-content {
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 60px;
  color: white;
}

.banner-text {
  h2 {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    margin-bottom: 24px;
    opacity: 0.9;
  }
}

.banner-btn {
  display: inline-block;
  padding: 12px 32px;
  background: white;
  color: #1a1a2e;
  text-decoration: none;
  border-radius: 24px;
  font-weight: 600;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.banner-image {
  font-size: 160px;
  opacity: 0.9;
}

.banner-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  &.active {
    background: white;
    width: 24px;
    border-radius: 4px;
  }
}

// Category
.category-section {
  margin-bottom: 48px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
}

.category-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  color: #374151;
  font-weight: 500;
}

// Sections
.section {
  margin-bottom: 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
  }
}

.more-link {
  color: #d97706;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

// Creator Grid
.creator-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.creator-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
}

.creator-cover {
  height: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.creator-avatar {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
  position: absolute;
  bottom: -28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.creator-info {
  padding: 36px 16px 16px;
  text-align: center;

  h4 {
    font-size: 16px;
    color: #1a1a2e;
    margin-bottom: 4px;
  }
}

.creator-tag {
  font-size: 12px;
  color: #d97706;
  margin-bottom: 12px;
}

.creator-stats {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  color: #6b7280;
}

// Waterfall
.waterfall-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.work-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.work-image {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.work-emoji {
  font-size: 48px;
}

.new-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
}

.work-info {
  padding: 12px;

  h4 {
    font-size: 13px;
    color: #1a1a2e;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.work-creator {
  font-size: 11px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.work-price {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    font-size: 16px;
    font-weight: 700;
    color: #ef4444;
  }

  .sales {
    font-size: 11px;
    color: #9ca3af;
  }
}

// Rank List
.rank-list {
  display: flex;
  gap: 16px;
  overflow-x: auto;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  min-width: 280px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
}

.rank-num {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #9ca3af;

  &.rank-1 { background: linear-gradient(135deg, #fbbf24, #f59e0b); color: white; }
  &.rank-2 { background: linear-gradient(135deg, #9ca3af, #6b7280); color: white; }
  &.rank-3 { background: linear-gradient(135deg, #f97316, #ea580c); color: white; }
}

.rank-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-info {
  flex: 1;

  h4 {
    font-size: 14px;
    color: #1a1a2e;
    margin-bottom: 2px;
  }
}

.rank-creator {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.rank-price {
  .price {
    font-size: 16px;
    font-weight: 700;
    color: #ef4444;
    margin-right: 8px;
  }

  .sales {
    font-size: 11px;
    color: #9ca3af;
  }
}

// Special Section
.special-section {
  .countdown {
    font-size: 14px;
    color: #ef4444;
    font-weight: 600;
  }
}

.special-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.special-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.special-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.discount-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #ef4444;
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 4px;
}

.special-info {
  padding: 16px;

  h4 {
    font-size: 16px;
    color: #1a1a2e;
    margin-bottom: 12px;
  }
}

.special-price {
  .current {
    font-size: 24px;
    font-weight: 700;
    color: #ef4444;
    margin-right: 12px;
  }

  .original {
    font-size: 14px;
    color: #9ca3af;
    text-decoration: line-through;
  }
}
</style>
