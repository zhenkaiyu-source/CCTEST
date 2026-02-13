<template>
  <div class="finance-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2>财务管理</h2>
      <div class="header-tabs">
        <button :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">财务概览</button>
        <button :class="{ active: activeTab === 'withdraw' }" @click="activeTab = 'withdraw'">提现审核</button>
      </div>
    </div>

    <!-- 财务概览 -->
    <div v-if="activeTab === 'overview'" class="overview-content">
      <!-- 统计卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon blue">💰</div>
          <div class="stat-content">
            <p class="stat-label">平台总成交额 (GMV)</p>
            <h3 class="stat-value">¥{{ formatMoney(stats.totalGMV) }}</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green">📈</div>
          <div class="stat-content">
            <p class="stat-label">本月成交额</p>
            <h3 class="stat-value">¥{{ formatMoney(stats.monthlyGMV) }}</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon purple">💵</div>
          <div class="stat-content">
            <p class="stat-label">平台服务费收入</p>
            <h3 class="stat-value">¥{{ formatMoney(stats.platformFee) }}</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon orange">⏳</div>
          <div class="stat-content">
            <p class="stat-label">待结算金额</p>
            <h3 class="stat-value">¥{{ formatMoney(stats.pendingSettle) }}</h3>
          </div>
        </div>
      </div>

      <!-- 图表 -->
      <div class="charts-section">
        <div class="chart-card">
          <h3>成交额趋势</h3>
          <div class="chart-container">
            <div class="chart-bars">
              <div v-for="(item, i) in chartData" :key="i" class="chart-bar-wrapper">
                <div class="chart-bar-bg">
                  <div class="chart-bar" :style="{ height: item.value + '%' }"></div>
                </div>
                <span class="chart-label">{{ item.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提现审核 -->
    <div v-if="activeTab === 'withdraw'" class="withdraw-content">
      <!-- 统计 -->
      <div class="withdraw-stats">
        <div class="ws-item">
          <span class="ws-label">待审核</span>
          <span class="ws-value warning">{{ withdrawStats.pending }}</span>
        </div>
        <div class="ws-item">
          <span class="ws-label">待打款</span>
          <span class="ws-value info">{{ withdrawStats.pendingPay }}</span>
        </div>
        <div class="ws-item">
          <span class="ws-label">本月已打款</span>
          <span class="ws-value success">¥{{ formatMoney(withdrawStats.monthlyPaid) }}</span>
        </div>
      </div>

      <!-- 列表 -->
      <div class="data-table">
        <table>
          <thead>
            <tr>
              <th>申请时间</th>
              <th>艺术家</th>
              <th>提现金额</th>
              <th>账户余额</th>
              <th>收款方式</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in withdrawList" :key="item.id">
              <td>{{ item.time }}</td>
              <td>
                <div class="artist-cell">
                  <div class="artist-avatar">{{ item.artist[0] }}</div>
                  <span>{{ item.artist }}</span>
                </div>
              </td>
              <td class="td-amount">¥{{ formatMoney(item.amount) }}</td>
              <td class="td-balance">¥{{ formatMoney(item.balance) }}</td>
              <td>{{ item.method }}</td>
              <td>
                <span class="status-badge" :class="'badge-' + item.status">
                  {{ item.statusText }}
                </span>
              </td>
              <td>
                <div class="action-btns">
                  <button v-if="item.status === 'pending'" class="btn-primary sm" @click="approve(item)">通过</button>
                  <button v-if="item.status === 'pending'" class="btn-secondary sm" @click="reject(item)">拒绝</button>
                  <button v-if="item.status === 'approved'" class="btn-primary sm" @click="markPaid(item)">标记已打款</button>
                  <button class="btn-link sm" @click="viewDetail(item)">详情</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTab = ref('overview')

const stats = reactive({
  totalGMV: 2856400,
  monthlyGMV: 486500,
  platformFee: 24325,
  pendingSettle: 89400
})

const chartData = ref([
  { date: '1日', value: 45 },
  { date: '5日', value: 62 },
  { date: '10日', value: 78 },
  { date: '15日', value: 55 },
  { date: '20日', value: 88 },
  { date: '25日', value: 72 },
  { date: '30日', value: 95 }
])

const withdrawStats = reactive({
  pending: 8,
  pendingPay: 5,
  monthlyPaid: 156800
})

const withdrawList = ref([
  { id: 1, time: '2024-02-12 14:30', artist: '张三丰', amount: 5000, balance: 12840, method: '微信', status: 'pending', statusText: '待审核' },
  { id: 2, time: '2024-02-12 10:15', artist: '李青花', amount: 3000, balance: 5680, method: '支付宝', status: 'approved', statusText: '已通过' },
  { id: 3, time: '2024-02-11 16:45', artist: '王粉彩', amount: 8000, balance: 24500, method: '银行卡', status: 'paid', statusText: '已打款' },
  { id: 4, time: '2024-02-11 09:20', artist: '赵汝窑', amount: 2000, balance: 4200, method: '微信', status: 'pending', statusText: '待审核' },
  { id: 5, time: '2024-02-10 18:30', artist: '钱釉里红', amount: 6500, balance: 12800, method: '支付宝', status: 'rejected', statusText: '已拒绝' }
])

const formatMoney = (num) => {
  return num.toLocaleString()
}

const approve = (item) => {
  item.status = 'approved'
  item.statusText = '已通过'
}

const reject = (item) => {
  const reason = prompt('请输入拒绝原因:')
  if (reason) {
    item.status = 'rejected'
    item.statusText = '已拒绝'
  }
}

const markPaid = (item) => {
  item.status = 'paid'
  item.statusText = '已打款'
}

const viewDetail = (item) => {
  console.log('查看详情:', item.id)
}
</script>

<style lang="scss" scoped>
.finance-page {
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

.header-tabs {
  display: flex;
  gap: 8px;

  button {
    padding: 8px 20px;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
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

  &.blue { background: #eff6ff; }
  &.green { background: #ecfdf5; }
  &.purple { background: #f5f3ff; }
  &.orange { background: #fff7ed; }
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
}

.chart-bar {
  width: 100%;
  background: linear-gradient(180deg, #f59e0b, #fbbf24);
  border-radius: 8px 8px 0 0;
}

.chart-label {
  font-size: 12px;
  color: #94a3b8;
}

.withdraw-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
}

.ws-item {
  background: white;
  padding: 20px 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.ws-label {
  display: block;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}

.ws-value {
  font-size: 24px;
  font-weight: 700;

  &.warning { color: #f59e0b; }
  &.info { color: #3b82f6; }
  &.success { color: #10b981; }
}

.data-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;

  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 14px 16px; text-align: left; font-size: 13px; }
  th { background: #f8fafc; font-weight: 600; color: #334155; border-bottom: 1px solid #e2e8f0; }
  td { border-bottom: 1px solid #f1f5f9; }
  tr:hover td { background: #f8fafc; }
}

.artist-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.artist-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.td-amount { font-weight: 700; color: #0f172a; }
.td-balance { color: #64748b; }

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;

  &.badge-pending { background: #fef3c7; color: #d97706; }
  &.badge-approved { background: #eff6ff; color: #2563eb; }
  &.badge-paid { background: #ecfdf5; color: #059669; }
  &.badge-rejected { background: #fef2f2; color: #dc2626; }
}

.action-btns {
  display: flex;
  gap: 8px;
}

.btn-primary, .btn-secondary, .btn-link {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &.sm { padding: 4px 10px; }
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;

  &:hover { opacity: 0.9; }
}

.btn-secondary {
  background: white;
  color: #ef4444;
  border: 1px solid #ef4444;

  &:hover { background: #fef2f2; }
}

.btn-link {
  background: none;
  border: none;
  color: #4f46e5;

  &:hover { text-decoration: underline; }
}
</style>
