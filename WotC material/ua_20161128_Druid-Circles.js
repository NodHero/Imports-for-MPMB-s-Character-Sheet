var iFileName = "ua_20161128_Druid-Circles.js";
RequiredSheetVersion(13);
// This file adds the content from the Unearthed Arcana: Druid Circles article to MPMB's Character Record Sheet

// Define the source
SourceList["UA:DC"] = {
	name : "Unearthed Arcana: Druid Circles",
	abbreviation : "UA:DC",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2016/dnd/downloads/UA_Druid11272016_CAWS.pdf",
	date : "2016/11/28"
};

// Adds 3 subclasses for the Druid
AddSubClass("druid", "circle of dreams-ua", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*\bdreams\b).*$/i,
	subname : "Circle of Dreams",
	source : ["UA:DC", 1],
	features : {
		"subclassfeature2" : {
			name : "Balm of the Summer Court",
			source : ["UA:DC", 1],
			minlevel : 2,
			description : desc([
				"I have a pool of fey energy represented by a number of d6s equal to my druid level",
				"As a bonus action, I can spend dice to heal an ally within 120 ft of me that I can see",
				"I can spend up to half my druid level worth of dice from the pool at once",
				"The ally heals an amount equal to the total rolled and gains 1 temp HP per die spent",
				"In addition, the ally gains +5 ft speed per die spent, which lasts for 1 minute"
			]),
			usages : levels.map(function (n) { return n < 2 ? "" : n + "d6 per "; }),
			recovery : "long rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Hearth of Moonlight and Shadow",
			source : ["UA:DC", 1],
			minlevel : 6,
			description : desc([
				"At the start of a short or long rest, I can create a warded area of 30-ft radius",
				"Within this area, my allies and I gain +5 on Wis (Perception) checks to detect creatures",
				"Also, any light from open flames is not visible from outside the area",
				"This effect lasts until the end of the rest or when I leave the area"
			])
		},
		"subclassfeature10" : {
			name : "Hidden Paths",
			source : ["UA:DC", 1],
			minlevel : 10,
			description : desc([
				"On my turn, I can teleport up to 30 ft to where I can see; Moved distance costs speed",
				"As an action, I can teleport a willing ally I touch up to 30 ft to a spot I can see",
				"Once I used either option, I can't use this feature again until 1d4 rounds have passed"
			]),
			usages : 1,
			recovery : "1d4 rounds",
			action : ["action", " (on ally)"]
		},
		"subclassfeature14" : {
			name : "Purifying Light",
			source : ["UA:DC", 1],
			minlevel : 14,
			description : desc([
				"When I use a spell slot with a spell to restores HP, I can use Dispel Magic on the target",
				"The Dispel Magic counts as if being cast with the same spell slot as the healing spell",
				"Each creature effected by the Dispel Magic costs as one use of this feature"
			]),
			usages : 3,
			recovery : "long rest"
		}
	}
});
AddSubClass("druid", "circle of the shepherd-ua", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*shepherd).*$/i,
	subname : "Circle of the Shepherd",
	source : ["UA:DC", 1],
	features : {
		"subclassfeature2" : {
			name : "Beast Speech",
			source : ["UA:DC", 2],
			minlevel : 2,
			description : "\n   " + "I can talk with beasts, they understand me and I them, to the limit of their intelligence" + "\n   " + "This doesn't automatically make me friends with all beasts"
		},
		"subclassfeature2.1" : {
			name : "Spirit Bond",
			source : ["UA:DC", 2],
			minlevel : 2,
			description : "\n   " + "As a bonus action, I can summon a spirit to an empty space within 60 ft that I can see" + "\n   " + "The Bear, Hawk, or Wolf spirit, creates a 30-ft radius aura and persist for 1 minute" + "\n   " + "It doesn't occupy space, is immobile, and counts as neither a creature nor an object" + "\n    - " + "Bear: my allies in the area and I instantly gain 5 + my druid level in temp HP" + "\n       " + "While in the aura, my allies and I gain advantage on Strength checks and saves" + "\n    - " + "Hawk: my allies and I gain advantage on attacks against targets in the aura" + "\n    - " + "Wolf: my allies and I gain advantage on ability checks to detect targets in the aura" + "\n       " + "If I cast a healing spell with a spell slot, allies in the aura heal my druid level in HP",
			usages : 1,
			recovery : "short rest",
			action : ["bonus action", ""]
		},
		"subclassfeature6" : {
			name : "Mighty Summoner",
			source : ["UA:DC", 2],
			minlevel : 6,
			description : "\n   " + "Beast I summon with my spells have +2 HP per HD and their attacks count as magical",
			calcChanges : {
				spellAdd : [
					function (spellKey, spellObj, spName) {
						switch (spellKey) {
							case "conjure animals" :
							case "conjure fey" :
								spellObj.description += "; each +2 HP/HD, magical natural attacks";
								return true;
							case "conjure woodland beings" :
								spellObj.description = spellObj.description.replace(/fey.*/, "fey; obeys commands if its align. agrees; breaks free if break conc.; +2 HP/HD, magic atks");
								return true;
						}
					},
					"When I use a spell that restores hit points, it restores an additional 2 + the level of the spell slot (or spell slot equivalent) used to cast the spell."
				]
			}
		},
		"subclassfeature10" : {
			name : "Guardian Spirit",
			source : ["UA:DC", 2],
			minlevel : 10,
			description : "\n   " + "Whenever I finish a long rest, I gain the benefits of a Death Ward spell for 24 hours",
			spellcastingBonus : {
				name : "Guardian Spirit",
				spells : ["death ward"],
				selection : ["death ward"],
				firstCol : 'oncelr'
			},
			spellChanges : {
				"death ward" : {
					range : "Self",
					components : "",
					compMaterial : "",
					description : "Once, when I drops to 0 HP I drops to 1 HP instead; or negates first instantaneous kill effect",
					duration : "24 h",
					changes : "Whenever I finish a long rest, I gain the benefits of a Death Ward spell for 24 hours."
				}
			}
		},
		"subclassfeature14" : {
			name : "Faithful Summons",
			source : ["UA:DC", 2],
			minlevel : 14,
			description : "\n   " + "When I am reduced to 0 HP or incapacitated against my will, I can summon protectors" + "\n   " + "I gain the benefits of a Conjure Animals spell as if cast with a 9th-level spell slot" + "\n   " + "It summons 4 beast of my choice with CR 2 or lower within 20 ft of me for 1 hour" + "\n   " + "If they receive no commands from me, they protect me from harm and attack foes",
			usages : 1,
			recovery : "long rest"
		}
	}
});
AddSubClass("druid", "circle of twilight-ua", {
	regExpSearch : /^(?=.*(druid|shaman))(?=.*twilight).*$/i,
	subname : "Circle of Twilight",
	source : ["UA:DC", 2],
	features : {
		"subclassfeature2" : {
			name : "Harvest's Scythe",
			source : ["UA:DC", 3],
			minlevel : 2,
			description : "\n   " + "I have a pool of energy represented by a number of d10s equal to my druid level" + "\n   " + "When I roll damage for a spell, I can do extra necrotic damage with dice from the pool" + "\n   " + "I can spend up to half my druid level worth of dice from the pool at once" + "\n   " + "If I any hostiles die from an augmented spell, I can heal one ally I can see within 30 ft" + "\n   " + "The ally regains 2 HP per die spent; or 5 HP per die if one of the slain was undead  ",
			usages : ["", "2d10 per ", "3d10 per ", "4d10 per ", "5d10 per ", "6d10 per ", "7d10 per ", "8d10 per ", "9d10 per ", "10d10 per ", "11d10 per ", "12d10 per ", "13d10 per ", "14d10 per ", "15d10 per ", "16d10 per ", "17d10 per ", "18d10 per ", "19d10 per ", "20d10 per "],
			recovery : "long rest"
		},
		"subclassfeature6" : {
			name : "Speech Beyond the Grave",
			source : ["UA:DC", 3],
			minlevel : 6,
			description : "\n   " + "Once per short rest, I can cast Speak with Dead without spell slots or material comp." + "\n   " + "The target and I can understand each other, regardless of language or intelligence",
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Speech Beyond the Grave",
				spells : ["speak with dead"],
				selection : ["speak with dead"],
				firstCol : 'oncesr'
			},
			spellChanges : {
				"speak with dead" : {
					components : "V,S",
					compMaterial : "",
					changes : "I can cast this spell once per short rest without requiring material components."
				}
			}
		},
		"subclassfeature10" : {
			name : "Watcher at the Threshold",
			source : ["UA:DC", 3],
			minlevel : 10,
			description : "\n   " + "I gain resistance to necrotic and radiant damage" + "\n   " + "While I'm not incapacitated, allies within 30 ft of me gain adv. on their death saves",
			dmgres : ["Necrotic", "Radiant"]
		},
		"subclassfeature14" : {
			name : "Paths of the Dead",
			source : ["UA:DC", 3],
			minlevel : 14,
			description : "\n   " + "Once per short rest, I can cast Etherealness without needing a spell slot",
			usages : 1,
			recovery : "short rest",
			spellcastingBonus : {
				name : "Paths of the Dead",
				spells : ["etherealness"],
				selection : ["etherealness"],
				firstCol : 'oncesr'
			},
			spellChanges : {
				"etherealness" : {
					description : "I go to Ethereal Plane; move there, but able to perceive 60 ft into the normal plane",
					changes : "Using my Paths of the Dead class feature I can cast Etherealness once per short rest without needing a spell slot, thus can only target 1 creature."
				}
			}
		}
	}
});
