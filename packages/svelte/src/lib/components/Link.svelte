<script context="module" lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import type { VisitOptions } from '@jamesst20/inertia-core'

  type LinkProps = {
    href: string
    as?: keyof HTMLElementTagNameMap,
    class?: string
    children: Snippet
  } & Partial<VisitOptions> & Partial<HTMLAnchorAttributes> & Partial<HTMLButtonAttributes>
</script>

<script lang="ts">
  import { default as inertia } from '../link'

  let {
    href,
    as = 'a',
    children,
    data = {},
    method = 'get',
    replace = false,
    preserveScroll = false,
    preserveState = undefined,
    only = [],
    except = [],
    headers = {},
    queryStringArrayFormat = 'brackets',
    ...restProps
  }: LinkProps = $props()

  $effect.pre(() => {
    if (as === 'a' && method.toLowerCase() !== 'get') {
      console.warn(
        `Creating POST/PUT/PATCH/DELETE <a> links is discouraged as it causes "Open Link in New Tab/Window" accessibility issues.\n\nPlease specify a more appropriate element using the "as" attribute. For example:\n\n<Link href="${href}" method="${method}" as="button">...</Link>`,
      )
    }
  })
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={as}
  use:inertia={{
    ...(as !== 'a' ? { href } : {}),
    data,
    method,
    replace,
    preserveScroll,
    preserveState: preserveState ?? method !== 'get',
    only,
    except,
    headers,
    queryStringArrayFormat,
  }}
  {...as === 'a' ? { href } : {}}
  {...restProps}
>
  {@render children()}
</svelte:element>