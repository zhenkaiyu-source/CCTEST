<template>
  <input
    :class="[
      'ceramics-input',
      { 'ceramics-input-sm': sm },
      { 'ceramics-input-lg': lg }
    ]"
    :value="modelValue"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  sm: Boolean,
  lg: Boolean
})

defineEmits(['update:modelValue'])
</script>
