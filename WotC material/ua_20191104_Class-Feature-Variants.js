var iFileName = "ua_20191104_Class-Feature-Variants.js";
RequiredSheetVersion(13);
// This file adds the content from the Unearthed Arcana: Class Feature Variants article to MPMB's Character Record Sheet

// Define the source
SourceList["UA:CFV"] = {
	name : "Unearthed Arcana: Class Feature Variants",
	abbreviation : "UA:CFV",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2019/dnd/downloads/UA_ClassFeatures.pdf",
	date : "2019/11/04"
};

// Proficiency Versatility is not something governed by import automation, thus skipped

// Barbarian alternative class features
CreateClassFeatureVariant("barbarian", "danger sense", "Survival Instincts (ua)", {
	name : "Survival Instincts",
	source : [["UA:CFV", 1]],
	description : desc([
		"I gain proficiency and expertise with two skills of my choice",
		"I can choose from Animal Handling, Medicine, Nature, Perception, and Survival"
	]),
	skillstxt : "Proficiency and expertise with two from Animal Handling, Medicine, Nature, Perception, and Survival"
});
CreateClassFeatureVariant("barbarian", "fast movement", "Instinctive Pounce (ua)", {
	name : "Instinctive Pounce",
	source : [["UA:CFV", 1]],
	description : desc([
		"As a reaction when a creature ends it move within 15 ft of me, I can move towards it",
		"I move up to half my speed closer to it; This move doesn't provoke opportunity attacks"
	]),
	action : [["reaction", ""]]
});

// Bard alternative class features enhancements
AddFeatureChoice(ClassList.bard.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Bard Spell List",
	source : [["UA:CFV", 3]],
	extraname : "Optional Bard 1",
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "bard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["cause fear", "color spray", "command", "aid", "enlarge/reduce", "mind spike", "mirror image", "phantasmal force", "mass healing word", "slow", "tiny servant", "phantasmal killer", "contact other plane", "rary's telepathic bond", "heroes' feast", "mental prison", "scatter", "tenser's transformation", "power word pain", "prismatic spray", "antipathy/sympathy", "maze", "prismatic wall"]);
			},
			"This alternative class feature enhancement expands the spell list of the bard class."
		]
	}
}, "Optional 1st-level features");
AddFeatureChoice(ClassList.bard.features["bardic inspiration"], true, "Magical Inspiration", {
	name : "Magical Inspiration",
	source : ["UA:CFV", 3],
	description : desc([
		"A bardic inspiration die recipient can also use it when casting a damaging or healing spell",
		"They can expend the die and add its result to one damage or healing roll of the spell"
	])
}, "Bardic Inspiration Enhancement");
AddFeatureChoice(ClassList.bard.features.spellcasting, true, "Spell Versatility", {
	name : "Spell Versatility",
	source : ["UA:CFV", 3],
	description : "\n   After a long rest, I can swap a bard cantrip or spell I know for another of the same level"
}, "Bard Spellcasting Enhancement");

// Cleric alternative class features and enhancements
AddFeatureChoice(ClassList.cleric.features.spellcasting, true, "Cantrip Versatility", {
	name : "Cantrip Versatility",
	source : ["UA:CFV", 3],
	description : "\n   Whenever I gain a cleric level, I can replace a cleric cantrip I know with another"
}, "Cleric Spellcasting Enhancement");
AddFeatureChoice(ClassList.cleric.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Cleric Spell List",
	source : ["UA:CFV", 3],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "cleric" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["cause fear", "wrathful smite", "branding smite", "aura of vitality", "aura of life", "aura of purity", "skill empowerment", "wall of light", "power word heal"]);
			},
			"This alternative class feature enhancement expands the spell list of the cleric class."
		]
	}
}, "Cleric Spellcasting Enhancement");
AddFeatureChoice(ClassList.cleric.features["channel divinity"], true, "Harness Divine Power", {
	name : "Channel Divinity: Harness Divine Power",
	source : ["UA:CFV", 4],
	description : "\n   As a bonus action, I can use my holy symbol and a prayer to regain 1 used level 1 spell slot",
	action : [["bonus action", ""]]
}, "Channel Divinity Enhancement");
// Cleric subclass alternative feature, so only run this after we are sure all subclasses have been added
RunFunctionAtEnd(function() {
	for (var i = 0; i < ClassList.cleric.subclasses[1].length; i++) {
		var aDomain = ClassSubList[ClassList.cleric.subclasses[1][i]];
		if (!aDomain || !aDomain.features.subclassfeature8 || !(/divine strike|potent spellcasting/i).test(aDomain.features.subclassfeature8.name)) continue;
		CreateClassFeatureVariant(ClassList.cleric.subclasses[1][i], "subclassfeature8", "Blessed Strikes", {
			name : "Blessed Strikes",
			source : ["UA:CFV", 4],
			description : desc([
				"When a creature is damaged by my spell/weapon attack, I can do +1d8 radiant damage",
				"Once I deal this extra damage, I can't do so again until the start of my next turn"
			]),
			calcChanges : {
				atkAdd : [
					function (fields, v) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && !v.isDC) {
							fields.Description += (fields.Description ? '; ' : '') + 'Once per round +1d8 radiant damage';
						}
					},
					"Once per turn when a creature takes damage from one of my spell or weapon attacks, I can also deal 1d8 radiant damage to the target."
				]
			}
		});
	}
});

