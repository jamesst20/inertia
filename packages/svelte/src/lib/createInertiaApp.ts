import { router, setupProgress, type InertiaAppResponse, type Page } from '@inertiajs/core'
import type { ComponentType } from 'svelte'
import App from './components/App.svelte'
import type { SSRProps } from './components/SSR.svelte'
import SSR from './components/SSR.svelte'
import store from './store'
import type { ComponentsResolver, ResolvedComponents } from './types'

type SvelteRenderResult = { html: string; head: string; css?: { code: string } }
type SSRComponent = ComponentType<SSR> & { render?: (props: SSRProps) => SvelteRenderResult }

interface CreateInertiaAppProps {
  id?: string
  resolve: ComponentsResolver
  setup: (props: {
    el: Element
    App: ComponentType<App>
    props: {
      initialPage: Page
      resolveComponent: ComponentsResolver
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
  ssr?: (AppSSR: SSRComponent, props: SSRProps) => SvelteRenderResult
}

export default async function createInertiaApp({
  id = 'app',
  resolve,
  setup,
  progress = {},
  page,
  ssr,
}: CreateInertiaAppProps): InertiaAppResponse {
  const isServer = typeof window === 'undefined'
  const el = isServer ? null : document.getElementById(id)
  const initialPage: Page = page || JSON.parse(el?.dataset?.page || '{}')
  const resolveComponent = (name: string, page: Page) => Promise.resolve(resolve(name, page))

  await resolveComponent(initialPage.component, initialPage).then((initialComponent) => {
    store.set({
      component: initialComponent,
      page: initialPage,
    })
  })

  if (!isServer) {
    if (!el) {
      throw new Error(`Element with ID "${id}" not found.`)
    }

    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page, preserveState }) => {
        store.update((current) => ({
          component: component as ResolvedComponents,
          page,
          key: preserveState ? current.key : Date.now(),
        }))
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

  if (isServer) {
    if (!ssr) {
      throw new Error(`createInertiaApp must provide ssr(...) for server-side rendering.`)
    }

    const { html, head, css } = ssr(SSR as SSRComponent, { id, initialPage })

    return {
      body: html,
      head: [
        head,
        // Note: Svelte 5 no longer output CSS
        ...(css?.code ? [`<style data-vite-css>${css?.code}</style>`] : []),
      ],
    }
  }
}
