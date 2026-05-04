export type TemplateId = 'linkedin-ghost' | 'wiki-stub' | 'museum-plaque' | 'tarot-card'

export interface Branch {
  id: string
  year: number
  summary: string
  whatHappened: string
  whatCouldHaveHappened: string
}

export interface LinkedInGhostJob {
  title: string
  company: string
  dateRange: string
  description: string
}

export interface LinkedInGhostEndorsement {
  name: string
  title: string
  text: string
}

export interface LinkedInGhostLife {
  name: string
  headline: string
  location: string
  about: [string, string]
  jobs: [LinkedInGhostJob, LinkedInGhostJob, LinkedInGhostJob]
  endorsements: [LinkedInGhostEndorsement, LinkedInGhostEndorsement]
  openToWork: boolean
}

export interface WikiInfobox {
  born: string
  nationality: string
  occupation: string
  knownFor: string
}

export interface WikiCitation {
  index: number
  text: string
}

export interface WikiStubLife {
  name: string
  infobox: WikiInfobox
  intro: string
  sections: {
    earlyLife: string
    career: string
    personalLife: string
    controversies: string
  }
  citations: WikiCitation[]
}

export interface MuseumPlaqueLife {
  name: string
  dates: string
  occupation: string
  paragraph: string
}

export interface TarotCardLife {
  name: string
  suit: string
  romanNumeral: string
  upright: string
  reversed: string
}

export type LifeData =
  | LinkedInGhostLife
  | WikiStubLife
  | MuseumPlaqueLife
  | TarotCardLife
