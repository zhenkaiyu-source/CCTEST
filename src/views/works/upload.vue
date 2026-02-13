<template>
  <div class="upload-page">
    <!-- 返回按钮 -->
    <div class="page-header">
      <router-link to="/works" class="back-btn">
        <ChevronDown class="rotate-90" /> 返回
      </router-link>
      <div class="page-title">
        <h2>发布新作品</h2>
        <p>完善商品信息以获得更好的推广效果</p>
      </div>
    </div>

    <div class="upload-grid">
      <div class="upload-main">
        <!-- 基础信息 -->
        <Card title="基础信息">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">作品名称 <span class="required">*</span></label>
              <input type="text" class="ceramics-input" placeholder="例如：极简白瓷·大师手作系列" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">分类</label>
                <select class="ceramics-select">
                  <option>请选择分类</option>
                  <option>茶具</option>
                  <option>餐具</option>
                  <option>花器</option>
                  <option>摆件</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">发货时效</label>
                <select class="ceramics-select">
                  <option>24h 极速发货</option>
                  <option>3 天内发货</option>
                  <option>7 天预售 (定制)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">作品描述</label>
              <textarea class="ceramics-textarea" placeholder="请输入详细的作品描述，支持 Markdown 格式..."></textarea>
            </div>
          </div>
        </Card>

        <!-- 视觉素材 -->
        <Card title="视觉素材">
          <div class="upload-area">
            <div class="dropzone">
              <div class="dropzone-icon">
                <Upload />
              </div>
              <p class="dropzone-text">点击或拖拽上传主图</p>
              <p class="dropzone-hint">支持 JPG, PNG, WEBP (Max 5MB)</p>
            </div>
            <div class="thumbnail-list">
              <div v-for="n in 3" :key="n" class="thumbnail">
                <ImageIcon />
                <span v-if="n === 3" class="thumbnail-add"><Plus /></span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div class="upload-sidebar">
        <!-- 价格与库存 -->
        <Card title="价格与库存">
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">销售价格 (CNY) <span class="required">*</span></label>
              <div class="price-input">
                <span class="currency">¥</span>
                <input type="number" class="ceramics-input" placeholder="0.00" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">初始库存 <span class="required">*</span></label>
              <input type="number" class="ceramics-input" placeholder="100" />
            </div>
          </div>
        </Card>

        <!-- 操作按钮 -->
        <Card class="action-card">
          <Button variant="primary" class="w-full" @click="handlePublish">
            <CheckCircle2 /> 立即发布
          </Button>
          <Button variant="secondary" class="w-full">保存草稿</Button>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as Icons from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import Card from '@/components/common/Card.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()

const handlePublish = () => {
  router.push('/works')
}
</script>

<style lang="scss" scoped>
.upload-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: white;
  border: 1px solid #E2E8F0;
  color: #64748B;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4F46E5;
    color: #4F46E5;
  }

  .rotate-90 {
    transform: rotate(-90deg);
  }
}

.page-title {
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 4px;
  }

  p {
    font-size: 14px;
    color: #64748B;
  }
}

.upload-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 1024px) {
  .upload-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.upload-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.upload-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  margin-bottom: 8px;

  .required {
    color: #EF4444;
  }
}

.upload-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dropzone {
  border: 2px dashed #CBD5E1;
  border-radius: 12px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #F8FAFC;

  &:hover {
    border-color: #4F46E5;
    color: #4F46E5;
    background: #EEF2FF;
  }
}

.dropzone-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dropzone-text {
  font-size: 14px;
  font-weight: 500;
}

.dropzone-hint {
  font-size: 12px;
  margin-top: 4px;
}

.thumbnail-list {
  display: flex;
  gap: 16px;
}

.thumbnail {
  width: 96px;
  height: 96px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: #F8FAFC;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #CBD5E1;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4F46E5;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.thumbnail-add {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.price-input {
  position: relative;

  .currency {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    font-weight: 600;
  }

  .ceramics-input {
    padding-left: 28px;
    font-family: monospace;
  }
}

.action-card {
  :deep(.ceramics-card-body) {
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #F8FAFC;
    border: none;
  }
}
</style>
