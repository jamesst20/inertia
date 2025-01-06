import { router } from '@jamesst20/inertia-react'

export default (props) => {
  const invalidVisit = () => {
    router.post('/non-inertia')
  }

  const invalidVisitJson = () => {
    router.post('/json')
  }

  return (
    <div>
      <span onClick={invalidVisit} className="invalid-visit">
        Invalid Visit
      </span>
      <span onClick={invalidVisitJson} className="invalid-visit-json">
        Invalid Visit (JSON response)
      </span>
    </div>
  )
}
