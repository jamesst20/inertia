import type { Page } from '@jamesst20/inertia-core'
import type { Component } from 'svelte'

export type ComponentResolver = (name: string, page: Page) => ResolvedComponent | Promise<ResolvedComponent>

export type ResolvedComponent = {
  default?: Component
  layout?: Component
}
