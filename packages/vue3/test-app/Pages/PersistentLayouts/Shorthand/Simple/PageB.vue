<script>
import Layout from '@/Layouts/SiteLayout.vue'

export default {
  layout: Layout,
}
</script>

<script setup>
import { Link } from '@jamesst20/inertia-vue3'
</script>

<template>
  <div>
    <span class="text">Simple Persistent Layout - Page B</span>
    <Link href="/persistent-layouts/shorthand/simple/page-a">Page A</Link>
  </div>
</template>
