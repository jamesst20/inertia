<script module lang="ts">
  import type { PageProps } from '@jamesst20/inertia-core'
  import type { ComponentType } from 'svelte'

  type RenderComponentProps = {
    component: ComponentType
    props?: PageProps
    childComponents?: RenderProps[]
    key?: number | null
  }

  export type RenderProps = {
    component: ComponentType
    props?: PageProps
    childComponents?: RenderProps[]
    key?: number | null
  }

  export type RenderFunction = {
    (component: ComponentType, props?: PageProps, childComponents?: RenderProps[], key?: number | null): RenderProps
    (component: ComponentType, childComponents?: RenderProps[], key?: number | null): RenderProps
  }

  export const h: RenderFunction = (component, propsOrChildren, childrenOrKey, key: number | null = null) => {
    const hasProps = typeof propsOrChildren === 'object' && propsOrChildren !== null && !Array.isArray(propsOrChildren)

    return {
      component,
      key: hasProps ? key : typeof childrenOrKey === 'number' ? childrenOrKey : null,
      props: hasProps ? propsOrChildren : {},
      childComponents: hasProps
        ? ((Array.isArray(childrenOrKey)
            ? childrenOrKey
            : childrenOrKey !== null
              ? [childrenOrKey]
              : []) as RenderProps[])
        : ((Array.isArray(propsOrChildren)
            ? propsOrChildren
            : propsOrChildren !== null
              ? [propsOrChildren]
              : []) as RenderProps[]),
    }
  }
</script>

<script lang="ts">
  import Render from './Render.svelte'

  let { component, props = {}, childComponents = [], key = null }: RenderComponentProps = $props()

  let DynamicComponent = $derived(component)
</script>

{#if DynamicComponent}
  <!--
  Add the `key` only to the last (page) component in the tree.
  This ensures that the page component re-renders when `preserveState` is disabled,
  while the layout components are persisted across page changes. -->
  {#key childComponents?.length === 0 ? key : null}
    {#if childComponents.length > 0}
      <DynamicComponent {...props}>
        {#each childComponents as child}
          <Render {...child} />
        {/each}
      </DynamicComponent>
    {:else}
      <DynamicComponent {...props} />
    {/if}
  {/key}
{/if}
