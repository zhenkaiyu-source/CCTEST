<template>
  <div class="creators-page">
    <h2 class="page-title">👨‍🎨 艺术家</h2>

    <div class="creators-grid">
      <router-link
        v-for="creator in creators"
        :key="creator.id"
        :to="`/creators/${creator.id}`"
        class="creator-card"
      >
        <div class="creator-cover" :style="{ background: creator.coverGradient }">
          <div class="creator-avatar">{{ creator.avatar }}</div>
        </div>
        <div class="creator-info">
          <h3>{{ creator.name }}</h3>
          <p class="creator-tag">{{ creator.tag }}</p>
          <p class="creator-intro">{{ creator.intro }}</p>
          <div class="creator-stats">
            <span>🎨 {{ creator.worksCount }} 作品</span>
            <span>💰 {{ creator.salesCount }} 销量</span>
            <span>❤️ {{ creator.fansCount }} 粉丝</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const creators = [
  {
    id: '1',
    name: '景德镇青花斋',
    tag: '非遗传承人',
    avatar: '景',
    intro: '专注青花瓷创作二十余年，传承千年陶瓷文化',
    worksCount: 128,
    salesCount: 3560,
    fansCount: 12580,
    coverGradient: 'linear-gradient(135deg, #1e3a5f, #3b82f6)'
  },
  {
    id: '2',
    name: '紫砂王工作室',
    tag: '紫砂名家',
    avatar: '紫',
    intro: '宜兴紫砂技艺传承，专注紫砂壶创作',
    worksCount: 86,
    salesCount: 2890,
    fansCount: 8920,
    coverGradient: 'linear-gradient(135deg, #7c3aed, #a855f7)'
  },
  {
    id: '3',
    name: '龙泉青瓷坊',
    tag: '龙泉窑嫡传',
    avatar: '龙',
    intro: '龙泉青瓷非遗传承，千年窑火生生不息',
    worksCount: 64,
    salesCount: 1980,
    fansCount: 6780,
    coverGradient: 'linear-gradient(135deg, #059669, #10b981)'
  },
  {
    id: '4',
    name: '德化白瓷轩',
    tag: '白瓷艺术家',
    avatar: '德',
    intro: '德化白瓷世家，传承千年白瓷工艺',
    worksCount: 52,
    salesCount: 1560,
    fansCount: 4560,
    coverGradient: 'linear-gradient(135deg, #64748b, #94a3b8)'
  },
  {
    id: '5',
    name: '醴陵釉下彩',
    tag: '釉下彩专家',
    avatar: '醴',
    intro: '湖南醴陵釉下彩瓷，色彩鲜艳，永不褪色',
    worksCount: 78,
    salesCount: 2100,
    fansCount: 5340,
    coverGradient: 'linear-gradient(135deg, #ef4444, #f87171)'
  },
  {
    id: '6',
    name: '建盏天目窑',
    tag: '建盏匠人',
    avatar: '建',
    intro: '专注建盏烧制，再现宋代建盏神韵',
    worksCount: 45,
    salesCount: 980,
    fansCount: 3240,
    coverGradient: 'linear-gradient(135deg, #92400e, #d97706)'
  }
]
</script>

<style lang="scss" scoped>
.creators-page {
  padding: 24px 0;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 24px;
}

.creators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.creator-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }
}

.creator-cover {
  height: 100px;
  position: relative;
}

.creator-avatar {
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  position: absolute;
  bottom: -32px;
  left: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.creator-info {
  padding: 44px 24px 24px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
    margin-bottom: 4px;
  }
}

.creator-tag {
  font-size: 13px;
  color: #d97706;
  margin-bottom: 8px;
}

.creator-intro {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
  height: 42px;
  overflow: hidden;
}

.creator-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #9ca3af;
}
</style>
