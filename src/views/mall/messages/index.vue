<template>
  <div class="messages-page">
    <div class="page-header">
      <router-link to="/user" class="back-link">← 返回个人中心</router-link>
      <h2>消息中心</h2>
      <button class="mark-all" @click="markAllRead">全部已读</button>
    </div>

    <div class="message-tabs">
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

    <div class="message-list">
      <div
        v-for="msg in filteredMessages"
        :key="msg.id"
        class="message-item"
        :class="{ unread: !msg.read }"
        @click="readMessage(msg)"
      >
        <div class="msg-icon">{{ msg.icon }}</div>
        <div class="msg-content">
          <div class="msg-header">
            <span class="msg-title">{{ msg.title }}</span>
            <span class="msg-time">{{ formatTime(msg.time) }}</span>
          </div>
          <p class="msg-desc">{{ msg.desc }}</p>
        </div>
        <div class="msg-action" v-if="msg.action">
          <button class="action-btn">{{ msg.actionText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('all')

const tabs = [
  { value: 'all', label: '全部' },
  { value: 'order', label: '订单通知' },
  { value: 'system', label: '系统通知' },
  { value: '互动', label: '互动消息' }
]

const messages = ref([
  { id: 1, type: 'order', icon: '📦', title: '订单已发货', desc: '您的订单ORD-123456已发货，顺丰快递，单号：SF123456789', time: Date.now() - 3600000, read: false, action: true, actionText: '查看物流' },
  { id: 2, type: 'order', icon: '✅', title: '订单已签收', desc: '您的订单ORD-123456已签收，请确认收货', time: Date.now() - 86400000, read: false, action: true, actionText: '确认收货' },
  { id: 3, type: '互动', icon: '💬', title: '艺术家回复', desc: '景德镇青花斋：感谢您的支持！如有售后问题随时联系我～', time: Date.now() - 172800000, read: true },
  { id: 4, type: 'system', icon: '📢', title: '新人福利', desc: '欢迎首次下单，新人专享优惠券已发放至您的账户', time: Date.now() - 604800000, read: true, action: true, actionText: '去使用' },
  { id: 5, type: 'order', icon: '🔔', title: '支付提醒', desc: '您的订单ORD-789012，请在24小时内完成支付', time: Date.now() - 259200000, read: true }
])

const filteredMessages = computed(() => {
  if (activeTab.value === 'all') return messages.value
  return messages.value.filter(m => m.type === activeTab.value)
})

const formatTime = (timestamp) => {
  const diff = Date.now() - timestamp
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}-${date.getDate()}`
}

const readMessage = (msg) => {
  msg.read = true
}

const markAllRead = () => {
  messages.value.forEach(m => m.read = true)
}
</script>

<style lang="scss" scoped>
.messages-page {
  padding: 24px 0;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;

  .back-link {
    color: #666;
    text-decoration: none;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
    flex: 1;
  }

  .mark-all {
    background: none;
    border: none;
    color: #d97706;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
}

.message-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  background: white;
  padding: 8px;
  border-radius: 12px;
}

.tab-item {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f3f4f6;
  }

  &.active {
    background: #d97706;
    color: white;
  }
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &.unread {
    background: #fffbeb;

    .msg-title {
      font-weight: 600;
    }
  }
}

.msg-icon {
  width: 48px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.msg-content {
  flex: 1;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.msg-title {
  font-size: 15px;
  color: #1a1a2e;
}

.msg-time {
  font-size: 12px;
  color: #9ca3af;
}

.msg-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.msg-action {
  .action-btn {
    padding: 8px 16px;
    background: #d97706;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background: #b45309;
    }
  }
}
</style>