// Druid alternative class features and enhancements
AddFeatureChoice(ClassList.druid.features.spellcasting, true, "Cantrip Versatility", {
	name : "Cantrip Versatility",
	source : ["UA:CFV", 4],
	description : "\n   Whenever I gain a druid level, I can replace a druid cantrip I know with another"
}, "Druid Spellcasting Enhancement");
AddFeatureChoice(ClassList.druid.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Druid Spell List",
	source : ["UA:CFV", 4],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "druid" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["ceremony", "protection from evil and good", "augury", "continual flame", "enlarge/reduce", "aura of vitality", "elemental weapon", "revivify", "thunder step", "wall of sand", "divination", "fire shield", "cone of cold", "dawn", "immolation", "flesh to stone", "symbol", "incendiary cloud", "mass polymorph"]);
			},
			"This alternative class feature enhancement expands the spell list of the druid class."
		]
	}
}, "Druid Spellcasting Enhancement");
var UACFV_Wild_Companion = {
	name : "Wild Companion",
	source : ["UA:CFV", 4],
	description : desc([
		"I can expend a use of wild shape to cast Find Familiar without material components",
		"The familiar always has the Fey type and disappears after half my druid level in hours"
	]),
	additional : levels.map(function (n) {
		return n < 2 ? "" : Math.floor(n/2) + " hours";
	}),
	spellcastingBonus : {
		name : "Wild Companion",
		spells : ["find familiar"],
		selection : ["find familiar"],
		firstCol : "Sp"
	},
	spellChanges : {
		"find familiar" : {
			components : "V,S",
			compMaterial : "",
			description : "Gain the services of a fey familiar; can see through its eyes; it can deliver touch spells; see B;",
			duration : "\u00BD druid lvl h",
			changes : "By using my Wild Companion class feature, I can expend a use of wild shape to cast Find Familiar without material components. The familiar created this way always has the Fey type and disappears after a number of hours equal to half my druid level."
		}
	}
}
AddFeatureChoice(ClassList.druid.features["subclassfeature2.wild shape"], true, "Wild Companion", UACFV_Wild_Companion, "Wild Shape Enhancement");
if (ClassSubList["druid-circle of the moon"]) {
	AddFeatureChoice(ClassSubList["druid-circle of the moon"].features["subclassfeature2.wild shape"], true, "Wild Companion", UACFV_Wild_Companion, "Wild Shape Enhancement");
}

// The enhancement option for fighting styles has to be added to each class separately
AddFeatureChoice(ClassList.fighter.features["fighting style"], true, "Martial Versatility (ua)", {
	name : "Martial Versatility",
	extraname : "Optional Fighter 1",
	source : [["UA:CFV", 12]],
	description : "\n   Whenever I gain a fighter level, I can swap a fighting style I know for another I'm allowed"
}, "Optional 1st-level fighter features");
// All the other fighting styles are available for all three classes, fighter, paladin, and ranger, so add them to all three here
AddFightingStyle(["fighter", "ranger", "paladin"], "Blind Fighting (ua)", {
	name : "Blind Fighting Style",
	source : [["UA:CFV", 12]],
	description : desc([
		"Being unable to see a creature doesn't impose disadvantage on my attack rolls against it",
		"However, this doesn't help me if the creature is hidden from me"
	])
});
// [dupl_start] the same as in Tasha's Cauldron of Everything
if (!SourceList.T) {
	AddFightingStyle(["fighter", "paladin"], "Interception", {
		name : "Interception Fighting Style",
		source : [["T", 41], ["UA:CFV", 12]],
		description : desc([
			"As a reaction when a creature I can see hits another within 5 ft of me, I can intercept",
			"I reduce the damage the target takes by 1d10 + my Proficiency Bonus (min 0 damage)",
			"I can't be the target and it requires me wielding a shield, or a simple or martial weapon"
		]),
		action : [["reaction", ""]]
	});
} // dupl_end
AddFightingStyle(["ranger"], "Interception (ua)", { // different for the Ranger, doesn't get this in TCoE
	name : "Interception Fighting Style",
	source : [["UA:CFV", 12]],
	description : desc([
		"As a reaction when a creature I can see hits a target within 5 ft of me, I can intercept",
		"I reduce the damage the target takes by 1d10 + my Proficiency Bonus (min 0 damage)",
		"I can only do this while wielding a shield, or a simple or martial weapon"
	]),
	action : [["reaction", ""]]
});
AddFightingStyle(["fighter", "ranger", "paladin"], "Thrown Weapon Fighting (ua)", {
	name : "Thrown Weapon Fighting Style",
	source : [["UA:CFV", 13]],
	description : desc([
		"I can draw a weapon with the thrown property as part of the attack I make with it",
		"In addition, my ranged attacks made with thrown weapons deal +1 damage"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.isMeleeWeapon && (/thrown/i).test(fields.Description)) {
					if (v.isMeleeWeapon) fields.Description += (fields.Description ? '; ' : '') + '+1 damage when thrown';
				};
			},
			"I deal +1 damage when I hit a ranged attack made with a thrown weapon."
		]
	}
});
AddFightingStyle(["fighter", "ranger", "paladin"], "Unarmed Fighting (ua)", {
	name : "Unarmed Fighting Style",
	source : ["UA:CFV", 13],
	description : desc([
		"My unarmed strikes deal 1d6 damage, or 1d8 damage when I have both hands free",
		"When I successfully start a grapple, I can deal 1d4 bludgeoning damage to the target",
		"Until the grapple ends, I can also deal this damage whenever I hit it with a melee attack"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				if (v.baseWeaponName == "unarmed strike") {
					if (fields.Damage_Die == 1 || fields.Damage_Die == "1d4") fields.Damage_Die = '1d6';
					fields.Description += (fields.Description ? '; ' : '') + 'Versatile (d8)';
				};
			},
			"My unarmed strikes deal 1d6 damage instead of 1, which increases to 1d8 if I have both hands free to make an unarmed strike with."
		]
	}
});
if (ClassSubList["fighter-battle master"]) {
	// Fighter alternative class features and enhancements (only if Battle Master subclass exists)
	// [dupl_start] the same as in Tasha's Cauldron of Everything
	if (!SourceList.T) {
		AddFightingStyle(["fighter"], "Superior Technique", {
			name : "Superior Technique",
			source : [["T", 41], ["UA:CFV", 5]],
			description : " [1 maneuver; d6, 1\xD7 per short rest]" + desc([
				"I gain one superiority die (d6) that I can expend to fuel a special Maneuver",
				"I can only use one Maneuver per attack; DCs are 8 + Prof B. + Str/Dex mod, my choice",
				'Use the "Choose Feature" button above to add a Maneuver to the third page'
			]),
			eval : function () {
				AddFeature('Combat Superiority ', 1, '(d6)', 'short rest', 'Fighter: Superior Technique Fighting Style', 'bonus');
				DontPrint("Class Features Menu");
			},
			removeeval : function () {
				RemoveFeature('Combat Superiority ', 1);
				if (!MakeClassMenu()) Hide("Class Features Menu");
			}
		});
	} // dupl_end
	// New Maneuver options for the Battle Master
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3"], true, "Maneuver Versatility (ua)", {
		name : "Maneuver Versatility",
		extraname : "Optional Battle Master 3",
		source : [["UA:CFV", 5]],
		description : "\n   Whenever I finish a long rest, I can replace a Maneuver I know with another"
	}, "Optional 3rd-level battle master features");
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Ambush", {
		name : "Ambush",
		source : ["UA:CFV", 5],
		description : "\n   When I make an initiative roll or a Dex (Stealth) check, I can add a superiority die to it"
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Bait and Switch", {
		name : "Bait and Switch",
		source : ["UA:CFV", 5],
		description : desc([
			"On my turn, I can expend a superiority die to swap places with an ally within 5 ft",
			"Doing this costs me 5 ft of movement, but this doesn't provoke opportunity attacks",
			"The ally then adds the superiority die to its AC until the start of my next turn"
		])
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Brace", {
		name : "Brace",
		source : ["UA:CFV", 5],
		description : desc([
			"As a reaction when a creature I can see moves within 5 of me, I can attack it",
			"I expend a superiority die and make one weapon attack, adding the die to the damage"
		]),
		action : [["reaction", ""]]
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Restraining Strike", {
		name : "Restraining Strike",
		source : ["UA:CFV", 5],
		description : desc([
			"Immediately after hitting with a melee weapon attack, I can use a bonus action to grapple",
			"I add the superiority die to the Str (Athletics) check; I can only do this on my own turn",
			"The target is also restrained while grappled in this way"
		]),
		action : [["bonus action", " (after melee weapon hit)"]]
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Silver Tongue", {
		name : "Silver Tongue",
		source : ["UA:CFV", 5],
		description : "\n   When I make a Cha (Deception) or Cha (Persuasion) check, I can add a superiority die to it"
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Snipe", {
		name : "Snipe",
		source : ["UA:CFV", 5],
		description : desc([
			"As a bonus action, I can expend a superiority die and make a ranged weapon attack",
			"I can draw a thrown weapon as part of making this attack; I add the die to the damage"
		]),
		action : [["bonus action", ""]]
	});
	AddFeatureChoice(ClassSubList["fighter-battle master"].features["subclassfeature3.maneuvers"], true, "Studious Eye", {
		name : "Studious Eye",
		source : ["UA:CFV", 5],
		description : "\n   When I make a Wis (Insight) or Int (Investigation) check, I can add a superiority die to it"
	});
}

