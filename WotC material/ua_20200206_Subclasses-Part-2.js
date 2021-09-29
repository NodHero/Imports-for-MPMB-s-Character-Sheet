var iFileName = "ua_20200206_Subclasses-Part-2.js";
RequiredSheetVersion("13.0.7");
// This file adds the content from the Unearthed Arcana 2020: Subclasses, Part 2 article to MPMB's Character Record Sheet

// Define the source
SourceList["UA:SP2"] = {
	name : "Unearthed Arcana: Subclasses, Part 2",
	abbreviation : "UA:SP2",
	group : "Unearthed Arcana",
	url : "https://media.wizards.com/2020/dnd/downloads/UA2020_02_06_Subclasses2.pdf",
	date : "2020/02/06"
};

// Add a subclass for the Bard and the functionality for its Dancing Item
AddSubClass("bard", "college of creation-ua", {
	regExpSearch : /^(?=.*(college|bard|minstrel|troubadour|jongleur))(?=.*creation).*$/i,
	subname : "College of Creation",
	source : [["UA:SP2", 1]],
	features : {
		"subclassfeature3" : {
			name : "Note of Potential",
			source : [["UA:SP2", 1]],
			minlevel : 3,
			description : desc([
				"I can also grant a note of potential to whomever I give a bardic inspiration die",
				"This tiny, invulnerable object orbits in 5 ft; It enhances the use of the inspiration die:",
				"\u2022 Note of Destruction (used for attack roll): others within 5 ft must make a Con save",
				"  If failed, they take the die roll in thunder damage; This uses my spell save DC",
				"\u2022 Note of Protection (used for save): Grants temp HP equal to the roll + my Cha mod",
				"\u2022 Note of Ingenuity (used for check): Roll the die twice and choose which result to use"
			])
		},
		"subclassfeature6" : {
			name : "Animating Performance",
			source : [["UA:SP2", 1]],
			minlevel : 6,
			description : desc([
				"As an action, I can animate a Large or smaller nonmagical item I can see within 30 ft",
				"It lasts for 1 hour or until it has 0 HP; I control it and it acts on my initiative, after me",
				"Unless I use a bonus action to command it, it only takes the Dodge action on its turn",
				"When I use bardic inspiration, I can command the item as part of the same bonus action",
				"I can't have multiple at once; Select \"Dancing Item\" on a companion page for its stats",
				"I can do this once per long rest, or by expending a 3rd-level or higher spell slot (SS 3+)"
			]),
			action : [["action", ""], ["bonus action", "Command Dancing Item"]],
			usages : 1,
			recovery : "long rest",
			altResource : "SS 3+",
			creaturesAdd : [["Dancing Item"]],
			creatureOptions : [{
				name : "Dancing Item",
				source : [["UA:SP2", 2]],
				size : 4,
				type : "Construct",
				alignment : "Neutral",
				ac : 16,
				hp : 33,
				hd : [],
				speed : "40 ft",
				scores : [18, 12, 16, 4, 10, 6],
				damage_immunities : "poison",
				condition_immunities : "charmed, exhaustion, poisoned, frightened",
				passivePerception : 10,
				senses : "Darkvision 60 ft",
				languages : "understands the languages of its creator but can't speak",
				challengeRating : "1",
				proficiencyBonus : 2,
				attacksAction : 1,
				attacks : [{
					name : "Force-Empowered Slam",
					ability : 6,
					damage : [1, 10, "force"],
					range : "Melee (5 ft)",
					modifiers : ["", "oCha"],
					abilitytodamage : false,
					useSpellMod : "bard"
				}],
				features : [{
					name : "Creator",
					description : "The item obeys the commands of its creator and uses its creator's spell attack modifier for its attack rolls. It takes its turn immediately after its creator, on the same initiative count. It can move and take reactions on its own, but only takes the Dodge action on its turn unless its creator takes a bonus action to command to do otherwise, in which case it can only take the Dash, Force-Empowered Slam (and possibly Endless Waltz), Disengage, Help, Hide, or Search action."
				}],
				actions : [{
					name : "Immutable Form",
					description : "The item is immune to any spell or effect that would alter its form."
				}, {
					name : "Endless Waltz",
					description : "Immediately after the item makes a slam attack, it can take the Dodge action as a bonus action."
				}],
				header : 'Animated',
				calcChanges : {
					hp : function (totalHD, HDobj, prefix) {
						if (!classes.known.bard) return;
						var chaMod = Number(What('Cha Mod'));
						var brdLvl = classes.known.bard.level;
						var brdLvl5 = 5 * brdLvl;
						HDobj.alt.push(HDobj.conMod + chaMod + brdLvl5);
						HDobj.altStr.push(" = " + HDobj.conMod + " from its Constitution modifier\n + " + chaMod + " from its creator's Charisma modifier\n + 5 \xD7 " + brdLvl + " from five times its creator's bard level (" + brdLvl5 + ")");
					},
					setAltHp : true,
					hpForceRecalc : true
				}
			}]
		},
		"subclassfeature14" : {
			name : "Performance of Creation",
			source : [["UA:SP2", 2]],
			minlevel : 14,
			description : levels.map(function (n) {
				return desc([
					"As an action, I create a Large or smaller nonmagical item in an empty space in 10 ft",
					"Max " + (20 * n) + " gp value; I can't have multiple, creating more makes the first one vanish",
					"It vanishes when my next turn ends, unless I use my action to extend its life 1 extra turn",
					"If I sustain it for 1 minute this way, it continues to exists for my bard level in hours",
					"I can do this once per long rest, or by expending a 5th-level or higher spell slot (SS 5+)"
				]);
			}),
			action : [["action", ""]],
			usages : 1,
			recovery : "long rest",
			altResource : "SS 5+"
		}
	}
});

