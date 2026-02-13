<template>
  <div :class="['ceramics-icon-box', gradientClass]">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'indigo'
  }
})

const gradientClass = computed(() => {
  const map = {
    blue: 'gradient-blue',
    violet: 'gradient-violet',
    amber: 'gradient-amber',
    emerald: 'gradient-emerald',
    indigo: 'gradient-indigo',
    rose: 'gradient-rose'
  }
  return map[props.variant] || 'gradient-indigo'
})
</script>

<style lang="scss" scoped>
.ceramics-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.gradient-blue {
    background: linear-gradient(135deg, #3B82F6, #1D4ED8);
    color: white;
  }

  &.gradient-violet {
    background: linear-gradient(135deg, #8B5CF6, #6D28D9);
    color: white;
  }

  &.gradient-amber {
    background: linear-gradient(135deg, #F59E0B, #D97706);
    color: white;
  }

  &.gradient-emerald {
    background: linear-gradient(135deg, #10B981, #059669);
    color: white;
  }

  &.gradient-indigo {
    background: linear-gradient(135deg, #6366F1, #4F46E5);
    color: white;
  }

  &.gradient-rose {
    background: linear-gradient(135deg, #F43F5E, #E11D48);
    color: white;
  }
}
</style>
