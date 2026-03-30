# Will You Eat It — Deep Content Catalogue
# SS-168 — Species-level edibility database replacing generic items
# Status: Design v1
# Created: 2026-03-30
# Session A (Design + Docs + Domain) — no worker.js or HTML changes

---

## What Is This?

Will You Eat It currently has 12 generic chips: "mushroom," "wild berries,"
"snake," "insects," etc. These produce generic panel responses because the
panel has no species-level information to work with. Ray says "it depends
which mushroom." Bear eats it regardless. Nobody learns anything.

SS-168 replaces generic items with specific species, organised by category,
with edibility levels. The panel can now respond to "fly agaric" differently
from "field mushroom." Ray can say exactly what's wrong. Hiddins can say
exactly how to prepare it. Bear still eats it.

---

## The Problem

"Mushroom" gives the LLM nothing to work with. The comedy and the education
both require specificity. "Destroying angel" gives the LLM everything:
lethal, white, looks like a field mushroom, no antidote, symptoms delayed
8-12 hours, you feel fine and then you die.

Ray's response to "destroying angel" writes itself. Bear's response writes
itself differently. The specificity IS the product.

---

## Category Structure

Each category contains species ordered from safe → dangerous → deadly.
The edibility level determines the comedy register: safe items produce
mild disagreement, dangerous items produce concern, deadly items produce
the full panel cascade.

### Edibility Levels
```
SAFE        — edible, well-known, widely consumed
CAUTION     — edible with preparation, or easy to confuse with dangerous species
RISKY       — edible only in specific conditions, or mildly toxic
POISONOUS   — will make you seriously ill
DEADLY      — will kill you
```

---

## Species Catalogue

### MUSHROOMS

| Species | Common Name | Edibility | Key Fact |
|---------|-------------|-----------|----------|
| Agaricus campestris | Field mushroom | SAFE | Classic edible. Pink gills when young. Grows in pastures. |
| Cantharellus cibarius | Chanterelle | SAFE | Golden, apricot smell, no gills (ridges). Highly prized. |
| Boletus edulis | Penny bun / Porcini | SAFE | King of wild mushrooms. Spongy underside, never gills. |
| Pleurotus ostreatus | Oyster mushroom | SAFE | Grows on dead wood. Fan-shaped. Mild flavour. |
| Morchella esculenta | Morel | CAUTION | Must cook thoroughly. Raw morels are toxic. False morel (Gyromitra) is deadly. |
| Coprinus comatus | Shaggy ink cap | CAUTION | Edible when young and white. Toxic with alcohol. Auto-digests within hours. |
| Amanita muscaria | Fly agaric | POISONOUS | Red cap, white spots. Ibotenic acid. Won't usually kill you. Will make you profoundly unwell. |
| Amanita phalloides | Death cap | DEADLY | Responsible for 90% of mushroom deaths worldwide. Looks bland. Symptoms delayed 6-12 hours. No antidote. |
| Amanita virosa | Destroying angel | DEADLY | Pure white. Looks like a field mushroom to the untrained. One cap is enough. Same toxin as death cap. |
| Galerina marginata | Funeral bell | DEADLY | Small, brown, grows on wood. Contains amatoxins. Easy to confuse with edible species. |
| Gyromitra esculenta | False morel | DEADLY | Brain-shaped. Contains gyromitrin (converts to monomethylhydrazine — rocket fuel). Eaten in Finland after triple boiling. |

### BERRIES

| Species | Common Name | Edibility | Key Fact |
|---------|-------------|-----------|----------|
| Rubus fruticosus | Blackberry | SAFE | Everywhere. Impossible to misidentify. Free food. |
| Vaccinium myrtillus | Bilberry | SAFE | Wild blueberry. Smaller, darker. Moorland and woodland. |
| Sambucus nigra (berries) | Elderberry | CAUTION | Must cook. Raw elderberries cause nausea. The flowers are fine raw. |
| Rosa canina | Rosehip | CAUTION | Very high vitamin C. Remove the hairy seeds (irritant). |
| Solanum dulcamara | Bittersweet nightshade | POISONOUS | Red berries, purple flowers. Solanine. Will not kill you but will teach you a lesson. |
| Atropa belladonna | Deadly nightshade | DEADLY | Three berries can kill a child. Sweet-tasting (this is the problem). Black, shiny. |
| Taxus baccata (arils) | Yew berry | DEADLY | The red flesh is technically edible. The seed inside is lethal. Nobody should be testing this distinction. |
| Actaea spicata | Baneberry | DEADLY | Red or white clusters. All parts toxic. Protoanemonin. |
| Paris quadrifolia | Herb paris | POISONOUS | Single black berry on four-leaf stem. Saponins. Uncommon but distinctive. |

### INSECTS & INVERTEBRATES

| Species | Common Name | Edibility | Key Fact |
|---------|-------------|-----------|----------|
| Tenebrio molitor | Mealworm | SAFE | 20% protein. Nutty when roasted. 2 billion people eat insects regularly. |
| Acheta domesticus | House cricket | SAFE | Roast, grind into flour, add to anything. 12g protein per 100g. |
| Rhynchophorus ferrugineus | Palm weevil larva | SAFE | Creamy, fatty, slightly sweet. Staple in SE Asia and Central Africa. |
| Endoxyla leucomochla | Witchetty grub | SAFE | Raw: almonds. Cooked: roast chicken (Hiddins). High fat. |
| Lumbricus terrestris | Common earthworm | CAUTION | Edible after purging (starve 24hrs to clear gut). Gritty otherwise. |
| Helix aspersa | Garden snail | CAUTION | Edible after purging. Must cook thoroughly. Parasite risk (rat lungworm). |
| Latrodectus mactans | Black widow spider | RISKY | Technically edible if you remove the venom glands. The question is why. |
| Phoneutria nigriventer | Brazilian wandering spider | DEADLY | Aggressive. Bite is medically significant. Do not attempt to eat. |
| Lonomia obliqua | Assassin caterpillar | DEADLY | Touch = anticoagulant injection. Has killed people via hemorrhage from brushing past. |