// Monk class features enhancements
CreateClassFeatureVariant("monk", "martial arts", "Choose Monk Weapons", {
	name : "Martial Arts Weapons",
	extraname : "Monk Weapon",
	extrachoices : [],
	source : [["UA:CFV", 6]],
	description : desc([
		"Unarmed strike \u0026 5 + Wis mod simple/martial weapons (not two-handed/heavy/special)",
		"With these monk weapons, I can use Dex instead of Str and the Martial Arts damage die",
		"When taking an Attack action with these, I get one unarmed strike as a bonus action"
	]),
	calcChanges : {
		atkAdd : [
			function (fields, v) {
				var monkWeapons = ["unarmed strike"].concat(GetFeatureChoice("classes", "monk", "martial arts", true));
				if (classes.known.monk && classes.known.monk.level && (monkWeapons.indexOf(v.baseWeaponName) != -1 || (/monk weapon/i).test(v.WeaponText))) {
					var aMonkDie = function (n) { return n < 5 ? 4 : n < 11 ? 6 : n < 17 ? 8 : 10; }(classes.known.monk.level);
					try {
						var curDie = eval_ish(fields.Damage_Die.replace('d', '*'));
					} catch (e) {
						var curDie = 'x';
					};
					if (isNaN(curDie) || curDie < aMonkDie) {
						fields.Damage_Die = '1d' + aMonkDie;
					};
					if (fields.Mod == 1 || fields.Mod == 2 || What(AbilityScores.abbreviations[fields.Mod - 1] + " Mod") < What(AbilityScores.abbreviations[v.StrDex - 1] + " Mod")) {
						fields.Mod = v.StrDex;
					}
				};
			},
			"I can use either Strength or Dexterity and my Martial Arts damage die in place of the normal damage die for any 'Monk Weapons', which include unarmed strike and 5 + my Wisdom modifier of simple or martial weapons of my choice that I'm proficient with and that don't have the two-handed, heavy, or special property.\n   I can select these weapon using the \"Choose Feature\" button on the 2nd page, or have them count as such by including the words \"Monk Weapon\" in the name of the weapon."
		]
	}
});
// Add the monk weapon options as extrachoices
var UACFV_Martial_Arts = ClassList.monk.features["martial arts"];
RunFunctionAtEnd(function () {
	var UACFV_Monk_Weapon = UACFV_Martial_Arts['choose monk weapons'];
	for (var weapon in WeaponsList) {
		var aWea = WeaponsList[weapon];
		// skip attacks that are not simple or martial weapons, that have the heavy, two-handed, or special property, are magic weapons, or those that are spells or cantrips
		if (aWea.isMagicWeapon || !(/simple|martial/i).test(aWea.type) || (/heavy|special|((^|[^+-]\b)2|\btwo).?hand(ed)?s?/i).test(aWea.description) || aWea.special || (/spell|cantrip/i).test(aWea.list)) continue;
		UACFV_Monk_Weapon.extrachoices.push(aWea.name);
		UACFV_Monk_Weapon[aWea.name.toLowerCase()] = {
			name : aWea.name,
			description : "",
			source : aWea.source,
			weaponsAdd : [aWea.name],
			submenu : ((/simple/i).test(aWea.type) ? "\x1BSimple weapon, " : "Martial weapon, ") + ((/^(?!.*melee).*\d+.*$/i).test(aWea.range) ? "ranged" : "melee"),
			prereqeval : 'testSource("' + weapon + '", WeaponsList["' + weapon + '"], "weapExcl") ? "skip" : isProficientWithWeapon("' + weapon + '", WeaponsList["' + weapon + '"]);'
		}
	}
});
// Because the original Martial Arts feature was moved into a choice, but we want to keep its original "additional", "action", "eval", "removeeval" attributes, move some stuff around
var UACFV_Martial_Arts_Original = ClassList.monk.features["martial arts"]["\x1B[original] martial arts"];
if (UACFV_Martial_Arts_Original) {
	["additional", "action", "eval", "removeeval"].forEach(function (n) {
		if (!UACFV_Martial_Arts_Original[n]) return;
		UACFV_Martial_Arts[n] = UACFV_Martial_Arts_Original[n];
		delete UACFV_Martial_Arts_Original[n];
	});
}
// Ki enhancements
AddFeatureChoice(ClassList.monk.features.ki, true, "Ki-Fueled Strike", {
	name : "Ki-Fueled Strike",
	source : ["UA:CFV", 6],
	description : "\n   If I spend a ki point during my action, I can make an unarmed strike as a bonus action",
	action : [["bonus action", ""]]
}, "Ki Enhancement");
AddFeatureChoice(ClassList.monk.features.ki, true, "Distant Eye (1 ki point)", {
	name : "Distant Eye",
	source : ["UA:CFV", 6],
	description : " [1 ki point]\n   My ranged weapon attacks during this turn ignore the disadvantage from long range"
}, "Ki Enhancement");
AddFeatureChoice(ClassList.monk.features.ki, true, "Quickened Healing (2 ki points)", {
	name : "Quickened Healing",
	source : ["UA:CFV", 6],
	description : " [2 ki points]\n   As an action, I can regain a number of hit points equal to the roll of my martial arts die",
	action : [["action", ""]]
}, "Ki Enhancement");

