<template>
  <div class="user-center">
    <div class="user-header">
      <div class="user-avatar">
        <span>用</span>
      </div>
      <div class="user-info">
        <h2>用户昵称</h2>
        <p class="user-level">⭐ 普通会员</p>
      </div>
      <router-link to="/creator/dashboard" class="creator-entry">
        进入创造者中心 →
      </router-link>
    </div>

    <!-- 资产卡片 -->
    <div class="asset-card">
      <div class="asset-row">
        <div class="asset-item">
          <span class="asset-icon">🎫</span>
          <div class="asset-info">
            <span class="asset-num">5</span>
            <span class="asset-label">优惠券</span>
          </div>
        </div>
        <div class="asset-item">
          <span class="asset-icon">💎</span>
          <div class="asset-info">
            <span class="asset-num">560</span>
            <span class="asset-label">积分</span>
          </div>
        </div>
        <div class="asset-item">
          <span class="asset-icon">💰</span>
          <div class="asset-info">
            <span class="asset-num">¥128</span>
            <span class="asset-label">余额</span>
          </div>
        </div>
        <div class="asset-item">
          <span class="asset-icon">🎁</span>
          <div class="asset-info">
            <span class="asset-num">2</span>
            <span class="asset-label">礼品卡</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 订单快捷入口 -->
    <div class="order-section">
      <div class="section-header">
        <h3>📦 我的订单</h3>
        <router-link to="/orders" class="more-link">全部订单 →</router-link>
      </div>
      <div class="order-tabs">
        <router-link
          v-for="tab in orderTabs"
          :key="tab.value"
          :to="tab.value === 'all' ? '/orders' : `/orders?status=${tab.value}`"
          class="order-tab"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
          <span class="tab-count" v-if="tab.count">{{ tab.count }}</span>
        </router-link>
      </div>
    </div>

    <!-- 快捷功能 -->
    <div class="quick-section">
      <h3>🔧 常用功能</h3>
      <div class="quick-grid">
        <router-link to="/user/addresses" class="quick-item">
          <span class="quick-icon">📍</span>
          <span class="quick-name">收货地址</span>
        </router-link>
        <router-link to="/user/favorites" class="quick-item">
          <span class="quick-icon">❤️</span>
          <span class="quick-name">我的收藏</span>
        </router-link>
        <router-link to="/messages" class="quick-item">
          <span class="quick-icon">🔔</span>
          <span class="quick-name">消息通知</span>
        </router-link>
        <router-link to="#" class="quick-item">
          <span class="quick-icon">📝</span>
          <span class="quick-name">我的评价</span>
        </router-link>
      </div>
    </div>

    <!-- 更多服务 -->
    <div class="service-section">
      <h3>📱 更多服务</h3>
      <div class="service-list">
        <div class="service-item" @click="showSettings = true">
          <span class="service-icon">⚙️</span>
          <span class="service-name">设置</span>
          <span class="service-arrow">→</span>
        </div>
        <div class="service-item" @click="showHelp = true">
          <span class="service-icon">❓</span>
          <span class="service-name">帮助中心</span>
          <span class="service-arrow">→</span>
        </div>
        <div class="service-item" @click="showAbout = true">
          <span class="service-icon">ℹ️</span>
          <span class="service-name">关于我们</span>
          <span class="service-arrow">→</span>
        </div>
        <div class="service-item logout" @click="handleLogout">
          <span class="service-icon">🚪</span>
          <span class="service-name">退出登录</span>
          <span class="service-arrow">→</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showSettings = ref(false)
const showHelp = ref(false)
const showAbout = ref(false)

const orderTabs = [
  { icon: '💳', label: '待付款', value: 'pending', count: 1 },
  { icon: '📦', label: '待发货', value: 'paid', count: 0 },
  { icon: '🚚', label: '待收货', value: 'shipped', count: 1 },
  { icon: '⭐', label: '待评价', value: 'review', count: 2 },
  { icon: '🔧', label: '售后', value: 'refund', count: 0 }
]

const handleLogout = () => {
  if (confirm('确定退出登录？')) {
    localStorage.removeItem('ceramics_token')
    localStorage.removeItem('ceramics_user')
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.user-center {
  padding: 24px 0;
}

.user-header {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #d97706, #b45309);
  border-radius: 16px;
  padding: 32px;
  color: white;
  margin-bottom: 24px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  span {
    font-size: 32px;
    font-weight: 700;
  }
}

.user-info {
  flex: 1;

  h2 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .user-level {
    font-size: 14px;
    opacity: 0.9;
  }
}

.creator-entry {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
}

.asset-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.asset-row {
  display: flex;
  justify-content: space-around;
}

.asset-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.asset-icon {
  font-size: 32px;
}

.asset-info {
  display: flex;
  flex-direction: column;
}

.asset-num {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
}

.asset-label {
  font-size: 12px;
  color: #9ca3af;
}

.order-section,
.quick-section,
.service-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a2e;
  }
}

.more-link {
  font-size: 14px;
  color: #d97706;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.order-tabs {
  display: flex;
  justify-content: space-around;
}

.order-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: #f9fafb;
  }
}

.tab-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.tab-label {
  font-size: 13px;
  color: #666;
}

.tab-count {
  font-size: 11px;
  color: #ef4444;
  margin-top: 4px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #fef3c7;
  }
}

.quick-icon {
  font-size: 28px;
  margin-bottom: 8px;
}

.quick-name {
  font-size: 13px;
  color: #374151;
}

.service-list {
  .service-item {
    display: flex;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      .service-arrow {
        color: #d97706;
      }
    }

    &.logout:hover {
      .service-name {
        color: #ef4444;
      }
    }
  }
}

.service-icon {
  font-size: 20px;
  margin-right: 12px;
}

.service-name {
  flex: 1;
  font-size: 15px;
  color: #1a1a2e;
}

.service-arrow {
  color: #9ca3af;
  font-size: 14px;
}

.service-item.logout .service-name {
  color: #ef4444;
}
</style>
