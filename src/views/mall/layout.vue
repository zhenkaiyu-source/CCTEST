<template>
  <div class="mall-layout">
    <!-- 顶部导航 -->
    <header class="mall-header">
      <div class="header-container">
        <router-link to="/" class="logo">
          <span class="logo-icon">🏺</span>
          <span class="logo-text">瓷韵</span>
        </router-link>

        <nav class="header-nav">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">首页</router-link>
          <router-link to="/works" class="nav-link" :class="{ active: $route.path.startsWith('/works') }">作品</router-link>
          <router-link to="/creators" class="nav-link" :class="{ active: $route.path.startsWith('/creators') }">艺术家</router-link>
        </nav>

        <div class="header-search">
          <input
            type="text"
            v-model="searchKeyword"
            placeholder="搜索作品、艺术家..."
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">🔍</button>
        </div>

        <div class="header-actions">
          <router-link to="/cart" class="action-btn cart-btn">
            🛒
            <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
          </router-link>
          <template v-if="isLoggedIn">
            <router-link to="/user" class="action-btn user-btn">
              👤
            </router-link>
          </template>
          <template v-else>
            <router-link to="/login" class="action-btn">登录</router-link>
            <router-link to="/register" class="action-btn register-btn">注册</router-link>
          </template>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="mall-main">
      <router-view />
    </main>

    <!-- 底部 -->
    <footer class="mall-footer">
      <div class="footer-container">
        <div class="footer-section">
          <h4>关于瓷韵</h4>
          <p>传承千年陶瓷文化，连接艺术家与收藏家</p>
        </div>
        <div class="footer-section">
          <h4>帮助中心</h4>
          <a href="#">购买指南</a>
          <a href="#">配送说明</a>
          <a href="#">售后服务</a>
        </div>
        <div class="footer-section">
          <h4>联系我们</h4>
          <p>客服热线：400-888-8888</p>
          <p>工作时间：9:00-18:00</p>
        </div>
        <div class="footer-section">
          <h4>关注我们</h4>
          <div class="social-links">
            <span>📱</span>
            <span>💬</span>
            <span>📧</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 瓷韵 · 陶瓷手作平台 版权所有</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchKeyword = ref('')
const cartCount = ref(0)

const isLoggedIn = computed(() => {
  return !!localStorage.getItem('ceramics_token')
})

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({ path: '/works', query: { keyword: searchKeyword.value } })
  }
}

onMounted(() => {
  // 计算购物车数量
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  cartCount.value = cart.reduce((sum, item) => sum + item.quantity, 0)
})
</script>

<style lang="scss" scoped>
.mall-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.mall-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;

  .logo-icon {
    font-size: 32px;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 700;
    color: #1a1a2e;
  }
}

.header-nav {
  display: flex;
  gap: 32px;

  .nav-link {
    font-size: 15px;
    color: #666;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s;
    padding: 8px 0;

    &:hover,
    &.active {
      color: #d97706;
    }

    &.active {
      border-bottom: 2px solid #d97706;
    }
  }
}

.header-search {
  flex: 1;
  max-width: 400px;
  display: flex;
  border: 2px solid #e5e7eb;
  border-radius: 24px;
  overflow: hidden;

  input {
    flex: 1;
    border: none;
    padding: 10px 16px;
    font-size: 14px;
    outline: none;
  }

  .search-btn {
    background: #d97706;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 16px;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;

  .action-btn {
    font-size: 14px;
    color: #666;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s;
    position: relative;

    &:hover {
      background: #f3f4f6;
    }

    &.cart-btn {
      font-size: 20px;
    }

    &.register-btn {
      background: #d97706;
      color: white;

      &:hover {
        background: #b45309;
      }
    }
  }

  .cart-badge {
    position: absolute;
    top: 0;
    right: 0;
    background: #ef4444;
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
    min-width: 16px;
    text-align: center;
  }
}

.mall-main {
  flex: 1;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 0 24px;
}

.mall-footer {
  background: #1a1a2e;
  color: white;
  margin-top: 60px;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.footer-section {
  h4 {
    font-size: 16px;
    margin-bottom: 20px;
    color: #f59e0b;
  }

  p {
    color: #9ca3af;
    font-size: 14px;
    line-height: 1.8;
  }

  a {
    display: block;
    color: #9ca3af;
    font-size: 14px;
    text-decoration: none;
    line-height: 2;
    transition: color 0.2s;

    &:hover {
      color: #f59e0b;
    }
  }

  .social-links {
    display: flex;
    gap: 16px;
    font-size: 24px;
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 20px;

  p {
    color: #6b7280;
    font-size: 13px;
  }
}
</style>
