<template>
  <div class="settings-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h2>系统设置</h2>
    </div>

    <!-- 设置分类 -->
    <div class="settings-layout">
      <aside class="settings-nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </aside>

      <main class="settings-content">
        <!-- 基础设置 -->
        <div v-if="activeTab === 'basic'" class="settings-section">
          <h3>基础设置</h3>
          <div class="form-group">
            <label>平台名称</label>
            <input type="text" v-model="settings.platformName" placeholder="请输入平台名称" />
          </div>
          <div class="form-group">
            <label>平台 Logo</label>
            <div class="logo-upload">
              <div class="logo-preview">🏺</div>
              <button class="btn-secondary">更换 Logo</button>
            </div>
          </div>
          <div class="form-group">
            <label>服务费率 (%)</label>
            <input type="number" v-model="settings.feeRate" min="0" max="100" />
          </div>
          <div class="form-group">
            <label>最低提现金额 (元)</label>
            <input type="number" v-model="settings.minWithdraw" min="0" />
          </div>
          <div class="form-group">
            <label>客服电话</label>
            <input type="tel" v-model="settings.servicePhone" placeholder="请输入客服电话" />
          </div>
          <div class="form-actions">
            <button class="btn-primary" @click="saveSettings">保存设置</button>
          </div>
        </div>

        <!-- 分类管理 -->
        <div v-if="activeTab === 'categories'" class="settings-section">
          <h3>分类管理</h3>
          <div class="category-list">
            <div class="category-item" v-for="cat in categories" :key="cat.id">
              <div class="cat-info">
                <span class="cat-icon">{{ cat.icon }}</span>
                <span class="cat-name">{{ cat.name }}</span>
              </div>
              <div class="cat-actions">
                <button class="btn-link" @click="editCategory(cat)">编辑</button>
                <button class="btn-link danger" @click="deleteCategory(cat)">删除</button>
              </div>
            </div>
          </div>
          <div class="add-category">
            <h4>添加分类</h4>
            <div class="form-inline">
              <input type="text" v-model="newCategory.name" placeholder="分类名称" />
              <input type="text" v-model="newCategory.icon" placeholder="图标emoji" />
              <button class="btn-primary" @click="addCategory">添加</button>
            </div>
          </div>
        </div>

        <!-- 管理员管理 -->
        <div v-if="activeTab === 'admins'" class="settings-section">
          <h3>管理员列表</h3>
          <div class="admin-list">
            <table>
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>账号</th>
                  <th>角色</th>
                  <th>状态</th>
                  <th>最后登录</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="admin in adminList" :key="admin.id">
                  <td>{{ admin.name }}</td>
                  <td>{{ admin.username }}</td>
                  <td>
                    <span class="role-badge">{{ admin.roleText }}</span>
                  </td>
                  <td>
                    <span class="status-badge" :class="admin.status === 'normal' ? 'success' : 'disabled'">
                      {{ admin.statusText }}
                    </span>
                  </td>
                  <td>{{ admin.lastLogin }}</td>
                  <td>
                    <button class="btn-link" @click="editAdmin(admin)">编辑</button>
                    <button v-if="admin.status === 'normal'" class="btn-link warning" @click="disableAdmin(admin)">禁用</button>
                    <button v-else class="btn-link success" @click="enableAdmin(admin)">启用</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="add-admin">
            <button class="btn-primary" @click="showAddAdmin = true">+ 添加管理员</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTab = ref('basic')

const tabs = [
  { id: 'basic', label: '基础设置', icon: '⚙️' },
  { id: 'categories', label: '分类管理', icon: '📁' },
  { id: 'admins', label: '管理员', icon: '👥' }
]

const settings = reactive({
  platformName: '瓷韵 · 瓷器手作平台',
  feeRate: 5,
  minWithdraw: 100,
  servicePhone: '400-888-8888'
})

const categories = ref([
  { id: 1, name: '茶具', icon: '🍵' },
  { id: 2, name: '餐具', icon: '🍽️' },
  { id: 3, name: '花器', icon: '🌸' },
  { id: 4, name: '摆件', icon: '🏺' },
  { id: 5, name: '其他', icon: '📦' }
])

const newCategory = reactive({
  name: '',
  icon: ''
})