// Paladin alternative class features and enhancements
// [dupl_start] the same as in Tasha's Cauldron of Everything
if (!SourceList.T) {
	AddFightingStyle(["paladin"], "Blessed Warrior", {
		name : "Blessed Warrior Fighting Style",
		source : [["T", 52], ["UA:CFV", 6]],
		description : desc([
			"I learn two cleric cantrips that count as paladin spells for me and use Cha for spellcasting",
			"Whenever I gain a paladin level, I can swap one of these for another cleric cantrip"
		]),
		spellcastingBonus : {
			name : "Blessed Warrior",
			"class" : "cleric",
			level : [0, 0],
			times : 2
		}
	});
} // dupl_end
// The enhancement option for fighting styles has to be added to each class separately
AddFeatureChoice(ClassList.paladin.features.spellcasting, true, "Martial Versatility (ua)", {
	name : "Martial Versatility",
	extraname : "Optional Paladin 2",
	source : [["UA:CFV", 12]],
	description : "\n   Whenever I gain a paladin level, I can swap a fighting style I know for another I'm allowed"
}, "Optional 2nd-level paladin features");
AddFeatureChoice(ClassList.paladin.features.spellcasting, true, "Expanded Spell List (ua)", {
	name : "Expanded Paladin Spell List",
	extraname : "Optional Paladin 2",
	source : [["UA:CFV", 6]],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "paladin" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["gentle repose", "prayer of healing", "warding bond", "life transference", "spirit guardians", "dawn", "flame strike"]);
			},
			"This alternative class feature enhancement expands the spell list of the paladin class."
		]
	}
}, "Optional 2nd-level paladin features");
AddFeatureChoice(ClassList.paladin.features["subclassfeature3.0-channel divinity"], true, "Harness Divine Power (ua)", {
	name : "Channel Divinity: Harness Divine Power",
	extraname : "Optional Paladin 3",
	source : [["UA:CFV", 6]],
	description : "\n   As a bonus action, I can use my holy symbol and a prayer to regain 1 used level 1 spell slot",
	action : [["bonus action", ""]]
}, "Optional 3rd-level paladin features");

