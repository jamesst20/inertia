import { createInertiaApp } from '@jamesst20/inertia-react'
import { hydrateRoot } from 'react-dom/client'

createInertiaApp({
  title: (title) => `${title} - React Playground`,
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
    return pages[`./Pages/${name}.tsx`]
  },
  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props} />)
    // createRoot(el).render(<App {...props} />)
  },
})
