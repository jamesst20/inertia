<script module>
  import NestedLayout from '@/Layouts/NestedLayout.svelte'
  import SiteLayout from '@/Layouts/SiteLayout.svelte'

  export const layout = [SiteLayout, NestedLayout]
</script>

<script>
  import { inertia, page } from '@jamesst20/inertia-svelte'

  window._inertia_page_props = $page.props
</script>

<div>
  <span class="text">Nested Persistent Layout - Page B</span>
  <a href="/persistent-layouts/shorthand/nested/page-a" use:inertia>Page A</a>
</div>