// Ranger alternative class features and enhancements
var UACFV_Deft_Explorer = {
	name : "Deft Explorer",
	source : [["UA:CFV", 7]],
	description : '\n   Use the "Choose Feature" button above to add a deft explorer benefit to the third page',
	additional : levels.map(function (n) {
		return n < 6 ? "1 benefit" : (n < 10 ? 2 : 3) + " benefits";
	}),
	extraTimes : levels.map(function (n) {
		return n < 6 ? 1 : n < 10 ? 2 : 3;
	}),
	extraname : "Deft Explorer Benefit",
	extrachoices : ["Canny", "Roving", "Tireless"],
	"canny" : {
		name : "Canny",
		source : [["UA:CFV", 7]],
		description : desc([
			"I learn two language of my choice, and proficiency and expertise with one skill of my choice",
			"The skill I have to choose from: Animal Handling, Athletics, History, Insight, Investigation,",
			"Medicine, Nature, Perception, Stealth, or Survival"
		]),
		languageProfs : [2],
		skillstxt : "Proficiency and expertise with one from Animal Handling, Athletics, History, Insight, Investigation, Medicine, Nature, Perception, Stealth, or Survival"
	},
	"roving" : {
		name : "Roving",
		source : [["UA:CFV", 7]],
		description : "\n   I gain +5 ft walking speed and climbing and swimming speed equal to my walking speed",
		speed : {
			walk : { spd : "+5", enc : "+5" },
			climb : { spd : "walk", enc : "walk" },
			swim : { spd : "walk", enc : "walk" }
		}
	},
	"tireless" : {
		name : "Tireless",
		source : [["UA:CFV", 7]],
		description : desc([
			"Whenever I finish a short or long rest, I reduce my exhaustion level, if any, by 1",
			"As an action a number of times per day, I can give myself temp HP of 1d10 + Wis mod"
		]),
		action : [["action", ""]],
		usages : "Wisdom modifier per ",
		usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
		recovery : "long rest"
	},
	autoSelectExtrachoices : []
}
CreateClassFeatureVariant("ranger", "natural explorer", "Deft Explorer (ua)", UACFV_Deft_Explorer);
var UACFV_Favored_Foe = {
	name : "Favored Foe",
	source : [["UA:CFV", 7]],
	description : desc([
		"I know Hunter's Mark and it doesn't count against the number of spells I can know",
		"I can cast it a number of times without using a spell slot or requiring concentration",
		"I can also use a spell slot to cast it as normal, but then it does require concentration"
	]),
	spellcastingBonus : {
		name : "Favored Foe",
		spells : ["hunter's mark"],
		selection : ["hunter's mark"],
		firstCol : "Sp"
	},
	usages : "Wisdom modifier per ",
	usagescalc : "event.value = Math.max(1, What('Wis Mod'));",
	recovery : "long rest",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				if ((spName === "ranger" || spName === "rangerua") && spType.indexOf("bonus") === -1) {
					if (!spList.notspells) spList.notspells = [];
					spList.notspells = spList.notspells.concat(["hunter's mark"]);
				}
			}
		]
	}
};
CreateClassFeatureVariant("ranger", "favored enemy", "Favored Foe (ua)", UACFV_Favored_Foe);
// Now some easier alternatives/enhancements
// [dupl_start] the same as in Tasha's Cauldron of Everything
if (!SourceList.T) {
	AddFightingStyle(["ranger"], "Druidic Warrior", {
		name : "Druidic Warrior Fighting Style",
		source : [["T", 57], ["UA:CFV", 7]],
		description : desc([
			"I learn two druid cantrips that count as ranger spells for me and use Wis for spellcasting",
			"Whenever I gain a ranger level, I can swap one of these for another druid cantrip"
		]),
		spellcastingBonus : {
			name : "Druidic Warrior",
			"class" : "druid",
			level : [0, 0],
			times : 2
		}
	});
} // dupl_end
// The enhancement option for fighting styles has to be added to each class separately
var UACFV_Ranger_Martial_Versatility = {
	name : "Martial Versatility",
	extraname : "Optional Ranger 2",
	source : [["UA:CFV", 12]],
	description : "\n   Whenever I gain a ranger level, I can swap a fighting style I know for another I'm allowed"
};
AddFeatureChoice(ClassList.ranger.features.spellcasting, true, "Martial Versatility (ua)", UACFV_Ranger_Martial_Versatility, "Optional 2nd-level ranger features");
var UACFV_Ranger_Expanded_Spell_List = {
	name : "Expanded Ranger Spell List",
	extraname : "Optional Ranger 2",
	source : [["UA:CFV", 7]],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if ((spName !== "ranger" && spName !== "rangerua") || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["entangle", "searing smite", "aid", "enhance ability", "gust of wind", "magic weapon", "warding bond", "blinding smite", "meld into stone", "revivify", "tongues", "death ward", "dominate beast", "awaken", "greater restoration"]);
			},
			"This alternative class feature enhancement expands the spell list of the ranger class."
		]
	}
};
AddFeatureChoice(ClassList.ranger.features.spellcasting, true, "Expanded Spell List (ua)", UACFV_Ranger_Expanded_Spell_List, "Optional 2nd-level ranger features");
var UACFV_Ranger_Spell_Versatility = {
	name : "Spell Versatility",
	extraname : "Optional Ranger 2",
	source : [["UA:CFV", 8]],
	description : "\n   When I finish a long rest, I can replace a ranger spell I know with another of the same level"
};
AddFeatureChoice(ClassList.ranger.features.spellcasting, true, "Spell Versatility (ua)", UACFV_Ranger_Spell_Versatility, "Optional 2nd-level ranger features");
// [dupl_start] the same as in Tasha's Cauldron of Everything
if (!SourceList.T) {
	var TCoE_Ranger_Spellcasting_Focus = {
		name : "Spellcasting Focus",
		extraname : "Optional Ranger 2",
		source : [["T", 57], ["UA:CFV", 8]],
		description : "\n   I can use a druidic focus as a spellcasting focus for my ranger spells"
	};
	AddFeatureChoice(ClassList.ranger.features.spellcasting, true, "Spellcasting Focus", TCoE_Ranger_Spellcasting_Focus, "Optional 2nd-level ranger features");
} // dupl_end
var UACFV_Primal_Awareness = {
	name : "Primal Awareness",
	source : [["UA:CFV", 8]],
	description : desc([
		"I get bonus spells known, which do not count against the number of spells I can know",
		"In addition, I can cast each once per long rest without expending a spell slot"
	]),
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Remove the bonus spells from the normally selectable list
				if ((spName === "ranger" || spName === "rangerua") && spType.indexOf("bonus") === -1) {
					if (!spList.notspells) spList.notspells = [];
					spList.notspells = spList.notspells.concat(["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"]);
				}
			},
			"I know the following spells, without them counting towards the maximum number of spells I can know: Detect Magic, Speak with Animals, Beast Sense, Locate Animals or Plants, Speak with Plants, Locate Creature, and Commune with Nature."
		]
	},
	spellcastingBonus : {
		name : "Primal Awareness",
		spells : ["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"],
		selection : ["detect magic", "speak with animals", "beast sense", "locate animals or plants", "speak with plants", "locate creature", "commune with nature"],
		firstCol : "oncelr",
		times : levels.map(function (n) {
			return n < 5 ? 2 : n < 9 ? 4 : n < 13 ? 5 : n < 17 ? 6 : 7;
		})
	}
};
CreateClassFeatureVariant("ranger", "primeval awareness", "Primal Awareness (ua)", UACFV_Primal_Awareness);
var UACFV_Fade_Away = {
	name : "Fade Away",
	source : [["UA:CFV", 8]],
	description : desc([
		"As a bonus action, I can become invisible along with any equipment I'm wearing/carrying",
		"This invisibility lasts until the start of my next turn"
	]),
	action : [["bonus action", ""]],
	usages : 1,
	recovery : "short rest"
};
CreateClassFeatureVariant("ranger", "hide in plain sight", "Fade Away (ua)", UACFV_Fade_Away);
if (ClassSubList["ranger-beast master"]) {
	AddFeatureChoice(ClassSubList["ranger-beast master"].features["subclassfeature3"], true, "Beast of the Air/Earth (ua)", {
		name : "Beast of the Air/Earth",
		extraname : "Optional Beast Master 3",
		source : [["UA:CFV", 8]],
		description : desc([
			"My ranger's companion can be a primal beast whose lineage stretches back to the beginning",
			"This beast of the air or earth takes the form of a regular animal, but has different abilities",
			"Its hit points total is equal to its Con mod + my Wis mod + 5 times my ranger level",
			"As a bonus action, I can command it to make one attack or take the Hide action",
			"If it dies, I can revive it within 1 hour as an action where I expend a spell slot and touch it",
			"It then returns to life with all its hit points after 1 minute"
		]),
		action : [["bonus action", "Command Beast of the Air/Earth"], ["action", "Revive Beast of the Air/Earth"]],
		creaturesAdd : [["Beast of the Air", true], ["Beast of the Earth", true]],
		creatureOptions : [{
			name : "Beast of the Air",
			source : [["UA:CFV", 8]],
			size : 4,
			type : "Beast",
			alignment : "Neutral",
			ac : 13,
			hp : 6,
			hd : [1, 6],
			hdLinked : ["ranger", "spell-less ranger"],
			speed : "10 ft, fly 60 ft",
			scores : [6, 16, 13, 8, 14, 11],
			saves : ["", 5, 3, "", 4, ""],
			skills : {
				"perception" : 4,
				"stealth" : 5
			},
			senses : "Darkvision 60 ft",
			passivePerception : 14,
			languages : "understands the languages of its master (me)",
			challengeRating : "1/4",
			proficiencyBonus : 2,
			attacksAction : 1,
			attacks : [{
				name : "Shred",
				ability : 2,
				damage : [1, 6, "slashing"],
				range : "Melee (5 ft)"
			}],
			features : [{
				name : "Ready Companion",
				description : "As a bonus action, I can command the beast to make its shred attack or to Hide."
			}, {
				name : "Primal Rebirth",
				description : "If the beast has died within the last hour, I can use my action to touch it and expend a spell slot of 1st level or higher. The beast returns to life after 1 minute with all its hit points restored."
			}],
			traits : [{
				name : "Flyby",
				description : "The beast doesn't provoke opportunity attacks when it flies out of an enemy's reach."
			}],
			calcChanges : {
				hp : function (totalHD, HDobj, prefix) {
					if (!classes.known.ranger && !classes.known["spell-less ranger"]) return;
					var wisMod = Number(What('Wis Mod'));
					var rngrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known["spell-less ranger"].level;
					var rngrLvl5 = 5 * rngrLvl;
					HDobj.alt.push(HDobj.conMod + wisMod + rngrLvl5);
					HDobj.altStr.push(" = " + HDobj.conMod + " from its Constitution modifier\n + " + wisMod + " from its master's Wisdom modifier\n + 5 \xD7 " + rngrLvl + " from five times its master's ranger level (" + rngrLvl5 + ")");
				},
				setAltHp : true,
				hpForceRecalc : true
			},
			companionApply : "companion"
		}, {
			name : "Beast of the Earth",
			source : [["UA:CFV", 9]],
			size : 3,
			type : "Beast",
			alignment : "Neutral",
			ac : 12,
			hp : 7,
			hd : [1, 8],
			hdLinked : ["ranger", "spell-less ranger"],
			speed : "40 ft, climb or swim 40 ft",
			scores : [14, 14, 15, 8, 14, 11],
			saves : ["", 4, 4, "", 4, ""],
			skills : {
				"perception" : 4,
				"stealth" : 4
			},
			senses : "Darkvision 60 ft",
			passivePerception : 14,
			languages : "understands the languages of its master (me)",
			challengeRating : "1/4",
			proficiencyBonus : 2,
			attacksAction : 1,
			attacks : [{
				name : "Maul",
				ability : 1,
				damage : [1, 6, "slashing"],
				range : "Melee (5 ft)",
				description : "If used after moving 20 ft straight in the same round, see Charge trait"
			}],
			features : [{
				name : "Movement Mode",
				description : "When I bond with the beast, I choose wether it has a climb speed or a swim speed."
			}, {
				name : "Ready Companion",
				description : "As a bonus action, I can command the beast to make its shred attack or to Hide."
			}, {
				name : "Primal Rebirth",
				description : "If the beast has died within the last hour, I can use my action to touch it and expend a spell slot of 1st level or higher. The beast returns to life after 1 minute with all its hit points restored."
			}],
			traits : [{
				name : "Charge",
				description : "If the beast moves at least 20 ft straight toward a target and then hits it with a maul attack on the same turn, the target takes an extra 1d6 slashing damage. If the target is a creature, it must succeed on a Strength saving throw against my spell save DC or be knocked prone."
			}],
			calcChanges : {
				hp : function (totalHD, HDobj, prefix) {
					if (!classes.known.ranger && !classes.known["spell-less ranger"]) return;
					var wisMod = Number(What('Wis Mod'));
					var rngrLvl = classes.known.ranger ? classes.known.ranger.level : classes.known["spell-less ranger"].level;
					var rngrLvl5 = 5 * rngrLvl;
					HDobj.alt.push(HDobj.conMod + wisMod + rngrLvl5);
					HDobj.altStr.push(" = " + HDobj.conMod + " from its Constitution modifier\n + " + wisMod + " from its master's Wisdom modifier\n + 5 \xD7 " + rngrLvl + " from five times its master's ranger level (" + rngrLvl5 + ")");
				},
				setAltHp : true,
				hpForceRecalc : true
			},
			companionApply : "companion"
		}]
	}, "Optional 3rd-level beast master features");
}

