// Phrases shown during the loading animation.
// Voice: funny first, melancholy underneath. Confident, specific, slightly unhinged, secretly tender.
// Banned words: navigating, tapestry, embark, journey, landscape, transformative, robust, seamless,
//   leverage, dance of, symphony of, delve, paradigm, testament, thriving, holistic, ecosystem,
//   reimagine, elevate, synergy, authentic.

export const GENERIC_PHRASES: readonly string[] = [

  // — reading —
  'reading your timeline…',
  'reading between the lines of your LinkedIn…',
  'reading the resignation letter you never sent…',
  'reading the version of your life where you were slightly braver…',
  'reading the email you drafted, then deleted, then re-drafted, then left as a draft…',

  // — finding —
  'finding the forks in the road…',
  'finding the you who took the other path…',
  'finding the version of you who asked for more money…',
  'finding the you who stayed in the first job…',
  'finding the you who listened to the feedback…',
  'finding the you who stayed in academia…',
  'finding the you who took the redundancy and ran with it…',
  'finding the startup you almost joined…',
  'finding the career you almost had…',
  'finding the moment before you became yourself…',
  'finding the decision that wasn\'t really a decision at the time…',
  'finding the version of you who said no…',
  'finding the you who got the visa…',
  'finding the you who moved cities…',
  'finding the you who did it anyway…',
  'finding the you who left before they were ready…',
  'finding the you who made it weird and it all worked out anyway…',
  'finding the year you stopped saying eventually…',
  'finding the you who knew when to leave…',
  'finding which of you has the better story…',

  // — locating —
  'locating your almost…',
  'locating the degree you almost studied…',
  'locating the you who said yes to the weird opportunity…',
  'locating the version who took the sabbatical…',
  'locating the version who didn\'t burn out…',
  'locating the version who said something in that meeting…',
  'locating the you who took the leap…',
  'locating the you who went freelance earlier…',
  'locating the you who packed it all in and just did the thing…',
  'locating the you who got out of the industry before it got weird…',
  'locating your counterfactual…',
  'locating the fork you didn\'t see coming…',
  'locating the you who left earlier…',

  // — working out / figuring out —
  'working out which year it all could have changed…',
  'working out which door you didn\'t walk through…',
  'working out which city you almost moved to…',
  'working out which manager almost changed everything…',
  'working out which pivot point made you who you are…',
  'working out which rejection actually saved you…',
  'working out which Monday morning made the difference…',
  'working out which project changed the trajectory…',
  'working out which flight you almost didn\'t take…',
  'working out which skill you almost picked up…',
  'working out which offer you should have taken…',
  'working out which conference changed everything…',
  'working out what the other you is doing right now…',
  'working out which role changed everything…',
  'working out which email you should have replied to…',
  'working out which coffee chat quietly changed the entire trajectory…',
  'working out how long you stayed somewhere you\'d already outgrown…',
  'working out which conversation you almost had but let go of…',
  'working out which year it all branched…',
  'working out which year you almost quit…',
  'figuring out what you would have been if you\'d listened to that one lecturer…',
  'figuring out which of you would win in a LinkedIn request to yourself…',
  'figuring out how much of your career was plan and how much was accident…',

  // — looking for —
  'looking for the fork you didn\'t notice at the time…',
  'looking for the path of least resistance you didn\'t take…',
  'looking for the version who trusted their gut…',
  'looking for the version who started the thing…',
  'looking for the version of you who didn\'t take that job…',
  'looking for the version who went freelance earlier…',
  'looking for the you who went to that conference and met the right person…',
  'looking for the you who finally replied to that recruiter…',
  'looking for the version of you who said no to the comfortable option…',
  'looking for the moment you became you…',
  'looking for the you who followed the person across the country…',

  // — checking / asking —
  'checking in with the you who never updated their LinkedIn…',
  'checking whether the other you has a better work-life balance (they probably don\'t)…',
  'checking whether you\'d recognise the other you on the street…',
  'checking whether the other you still gets emails from recruiters about this…',
  'checking whether the other you is also, somehow, exhausted…',
  'checking whether the other you gets that particular Sunday dread…',
  'checking whether the other you is also doing this on a Sunday…',
  'checking the version of you who took the board seat…',
  'checking how the other you explains what they do at dinner parties…',
  'checking the job title the other you has that you couldn\'t have predicted…',
  'asking the version of you who took the risk if it was worth it…',
  'asking the other you how they explain the gap on their CV…',
  'asking your alternate self if they\'re happy (it\'s complicated)…',
  'asking the other you if they\'d do anything differently (they would)…',
  'asking the other you if they miss any of this…',
  'asking the version who made the leap how the landing went…',

  // — examining / reviewing / consulting —
  'examining the version of you who went back to uni at 34…',
  'examining the meeting you almost quit in…',
  'examining the resignation letter you wrote and saved as a draft…',
  'consulting the version of you who actually sent it…',
  'reviewing the offer letter you deleted from your inbox…',
  'reviewing the meeting that changed everything — that you didn\'t realise at the time…',
  'reviewing the exit interview you gave in the parallel universe…',
  'reviewing the version of you who moved somewhere cheaper and figured it out…',
  'reviewing the version who hasn\'t had to explain their career for six minutes at a wedding…',
  'reviewing the version who took the weird sideways move that turned out to be everything…',

  // — mapping / comparing / counting —
  'mapping the roads not taken…',
  'comparing your timeline to the other timelines…',
  'counting your near-misses…',
  'counting the versions of you…',
  'counting the years the other you has been doing something they can\'t stop talking about…',
  'counting the number of times you said yes when you meant maybe…',
  'tallying the near misses, the almosts, the close-but-nots…',
  'tallying the cost of the safe option…',
  'identifying where it could have gone sideways…',
  'tracing your career like a map with too many routes…',

  // — running / calculating / auditing —
  'running the numbers on the life you didn\'t pick…',
  'running the alternate timeline calculations now…',
  'running diagnostics on your pivotal moments…',
  'running the version of you who picked the harder option early…',
  'calculating exactly how different things could have been…',
  'calculating how many times you were one email away from a different life…',
  'calculating the emotional ROI of the path you didn\'t take…',
  'auditing the decisions you\'ve quietly forgotten you made…',
  'accounting for compound interest on a different decision made at 24…',
  'cross-referencing your career moves with the road less travelled…',
  'cross-checking your pivot points with the archived version of you…',

  // — assembling / building / drafting —
  'assembling your other life from the pieces you left behind…',
  'assembling the you who made the unconventional choice and turned out to be right…',
  'assembling the you who made peace with the detour…',
  'building the career you described at a dinner party once and never mentioned again…',
  'drafting the alternate you\'s explanation for why they don\'t have a five-year plan…',
  'drafting the bio you almost had…',
  'reconstructing the version of you who said yes to that thing…',
  'consulting the folder marked old ideas that you never quite deleted…',

  // — scanning / spotting / noting —
  'scanning your LinkedIn for the gaps that tell the real story…',
  'spotting the moments you didn\'t realise were moments…',
  'spotting the year everything almost went differently…',
  'spotting the compliment that changed what you thought was possible…',
  'noting the year everything almost made sense differently…',
  'noting how different the business card would have read…',
  'noting the year your ambition ran in a different direction…',

  // — wry observational —
  'processing the gap year you almost took…',
  'compiling the alternate you\'s references…',
  'tracking down the version of you who actually sent that email…',
  'determining if the other you has any regrets (they do, just different ones)…',
  'determining if the alternate you got any actual vacation time…',
  'verifying that the alternate you is also, somehow, running slightly late…',
  'checking the Slack username the other you would have had…',

  // — final —
  'running final checks on your counterfactual…',
  'almost done finding your almost…',
  'nearly there. one more timeline to cross…',
]

