<script module>
  import SiteLayout from '@/Layouts/SiteLayout.svelte'

  export const layout = (h, page) => h(SiteLayout, [page])
</script>

<script>
  import { inertia } from '@jamesst20/inertia-svelte'
</script>

<div>
  <span class="text">Simple Persistent Layout - Page B</span>
  <a href="/persistent-layouts/render-function/simple/page-a" use:inertia>Page A</a>
</div>
