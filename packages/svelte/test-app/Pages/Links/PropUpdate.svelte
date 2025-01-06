<script>
  import { Link } from '@jamesst20/inertia-svelte'

  let href = '/sleep';

  const changeUrl = () => {
    href = '/something-else';
  }
</script>

<div>
  <button on:click={changeUrl}>Change URL</button>
  <Link href={href} class="get">
    The Link
  </Link>
</div>
