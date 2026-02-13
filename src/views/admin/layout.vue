<template>
  <div class="admin-layout">
    <!-- 侧边导航 -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="logo-icon">🏺</div>
        <h1 class="logo-text">管理后台</h1>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="admin-info">
          <div class="admin-avatar">管</div>
          <div class="admin-detail">
            <p class="admin-name">{{ adminName }}</p>
            <p class="admin-role">{{ adminRole }}</p>
          </div>
        </div>
        <button class="logout-btn" @click="handleLogout">退出</button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="admin-main">
      <header class="admin-topbar">
        <div class="breadcrumb">
          <span v-for="(crumb, index) in breadcrumbs" :key="index">
            {{ crumb }}
            <span v-if="index < breadcrumbs.length - 1" class="separator">/</span>
          </span>
        </div>
        <div class="topbar-actions">
          <span class="current-time">{{ currentTime }}</span>
        </div>
      </header>

      <div class="admin-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentTime = ref('')
let timer = null

const menuItems = [
  { path: '/admin', label: '数据概览', icon: '📊' },
  { path: '/admin/artists', label: '艺术家管理', icon: '👨‍🎨' },
  { path: '/admin/works', label: '作品管理', icon: '🎨' },
  { path: '/admin/orders', label: '订单管理', icon: '📦' },
  { path: '/admin/finance', label: '财务管理', icon: '💰' },
  { path: '/admin/analytics', label: '数据分析', icon: '📈' },
  { path: '/admin/settings', label: '系统设置', icon: '⚙️' }
]

const adminName = computed(() => {
  const user = JSON.parse(localStorage.getItem('admin_user') || '{}')
  return user.name || '管理员'
})

const adminRole = computed(() => {
  const user = JSON.parse(localStorage.getItem('admin_user') || '{}')
  const roles = {
    super_admin: '超级管理员',
    ops_admin: '运营管理员',
    finance_admin: '财务管理员',
    support: '客服人员'
  }
  return roles[user.role] || '管理员'
})

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  const labels = {
    admin: '首页',
    artists: '艺术家管理',
    works: '作品管理',
    orders: '订单管理',
    finance: '财务管理',
    analytics: '数据分析',
    settings: '系统设置'
  }
  return paths.map(p => labels[p] || p)
})

const isActive = (path) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLogout = () => {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
  router.push('/admin/login')
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}

.admin-sidebar {
  width: 240px;
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  &-header {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  &-nav {
    flex: 1;
    padding: 16px 12px;
    overflow-y: auto;
  }

  &-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 4px;
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }

  &.active {
    background: linear-gradient(90deg, rgba(245, 158, 11, 0.2), transparent);
    color: #f59e0b;

    .nav-icon {
      background: rgba(245, 158, 11, 0.2);
    }
  }
}

.nav-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 16px;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
}

.admin-info {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.admin-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin-right: 12px;
}

.admin-detail {
  flex: 1;
}

.admin-name {
  font-size: 13px;
  color: white;
  font-weight: 500;
}

.admin-role {
  font-size: 11px;
  color: #64748b;
}

.logout-btn {
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #94a3b8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #ef4444;
  }
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-topbar {
  height: 64px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
}

.breadcrumb {
  font-size: 14px;
  color: #64748b;

  .separator {
    margin: 0 8px;
    color: #cbd5e1;
  }

  span:last-child {
    color: #0f172a;
    font-weight: 500;
  }
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.current-time {
  font-size: 13px;
  color: #64748b;
}

.admin-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
</style>
