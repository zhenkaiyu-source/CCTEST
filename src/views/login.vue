<template>
  <div class="login-page">
    <!-- 抽象背景 -->
    <div class="login-bg">
      <div class="bg-shape shape-1"></div>
      <div class="bg-shape shape-2"></div>
      <div class="bg-shape shape-3"></div>
    </div>

    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo">
            <span>🏺</span>
          </div>
          <h1 class="login-title">瓷韵</h1>
          <p class="login-subtitle">陶瓷手作平台 · 统一登录</p>
        </div>

        <!-- 角色选择 Tabs -->
        <div class="role-tabs">
          <button
            v-for="role in roles"
            :key="role.value"
            class="role-tab"
            :class="{ active: selectedRole === role.value }"
            @click="selectedRole = role.value"
          >
            <span class="role-icon">{{ role.icon }}</span>
            <span class="role-name">{{ role.label }}</span>
          </button>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <!-- 管理员特殊提示 -->
          <div v-if="selectedRole === 'admin'" class="role-notice">
            <span class="notice-icon">⚠️</span>
            <span>管理员专用入口，请使用管理员账号</span>
          </div>

          <div class="form-group">
            <label class="form-label">{{ selectedRole === 'admin' ? '管理员账号' : '手机号码' }}</label>
            <div class="phone-input" v-if="selectedRole !== 'admin'">
              <span class="phone-prefix">+86</span>
              <input
                type="tel"
                class="form-input"
                placeholder="请输入手机号"
                v-model="phone"
              />
            </div>
            <input
              v-else
              type="text"
              class="form-input"
              placeholder="请输入管理员账号"
              v-model="phone"
            />
          </div>

          <div class="form-group">
            <label class="form-label">密码</label>
            <input
              type="password"
              class="form-input"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>

          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="remember" />
              <span>记住我</span>
            </label>
            <button type="button" class="link-btn" v-if="selectedRole !== 'admin'">验证码登录</button>
          </div>

          <p v-if="error" class="error-message">{{ error }}</p>

          <button type="submit" class="submit-btn" :disabled="loading" :style="{ background: selectedRole === 'admin' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '' }">
            {{ loading ? '登录中...' : getLoginBtnText() }}
          </button>

          <div class="divider" v-if="selectedRole !== 'admin'">
            <span>其他方式登录</span>
          </div>

          <button type="button" class="wechat-btn" v-if="selectedRole !== 'admin'" @click="handleWechatLogin">
            <span>💬</span>
            微信快捷登录
          </button>
        </form>

        <!-- 注册链接（仅普通用户和创作者显示） -->
        <p v-if="selectedRole !== 'admin'" class="register-link">
          <template v-if="selectedRole === 'user'">
            还没有账号？ <router-link to="/register">立即注册</router-link>
          </template>
          <template v-else-if="selectedRole === 'creator'">
            还没有创作者账号？ <router-link to="/register?role=creator">申请入驻</router-link>
          </template>
        </p>

        <!-- 默认登录信息 -->
        <div class="default-accounts">
          <p class="default-title">系统演示账号</p>
          <div class="account-list">
            <div class="account-item" @click="selectAccount('user')">
              <span class="account-icon">👤</span>
              <div class="account-info">
                <span class="account-role">普通用户</span>
                <span class="account-credentials">13800138000 / 123456</span>
              </div>
              <span class="account-check" v-if="selectedRole === 'user'">✓</span>
            </div>
            <div class="account-item" @click="selectAccount('creator')">
              <span class="account-icon">🎨</span>
              <div class="account-info">
                <span class="account-role">创作者</span>
                <span class="account-credentials">13800138000 / 123456</span>
              </div>
              <span class="account-check" v-if="selectedRole === 'creator'">✓</span>
            </div>
            <div class="account-item" @click="selectAccount('admin')">
              <span class="account-icon">⚙️</span>
              <div class="account-info">
                <span class="account-role">管理员</span>
                <span class="account-credentials">admin / admin123</span>
              </div>
              <span class="account-check" v-if="selectedRole === 'admin'">✓</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 角色说明卡片 -->
      <div class="role-info">
        <transition name="fade">
          <div v-if="selectedRole === 'user'" class="info-card">
            <h3>👤 普通用户</h3>
            <p>浏览和购买陶瓷作品</p>
            <ul>
              <li>浏览海量陶瓷艺术品</li>
              <li>收藏喜爱的艺术家</li>
              <li>在线下单支付</li>
              <li>查看物流和评价</li>
            </ul>
          </div>
          <div v-else-if="selectedRole === 'creator'" class="info-card">
            <h3>🎨 创作者</h3>
            <p>管理和销售您的陶瓷作品</p>
            <ul>
              <li>上传和管理作品</li>
              <li>处理订单和发货</li>
              <li>查看销售数据</li>
              <li>财务管理提现</li>
            </ul>
          </div>
          <div v-else class="info-card">
            <h3>⚙️ 管理员</h3>
            <p>平台运营管理后台</p>
            <ul>
              <li>艺术家认证审核</li>
              <li>作品管理监控</li>
              <li>订单数据统计</li>
              <li>财务结算管理</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const roles = [
  { value: 'user', label: '普通用户', icon: '👤' },
  { value: 'creator', label: '创作者', icon: '🎨' },
  { value: 'admin', label: '管理员', icon: '⚙️' }
]