const adminList = ref([
  { id: 1, name: '超级管理员', username: 'admin', role: 'super_admin', roleText: '超级管理员', status: 'normal', statusText: '正常', lastLogin: '2024-02-12 09:15' },
  { id: 2, name: '运营管理员', username: 'ops_admin', role: 'ops_admin', roleText: '运营管理员', status: 'normal', statusText: '正常', lastLogin: '2024-02-11 16:30' },
  { id: 3, name: '财务管理员', username: 'finance_admin', role: 'finance_admin', roleText: '财务管理员', status: 'normal', statusText: '正常', lastLogin: '2024-02-10 14:20' }
])

const showAddAdmin = ref(false)

const saveSettings = () => {
  alert('设置已保存')
}

const addCategory = () => {
  if (newCategory.name && newCategory.icon) {
    categories.value.push({
      id: Date.now(),
      name: newCategory.name,
      icon: newCategory.icon
    })
    newCategory.name = ''
    newCategory.icon = ''
  }
}

const editCategory = (cat) => {
  console.log('编辑分类:', cat.id)
}

const deleteCategory = (cat) => {
  if (confirm(`确定要删除分类 "${cat.name}" 吗？`)) {
    const index = categories.value.findIndex(c => c.id === cat.id)
    if (index !== -1) {
      categories.value.splice(index, 1)
    }
  }
}

const editAdmin = (admin) => {
  console.log('编辑管理员:', admin.id)
}

const disableAdmin = (admin) => {
  admin.status = 'disabled'
  admin.statusText = '已禁用'
}

const enableAdmin = (admin) => {
  admin.status = 'normal'
  admin.statusText = '正常'
}
</script>

<style lang="scss" scoped>
.settings-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  margin-bottom: 24px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #0f172a;
  }
}

.settings-layout {
  display: flex;
  gap: 24px;
}

.settings-nav {
  width: 200px;
  flex-shrink: 0;

  button {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border: none;
    background: white;
    border-radius: 8px;
    font-size: 14px;
    color: #64748b;
    cursor: pointer;
    margin-bottom: 4px;
    transition: all 0.2s ease;

    &:hover {
      background: #f8fafc;
    }

    &.active {
      background: linear-gradient(90deg, rgba(245, 158, 11, 0.1), transparent);
      color: #f59e0b;
      font-weight: 500;
    }
  }
}

.settings-content {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 24px;
}

.settings-section {
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f5f9;
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: #334155;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    max-width: 400px;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #f59e0b;
    }
  }
}

.logo-upload {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-preview {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.btn-primary, .btn-secondary, .btn-link {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;

  &:hover { transform: translateY(-1px); }
}

.btn-secondary {
  background: white;
  color: #334155;
  border: 1px solid #e2e8f0;

  &:hover { background: #f8fafc; }
}

.btn-link {
  background: none;
  border: none;
  color: #4f46e5;
  padding: 4px 8px;

  &:hover { text-decoration: underline; }
  &.danger { color: #ef4444; }
  &.warning { color: #f59e0b; }
  &.success { color: #10b981; }
}

.form-actions {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.category-list {
  margin-bottom: 32px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 8px;
}

.cat-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cat-icon {
  font-size: 20px;
}

.cat-name {
  font-size: 14px;
  color: #0f172a;
}

.add-category {
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #334155;
    margin-bottom: 12px;
  }
}

.form-inline {
  display: flex;
  gap: 12px;

  input {
    padding: 8px 12px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 13px;
    outline: none;

    &:focus { border-color: #f59e0b; }
  }
}

.admin-list {
  margin-bottom: 20px;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 12px 16px;
    text-align: left;
    font-size: 13px;
    border-bottom: 1px solid #f1f5f9;
  }

  th {
    background: #f8fafc;
    font-weight: 600;
    color: #334155;
  }

  td {
    color: #0f172a;
  }
}

.role-badge {
  padding: 4px 10px;
  background: #f1f5f9;
  border-radius: 4px;
  font-size: 12px;
  color: #64748b;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;

  &.success { background: #ecfdf5; color: #059669; }
  &.disabled { background: #fef2f2; color: #dc2626; }
}

.add-admin {
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}
</style>
