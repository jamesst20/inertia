<script>
  import { router } from '@jamesst20/inertia-svelte'

  const visitMethod = () => {
    const formData = new FormData()
    formData.append('foo', 'visit')

    router.visit('/dump/post', {
      method: 'post',
      data: formData,
    })
  }

  const postMethod = () => {
    const formData = new FormData()
    formData.append('baz', 'post')

    router.post('/dump/post', formData)
  }

  const putMethod = () => {
    const formData = new FormData()
    formData.append('foo', 'put')

    router.put('/dump/put', formData)
  }

  const patchMethod = () => {
    const formData = new FormData()
    formData.append('bar', 'patch')

    router.patch('/dump/patch', formData)
  }

  const deleteMethod = () => {
    const formData = new FormData()
    formData.append('baz', 'delete')

    router.delete('/dump/delete', {
      data: formData,
    })
  }
</script>

<div>
  <span class="text">This is the page that demonstrates manual visit data passing through FormData objects</span>

  <a href="#" on:click={visitMethod} class="visit">Visit Link</a>
  <a href="#" on:click={postMethod} class="post">POST Link</a>
  <a href="#" on:click={putMethod} class="put">PUT Link</a>
  <a href="#" on:click={patchMethod} class="patch">PATCH Link</a>
  <a href="#" on:click={deleteMethod} class="delete">DELETE Link</a>
</div>
