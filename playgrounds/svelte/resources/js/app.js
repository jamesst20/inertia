import { createInertiaApp } from '@jamesst20/inertia-svelte'

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.svelte', { eager: true })
    return pages[`./Pages/${name}.svelte`]
  },
  setup({ el, App }) {
    new App({ target: el, hydrate: true })
  },
})
