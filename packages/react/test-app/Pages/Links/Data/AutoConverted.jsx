import { Link } from '@jamesst20/inertia-react'

export default (props) => {
  const linkData = { file: new File([], 'example.jpg'), foo: 'bar' }

  return (
    <div>
      <span className="text">
        This is the links page that demonstrates the automatic conversion of plain objects to form-data
      </span>

      <Link method="get" href="/dump/get" data={linkData} className="get">
        GET Link
      </Link>
      <Link as="button" method="post" href="/dump/post" data={linkData} className="post">
        POST Link
      </Link>
      <Link as="button" method="put" href="/dump/put" data={linkData} className="put">
        PUT Link
      </Link>
      <Link as="button" method="patch" href="/dump/patch" data={linkData} className="patch">
        PATCH Link
      </Link>
      <Link as="button" method="delete" href="/dump/delete" data={linkData} className="delete">
        DELETE Link
      </Link>
    </div>
  )
}
