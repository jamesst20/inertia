import { type Page } from '@jamesst20/inertia-core'

let state = $state<{ page: Page }>()

export const setPage = (page: Page) => (state = { page })

export default {
  get current() {
    return state?.page
  },
}
