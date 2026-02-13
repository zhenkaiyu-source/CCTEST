<template>
  <div class="orders-page">
    <!-- 状态Tabs -->
    <Card class="tabs-card">
      <div class="status-tabs">
        <button
          v-for="(tab, index) in statusTabs"
          :key="tab.name"
          :class="['status-tab', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab.name }}
          <span v-if="tab.count" class="tab-badge">{{ tab.count }}</span>
        </button>
      </div>

      <div class="toolbar-row">
        <div class="search-box">
          <Search class="search-icon" />
          <input type="text" class="search-input" placeholder="搜索订单号、买家姓名..." />
        </div>
        <Button variant="secondary" sm>
          <Filter /> 筛选
        </Button>
        <Button variant="secondary" sm class="ml-auto">
          <Download /> 导出报表
        </Button>
      </div>
    </Card>

    <!-- 订单列表 -->
    <div class="orders-list">
      <div v-for="n in 3" :key="n" class="order-card">
        <div class="order-header">
          <div class="order-meta">
            <span class="order-date">2023-10-24 14:23</span>
            <span class="order-id">ORD-20231024-{{ n }}88</span>
          </div>
          <Badge :status="n === 1 ? '待发货' : '已完成'">
            {{ n === 1 ? '待发货' : '已完成' }}
          </Badge>
        </div>

        <div class="order-body">
          <div class="order-product">
            <div class="product-image">
              <ImageIcon />
            </div>
            <div class="product-info">
              <h4 class="product-name">现代商务礼品·白瓷盖碗套装</h4>
              <p class="product-spec">规格: 礼盒装 x 1</p>
            </div>
          </div>

          <div class="order-price">
            <p class="price-amount">¥450.00</p>
            <p class="price-hint">在线支付</p>
          </div>

          <div class="order-buyer">
            <p class="buyer-name">
              <User /> 陈先生
            </p>
            <p class="buyer-phone">139****8888</p>
          </div>

          <div class="order-actions">
            <Button v-if="n === 1" sm class="ship-btn">立即发货</Button>
            <Button v-else variant="secondary" sm>查看物流</Button>
            <button class="contact-btn">联系买家</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as Icons from '@element-plus/icons-vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'

const activeTab = ref(1)

const statusTabs = [
  { name: '全部订单', count: null },
  { name: '待发货', count: 18 },
  { name: '已发货', count: null },
  { name: '已完成', count: null },
  { name: '售后/退款', count: null }
]
</script>

<style lang="scss" scoped>
.orders-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tabs-card {
  :deep(.ceramics-card-body) {
    padding: 0;
  }
}

.status-tabs {
  display: flex;
  overflow-x: auto;
  padding: 0 8px;
  border-bottom: 1px solid #F1F5F9;
}

.status-tab {
  padding: 16px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #64748B;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #334155;
  }

  &.active {
    color: #4F46E5;
    border-bottom-color: #4F46E5;
  }
}

.tab-badge {
  margin-left: 8px;
  padding: 2px 6px;
  background: #EF4444;
  color: white;
  font-size: 10px;
  border-radius: 10px;
  font-weight: 600;
}

.toolbar-row {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #F1F5F9;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 300px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
  }

  .search-input {
    width: 100%;
    height: 36px;
    padding: 0 12px 0 36px;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    font-size: 14px;
    background: white;

    &:focus {
      outline: none;
      border-color: #4F46E5;
    }
  }
}

.ml-auto {
  margin-left: auto;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.order-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border-color: #4F46E5;
  }
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #F1F5F9;
}

.order-meta {
  display: flex;
  gap: 24px;
}

.order-date {
  font-size: 14px;
  color: #64748B;
  font-family: monospace;
}

.order-id {
  font-size: 14px;
  color: #334155;
  font-family: monospace;
}

.order-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 20px;
}

.order-product {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 200px;
}

.product-image {
  width: 64px;
  height: 64px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CBD5E1;
}

.product-info {
  .product-name {
    font-size: 14px;
    font-weight: 600;
    color: #0F172A;
    margin-bottom: 4px;
  }

  .product-spec {
    font-size: 12px;
    color: #64748B;
  }
}

.order-price {
  text-align: center;
  min-width: 100px;

  .price-amount {
    font-size: 16px;
    font-weight: 700;
    color: #0F172A;
  }

  .price-hint {
    font-size: 11px;
    color: #94A3B8;
    margin-top: 2px;
  }
}

.order-buyer {
  min-width: 140px;
  border-left: 1px solid #F1F5F9;
  padding-left: 24px;

  .buyer-name {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: #334155;
    font-weight: 500;

    svg {
      color: #94A3B8;
    }
  }

  .buyer-phone {
    font-size: 12px;
    color: #94A3B8;
    margin-top: 2px;
    padding-left: 22px;
    font-family: monospace;
  }
}

.order-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 120px;
  border-left: 1px solid #F1F5F9;
  padding-left: 24px;
}

.ship-btn {
  :deep(.ceramics-btn) {
    background: #4F46E5;
  }
}

.contact-btn {
  font-size: 12px;
  color: #64748B;
  background: none;
  border: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #4F46E5;
  }
}
</style>
