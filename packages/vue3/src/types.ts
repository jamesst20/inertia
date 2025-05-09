import { createHeadManager, Page, PageHandler, router } from '@jamesst20/inertia-core'
import { ComponentPublicInstance } from 'vue'
import useForm from './useForm'

export type VuePageHandlerArgs = Parameters<PageHandler>[0] & {
  component: ComponentPublicInstance | Promise<ComponentPublicInstance>
}

declare module '@jamesst20/inertia-core' {
  export interface Router {
    form: typeof useForm
  }
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    $inertia: typeof router
    $page: Page
    $headManager: ReturnType<typeof createHeadManager>
  }

  export interface ComponentCustomOptions {
    remember?:
      | string
      | string[]
      | {
          data: string | string[]
          key?: string | (() => string)
        }
  }
}