### REPTILES & AMPHIBIANS

| Species | Common Name | Edibility | Key Fact |
|---------|-------------|-----------|----------|
| Python regius | Ball python | SAFE | Lean protein. Must remove head, guts, skin. Cook thoroughly. |
| Varanus komodoensis | Komodo dragon | RISKY | You can eat it. It is more likely to eat you. Bacterial bite, monitor saliva, debatable venom. |
| Crotalus atrox | Western diamondback | CAUTION | Edible. Tastes like chicken (everyone says this). Remove head with 6 inches of neck. Reflex bite risk post-mortem. |
| Phyllobates terribilis | Golden poison frog | DEADLY | 1mg of batrachotoxin kills 10 adults. The Choco people use it for blow darts. Do not lick. |
| Dendrobates tinctorius | Dyeing dart frog | POISONOUS | Less toxic than P. terribilis but still not food. Alkaloid sequestration from ant diet. |
| Bufo marinus | Cane toad | POISONOUS | Bufotoxin in skin glands. Aboriginal Australians ate the legs after removing skin. Risky. |

### PLANTS & FOLIAGE

| Species | Common Name | Edibility | Key Fact |
|---------|-------------|-----------|----------|
| Typha latifolia | Cattail / Bulrush | SAFE | Every part edible. Root, stem, pollen, shoots. Hiddins calls this "the supermarket of the swamp." |
| Urtica dioica | Stinging nettle | SAFE | Boil or dry to neutralise sting. High iron, vitamin C. Makes decent soup. |
| Taraxacum officinale | Dandelion | SAFE | Entire plant edible. Leaves (salad), root (coffee substitute), flowers (fritters). |
| Allium ursinum | Wild garlic / Ramsons | SAFE | Unmistakable garlic smell. But looks like lily of the valley (DEADLY). Smell first, always. |
| Pteridium aquilinum | Bracken fern | RISKY | Young fiddleheads edible after boiling. Mature bracken contains ptaquiloside (carcinogenic). |
| Conium maculatum | Hemlock | DEADLY | Killed Socrates. Looks like cow parsley. Purple-blotched stem is the tell. Ascending paralysis. |
| Oenanthe crocata | Hemlock water dropwort | DEADLY | Most poisonous plant in Britain. Roots look like parsnips. Called "dead man's fingers." |
| Digitalis purpurea | Foxglove | DEADLY | Contains digoxin (heart drug). Therapeutic window is tiny. Leaves look like comfrey (edible). |
| Ricinus communis | Castor bean | DEADLY | Ricin. One seed can kill. Extracted by pressing (castor oil is safe — toxin stays in pulp). |
| Hippomane mancinella | Manchineel tree | DEADLY | "Little apple of death." Fruit is sweet. Rain dripping off leaves burns skin. Standing under it in rain causes blisters. |

### MARINE

| Species | Common Name | Edibility | Key Fact |
|---------|-------------|-----------|----------|
| Palmaria palmata | Dulse | SAFE | Red seaweed. Eat raw or dried. High protein for seaweed. |
| Ulva lactuca | Sea lettuce | SAFE | Green, translucent, lettuce-like. Edible raw. Common on all temperate coasts. |
| Paracentrotus lividus | Sea urchin | SAFE | Gonads (uni). Prized delicacy. Open, scoop, eat. Available in rock pools. |
| Mytilus edulis | Blue mussel | CAUTION | Edible when cooked. Red tide risk (paralytic shellfish poisoning). Only harvest from clean water. |
| Hapalochlaena lunulata | Blue-ringed octopus | DEADLY | Tetrodotoxin. No antivenom. Bite is painless. Paralysis within minutes. Beautiful. Do not touch. |
| Tetraodontidae | Pufferfish | DEADLY | Tetrodotoxin in liver, ovaries, skin. Fugu chefs train 3 years. One wrong cut = death. |
| Conus geographus | Cone snail | DEADLY | Harpoon-like tooth. Conotoxin. No antivenom. Looks like a pretty shell. |

---

## How This Integrates

### Chip redesign (Session B — worker.js)
Current 12 generic chips → category tile groups (same pattern as HSAI):
- Mushrooms (11 species)
- Berries (9 species)
- Insects (9 species)
- Reptiles (6 species)
- Plants (10 species)
- Marine (7 species)

Each chip shows common name. Freetext remains for anything not listed.

### Panel response quality
With species-level data, the system prompt can include:
- Edibility level (so the panel knows the real answer)
- Key fact (so Ray can give the real science)
- This means panel comedy is grounded in real information
- Bear still eats it. But now the footnote can be specific.

### Domain data (Session A — this session)
The species catalogue above can be structured as a data constant
in a new file or added to scenarios.js. Session A can build:
- `EAT_IT_SPECIES` — structured species database
- `getSpeciesByCategory(category)` — lookup
- `getEdibilityLevel(speciesId)` — for prompt injection

---

## What Does NOT Ship in v1

- **Images.** No species photos. Text only. (SS-022 clay visuals is separate.)
- **Seasonal availability.** No "this mushroom only fruits in autumn."
- **Regional filtering.** No "species found in UK" vs "species found in Australia."
- **Preparation instructions.** The panel gives these in-character.
  The data layer just says "CAUTION — must cook" not how to cook.
- **Dosage/quantity.** No "3 berries = fine, 30 = dead." The edibility
  level covers the general case.
