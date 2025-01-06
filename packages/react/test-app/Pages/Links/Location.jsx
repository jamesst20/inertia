import { Link } from '@jamesst20/inertia-react'

export default (props) => {
  return (
    <div>
      <span className="text">This is the links page that demonstrates location visits inertia-links</span>

      <Link href="/location" replace className="example">
        Location visit
      </Link>
    </div>
  )
}
