<script setup>
import { useRemember } from '@jamesst20/inertia-vue3'
import { ref } from 'vue'

const untracked = ref('')

const data = useRemember(
  {
    name: '',
    remember: false,
  },
  'Example/ComponentA',
)
</script>

<template>
  <div>
    <span>This component uses a string 'key' for the remember functionality.</span>
    <label>
      Full Name
      <input type="text" class="a-name" name="full_name" v-model="data.name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" class="a-remember" name="remember" v-model="data.remember" />
    </label>
    <label>
      Remember Me
      <input type="text" class="a-untracked" name="untracked" v-model="untracked" />
    </label>
  </div>
</template>
