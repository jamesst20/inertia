import { type Page } from '@jamesst20/inertia-core'
import { writable } from 'svelte/store'

const { set, subscribe } = writable<Page>()

export const setPage = set

export default { subscribe }
