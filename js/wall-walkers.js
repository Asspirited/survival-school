// wall-walkers.js — Wall Walkers data layer
// GPS-triggered quiz + flora/fauna collection for Hadrian's Wall walk
// Rod + Ivan, Bowness-on-Solway → Wallsend, 24–29 Apr 2026

// ── GPS TRIGGER STOPS ──────────────────────────────────────────────
// Each stop has coords (lat/lng), trigger radius in metres, and day number

const WALL_STOPS = {
  bowness:      { id: 'bowness',      name: 'Bowness-on-Solway', lat: 54.9462, lng: -3.2262, radius: 500, day: 1, romanName: 'Maia' },
  carlisle:     { id: 'carlisle',     name: 'Carlisle',          lat: 54.8951, lng: -2.9382, radius: 800, day: 1, romanName: 'Luguvalium' },
  banks:        { id: 'banks',        name: 'Banks',             lat: 54.9820, lng: -2.7100, radius: 400, day: 2, romanName: null },
  once_brewed:  { id: 'once_brewed',  name: 'Once Brewed',       lat: 55.0020, lng: -2.3670, radius: 400, day: 3, romanName: null },
  twice_brewed: { id: 'twice_brewed', name: 'Twice Brewed',      lat: 55.0010, lng: -2.3710, radius: 300, day: 3, romanName: null },
  vindolanda:   { id: 'vindolanda',   name: 'Vindolanda',        lat: 54.9910, lng: -2.3610, radius: 400, day: 3, romanName: 'Vindolanda' },
  housesteads:  { id: 'housesteads',  name: 'Housesteads',       lat: 55.0120, lng: -2.3280, radius: 400, day: 3, romanName: 'Vercovicium' },
  chollerford:  { id: 'chollerford',  name: 'Chollerford',       lat: 55.0280, lng: -2.1360, radius: 400, day: 4, romanName: 'Cilurnum' },
  hexham:       { id: 'hexham',       name: 'Hexham',            lat: 54.9710, lng: -2.1010, radius: 600, day: 4, romanName: null },
  corbridge:    { id: 'corbridge',    name: 'Corbridge',         lat: 54.9720, lng: -2.0190, radius: 400, day: 5, romanName: 'Corstopitum' },
  wylam:        { id: 'wylam',        name: 'Wylam',             lat: 54.9740, lng: -1.8140, radius: 400, day: 5, romanName: null },
  newburn:      { id: 'newburn',      name: 'Newburn',           lat: 54.9800, lng: -1.7390, radius: 400, day: 6, romanName: null },
  wallsend:     { id: 'wallsend',     name: 'Wallsend',          lat: 54.9910, lng: -1.5310, radius: 600, day: 6, romanName: 'Segedunum' },
};

// ── QUESTION CATEGORIES ────────────────────────────────────────────

const CATEGORIES = {
  roman:       { id: 'roman',       label: 'Roman & Wall History', icon: '🏛️' },
  wildlife:    { id: 'wildlife',    label: 'Wildlife & Nature',    icon: '🦅' },
  architecture:{ id: 'architecture',label: 'Architecture & Local History', icon: '🏚️' },
  pubs:        { id: 'pubs',        label: 'Pubs, Food & Stops',  icon: '🍺' },
  dark_humour: { id: 'dark_humour', label: 'Dark Hiking Humour',  icon: '⚰️' },
  film_tv:     { id: 'film_tv',     label: 'Film & TV',           icon: '🎬' },
  music:       { id: 'music',       label: 'Music',               icon: '🎵' },
  science:     { id: 'science',     label: 'Science & Nature',    icon: '🔬' },
  literature:  { id: 'literature',  label: 'Literature & Mythology', icon: '📖' },
  geography:   { id: 'geography',   label: 'Geography',           icon: '🌍' },
  sport:       { id: 'sport',       label: 'Sport',               icon: '⚽' },
  pot_luck:    { id: 'pot_luck',    label: 'Pot Luck',            icon: '🧠' },
};

// ── QUESTION BANK ──────────────────────────────────────────────────
// Each question: { id, category, stop (optional), text, options (4), answer (index 0-3), fact }

