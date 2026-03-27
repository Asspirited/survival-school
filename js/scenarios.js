/**
 * scenarios.js — Location → Conditions → Events cascade data
 *
 * Structure per location:
 *   id:         machine identifier
 *   label:      display name for chip
 *   group:      sub-category header in the UI
 *   conditions: chips for Step 2 (time, weather, environment state)
 *   events:     chips for Step 3 (animals, hazards, situations — all mixed)
 *
 * Universal absurdity events (UNIVERSAL_EVENTS) always appended to Step 3
 * regardless of location, under a clearly separated header.
 *
 * Step 4 context (CONTEXT) is always the same regardless of location.
 */

export const LOCATION_GROUPS = [

  // ── WILDERNESS ──────────────────────────────────────────────────────────────
  {
    group: 'Wilderness',
    locations: [
      {
        id: 'amazon',
        label: 'Amazon basin',
        conditions: [
          'rainy season — rivers rising',
          'dry season, midday, 40°C',
          'river at dusk',
          'jungle night — zero visibility',
        ],
        events: [
          'jaguar',
          'anaconda',
          'Brazilian wandering spider',
          'tarantula',
          'caiman',
          'piranha (in water)',
          'bullet ant colony',
          'flash flood',
          'lost — no canopy GPS signal',
          'river crossing gone wrong',
          'quicksand',
        ],
      },
      {
        id: 'scottish_highlands',
        label: 'Scottish Highlands',
        conditions: [
          'October gale, exposed ridge',
          'midwinter dawn, -10°C',
          'haar fog — visibility 5m',
          'unexpected sunshine (still dangerous)',
        ],
        events: [
          'red deer (rutting stag)',
          'adder',
          'highland cattle',
          'golden eagle (aggressive — nest nearby)',
          'exposure — core temperature dropping',
          'bog — submerged to knee',
          'ankle on scree, 3 miles from car',
          'white-out — no horizon',
        ],
      },
      {
        id: 'serengeti',
        label: 'Serengeti / Maasai Mara',
        conditions: [
          'migration season — wildebeest everywhere',
          'dry season, midday, 42°C',
          'dusk — predators active',
          'night — no torch',
        ],
        events: [
          'lion (pride, with cubs)',
          'leopard (tree, above you)',
          'cape buffalo',
          'black mamba',
          'elephant (mock charge, unclear if mock)',
          'pack of spotted hyenas',
          'hippo (out of water)',
          'vehicle broken down — on foot now',
        ],
      },
      {
        id: 'sonoran_desert',
        label: 'Sonoran Desert, Arizona',
        conditions: [
          'midday, 46°C, no shade',
          'dawn, 4°C, dropping',
          'dusk, flash storm incoming',
          'night, clear, -2°C',
        ],
        events: [
          'diamondback rattlesnake',
          'Gila monster',
          'bark scorpion (in shoe)',
          'coyote (pack, closing in)',
          'Gila woodpecker (surprisingly territorial)',
          'dehydration — 1 litre left',
          'flash flood (arroyo, no warning)',
          'lost — GPS dead, sun at zenith',
        ],
      },
      {
        id: 'himalayas',
        label: 'Himalayan approach, above 4,000m',
        conditions: [
          'altitude sickness setting in',
          'whiteout — storm in 20 minutes',
          'clear, -20°C, wind chill -35°C',
          'monsoon season — trail gone',
        ],
        events: [
          'snow leopard',
          'yak (loose, annoyed)',
          'avalanche — small but enough',
          'crevasse — one leg through',
          'HACE symptoms beginning',
          'partner incapacitated',
          'tent destroyed — bivouac only',
        ],
      },
      {
        id: 'antarctic_station',
        label: 'Antarctic research station (winter-over)',
        conditions: [
          'polar night — 3 months of dark',
          'white-out, -55°C wind chill',
          'inside station — something is wrong',
          'outside, tether lost',
        ],
        events: [
          'leopard seal (fell through ice)',
          'equipment failure — heating gone',
          'colleague behaving strangely (The Thing rules apply)',
          'supply drop missed — 6 months to next',
          'frostbite, fingers, early stage',
          'fire in the station (only warmth for miles)',
          'something outside the station — unclear what',
        ],
      },
      {
        id: 'north_sea',
        label: 'North Sea, small boat',
        conditions: [
          'force 8, January, nightfall',
          'fog — visibility 20m, shipping lane',
          'engine failure, drifting',
          'calm, but that means nothing out here',
        ],
        events: [
          'overboard — water temp 6°C',
          'hull breach, taking on water',
          'container ship, not seeing you',
          'flare kit — one left',
          'someone unconscious below deck',
          'orca (rare, but they do this now)',
        ],
      },
    ],
  },

  // ── DANGEROUS JOBS ──────────────────────────────────────────────────────────
  {
    group: 'Dangerous Jobs',
    locations: [
      {
        id: 'comms_tower',
        label: 'Replacing bulb on 600m comms tower',
        conditions: [
          'two-thirds up, wind picking up',
          'equipment malfunction at the top',
          'clear day — the view is not helping',
          'ice on rungs, discovered at 400m',
        ],
        events: [
          'harness clip failure',
          'wind gust, lateral, significant',
          'hand cramp — both hands',
          'colleague below not answering radio',
          'bird of prey — nesting, directly above target',
          'forgot the bulb',
        ],
      },
      {
        id: 'chernobyl',
        label: 'Chernobyl exclusion zone',
        conditions: [
          '1986, liquidator deployment, day 1',
          'modern tourist — guide has wandered off',
          'night — dosimeter behaving unusually',
          'rain — ground contamination mobilised',
        ],
        events: [
          'dosimeter reading unexpected',
          'Przewalski\'s horse (reintroduced, territorial)',
          'structure unstable underfoot',
          'something still running in reactor 4',
          'wolf pack (thriving, unfortunately)',
          'guide says "this is fine" — it is not fine',
        ],
      },
      {
        id: 'rnli',
        label: 'RNLI lifeboat, force 9, 3am',
        conditions: [
          'force 9 gusting 10, black water',
          'casualty vessel sinking — minutes left',
          'crew member overboard',
          'engine at 60%, radio intermittent',
        ],
        events: [
          'casualty in water, hypothermic',
          'second vessel, unlit, approaching',
          'wave pooped the boat',
          'casualty panicking, fighting rescue',
          'fuel situation becoming relevant',
        ],
      },
      {
        id: 'saturation_diver',
        label: 'Saturation diver, North Sea, 300m',
        conditions: [
          'bell cut off from surface — briefly',
          'visibility zero, current significant',
          'decompression schedule disrupted',
          'something outside the bell',
        ],
        events: [
          'umbilical snagged',
          'dive partner unresponsive',
          'surface comms gone — both channels',
          'pressure anomaly in the bell',
          'something large, unidentified, nearby',
        ],
      },
    ],
  },

  // ── WORK / COMMUTING ────────────────────────────────────────────────────────
  {
    group: 'Work & Commuting',
    locations: [
      {
        id: 'm25_breakdown',
        label: 'M25 contraflow, broken down, lane 1',
        conditions: [
          'rush hour, lorries at 56mph, 2m gap',
          'rain, visibility poor, hazards on',
          'night, no hard shoulder',
          'AA ETA: 90 minutes',
        ],
        events: [
          'lorry not moving over',
          'phone at 4%',
          'passenger needs the toilet',
          'tyre completely flat — spare is also flat',
          'van driver shouting, unclear if at you',
        ],
      },
      {
        id: 'london_underground',
        label: 'London Underground, rush hour',
        conditions: [
          'Jubilee line, 8:47am, signal failure ahead',
          'stopped in tunnel — no announcement',
          'Victoria line, someone eating a full McDonald\'s',
          'Northern line, air con non-functional, July',
        ],
        events: [
          'door closing on your bag',
          'man with saxophone, unasked',
          'someone crying, everyone pretending not to notice',
          'mice on the track — more than usual',
          'person eating hot food, direct eye contact',
          'announcement: "we are being held"',
        ],
      },
      {
        id: 'pret_a_manger',
        label: 'Pret a Manger — queue incident',
        conditions: [
          'lunchtime, 12:47, one item left of the thing you want',
          'man behind you already too close',
          'barista has called your name wrong three times',
          'card machine down — cash only sign appeared after you ordered',
        ],
        events: [
          'someone pushes in — directly, no ambiguity',
          'your order given to someone else who takes it',
          'heated disagreement at the condiments station',
          'you are the one who caused the queue',
          'almond milk situation, not your fault, everyone thinks it is',
        ],
      },
      {
        id: 'open_plan_office',
        label: 'Open-plan office, 3pm',
        conditions: [
          'post-lunch, everyone watching',
          'all-hands meeting in 8 minutes, you are presenting',
          'hot desk — your usual spot taken',
          'someone microwaved fish',
        ],
        events: [
          'eating something loud — unavoidable',
          'Teams call, camera on, cat is doing something',
          'printer jammed — you touched it last',
          'sneezing, repeatedly, during silence',
          'chair squeaks on every adjustment',
          'your screen reflected in the window behind you',
        ],
      },
    ],
  },

  // ── HOLIDAY DESTINATIONS ─────────────────────────────────────────────────────
  {
    group: 'Holiday Destinations',
    locations: [
      {
        id: 'all_inclusive',
        label: 'All-inclusive resort, pool bar',
        conditions: [
          '11am, swim-up bar, ice situation developing',
          'peak afternoon, every sunbed taken, you left yours',
          'buffet opens in 4 minutes, position critical',
          'entertainment team have noticed you',
        ],
        events: [
          'sunbed reserved with towel — disputed claim',
          'swim-up bar run out of your drink',
          'entertainment staff approaching with microphone',
          'wasp — singular, purposeful',
          'child, not yours, directly in your eyeline',
          'your wristband stopped working',
        ],
      },
      {
        id: 'safari_vehicle',
        label: 'Safari vehicle — engine won\'t start',
        conditions: [
          'dusk, predators active, 6km from camp',
          'dawn, lion pride crossed the road 40m back',
          'midday, 44°C, no shade outside the vehicle',
          'guide has gone to look at something',
        ],
        events: [
          'lion approaching vehicle — curious',
          'elephant broadside, not moving',
          'guide has been gone 12 minutes',
          'radio battery dead',
          'someone in the group wants to get out for a photo',
        ],
      },
      {
        id: 'budget_airline',
        label: 'Budget airline, middle seat, 9 hours',
        conditions: [
          'taxiing — you need the toilet immediately',
          '3 hours in, no sign of trolley',
          'turbulence — moderate, sustained',
          'landing approach, person reclined fully',
        ],
        events: [
          'window seat person asleep — you need out',
          'seat pocket contains something unidentified',
          'tray table broken — meal on lap',
          'child directly behind, consistent',
          'your entertainment screen only works sideways',
          'overhead locker: your bag not there',
        ],
      },
    ],
  },

  // ── AIRPORTS & TRANSPORT HUBS ─────────────────────────────────────────────
  {
    group: 'Airports & Transport Hubs',
    locations: [
      {
        id: 'heathrow_t5',
        label: 'Heathrow Terminal 5 — bag on wrong belt',
        conditions: [
          'gate closing in 9 minutes, bag on reclaim belt',
          'security queue: 40 minutes, flight: 35 minutes',
          'passport control, e-gate rejected, 3 times',
          'transfer, different terminal, no one told you',
        ],
        events: [
          'bag arrived — someone has taken it',
          'flight not on the board',
          'security confiscated your water — refill station closed',
          'moving walkway stopped, both of them',
          'wrong terminal — shuttle bus: 18 minutes',
        ],
      },
      {
        id: 'last_train',
        label: 'Train station — last train, platform unannounced',
        conditions: [
          '23:47, last train, board says "See Staff"',
          'platform announced — wrong end of station',
          'train delayed — replacement bus. Bus not there.',
          'last train cancelled — email sent earlier today',
        ],
        events: [
          'running for it — decision required now',
          'taxi app: surge 4.8x',
          'person ahead of you also running — collision risk',
          'ticket barrier won\'t open',
          'train doors closing — you are at the gap',
        ],
      },
    ],
  },

  // ── CIVIL & INSTITUTIONAL ────────────────────────────────────────────────────
  {
    group: 'Civil & Institutional',
    locations: [
      {
        id: 'ikea',
        label: 'IKEA — unspecified area',
        conditions: [
          'Sunday afternoon, full capacity',
          'marketplace, lost, no map, phone dying',
          'car park, 5:45pm, trolley situation',
          'restaurant, tray full, no seats visible',
        ],
        events: [
          'separated from group — no signal inside',
          'item out of stock, assembly started at home',
          'shortcut attempt — back in the bedroom section',
          'trolley wheel failure — structural',
          'argument about the meatballs, not yours, spreading',
          'staff member: cannot help, different department',
        ],
      },
      {
        id: 'ae_saturday',
        label: 'A&E, Saturday night, triage',
        conditions: [
          '11pm, full waiting room, 4-hour wait sign',
          '2am, triage nurse has seen everything',
          'nobody is sure what triage order means here',
          'the overhead lights are the wrong colour',
        ],
        events: [
          'person next to you may be contagious',
          'your stated reason for attending sounds worse out loud',
          'someone more dramatic arrives, queue resets',
          'you have been here 3 hours, number not called',
          'the thing you came in for has, worryingly, stopped hurting',
        ],
      },
      {
        id: 'estate_agent',
        label: 'Estate agent — viewing a "cosy" flat',
        conditions: [
          'second viewing, you\'ve already told people',
          'agent 8 minutes late, you\'ve been outside',
          'seller is still in the flat',
          'offer deadline: today, 5pm',
        ],
        events: [
          '"cosy" means something specific here',
          'damp patch — agent has positioned themselves in front of it',
          'neighbour audible through wall — at rest',
          'previous viewer\'s notes visible on agent\'s clipboard',
          'you are starting to talk yourself into it',
        ],
      },
    ],
  },
];

