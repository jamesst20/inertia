import type { Page } from '@inertiajs/core'
import type { ResolvedComponents } from './types'

interface Store {
  component: ResolvedComponents | null
  page: Page | null
  key?: number | null
}

const store: Store = $state({
  component: null,
  layout: [],
  page: null,
  key: null,
})

export default store
