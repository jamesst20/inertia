<script module lang="ts">
  import type { Snippet } from 'svelte'

  type DeferedProps =  {
    data: string | string[]
    children: Snippet
    fallback: Snippet
  }
</script>

<script lang="ts">
  import { page } from '../index'

  let { data, children, fallback }: DeferedProps = $props()
  let currentPage = $derived(page.current)
  let keys = $derived(Array.isArray(data) ? data : [data])
  let loaded = $state(false)

  $effect(() => {
    // Ensures the slot isn't loaded before the deferred props are available
    window.queueMicrotask(() => {
      loaded = keys.every((key) => typeof currentPage?.props?.[key] !== 'undefined')
    })
  })

  if (!fallback) {
    throw new Error('`<Deferred>` requires a `<svelte:fragment slot="fallback">` slot')
  }
</script>

{#if loaded}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}