// ── UNIVERSAL ABSURDITY ───────────────────────────────────────────────────────
// Always present in Step 3 regardless of location.
// Panel treats all with full survival gravity. No exceptions.

export const UNIVERSAL_EVENTS = [
  'ghost (confirmed, visible, interactive)',
  'drone swarm (civilian or military — panel will debate)',
  'military incursion (unspecified nation, organised)',
  'alien contact (first contact, intent unclear)',
  'sentient weather (it is making decisions)',
  'spontaneous medieval re-enactment (no one else alarmed)',
  'the floor is lava (panel takes this literally)',
  'time loop (you are the only one who knows)',
  'everyone has forgotten who you are',
  'bees — just bees, but the panel treats this with full gravity',
];

// ── STEP 4 CONTEXT ────────────────────────────────────────────────────────────
// Always the same regardless of location or event.

export const CONTEXT = {
  time_of_day: [
    'dawn — just light enough to make bad decisions',
    'midday — maximum exposure',
    'dusk — predators know something you don\'t',
    'night — full dark',
  ],
  visibility: [
    'clear',
    'fog — 10m visibility',
    'total darkness',
    'smoke or dust',
  ],
  mental_state: [
    'calm — possibly worryingly so',
    'panicking, but quietly',
    'mildly concussed',
    'convinced I am fine',
    'have made one decision already and it was wrong',
  ],
  kit: [
    'nothing at all',
    'phone at 4%',
    'basic first aid kit',
    'full survival pack',
    'something completely inappropriate for this situation',
  ],
  company: [
    'alone',
    'with children',
    'with a dog (helpful)',
    'with someone useless',
    'with someone who is making it worse',
    'with someone calmer than they should be',
  ],
};
