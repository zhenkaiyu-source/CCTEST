<template>
  <div class="works-page">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <div class="search-box">
          <Search class="search-icon" />
          <input type="text" class="search-input" placeholder="搜索作品..." />
        </div>
        <div class="toolbar-actions">
          <button class="toolbar-btn">
            <Filter />
          </button>
          <button class="toolbar-btn">
            <ArrowUpRight />
          </button>
        </div>
      </div>
      <router-link to="/works/upload">
        <Button variant="primary">
          <Plus /> 新建作品
        </Button>
      </router-link>
    </div>

    <!-- 作品网格 -->
    <div class="works-grid">
      <div v-for="n in 8" :key="n" class="work-card">
        <div class="work-image">
          <ImageIcon class="work-placeholder" />
          <div class="work-overlay">
            <Badge :status="n % 3 === 0 ? '已下架' : '已上架'">
              {{ n % 3 === 0 ? '已下架' : '已上架' }}
            </Badge>
          </div>
        </div>
        <div class="work-info">
          <h4 class="work-title">现代极简·青花瓷茶杯 {{ n }}</h4>
          <div class="work-meta">
            <span class="work-price">¥299</span>
            <span class="work-sales">销量 {{ n * 12 }}</span>
          </div>
        </div>
        <div class="work-actions">
          <button class="work-action-btn">
            <Edit /> 编辑
          </button>
          <button class="work-action-btn danger">
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as Icons from '@element-plus/icons-vue'
import Button from '@/components/common/Button.vue'
import Badge from '@/components/common/Badge.vue'
</script>

<style lang="scss" scoped>
.works-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  background: white;
  padding: 16px 20px;
  border-radius: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 300px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
  }

  .search-input {
    width: 100%;
    height: 40px;
    padding: 0 16px 0 40px;
    border: 1px solid #E2E8F0;
    border-radius: 10px;
    font-size: 14px;
    outline: none;
    background: #F8FAFC;

    &:focus {
      border-color: #4F46E5;
      background: white;
    }
  }
}

.toolbar-actions {
  display: flex;
  gap: 8px;
}

.toolbar-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  background: white;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4F46E5;
    color: #4F46E5;
    background: #F8FAFC;
  }
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 640px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1280px) {
  .works-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.work-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #F1F5F9;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
}

.work-image {
  height: 192px;
  background: #F1F5F9;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #F8FAFC;
  }
}

.work-placeholder {
  color: #CBD5E1;
  transition: all 0.5s ease;

  .work-card:hover & {
    color: #C7D2FE;
    transform: scale(1.1);
  }
}

.work-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transition: opacity 0.2s ease;

  .work-card:hover & {
    opacity: 1;
  }
}

.work-info {
  padding: 16px 20px;
}

.work-title {
  font-size: 14px;
  font-weight: 600;
  color: #0F172A;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.work-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.work-price {
  font-size: 18px;
  font-weight: 700;
  color: #0F172A;
}

.work-sales {
  font-size: 12px;
  color: #94A3B8;
  background: #F1F5F9;
  padding: 2px 8px;
  border-radius: 4px;
}

.work-actions {
  display: flex;
  border-top: 1px solid #F1F5F9;
  padding: 12px;
  background: #FAFBFC;
}

.work-action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: white;
    color: #4F46E5;
  }

  &.danger:hover {
    color: #EF4444;
  }
}
</style>
