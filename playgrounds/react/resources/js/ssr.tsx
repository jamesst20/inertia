import { createInertiaApp } from '@jamesst20/inertia-react'
import createServer from '@jamesst20/inertia-react/server'
import * as ReactDOMServer from 'react-dom/server'

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - React Playground`,
    resolve: (name) => {
      const pages = import.meta.glob('./Pages/**/*.tsx', { eager: true })
      return pages[`./Pages/${name}.tsx`]
    },
    setup: ({ App, props }) => <App {...props} />,
  }),
)
