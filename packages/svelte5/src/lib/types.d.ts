import type { Page } from '@inertiajs/core'
import type { ComponentType } from 'svelte'

export type ComponentsResolver = (name: string, page: Page) => ResolvedComponents | Promise<ResolvedComponents>

export type ResolvedComponents = {
  default?: ComponentType
  layout?: ComponentType
}