// 默认演示账号
const demoAccounts = {
  user: { phone: '13800138000', password: '123456' },
  creator: { phone: '13800138000', password: '123456' },
  admin: { phone: 'admin', password: 'admin123' }
}

const selectedRole = ref('user')
const phone = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const error = ref('')

const getLoginBtnText = () => {
  const texts = {
    user: '登录购买',
    creator: '创作者登录',
    admin: '管理员登录'
  }
  return texts[selectedRole.value]
}

// 选择账号并自动填充
const selectAccount = (role) => {
  selectedRole.value = role
  const account = demoAccounts[role]
  phone.value = account.phone
  password.value = account.password
}

// 自动填充默认账号
onMounted(() => {
  selectAccount('user')
})

const handleLogin = async () => {
  if (!phone.value || !password.value) {
    error.value = '请填写账号和密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    if (selectedRole.value === 'admin') {
      // 管理员登录
      if (phone.value === 'admin' && password.value === 'admin123') {
        const adminUser = { id: 'admin', name: '超级管理员', role: 'super_admin' }
        localStorage.setItem('admin_token', 'demo_admin_token')
        localStorage.setItem('admin_user', JSON.stringify(adminUser))
        router.push('/admin')
        return
      } else {
        throw new Error('管理员账号或密码错误')
      }
    } else {
      // 用户/创作者登录
      const { default: api } = await import('@/services/api')
      const data = await api.login(phone.value, password.value)
      localStorage.setItem('ceramics_token', data.token)
      localStorage.setItem('ceramics_user', JSON.stringify(data.user))

      // 根据角色跳转
      if (selectedRole.value === 'creator') {
        router.push('/creator/dashboard')
      } else {
        router.push('/')
      }
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const handleWechatLogin = () => {
  alert('微信登录功能开发中')
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.login-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: float 20s infinite;

  &.shape-1 {
    width: 600px;
    height: 600px;
    background: #d97706;
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }

  &.shape-2 {
    width: 500px;
    height: 500px;
    background: #f59e0b;
    bottom: -150px;
    left: -150px;
    animation-delay: -5s;
  }

  &.shape-3 {
    width: 400px;
    height: 400px;
    background: #b45309;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -10s;
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -30px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(20px, 30px) scale(1.02); }
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 48px;
  align-items: flex-start;
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  width: 420px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.role-info {
  width: 280px;
  padding: 20px 0;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  color: white;

  h3 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  > p {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 16px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 8px 0;
      font-size: 14px;
      opacity: 0.9;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      &:last-child {
        border-bottom: none;
      }

      &::before {
        content: '✓';
        margin-right: 8px;
        color: #4ade80;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(217, 119, 6, 0.4);
  font-size: 28px;
  color: white;
}

.login-title {
  font-size: 28px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 4px;
}

.login-subtitle {
  font-size: 14px;
  color: #64748B;
}

.role-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.role-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  background: #f1f5f9;
  border: 2px solid transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
  }

  &.active {
    background: white;
    border-color: #d97706;

    .role-icon {
      transform: scale(1.1);
    }

    .role-name {
      color: #d97706;
    }
  }
}

.role-icon {
  font-size: 24px;
  transition: transform 0.2s;
}

.role-name {
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
}

.role-notice {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #fef3c7;
  border-radius: 8px;
  font-size: 13px;
  color: #92400e;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #d97706;
    box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.1);
  }

  &::placeholder {
    color: #94A3B8;
  }
}

.phone-input {
  display: flex;
  align-items: center;
  border: 2px solid #E2E8F0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;

  &:focus-within {
    border-color: #d97706;
    box-shadow: 0 0 0 4px rgba(217, 119, 6, 0.1);
  }

  .phone-prefix {
    padding: 14px 16px;
    background: #F1F5F9;
    color: #64748B;
    font-weight: 500;
    border-right: 2px solid #E2E8F0;
  }

  input {
    border: none !important;
    box-shadow: none !important;
    border-radius: 0 !important;

    &:focus {
      box-shadow: none !important;
    }
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #64748B;

  input {
    width: 16px;
    height: 16px;
    accent-color: #d97706;
  }
}

.link-btn {
  background: none;
  border: none;
  color: #d97706;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}

.error-message {
  background: #FEF2F2;
  color: #EF4444;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #d97706, #b45309);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(217, 119, 6, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(217, 119, 6, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #94A3B8;
  font-size: 13px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E2E8F0;
  }
}

.wechat-btn {
  width: 100%;
  padding: 14px;
  background: #07C160;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: #06AD56;
  }
}

.register-link {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #64748B;

  a {
    color: #d97706;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.default-accounts {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #E2E8F0;
}

.default-title {
  font-size: 12px;
  color: #94A3B8;
  text-align: center;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.account-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.account-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #f8fafc;
  border: 2px solid transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
    border-color: rgba(217, 119, 6, 0.3);
  }

  &.selected {
    background: #fef3c7;
    border-color: #d97706;
  }
}

.account-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.account-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.account-role {
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
}

.account-credentials {
  font-size: 12px;
  color: #64748B;
  font-family: monospace;
}

.account-check {
  width: 24px;
  height: 24px;
  background: #d97706;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

// 响应式
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    align-items: center;
  }

  .role-info {
    display: none;
  }

  .login-card {
    width: 100%;
    max-width: 420px;
  }
}
</style>
