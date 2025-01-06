import { router, type VisitOptions } from '@jamesst20/inertia-core'

export default function usePrefetch(options: VisitOptions = {}) {
  let isPrefetched = $state(false)
  let isPrefetching = $state(false)
  let lastUpdatedAt = $state<number | null>(null)

  const cached = $state(typeof window === 'undefined' ? null : router.getCached(window.location.pathname, options))
  const inFlight = $state(
    typeof window === 'undefined' ? null : router.getPrefetching(window.location.pathname, options),
  )

  isPrefetched = cached !== null
  isPrefetching = inFlight !== null
  lastUpdatedAt = cached?.staleTimestamp || null

  $effect(() => {
    const removePrefetchingListener = router.on('prefetching', ({ detail }) => {
      if (detail.visit.url.pathname === window.location.pathname) {
        isPrefetching = true
      }
    })

    const removePrefetchedListener = router.on('prefetched', ({ detail }) => {
      if (detail.visit.url.pathname === window.location.pathname) {
        isPrefetched = true
        isPrefetching = false
      }
    })

    return () => {
      if (removePrefetchedListener) {
        removePrefetchedListener()
      }

      if (removePrefetchingListener) {
        removePrefetchingListener()
      }
    }
  })

  return {
    get isPrefetched() {
      return isPrefetched
    },
    get isPrefetching() {
      return isPrefetching
    },
    get lastUpdatedAt() {
      return lastUpdatedAt
    },
    flush() {
      router.flush(window.location.pathname, options)
    },
  }
}
