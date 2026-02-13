<template>
  <div class="creator-profile">
    <div class="profile-header" :style="{ background: creator.coverGradient }">
      <router-link to="/creators" class="back-link">← 返回艺术家</router-link>
      <div class="header-content">
        <div class="creator-avatar">{{ creator.avatar }}</div>
        <div class="creator-info">
          <h1>{{ creator.name }}</h1>
          <p class="creator-tag">{{ creator.tag }}</p>
          <p class="creator-intro">{{ creator.intro }}</p>
          <div class="creator-stats">
            <span>🎨 {{ creator.worksCount }} 作品</span>
            <span>💰 {{ creator.salesCount }} 销量</span>
            <span>❤️ {{ creator.fansCount }} 粉丝</span>
          </div>
        </div>
        <button class="btn-follow" :class="{ following: isFollowing }">
          {{ isFollowing ? '已关注' : '+ 关注' }}
        </button>
      </div>
    </div>

    <div class="profile-tabs">
      <span
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </span>
    </div>

    <div class="tab-content">
      <div v-if="activeTab === 'works'" class="works-grid">
        <router-link
          v-for="work in works"
          :key="work.id"
          :to="`/works/${work.id}`"
          class="work-card"
        >
          <div class="work-image" :style="{ background: work.imageGradient }">
            <span class="work-emoji">{{ work.emoji }}</span>
            <span v-if="work.sales > 500" class="hot-tag">🔥</span>
          </div>
          <div class="work-info">
            <h4>{{ work.title }}</h4>
            <p class="work-price">¥{{ work.price }}</p>
            <p class="work-sales">已售 {{ work.sales }}</p>
          </div>
        </router-link>
      </div>

      <div v-if="activeTab === 'about'" class="about-content">
        <div class="about-card">
          <h3>关于艺术家</h3>
          <p>{{ creator.intro }}</p>
          <p>从业二十余年，专注于传统陶瓷工艺的传承与创新。作品多次获得国家级奖项，深受收藏爱好者喜爱。</p>
        </div>
        <div class="about-card">
          <h3>资质认证</h3>
          <div class="cert-list">
            <div class="cert-item">✅ 非物质文化遗产传承人</div>
            <div class="cert-item">✅ 景德镇陶瓷协会会员</div>
            <div class="cert-item">✅ 作品获得省级工艺美术大赛金奖</div>
          </div>
        </div>
        <div class="about-card">
          <h3>联系方式</h3>
          <p>📍 工作室：江西省景德镇市珠山区</p>
          <p>📞 联系电话：138-0000-0000</p>
        </div>
      </div>

      <div v-if="activeTab === 'reviews'" class="reviews-content">
        <div v-for="review in reviews" :key="review.id" class="review-item">
          <div class="review-header">
            <span class="reviewer">{{ review.userName }}</span>
            <span class="review-time">{{ review.date }}</span>
          </div>
          <div class="review-stars">
            <span v-for="i in 5" :key="i">⭐</span>
          </div>
          <p class="review-content">{{ review.content }}</p>
          <p class="review-work">购买作品：{{ review.workTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isFollowing = ref(false)
const activeTab = ref('works')

const tabs = [
  { value: 'works', label: '作品' },
  { value: 'about', label: '关于' },
  { value: 'reviews', label: '评价' }
]

const creator = ref({
  id: '1',
  name: '景德镇青花斋',
  tag: '非遗传承人',
  avatar: '景',
  intro: '专注青花瓷创作二十余年，传承千年陶瓷文化',
  worksCount: 128,
  salesCount: 3560,
  fansCount: 12580,
  coverGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)'
})

const works = [
  { id: '1', title: '青花茶具套装-事事如意', price: 1280, sales: 856, emoji: '🍵', imageGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)' },
  { id: '2', title: '青花笔筒-雅致', price: 288, sales: 356, emoji: '🖊️', imageGradient: 'linear-gradient(135deg, #60a5fa, #93c5fd)' },
  { id: '3', title: '茶宠-貔貅', price: 360, sales: 398, emoji: '🦄', imageGradient: 'linear-gradient(135deg, #f87171, #fca5a5)' },
  { id: '4', title: '青花瓷板画-山水', price: 5680, sales: 156, emoji: '🖼️', imageGradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
  { id: '5', title: '茶碗套装-雨后天青', price: 1680, sales: 423, emoji: '🥣', imageGradient: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' },
  { id: '6', title: '香薰炉-雅韵', price: 520, sales: 289, emoji: '🌸', imageGradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }
]

const reviews = [
  { id: 1, userName: '艺术品收藏家', date: '2024-01-15', content: '包装很好，没有破损。陶瓷质感很棒，青花图案精美，非常满意！', workTitle: '青花茶具套装-事事如意' },
  { id: 2, userName: '茶道爱好者', date: '2024-01-12', content: '品质不错，送人很有面子', workTitle: '青花笔筒-雅致' },
  { id: 3, userName: '家居达人', date: '2024-01-10', content: '摆在家里很有格调，朋友都问在哪买的', workTitle: '茶宠-貔貅' }
]
</script>

<style lang="scss" scoped>
.creator-profile {
  margin: -24px;
}

.profile-header {
  padding: 48px 24px;
  position: relative;
}

.back-link {
  position: absolute;
  top: 24px;
  left: 24px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 32px;
}

.creator-avatar {
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: #1e3a5f;
  flex-shrink: 0;
}

.creator-info {
  flex: 1;
  color: white;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }
}

.creator-tag {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 12px;
}

.creator-intro {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 16px;
  max-width: 500px;
}

.creator-stats {
  display: flex;
  gap: 24px;
  font-size: 14px;
}

.btn-follow {
  padding: 12px 32px;
  background: white;
  color: #1e3a5f;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &.following {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
}

.profile-tabs {
  display: flex;
  background: white;
  padding: 0 24px;
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
  padding: 32px 24px;
}

.works-grid {
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

.hot-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 16px;
}

.work-info {
  padding: 12px;

  h4 {
    font-size: 13px;
    color: #1a1a2e;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .work-price {
    font-size: 16px;
    font-weight: 700;
    color: #ef4444;
    margin-bottom: 4px;
  }

  .work-sales {
    font-size: 11px;
    color: #9ca3af;
  }
}

.about-content {
  max-width: 800px;
}

.about-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    color: #666;
    line-height: 1.8;
    margin-bottom: 8px;
  }
}

.cert-list {
  .cert-item {
    padding: 8px 0;
    font-size: 14px;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
    }
  }
}

.reviews-content {
  max-width: 800px;
}

.review-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.reviewer {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.review-time {
  font-size: 12px;
  color: #9ca3af;
}

.review-stars {
  font-size: 14px;
  margin-bottom: 12px;
}

.review-content {
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  margin-bottom: 8px;
}

.review-work {
  font-size: 12px;
  color: #9ca3af;
}
</style>
