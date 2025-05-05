<script module lang="ts">
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'
  import type { ActionParameters } from '../link'

  type LinkProps = {
    href?: string | { url: string; method: Method }
    as?: keyof HTMLElementTagNameMap,
    class?: string
    children: Snippet
  } & Partial<ActionParameters> & Partial<HTMLAnchorAttributes> & Partial<HTMLButtonAttributes>
</script>

<script lang="ts">
  import { inertia } from '../index'

  let {
    href: hrefProp = '',
    as = 'a',
    data = {},
    method: methodProp = 'get',
    replace = false,
    preserveScroll = false,
    preserveState = undefined,
    only = [],
    except = [],
    headers = {},
    queryStringArrayFormat = 'brackets',
    async = false,
    prefetch = false,
    cacheFor = 0,
    children,
    ...restProps
  }: LinkProps = $props()

  let method = $derived(typeof methodProp === 'object' ? methodProp.method : methodProp)
  let href = $derived(typeof hrefProp === 'object' ? hrefProp.url : hrefProp)

  let asProp = $derived(method !== 'get' ? 'button' : as.toLowerCase())
  let elProps = $derived(
    {
      a: { href },
      button: { type: 'button' },
    }[asProp] || {})
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
  this={asProp}
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
    async,
    prefetch,
    cacheFor,
  }}
  {...elProps}
  {...restProps as any}
>
  {@render children()}
</svelte:element>
