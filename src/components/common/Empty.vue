<template>
  <div class="ceramics-empty">
    <slot name="icon">
      <component :is="icon" size="48" />
    </slot>
    <slot>
      <p>暂无数据</p>
    </slot>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: Object,
    default: () => ({})
  }
})
</script>