const QUESTIONS = [
  // ── ROMAN & WALL HISTORY ──────────────────────────────────────
  { id: 'r01', category: 'roman', stop: null, text: 'How long is Hadrian\'s Wall?', options: ['53 miles', '63 miles', '73 miles', '83 miles'], answer: 2, fact: 'Exactly 80 Roman miles, coast to coast.' },
  { id: 'r02', category: 'roman', stop: null, text: 'In what year did Hadrian visit Britain and order the wall\'s construction?', options: ['112 AD', '117 AD', '122 AD', '128 AD'], answer: 2, fact: 'He visited in 122 AD. The wall took roughly 6 years to build.' },
  { id: 'r03', category: 'roman', stop: null, text: 'What did Roman soldiers use instead of toilet paper?', options: ['Leaves', 'A shared sponge on a stick', 'Sand', 'Wool scraps'], answer: 1, fact: 'The tersorium — shared between users, rinsed in a channel of running water.' },
  { id: 'r04', category: 'roman', stop: null, text: 'Where was Emperor Hadrian born?', options: ['Rome', 'Greece', 'Spain', 'North Africa'], answer: 2, fact: 'Born in Italica, modern-day Spain. One of the "Five Good Emperors."' },
  { id: 'r05', category: 'roman', stop: null, text: 'The wall was garrisoned not by legions but by what?', options: ['Gladiators', 'Auxiliary units', 'Slaves', 'Mercenaries'], answer: 1, fact: 'Non-citizen soldiers from across the empire: Batavians, Tungrians, Hamian archers, Dacians.' },
  { id: 'r06', category: 'roman', stop: null, text: 'Which Roman legion\'s mysterious disappearance inspired a famous novel?', options: ['Legio II Augusta', 'Legio IX Hispana', 'Legio VI Victrix', 'Legio XX Valeria Victrix'], answer: 1, fact: 'The Ninth Legion. Rosemary Sutcliff\'s "The Eagle of the Ninth."' },
  { id: 'r07', category: 'roman', stop: null, text: 'What was the Vallum?', options: ['A guard tower', 'A large ditch south of the wall', 'A Roman road', 'A temple'], answer: 1, fact: 'A massive ditch on the south side. Its exact purpose is still debated — possibly a customs boundary.' },
  { id: 'r08', category: 'roman', stop: null, text: 'How many milecastles were built along the wall?', options: ['40', '60', '80', '100'], answer: 2, fact: 'One every Roman mile — 80 in total. Two turrets between each pair.' },

  // ── STOP-SPECIFIC: BOWNESS ────────────────────────────────────
  { id: 'b01', category: 'roman', stop: 'bowness', text: 'What was the Roman name for the fort at Bowness-on-Solway?', options: ['Maia', 'Banna', 'Camboglanna', 'Aballava'], answer: 0, fact: 'Maia — one of the largest forts on the wall, garrisoned by ~1,000 troops.' },
  { id: 'b02', category: 'architecture', stop: 'bowness', text: 'The Roman frontier didn\'t stop at Bowness. How far did it continue south along the coast?', options: ['5 miles', '13 miles', '26 miles', '40 miles'], answer: 2, fact: 'A chain of milefortlets and towers continued at least 26 miles to Maryport.' },
  { id: 'b03', category: 'roman', stop: 'bowness', text: 'Which English king died near Bowness in 1307 while marching to fight Robert the Bruce?', options: ['Henry III', 'Edward I', 'Richard I', 'John'], answer: 1, fact: 'Edward I, "Hammer of the Scots", died at Burgh-by-Sands, just east of Bowness.' },

  // ── STOP-SPECIFIC: CARLISLE ───────────────────────────────────
  { id: 'c01', category: 'roman', stop: 'carlisle', text: 'The Roman name Luguvalium derives from which Celtic god?', options: ['Lugh', 'Lugus', 'Cernunnos', 'Taranis'], answer: 1, fact: 'Lugus — meaning "strong in Lugus." One of England\'s oldest continuously inhabited cities.' },
  { id: 'c02', category: 'architecture', stop: 'carlisle', text: 'How long has Carlisle Castle been in continuous military use?', options: ['500 years', '700 years', '800 years', '900+ years'], answer: 3, fact: 'Founded in 1092 by William Rufus. Garrisoned until 1959 — over 900 years.' },
  { id: 'c03', category: 'architecture', stop: 'carlisle', text: 'Which famous prisoner was held in Carlisle Castle in 1568?', options: ['Guy Fawkes', 'Walter Raleigh', 'Mary Queen of Scots', 'Bonnie Prince Charlie'], answer: 2, fact: 'She fled Scotland expecting Elizabeth I\'s help. Got 19 years of captivity instead.' },
  { id: 'c04', category: 'pot_luck', stop: 'carlisle', text: 'What is Carlisle\'s 14-ton granite artwork that locals blame for disasters?', options: ['The Cursing Stone', 'The Doom Rock', 'The Border Stone', 'The Plague Monument'], answer: 0, fact: 'Inscribed with a 1,069-word 16th-century curse against the Border Reivers. Blamed for floods and foot-and-mouth.' },

  // ── STOP-SPECIFIC: BANKS ──────────────────────────────────────
  { id: 'ba01', category: 'roman', stop: 'banks', text: 'Banks East Turret shows the transition from what to what in the wall\'s construction?', options: ['Wood to stone', 'Turf to stone', 'Brick to stone', 'Earth to turf'], answer: 1, fact: 'The original western section was turf, later rebuilt in stone. The transition is visible here.' },
  { id: 'ba02', category: 'architecture', stop: 'banks', text: 'Lanercost Priory near Banks was built using stone from where?', options: ['Local quarries', 'The Roman wall', 'Carlisle Castle', 'Scottish abbeys'], answer: 1, fact: 'Founded 1169, built extensively from robbed Roman wall stone. Roman-dressed stone is visible in the walls.' },

  // ── STOP-SPECIFIC: TWICE BREWED ───────────────────────────────
  { id: 'tb01', category: 'pubs', stop: 'twice_brewed', text: 'Why is the Twice Brewed Inn supposedly called "Twice Brewed"?', options: ['The water was filtered twice', 'General Wade demanded the ale be brewed twice for strength', 'Two breweries merged', 'It was rebuilt twice'], answer: 1, fact: 'General Wade wanted stronger ale for his soldiers. "Once Brewed" went to the weaker temperance inn nearby.' },
  { id: 'tb02', category: 'science', stop: 'twice_brewed', text: 'The dramatic crags in this area are formed from what geological feature?', options: ['Granite intrusion', 'The Whin Sill', 'Millstone Grit', 'Chalk escarpment'], answer: 1, fact: 'The Whin Sill — a dolerite intrusion that the Romans built along because of its natural defensive ridge.' },
  { id: 'tb03', category: 'roman', stop: 'twice_brewed', text: 'Milecastle 39 (Castle Nick) near here has a gate that was practically unusable. Why?', options: ['It was bricked up', 'It faced a cliff', 'It was on too steep a slope', 'It was underwater'], answer: 2, fact: 'Built to the standard pattern regardless of terrain. The north gate opens onto a slope too steep to use.' },

  // ── STOP-SPECIFIC: VINDOLANDA ─────────────────────────────────
  { id: 'v01', category: 'roman', stop: 'vindolanda', text: 'What are the Vindolanda tablets?', options: ['Stone inscriptions', 'Thin wooden writing tablets', 'Bronze plaques', 'Wax-sealed scrolls'], answer: 1, fact: 'Oldest surviving handwritten documents in Britain. Written in ink on birch/alder sheets, dating to ~85-130 AD.' },
  { id: 'v02', category: 'roman', stop: 'vindolanda', text: 'The most famous Vindolanda tablet is an invitation to what?', options: ['A military inspection', 'A birthday party', 'A religious ceremony', 'A feast'], answer: 1, fact: 'Claudia Severa inviting Sulpicia Lepidina to her birthday. Possibly the earliest known writing in Latin by a woman.' },
  { id: 'v03', category: 'roman', stop: 'vindolanda', text: 'What surprising item of clothing was requested in a Vindolanda supply tablet?', options: ['A toga', 'Underpants (subligaria)', 'A fur cloak', 'Sandals with spikes'], answer: 1, fact: 'Underpants, socks, and sandals — proof that Romans on the frontier needed warm underclothes.' },
  { id: 'v04', category: 'roman', stop: 'vindolanda', text: 'What unique Roman artefact was found at Vindolanda in 2017?', options: ['A gold ring', 'A leather boxing glove', 'A complete helmet', 'A wooden sword'], answer: 1, fact: 'The only known surviving Roman boxing glove. Leather, stuffed with natural material.' },
  { id: 'v05', category: 'roman', stop: 'vindolanda', text: 'Vindolanda was established how many years before Hadrian\'s Wall?', options: ['10 years', '20 years', '40 years', '60 years'], answer: 2, fact: 'The fort dates to ~85 AD, nearly 40 years before the wall. It went through at least 9 building phases.' },

  // ── STOP-SPECIFIC: HOUSESTEADS ────────────────────────────────
  { id: 'h01', category: 'roman', stop: 'housesteads', text: 'What grisly discovery was made under a building floor at Housesteads?', options: ['A treasure hoard', 'Two skeletons, one with a knife in its ribs', 'A sacrificial altar', 'A sealed chamber of grain'], answer: 1, fact: 'A genuine Roman cold case. The knife blade was still embedded between the ribs.' },
  { id: 'h02', category: 'roman', stop: 'housesteads', text: 'What does "Vercovicium" mean?', options: ['Eagle\'s nest', 'The place of effective fighters', 'High fortress', 'Stone house'], answer: 1, fact: 'Though scholars debate — some say "hilly place." Units included the First Cohort of Tungrians from Belgium.' },
  { id: 'h03', category: 'architecture', stop: 'housesteads', text: 'In the 17th-18th century, who used Housesteads ruins as a base?', options: ['Monks', 'Smugglers', 'The Armstrong reivers', 'Jacobite rebels'], answer: 2, fact: 'The Armstrong family of border reivers used the Roman fort as a den for cattle rustling.' },

  // ── STOP-SPECIFIC: CHOLLERFORD ────────────────────────────────
  { id: 'ch01', category: 'roman', stop: 'chollerford', text: 'Chesters Roman Fort at Chollerford was what kind of fort?', options: ['Infantry', 'Cavalry', 'Naval', 'Artillery'], answer: 1, fact: 'Best-preserved Roman cavalry fort in Britain. Held a 500-strong unit.' },
  { id: 'ch02', category: 'architecture', stop: 'chollerford', text: 'Who saved the wall by buying up farms to stop stone-robbing?', options: ['Lord Armstrong', 'John Clayton', 'William Morris', 'The National Trust'], answer: 1, fact: 'John Clayton (1792–1890), Town Clerk of Newcastle. Spent decades buying farms. Without him, far less would survive.' },

  // ── STOP-SPECIFIC: HEXHAM ─────────────────────────────────────
  { id: 'hx01', category: 'architecture', stop: 'hexham', text: 'Hexham Abbey was founded in 674 AD using stone robbed from where?', options: ['The Roman wall', 'Corbridge Roman town', 'Carlisle Castle', 'Local quarries'], answer: 1, fact: 'St Wilfrid built it with Roman stone from Corbridge. Roman inscribed stones are visible in the crypt walls.' },
  { id: 'hx02', category: 'pot_luck', stop: 'hexham', text: 'The 1972 "Hexham Heads" caused reports of what supernatural phenomenon?', options: ['Ghost lights', 'A werewolf figure', 'Poltergeist activity', 'Both B and C'], answer: 3, fact: 'Two small stone heads found in a garden. A dark "werewolf" figure was reportedly seen. Their origin is still disputed.' },
  { id: 'hx03', category: 'architecture', stop: 'hexham', text: 'Hexham Old Gaol (1330) claims to be what first in England?', options: ['First courthouse', 'First purpose-built prison', 'First police station', 'First toll house'], answer: 1, fact: 'Built by the Archbishop of York. Now a museum.' },
  { id: 'hx04', category: 'architecture', stop: 'hexham', text: 'The Battle of Hexham (1464) was part of which conflict?', options: ['English Civil War', 'Jacobite Rising', 'Wars of the Roses', 'Border Wars'], answer: 2, fact: 'Lancastrian forces routed by Yorkists. The Duke of Somerset was captured and beheaded.' },

  // ── STOP-SPECIFIC: CORBRIDGE ──────────────────────────────────
  { id: 'co01', category: 'roman', stop: 'corbridge', text: 'The Corbridge Hoard contains the earliest known surviving set of what?', options: ['Roman coins', 'Roman armour (lorica segmentata)', 'Roman medical instruments', 'Roman glass'], answer: 1, fact: 'Discovered in 1964. The famous banded plate armour, plus tools and fittings. 2nd century.' },
  { id: 'co02', category: 'roman', stop: 'corbridge', text: 'The Corbridge Lion sculpture shows a lion doing what?', options: ['Sleeping', 'Roaring', 'Mauling a stag', 'Guarding a gate'], answer: 2, fact: 'Probably a tombstone or fountain decoration. One of the finest pieces of Romano-British sculpture.' },

  // ── STOP-SPECIFIC: WYLAM ──────────────────────────────────────
  { id: 'w01', category: 'science', stop: 'wylam', text: 'Which "Father of Railways" was born in Wylam in 1781?', options: ['Isambard Kingdom Brunel', 'George Stephenson', 'Richard Trevithick', 'Robert Stephenson'], answer: 1, fact: 'His cottage (now National Trust) is the most important birthplace in railway history.' },
  { id: 'w02', category: 'science', stop: 'wylam', text: 'What is the oldest surviving steam locomotive, built at Wylam?', options: ['The Rocket', 'Locomotion No. 1', 'Puffing Billy', 'Catch Me Who Can'], answer: 2, fact: 'Built 1813-14 by William Hedley. Now in the Science Museum, London.' },
  { id: 'w03', category: 'geography', stop: 'wylam', text: 'Wylam sits at what significant point on the River Tyne?', options: ['The deepest point', 'The tidal limit', 'The narrowest crossing', 'The confluence'], answer: 1, fact: 'The furthest point that the tide reaches. Gave it strategic importance for river trade.' },

  // ── STOP-SPECIFIC: NEWBURN ────────────────────────────────────
  { id: 'n01', category: 'architecture', stop: 'newburn', text: 'The 1640 Battle of Newburn Ford helped cause which major conflict?', options: ['The Hundred Years War', 'The English Civil War', 'The Jacobite Rising', 'The Wars of the Roses'], answer: 1, fact: 'Scottish Covenanters routed English Royalists, forcing Charles I to recall Parliament after 11 years. Led directly to the Civil War.' },

  // ── STOP-SPECIFIC: WALLSEND ───────────────────────────────────
  { id: 'ws01', category: 'roman', stop: 'wallsend', text: 'What does "Segedunum" mean?', options: ['Wall\'s end', 'Strong fort', 'East gate', 'River crossing'], answer: 1, fact: 'The easternmost fort. The town name "Wallsend" literally tells you what it is.' },
  { id: 'ws02', category: 'pot_luck', stop: 'wallsend', text: 'Which ship that rescued Titanic survivors was built at Wallsend?', options: ['RMS Olympic', 'RMS Carpathia', 'HMS Dreadnought', 'SS Californian'], answer: 1, fact: 'Built at Swan Hunter shipyard, 1903. Also built the Mauretania.' },
  { id: 'ws03', category: 'music', stop: 'wallsend', text: 'Which musician was born in Wallsend in 1951?', options: ['Mark Knopfler', 'Sting', 'Brian Johnson', 'Jimmy Nail'], answer: 1, fact: 'Gordon Sumner, aka Sting. His working-class shipbuilding upbringing informed his music.' },

  // ── WILDLIFE & NATURE (general) ───────────────────────────────
  { id: 'wl01', category: 'wildlife', stop: null, text: 'Which bird endemic only to the British Isles might you see on the moorland?', options: ['Ptarmigan', 'Red grouse', 'Capercaillie', 'Scottish crossbill'], answer: 1, fact: 'Found nowhere else on Earth, though closely related to the willow grouse.' },
  { id: 'wl02', category: 'wildlife', stop: null, text: 'What is the fastest animal on Earth, and breeds on the Whin Sill crags?', options: ['Golden eagle', 'Peregrine falcon', 'Goshawk', 'Hobby'], answer: 1, fact: 'Recorded at 242 mph in a hunting stoop. Breeds on the crags in late April.' },
  { id: 'wl03', category: 'wildlife', stop: null, text: 'What is the UK\'s only aquatic songbird, found on the Tyne?', options: ['Kingfisher', 'Dipper', 'Grey wagtail', 'Sand martin'], answer: 1, fact: 'Walks underwater along the riverbed, using its wings to "fly" against the current.' },
  { id: 'wl04', category: 'wildlife', stop: null, text: 'Kestrels can see something invisible to humans that helps them hunt. What?', options: ['Infrared heat', 'Ultraviolet light', 'Magnetic fields', 'Sound waves'], answer: 1, fact: 'Vole urine trails glow in UV. Kestrels literally see a "motorway map" of vole activity.' },
  { id: 'wl05', category: 'wildlife', stop: null, text: 'The word "butterfly" may derive from which species?', options: ['Painted Lady', 'Brimstone', 'Red Admiral', 'Cabbage White'], answer: 1, fact: '"Butter-coloured fly." The brimstone is also one of the longest-lived UK butterflies — up to 13 months.' },
  { id: 'wl06', category: 'wildlife', stop: null, text: 'Northumberland is one of England\'s strongholds for which beloved mammal?', options: ['Pine marten', 'Red squirrel', 'Water vole', 'Dormouse'], answer: 1, fact: 'The Tyne valley woodlands support good populations. The "Saving Red Squirrels" programme is active here.' },
  { id: 'wl07', category: 'wildlife', stop: null, text: 'What name does the wheatear\'s name derive from?', options: ['Wheat field', 'White arse', 'Weather ear', 'Wheat eater'], answer: 1, fact: 'A corruption of "white arse" — referring to its white rump. Migrates from sub-Saharan Africa to breed.' },
  { id: 'wl08', category: 'wildlife', stop: null, text: 'How far does a wood anemone spread per century through its roots?', options: ['6 inches', '6 feet', '60 feet', '600 feet'], answer: 1, fact: 'A large patch of wood anemones indicates ancient woodland.' },
  { id: 'wl09', category: 'wildlife', stop: null, text: 'Which wildflower has over 70 folk names including "eggs and bacon" and "granny\'s toenails"?', options: ['Buttercup', 'Bird\'s-foot trefoil', 'Dandelion', 'Clover'], answer: 1, fact: 'More folk names than almost any other British plant. Also called "devil\'s fingers."' },
  { id: 'wl10', category: 'wildlife', stop: null, text: 'The pheasant was probably introduced to Britain by which people?', options: ['Vikings', 'Romans', 'Saxons', 'Celts'], answer: 1, fact: 'Historically appropriate for Hadrian\'s Wall — they may have walked these same paths.' },

  // ── SYCAMORE GAP SPECIAL ──────────────────────────────────────
  { id: 'sg01', category: 'architecture', stop: 'housesteads', text: 'What happened to the famous Sycamore Gap tree in September 2023?', options: ['Struck by lightning', 'Deliberately felled with a chainsaw', 'Died of disease', 'Blown down in a storm'], answer: 1, fact: 'A 16-year-old felled it overnight. It was ~200 years old and featured in Robin Hood: Prince of Thieves (1991).' },

  // ── DARK HIKING HUMOUR ────────────────────────────────────────
  { id: 'dh01', category: 'dark_humour', stop: null, text: 'What is the technical term for blisters caused by wet socks and prolonged walking?', options: ['Trench foot', 'Maceration', 'Hyperhydrosis', 'Pedal erosion'], answer: 1, fact: 'Skin maceration. Prevention: change socks. Treatment: accept your new life.' },
  { id: 'dh02', category: 'dark_humour', stop: null, text: 'How many calories does walking 15 miles over rough terrain burn?', options: ['1,000', '1,500', '2,000', '2,500+'], answer: 3, fact: 'Easily 2,500+ with a pack on hilly terrain. That\'s about 5 pints of ale. Medical advice.' },
  { id: 'dh03', category: 'dark_humour', stop: null, text: 'The UK\'s only venomous snake is the adder. When was the last fatal bite?', options: ['1925', '1955', '1975', '2005'], answer: 2, fact: 'Last UK death was 1975. You are more likely to be killed by a cow. Significantly more likely.' },
  { id: 'dh04', category: 'dark_humour', stop: null, text: 'Bear Grylls recommends filling a dead snake with urine as an emergency canteen. The correct response is?', options: ['Do it immediately', 'Only if the snake is venomous', 'Find literally any other option', 'Ask Ray Mears'], answer: 2, fact: 'Ray would like you to know there is a stream four metres to your left.' },
  { id: 'dh05', category: 'dark_humour', stop: null, text: 'What percentage of Hadrian\'s Wall walkers report knee pain by day 3?', options: ['25%', '50%', '75%', 'All of them, they just won\'t admit it'], answer: 3, fact: 'Not a real statistic but empirically validated by everyone who has ever done it.' },

  // ── GEOGRAPHY ─────────────────────────────────────────────────
  { id: 'g01', category: 'geography', stop: null, text: 'The Solway Firth at Bowness separates England from which country?', options: ['Wales', 'Scotland', 'Ireland', 'Isle of Man'], answer: 1, fact: 'At low tide you can walk across — exactly why the Romans needed to defend it.' },
  { id: 'g02', category: 'geography', stop: null, text: 'The Whin Sill is a geological formation of what rock type?', options: ['Granite', 'Basalt', 'Dolerite', 'Sandstone'], answer: 2, fact: 'An igneous intrusion that creates the dramatic crags. The Romans built along it for natural defence.' },
  { id: 'g03', category: 'geography', stop: null, text: 'What percentage of the world\'s heather moorland is in Britain?', options: ['25%', '50%', '75%', '90%'], answer: 2, fact: 'Heather moorland is a globally rare habitat. You\'re walking through one of the most significant stretches.' },

  // ── FILM & TV ─────────────────────────────────────────────────
  { id: 'ft01', category: 'film_tv', stop: null, text: 'Which 1991 film featured the Sycamore Gap tree?', options: ['Braveheart', 'Robin Hood: Prince of Thieves', 'First Knight', 'Gladiator'], answer: 1, fact: 'Kevin Costner stood here. The tree is now a stump but the gap remains.' },
  { id: 'ft02', category: 'film_tv', stop: null, text: 'Game of Thrones\' "The Wall" was partly inspired by Hadrian\'s Wall. George R.R. Martin visited and said what?', options: ['"I stood on the wall and tried to imagine..."', '"It was smaller than I expected"', '"I looked north and imagined wildlings"', '"The wind alone would kill you"'], answer: 0, fact: 'He stood on the wall and tried to imagine being a Roman soldier, looking north into the unknown.' },

  // ── MUSIC ─────────────────────────────────────────────────────
  { id: 'm01', category: 'music', stop: null, text: 'Which band from Newcastle had a number one with "Don\'t You (Forget About Me)"?', options: ['Dire Straits', 'Simple Minds', 'The Animals', 'Prefab Sprout'], answer: 1, fact: 'Simple Minds are actually from Glasgow, not Newcastle. Trick question. The Animals are the Newcastle band.' },
  { id: 'm02', category: 'music', stop: null, text: 'Mark Knopfler is from Newcastle. What did Dire Straits\' first album cost to record?', options: ['£5,000', '£12,500', '£25,000', '£50,000'], answer: 1, fact: 'Recorded in 12 days at Basing Street Studios. Sold 15 million copies.' },

  // ── SPORT ─────────────────────────────────────────────────────
  { id: 'sp01', category: 'sport', stop: null, text: 'When did Newcastle United last win the league?', options: ['1927', '1952', '1957', '1969'], answer: 2, fact: '1956-57 season. It\'s been a while. Don\'t bring this up in a Newcastle pub.' },
  { id: 'sp02', category: 'sport', stop: null, text: 'Hexham Racecourse claims to be what?', options: ['The smallest in England', 'The most northern in England', 'The oldest in England', 'The steepest in England'], answer: 1, fact: 'The most northern racecourse in England. Views extend to the Cheviots.' },

  // ── LITERATURE & MYTHOLOGY ────────────────────────────────────
  { id: 'l01', category: 'literature', stop: null, text: 'Rosemary Sutcliff\'s "The Eagle of the Ninth" is set around which real mystery?', options: ['Boudicca\'s revolt', 'The disappearance of the Ninth Legion', 'The building of Hadrian\'s Wall', 'The fall of Roman Britain'], answer: 1, fact: 'Legio IX Hispana vanished from records around 120 AD. Nobody knows what happened to them.' },
  { id: 'l02', category: 'literature', stop: null, text: 'Which Romantic poet\'s favourite flower was the lesser celandine?', options: ['Keats', 'Shelley', 'Wordsworth', 'Byron'], answer: 2, fact: 'He asked for it carved on his tombstone. The sculptor carved the wrong species.' },

  // ── SCIENCE ───────────────────────────────────────────────────
  { id: 'sc01', category: 'science', stop: null, text: 'Bumblebees can fly at altitudes above what height?', options: ['10,000 feet', '18,000 feet', '25,000 feet', '29,000 feet'], answer: 3, fact: 'Higher than Everest. Tested in a pressure chamber. Their flight mechanics don\'t care about thin air.' },
  { id: 'sc02', category: 'science', stop: null, text: 'Swifts can stay airborne continuously for how long?', options: ['1 month', '3 months', '6 months', '10 months'], answer: 3, fact: 'Eating, sleeping, and mating on the wing. They only land to nest.' },
  { id: 'sc03', category: 'science', stop: null, text: 'An English oak tree supports how many species of insects, lichens and fungi?', options: ['500+', '1,000+', '2,300+', '5,000+'], answer: 2, fact: 'More than any other native British tree.' },

  // ── PUBS, FOOD & STOPS ────────────────────────────────────────
  { id: 'p01', category: 'pubs', stop: 'twice_brewed', text: 'Lady Trevelyan established a temperance inn near Twice Brewed. What made it different?', options: ['No music', 'Weak or no alcohol beer', 'Vegetarian only', 'No card games'], answer: 1, fact: 'Beer "once brewed" — in contrast to the full-strength Twice Brewed. Hence the name "Once Brewed."' },
  { id: 'p02', category: 'pubs', stop: null, text: 'Walking 15 miles entitles you to approximately how many pies?', options: ['1', '2', '3', 'As many as you can carry'], answer: 3, fact: 'This is not medical advice. This is moral advice.' },

  // ── POT LUCK ──────────────────────────────────────────────────
  { id: 'pl01', category: 'pot_luck', stop: null, text: 'The word "gin" comes from the Dutch "jenever" meaning what?', options: ['Berry', 'Juniper', 'Spirit', 'Pine'], answer: 1, fact: 'Juniper is one of only three native British conifers. You can find it on the limestone crags along the wall.' },
  { id: 'pl02', category: 'pot_luck', stop: null, text: 'Jackdaws have been observed doing what, previously thought unique to primates?', options: ['Using tools', 'Consoling their partner after conflict', 'Teaching their young', 'Counting'], answer: 1, fact: 'They mate for life. After a fight, they comfort each other. Better than most humans.' },

  // ── BATCH 2: WEIRD, DARK, CRUDE, BEDE ─────────────────────────
  // Reivers
  { id: 'rv01', category: 'architecture', stop: null, text: 'The English word "blackmail" originated from which group in this area?', options: ['Viking raiders', 'Border Reivers', 'Roman tax collectors', 'Scottish clans'], answer: 1, fact: '"Black mail" was protection money. "Mail" = rent. The Reivers literally invented the concept.' },
  { id: 'rv02', category: 'architecture', stop: null, text: 'The Kerr reiver family built their spiral staircases differently from everyone else. Why?', options: ['They were shorter', 'They were left-handed', 'They used stolen stone', 'Religious reasons'], answer: 1, fact: 'Staircases turned the opposite way to give left-handed swordsmen an advantage. "Ker-handed" may derive from them.' },
  { id: 'rv03', category: 'dark_humour', stop: null, text: 'What was "The Hot Trod"?', options: ['A spicy pub meal', 'Legitimate pursuit of cattle thieves across the border with a burning peat on your lance', 'A Roman punishment for desertion', 'A Viking torture method'], answer: 1, fact: 'The burning peat signified legitimate pursuit. If the trail went cold, you could demand the other side\'s warden return your goods.' },
  { id: 'rv04', category: 'architecture', stop: 'housesteads', text: 'The "Busy Gap Rogues" were notorious criminals based near Housesteads. What were they?', options: ['Smugglers', 'Cattle rustlers', 'Highwaymen', 'Counterfeiters'], answer: 1, fact: 'So infamous they had their own name. Operated from the Roman ruins until the late 17th century.' },
  { id: 'rv05', category: 'pot_luck', stop: null, text: 'The English word "bereaved" comes from which activity?', options: ['Mourning rituals', 'Border reiving (robbery)', 'Anglo-Saxon burial customs', 'Viking funerals'], answer: 1, fact: 'To be "bereaved" was to have been "reived" — robbed of everything. Including sometimes your life.' },

  // Crude Roman
  { id: 'cr01', category: 'roman', stop: 'vindolanda', text: 'How many phallic carvings have been found at Vindolanda alone?', options: ['3', '7', '13+', '25+'], answer: 2, fact: '13+ and only a quarter of the site has been excavated. They were good luck charms, not smut.' },
  { id: 'cr02', category: 'roman', stop: null, text: 'What did Roman fullers (clothes cleaners) use to clean fabric?', options: ['Lye soap', 'Fermented urine trodden by slaves', 'Ash and water', 'Olive oil'], answer: 1, fact: 'Slaves trod cloth by foot in vats of stale, fermented urine. The ammonia was the cleaning agent.' },
  { id: 'cr03', category: 'dark_humour', stop: null, text: 'In 2022, a stone was found at Vindolanda inscribed "SECVNDIVS CACOR." What does it mean?', options: ['Secundius the brave', 'Secundius was here', 'Secundius the shitter', 'Secundius loves Julia'], answer: 2, fact: 'Someone took considerable time to carefully carve each letter. Confident enough to announce their opinion in permanent stone.' },
  { id: 'cr04', category: 'roman', stop: null, text: 'Victorian archaeologists who excavated the Wall found so many phallic carvings that they...?', options: ['Published them immediately', 'Turned the stones around to hide them', 'Destroyed them', 'Sent them to the British Museum in sealed boxes'], answer: 1, fact: 'Some stones were deliberately turned face-inward. The Victorians were more embarrassed than the Romans.' },
  { id: 'cr05', category: 'roman', stop: null, text: 'What percentage of the Vindolanda garrison was fit for active duty according to their own records?', options: ['55%', '45%', '35%', '25%'], answer: 2, fact: '265 out of 752. The rest were sick, on leave, or seconded. 10 had conjunctivitis. The mightiest army in history.' },

  // Hadrian scandals
  { id: 'ha01', category: 'roman', stop: null, text: 'Why was Hadrian\'s public grief for Antinous considered scandalous by the Roman Senate?', options: ['Male lovers were illegal', 'He made Antinous a god', 'He "wept like a woman" — showing grief was considered unmanly', 'All of the above except A'], answer: 3, fact: 'Male lovers were fine in Rome. The scandal was the DEPTH of feeling — making a lover a god, building a city, weeping publicly.' },
  { id: 'ha02', category: 'dark_humour', stop: null, text: 'When Hadrian asked his doctor for poison to end his life, the doctor...?', options: ['Provided it reluctantly', 'Refused and reported him', 'Killed himself rather than provide it', 'Gave him a sleeping draught instead'], answer: 2, fact: 'The doctor killed HIMSELF to avoid the impossible choice. Hadrian\'s servant also refused to stab him. A barbarian named Mastor also said no.' },
  { id: 'ha03', category: 'roman', stop: null, text: 'Architect Apollodorus insulted Hadrian\'s drawings by telling him to "be off and draw your..." what?', options: ['Circles', 'Gourds', 'Flowers', 'Baths'], answer: 1, fact: 'A sarcastic reference to dome designs Hadrian liked. Hadrian allegedly had him exiled and executed later. Never insult an emperor\'s art.' },
  { id: 'ha04', category: 'roman', stop: null, text: 'Why was Hadrian the first Roman emperor to wear a beard?', options: ['Greek fashion', 'To cover facial blemishes', 'Religious reasons', 'Military tradition'], answer: 1, fact: 'Natural blemishes on his face. Started an imperial fashion that lasted centuries. Previously all emperors were clean-shaven.' },

  // Bede
  { id: 'bd01', category: 'literature', stop: null, text: 'The Venerable Bede attributed Hadrian\'s Wall to which emperor?', options: ['Hadrian', 'Severus', 'Trajan', 'Augustus'], answer: 1, fact: 'The Father of English History got the builder of England\'s most famous Roman monument wrong. Working from dodgy sources.' },
  { id: 'bd02', category: 'literature', stop: null, text: 'How old was Bede when he entered the monastery?', options: ['5', '7', '12', '16'], answer: 1, fact: 'Seven. He never left Northumbria. Wrote 40 books. Corrected Pliny. Invented the calendar. Never saw Rome.' },
  { id: 'bd03', category: 'literature', stop: null, text: 'What were Bede\'s actual last words?', options: ['"God forgive me"', '"It is finished. You have spoken truly — it is well finished."', '"Tell them I tried"', '"More wine"'], answer: 1, fact: 'He was completing a translation. His scribe said "there is still one sentence." Bede: "Quick, write it down." Then he died.' },
  { id: 'bd04', category: 'pot_luck', stop: null, text: 'According to legend, who inscribed "VENERABILIS" on Bede\'s tombstone?', options: ['His students', 'The Pope', 'An angel', 'King Ceolwulf'], answer: 2, fact: 'A monk couldn\'t find the right word and went to bed. An angel supposedly completed the inscription overnight. No early authority for this.' },
  { id: 'bd05', category: 'dark_humour', stop: null, text: 'What happened to Bede\'s bones after his death?', options: ['Buried at Jarrow permanently', 'Stolen by a monk and hidden inside St Cuthbert\'s coffin', 'Sent to Rome', 'Lost in a Viking raid'], answer: 1, fact: 'Monk Alfred Westou stole them around 1020 and hid them in a linen bag inside St Cuthbert\'s coffin at Durham.' },
  { id: 'bd06', category: 'literature', stop: null, text: 'Bede described the Picts and Scots as "like..." what?', options: ['Wolves among sheep', 'Worms coming from their holes in the heat of mid-day', 'Locusts upon the land', 'Rats from a sinking ship'], answer: 1, fact: 'Not exactly neutral journalism. But vivid writing.' },
  { id: 'bd07', category: 'pubs', stop: null, text: 'What was Bede\'s daily wine ration under the Benedictine Rule?', options: ['None — monks abstained', 'A small cup', 'Half a bottle', 'A full bottle'], answer: 2, fact: 'Half a bottle per day. Plus ale. Bede was not a teetotaller. "One is allowed a measure of wine."' },

  // Newcastle & Tyneside
  { id: 'nc01', category: 'dark_humour', stop: null, text: 'In 1649-50, how were witches identified in Newcastle?', options: ['Dunking in water', 'A hired "witch pricker" who stabbed them with a pin', 'Trial by fire', 'Reading their palms'], answer: 1, fact: 'If you didn\'t bleed or cry out when stabbed, you were guilty. 15 hanged in a single day. The pricker eventually fled.' },
  { id: 'nc02', category: 'architecture', stop: 'wallsend', text: 'Which ship that rescued Titanic survivors was built at Wallsend?', options: ['RMS Olympic', 'RMS Carpathia', 'HMS Dreadnought', 'SS Great Eastern'], answer: 1, fact: 'Built at Swan Hunter shipyard, 1903. They also built the Mauretania.' },
  { id: 'nc03', category: 'dark_humour', stop: null, text: 'In 1964, the killers of Jack West near Workington became the last people in England to be...?', options: ['Publicly flogged', 'Lawfully hanged', 'Deported to Australia', 'Put in stocks'], answer: 1, fact: 'The last two men lawfully hanged in England. The death penalty was abolished the following year.' },

  // Weird & wonderful
  { id: 'ww01', category: 'pot_luck', stop: null, text: 'In 2023, DNA analysis confirmed what animal had been feeding on a sheep carcass in Cumbria?', options: ['A wolf', 'A leopard or jaguar', 'A lynx', 'A wild boar'], answer: 1, fact: 'University of Warwick analysis: Panthera genus. Actual scientific evidence of a big cat in Cumbria.' },
  { id: 'ww02', category: 'pot_luck', stop: null, text: 'How many times did Anne Woods win the World Gurning Championship at Egremont Crab Fair?', options: ['12', '19', '27', '34'], answer: 2, fact: 'Twenty-seven times. Through a horse collar. At a fair that\'s been running since 1267.' },
  { id: 'ww03', category: 'pot_luck', stop: null, text: 'What creature allegedly flew out of Renwick church when it was demolished?', options: ['A giant bat', 'A dragon', 'A cockatrice', 'An owl the size of a man'], answer: 2, fact: 'Scaly body, leathery wings. John Tallentire killed it with a rowan bough. His family was exempted from church tithes forever.' },
  { id: 'ww04', category: 'pot_luck', stop: null, text: 'What have escaped from multiple locations in Northumberland, causing local alarm?', options: ['Wolves', 'Wallabies', 'Ostriches', 'Llamas'], answer: 1, fact: 'Hopper from Kielder (2009), three from Belford (2007), Choppy caught in Chopwell streets. Northumberland has a wallaby problem.' },
  { id: 'ww05', category: 'geography', stop: null, text: 'Haltwhistle claims to be what?', options: ['The coldest town in England', 'The exact centre of Britain', 'The highest town on the Wall', 'The oldest continuously inhabited town'], answer: 1, fact: 'Disputed by Dunsop Bridge in Lancashire. The claim requires Orkney (not Shetland) as the northern extremity. Has a "Centre of Britain Hotel."' },
  { id: 'ww06', category: 'dark_humour', stop: null, text: 'What keeps getting stolen from Winter\'s Gibbet near Elsdon?', options: ['The iron chains', 'The replica mannequin head', 'The information plaque', 'The fence posts'], answer: 1, fact: 'William Winter was gibbed in 1791. The replica head on the gibbet keeps vanishing. The original gibbet stump still stands.' },
  { id: 'ww07', category: 'geography', stop: null, text: 'Which of these is NOT a real place name in Northumberland?', options: ['Cockplay', 'Bushygap', 'Wankworth', 'Flesh Shank'], answer: 2, fact: 'It\'s Warkworth, not Wankworth. But Cockplay, Bushygap, and Flesh Shank are all real. As are Nacker Hole and Old Man\'s Bottom.' },

  // Dark history
  { id: 'dk01', category: 'dark_humour', stop: 'carlisle', text: 'The "Licking Stones" in Carlisle Castle dungeon are worn smooth. Why?', options: ['Prisoners rubbed them for good luck', 'Prisoners licked them for moisture', 'Guards sharpened knives on them', 'Rain erosion over centuries'], answer: 1, fact: 'Desperate prisoners in the dungeon licked the stones for water. The tongue marks are still visible. Three hundred years of thirst.' },
  { id: 'dk02', category: 'dark_humour', stop: null, text: 'What was "baunchling" in Border Reiver culture?', options: ['A type of raid', 'Ritual humiliation — your glove held on a lance as a "false hand"', 'A greeting between rival families', 'A cattle branding technique'], answer: 1, fact: 'Public shame for cowards and liars. Your glove displayed as a "false hand" for all to see.' },
  { id: 'dk03', category: 'architecture', stop: null, text: 'Chillingham Castle near the Wall route found what behind a wall during renovations?', options: ['A treasure hoard', 'A child\'s skeleton (the "Blue Boy")', 'A Roman altar', 'A sealed room full of medieval graffiti'], answer: 1, fact: 'The Blue Boy — a child bricked up in the wall. His ghost was reported for years before the skeleton was found.' },
  { id: 'dk04', category: 'literature', stop: null, text: 'William of Newburgh chronicled the Alnwick Castle vampire in the 12th century. How was it stopped?', options: ['A priest performed an exorcism', 'The body was dug up, dismembered, and burned', 'It was trapped in a church', 'Holy water was poured on the grave'], answer: 1, fact: 'The revenant prowled the streets and its stench caused plague. The townspeople dug it up and burned it. The plague stopped. Predates Dracula by centuries.' },

  // Sport
  { id: 'sp03', category: 'sport', stop: null, text: 'What sport originated with the Border Reivers and is still practised in Cumbria?', options: ['Fell running', 'Cumberland wrestling', 'Shin kicking', 'Hound trailing'], answer: 1, fact: 'Norse-Irish origin (10th century). Wrestlers lock hands behind opponent\'s back ("takin\' hod"). Object: throw them face-up.' },
  { id: 'sp04', category: 'sport', stop: null, text: 'The Egremont Crab Fair has held its most famous competition since 1267. What is it?', options: ['Apple bobbing', 'Gurning (pulling ugly faces through a horse collar)', 'Cheese rolling', 'Greasy pole climbing'], answer: 1, fact: 'The World Gurning Championship. The horse collar is called "braffin." Origin: townsfolk made the village idiot pull faces for ale.' },

  // Music & Film
  { id: 'ft03', category: 'film_tv', stop: null, text: 'In The Detectorists, what does Lance say about the Venerable Bede?', options: ['"Bede was right all along"', '"The Venerable Bede is talking out of his arsehole"', '"Bede would have loved detecting"', '"Bede probably buried something here"'], answer: 1, fact: 'Lance dismisses 1,300 years of scholarship because his metal detector says otherwise. This is the correct register.' },
  { id: 'ft04', category: 'music', stop: null, text: 'Which Wallsend-born musician\'s early life in a shipbuilding town informed his music?', options: ['Mark Knopfler', 'Sting', 'Brian Johnson', 'Eric Burdon'], answer: 1, fact: 'Gordon Sumner, aka Sting. Born 1951. Working-class Wallsend shaped everything.' },

  // Science
  { id: 'sc04', category: 'science', stop: null, text: 'In 2025, what was confirmed for the first time in Roman Britain through analysis of Vindolanda latrine drains?', options: ['Lead poisoning', 'Giardia parasites', 'Cholera bacteria', 'Tapeworm eggs'], answer: 1, fact: 'First confirmed archaeological evidence of Giardia duodenalis in Roman Britain. The communal sponge stick was a parasite superhighway.' },
  { id: 'sc05', category: 'science', stop: null, text: 'Bede corrected which classical authority on the behaviour of tides?', options: ['Aristotle', 'Ptolemy', 'Pliny', 'Galen'], answer: 2, fact: 'Used empirical observation from the Northumbrian coast. Demonstrated tides don\'t occur simultaneously everywhere. Remarkably modern methodology.' },
  { id: 'sc06', category: 'science', stop: null, text: 'Kielder Forest near the Wall holds what distinction for Dark Skies?', options: ['Darkest sky in Europe', 'Europe\'s largest Gold Tier Dark Sky Park', 'First UK Dark Sky Reserve', 'Site of most reported UFO sightings'], answer: 1, fact: '580 square miles. The darkest skies in England. Ironic backdrop for the numerous UFO sightings in the area.' },

  // ── BATCH 3: LOCAL SPORT ──────────────────────────────────────
  { id: 'sp05', category: 'sport', stop: null, text: 'Newcastle United\'s St James\' Park holds how many spectators?', options: ['42,000', '47,000', '52,000', '57,000'], answer: 2, fact: 'Around 52,300. The largest football stadium in the North East. Visible from the Wall path as you approach Wallsend.' },
  { id: 'sp06', category: 'sport', stop: null, text: 'Which Newcastle United manager gave the famous "I would love it" speech in 1996?', options: ['Bobby Robson', 'Kevin Keegan', 'Kenny Dalglish', 'Ruud Gullit'], answer: 1, fact: '"I would love it if we beat them. Love it." Newcastle then lost the league to Manchester United. The speech is more famous than any trophy.' },
  { id: 'sp07', category: 'sport', stop: null, text: 'Which Carlisle United goalkeeper scored a last-minute equaliser with a header in 1999?', options: ['Peter Schmeichel', 'Jimmy Glass', 'Neville Southall', 'David Seaman'], answer: 1, fact: 'Jimmy Glass. On loan. Last day of the season. Kept Carlisle in the Football League. One of football\'s greatest stories.' },
  { id: 'sp08', category: 'sport', stop: null, text: 'Hexham Racecourse claims to be the most what in England?', options: ['Northern', 'Scenic', 'Steep', 'Oldest'], answer: 0, fact: 'The most northerly racecourse in England. Views extend to the Cheviots and across the Tyne Valley.' },
  { id: 'sp09', category: 'sport', stop: null, text: 'Which sport invented by Vikings and still practised in Cumbria involves locking hands behind your opponent\'s back?', options: ['Shin kicking', 'Cumberland wrestling', 'Fell running', 'Highland games caber toss'], answer: 1, fact: 'Norse-Irish origin, 10th century. "Takin\' hod." Throw your opponent face-up. Still contested at shows across Cumbria.' },
  { id: 'sp10', category: 'sport', stop: null, text: 'In 2021, Newcastle United was bought by the sovereign wealth fund of which country?', options: ['UAE', 'Qatar', 'Saudi Arabia', 'Bahrain'], answer: 2, fact: 'The Saudi PIF. Made Newcastle the richest club in the world overnight. Divisive. Transformative. Still no league title since 1957.' },
  { id: 'sp11', category: 'sport', stop: null, text: 'Which legendary Northumberland cricketer took 7,000+ first-class wickets and shares a name with a type of hat?', options: ['W.G. Grace', 'Freddie Trueman', 'Steve Harmison', 'S.F. Barnes'], answer: 2, fact: 'Steve Harmison, from Ashington. England fast bowler. His first ball of the 2006-07 Ashes went to second slip. The most famous wide in cricket history.' },
  { id: 'sp12', category: 'sport', stop: null, text: 'Carlisle United were once relegated partly blamed on what supernatural object?', options: ['A cursed shirt', 'The Cursing Stone', 'A black cat mascot', 'An unlucky number 13 shirt'], answer: 1, fact: 'The 14-ton Cursing Stone installed in 2001. Carlisle United were relegated, the city flooded, and foot-and-mouth hit. Locals demanded its removal.' },

  // ── BATCH 4: FROM RESEARCH AGENT (non-duplicates) ─────────────
  { id: 'ra01', category: 'dark_humour', stop: null, text: 'Which Reiver family\'s motto was "Thou shalt want ere I want"?', options: ['Charlton', 'Armstrong', 'Nixon', 'Graham'], answer: 1, fact: 'At their peak the Armstrongs could field 3,000 mounted men — more than most Scottish nobles.' },
  { id: 'ra02', category: 'dark_humour', stop: 'carlisle', text: 'In 1596, Kinmont Willie Armstrong was rescued from Carlisle Castle by whom?', options: ['The English King', 'Walter Scott of Buccleuch in a daring raid', 'His own family', 'He escaped alone'], answer: 1, fact: 'The Scots Keeper broke into Carlisle Castle and freed him — humiliating Elizabeth I. One of the most famous Border raids.' },
  { id: 'ra03', category: 'roman', stop: 'vindolanda', text: 'A Vindolanda graffito reads "Austalis has been wandering off by himself every day for thirteen days." What is it?', options: ['A military order', 'Ancient workplace gossip snitching on a skiver', 'A religious observation', 'A weather record'], answer: 1, fact: 'Basically a Roman soldier grassing on his colleague for bunking off. Some things never change across 2,000 years.' },
  { id: 'ra04', category: 'roman', stop: 'vindolanda', text: 'Analysis of Roman fish sauce (garum) found at Vindolanda showed it was what quality?', options: ['Cheap local stuff', 'Premium grade from southern Spain', 'Homemade from Tyne salmon', 'Expired and rancid'], answer: 1, fact: 'Even on this remote frozen frontier, Roman officers demanded luxury fermented fish guts imported from the Mediterranean.' },
  { id: 'ra05', category: 'literature', stop: null, text: 'Bede calculated the age of the Earth. What happened when he published his figure?', options: ['He was praised', 'He was accused of heresy', 'He was ignored', 'He was promoted'], answer: 1, fact: 'He calculated 3,952 years from creation to Christ — shorter than the accepted figure. The church accused him of heresy for disagreeing.' },
  { id: 'ra06', category: 'literature', stop: null, text: 'What major problem did Bede\'s AD dating system create that still affects us?', options: ['Wrong start date', 'No year zero between 1 BC and AD 1', 'Wrong leap year calculation', 'Months in wrong order'], answer: 1, fact: 'He went from 1 BC straight to AD 1. No year zero. Astronomers and mathematicians have been swearing about this for 1,300 years.' },
  { id: 'ra07', category: 'architecture', stop: null, text: 'What is a "bastle house" found throughout the Wall corridor?', options: ['A Roman bathhouse ruin', 'A fortified farmhouse built to resist Reiver raids', 'A medieval tollbooth', 'A type of lime kiln'], answer: 1, fact: 'Thick stone walls, no ground-floor windows, animals downstairs, family upstairs during raids. Dozens survive along the Wall.' },
  { id: 'ra08', category: 'dark_humour', stop: null, text: 'The 1804 Felling Colliery disaster near Gateshead killed 92 men and boys. What did it lead to?', options: ['First miners\' union', 'The invention of the Davy safety lamp', 'Child labour ban in mines', 'First mine rescue team'], answer: 1, fact: 'The disaster prompted the safety lamp competition. Both Humphry Davy and George Stephenson developed versions independently.' },
  { id: 'ra09', category: 'architecture', stop: null, text: 'The Tyne Bridge (1928) was built by the same firm that later built which famous bridge?', options: ['Golden Gate Bridge', 'Sydney Harbour Bridge', 'Forth Road Bridge', 'Humber Bridge'], answer: 1, fact: 'Dorman Long built the Tyne Bridge first, then the Sydney Harbour Bridge (1932). The Tyne Bridge is the older sibling.' },
  { id: 'ra10', category: 'sport', stop: null, text: 'The "Blaydon Races" sung at every Newcastle match describes what?', options: ['A famous horse race victory', 'A chaotic trip to the races with fights and crashes', 'A medieval reiver horse raid', 'A pub drinking game'], answer: 1, fact: 'Written by Geordie Ridley in 1862. Describes a disastrous day out. Fights, crashes, chaos. Still sung at every Newcastle United match.' },
  { id: 'ra11', category: 'sport', stop: null, text: 'Jackie Milburn, Newcastle\'s legendary striker, was related to which famous footballers?', options: ['Alan Shearer and Peter Beardsley', 'Bobby and Jack Charlton', 'Paul Gascoigne and Chris Waddle', 'Michael Owen and Peter Beardsley'], answer: 1, fact: 'Bobby and Jack Charlton were his cousins. The Milburn family produced an extraordinary number of professional footballers.' },
  { id: 'ra12', category: 'pot_luck', stop: null, text: 'What is a "stottie cake"?', options: ['A fruit cake with suet', 'A large, flat, dense bread roll from the North East', 'An oatcake cooked on a griddle', 'A cake thrown at weddings'], answer: 1, fact: 'It "stotts" (bounces) when dropped. Foundation of a proper ham and pease pudding sandwich. Non-negotiable.' },
  { id: 'ra13', category: 'pot_luck', stop: null, text: 'The "Northumbrian burr" is a distinctive dialect feature. What is it?', options: ['A guttural ch sound', 'A uvular R sound produced in the back of the throat', 'A sing-song intonation', 'A dropped H'], answer: 1, fact: 'Like the French R, not the standard English tongue-tip R. One of the oldest surviving features of English dialect.' },
  { id: 'ra14', category: 'literature', stop: null, text: 'Bede\'s monastery at Jarrow produced the Codex Amiatinus. What is it?', options: ['The oldest English Bible', 'The oldest surviving complete Latin Bible', 'A book of Saxon law', 'A collection of Celtic prayers'], answer: 1, fact: 'The oldest surviving complete Latin Bible. Weighs 34kg. Required 515 calf skins. Made at Jarrow under Abbot Ceolfrith.' },
  { id: 'ra15', category: 'dark_humour', stop: null, text: 'The Newcastle witch-pricker of 1650 was eventually caught in Scotland. What happened?', options: ['He was pardoned', 'He confessed to being a fraud using retractable pins and was hanged', 'He escaped to France', 'He became a judge'], answer: 1, fact: 'He used retractable pins — the pins didn\'t actually penetrate. He was hanged. His Newcastle victims were already dead.' },
  { id: 'ra16', category: 'dark_humour', stop: 'corbridge', text: 'The Earl of Derwentwater was executed in 1716 near Corbridge. What legend grew from his death?', options: ['His ghost haunts Dilston Hall', 'The Northern Lights appeared that night in his honour', 'A spring of blood appeared', 'His horse refused to leave'], answer: 1, fact: 'James Radclyffe, beheaded on Tower Hill for the Jacobite Rising. Locals said the aurora borealis appeared as tribute. "Lord Derwentwater\'s Lights."' },
  { id: 'ra17', category: 'roman', stop: null, text: 'What did a Roman military diploma grant auxiliary soldiers after 25 years?', options: ['Promotion to centurion', 'Roman citizenship and the right to legal marriage', 'A plot of land in Italy', 'A pension of gold'], answer: 1, fact: 'A bronze tablet granting citizenship and "conubium" — legal marriage rights. After 25 years defending a Wall in Northumberland, you finally got paperwork.' },
  { id: 'ra18', category: 'pot_luck', stop: null, text: 'In 1977, what happened at RAF Boulmer on the Northumberland coast?', options: ['A plane crash', 'Unidentified objects tracked on radar over the North Sea', 'A military exercise went wrong', 'Lightning struck the control tower'], answer: 1, fact: 'The incident was classified for decades. Only emerged through Freedom of Information requests. Nobody has explained it.' },
  { id: 'ra19', category: 'dark_humour', stop: null, text: 'Being caught "red-handed" during a Border Reiver raid meant what?', options: ['A fine of ten cattle', 'Summary execution without trial', 'Public flogging', 'Transportation to Ireland'], answer: 1, fact: 'Caught with blood on your hands or "having the gear" = execution on the spot under Border Law. No trial needed.' },
  { id: 'ra20', category: 'dark_humour', stop: 'carlisle', text: 'What was the "Cumberland Arch" in Reiver culture?', options: ['A natural stone formation', 'The gallows at Carlisle', 'A defensive riding formation', 'The route over the Pennines'], answer: 1, fact: 'The gallows at Carlisle. A grim landmark that many Reivers came to know intimately at the end of a rope.' },
  { id: 'ra21', category: 'dark_humour', stop: null, text: 'What battle fought near Hadrian\'s Wall in 634 AD saw a king erect a wooden cross before fighting?', options: ['Battle of Brunanburh', 'Battle of Heavenfield', 'Battle of Nechtansmere', 'Battle of Chester'], answer: 1, fact: 'King Oswald of Northumbria at Heavenfield near Chollerford. He raised a cross and prayed, then defeated the Welsh king Cadwallon. The site became a pilgrimage spot.' },
];

