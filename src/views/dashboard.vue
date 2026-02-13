<template>
  <div class="dashboard">
    <!-- 概览卡片 -->
    <div class="overview-cards">
      <div class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">今日收入 (元)</p>
            <h3 class="stat-value">12,840.00</h3>
            <div class="stat-trend positive">
              <span class="trend-icon">↑</span>
              +12.5%
            </div>
          </div>
          <div class="icon-box gradient-blue">¥</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">本月订单</p>
            <h3 class="stat-value">328</h3>
            <div class="stat-trend positive">
              <span class="trend-icon">↑</span>
              +5.2%
            </div>
          </div>
          <div class="icon-box gradient-violet">📦</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">待发货</p>
            <h3 class="stat-value">18</h3>
            <div class="stat-trend warning">需处理</div>
          </div>
          <div class="icon-box gradient-amber">⏰</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-content">
          <div class="stat-info">
            <p class="stat-label">作品总数</p>
            <h3 class="stat-value">56</h3>
            <div class="stat-trend info">已发布</div>
          </div>
          <div class="icon-box gradient-emerald">🎨</div>
        </div>
      </div>
    </div>

    <!-- 快捷入口 & 图表 -->
    <div class="dashboard-grid">
      <div class="quick-nav-card">
        <h3 class="card-title">快捷导航</h3>
        <div class="quick-nav-grid">
          <div class="quick-nav-item" onclick="window.location.href='/works/upload'">
            <div class="quick-nav-icon blue">+</div>
            <span class="quick-nav-label">发布作品</span>
          </div>
          <div class="quick-nav-item" onclick="window.location.href='/orders'">
            <div class="quick-nav-icon violet">📋</div>
            <span class="quick-nav-label">订单处理</span>
          </div>
          <div class="quick-nav-item" onclick="window.location.href='/finance'">
            <div class="quick-nav-icon emerald">💰</div>
            <span class="quick-nav-label">资金管理</span>
          </div>
          <div class="quick-nav-item" onclick="window.location.href='/analytics'">
            <div class="quick-nav-icon amber">📊</div>
            <span class="quick-nav-label">数据报表</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <div class="card-header">
          <h3>销售趋势 (Revenue)</h3>
          <select class="chart-filter">
            <option>近 7 天</option>
            <option>近 30 天</option>
          </select>
        </div>
        <div class="chart-container">
          <div class="chart-bars">
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 40%"></div>
              </div>
              <span class="chart-label">1日</span>
            </div>
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 70%"></div>
              </div>
              <span class="chart-label">2日</span>
            </div>
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 45%"></div>
              </div>
              <span class="chart-label">3日</span>
            </div>
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 90%"></div>
              </div>
              <span class="chart-label">4日</span>
            </div>
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 65%"></div>
              </div>
              <span class="chart-label">5日</span>
            </div>
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 80%"></div>
              </div>
              <span class="chart-label">6日</span>
            </div>
            <div class="chart-bar-wrapper">
              <div class="chart-bar-bg">
                <div class="chart-bar" style="height: 100%"></div>
              </div>
              <span class="chart-label">7日</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最近订单 -->
    <div class="recent-orders">
      <div class="card-header">
        <h3>最新交易</h3>
        <a href="/orders" class="view-all">查看全部 →</a>
      </div>
      <table class="ceramics-table">
        <thead>
          <tr>
            <th>订单号</th>
            <th>商品信息</th>
            <th>客户</th>
            <th>金额</th>
            <th>状态</th>
            <th class="text-right">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="order-id">ORD-2310-001</td>
            <td class="order-name">手绘青花缠枝莲纹品茗杯</td>
            <td>
              <div class="buyer-info">
                <div class="buyer-avatar">李</div>
                李**
              </div>
            </td>
            <td class="order-price">¥299.00</td>
            <td><span class="badge badge-warning">待发货</span></td>
            <td class="text-right">
              <button class="action-link">发货处理</button>
            </td>
          </tr>
          <tr>
            <td class="order-id">ORD-2310-002</td>
            <td class="order-name">粉彩花鸟赏瓶 - 限量版</td>
            <td>
              <div class="buyer-info">
                <div class="buyer-avatar">张</div>
                张**
              </div>
            </td>
            <td class="order-price">¥1,280.00</td>
            <td><span class="badge badge-success">已发货</span></td>
            <td class="text-right">
              <button class="action-link muted">查看详情</button>
            </td>
          </tr>
          <tr>
            <td class="order-id">ORD-2310-003</td>
            <td class="order-name">天青色汝窑茶具套装</td>
            <td>
              <div class="buyer-info">
                <div class="buyer-avatar">王</div>
                王**
              </div>
            </td>
            <td class="order-price">¥899.00</td>
            <td><span class="badge badge-success">已完成</span></td>
            <td class="text-right">
              <button class="action-link muted">查看详情</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// 仪表盘页面
