import { Link, usePoll } from '@jamesst20/inertia-react'

export default () => {
  usePoll(500, {
    only: ['custom_prop'],
    onFinish() {
      console.log('hook poll finished')
    },
  })

  return <Link href="/">Home</Link>
}
