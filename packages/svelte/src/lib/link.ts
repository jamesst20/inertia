import { mergeDataIntoQueryString, router, shouldIntercept, type VisitOptions } from '@jamesst20/inertia-core'
import type { Action } from 'svelte/action'

interface ActionElement extends HTMLElement {
  href?: string
}

type ActionParameters = VisitOptions & { href?: string }

const link: Action<ActionElement, ActionParameters> = (node, options = {}) => {
  const [href, data] = hrefAndData(options)
  node.href = href
  options.data = data

  function fireEvent(name: string, eventOptions = {}) {
    return node.dispatchEvent(new CustomEvent(name, eventOptions))
  }

  function hrefAndData(options: ActionParameters) {
    return mergeDataIntoQueryString(
      options.method || 'get',
      node.href || options.href || '',
      options.data || ({} as any),
      options.queryStringArrayFormat || 'brackets',
    )
  }

  function visit(event: Event) {
    if (!node.href) {
      throw new Error('Option "href" is required')
    }

    if (shouldIntercept(event as KeyboardEvent)) {
      event.preventDefault()

      router.visit(node.href, {
        onCancelToken: () => fireEvent('CancelToken'),
        onBefore: (visit) => fireEvent('Before', { detail: { visit } }),
        onStart: (visit) => fireEvent('Start', { detail: { visit } }),
        onProgress: (progress) => fireEvent('Progress', { detail: { progress } }),
        onFinish: (visit) => fireEvent('Finish', { detail: { visit } }),
        onCancel: () => fireEvent('Cancel'),
        onSuccess: (page) => fireEvent('Success', { detail: { page } }),
        onError: (errors) => fireEvent('Error', { detail: { errors } }),
        ...options,
      })
    }
  }

  node.addEventListener('click', visit)

  return {
    update(newOptions) {
      const [href, data] = hrefAndData(newOptions)
      node.href = href
      options = { ...newOptions, data }
    },
    destroy() {
      node.removeEventListener('click', visit)
    },
  }
}

export default link
