import type { Page, PageProps } from '@inertiajs/core'
import type { ComponentType } from 'svelte'

export type ComponentResolver = (name: string, page: Page) => ComponentType | Promise<ComponentType>

export interface InertiaComponentType extends ComponentType {
  default: InertiaComponentType
  layout: InertiaComponentType
  props: PageProps
}
