<script setup>
import { Link } from '@jamesst20/inertia-vue3'
import { onMounted, ref } from 'vue'

const linkData = ref(new FormData())

onMounted(() => {
  linkData.value.append('bar', 'baz')
})
</script>

<template>
  <div>
    <span class="text">This is the links page that demonstrates passing data through FormData objects</span>

    <Link method="GET" href="/dump/get" :data="linkData" class="get">GET Link</Link>
    <Link as="button" method="POST" href="/dump/post" :data="linkData" class="post">POST Link</Link>
    <Link as="button" method="PUT" href="/dump/put" :data="linkData" class="put">PUT Link</Link>
    <Link as="button" method="PATCH" href="/dump/patch" :data="linkData" class="patch">PATCH Link</Link>
    <Link as="button" method="DELETE" href="/dump/delete" :data="linkData" class="delete">DELETE Link</Link>
  </div>
</template>
