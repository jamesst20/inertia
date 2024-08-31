import type { Page } from '@jamesst20/inertia-core'
import type { ComponentType } from 'svelte'

export type ComponentResolver = (name: string, page: Page) => ResolvedComponent | Promise<ResolvedComponent>

export type ResolvedComponent = {
  default?: ComponentType
  layout?: ComponentType
}
