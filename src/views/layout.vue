<template>
  <div class="app-layout">
    <!-- 侧边导航 -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo-icon">
          <span>🏺</span>
        </div>
        <h1 class="logo-text">Creator Studio</h1>
      </div>

      <nav class="sidebar-nav">
        <button
          class="nav-item active"
          onclick="window.location.href='/'"
        >
          <span class="nav-item-indicator"></span>
          <span class="nav-icon">📊</span>
          <span class="nav-label">仪表盘</span>
        </button>
        <button
          class="nav-item"
          onclick="window.location.href='/works'"
        >
          <span class="nav-icon">🎨</span>
          <span class="nav-label">作品库</span>
        </button>
        <button
          class="nav-item"
          onclick="window.location.href='/orders'"
        >
          <span class="nav-icon">📦</span>
          <span class="nav-label">订单中心</span>
        </button>
        <button
          class="nav-item"
          onclick="window.location.href='/finance'"
        >
          <span class="nav-icon">💰</span>
          <span class="nav-label">资金财务</span>
        </button>
        <button
          class="nav-item"
          onclick="window.location.href='/analytics'"
        >
          <span class="nav-icon">📈</span>
          <span class="nav-label">数据报表</span>
        </button>
        <button
          class="nav-item"
          onclick="window.location.href='/profile'"
        >
          <span class="nav-icon">⚙️</span>
          <span class="nav-label">账户设置</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <div class="storage-card">
          <p class="storage-label">Pro Plan</p>
          <div class="storage-bar">
            <div class="storage-progress" style="width: 75%"></div>
          </div>
          <p class="storage-hint">已使用 75% 存储空间</p>
        </div>
      </div>
    </aside>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 顶部通栏 -->
      <header class="topbar">
        <div class="topbar-title">
          <span class="title-greeting">早安，张大师 👋</span>
        </div>

        <div class="topbar-actions">
          <div class="topbar-icon-btn">🔍</div>
          <div class="topbar-icon-btn notification">
            <span class="notification-dot"></span>
            🔔
          </div>
          <div class="topbar-divider"></div>
          <div class="user-dropdown">
            <div class="user-avatar">张</div>
            <div class="user-info">
              <p class="user-name">张三丰</p>
              <p class="user-role">Pro Member</p>
            </div>
            <span class="dropdown-arrow">▼</span>
          </div>
        </div>
      </header>

      <!-- 内容滚动区 -->
      <div class="content-scroll">
        <div class="content-wrapper">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 布局组件
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background: #F1F5F9;
}

// 侧边导航
.sidebar {
  width: 256px;
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  z-index: 20;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.02);

  &-header {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid #F1F5F9;
  }

  &-nav {
    flex: 1;
    padding: 24px 12px;
    overflow-y: auto;
  }

  &-footer {
    padding: 16px;
    border-top: 1px solid #F1F5F9;
  }
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-right: 12px;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
  font-size: 18px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
}

.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 4px;
  color: #64748B;

  &:hover {
    background: #F1F5F9;
    color: #0F172A;
  }

  &.active {
    background: #FEF3C7;
    color: #d97706;
    font-weight: 600;
  }

  &-indicator {
    position: absolute;
    left: 0;
    width: 3px;
    height: 24px;
    background: #d97706;
    border-radius: 0 4px 4px 0;
  }
}

.nav-icon {
  margin-right: 12px;
  font-size: 18px;
}

.nav-label {
  font-size: 14px;
}

.storage-card {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 16px;
}

.storage-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.storage-bar {
  width: 100%;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.storage-progress {
  height: 100%;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-radius: 3px;
}

.storage-hint {
  font-size: 10px;
  color: #94A3B8;
}

// 主内容区
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

// 顶部通栏
.topbar {
  height: 64px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 10;

  &-title {
    font-size: 18px;
    font-weight: 600;
    color: #0F172A;
    display: flex;
    align-items: center;
  }

  &-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &-icon-btn {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    color: #94A3B8;
    transition: all 0.2s ease;
    font-size: 18px;

    &:hover {
      background: #FEF3C7;
      color: #d97706;
    }

    &.notification {
      position: relative;
    }
  }

  &-divider {
    width: 1px;
    height: 32px;
    background: #E2E8F0;
    margin: 0 8px;
  }
}

.notification-dot {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  background: #EF4444;
  border-radius: 50%;
  border: 2px solid white;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #F1F5F9;
  }
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
}

.user-info {
  text-align: left;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  line-height: 1.2;
}

.user-role {
  font-size: 10px;
  color: #94A3B8;
}

.dropdown-arrow {
  color: #94A3B8;
  font-size: 10px;
}

// 内容滚动区
.content-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
  scroll-behavior: smooth;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.title-greeting {
  font-weight: 600;
}
</style>
