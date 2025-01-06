<script module lang="ts">
  import type { Snippet } from 'svelte'

  type WhenVisibleProps =  {
    data: string | string[]
    params?: ReloadOptions
    buffer?: number
    as?: keyof HTMLElementTagNameMap
    always?: boolean
    children: Snippet
    fallback: Snippet
  }
</script>

<script lang="ts">
  import { router, type ReloadOptions } from '@jamesst20/inertia-core'

  let { 
    data = '', 
    params = {}, 
    buffer = 0, 
    as = 'div', 
    always = false, 
    children, 
    fallback 
  }: WhenVisibleProps = $props()

  let loaded = $state(false)
  let fetching = $state(false)
  let el = $state<HTMLElement>()

  $effect(() => {
    if (!el) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          return
        }

        if (!always) {
          observer?.disconnect()
        }

        if (fetching) {
          return
        }

        fetching = true

        const reloadParams = getReloadParams()

        router.reload({
          ...reloadParams,
          onStart: (event) => {
            fetching = true
            reloadParams.onStart?.(event)
          },
          onFinish: (event) => {
            loaded = true
            fetching = false
            reloadParams.onFinish?.(event)
          },
        })
      },
      {
        rootMargin: `${buffer}px`,
      },
    )

    observer.observe(el)

    return () => {
      observer?.disconnect()
    }
  })

  function getReloadParams(): Partial<ReloadOptions> {
    if (data !== '') {
      return {
        only: (Array.isArray(data) ? data : [data]) as string[],
      }
    }

    if (!params.data) {
      throw new Error('You must provide either a `data` or `params` prop.')
    }

    return params
  }
</script>

{#if always || !loaded}
  <svelte:element this={as} bind:this={el} />
{/if}

{#if loaded}
  {@render children?.()}
{:else}
  {@render fallback?.()}
{/if}