import { router } from '@jamesst20/inertia-core'

export default function useRemember<State>(initialState: State, key?: string) {
  const restored = router.restore(key) as State | undefined
  const store = $state(restored !== undefined ? restored : initialState)

  $effect(() => {
    return () => router.remember($state.snapshot(store), key)
  })

  return store
}
