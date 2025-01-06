import { router, type PollOptions, type ReloadOptions } from '@jamesst20/inertia-core'

export default function usePoll(
  interval: number,
  requestOptions: ReloadOptions = {},
  options: PollOptions = {
    keepAlive: false,
    autoStart: true,
  },
) {
  const { stop, start } = router.poll(interval, requestOptions, {
    ...options,
    autoStart: false,
  })

  $effect(() => {
    if (options.autoStart ?? true) {
      start()
    }

    return () => stop()
  })

  return { stop, start }
}
