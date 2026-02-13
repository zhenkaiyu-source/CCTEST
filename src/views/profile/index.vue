<template>
  <div class="profile-page">
    <!-- 用户信息卡片 -->
    <Card class="profile-header-card">
      <div class="profile-banner"></div>
      <div class="profile-content">
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar">张</div>
          <span class="online-badge"></span>
        </div>
        <div class="profile-info">
          <h2 class="profile-name">
            张三丰
            <Shield class="verified-badge" />
          </h2>
          <p class="profile-title">高级陶瓷工艺师 | 景德镇</p>
          <div class="profile-meta">
            <span>ID: 8829102</span>
            <span>加入时间: 2023-01</span>
          </div>
        </div>
        <div class="profile-actions">
          <Button variant="secondary">预览主页</Button>
          <Button>编辑资料</Button>
        </div>
      </div>
    </Card>

    <!-- 内容区域 -->
    <div class="profile-grid">
      <!-- 账号安全 -->
      <Card title="账号安全" class="security-card">
        <div class="security-list">
          <div v-for="(item, i) in securityItems" :key="i" class="security-item">
            <div class="security-icon" :class="{ active: item.active }">
              <component :is="item.icon" />
            </div>
            <div class="security-info">
              <h4>{{ item.title }}</h4>
              <p>{{ item.desc }}</p>
            </div>
            <button class="security-action">{{ item.action }}</button>
          </div>
        </div>
      </Card>

      <!-- 系统设置 -->
      <Card title="系统设置">
        <div class="settings-list">
          <button class="settings-item">
            <span>消息通知</span>
            <div class="settings-toggle on">开启</div>
          </button>
          <button class="settings-item">
            <span>隐私设置</span>
            <ChevronDown class="settings-arrow" />
          </button>
          <button class="settings-item">
            <span>通用辅助</span>
            <ChevronDown class="settings-arrow" />
          </button>
          <div class="settings-divider"></div>
          <button class="settings-item logout">
            <LogOut />
            <span>退出登录</span>
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'

const securityItems = [
  { icon: Icons.Smartphone, title: '手机绑定', desc: '已绑定 138****8888', action: '修改', active: true },
  { icon: Icons.MessageCircle, title: '微信账号', desc: '已关联 Wechat', action: '解绑', active: true },
  { icon: Icons.CreditCard, title: '支付密码', desc: '未设置支付密码', action: '去设置', active: false }
]
</script>

<style lang="scss" scoped>
.profile-page {
  animation: fadeIn 0.3s ease;
  max-width: 1000px;
  margin: 0 auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.profile-header-card {
  margin-top: 40px;
  position: relative;
  overflow: visible;

  :deep(.ceramics-card-body) {
    padding: 0;
  }
}

.profile-banner {
  height: 120px;
  background: linear-gradient(135deg, #1E1B4B, #0F172A);
  border-radius: 16px 16px 0 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 24px;
  position: relative;
}

@media (min-width: 768px) {
  .profile-content {
    flex-direction: row;
    align-items: flex-end;
    padding: 0 32px 32px;
  }
}

.profile-avatar-wrapper {
  position: relative;
  margin-top: -50px;
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .profile-avatar-wrapper {
    margin-right: 24px;
    margin-bottom: 0;
  }
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4F46E5, #8B5CF6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);
  border: 4px solid white;
}

.online-badge {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: #10B981;
  border-radius: 50%;
  border: 3px solid white;
}

.profile-info {
  flex: 1;
  text-align: center;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    text-align: left;
    margin-bottom: 0;
  }
}

.profile-name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
}

.verified-badge {
  color: #0EA5E9;
  fill: rgba(14, 165, 233, 0.2);
}

.profile-title {
  font-size: 14px;
  color: #64748B;
  font-weight: 500;
  margin-top: 4px;
}

.profile-meta {
  display: flex;
  gap: 16px;
  margin-top: 8px;
  font-size: 13px;
  color: #94A3B8;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.profile-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
}

.profile-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;
}

@media (min-width: 768px) {
  .profile-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.security-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #F1F5F9;
  border-radius: 12px;
  transition: background 0.2s ease;
  width: 100%;
  background: none;
  cursor: pointer;

  &:hover {
    background: #FAFBFC;
  }
}

.security-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F5F9;
  color: #94A3B8;

  &.active {
    background: #EEF2FF;
    color: #4F46E5;
  }
}

.security-info {
  flex: 1;
  text-align: left;

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #0F172A;
  }

  p {
    font-size: 12px;
    color: #94A3B8;
    margin-top: 2px;
  }
}

.security-action {
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: #4F46E5;
    border: 1px solid #E2E8F0;
  }
}

.settings-list {
  display: flex;
  flex-direction: column;
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;

  &:hover {
    background: #FAFBFC;
    color: #4F46E5;
  }

  &.logout {
    color: #F43F5E;

    &:hover {
      background: #FEF2F2;
    }
  }
}

.settings-toggle {
  margin-left: auto;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  background: #F1F5F9;
  color: #64748B;

  &.on {
    background: #ECFDF5;
    color: #10B981;
  }
}

.settings-arrow {
  margin-left: auto;
  color: #94A3B8;
  transform: rotate(-90deg);
}

.settings-divider {
  height: 1px;
  background: #F1F5F9;
  margin: 8px 0;
}
</style>
