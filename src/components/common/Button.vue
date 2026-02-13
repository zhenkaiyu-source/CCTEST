<template>
  <button
    :class="[
      'ceramics-btn',
      `ceramics-btn-${variant}`,
      size ? `ceramics-btn-${size}` : '',
      { 'ceramics-btn-sm': sm },
      { 'ceramics-btn-lg': lg }
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  size: {
    type: String,
    validator: (val) => ['primary', 'secondary', 'ghost', 'danger', 'outline'].includes(val)
  },
  sm: Boolean,
  lg: Boolean
})
</script>