// Add a subclass for the Cleric
AddSubClass("cleric", "unity domain-ua", {
	regExpSearch : /^(?=.*(cleric|priest|clergy|acolyte))(?=.*unity).*$/i,
	subname : "Unity Domain",
	source : [["UA:SP2", 2]],
	spellcastingExtra : ["heroism", "shield of faith", "aid", "warding bond", "beacon of hope", "sending", "aura of purity", "guardian of faith", "greater restoration", "rary's telepathic bond"],
	features : {
		"subclassfeature1" : {
			name : "Emboldening Bond",
			source : [["UA:SP2", 3]],
			minlevel : 1,
			description : function () {
				var descr = desc([
					"As an action, I can magically bond two willing targets I can see in 30 ft (can be me)",
					"While within 30 ft of the other, a bonded target can add +d4 to a save, attack, or check",
					"This can only be added once per turn; The bond lasts for 1 hour or until I use this again",
					"I can do this once per long rest, after which I can do so by expending a spell slot (SS 1+)"
				]);
				var descr17 = descr.replace('While within 30 ft of the other', 'While on the same plane');
				return levels.map(function (n) {
					return n < 17 ? descr : descr17;
				});
			}(),
			action : [["action", ""]],
			usages : 1,
			recovery : "long rest",
			altResource : "SS 1+"
		},
		"subclassfeature2" : {
			name : "Channel Divinity: Shared Burden",
			source : [["UA:SP2", 3]],
			minlevel : 2,
			description : desc([
				"As a reaction when a creature I can see in 30 ft takes damage, I can divide that damage",
				"I then choose a number of willing creatures that I can see equal to my Wis mod (min 1)",
				"I distribute the damage over these and the original target, each taking at least 1 damage",
				"Damage resistances and vulnerabilities are only applied after the damage is distributed"
			]),
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Protective Bond",
			source : [["UA:SP2", 3]],
			minlevel : 6,
			description : desc([
				"My emboldening bond now also allows the two bonded to shield each other of damage",
				"When the other takes damage, one can use its reaction to give it resistance to all damage",
				"This resistance lasts until the end of the current turn"
			]),
			additional : levels.map(function (n) {
				return n < 6 ? "" : n < 17 ? "the bonded must be within 30 ft" : "the bonded must be on the same plane";
			})
		},
		"subclassfeature8" : {
			name : "Potent Spellcasting",
			source : [["UA:SP2", 3]],
			minlevel : 8,
			description : "\n   I add my Wisdom modifier to the damage I deal with my cleric cantrips",
			calcChanges : {
				atkCalc : [
					function (fields, v, output) {
						if (classes.known.cleric && classes.known.cleric.level > 7 && v.thisWeapon[3] && v.thisWeapon[4].indexOf('cleric') !== -1 && SpellsList[v.thisWeapon[3]].level === 0) {
							output.extraDmg += What('Wis Mod');
						};
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				],
				spellAdd : [
					function (spellKey, spellObj, spName) {
						if (spName.indexOf("cleric") == -1 || !What("Wis Mod") || Number(What("Wis Mod")) <= 0 || spellObj.psionic || spellObj.level !== 0) return;
						return genericSpellDmgEdit(spellKey, spellObj, "\\w+\\.?", "Wis");
					},
					"My cleric cantrips get my Wisdom modifier added to their damage."
				]
			}
		},
		"subclassfeature17" : {
			name : "Enduring Unity",
			source : [["UA:SP2", 3]],
			minlevel : 17,
			description : desc([
				"The 30 ft restriction no longer applies to my emboldening and protective bond features",
				"My emboldening bond now also empowers a bonded if the other is reduced to 0 HP",
				"If that happens, the bonded creature above 0 HP gains the following benefits:",
				" \u2022 Advantage on attack rolls, ability checks, and saving throws; Resistance to all damage",
				" \u2022 As an action, it can touch its bonded partner to expend and roll HD to heal",
				"These benefits lasts for 1 minute or until the downed creature regains at least 1 HP"
			])
		}
	}
});

// Add a subclass for the Sorcerer
AddSubClass("sorcerer", "clockwork soul-ua", {
	regExpSearch : /^((?=.*(sorcerer|witch))(?=.*mechanus)|(?=.*clockwork)(?=.*soul)).*$/i,
	subname : "Clockwork Soul",
	source : [["UA:SP2", 4]],
	fullname : "Clockwork Soul",
	spellcastingExtra : ["alarm", "protection from evil and good", "find traps", "heat metal", "counterspell", "glyph of warding", "arcane eye", "otiluke's resilient sphere", "animate objects", "wall of force"],
	spellcastingExtraApplyNonconform : true,
	features : {
		"subclassfeature1" : {
			name : "Clockwork Magic",
			source : [["UA:SP2", 4]],
			minlevel : 1,
			description : "\n   I learn additional spells, which do not count towards the number of spell I can know"
		},
		"subclassfeature1.1" : {
			name : "Restore Balance",
			source : [["UA:SP2", 4]],
			minlevel : 1,
			description : desc([
				"As a reaction when a creature I can see in 60 ft is about to roll a d20 with adv./disadv.,",
				"I can prevent that roll from being affected by advantage and disadvantage."
			]),
			usages : "Charisma modifier per ",
			usagescalc : "event.value = Math.max(1, What('Cha Mod'));",
			recovery : "long rest",
			action : [["reaction", ""]]
		},
		"subclassfeature6" : {
			name : "Bulwark of Law",
			source : [["UA:SP2", 4]],
			minlevel : 6,
			description : desc([
				"As an action, I can imbue a creature I can see within 30 ft with a magical ward",
				"I grant it a number of d8s equal to the number of sorcery points I expend when I do this",
				"When it takes damage, it can use its reaction to spend and roll any number of those dice",
				"The dice roll reduces the damage; The ward lasts until I finish a long rest or do this again"
			]),
			additional : "1-5 sorcery points; 1d8 per point",
			action : [["action", ""]]
		},
		"subclassfeature14" : {
			name : "Trance of Order",
			source : [["UA:SP2", 4]],
			minlevel : 14,
			description : desc([
				"As a bonus action, I can enter a state of clockwork consciousness for 1 minute",
				"While in this state, attack rolls against me can't benefit from advantage",
				"Also, I can then treat a d20 roll below 9 as a 10 for my attack rolls, checks, and saves",
				"I can do this once per long rest, or by expending a 5 sorcery points (5 SP)"
			]),
			action : [["bonus action", ""]],
			usages : 1,
			recovery : "long rest",
			altResource : "5 SP"
		},
		"subclassfeature18" : {
			name : "Clockwork Cavalcade",
			source : [["UA:SP2", 5]],
			minlevel : 18,
			description : desc([
				"As an action, I can call spirits to bring balance in a 30-ft cube originating from me",
				"Inside the cube, the intangible spirits do all the following before vanishing:",
				" \u2022 Restore up to 100 HP, divided among the creatures in the cube as I see fit",
				" \u2022 Repair all damaged objects in the cube",
				" \u2022 End spells of my choice of 6th-level or lower on objects or creatures in the cube",
				"I can do this once per long rest, or by expending a 7 sorcery points (7 SP)"
			]),
			action : [["action", ""]],
			usages : 1,
			recovery : "long rest",
			altResource : "7 SP"
		}
	}
});
