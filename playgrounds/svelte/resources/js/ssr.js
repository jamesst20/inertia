import { createInertiaApp } from '@inertiajs/svelte'
import createServer from '@inertiajs/svelte/server'
import { render } from 'svelte/server'

createServer((page) =>
  createInertiaApp({
    page,
    resolve: (name) => {
      const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
      return pages[`./Pages/${name}.svelte`]
    },
    ssr: (AppSSR, props) => {
      // Svelte 4: return AppSSR.render(props)
      // Svelte 5: return render(AppSSR, { props })
      return render(AppSSR, { props })
    },
  }),
)
