<script setup>
import { router } from '@jamesst20/inertia-vue3'

const invalidVisit = () => {
  router.post('/non-inertia')
}

const invalidVisitJson = () => {
  router.post('/json')
}
</script>

<template>
  <div>
    <span @click="invalidVisit" class="invalid-visit">Invalid Visit</span>
    <span @click="invalidVisitJson" class="invalid-visit-json">Invalid Visit (JSON response)</span>
  </div>
</template>
