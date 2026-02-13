<template>
  <div class="analytics-page">
    <!-- 概览指标 -->
    <div class="metrics-grid">
      <Card v-for="(stat, i) in metrics" :key="i" class="metric-card">
        <p class="metric-label">{{ stat.label }}</p>
        <h3 class="metric-value">{{ stat.value }}</h3>
        <p class="metric-trend" :class="stat.trendClass">{{ stat.trend }}</p>
      </Card>
    </div>

    <!-- 图表区域 -->
    <div class="charts-grid">
      <!-- 热销排行 -->
      <Card title="热销排行 TOP 5">
        <div class="ranking-list">
          <div v-for="(item, i) in rankings" :key="i" class="ranking-item">
            <div class="ranking-badge" :class="{ top3: i < 3 }">{{ i + 1 }}</div>
            <div class="ranking-info">
              <h4 class="ranking-name">{{ item.name }}</h4>
              <div class="ranking-bar-bg">
                <div class="ranking-bar" :style="{ width: item.percent + '%' }"></div>
              </div>
            </div>
            <div class="ranking-stats">
              <p class="ranking-amount">{{ item.amount }}</p>
              <p class="ranking-sales">销量 {{ item.sales }}</p>
            </div>
          </div>
        </div>
      </Card>

      <!-- 流量来源 -->
      <Card title="流量来源 (Traffic)">
        <div class="traffic-chart">
          <div class="donut-container">
            <div class="donut">
              <div class="donut-inner">
                <span class="donut-label">Views</span>
                <span class="donut-value">12.5w</span>
              </div>
            </div>
          </div>
          <div class="traffic-legend">
            <div class="legend-item">
              <span class="legend-color" style="background: #4F46E5"></span>
              <span>直播引流 (45%)</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #8B5CF6"></span>
              <span>自然搜索 (35%)</span>
            </div>
            <div class="legend-item">
              <span class="legend-color" style="background: #0EA5E9"></span>
              <span>社群转化 (20%)</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '@/components/common/Card.vue'

const metrics = [
  { label: 'GMV (总交易额)', value: '¥45,231', trend: '+15%', trendClass: 'positive' },
  { label: '支付订单数', value: '128', trend: '+5%', trendClass: 'positive' },
  { label: '客单价 (AOV)', value: '¥353.3', trend: '-2%', trendClass: 'negative' },
  { label: '转化率 (CVR)', value: '4.2%', trend: '+0.5%', trendClass: 'positive' }
]

const rankings = [
  { name: '手绘青花缠枝莲纹品茗杯', sales: 125, amount: '¥37,375', percent: 100 },
  { name: '粉彩花鸟盖碗 - 2023款', sales: 89, amount: '¥40,050', percent: 71 },
  { name: '天青色汝窑茶具套装', sales: 56, amount: '¥50,344', percent: 45 },
  { name: '极简白瓷花器 (大号)', sales: 42, amount: '¥8,358', percent: 34 },
  { name: '霁蓝釉主人杯', sales: 38, amount: '¥6,764', percent: 30 }
]
</script>

<style lang="scss" scoped>
.analytics-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .metrics-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.metric-card {
  text-align: center;

  &:hover {
    transform: translateY(-2px);
  }

  .metric-label {
    font-size: 12px;
    color: #94A3B8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .metric-value {
    font-size: 28px;
    font-weight: 700;
    color: #0F172A;
    font-family: monospace;
    margin-top: 8px;
  }

  .metric-trend {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    margin-top: 8px;
    padding: 4px 8px;
    border-radius: 6px;

    &.positive {
      background: #ECFDF5;
      color: #10B981;
    }

    &.negative {
      background: #FEF2F2;
      color: #EF4444;
    }
  }
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .charts-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 10px;
  transition: background 0.2s ease;

  &:hover {
    background: #FAFBFC;
  }
}

.ranking-badge {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #F1F5F9;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;

  &.top3 {
    background: #4F46E5;
    color: white;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }
}

.ranking-info {
  flex: 1;

  .ranking-name {
    font-size: 14px;
    font-weight: 600;
    color: #0F172A;
    margin-bottom: 8px;
  }

  .ranking-bar-bg {
    width: 100%;
    height: 6px;
    background: #F1F5F9;
    border-radius: 3px;
    overflow: hidden;
  }

  .ranking-bar {
    height: 100%;
    background: #4F46E5;
    border-radius: 3px;
    transition: width 0.5s ease;
  }
}

.ranking-stats {
  text-align: right;
  min-width: 80px;

  .ranking-amount {
    font-size: 14px;
    font-weight: 700;
    color: #0F172A;
    font-family: monospace;
  }

  .ranking-sales {
    font-size: 12px;
    color: #94A3B8;
    margin-top: 2px;
  }
}

.traffic-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 20px 0;
}

.donut-container {
  position: relative;
}

.donut {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 20px solid;
  border-color: transparent #4F46E5 #8B5CF6 #0EA5E9;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
}

.donut-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut-label {
  font-size: 11px;
  color: #94A3B8;
  font-weight: 600;
  text-transform: uppercase;
}

.donut-value {
  font-size: 24px;
  font-weight: 700;
  color: #0F172A;
  font-family: monospace;
}

.traffic-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
</style>
