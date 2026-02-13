<template>
  <div class="artists-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2>艺术家管理</h2>
      <div class="header-actions">
        <button class="btn-secondary" @click="handleExport">导出数据</button>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <label>认证状态</label>
          <select v-model="filters.status">
            <option value="">全部</option>
            <option value="pending">待审核</option>
            <option value="verified">已认证</option>
            <option value="rejected">已拒绝</option>
          </select>
        </div>
        <div class="filter-item">
          <label>账户状态</label>
          <select v-model="filters.accountStatus">
            <option value="">全部</option>
            <option value="normal">正常</option>
            <option value="disabled">已禁用</option>
            <option value="banned">已封禁</option>
          </select>
        </div>
        <div class="filter-item">
          <label>注册时间</label>
          <input type="date" v-model="filters.startDate" placeholder="开始日期" />
          <span class="date-separator">至</span>
          <input type="date" v-model="filters.endDate" placeholder="结束日期" />
        </div>
        <div class="filter-item">
          <button class="btn-primary" @click="handleSearch">查询</button>
          <button class="btn-secondary" @click="handleReset">重置</button>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>艺术家</th>
            <th>手机号</th>
            <th>认证状态</th>
            <th>作品数</th>
            <th>总销售额</th>
            <th>注册时间</th>
            <th>最后登录</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="artist in artistList" :key="artist.id">
            <td class="td-id">{{ artist.id }}</td>
            <td>
              <div class="artist-cell">
                <div class="artist-avatar">{{ artist.name[0] }}</div>
                <span>{{ artist.name }}</span>
              </div>
            </td>
            <td class="td-phone">{{ artist.phone }}</td>
            <td>
              <span class="badge" :class="'badge-' + artist.verifyStatus">
                {{ artist.verifyStatusText }}
              </span>
            </td>
            <td class="td-num">{{ artist.workCount }}</td>
            <td class="td-money">¥{{ formatMoney(artist.totalSales) }}</td>
            <td class="td-time">{{ artist.registerTime }}</td>
            <td class="td-time">{{ artist.lastLogin }}</td>
            <td>
              <span class="status-tag" :class="'status-' + artist.accountStatus">
                {{ artist.accountStatusText }}
              </span>
            </td>
            <td>
              <div class="action-btns">
                <button class="btn-link" @click="viewDetail(artist)">查看</button>
                <button class="btn-link" @click="editArtist(artist)">编辑</button>
                <button
                  v-if="artist.accountStatus === 'normal'"
                  class="btn-link danger"
                  @click="disableArtist(artist)"
                >禁用</button>
                <button
                  v-else
                  class="btn-link success"
                  @click="enableArtist(artist)"
                >启用</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <span class="pagination-info">共 {{ total }} 条</span>
      <div class="pagination-controls">
        <button :disabled="page <= 1" @click="page--">上一页</button>
        <span class="page-num">{{ page }} / {{ pages }}</span>
        <button :disabled="page >= pages" @click="page++">下一页</button>
      </div>
    </div>

    <!-- 详情抽屉 -->
    <div class="drawer-mask" v-if="showDetail" @click="showDetail = false"></div>
    <div class="drawer" :class="{ open: showDetail }">
      <div class="drawer-header">
        <h3>艺术家详情</h3>
        <button class="drawer-close" @click="showDetail = false">×</button>
      </div>
      <div class="drawer-body" v-if="currentArtist">
        <div class="detail-section">
          <h4>基本信息</h4>
          <div class="detail-row">
            <span class="detail-label">昵称</span>
            <span class="detail-value">{{ currentArtist.name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">手机号</span>
            <span class="detail-value">{{ currentArtist.phone }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">真实姓名</span>
            <span class="detail-value">{{ currentArtist.realName || '未填写' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">所在城市</span>
            <span class="detail-value">{{ currentArtist.city || '未填写' }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">个人简介</span>
            <span class="detail-value">{{ currentArtist.bio || '未填写' }}</span>
          </div>
        </div>
        <div class="detail-section">
          <h4>数据统计</h4>
          <div class="stats-grid">
            <div class="mini-stat">
              <span class="mini-value">{{ currentArtist.workCount }}</span>
              <span class="mini-label">作品数</span>
            </div>
            <div class="mini-stat">
              <span class="mini-value">¥{{ formatMoney(currentArtist.totalSales) }}</span>
              <span class="mini-label">总销售额</span>
            </div>
            <div class="mini-stat">
              <span class="mini-value">{{ currentArtist.orderCount }}</span>
              <span class="mini-label">订单数</span>
            </div>
          </div>
        </div>
      </div>
      <div class="drawer-footer">
        <button class="btn-secondary" @click="showDetail = false">关闭</button>
        <button class="btn-primary" @click="goToDetail">查看完整详情</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showDetail = ref(false)
const currentArtist = ref(null)
const page = ref(1)
const pages = ref(10)
const total = ref(128)

const filters = reactive({
  status: '',
  accountStatus: '',
  startDate: '',
  endDate: ''
})

// 模拟数据
const artistList = ref([
  { id: 10001, name: '张三丰', phone: '138****8888', verifyStatus: 'verified', verifyStatusText: '已认证', workCount: 56, totalSales: 128400, registerTime: '2024-01-15', lastLogin: '2024-02-12', accountStatus: 'normal', accountStatusText: '正常', realName: '张三', city: '景德镇', bio: '从事瓷器创作20年' },
  { id: 10002, name: '李青花', phone: '139****6666', verifyStatus: 'pending', verifyStatusText: '待审核', workCount: 23, totalSales: 45600, registerTime: '2024-02-01', lastLogin: '2024-02-11', accountStatus: 'normal', accountStatusText: '正常', realName: '李丽', city: '景德镇', bio: '青花瓷非遗传承人' },
  { id: 10003, name: '王粉彩', phone: '137****5555', verifyStatus: 'verified', verifyStatusText: '已认证', workCount: 89, totalSales: 256800, registerTime: '2023-11-20', lastLogin: '2024-02-10', accountStatus: 'normal', accountStatusText: '正常', realName: '王华', city: '景德镇', bio: '粉彩技艺传承' },
  { id: 10004, name: '赵汝窑', phone: '136****4444', verifyStatus: 'rejected', verifyStatusText: '已拒绝', workCount: 12, totalSales: 8900, registerTime: '2024-02-05', lastLogin: '2024-02-08', accountStatus: 'disabled', accountStatusText: '已禁用', realName: '赵明', city: '景德镇', bio: '' },
  { id: 10005, name: '钱釉里红', phone: '135****3333', verifyStatus: 'verified', verifyStatusText: '已认证', workCount: 45, totalSales: 98700, registerTime: '2024-01-08', lastLogin: '2024-02-12', accountStatus: 'normal', accountStatusText: '正常', realName: '钱红', city: '景德镇', bio: '釉里红技艺' }
])

const formatMoney = (num) => {
  return num.toLocaleString()
}

const handleSearch = () => {
  console.log('搜索条件:', filters)
}

const handleReset = () => {
  filters.status = ''
  filters.accountStatus = ''
  filters.startDate = ''
  filters.endDate = ''
}

const handleExport = () => {
  console.log('导出数据')
}

const viewDetail = (artist) => {
  currentArtist.value = artist
  showDetail.value = true
}

const editArtist = (artist) => {
  console.log('编辑艺术家:', artist.id)
}

const disableArtist = (artist) => {
  if (confirm(`确定要禁用艺术家 "${artist.name}" 吗？`)) {
    artist.accountStatus = 'disabled'
    artist.accountStatusText = '已禁用'
  }
}

const enableArtist = (artist) => {
  artist.accountStatus = 'normal'
  artist.accountStatusText = '正常'
}

const goToDetail = () => {
  router.push(`/admin/artists/${currentArtist.value.id}`)
}
</script>

<style lang="scss" scoped>
.artists-page {
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

.btn-primary, .btn-secondary, .btn-link {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
  }
}

.btn-secondary {
  background: white;
  color: #334155;
  border: 1px solid #e2e8f0;
  margin-left: 8px;

  &:hover {
    background: #f8fafc;
  }
}

.btn-link {
  background: none;
  border: none;
  color: #4f46e5;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }

  &.danger { color: #ef4444; }
  &.success { color: #10b981; }
}

.filter-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-end;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    color: #64748b;
  }

  select, input {
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 13px;
    outline: none;

    &:focus {
      border-color: #f59e0b;
    }
  }
}

.date-separator {
  color: #94a3b8;
  padding: 0 8px;
}

.data-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 14px 16px;
    text-align: left;
    font-size: 13px;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    color: #334155;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    border-bottom: 1px solid #f1f5f9;
    color: #0f172a;
  }

  tr:hover td {
    background: #f8fafc;
  }
}

.artist-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.artist-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;

  &-pending { background: #fef3c7; color: #d97706; }
  &-verified { background: #ecfdf5; color: #059669; }
  &-rejected { background: #fef2f2; color: #dc2626; }
}

.status-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;

  &-normal { background: #f1f5f9; color: #334155; }
  &-disabled { background: #fef2f2; color: #dc2626; }
  &-banned { background: #fef2f2; color: #7f1d1d; }
}

.action-btns {
  display: flex;
  gap: 4px;
}

.td-id { font-family: monospace; color: #64748b; }
.td-phone { color: #64748b; }
.td-num, .td-money { font-weight: 600; }
.td-time { color: #64748b; font-size: 12px; }

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.pagination-info {
  font-size: 13px;
  color: #64748b;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;

  button {
    padding: 6px 14px;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

.page-num {
  font-size: 13px;
  color: #334155;
}

.drawer-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: white;
  z-index: 100;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  &.open {
    transform: translateX(0);
  }
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    font-size: 16px;
    font-weight: 600;
  }
}

.drawer-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background: #e2e8f0;
  }
}

.drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.detail-section {
  margin-bottom: 24px;

  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #f1f5f9;
  }
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
}

.detail-label {
  font-size: 13px;
  color: #64748b;
}

.detail-value {
  font-size: 13px;
  color: #0f172a;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.mini-stat {
  background: #f8fafc;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}

.mini-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.mini-label {
  font-size: 12px;
  color: #64748b;
}

.drawer-footer {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
