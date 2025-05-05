<script setup>
import { router } from '@jamesst20/inertia-vue3'
import { onMounted } from 'vue'

defineProps({
  name: String,
})

onMounted(() => {
  router.reload({ only: ['name'] })
})
</script>

<template>
  <div>Name is {{ name }}</div>
</template>
