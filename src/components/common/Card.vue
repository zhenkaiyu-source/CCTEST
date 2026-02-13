<template>
  <div :class="['ceramics-card', { 'hover:-translate-y-1': hover }]">
    <div v-if="$slots.header || title" class="ceramics-card-header">
      <slot name="header">
        <h3>{{ title }}</h3>
      </slot>
      <slot name="extra">
        <div v-if="extra" v-html="extra"></div>
      </slot>
    </div>
    <div class="ceramics-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="ceramics-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  extra: String,
  hover: {
    type: Boolean,
    default: true
  }
})
</script>
