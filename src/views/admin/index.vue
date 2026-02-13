<template>
  <div class="admin-dashboard">
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #3b82f6, #1d4ed8);">👨‍🎨</div>
        <div class="stat-content">
          <p class="stat-label">艺术家总数</p>
          <h3 class="stat-value">{{ stats.artistCount }}</h3>
          <p class="stat-change positive">+12 本月新增</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);">🎨</div>
        <div class="stat-content">
          <p class="stat-label">作品总数</p>
          <h3 class="stat-value">{{ stats.workCount }}</h3>
          <p class="stat-change positive">+28 本月新增</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #10b981, #059669);">📦</div>
        <div class="stat-content">
          <p class="stat-label">订单总数</p>
          <h3 class="stat-value">{{ stats.orderCount }}</h3>
          <p class="stat-change positive">+156 本月</p>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: linear-gradient(135deg, #f59e0b, #d97706);">💰</div>
        <div class="stat-content">
          <p class="stat-label">本月成交额</p>
          <h3 class="stat-value">¥{{ formatNumber(stats.monthlyGMV) }}</h3>
          <p class="stat-change positive">+18.5% 环比</p>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="card-header">
          <h3>成交额趋势</h3>
          <div class="chart-tabs">
            <button :class="{ active: chartPeriod === 'week' }" @click="chartPeriod = 'week'">近7天</button>
            <button :class="{ active: chartPeriod === 'month' }" @click="chartPeriod = 'month'">近30天</button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-bars">
            <div v-for="(item, index) in chartData" :key="index" class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" :style="{ height: item.value + '%' }"></div>
              </div>
              <span class="chart-label">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="chart-card small">
        <div class="card-header">
          <h3>分类销量占比</h3>
        </div>
        <div class="pie-chart">
          <div class="pie-center">
            <span class="pie-value">{{ stats.workCount }}</span>
            <span class="pie-label">总作品</span>
          </div>
          <div class="pie-legend">
            <div class="legend-item" v-for="(item, index) in categoryData" :key="index">
              <span class="legend-color" :style="{ background: item.color }"></span>
              <span class="legend-label">{{ item.name }}</span>
              <span class="legend-value">{{ item.count }}件</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表区域 -->
    <div class="lists-row">
      <!-- 最新订单 -->
      <div class="list-card">
        <div class="card-header">
          <h3>最新订单</h3>
          <router-link to="/admin/orders" class="view-all">查看全部 →</router-link>
        </div>
        <div class="order-list">
          <div v-for="order in recentOrders" :key="order.id" class="order-item">
            <div class="order-info">
              <span class="order-no">{{ order.no }}</span>
              <span class="order-artist">{{ order.artist }}</span>
            </div>
            <div class="order-amount">¥{{ order.amount }}</div>
            <div class="order-status" :class="order.statusClass">{{ order.status }}</div>
          </div>
        </div>
      </div>

      <!-- 最新艺术家 -->
      <div class="list-card">
        <div class="card-header">
          <h3>新入驻艺术家</h3>
          <router-link to="/admin/artists" class="view-all">查看全部 →</router-link>
        </div>
        <div class="artist-list">
          <div v-for="artist in recentArtists" :key="artist.id" class="artist-item">
            <div class="artist-avatar">{{ artist.name[0] }}</div>
            <div class="artist-info">
              <span class="artist-name">{{ artist.name }}</span>
              <span class="artist-time">{{ artist.time }}</span>
            </div>
            <span class="artist-works">{{ artist.workCount }}作品</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const chartPeriod = ref('week')

// 统计数据
const stats = ref({
  artistCount: 128,
  workCount: 856,
  orderCount: 324,
  monthlyGMV: 128640
})

// 图表数据
const chartData = ref([
  { date: '周一', value: 45 },
  { date: '周二', value: 62 },
  { date: '周三', value: 38 },
  { date: '周四', value: 75 },
  { date: '周五', value: 88 },
  { date: '周六', value: 95 },
  { date: '周日', value: 70 }
])

// 分类数据
const categoryData = ref([
  { name: '茶具', count: 312, color: '#3b82f6' },
  { name: '餐具', count: 198, color: '#10b981' },
  { name: '花器', count: 156, color: '#f59e0b' },
  { name: '摆件', count: 190, color: '#8b5cf6' }
])

// 最新订单
const recentOrders = ref([
  { id: 1, no: 'ORD-231215-001', artist: '张三丰', amount: '1,299', status: '已完成', statusClass: 'success' },
  { id: 2, no: 'ORD-231215-002', artist: '李青花', amount: '899', status: '待发货', statusClass: 'warning' },
  { id: 3, no: 'ORD-231215-003', artist: '王粉彩', amount: '2,580', status: '已发货', statusClass: 'info' },
  { id: 4, no: 'ORD-231214-001', artist: '赵汝窑', amount: '456', status: '已完成', statusClass: 'success' }
])

// 新入驻艺术家
const recentArtists = ref([
  { id: 1, name: '陈建业', time: '2小时前', workCount: 12 },
  { id: 2, name: '林陶瓷', time: '5小时前', workCount: 8 },
  { id: 3, name: '黄釉彩', time: '1天前', workCount: 15 },
  { id: 4, name: '吴青花', time: '2天前', workCount: 23 }
])

const formatNumber = (num) => {
  return num.toLocaleString()
}
</script>

<style lang="scss" scoped>
.admin-dashboard {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.stat-change {
  font-size: 12px;
  margin-top: 4px;

  &.positive { color: #10b981; }
  &.negative { color: #ef4444; }
}

.charts-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &.small {
    min-width: 300px;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
  }
}

.chart-tabs {
  display: flex;
  gap: 4px;

  button {
    padding: 6px 12px;
    border: none;
    background: #f1f5f9;
    border-radius: 6px;
    font-size: 12px;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: #f59e0b;
      color: white;
    }
  }
}

.chart-container {
  height: 200px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 180px;
  gap: 12px;
}

.chart-bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.chart-bar-bg {
  width: 100%;
  height: 160px;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.chart-bar {
  width: 100%;
  background: linear-gradient(180deg, #f59e0b 0%, #fbbf24 100%);
  border-radius: 8px 8px 0 0;
  transition: all 0.3s ease;
}

.chart-label {
  font-size: 12px;
  color: #94a3b8;
}

.pie-chart {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pie-center {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pie-value {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
}

.pie-label {
  font-size: 12px;
  color: #64748b;
}

.pie-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-label {
  flex: 1;
  font-size: 13px;
  color: #334155;
}

.legend-value {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.lists-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.list-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.view-all {
  font-size: 13px;
  color: #f59e0b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.order-list {
  display: flex;
  flex-direction: column;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
}

.order-info {
  flex: 1;
}

.order-no {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  font-family: monospace;
}

.order-artist {
  font-size: 12px;
  color: #64748b;
}

.order-amount {
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  margin-right: 16px;
}

.order-status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;

  &.success { background: #ecfdf5; color: #059669; }
  &.warning { background: #fffbeb; color: #d97706; }
  &.info { background: #eff6ff; color: #2563eb; }
}

.artist-list {
  display: flex;
  flex-direction: column;
}

.artist-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
}

.artist-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-right: 12px;
}

.artist-info {
  flex: 1;
}

.artist-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #0f172a;
}

.artist-time {
  font-size: 12px;
  color: #94a3b8;
}

.artist-works {
  font-size: 13px;
  color: #64748b;
}
</style>
