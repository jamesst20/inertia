import { router, setupProgress, type InertiaAppResponse, type Page } from '@jamesst20/inertia-core'
import { encode } from 'html-entities'
import type { ComponentType } from 'svelte'
import { render } from 'svelte/server'
import App from './components/App.svelte'
import store from './store.svelte'
import type { ComponentResolver, ResolvedComponent } from './types'

interface CreateInertiaAppProps {
  id?: string
  resolve: ComponentResolver
  setup: (props: {
    el: Element
    App: ComponentType<App>
    props: {
      initialPage: Page
      resolveComponent: ComponentResolver
    }
  }) => void | App
  progress?:
    | false
    | {
        delay?: number
        color?: string
        includeCSS?: boolean
        showSpinner?: boolean
      }
  page?: Page
}

export default async function createInertiaApp({
  id = 'app',
  resolve,
  setup,
  progress = {},
  page,
}: CreateInertiaAppProps): InertiaAppResponse {
  const isServer = typeof window === 'undefined'
  const el = isServer ? null : document.getElementById(id)
  const initialPage: Page = page || JSON.parse(el?.dataset?.page || '{}')
  const resolveComponent = (name: string, page: Page) => Promise.resolve(resolve(name, page))

  await resolveComponent(initialPage.component, initialPage).then((initialComponent) => {
    store.component = initialComponent
    store.page = initialPage
  })

  if (isServer) {
    const { html, head } = render(App, {})

    return {
      body: `<div data-server-rendered="true" id="${id}" data-page="${encode(JSON.stringify(initialPage))}">${html}</div>`,
      head: [head],
    }
  }

  if (!el) {
    throw new Error(`Element with ID "${id}" not found.`)
  }

  router.init({
    initialPage,
    resolveComponent,
    swapComponent: async ({ component, page, preserveState }) => {
      store.component = component as ResolvedComponent
      store.page = page
      store.key = preserveState ? store.key : Date.now()
    },
  })

  if (progress) {
    setupProgress(progress)
  }

  setup({
    el,
    App,
    props: {
      initialPage,
      resolveComponent,
    },
  })
}
