<template>
  <div class="works-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2>作品管理</h2>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-section">
      <div class="filter-row">
        <div class="filter-item">
          <label>状态</label>
          <select v-model="filters.status">
            <option value="">全部</option>
            <option value="pending">待审核</option>
            <option value="published">已上架</option>
            <option value="archived">已下架</option>
          </select>
        </div>
        <div class="filter-item">
          <label>分类</label>
          <select v-model="filters.category">
            <option value="">全部</option>
            <option value="tea">茶具</option>
            <option value="dinner">餐具</option>
            <option value="vase">花器</option>
            <option value="deco">摆件</option>
          </select>
        </div>
        <div class="filter-item">
          <label>关键词</label>
          <input type="text" v-model="filters.keyword" placeholder="作品名称" />
        </div>
        <button class="btn-primary" @click="handleSearch">查询</button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>编号</th>
            <th>封面</th>
            <th>作品名称</th>
            <th>艺术家</th>
            <th>分类</th>
            <th>价格</th>
            <th>库存</th>
            <th>销量</th>
            <th>状态</th>
            <th>发布时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="work in workList" :key="work.id">
            <td class="td-id">{{ work.id }}</td>
            <td>
              <div class="work-cover">
                <img :src="work.cover" :alt="work.title" />
              </div>
            </td>
            <td class="td-title">{{ work.title }}</td>
            <td>{{ work.artist }}</td>
            <td>
              <span class="category-tag">{{ work.categoryText }}</span>
            </td>
            <td class="td-price">¥{{ work.price }}</td>
            <td class="td-num">{{ work.stock }}</td>
            <td class="td-num">{{ work.sales }}</td>
            <td>
              <span class="status-badge" :class="'badge-' + work.status">
                {{ work.statusText }}
              </span>
            </td>
            <td class="td-time">{{ work.publishTime }}</td>
            <td>
              <div class="action-btns">
                <button class="btn-link" @click="viewDetail(work)">查看</button>
                <button
                  v-if="work.status === 'published'"
                  class="btn-link warning"
                  @click="toggleStatus(work)"
                >下架</button>
                <button
                  v-else-if="work.status === 'archived'"
                  class="btn-link success"
                  @click="toggleStatus(work)"
                >上架</button>
                <button class="btn-link danger" @click="deleteWork(work)">删除</button>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const page = ref(1)
const pages = ref(10)
const total = ref(256)

const filters = reactive({
  status: '',
  category: '',
  keyword: ''
})

const workList = ref([
  { id: 20001, cover: 'https://via.placeholder.com/60', title: '手绘青花缠枝莲纹品茗杯', artist: '张三丰', category: 'tea', categoryText: '茶具', price: 299, stock: 50, sales: 128, status: 'published', statusText: '已上架', publishTime: '2024-02-10' },
  { id: 20002, cover: 'https://via.placeholder.com/60', title: '粉彩花鸟赏瓶', artist: '李青花', category: 'deco', categoryText: '摆件', price: 1280, stock: 5, sales: 45, status: 'published', statusText: '已上架', publishTime: '2024-02-08' },
  { id: 20003, cover: 'https://via.placeholder.com/60', title: '天青色汝窑茶具套装', artist: '王粉彩', category: 'tea', categoryText: '茶具', price: 899, stock: 20, sales: 89, status: 'published', statusText: '已上架', publishTime: '2024-02-05' },
  { id: 20004, cover: 'https://via.placeholder.com/60', title: '窑变釉花器', artist: '赵汝窑', category: 'vase', categoryText: '花器', price: 568, stock: 8, sales: 23, status: 'pending', statusText: '待审核', publishTime: '2024-02-12' },
  { id: 20005, cover: 'https://via.placeholder.com/60', title: '青花釉里红盖碗', artist: '钱釉里红', category: 'tea', categoryText: '茶具', price: 458, stock: 30, sales: 67, status: 'archived', statusText: '已下架', publishTime: '2024-01-28' }
])

const handleSearch = () => {
  console.log('搜索:', filters)
}

const viewDetail = (work) => {
  console.log('查看作品:', work.id)
}

const toggleStatus = (work) => {
  work.status = work.status === 'published' ? 'archived' : 'published'
  work.statusText = work.status === 'published' ? '已上架' : '已下架'
}

const deleteWork = (work) => {
  if (confirm(`确定要删除作品 "${work.title}" 吗？`)) {
    const index = workList.value.findIndex(w => w.id === work.id)
    if (index !== -1) {
      workList.value.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.works-page {
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

.btn-primary {
  padding: 8px 16px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
}

.filter-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}

.filter-row {
  display: flex;
  gap: 16px;
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

.data-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 14px 12px;
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
  }

  tr:hover td {
    background: #f8fafc;
  }
}

.work-cover {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.category-tag {
  padding: 4px 8px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 12px;
  color: #64748b;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;

  &.badge-published { background: #ecfdf5; color: #059669; }
  &.badge-pending { background: #fef3c7; color: #d97706; }
  &.badge-archived { background: #f1f5f9; color: #64748b; }
}

.action-btns {
  display: flex;
  gap: 4px;
}

.btn-link {
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 6px;

  &:hover { text-decoration: underline; }
  &.warning { color: #f59e0b; }
  &.success { color: #10b981; }
  &.danger { color: #ef4444; }
}

.td-id { font-family: monospace; color: #64748b; }
.td-title { font-weight: 500; max-width: 200px; overflow: hidden; text-overflow: ellipsis; }
.td-price { font-weight: 600; color: #0f172a; }
.td-num { text-align: center; }
.td-time { color: #64748b; font-size: 12px; }

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
}

.pagination-info { font-size: 13px; color: #64748b; }

.pagination-controls {
  display: flex;
  gap: 12px;

  button {
    padding: 6px 14px;
    border: 1px solid #e2e8f0;
    background: white;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;

    &:disabled { opacity: 0.5; cursor: not-allowed; }
  }
}

.page-num { font-size: 13px; color: #334155; }
</style>
