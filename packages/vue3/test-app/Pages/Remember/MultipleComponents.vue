<script setup>
import ComponentA from '@/Pages/Remember/Components/ComponentA.vue'
import ComponentB from '@/Pages/Remember/Components/ComponentB.vue'
import { Link, useRemember } from '@jamesst20/inertia-vue3'
import { ref } from 'vue'

const untracked = ref('')

const form = useRemember({
  name: '',
  remember: false,
})
</script>

<template>
  <div>
    <label>
      Full Name
      <input type="text" id="name" name="full_name" v-model="form.name" />
    </label>
    <label>
      Remember Me
      <input type="checkbox" id="remember" name="remember" v-model="form.remember" />
    </label>
    <label>
      Untracked
      <input type="text" id="untracked" name="untracked" v-model="untracked" />
    </label>

    <component-a class="component-a" />
    <component-b class="component-b" />

    <Link href="/dump/get" class="link">Navigate away</Link>
    <a href="/non-inertia" class="off-site">Navigate off-site</a>
  </div>
</template>
