<script>
  import { inertia, usePoll } from '@jamesst20/inertia-svelte'

  usePoll(500, {
    only: ['custom_prop'],
    onFinish() {
      console.log('hook poll finished')
    },
  })
</script>

<a href="/" use:inertia>Home</a>