export const ZELDA_PHRASES: readonly string[] = [
  'reading the royal chronicles…',
  'consulting the Sheikah Slate…',
  'cross-referencing the Triforce of Wisdom…',
  'checking the ancient texts for fork points…',
  'looking for the version of Zelda who said no to the prophecy…',
  'combing through 10,000 years of ancestral career decisions…',
  'finding the Zelda who opened the pottery studio in Kakariko…',
  'working out which Guardian deployment changed everything…',
  'locating the royal almost…',
  'scanning the Silent Realm for alternate timelines…',
  'consulting the Great Deku Tree\'s career counsellor…',
  'looking for the version who stayed in Kakariko and was happier for it…',
  'working out which prophecy she didn\'t have to fulfil…',
  'finding the Zelda who took the gap year in Gerudo Town…',
  'cross-referencing Ganon threat models with alternate life choices…',
  'working out how long five more years of Link\'s beauty sleep would have taken…',
  'locating the timeline where she just said: let someone else handle it…',
  'checking the Sacred Realm for career counselling services…',
  'reviewing the divine beast assigned to this particular fork in time…',
  'locating the Zelda who applied for Hyrule Castle but got waitlisted…',
  'asking the Spirit Sages about the timeline she could have had…',
  'consulting the Sheikah archive of almost-decisions…',
  'finding the version of Zelda who just… didn\'t do it…',
  'checking whether the alternate Zelda also gets prophecy fatigue…',
  'asking if the other Zelda also gets unsolicited career advice from owls…',
  'tallying the alternate prophecies that would have required less of her…',
  'reviewing the version of Zelda who unionised the knights…',
  'checking the ancient texts for: what if she\'d passed it to someone else…',
  'determining whether the alternate Zelda got any actual vacation time…',
  'reviewing the version who handed in the Triforce and went into consulting…',
  'finding the Zelda who sent the divine beast as a polite resignation letter…',
  'asking which version of Zelda has the better work-life balance (none of them)…',
]

/** Returns the full phrase list for the current mode. */
export function getLoadingPhrases(demoMode: boolean): readonly string[] {
  return demoMode ? ZELDA_PHRASES : GENERIC_PHRASES
}

/** Pick a random phrase from a list (for one-off use). */
export function randomPhrase(demoMode: boolean): string {
  const list = getLoadingPhrases(demoMode)
  return list[Math.floor(Math.random() * list.length)]
}