</script>

<style lang="scss" scoped>
.dashboard {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .overview-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .overview-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #F1F5F9;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

.stat-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat {
  &-label {
    font-size: 14px;
    color: #64748B;
    font-weight: 500;
    margin-bottom: 4px;
  }

  &-value {
    font-size: 28px;
    font-weight: 700;
    color: #0F172A;
    letter-spacing: -0.5px;
  }

  &-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 12px;
    padding: 4px 8px;
    border-radius: 6px;
    background: #F8FAFC;

    &.positive { color: #10B981; background: #ECFDF5; }
    &.negative { color: #EF4444; }
    &.warning { color: #F59E0B; background: #FFFBEB; }
    &.info { color: #4F46E5; background: #EEF2FF; }
  }
}

.trend-icon {
  font-size: 14px;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;

  &.gradient-blue { background: linear-gradient(135deg, #3B82F6, #1D4ED8); color: white; }
  &.gradient-violet { background: linear-gradient(135deg, #8B5CF6, #6D28D9); color: white; }
  &.gradient-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: white; }
  &.gradient-emerald { background: linear-gradient(135deg, #10B981, #059669); color: white; }
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (min-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr 2fr;
  }
}

.quick-nav-card, .chart-card, .recent-orders {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #F1F5F9;
}

.card-title, .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #0F172A;
  }
}

.view-all {
  font-size: 14px;
  color: #4F46E5;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.quick-nav-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.quick-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid #F1F5F9;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4F46E5;
    background: #F8FAFC;
    transform: translateY(-2px);
  }
}

.quick-nav-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  font-size: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.blue { background: #EFF6FF; color: #2563EB; }
  &.violet { background: #F5F3FF; color: #7C3AED; }
  &.emerald { background: #ECFDF5; color: #059669; }
  &.amber { background: #FFFBEB; color: #D97706; }
}

.quick-nav-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
}

.chart-filter {
  font-size: 12px;
  border: 1px solid #E2E8F0;
  background: #F8FAFC;
  border-radius: 6px;
  padding: 4px 8px;
  color: #64748B;
  outline: none;
  cursor: pointer;
}

.chart-container {
  height: 200px;
  margin-top: 16px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  height: 180px;
  padding: 0 8px;
}

.chart-bar-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.chart-bar-bg {
  width: 100%;
  height: 160px;
  background: #F1F5F9;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.chart-bar {
  width: 100%;
  background: linear-gradient(180deg, #4F46E5 0%, #8B5CF6 100%);
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
}

.chart-label {
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
}

.recent-orders {
  margin-bottom: 24px;
}

.ceramics-table {
  width: 100%;
  border-collapse: collapse;
}

.ceramics-table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  border-bottom: 1px solid #F1F5F9;
}

.ceramics-table td {
  padding: 16px;
  border-bottom: 1px solid #F1F5F9;
  font-size: 14px;
}

.order-id {
  font-family: monospace;
  color: #64748B;
  font-size: 12px;
}

.order-name {
  font-weight: 600;
  color: #0F172A;
}

.buyer-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.buyer-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #EEF2FF;
  color: #4F46E5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
}

.order-price {
  font-weight: 700;
  color: #0F172A;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;

  &.badge-warning { background: #FFFBEB; color: #D97706; }
  &.badge-success { background: #ECFDF5; color: #059669; }
  &.badge-info { background: #EEF2FF; color: #4F46E5; }
}

.action-link {
  font-size: 14px;
  font-weight: 600;
  color: #4F46E5;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #4338CA;
  }

  &.muted {
    color: #94A3B8;

    &:hover {
      color: #64748B;
    }
  }
}

.text-right {
  text-align: right;
}
</style>