// Add the Ranger alternative class features also to the Revised Ranger, if it exists
if (ClassList["rangerua"]) {
	CreateClassFeatureVariant("rangerua", "natural explorer", "Deft Explorer (ua)", UACFV_Deft_Explorer);

	// Add Favored Foe as an alternative choice (can't be done by automation because of choices) and add "Favored Foe" variant option
	// Move some attributes from the main object to the favored enemy choice objects
	['additional', 'languageProfs', 'calcChanges'].forEach( function(attr) {
		var fea = ClassList.rangerua.features["favored enemy"];
		if (!fea[attr]) return;
		// Move the attribute to each of the choices
		for (var i = 0; i < fea.choices.length; i++) {
			var aCh = fea[fea.choices[i].toLowerCase()];
			if (aCh.source) continue; // don't do options that are not part of the original entry (which don't have a source)
			aCh[attr] = fea[attr];
		}
		// Now delete the attributes from the parent object
		delete fea[attr];
	});
	// Now add the alternative class feature as another choice
	AddFeatureChoice(ClassList.rangerua.features["favored enemy"], false, "[alternative feature] Favored Foe (ua)", UACFV_Favored_Foe);

	// The enhancement option for fighting styles has to be added to each class separately
	AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Martial Versatility (ua)", UACFV_Ranger_Martial_Versatility, "Optional 2nd-level ranger features");
	AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Expanded Spell List (ua)", UACFV_Ranger_Expanded_Spell_List, "Optional 2nd-level ranger features");
	AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Spell Versatility (ua)", UACFV_Ranger_Spell_Versatility, "Optional 2nd-level ranger features");
	// [dupl_start] the same as in Tasha's Cauldron of Everything
	if (!SourceList.T) {
		AddFeatureChoice(ClassList.rangerua.features.spellcasting, true, "Spellcasting Focus", TCoE_Ranger_Spellcasting_Focus, "Optional 2nd-level ranger features");
	} // dupl_end
	CreateClassFeatureVariant("rangerua", "primeval awareness", "Primal Awareness (ua)", UACFV_Primal_Awareness);
	CreateClassFeatureVariant("rangerua", "hide in plain sight", "Fade Away (ua)", UACFV_Fade_Away);
}

