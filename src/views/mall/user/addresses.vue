<template>
  <div class="addresses-page">
    <div class="page-header">
      <router-link to="/user" class="back-link">← 返回个人中心</router-link>
      <h2>收货地址</h2>
    </div>

    <div class="address-list">
      <div v-for="addr in addresses" :key="addr.id" class="address-card" :class="{ default: addr.isDefault }">
        <div class="address-info">
          <div class="addr-header">
            <span class="addr-name">{{ addr.name }}</span>
            <span class="addr-phone">{{ addr.phone }}</span>
            <span v-if="addr.isDefault" class="default-tag">默认</span>
          </div>
          <p class="addr-detail">
            {{ addr.province }}{{ addr.city }}{{ addr.district }}{{ addr.detail }}
          </p>
        </div>
        <div class="address-actions">
          <button @click="editAddress(addr)">编辑</button>
          <button v-if="!addr.isDefault" @click="setDefault(addr)">设为默认</button>
          <button class="delete" @click="deleteAddress(addr)">删除</button>
        </div>
      </div>

      <div class="address-card add-card" @click="showForm = true">
        <span class="add-icon">+</span>
        <span>添加新地址</span>
      </div>
    </div>

    <!-- 地址表单弹窗 -->
    <div v-if="showForm" class="modal-overlay" @click.self="closeForm">
      <div class="modal-content">
        <h3>{{ editing ? '编辑地址' : '添加地址' }}</h3>
        <div class="form-group">
          <label>收货人</label>
          <input type="text" v-model="form.name" placeholder="请输入收货人姓名" />
        </div>
        <div class="form-group">
          <label>手机号</label>
          <input type="tel" v-model="form.phone" placeholder="请输入手机号" />
        </div>
        <div class="form-group">
          <label>所在地区</label>
          <div class="region-select">
            <select v-model="form.province">
              <option value="">省份</option>
              <option value="北京市">北京市</option>
              <option value="上海市">上海市</option>
              <option value="广东省">广东省</option>
            </select>
            <select v-model="form.city">
              <option value="">城市</option>
              <option value="深圳市">深圳市</option>
              <option value="广州市">广州市</option>
              <option value="杭州市">杭州市</option>
            </select>
            <select v-model="form.district">
              <option value="">区县</option>
              <option value="南山区">南山区</option>
              <option value="福田区">福田区</option>
              <option value="朝阳区">朝阳区</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>详细地址</label>
          <input type="text" v-model="form.detail" placeholder="请输入详细地址" />
        </div>
        <div class="form-actions">
          <button class="btn-cancel" @click="closeForm">取消</button>
          <button class="btn-confirm" @click="saveAddress">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const addresses = ref([
  { id: '1', name: '张三', phone: '13800138000', province: '北京市', city: '北京市', district: '朝阳区', detail: 'xxx街道xxx号xxx小区1号楼101', isDefault: true },
  { id: '2', name: '李四', phone: '13900139000', province: '广东省', city: '深圳市', district: '南山区', detail: '科技园xxx大厦xxx室', isDefault: false }
])

const showForm = ref(false)
const editing = ref(false)
const form = ref({ id: '', name: '', phone: '', province: '', city: '', district: '', detail: '', isDefault: false })

const editAddress = (addr) => {
  editing.value = true
  form.value = { ...addr }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editing.value = false
  form.value = { id: '', name: '', phone: '', province: '', city: '', district: '', detail: '', isDefault: false }
}

const saveAddress = () => {
  if (!form.value.name || !form.value.phone || !form.value.detail) {
    alert('请填写完整信息')
    return
  }

  if (editing.value) {
    const index = addresses.value.findIndex(a => a.id === form.value.id)
    if (index > -1) addresses.value[index] = { ...form.value }
  } else {
    form.value.id = String(Date.now())
    addresses.value.push({ ...form.value })
  }
  closeForm()
}

const setDefault = (addr) => {
  addresses.value.forEach(a => a.isDefault = false)
  addr.isDefault = true
}

const deleteAddress = (addr) => {
  if (confirm('确定删除该地址？')) {
    const index = addresses.value.findIndex(a => a.id === addr.id)
    if (index > -1) addresses.value.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.addresses-page {
  padding: 24px 0;
}

.page-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;

  .back-link {
    color: #666;
    text-decoration: none;
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
  }
}

.address-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.address-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid transparent;

  &.default {
    border-color: #d97706;
  }

  &.add-card {
    border: 2px dashed #e5e7eb;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    color: #9ca3af;
    cursor: pointer;

    &:hover {
      border-color: #d97706;
      color: #d97706;
    }
  }
}

.add-icon {
  font-size: 32px;
}

.address-info {
  .addr-header {
    margin-bottom: 8px;

    .addr-name {
      font-weight: 600;
      color: #1a1a2e;
      margin-right: 12px;
    }

    .addr-phone {
      color: #666;
      margin-right: 12px;
    }

    .default-tag {
      background: #d97706;
      color: white;
      font-size: 10px;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }

  .addr-detail {
    font-size: 14px;
    color: #666;
  }
}

.address-actions {
  display: flex;
  gap: 12px;

  button {
    background: none;
    border: none;
    color: #666;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: #d97706;
    }

    &.delete:hover {
      color: #ef4444;
    }
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 480px;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
  }
}

.form-group {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    color: #374151;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
  }
}

.region-select {
  display: flex;
  gap: 8px;

  select {
    flex: 1;
    padding: 10px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
  }
}

.form-actions {
  display: flex;
  gap: 16px;
  margin-top: 32px;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  .btn-cancel {
    background: #f3f4f6;
    border: none;
    color: #666;
  }

  .btn-confirm {
    background: #d97706;
    border: none;
    color: white;
  }
}
</style>
