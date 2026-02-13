<template>
  <div class="finance-page">
    <!-- 概览卡片 -->
    <div class="finance-cards">
      <!-- 总资产 -->
      <Card class="total-assets-card">
        <div class="card-bg-icon">
          <Wallet />
        </div>
        <div class="card-content">
          <p class="card-label">总资产 (Total Assets)</p>
          <div class="card-icon-wrapper">
            <Zap />
          </div>
          <h3 class="card-value">¥ 128,450.00</h3>
          <div class="card-trend positive">
            <ArrowUpRight /> +12.5% 较上月
          </div>
        </div>
      </Card>

      <!-- 可用余额 -->
      <Card>
        <div class="stat-row">
          <p class="stat-label">可用余额</p>
          <IconBox variant="emerald">
            <CreditCard />
          </IconBox>
        </div>
        <h3 class="stat-value">¥ 32,500.00</h3>
        <Button variant="primary" class="w-full mt-4">提现至银行卡</Button>
      </Card>

      <!-- 冻结资金 -->
      <Card>
        <div class="stat-row">
          <p class="stat-label">冻结资金</p>
          <IconBox variant="amber">
            <Shield />
          </IconBox>
        </div>
        <h3 class="stat-value muted">¥ 4,280.00</h3>
        <Button variant="secondary" class="w-full mt-4">查看冻结详情</Button>
      </Card>
    </div>

    <!-- 交易流水 -->
    <Card title="交易流水" class="transactions-card">
      <template #extra>
        <div class="filter-btns">
          <Button variant="ghost" sm>本月</Button>
          <Button variant="secondary" sm>
            <Filter /> 筛选
          </Button>
        </div>
      </template>

      <table class="ceramics-table">
        <thead>
          <tr>
            <th width="180">时间</th>
            <th>交易类型</th>
            <th>关联单号</th>
            <th class="text-right">变动金额</th>
            <th class="text-right">状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tx, i) in transactions" :key="i">
            <td class="tx-date">{{ tx.time }}</td>
            <td>
              <div class="tx-type">
                <ArrowUpRight v-if="tx.type === '订单收入'" class="tx-icon income" />
                <ArrowUpRight v-else class="tx-icon expense" />
                {{ tx.type }}
              </div>
            </td>
            <td class="tx-id">{{ tx.id }}</td>
            <td class="tx-amount" :class="tx.amountClass">{{ tx.amount }}</td>
            <td class="text-right">
              <span class="status-badge">{{ tx.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  </div>
</template>

<script setup>
import * as Icons from '@element-plus/icons-vue'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'
import IconBox from '@/components/common/IconBox.vue'

const transactions = [
  { time: '2023-10-25 14:30', type: '订单收入', id: 'ORD-20231024-001', amount: '+450.00', amountClass: 'positive', status: '已入账' },
  { time: '2023-10-24 09:15', type: '余额提现', id: 'TX-20231024-001', amount: '-5,000.00', amountClass: 'negative', status: '处理中' },
  { time: '2023-10-23 18:20', type: '订单收入', id: 'ORD-20231023-005', amount: '+1,280.00', amountClass: 'positive', status: '已入账' }
]
</script>

<style lang="scss" scoped>
.finance-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.finance-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .finance-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.total-assets-card {
  background: linear-gradient(135deg, #1E1B4B, #0F172A);
  border: none;

  :deep(.ceramics-card-body) {
    padding: 24px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .card-bg-icon {
    position: absolute;
    top: -20px;
    right: -20px;
    opacity: 0.1;
    transform: scale(2);
  }

  .card-label {
    font-size: 14px;
    color: #A5B4FC;
    font-weight: 500;
  }

  .card-icon-wrapper {
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px 0;

    svg {
      color: #FACC15;
    }
  }

  .card-value {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -1px;
  }

  .card-trend {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 16px;
    padding: 4px 8px;
    border-radius: 6px;

    &.positive {
      background: rgba(16, 185, 129, 0.2);
      color: #34D399;
    }
  }
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-label {
  font-size: 14px;
  color: #64748B;
  font-weight: 500;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #0F172A;
  margin-top: 8px;

  &.muted {
    color: #94A3B8;
  }
}

.mt-4 {
  margin-top: 16px;
}

.filter-btns {
  display: flex;
  gap: 8px;
}

.transactions-card {
  :deep(.ceramics-card-body) {
    padding: 0;
  }
}

.tx-date {
  font-family: monospace;
  color: #64748B;
  font-size: 12px;
}

.tx-type {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #334155;
}

.tx-icon {
  width: 16px;
  height: 16px;

  &.income {
    color: #10B981;
  }

  &.expense {
    color: #F59E0B;
    transform: rotate(45deg);
  }
}

.tx-id {
  font-family: monospace;
  color: #94A3B8;
  font-size: 12px;
}

.tx-amount {
  font-weight: 700;
  text-align: right;

  &.positive {
    color: #10B981;
  }

  &.negative {
    color: #0F172A;
  }
}

.status-badge {
  display: inline-block;
  padding: 4px 10px;
  background: #F1F5F9;
  color: #64748B;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}
</style>