// Rogue alternative class feature enhancement
AddFeatureChoice(ClassList.rogue.features["cunning action"], true, "Aim", {
	name : "Cunning Action: Aim",
	source : ["UA:CFV", 9],
	description : desc([
		"I can also use my cunning action bonus action to carefully aim my next attack",
		"If I don't move in my turn, I give myself adv. on my next attack in the current turn",
		"After I use cunning action to aim, my speed is 0 until the end of the current turn"
	])
}, "Cunning Action Enhancement");

// Sorcerer alternative class features and enhancements
AddFeatureChoice(ClassList.sorcerer.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Sorcerer Spell List",
	source : ["UA:CFV", 9],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "sorcerer" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["primal savagery", "grease", "protection from evil and good", "flame blade", "flaming sphere", "vampiric touch", "fire shield", "flesh to stone", "demiplane", "foresight"]);
			},
			"This alternative class feature enhancement expands the spell list of the sorcerer class."
		]
	}
}, "Sorcerer Spellcasting Enhancement");
AddFeatureChoice(ClassList.sorcerer.features.spellcasting, true, "Spell Versatility", {
	name : "Spell Versatility",
	source : ["UA:CFV", 10],
	description : "\n   After a long rest, I can swap a sorcerer cantrip/spell I know for another of the same level"
}, "Sorcerer Spellcasting Enhancement");
// Font of Magic options
AddFeatureChoice(ClassList.sorcerer.features["font of magic"], true, "Empowering Reserves", {
	name : "Empowering Reserves",
	source : ["UA:CFV", 10],
	description : " [2 sorcery points]\n   When I make an ability check on my turn, I can gain advantage on the check"
}, "Font of Magic Enhancement");
AddFeatureChoice(ClassList.sorcerer.features["font of magic"], true, "Imbuing Touch", {
	name : "Imbuing Touch",
	source : ["UA:CFV", 10],
	description : " [2 sorcery points]\n   As an action, I can touch a nonmagical weapon and make it count as magical for 1 minute",
	action : [["action", " (2 sorcery points)"]]
}, "Font of Magic Enhancement");
AddFeatureChoice(ClassList.sorcerer.features["font of magic"], true, "Sorcerous Fortitude", {
	name : "Sorcerous Fortitude",
	source : ["UA:CFV", 10],
	description : " [1+ sorcery points]\n   As an action, I can gain 1d4 temporary hit points per sorcery point I spend",
	action : [["action", " (1+ sorcery points)"]]
}, "Font of Magic Enhancement");
// Metamagic options
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Elemental Spell", {
	name : "Elemental Spell",
	source : ["UA:CFV", 10],
	description : " [1 sorcery point]" + desc([
		"I can change the damage type of a spell to acid, cold, fire, lightning, or thunder instead",
		"I can only do this if the spell originally deals one of these damage types"
	])
});
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Seeking Spell", {
	name : "Seeking Spell",
	source : ["UA:CFV", 10],
	description : " [1 sorcery point]" + desc([
		"I can ignore half- and three-quarters cover for the one spell I'm casting",
		"This applies both to my spell attack rolls as to the Dexterity saving throws of the targets"
	])
});
AddFeatureChoice(ClassList.sorcerer.features["metamagic"], true, "Unerring Spell", {
	name : "Unerring Spell",
	source : ["UA:CFV", 10],
	description : " [2 sorcery points]" + desc([
		"If I make an attack roll for a spell and miss, I can use this to reroll the attack once",
		"I can use unerring spell even if I already used another metamagic option for the spell"
	])
});

