<template>
  <div class="analytics-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2>数据分析</h2>
      <div class="date-range">
        <button :class="{ active: dateRange === 'week' }" @click="dateRange = 'week'">近7天</button>
        <button :class="{ active: dateRange === 'month' }" @click="dateRange = 'month'">近30天</button>
        <button :class="{ active: dateRange === 'year' }" @click="dateRange = 'year'">近1年</button>
      </div>
    </div>

    <!-- 核心指标 -->
    <div class="metrics-row">
      <div class="metric-card">
        <div class="metric-icon">💰</div>
        <div class="metric-content">
          <p class="metric-label">成交额 (GMV)</p>
          <h3 class="metric-value">¥{{ formatMoney(metrics.gmv) }}</h3>
          <p class="metric-change positive">+18.5% 环比</p>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">📦</div>
        <div class="metric-content">
          <p class="metric-label">订单量</p>
          <h3 class="metric-value">{{ metrics.orders }}</h3>
          <p class="metric-change positive">+12.3% 环比</p>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">👥</div>
        <div class="metric-content">
          <p class="metric-label">活跃艺术家</p>
          <h3 class="metric-value">{{ metrics.activeArtists }}</h3>
          <p class="metric-change positive">+8 环比</p>
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-icon">🎨</div>
        <div class="metric-content">
          <p class="metric-label">在售作品</p>
          <h3 class="metric-value">{{ metrics.activeWorks }}</h3>
          <p class="metric-change positive">+56 环比</p>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="charts-row">
      <div class="chart-card large">
        <h3>成交额趋势</h3>
        <div class="chart-container">
          <div class="line-chart">
            <svg viewBox="0 0 600 200" class="chart-svg">
              <polyline
                :points="linePoints"
                fill="none"
                stroke="#f59e0b"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle
                v-for="(point, i) in lineChartData"
                :key="i"
                :cx="point.x"
                :cy="point.y"
                r="4"
                fill="#f59e0b"
              />
            </svg>
          </div>
          <div class="chart-labels">
            <span v-for="(label, i) in chartLabels" :key="i">{{ label }}</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h3>分类销量占比</h3>
        <div class="pie-visual">
          <div class="pie-chart">
            <div class="pie-segment" v-for="(cat, i) in categoryData" :key="i"
              :style="getPieStyle(i, categoryData.length)">
            </div>
          </div>
          <div class="pie-legend">
            <div class="legend-item" v-for="(cat, i) in categoryData" :key="i">
              <span class="legend-dot" :style="{ background: cat.color }"></span>
              <span class="legend-name">{{ cat.name }}</span>
              <span class="legend-percent">{{ cat.percent }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 排行榜 -->
    <div class="rankings-row">
      <div class="ranking-card">
        <h3>热销作品 TOP10</h3>
        <div class="ranking-list">
          <div class="ranking-item" v-for="(work, i) in topWorks" :key="i">
            <span class="rank-num" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
            <span class="rank-title">{{ work.title }}</span>
            <span class="rank-sales">{{ work.sales }}件</span>
            <span class="rank-amount">¥{{ formatMoney(work.amount) }}</span>
          </div>
        </div>
      </div>

      <div class="ranking-card">
        <h3>艺术家销售额 TOP10</h3>
        <div class="ranking-list">
          <div class="ranking-item" v-for="(artist, i) in topArtists" :key="i">
            <span class="rank-num" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
            <div class="rank-artist">
              <div class="artist-avatar">{{ artist.name[0] }}</div>
              <span>{{ artist.name }}</span>
            </div>
            <span class="rank-amount">¥{{ formatMoney(artist.amount) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const dateRange = ref('week')

const metrics = ref({
  gmv: 1286400,
  orders: 2846,
  activeArtists: 128,
  activeWorks: 856
})

const lineChartData = computed(() => {
  const points = []
  for (let i = 0; i < 7; i++) {
    points.push({
      x: 60 + i * 80,
      y: 180 - Math.random() * 120
    })
  }
  return points
})

const linePoints = computed(() => {
  return lineChartData.value.map(p => `${p.x},${p.y}`).join(' ')
})

const chartLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const categoryData = ref([
  { name: '茶具', percent: 38, color: '#3b82f6' },
  { name: '餐具', percent: 25, color: '#10b981' },
  { name: '花器', percent: 18, color: '#f59e0b' },
  { name: '摆件', percent: 19, color: '#8b5cf6' }
])

const topWorks = ref([
  { title: '手绘青花缠枝莲纹品茗杯', sales: 256, amount: 76544 },
  { title: '粉彩花鸟赏瓶 限量版', sales: 189, amount: 241920 },
  { title: '天青色汝窑茶具套装', sales: 145, amount: 130355 },
  { title: '窑变釉茶具', sales: 128, amount: 87040 },
  { title: '青花釉里红盖碗', sales: 98, amount: 44884 },
  { title: '珐琅彩茶碗', sales: 87, amount: 52200 },
  { title: '单色釉花瓶', sales: 76, amount: 60720 },
  { title: '雕塑摆件', sales: 65, amount: 32500 },
  { title: '茶仓罐', sales: 58, amount: 23200 },
  { title: '茶则套装', sales: 52, amount: 18200 }
])

const topArtists = ref([
  { name: '王粉彩', amount: 256800 },
  { name: '张三丰', amount: 198500 },
  { name: '李青花', amount: 156400 },
  { name: '赵汝窑', amount: 128600 },
  { name: '钱釉里红', amount: 98700 },
  { name: '孙建业', amount: 85400 },
  { name: '周青花', amount: 72300 },
  { name: '吴粉彩', amount: 61200 },
  { name: '郑汝窑', amount: 54800 },
  { name: '冯釉里红', amount: 45600 }
])

const formatMoney = (num) => {
  return num.toLocaleString()
}

const getPieStyle = (index, total) => {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
  const rotations = [0, 135, 225, 315]
  const degrees = [0, 135, 90, 70]
  return {
    background: colors[index],
    transform: `rotate(${rotations[index]}deg) skew(${degrees[index]}deg)`
  }
}
</script>

<style lang="scss" scoped>
.analytics-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
  }
}

.date-range {
  display: flex;
  gap: 8px;

  button {
    padding: 8px 16px;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-size: 13px;
    color: #64748b;
    cursor: pointer;

    &.active {
      background: linear-gradient(135deg, #f59e0b, #d97706);
      color: white;
      border-color: transparent;
    }
  }
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.metric-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.metric-label {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 4px;
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.metric-change {
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

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 20px;
  }
}

.chart-container {
  height: 200px;
}

.line-chart {
  height: 160px;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 10px 60px 0;
  font-size: 12px;
  color: #94a3b8;
}

.pie-visual {
  display: flex;
  align-items: center;
  gap: 24px;
}

.pie-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(#3b82f6 0% 38%, #10b981 38% 63%, #f59e0b 63% 81%, #8b5cf6 81% 100%);
  position: relative;
}

.pie-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  margin-right: 8px;
}

.legend-name {
  flex: 1;
  font-size: 13px;
  color: #334155;
}

.legend-percent {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
}

.rankings-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.ranking-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 16px;
  }
}

.ranking-list {
  display: flex;
  flex-direction: column;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child { border-bottom: none; }
}

.rank-num {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
  background: #f1f5f9;
  color: #64748b;

  &.rank-1 { background: linear-gradient(135deg, #fef3c7, #fde68a); color: #d97706; }
  &.rank-2 { background: linear-gradient(135deg, #e2e8f0, #cbd5e1); color: #475569; }
  &.rank-3 { background: linear-gradient(135deg, #fed7aa, #fdba74); color: #c2410c; }
}

.rank-title {
  flex: 1;
  font-size: 13px;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rank-artist {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;

  .artist-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #8b5cf6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
  }
}

.rank-sales {
  font-size: 13px;
  color: #64748b;
  margin-right: 16px;
  min-width: 60px;
}

.rank-amount {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  min-width: 80px;
  text-align: right;
}
</style>
