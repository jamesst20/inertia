<script>
  import { Link } from '@jamesst20/inertia-svelte'

  export let method
</script>

<div>
  <span class="text">This is the links page that demonstrates inertia-links with an 'as' warning</span>

  <Link href="/example" {method} class="get">{method} Link</Link>
</div>
