<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <div class="register-logo">
            <span>🏺</span>
          </div>
          <h1 class="register-title">创建账号</h1>
          <p class="register-subtitle">加入瓷韵创造者中心</p>
        </div>

        <form class="register-form" @submit.prevent="handleRegister">
          <div class="form-group">
            <label class="form-label">手机号码</label>
            <input
              type="tel"
              class="form-input"
              placeholder="请输入手机号"
              v-model="phone"
            />
          </div>

          <div class="form-group">
            <label class="form-label">昵称</label>
            <input
              type="text"
              class="form-input"
              placeholder="请输入昵称"
              v-model="name"
            />
          </div>

          <div class="form-group">
            <label class="form-label">密码</label>
            <input
              type="password"
              class="form-input"
              placeholder="请输入密码 (至少6位)"
              v-model="password"
            />
          </div>

          <div class="form-group">
            <label class="form-label">确认密码</label>
            <input
              type="password"
              class="form-input"
              placeholder="请再次输入密码"
              v-model="confirmPassword"
            />
          </div>

          <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? '注册中...' : '立即注册' }}
          </button>

          <p v-if="error" class="error-message">{{ error }}</p>
          <p v-if="success" class="success-message">{{ success }}</p>
        </form>

        <p class="login-link">
          已有账号？ <router-link to="/login">立即登录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'

const router = useRouter()
const phone = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleRegister = async () => {
  if (!phone.value || !password.value || !name.value) {
    error.value = '请填写所有必填项'
    return
  }

  if (password.value !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (password.value.length < 6) {
    error.value = '密码至少需要6位'
    return
  }

  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await api.register(phone.value, password.value, name.value)
    success.value = '注册成功！正在跳转到登录页...'
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 420px;
}

.register-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-logo {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, #4F46E5, #8B5CF6);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 10px 30px rgba(79, 70, 229, 0.4);
  font-size: 32px;
  color: white;
}

.register-title {
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 8px;
}

.register-subtitle {
  font-size: 14px;
  color: #64748B;
}

.register-form {
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
    border-color: #4F46E5;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
  }
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4F46E5, #8B5CF6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
  margin-top: 8px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 70, 229, 0.5);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

.success-message {
  background: #ECFDF5;
  color: #059669;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.login-link {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #64748B;

  a {
    color: #4F46E5;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
