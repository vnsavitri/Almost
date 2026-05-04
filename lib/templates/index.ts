import type { TemplateId, LinkedInGhostLife, WikiStubLife, MuseumPlaqueLife, TarotCardLife } from '@/lib/types'
import { buildLinkedInGhost } from './linkedin-ghost'
import { buildWikiStub } from './wiki-stub'
import { buildMuseumPlaque } from './museum-plaque'
import { buildTarotCard } from './tarot-card'

export const TEMPLATE_META: Record<TemplateId, { label: string; description: string }> = {
  'linkedin-ghost': {
    label: 'LinkedIn Ghost',
    description: 'An uncanny-valley LinkedIn profile of the alternate you.',
  },
  'wiki-stub': {
    label: 'The Wiki Stub',
    description: 'A Wikipedia article about you, barely worth its own page.',
  },
  'museum-plaque': {
    label: 'Museum Plaque',
    description: 'A gallery card for an artifact of a life you almost lived.',
  },
  'tarot-card': {
    label: 'The Tarot Card',
    description: 'A card from the Almost Deck — upright and reversed.',
  },
}

export function buildTemplate(templateId: TemplateId, life: unknown): string {
  switch (templateId) {
    case 'linkedin-ghost':
      return buildLinkedInGhost(life as LinkedInGhostLife)
    case 'wiki-stub':
      return buildWikiStub(life as WikiStubLife)
    case 'museum-plaque':
      return buildMuseumPlaque(life as MuseumPlaqueLife)
    case 'tarot-card':
      return buildTarotCard(life as TarotCardLife)
  }
}
