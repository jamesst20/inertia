<script>
  import { router } from '@jamesst20/inertia-svelte'

  const visit = () => {
    router.get(
      '/sleep',
      {},
      {
        onStart: () => console.log('started'),
        onCancel: () => console.log('cancelled'),
      },
    )
  }
</script>

<div>
  <span class="text">This is the page that demonstrates that only one visit can be active at a time</span>
  <a href="#" on:click={visit} class="visit">Link</a>
</div>
