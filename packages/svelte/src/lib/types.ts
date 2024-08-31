import type { PageProps } from '@jamesst20/inertia-core'
import type { ComponentType } from 'svelte'

export type ComponentResolver = (name: string) => ComponentType | Promise<ComponentType>

export interface InertiaComponentType extends ComponentType {
  default: InertiaComponentType
  layout: InertiaComponentType
  props: PageProps
}
