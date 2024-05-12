import { VERSION } from 'svelte/compiler';
import { router, setupProgress } from '@inertiajs/core'
import App from './App.svelte'
import SSR from './SSR.svelte'
import store from './store'

const SVELTE_MAJOR_VERSION = parseInt(VERSION.split('.')[0]);

export default async function createInertiaApp({ id = 'app', resolve, setup, progress = {}, page }) {
  const isServer = typeof window === 'undefined'
  const el = isServer ? null : document.getElementById(id)
  const initialPage = page || JSON.parse(el.dataset.page)
  const resolveComponent = (name, page) => Promise.resolve(resolve(name, page))

  await resolveComponent(initialPage.component, initialPage).then((initialComponent) => {
    store.set({
      component: initialComponent,
      page: initialPage,
    })
  })

  if (!isServer) {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async ({ component, page, preserveState }) => {
        store.update((current) => ({
          component,
          page,
          key: preserveState ? current.key : Date.now(),
        }))
      },
    })

    if (progress) {
      setupProgress(progress)
    }

    return setup({
      el,
      App,
      props: {
        initialPage,
        resolveComponent,
      },
    })
  }

  if (isServer) {
    const { html, head } = await (async () => {
      if (SVELTE_MAJOR_VERSION < 5) {
        return SSR.render({ id, initialPage })
      } else {
        const { render } = await import('svelte/server')
        return render(SSR, { props: { id, initialPage } })
      }
    })()

    return {
      body: html,
      head: [head],
    }
  }
}
