import type { Branch } from '@/lib/types'

export const ZELDA_DEMO_PROFILE = {
  name: "Zelda Hyrule",
  current_location: "Hyrule Castle, Central Hyrule",
  current_role: "Princess & Chief Sealing Officer, Kingdom of Hyrule",

  raw_linkedin_text: `
    Zelda Hyrule
    Princess | Ancient Technology Researcher | Reluctant Chosen One
    Hyrule Castle, Central Hyrule · 2,847 connections

    ABOUT
    Multidisciplinary leader with 10,000+ years of ancestral institutional knowledge
    and hands-on experience in crisis containment, divine power management, and
    cross-species stakeholder alignment. Former embedded researcher (Sheikah Division).
    Fluent in Ancient Hyrulean, Gerudo, and the Silent Realm frequency.
    Currently exploring what it means to "move on" after sealing an ancient evil
    for the fourth time in a row.

    EXPERIENCE

    Princess & Chief Sealing Officer
    Kingdom of Hyrule · Full-time
    Feb 2014 – Present · 12 years
    Hyrule Castle, Central Hyrule
    Inherited role. Managed 100-year containment strategy for Calamity Ganon
    (see gap below). Coordinated Divine Beast deployment across four regions.
    Key stakeholder: Link (contractor, recurring). Currently rebuilding
    institutional trust post-castle-destruction.

    Research Fellow — Ancient Technology Division
    Sheikah Institute of Science · Full-time
    Sep 2010 – Jan 2014 · 3 years 4 months
    Kakariko Village, Hyrule
    Led excavation and activation of Sheikah Slate technology.
    Recovered and catalogued 127 Guardian units (note:
    this did not go well, ultimately). Published:
    "On the Recursive Nature of Prophecy: Why It's Always You."

    Student Researcher — Sacred Realm Studies
    Royal Academy of Hyrule · Part-time
    Sep 2006 – Aug 2010 · 4 years
    Hyrule Castle Town
    Focused on divine power inheritance, specifically the Triforce of Wisdom.
    Minor in Ganon Threat Modelling. Captain, Equestrian Club (Epona Division).

    CAREER GAP
    Suspended Animation — Divine Containment Protocol
    Self-directed · Feb 2014 – Mar 2020 · 6 years 1 month
    Hyrule Castle (Interior)
    Strategic pause. Containment of malice-level threat.
    Not currently open to discussing.

    EDUCATION
    Royal Academy of Hyrule
    BSc Ancient Studies & Applied Prophecy, 2006–2010
    Activities: Debate Club (won every argument, once stopped time to do so),
    Archery (recreational), Ancient Sealing Texts Reading Group.

    SKILLS
    Ancient Sealing Magic · Sheikah Technology · Crisis Management
    Stakeholder Alignment (multi-species) · Prophecy Interpretation
    Horse Riding · Divine Power Containment · Resilience (validated)
  `,

  branches: [
    {
      id: "1",
      year: "2014",
      framing: "You accepted the Triforce of Wisdom and sealed yourself in the castle for 100 years. What if you'd just... declined?",
      context: "Zelda chose to use her divine power to contain Ganon, sacrificing her own freedom in the process"
    },
    {
      id: "2",
      year: "2010",
      framing: "You left Kakariko Village to pursue Sheikah technology research. What if you'd stayed and opened that pottery studio?",
      context: "Zelda briefly considered a quieter life in Kakariko Village before being drawn back into royal duties"
    },
    {
      id: "3",
      year: "2017",
      framing: "You woke Link up from his own suspended animation. What if you'd decided he needed five more years?",
      context: "Zelda made the call to wake Link earlier than strictly necessary, which accelerated the Calamity timeline"
    },
    {
      id: "4",
      year: "2006",
      framing: "You enrolled at the Royal Academy to study prophecy. What if you'd done the gap year in Gerudo Town instead?",
      context: "Zelda chose formal education over a sabbatical that would have taken her far from royal responsibilities"
    }
  ],

  pregenerated_output: {
    template: "linkedin-ghost" as const,
    fork_summary: "Declined the Triforce of Wisdom. Let someone else handle it.",
    alt_role: "Founder, Zelda & Associates Ancient Consulting",
    alt_location: "Lurelin Village (yes, the beach one)",

    linkedin_ghost: {
      name: "Zelda Hyrule",
      headline: "Founder @ Z&A Consulting · Ex-Princess · Ancient Tech Advisor · Finally Unbothered",
      location: "Lurelin Village, Southern Hyrule",
      about: [
        "I spent the first 22 years of my life being told I was destined to seal an ancient evil. In 2014, I said: not this time. Best decision I ever made.",
        "Today I run a boutique consulting firm helping kingdoms operationalise their ancient technology without the associated prophecy debt. We've worked with four royal houses, two Sheikah factions, and one very confused Goron mining collective. I'm based in Lurelin Village now. The sunsets are good. Nobody is trying to seal me in anything."
      ] as [string, string],
      jobs: [
        {
          title: "Founder & Principal Consultant",
          company: "Zelda & Associates Ancient Technology Consulting",
          dateRange: "Jan 2015 – Present · 11 years",
          description: "Advisory practice specialising in ancient tech activation without apocalyptic risk. Current obsession: proving that sustainable Sheikah Slate deployment doesn't require a Chosen One on retainer. Spoiler — it doesn't."
        },
        {
          title: "Visiting Scholar — Sheikah Studies",
          company: "Kakariko Institute for Applied Antiquity",
          dateRange: "Mar 2014 – Dec 2014 · 9 months",
          description: "Spent nine months writing the paper nobody wanted: 'What If We Just Left Ganon Alone.' It has 47 citations. Make of that what you will."
        },
        {
          title: "Research Fellow",
          company: "Sheikah Institute of Science",
          dateRange: "Sep 2010 – Feb 2014 · 3 years 5 months",
          description: "Ancient tech excavation. Left before the Guardians went rogue. Good timing, actually."
        }
      ] as [
        { title: string; company: string; dateRange: string; description: string },
        { title: string; company: string; dateRange: string; description: string },
        { title: string; company: string; dateRange: string; description: string }
      ],
      endorsements: [
        {
          name: "Impa, Elder",
          title: "Head of the Sheikah Clan · Kakariko Village",
          text: "Zelda is the most capable person I have ever trained. That she chose to use those capabilities on consulting instead of divine duty is her right and, honestly, I respect it."
        },
        {
          name: "Purah",
          title: "Director, Hateno Research Lab",
          text: "She understood the Sheikah Slate better than anyone, including me. Her departure was our loss. Lurelin Village's gain. The tacos down there really are excellent."
        }
      ] as [
        { name: string; title: string; text: string },
        { name: string; title: string; text: string }
      ],
      openToWork: false
    }
  }
}

/** Convert ZELDA_DEMO_PROFILE.branches to the Branch[] type used throughout the app */
export function getDemoBranches(): Branch[] {
  return ZELDA_DEMO_PROFILE.branches.map(b => ({
    id: b.id,
    year: parseInt(b.year, 10),
    summary: b.framing,
    whatHappened: b.context,
    whatCouldHaveHappened: b.framing,
  }))
}