// ── FLORA & FAUNA COLLECTION ───────────────────────────────────────
// Rarity tiers: common (bronze), uncommon (silver), rare (gold), legendary (platinum)

const COLLECTION_SPECIES = [
  // ── BIRDS ─────────────────────────────────────────────────────
  { id: 'curlew',        name: 'Curlew',            type: 'bird',      rarity: 'common',    fact: 'Europe\'s largest wader. Its bubbling call is the sound of the borders.' },
  { id: 'lapwing',       name: 'Lapwing',           type: 'bird',      rarity: 'common',    fact: 'Also called "peewit." Their eggs were a Victorian delicacy.' },
  { id: 'skylark',       name: 'Skylark',           type: 'bird',      rarity: 'common',    fact: 'Can sing non-stop for over an hour while hovering at 300+ feet.' },
  { id: 'swallow',       name: 'Swallow',           type: 'bird',      rarity: 'common',    fact: 'Migrates ~6,000 miles from South Africa. Returns to the same barn it was born in.' },
  { id: 'buzzard',       name: 'Buzzard',           type: 'bird',      rarity: 'common',    fact: 'Almost extinct in eastern England by the 1950s. One of the great recovery stories.' },
  { id: 'robin',         name: 'Robin',             type: 'bird',      rarity: 'common',    fact: 'One of very few UK birds that sings year-round, including at night under streetlights.' },
  { id: 'wren',          name: 'Wren',              type: 'bird',      rarity: 'common',    fact: 'The UK\'s most common breeding bird (~11 million territories) despite being one of the smallest.' },
  { id: 'pheasant',      name: 'Pheasant',          type: 'bird',      rarity: 'common',    fact: 'Introduced by the Romans (or Normans). Historically appropriate for this walk.' },
  { id: 'oystercatcher', name: 'Oystercatcher',     type: 'bird',      rarity: 'common',    fact: 'Despite the name, they rarely eat oysters — mainly cockles, mussels, and earthworms.' },
  { id: 'grey_heron',    name: 'Grey Heron',        type: 'bird',      rarity: 'common',    fact: 'Can stand motionless for over 30 minutes waiting for prey.' },
  { id: 'red_grouse',    name: 'Red Grouse',        type: 'bird',      rarity: 'uncommon',  fact: 'The only bird entirely endemic to the British Isles. Found nowhere else on Earth.' },
  { id: 'cuckoo',        name: 'Cuckoo',            type: 'bird',      rarity: 'uncommon',  fact: 'UK population down ~65% since the 1980s. Each female specialises in one host species.' },
  { id: 'dipper',        name: 'Dipper',            type: 'bird',      rarity: 'uncommon',  fact: 'The UK\'s only aquatic songbird. Walks underwater using its wings against the current.' },
  { id: 'wheatear',      name: 'Wheatear',          type: 'bird',      rarity: 'uncommon',  fact: 'Name means "white arse." Migrates from sub-Saharan Africa to breed on stone walls.' },
  { id: 'peregrine',     name: 'Peregrine Falcon',  type: 'bird',      rarity: 'uncommon',  fact: 'The fastest animal on Earth — 242 mph in a hunting stoop. Breeds on the Whin Sill crags.' },
  { id: 'barn_owl',      name: 'Barn Owl',          type: 'bird',      rarity: 'uncommon',  fact: 'Best hearing of any animal tested. Can catch prey in total darkness using sound alone.' },
  { id: 'short_eared_owl',name: 'Short-eared Owl',  type: 'bird',      rarity: 'uncommon',  fact: 'One of the few owls regularly active during the day. Moorland hunter.' },
  { id: 'kestrel',       name: 'Kestrel',           type: 'bird',      rarity: 'uncommon',  fact: 'Can see ultraviolet light. Vole urine trails glow in UV — a literal prey motorway map.' },
  { id: 'goosander',     name: 'Goosander',         type: 'bird',      rarity: 'uncommon',  fact: 'Serrated bill edges like a saw to grip slippery fish. A "sawbill" duck.' },
  { id: 'ring_ouzel',    name: 'Ring Ouzel',        type: 'bird',      rarity: 'rare',      fact: 'The mountain blackbird. Declining and very shy. A quality spot.' },
  { id: 'hen_harrier',   name: 'Hen Harrier',       type: 'bird',      rarity: 'rare',      fact: 'The "skydancer." Fewer than 1,000 UK breeding pairs. Heavily persecuted on grouse moors.' },
  { id: 'merlin',        name: 'Merlin',            type: 'bird',      rarity: 'rare',      fact: 'UK\'s smallest falcon. Named from French "esmerillon," not the wizard.' },
  { id: 'osprey',        name: 'Osprey',            type: 'bird',      rarity: 'rare',      fact: 'Catches fish by plunging feet-first. Reversible outer toes and spiny foot pads grip slippery fish.' },
  { id: 'black_grouse',  name: 'Black Grouse',      type: 'bird',      rarity: 'rare',      fact: 'Males gather at dawn lek sites, puffing white tail feathers. One of the UK\'s great wildlife experiences.' },
  { id: 'golden_eagle',  name: 'Golden Eagle',      type: 'bird',      rarity: 'legendary', fact: 'Not resident in Northumberland. Would be national news. Wingspan 2.2m. Can spot a rabbit from 2 miles.' },
  { id: 'sea_eagle',     name: 'White-tailed Eagle', type: 'bird',     rarity: 'legendary', fact: 'Britain\'s largest bird of prey — 2.4m wingspan. Called "the flying barn door." Reintroduction from IoW ongoing.' },

  // ── MAMMALS ───────────────────────────────────────────────────
  { id: 'rabbit',        name: 'Rabbit',            type: 'mammal',    rarity: 'common',    fact: 'Introduced by the Normans for fur and meat. Originally farmed, not wild.' },
  { id: 'brown_hare',    name: 'Brown Hare',        type: 'mammal',    rarity: 'uncommon',  fact: '"Boxing" hares are females fending off males, not males fighting each other.' },
  { id: 'red_squirrel',  name: 'Red Squirrel',      type: 'mammal',    rarity: 'uncommon',  fact: 'Northumberland is an English stronghold. Best bet: wooded areas near Chollerford.' },
  { id: 'roe_deer',      name: 'Roe Deer',          type: 'mammal',    rarity: 'uncommon',  fact: 'Northumberland\'s most common wild deer. Small, elegant, russet in spring coat.' },
  { id: 'stoat',         name: 'Stoat',             type: 'mammal',    rarity: 'uncommon',  fact: 'Ermine (white winter) coat used in royal robes. The spots are the black tail tips.' },
  { id: 'hedgehog',      name: 'Hedgehog',          type: 'mammal',    rarity: 'uncommon',  fact: 'Emerging from hibernation in April. UK population has halved since 2000.' },
  { id: 'otter',         name: 'Otter',             type: 'mammal',    rarity: 'rare',      fact: 'Present on the Tyne, mainly nocturnal. Look for spraints (droppings) on rocks.' },
  { id: 'red_deer',      name: 'Red Deer',          type: 'mammal',    rarity: 'rare',      fact: 'More likely in the Cheviots, but occasionally seen near the wall. UK\'s largest land mammal.' },

  // ── WILDFLOWERS ───────────────────────────────────────────────
  { id: 'primrose',      name: 'Primrose',          type: 'flower',    rarity: 'common',    fact: '"First rose" (prima rosa) — though not a rose at all.' },
  { id: 'bluebell',      name: 'Bluebell',          type: 'flower',    rarity: 'common',    fact: 'The UK holds ~50% of the world\'s bluebell population. Protected by law.' },
  { id: 'wild_garlic',   name: 'Wild Garlic',       type: 'flower',    rarity: 'common',    fact: 'Edible and increasingly popular. You\'ll smell it before you see it.' },
  { id: 'wood_anemone',  name: 'Wood Anemone',      type: 'flower',    rarity: 'uncommon',  fact: 'Spreads only 6 feet per century. A large patch means ancient woodland.' },
  { id: 'mountain_pansy',name: 'Mountain Pansy',    type: 'flower',    rarity: 'uncommon',  fact: 'Restricted to lime-rich upland soils. The Whin Sill corridor is ideal habitat.' },
  { id: 'spring_sandwort',name: 'Spring Sandwort',  type: 'flower',    rarity: 'rare',      fact: 'A metallophyte that tolerates heavy metals. Specific to the wall\'s unique geology.' },

  // ── TREES ─────────────────────────────────────────────────────
  { id: 'sycamore_gap',  name: 'Sycamore Gap Stump',type: 'tree',     rarity: 'uncommon',  fact: 'Felled by vandalism Sept 2023. New shoots growing from stump. A pilgrimage site now.' },
  { id: 'juniper',       name: 'Juniper',           type: 'tree',      rarity: 'rare',      fact: 'One of only 3 native British conifers. The berries flavour gin — "gin" comes from "juniper."' },

  // ── INSECTS ───────────────────────────────────────────────────
  { id: 'orange_tip',    name: 'Orange-tip Butterfly',type: 'insect',  rarity: 'uncommon',  fact: 'Only the male has the orange tips. The female is often mistaken for a small white.' },
  { id: 'peacock_butterfly',name: 'Peacock Butterfly',type: 'insect',  rarity: 'uncommon',  fact: 'Makes a hissing sound by rubbing its wings together. Eye markings startle predators.' },
  { id: 'emperor_moth',  name: 'Emperor Moth',      type: 'insect',    rarity: 'rare',      fact: 'Only UK silk moth family member. Males detect females by scent from over a mile away.' },

  // ── REPTILES & AMPHIBIANS ─────────────────────────────────────
  { id: 'common_lizard', name: 'Common Lizard',     type: 'reptile',   rarity: 'uncommon',  fact: 'UK\'s most widespread reptile. Gives birth to live young — unusual for a lizard.' },
  { id: 'adder',         name: 'Adder',             type: 'reptile',   rarity: 'rare',      fact: 'UK\'s only venomous snake. Last fatal bite: 1975. You are more likely to be killed by a cow.' },
  { id: 'great_crested_newt',name: 'Great Crested Newt',type: 'amphibian',rarity: 'legendary',fact: 'Fully protected by law. An offence to even disturb their habitat without a licence.' },
];

