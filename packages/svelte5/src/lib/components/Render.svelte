<script context="module" lang="ts">
  import type { PageProps } from '@inertiajs/core'
  import type { ComponentType } from 'svelte'

  type RenderProps = {
    component: ComponentType
    props?: PageProps
    childComponents?: RenderProps[]
  }

  export const h = (component: ComponentType, props?: PageProps, childComponents?: RenderProps[]): RenderProps => {
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

  let prevComponent: ComponentType
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
    <svelte:component this={component} {...props}>
      {#each childComponents as child, index (component && component.length === index ? store.key : null)}
        <svelte:self {...child} />
      {/each}
    </svelte:component>
  {/key}
{/if}
