<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo">🏺</div>
          <h1 class="login-title">管理后台</h1>
          <p class="login-subtitle">瓷韵 · 瓷器手作平台</p>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">账号</label>
            <input
              type="text"
              class="form-input"
              placeholder="请输入管理员账号"
              v-model="username"
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

          <div class="error-message" v-if="error">{{ error }}</div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '登录中...' : '立即登录' }}
          </button>
        </form>

        <div class="back-link">
          <router-link to="/">返回前台</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = '请填写账号和密码'
    return
  }

  loading.value = true
  error.value = ''

  // 模拟登录验证（实际应调用 API）
  try {
    // 演示账号验证
    if (username.value === 'admin' && password.value === 'admin123') {
      const adminUser = {
        id: '1',
        name: '超级管理员',
        username: 'admin',
        role: 'super_admin'
      }
      const token = 'admin_demo_token_' + Date.now()
      localStorage.setItem('admin_token', token)
      localStorage.setItem('admin_user', JSON.stringify(adminUser))
      router.push('/admin')
    } else {
      error.value = '账号或密码错误'
    }
  } catch (e) {
    error.value = '登录失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 32px;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #64748b;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.2s ease;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #f59e0b;
    box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
  }
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.error-message {
  background: #fef2f2;
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.back-link {
  text-align: center;
  margin-top: 24px;

  a {
    color: #64748b;
    font-size: 14px;
    text-decoration: none;

    &:hover {
      color: #f59e0b;
    }
  }
}
</style>
