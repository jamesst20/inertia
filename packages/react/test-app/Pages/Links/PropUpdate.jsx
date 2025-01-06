import { Link } from '@jamesst20/inertia-react'
import { useState } from 'react'

export default () => {
  const [href, setHref] = useState('/sleep')

  return (
    <div>
      <button onClick={() => setHref('/something-else')}>Change URL</button>
      <Link href={href} class="get">
        The Link
      </Link>
    </div>
  )
}
