<script setup>
import { usePoll } from '@jamesst20/inertia-vue3'

const { start, stop } = usePoll(
  500,
  {
    only: ['custom_prop'],
    onFinish() {
      console.log('hook poll finished')
    },
  },
  {
    autoStart: false,
  },
)
</script>

<template>
  <button @click="start">Start</button>
  <button @click="stop">Stop</button>
</template>
