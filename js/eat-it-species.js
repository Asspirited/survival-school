/**
 * eat-it-species.js — Species-level edibility database for Will You Eat It
 * SS-168 — replaces generic "mushroom" / "insects" chips with real species
 *
 * Each species has: id, commonName, scientificName, category, edibility, keyFact
 * Edibility levels: SAFE, CAUTION, RISKY, POISONOUS, DEADLY
 *
 * Run: node --test tests/domain-characters.test.js (imported there)
 */

const EDIBILITY_LEVELS = ['SAFE', 'CAUTION', 'RISKY', 'POISONOUS', 'DEADLY'];

const EAT_IT_CATEGORIES = ['mushrooms', 'berries', 'insects', 'reptiles', 'plants', 'marine'];

const EAT_IT_SPECIES = [
  // ── MUSHROOMS ──
  { id: 'field_mushroom', commonName: 'Field mushroom', scientificName: 'Agaricus campestris', category: 'mushrooms', edibility: 'SAFE', keyFact: 'Classic edible. Pink gills when young. Grows in pastures.' },
  { id: 'chanterelle', commonName: 'Chanterelle', scientificName: 'Cantharellus cibarius', category: 'mushrooms', edibility: 'SAFE', keyFact: 'Golden, apricot smell, no gills (ridges). Highly prized.' },
  { id: 'porcini', commonName: 'Penny bun / Porcini', scientificName: 'Boletus edulis', category: 'mushrooms', edibility: 'SAFE', keyFact: 'King of wild mushrooms. Spongy underside, never gills.' },
  { id: 'oyster_mushroom', commonName: 'Oyster mushroom', scientificName: 'Pleurotus ostreatus', category: 'mushrooms', edibility: 'SAFE', keyFact: 'Grows on dead wood. Fan-shaped. Mild flavour.' },
  { id: 'morel', commonName: 'Morel', scientificName: 'Morchella esculenta', category: 'mushrooms', edibility: 'CAUTION', keyFact: 'Must cook thoroughly. Raw morels are toxic. False morel (Gyromitra) is deadly.' },
  { id: 'shaggy_ink_cap', commonName: 'Shaggy ink cap', scientificName: 'Coprinus comatus', category: 'mushrooms', edibility: 'CAUTION', keyFact: 'Edible when young and white. Toxic with alcohol. Auto-digests within hours.' },
  { id: 'fly_agaric', commonName: 'Fly agaric', scientificName: 'Amanita muscaria', category: 'mushrooms', edibility: 'POISONOUS', keyFact: 'Red cap, white spots. Ibotenic acid. Won\'t usually kill you. Will make you profoundly unwell.' },
  { id: 'death_cap', commonName: 'Death cap', scientificName: 'Amanita phalloides', category: 'mushrooms', edibility: 'DEADLY', keyFact: 'Responsible for 90% of mushroom deaths worldwide. Looks bland. Symptoms delayed 6-12 hours. No antidote.' },
  { id: 'destroying_angel', commonName: 'Destroying angel', scientificName: 'Amanita virosa', category: 'mushrooms', edibility: 'DEADLY', keyFact: 'Pure white. Looks like a field mushroom to the untrained. One cap is enough.' },
  { id: 'funeral_bell', commonName: 'Funeral bell', scientificName: 'Galerina marginata', category: 'mushrooms', edibility: 'DEADLY', keyFact: 'Small, brown, grows on wood. Contains amatoxins. Easy to confuse with edible species.' },
  { id: 'false_morel', commonName: 'False morel', scientificName: 'Gyromitra esculenta', category: 'mushrooms', edibility: 'DEADLY', keyFact: 'Brain-shaped. Contains gyromitrin (converts to monomethylhydrazine — rocket fuel). Eaten in Finland after triple boiling.' },

  // ── BERRIES ──
  { id: 'blackberry', commonName: 'Blackberry', scientificName: 'Rubus fruticosus', category: 'berries', edibility: 'SAFE', keyFact: 'Everywhere. Impossible to misidentify. Free food.' },
  { id: 'bilberry', commonName: 'Bilberry', scientificName: 'Vaccinium myrtillus', category: 'berries', edibility: 'SAFE', keyFact: 'Wild blueberry. Smaller, darker. Moorland and woodland.' },
  { id: 'elderberry', commonName: 'Elderberry', scientificName: 'Sambucus nigra', category: 'berries', edibility: 'CAUTION', keyFact: 'Must cook. Raw elderberries cause nausea. The flowers are fine raw.' },
  { id: 'rosehip', commonName: 'Rosehip', scientificName: 'Rosa canina', category: 'berries', edibility: 'CAUTION', keyFact: 'Very high vitamin C. Remove the hairy seeds (irritant).' },
  { id: 'bittersweet', commonName: 'Bittersweet nightshade', scientificName: 'Solanum dulcamara', category: 'berries', edibility: 'POISONOUS', keyFact: 'Red berries, purple flowers. Solanine. Will not kill you but will teach you a lesson.' },
  { id: 'deadly_nightshade', commonName: 'Deadly nightshade', scientificName: 'Atropa belladonna', category: 'berries', edibility: 'DEADLY', keyFact: 'Three berries can kill a child. Sweet-tasting (this is the problem). Black, shiny.' },
  { id: 'yew_berry', commonName: 'Yew berry', scientificName: 'Taxus baccata', category: 'berries', edibility: 'DEADLY', keyFact: 'The red flesh is technically edible. The seed inside is lethal. Nobody should be testing this distinction.' },
  { id: 'baneberry', commonName: 'Baneberry', scientificName: 'Actaea spicata', category: 'berries', edibility: 'DEADLY', keyFact: 'Red or white clusters. All parts toxic. Protoanemonin.' },
  { id: 'herb_paris', commonName: 'Herb paris', scientificName: 'Paris quadrifolia', category: 'berries', edibility: 'POISONOUS', keyFact: 'Single black berry on four-leaf stem. Saponins. Uncommon but distinctive.' },

  // ── INSECTS & INVERTEBRATES ──
  { id: 'mealworm', commonName: 'Mealworm', scientificName: 'Tenebrio molitor', category: 'insects', edibility: 'SAFE', keyFact: '20% protein. Nutty when roasted. 2 billion people eat insects regularly.' },
  { id: 'house_cricket', commonName: 'House cricket', scientificName: 'Acheta domesticus', category: 'insects', edibility: 'SAFE', keyFact: 'Roast, grind into flour, add to anything. 12g protein per 100g.' },
  { id: 'palm_weevil', commonName: 'Palm weevil larva', scientificName: 'Rhynchophorus ferrugineus', category: 'insects', edibility: 'SAFE', keyFact: 'Creamy, fatty, slightly sweet. Staple in SE Asia and Central Africa.' },
  { id: 'witchetty_grub', commonName: 'Witchetty grub', scientificName: 'Endoxyla leucomochla', category: 'insects', edibility: 'SAFE', keyFact: 'Raw: almonds. Cooked: roast chicken (Hiddins). High fat.' },
  { id: 'earthworm', commonName: 'Common earthworm', scientificName: 'Lumbricus terrestris', category: 'insects', edibility: 'CAUTION', keyFact: 'Edible after purging (starve 24hrs to clear gut). Gritty otherwise.' },
  { id: 'garden_snail', commonName: 'Garden snail', scientificName: 'Helix aspersa', category: 'insects', edibility: 'CAUTION', keyFact: 'Edible after purging. Must cook thoroughly. Parasite risk (rat lungworm).' },
  { id: 'black_widow', commonName: 'Black widow spider', scientificName: 'Latrodectus mactans', category: 'insects', edibility: 'RISKY', keyFact: 'Technically edible if you remove the venom glands. The question is why.' },
  { id: 'wandering_spider', commonName: 'Brazilian wandering spider', scientificName: 'Phoneutria nigriventer', category: 'insects', edibility: 'DEADLY', keyFact: 'Aggressive. Bite is medically significant. Do not attempt to eat.' },
  { id: 'assassin_caterpillar', commonName: 'Assassin caterpillar', scientificName: 'Lonomia obliqua', category: 'insects', edibility: 'DEADLY', keyFact: 'Touch = anticoagulant injection. Has killed people via hemorrhage from brushing past.' },

  // ── REPTILES & AMPHIBIANS ──
  { id: 'ball_python', commonName: 'Ball python', scientificName: 'Python regius', category: 'reptiles', edibility: 'SAFE', keyFact: 'Lean protein. Must remove head, guts, skin. Cook thoroughly.' },
  { id: 'komodo_dragon', commonName: 'Komodo dragon', scientificName: 'Varanus komodoensis', category: 'reptiles', edibility: 'RISKY', keyFact: 'You can eat it. It is more likely to eat you. Bacterial bite, monitor saliva, debatable venom.' },
  { id: 'diamondback', commonName: 'Western diamondback', scientificName: 'Crotalus atrox', category: 'reptiles', edibility: 'CAUTION', keyFact: 'Edible. Tastes like chicken (everyone says this). Remove head with 6 inches of neck. Reflex bite risk post-mortem.' },
  { id: 'golden_poison_frog', commonName: 'Golden poison frog', scientificName: 'Phyllobates terribilis', category: 'reptiles', edibility: 'DEADLY', keyFact: '1mg of batrachotoxin kills 10 adults. The Choco people use it for blow darts. Do not lick.' },
  { id: 'dart_frog', commonName: 'Dyeing dart frog', scientificName: 'Dendrobates tinctorius', category: 'reptiles', edibility: 'POISONOUS', keyFact: 'Less toxic than P. terribilis but still not food. Alkaloid sequestration from ant diet.' },
  { id: 'cane_toad', commonName: 'Cane toad', scientificName: 'Bufo marinus', category: 'reptiles', edibility: 'POISONOUS', keyFact: 'Bufotoxin in skin glands. Aboriginal Australians ate the legs after removing skin. Risky.' },

  // ── PLANTS & FOLIAGE ──
  { id: 'cattail', commonName: 'Cattail / Bulrush', scientificName: 'Typha latifolia', category: 'plants', edibility: 'SAFE', keyFact: 'Every part edible. Root, stem, pollen, shoots. "The supermarket of the swamp."' },
  { id: 'stinging_nettle', commonName: 'Stinging nettle', scientificName: 'Urtica dioica', category: 'plants', edibility: 'SAFE', keyFact: 'Boil or dry to neutralise sting. High iron, vitamin C. Makes decent soup.' },
  { id: 'dandelion', commonName: 'Dandelion', scientificName: 'Taraxacum officinale', category: 'plants', edibility: 'SAFE', keyFact: 'Entire plant edible. Leaves (salad), root (coffee substitute), flowers (fritters).' },
  { id: 'wild_garlic', commonName: 'Wild garlic / Ramsons', scientificName: 'Allium ursinum', category: 'plants', edibility: 'SAFE', keyFact: 'Unmistakable garlic smell. But looks like lily of the valley (DEADLY). Smell first, always.' },
  { id: 'bracken', commonName: 'Bracken fern', scientificName: 'Pteridium aquilinum', category: 'plants', edibility: 'RISKY', keyFact: 'Young fiddleheads edible after boiling. Mature bracken contains ptaquiloside (carcinogenic).' },
  { id: 'hemlock', commonName: 'Hemlock', scientificName: 'Conium maculatum', category: 'plants', edibility: 'DEADLY', keyFact: 'Killed Socrates. Looks like cow parsley. Purple-blotched stem is the tell. Ascending paralysis.' },
  { id: 'hemlock_water_dropwort', commonName: 'Hemlock water dropwort', scientificName: 'Oenanthe crocata', category: 'plants', edibility: 'DEADLY', keyFact: 'Most poisonous plant in Britain. Roots look like parsnips. Called "dead man\'s fingers."' },
  { id: 'foxglove', commonName: 'Foxglove', scientificName: 'Digitalis purpurea', category: 'plants', edibility: 'DEADLY', keyFact: 'Contains digoxin (heart drug). Therapeutic window is tiny. Leaves look like comfrey (edible).' },
  { id: 'castor_bean', commonName: 'Castor bean', scientificName: 'Ricinus communis', category: 'plants', edibility: 'DEADLY', keyFact: 'Ricin. One seed can kill. Extracted by pressing (castor oil is safe — toxin stays in pulp).' },
  { id: 'manchineel', commonName: 'Manchineel tree', scientificName: 'Hippomane mancinella', category: 'plants', edibility: 'DEADLY', keyFact: '"Little apple of death." Fruit is sweet. Rain dripping off leaves burns skin. Standing under it in rain causes blisters.' },

  // ── MARINE ──
  { id: 'dulse', commonName: 'Dulse', scientificName: 'Palmaria palmata', category: 'marine', edibility: 'SAFE', keyFact: 'Red seaweed. Eat raw or dried. High protein for seaweed.' },
  { id: 'sea_lettuce', commonName: 'Sea lettuce', scientificName: 'Ulva lactuca', category: 'marine', edibility: 'SAFE', keyFact: 'Green, translucent, lettuce-like. Edible raw. Common on all temperate coasts.' },
  { id: 'sea_urchin', commonName: 'Sea urchin', scientificName: 'Paracentrotus lividus', category: 'marine', edibility: 'SAFE', keyFact: 'Gonads (uni). Prized delicacy. Open, scoop, eat. Available in rock pools.' },
  { id: 'blue_mussel', commonName: 'Blue mussel', scientificName: 'Mytilus edulis', category: 'marine', edibility: 'CAUTION', keyFact: 'Edible when cooked. Red tide risk (paralytic shellfish poisoning). Only harvest from clean water.' },
  { id: 'blue_ringed_octopus', commonName: 'Blue-ringed octopus', scientificName: 'Hapalochlaena lunulata', category: 'marine', edibility: 'DEADLY', keyFact: 'Tetrodotoxin. No antivenom. Bite is painless. Paralysis within minutes. Beautiful. Do not touch.' },
  { id: 'pufferfish', commonName: 'Pufferfish', scientificName: 'Tetraodontidae', category: 'marine', edibility: 'DEADLY', keyFact: 'Tetrodotoxin in liver, ovaries, skin. Fugu chefs train 3 years. One wrong cut = death.' },
  { id: 'cone_snail', commonName: 'Cone snail', scientificName: 'Conus geographus', category: 'marine', edibility: 'DEADLY', keyFact: 'Harpoon-like tooth. Conotoxin. No antivenom. Looks like a pretty shell.' }
];

function getSpeciesByCategory(category) {
  return EAT_IT_SPECIES.filter(s => s.category === category);
}

function getSpeciesById(speciesId) {
  return EAT_IT_SPECIES.find(s => s.id === speciesId) || null;
}

function getEdibilityLevel(speciesId) {
  const species = getSpeciesById(speciesId);
  return species ? species.edibility : null;
}

function buildEatItPromptContext(speciesId) {
  const species = getSpeciesById(speciesId);
  if (!species) return '';
  return `SPECIES: ${species.commonName} (${species.scientificName})
CATEGORY: ${species.category}
EDIBILITY: ${species.edibility}
KEY FACT: ${species.keyFact}`;
}

export { EDIBILITY_LEVELS, EAT_IT_CATEGORIES, EAT_IT_SPECIES, getSpeciesByCategory, getSpeciesById, getEdibilityLevel, buildEatItPromptContext };