// ── HELPER FUNCTIONS ───────────────────────────────────────────────

function getStopById(id) { return WALL_STOPS[id] || null; }
function getAllStops() { return Object.values(WALL_STOPS); }
function getStopsByDay(day) { return Object.values(WALL_STOPS).filter(s => s.day === day); }

function getQuestionsForStop(stopId) { return QUESTIONS.filter(q => q.stop === stopId); }
function getGeneralQuestions() { return QUESTIONS.filter(q => q.stop === null); }
function getQuestionsByCategory(cat) { return QUESTIONS.filter(q => q.category === cat); }
function getQuestionById(id) { return QUESTIONS.find(q => q.id === id) || null; }

function getSpeciesByRarity(rarity) { return COLLECTION_SPECIES.filter(s => s.rarity === rarity); }
function getSpeciesByType(type) { return COLLECTION_SPECIES.filter(s => s.type === type); }
function getSpeciesById(id) { return COLLECTION_SPECIES.find(s => s.id === id) || null; }

function distanceMetres(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function getNearestStop(lat, lng) {
  let nearest = null, minDist = Infinity;
  for (const stop of Object.values(WALL_STOPS)) {
    const d = distanceMetres(lat, lng, stop.lat, stop.lng);
    if (d < minDist) { minDist = d; nearest = stop; }
  }
  return { stop: nearest, distance: minDist };
}

function isWithinTriggerZone(lat, lng, stopId) {
  const stop = WALL_STOPS[stopId];
  if (!stop) return false;
  return distanceMetres(lat, lng, stop.lat, stop.lng) <= stop.radius;
}

function getTriggeredStops(lat, lng) {
  return Object.values(WALL_STOPS).filter(s => distanceMetres(lat, lng, s.lat, s.lng) <= s.radius);
}

// Collection stats
function getCollectionStats(collected) {
  const total = COLLECTION_SPECIES.length;
  const found = collected.length;
  const byRarity = { common: 0, uncommon: 0, rare: 0, legendary: 0 };
  const totalByRarity = { common: 0, uncommon: 0, rare: 0, legendary: 0 };
  for (const s of COLLECTION_SPECIES) totalByRarity[s.rarity]++;
  for (const id of collected) {
    const s = getSpeciesById(id);
    if (s) byRarity[s.rarity]++;
  }
  return { total, found, percentage: Math.round((found / total) * 100), byRarity, totalByRarity };
}

// ── WHAT HAPPENED NEXT — reasoning questions ──────────────────────
// Present a real event, 4 plausible consequences, reason through which actually happened

const WHAT_HAPPENED_NEXT = [
  { id:'whn01', text:'In 1640, Scottish Covenanters crossed the Tyne at Newburn and routed the English army. What happened next?', options:['Charles I invaded Scotland in retaliation','Charles I was forced to recall Parliament after 11 years','The Scots retreated back to Edinburgh','England and Scotland signed a peace treaty'], answer:1, fact:'This led directly to the Long Parliament, the English Civil War, and ultimately Charles I\'s execution. The Scots also occupied Newcastle for almost a year and demanded gold.' },
  { id:'whn02', text:'In 122 AD, Hadrian visited Britain and ordered the Wall built. What happened to the previous frontier?', options:['It was demolished for materials','It was abandoned and forgotten','It continued in use alongside the new Wall','It was given to local Britons to maintain'], answer:2, fact:'The Stanegate road and its forts continued as a supply route behind the Wall. The Wall added a new defensive line but didn\'t replace the existing infrastructure.' },
  { id:'whn03', text:'When plague hit Jarrow monastery around 686 AD, killing nearly every monk, the young Bede and Abbot Ceolfrith were the only two who could sing the full liturgy. What did they do?', options:['They abandoned the monastery temporarily','They sang the entire Divine Office together, just the two of them, for weeks','They recruited monks from other monasteries immediately','They simplified the services until more monks arrived'], answer:1, fact:'The old man and the boy sang psalms across an empty choir, alternating verses, for weeks until the community recovered. Bede was about 14 years old.' },
  { id:'whn04', text:'When the Vindolanda "darning tool" was re-examined in 2023, archaeologists realised it was probably a Roman dildo. What had it been catalogued as for 30 years?', options:['A tent peg','A darning tool','A pestle','A religious offering'], answer:1, fact:'Catalogued in 1992 as a darning tool. Researchers noted "archaeological wood is prone to shrinkage." The item is 6.3 inches of carved ash wood.' },
  { id:'whn05', text:'The Sycamore Gap tree was felled overnight in September 2023. What happened to the perpetrator?', options:['Never caught','A 16-year-old was arrested the next day','A farmer confessed to clearing the land','Storm damage was blamed initially'], answer:1, fact:'Daniel Graham (16 at the time) and Adam Carruthers were convicted and sentenced to 4 years 3 months each. The tree has since sprouted from the stump.' },
  { id:'whn06', text:'Hadrian tried repeatedly to kill himself as he lay dying. What happened each time?', options:['He was resuscitated by physicians','Every person he asked to help him refused — servant, doctor, barbarian','He was too weak to manage it','His wife intervened'], answer:1, fact:'His servant refused and reported him. His dagger was taken. His doctor killed HIMSELF rather than provide poison. A barbarian named Mastor also refused. His enemy Servianus had cursed him: "May Hadrian long for death but be unable to die."' },
  { id:'whn07', text:'In 685 AD, St Cuthbert visited Carlisle and was shown a still-working Roman fountain. What else happened during that exact visit?', options:['He performed a miracle','He had a vision that the Northumbrian king had been killed in battle','He baptised the queen','He founded a monastery'], answer:1, fact:'While admiring Roman plumbing, Cuthbert received a vision that King Ecgfrith had been killed by the Picts at Nechtansmere. Roman tourism and military catastrophe, on the same afternoon.' },
  { id:'whn08', text:'When Victorian archaeologists excavated Hadrian\'s Wall and found phallic carvings everywhere, what did they do?', options:['Published detailed studies immediately','Turned the stones around to hide the willies from the public','Destroyed the carvings','Left them in place but didn\'t mention them in reports'], answer:1, fact:'Some stones were deliberately turned face-inward. 59+ phallic carvings have been identified along the Wall despite Victorian embarrassment.' },
  { id:'whn09', text:'A monk named Alfred Westou visited Jarrow around 1020 AD to see Bede\'s remains. What did he do?', options:['Built a shrine on the spot','Stole Bede\'s bones and hid them in St Cuthbert\'s coffin at Durham','Wrote a book about the visit','Left a gold offering'], answer:1, fact:'He placed the bones in a linen bag inside St Cuthbert\'s coffin. Told only a few friends. The bones were rediscovered in 1104 when Cuthbert\'s coffin was opened.' },
  { id:'whn10', text:'Rome\'s greatest architect Apollodorus told Emperor Hadrian to "be off and draw your gourds" — insulting his architectural designs. What did Hadrian do?', options:['Laughed it off','Later sent his own designs for review, then allegedly exiled and executed Apollodorus when he criticised them','Hired a different architect','Promoted Apollodorus for his honesty'], answer:1, fact:'When Apollodorus pointed out flaws in Hadrian\'s Temple of Venus and Roma, Hadrian allegedly had him killed. Never insult an emperor\'s drawings.' },
];

// ── LATERAL THINKING RIDDLES — no options, freetext answer, tap to reveal ──

const RIDDLES = [
  { id:'rid01', text:'Two Roman soldiers are found dead in a cabin on a Northumbrian hillside. The cabin is destroyed. There is no one else around. How did they die?', answer:'The cabin is an aircraft — a Roman-era analogy would be a wrecked cart that rolled down the hill. But the modern riddle: it\'s a plane crash. The "cabin" is an aircraft cabin.' },
  { id:'rid02', text:'A centurion walks into a tavern at Vindolanda and asks for a glass of water. The barmaid pulls out a knife and holds it to his throat. He says "thank you" and leaves. Why?', answer:'He had the hiccups. The shock of the knife cured them. The water was the excuse to enter — he got what he actually needed.' },
  { id:'rid03', text:'Marcus Cocceius Firmus is found dead in his quarters surrounded by broken glass and water on the floor. How did he die?', answer:'Marcus is a goldfish. His bowl was knocked over (perhaps by a gust of wind through the window). The "broken glass" is the bowl. The water is from the bowl. Marcus is a fish, not a centurion.' },
  { id:'rid04', text:'A man walks into Twice Brewed Inn and orders the albatross soup. He takes one sip, leaves the pub, and kills himself. Why?', answer:'Classic lateral thinking puzzle. He was a shipwreck survivor. On the liferaft, he was told the meat in the soup was albatross. At the pub, he tastes real albatross for the first time and realises the "albatross" on the raft was actually his dead crewmate.' },
  { id:'rid05', text:'A Roman guard at Housesteads tells his centurion: "Sir, I dreamed last night that the Picts will attack from the north gate at dawn tomorrow." The centurion thanks him and immediately has him punished. Why?', answer:'The guard was on night watch duty. If he was dreaming, he was sleeping on duty — a capital offence in the Roman army. The centurion punished him for sleeping, not for the warning.' },
  { id:'rid06', text:'You\'re walking the Wall and you come to a fork in the path. One way leads to Twice Brewed (truth), the other to certain death. Two locals stand there: one always tells the truth, one always lies. You can ask ONE question to ONE of them. What do you ask?', answer:'Ask either one: "If I asked the OTHER person which path leads to Twice Brewed, what would they say?" Then take the OPPOSITE path. The liar would lie about what the truth-teller would say, and the truth-teller would truthfully report the liar\'s lie. Both answers point to the wrong path.' },
  { id:'rid07', text:'A Vindolanda tablet reads: "I am sending you socks, underpants, and sandals. The total number of items is more than six but less than eight." How many items were sent?', answer:'Seven. Two pairs of socks (4 items), two pairs of underpants (4 items)... wait, that\'s 8. The riddle is: the tablet says "pairs" — so it\'s 2 + 2 + 2 = 6 items. But "more than six" means 7. The sandals came in a pair plus a spare. This is a trick — the answer is in the original tablet: "pairs of socks from Sattua, two pairs of sandals and two pairs of underpants" = 2+2+2 = 6 pairs = probably 7 individual items if one sandal was odd.' },
  { id:'rid08', text:'Bear Grylls, Ray Mears, and Les Hiddins are stranded on Hadrian\'s Wall in winter. They have one match and enter a milecastle containing a candle, a wood-burning stove, and an oil lamp. What do they light first?', answer:'The match.' },
];

// ── ESTIMATION BATTLES — both players guess, closest wins ──────────

const ESTIMATIONS = [
  { id:'est01', text:'How many individual writing tablets have been found at Vindolanda?', answer:1300, unit:'tablets', fact:'Over 1,300 and still counting — new ones found almost every dig season.' },
  { id:'est02', text:'How many phallic carvings have been identified across all of Roman Britain?', answer:92, unit:'carvings', fact:'92+ across the province. Vindolanda alone has 13+. They were good luck charms, not directions.' },
  { id:'est03', text:'How many Roman soldiers would have garrisoned the entire length of Hadrian\'s Wall?', answer:9000, unit:'soldiers', fact:'Approximately 9,000-10,000 auxiliary troops across 14-17 forts plus milecastles and turrets.' },
  { id:'est04', text:'How many leather shoes have been found at Vindolanda?', answer:5000, unit:'shoes', fact:'Over 5,000 — including tiny baby booties with intricate fishnet patterns. Largest archaeological leather collection in Europe.' },
  { id:'est05', text:'How old was Bede when he entered the monastery?', answer:7, unit:'years old', fact:'Seven. He never left. Wrote 40 books. Corrected Pliny. Invented the calendar. Never saw Rome.' },
  { id:'est06', text:'How many miles is Hadrian\'s Wall from coast to coast?', answer:73, unit:'miles', fact:'73 miles or 80 Roman miles. Bede said it was "from sea to sea." He was right about that bit.' },
  { id:'est07', text:'What percentage of the garrison at Vindolanda was fit for duty according to their own records?', answer:35, unit:'percent', fact:'265 out of 752 men. 35%. The rest were sick, on leave, or seconded elsewhere. The mightiest army in history.' },
  { id:'est08', text:'How many words are in the Carlisle Cursing Stone inscription?', answer:1069, unit:'words', fact:'1,069 words of medieval curse against the Border Reivers. Locals blame it for floods, foot-and-mouth, and Carlisle United\'s relegation.' },
  { id:'est09', text:'How many times did Anne Woods win the World Gurning Championship?', answer:27, unit:'times', fact:'Twenty-seven times. At Egremont Crab Fair. Through a horse collar. Since 1267.' },
  { id:'est10', text:'How many surviving manuscript copies of Bede\'s Ecclesiastical History exist?', answer:160, unit:'manuscripts', fact:'About 160 — an extraordinary number for a medieval text. People trusted him enough to keep copying for centuries.' },
  { id:'est11', text:'In what year was the last fatal adder bite in the UK?', answer:1975, unit:'', fact:'1975. You are significantly more likely to be killed by a cow.' },
  { id:'est12', text:'How many years did the Border Reivers terrorise the Anglo-Scottish border?', answer:300, unit:'years', fact:'Roughly 1300-1603. Three centuries of raiding, murder, kidnapping, and inventing the word "blackmail."' },
];

// ── WHOSE WALL IS IT ANYWAY — spot Bear's lie ─────────────────────
// Three "facts" — two real, one invented by Bear. Players spot the lie.

const SPOT_THE_LIE = [
  { id:'stl01', facts:['Vindolanda tablets include a birthday party invitation from 100 AD','Roman soldiers at the Wall requested underpants be sent from home','Marcus Cocceius Firmus once wrestled a bear at Vindolanda and the bear apologised'], lie:2, bear_defence:'It\'s in the tablets. Tablet 847. Bottom shelf. Hard to read. The bear definitely apologised. I know bears.' },
  { id:'stl02', facts:['Hadrian was born in Spain, not Rome','The Wall was originally partly built from turf, not all stone','Hadrian personally laid the first stone of the Wall in a ceremony attended by 10,000 soldiers'], lie:2, bear_defence:'I was there. Well, not there there. But I\'ve seen the stone. It has his fingerprint on it. Distinctive Roman fingerprint.' },
  { id:'stl03', facts:['Romans used urine as mouthwash and toothpaste','Emperor Vespasian taxed public urinals because urine was valuable','Roman soldiers added honey to their urine to improve the flavour for dental use'], lie:2, bear_defence:'The honey is documented. I\'ve tried it. In the field. 2014. The crew were sceptical but my teeth have never been whiter.' },
  { id:'stl04', facts:['The Hexham Heads caused reports of a werewolf in 1972','A Celtic scholar who studied the heads saw a wolf-man in her bedroom','The heads were later confirmed as ancient Celtic artefacts by carbon dating'], lie:2, bear_defence:'The carbon dating was done at Cambridge. Or Oxford. One of those. The results were classified. I have a contact who confirmed.' },
  { id:'stl05', facts:['Housesteads fort has a murder victim with a knife still in his ribs','The Sycamore Gap tree was deliberately felled with a chainsaw in 2023','The ghost at Milecastle 42 has been seen so many times he has been named Kevin'], lie:2, bear_defence:'His name is Kevin. Everyone on the Wall knows Kevin. He\'s a Roman sentry. He\'s been there since the 3rd century. He prefers Kevin to his Latin name.' },
  { id:'stl06', facts:['Bede described the Picts and Scots as "worms coming from their holes"','Bede attributed Hadrian\'s Wall to Emperor Severus, not Hadrian','Bede personally visited the Wall and measured it with a rope his mother gave him'], lie:2, bear_defence:'Bede\'s mother\'s rope is in the British Museum. Glass case. Third floor. Next to the Elgin Marbles. I\'ve seen it. The rope is surprisingly well preserved.' },
  { id:'stl07', facts:['George Stephenson was born in Wylam in 1781','Puffing Billy, built at Wylam, is the oldest surviving steam locomotive','The first railway accident in history happened at Wylam when Puffing Billy ran over a sheep called Margaret'], lie:2, bear_defence:'Margaret the sheep is commemorated with a small plaque near the waggonway. It\'s very small. Easy to miss. I found it in 2016. The crew didn\'t film it.' },
  { id:'stl08', facts:['Carlisle Castle has been in continuous military use for over 900 years','Mary Queen of Scots was imprisoned in Carlisle Castle in 1568','The Carlisle Cursing Stone has caused three separate relegations of the local football team'], lie:2, bear_defence:'Three relegations. 2004, 2014, and one they don\'t talk about. The stone is 14 tons of concentrated bad luck. I offered to move it. They said no.' },
  { id:'stl09', facts:['A Roman boxing glove was found at Vindolanda — the only one from the Roman world','Over 5,000 leather shoes have been found at Vindolanda','A Roman soldier\'s diary found at Vindolanda contains a five-star review of the local tavern'], lie:2, bear_defence:'Five stars. He specifically praised the venison and the view. And the barmaid. Tablet 1,247. It\'s not on public display for obvious reasons.' },
  { id:'stl10', facts:['The Battle of Newburn Ford in 1640 helped cause the English Civil War','Corbridge was burned by the Scots in both 1296 and 1312','The North Tyne at Chollerford was crossed by a team of Roman synchronised swimmers as part of the Saturnalia celebrations'], lie:2, bear_defence:'Synchronised swimming was HUGE in the Roman army. It was a bonding exercise. Like team building but wetter. Marcus Cocceius Firmus won gold three years running.' },
];

// Helper functions for new question types
function getRandomRiddle() { return RIDDLES[Math.floor(Math.random() * RIDDLES.length)]; }
function getRandomEstimation() { return ESTIMATIONS[Math.floor(Math.random() * ESTIMATIONS.length)]; }
function getRandomSpotTheLie() { return SPOT_THE_LIE[Math.floor(Math.random() * SPOT_THE_LIE.length)]; }
function getRandomWhatHappenedNext() { return WHAT_HAPPENED_NEXT[Math.floor(Math.random() * WHAT_HAPPENED_NEXT.length)]; }

// Scoring
function scoreAnswer(isCorrect, timeMs) {
  if (!isCorrect) return 0;
  if (timeMs < 5000) return 3;   // fast
  if (timeMs < 15000) return 2;  // steady
  return 1;                       // got there
}

export {
  WALL_STOPS, CATEGORIES, QUESTIONS, COLLECTION_SPECIES,
  WHAT_HAPPENED_NEXT, RIDDLES, ESTIMATIONS, SPOT_THE_LIE,
  getStopById, getAllStops, getStopsByDay,
  getQuestionsForStop, getGeneralQuestions, getQuestionsByCategory, getQuestionById,
  getSpeciesByRarity, getSpeciesByType, getSpeciesById,
  distanceMetres, getNearestStop, isWithinTriggerZone, getTriggeredStops,
  getCollectionStats, scoreAnswer,
  getRandomRiddle, getRandomEstimation, getRandomSpotTheLie, getRandomWhatHappenedNext,
};
