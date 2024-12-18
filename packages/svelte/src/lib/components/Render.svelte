<script module lang="ts">
  import type { PageProps } from '@jamesst20/inertia-core'
  import type { Component } from 'svelte'

  import Render from './Render.svelte'

  type RenderProps = {
    component: Component
    props?: PageProps
    childComponents?: RenderProps[]
  }

  export const h = (component: Component, props?: PageProps, childComponents?: RenderProps[]): RenderProps => {
    return {
      component,
      ...(props ? { props } : {}),
      ...(childComponents ? { childComponents } : {}),
    }
  }
</script>

<script lang="ts">
  import store from '../store.svelte.js'

  let { component, props = {}, childComponents = [] }: RenderProps = $props()

  let prevComponent: Component
  let key: number | null = $state(null)

  $effect(() => {
    if (prevComponent !== component) {
      key = Date.now()
      prevComponent = component
    }
  })
</script>

{#if store.component}
  {#key key}
    <component {...props}>
      {#each childComponents as child, index (component && component.length === index ? store.key : null)}
        <Render {...child} />
      {/each}
    </component>
  {/key}
{/if}
