<template>
  <span :class="['ceramics-badge', `status-${status}`]">
    <slot />
  </span>
</template>

<script setup>
defineProps({
  status: String
})
</script>
