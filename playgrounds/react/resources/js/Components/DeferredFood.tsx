import { useDeferred } from '@jamesst20/inertia-react'

export default () => {
  const { foods } = useDeferred('foods')

  return foods.map((food) => (
    <div key={food.id}>
      <p>
        #{food.id}: {food.name}
      </p>
    </div>
  ))
}