// Warlock alternative class features and enhancements
AddFeatureChoice(ClassList.warlock.features["pact magic"], true, "Spell Versatility", {
	name : "Spell Versatility",
	source : ["UA:CFV", 10],
	description : "\n   After a long rest, I can swap a warlock cantrip or spell I know for another of the same level"
}, "Pact Magic Enhancement");
AddFeatureChoice(ClassList.warlock.features["pact magic"], true, "Expanded Spell List", {
	name : "Expanded Warlock Spell List",
	source : ["UA:CFV", 10],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "warlock" || (spType.indexOf("bonus") !== -1 && (!spList["class"] || spList["class"] !== "warlock"))) return;
				spList.extraspells = spList.extraspells.concat(["thunderwave", "knock", "animate dead", "life transference", "greater invisibility", "phantasmal killer", "mislead", "modify memory", "planar binding", "teleportation circle", "create homunculus", "magic jar", "project image", "abi-dalzim's horrid wilting", "gate", "shapechange", "weird"]);
			},
			"This alternative class feature enhancement expands the spell list of the warlock class."
		]
	}
}, "Pact Magic Enhancement");
// New Eldritch Invocations
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Bond of the Talisman (prereq: level 12 warlock, Pact of the Talisman)", {
	name : "Bond of the Talisman",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Talisman]",
	description : desc([
		"As an action, I can teleport to the unoccupied space closest to the wearer of my talisman",
		"The talisman's wearer can do the same to teleport to me; Only works if both on same plane"
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 12 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the talisman';
	},
	action : [["action", ""]]
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Chain Master's Fury (prereq: level 9 warlock, Pact of the Chain)", {
	name : "Chain Master's Fury",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Chain]",
	description : "\n   As a bonus action, I can command my familiar to make one attack",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the chain';
	},
	action : [["bonus action", ""]]
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Eldritch Armor (prereq: Pact of the Blade)", {
	name : "Eldritch Armor",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Blade]",
	description : desc([
		"As an action, I can touch an unattended suit of armor and instantly don it",
		"I am proficient with this suit of armor until it is removed"
	]),
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the blade';
	},
	action : [["action", ""]]
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Eldritch Mind (prereq: Pact of the Tome)", {
	name : "Eldritch Mind",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Tome]",
	description : "\n   I have advantage on my Constitution saving throws to maintain concentration on a spell",
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome';
	},
	savetxt : { text : "Adv. on Con (Concentration) saves" }
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Far Scribe (prereq: level 5 warlock, Pact of the Tome)", {
	name : "Far Scribe",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Tome]",
	description : desc([
		"My book of shadows has a new page; As an action, a creature can write its name on it",
		"This page can hold my Cha mod (min 1) in creature names; I can remove one as an action",
		"I can cast Sending without a spell slot or material components, targeting one on the page",
		"Instead of saying the message, I write it on the page and any reply appears there as well",
		"This writing disappears after 1 minute; The target still hears the message in their mind"
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 5 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome';
	},
	action : [["action", " (erase name)"]],
	spellcastingBonus : {
		name : "Far Scribe",
		spells : ["sending"],
		selection : ["sending"],
		firstCol : "atwill"
	},
	spellChanges : {
		"sending" : {
			components : "V,S",
			compMaterial : "",
			description : "Send 25 word message to crea named in book of shadows; it recognizes me and can respond 25 words",
			changes : "By using Far Scribe, I can cast Sending without using a spell slot or material components, but only to target one of the creatures that wrote their name in my book of shadows. Instead of speaking the message, I write it in my book and any response appears there as well, lasting for 1 minute. The target still hears the message in their mind."
		}
	}
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Gift of the Protectors (prereq: level 9 warlock, Pact of the Tome)", {
	name : "Gift of the Protectors",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Tome]",
	description : desc([
		"My book of shadows has a new page; As an action, a creature can write its name on it",
		"This page can hold my Cha mod (min 1) in creature names; I can remove one as an action",
		"If a creature whose name is on the page drops to 0 HP, it magically drops to 1 HP instead",
		"This doesn't work if the creature would be killed outright"
	]),
	prereqeval : function(v) {
		return classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the tome';
	},
	action : [["action", " (erase name)"]],
	usages : 1,
	recovery : "long rest"
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Investment of the Chain Master (prereq: Pact of the Chain)", {
	name : "Investment of the Chain Master",
	source : ["UA:CFV", 11],
	submenu : "[improves Pact of the Chain]",
	description : desc([
		"When I cast Find Familiar, the summoned create has additional benefits:",
		"\u2022 It gains a flying or swimming speed of 40 ft (my choice at casting)",
		"\u2022 It no longer needs to breathe",
		"\u2022 Its weapon attacks are considered magical for overcoming immunities and resistances",
		"\u2022 If it forces a creature to make a saving throw, it uses my spell save DC",
		"Note that the automation will only add this to current familiars and on a level change"
	]),
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the chain';
	},
	changeeval : function(lvlA) {
		var AScompA = isTemplVis('AScomp') ? What('Template.extras.AScomp').split(',') : false;
		if (!AScompA) return;
		var aStr = "My Investment of the Chain Master eldritch invocation grants my familiar the following:"+
		"\n\u2022 The familiar gains a flying or swimming speed of 40 ft (my choice at casting)"+
		"\n\u2022 The familiar no longer needs to breathe"+
		"\n\u2022 Its weapon attacks are considered magical for overcoming immunities and resistances"+
		"\n\u2022 If the familiar forces a creature to make a saving throw, it uses my spell save DC";
		var aFnc = !lvlA[1] ? RemoveString : AddString;
		for (var a = 1; a < AScompA.length; a++) {
			if (What(AScompA[a] + 'Comp.Type') == "Familiar") {
				aFnc(AScompA[a] + "Cnote.Left", aStr, true);
			}
		}
	}
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Protection of the Talisman (prereq: level 9 warlock, Pact of the Talisman)", {
	name : "Protection of the Talisman",
	source : ["UA:CFV", 12],
	submenu : "[improves Pact of the Talisman]",
	description : "\n   The wearer of my talisman adds 1d4 to saving throw rolls in which they lack proficiency",
	prereqeval : function(v) {
		return classes.known.warlock.level >= 9 && GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the talisman';
	},
	savetxt : { text : ["+1d4 to nonproficient saves"] }
});
AddFeatureChoice(ClassList.warlock.features["eldritch invocations"], true, "Rebuke of the Talisman (prereq: Pact of the Talisman)", {
	name : "Rebuke of the Talisman",
	source : ["UA:CFV", 12],
	submenu : "[improves Pact of the Talisman]",
	description : desc([
		"As a reaction when the wearer of my talisman is hit, I deal damage and push the attacker",
		"To be able to do this, I have to see the attacker and it has to be within 30 ft of me",
		"I deal my Cha mod in psychic damage (min 1) and push it 10 ft away from the talisman"
	]),
	prereqeval : function(v) {
		return GetFeatureChoice('class', 'warlock', 'pact boon') == 'pact of the talisman';
	},
	action : [["reaction", ""]]
});
// Pact Boon option
AddFeatureChoice(ClassList.warlock.features["pact boon"], false, "Pact of the Talisman", {
	name : "Pact of the Talisman",
	source : ["UA:CFV", 12],
	description : desc([
		"The wearer of this amulet adds 1d4 to checks with skills in which they lack proficiency",
		"I can give the talisman to others to use; The talisman turns to ash when I die",
		"If I lose my talisman, I can preform an 1-hour ceremony to gain a replacement",
		"This ceremony destroys the previous amulet and can be done during a short or long rest"
	])
});

// Wizard alternative class features and enhancements
AddFeatureChoice(ClassList.wizard.features.spellcasting, true, "Cantrip Versatility", {
	name : "Cantrip Versatility",
	source : ["UA:CFV", 12],
	description : "\n   Whenever I gain a wizard level, I can replace a wizard cantrip I know with another"
}, "Wizard Spellcasting Enhancement");
AddFeatureChoice(ClassList.wizard.features.spellcasting, true, "Expanded Spell List", {
	name : "Expanded Wizard Spell List",
	source : ["UA:CFV", 12],
	description : "",
	calcChanges : {
		spellList : [
			function(spList, spName, spType) {
				// Stop this is not the class' spell list or if this is for a bonus spell entry
				if (spName !== "wizard" || spType.indexOf("bonus") !== -1) return;
				spList.extraspells = spList.extraspells.concat(["augury", "enhance ability", "speak with dead", "divination"]);
			},
			"This alternative class feature enhancement expands the spell list of the wizard class."
		]
	}
}, "Wizard Spellcasting Enhancement");
