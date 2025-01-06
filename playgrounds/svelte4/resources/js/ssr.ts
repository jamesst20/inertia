import { createInertiaApp, type ResolvedComponent } from '@jamesst20/inertia-svelte'
import createServer from '@jamesst20/inertia-svelte/server'

createServer((page) =>
  createInertiaApp({
    page,
    resolve: (name) => {
      const pages = import.meta.glob<ResolvedComponent>('./Pages/**/*.svelte', { eager: true })
      return pages[`./Pages/${name}.svelte`]
    },
    setup({ App, props }) {
      return App.render(props)
    }
  }),
)
