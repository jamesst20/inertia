import type { Page } from '@jamesst20/inertia-core'
import type { ResolvedComponent } from './types'

interface Store {
  component: ResolvedComponent | null
  page: Page | null
  key?: number | null
}

const store: Store = $state({
  component: null,
  page: null,
  key: null,
})

export default store