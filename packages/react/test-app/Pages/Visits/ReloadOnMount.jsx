import { router } from '@jamesst20/inertia-react'
import { useEffect } from 'react'

export default (props) => {
  useEffect(() => {
    setTimeout(() => {
      router.reload({ only: ['name'] })
    })
  })

  return <div>Name is {props.name}</div>
}
