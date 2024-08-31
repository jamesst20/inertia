import { router } from '@jamesst20/inertia-core'
import { onDestroy } from 'svelte'
import { writable } from 'svelte/store'

function useRemember<State>(initialState: State, key?: string) {
  const restored = router.restore(key) as State | undefined
  const store = writable(restored !== undefined ? restored : initialState)
  const unsubscribe = store.subscribe((state) => router.remember(state, key))

  onDestroy(unsubscribe)

  return store
}

export default useRemember
