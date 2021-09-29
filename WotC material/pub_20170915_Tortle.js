var iFileName = "pub_20170915_Tortle.js";
RequiredSheetVersion(13);
// This file adds the Tortle Race from the Tortle Package from Extra Life to MPMB's Character Record Sheet

// Define the source
SourceList.TP={
	name : "Tortle Package",
	abbreviation : "TP",
	group : "Extra Life",
	url : "https://dnd.wizards.com/products/tabletop-games/digital-only-rpg-products/tortle-package",
	date : "2017/09/15"
};

// The Tortle race
RaceList.tortle = {
	regExpSearch : /tortle/i,
	name : "Tortle",
	source : [["TP", 4], ["W", 181]],
	plural : "Tortles",
	size : 3,
	speed : {
		walk : { spd : 30, enc : 20 }
	},
	languageProfs : ["Common", "Aquan"],
	skills : ["Survival"],
	armorOptions : {
		regExpSearch : /^(?=.*tortle)(?=.*shell).*$/i,
		name : "Tortle's Shell",
		source : [["TP", 4], ["W", 181]],
		ac : 17,
		dex : -10
	},
	armorAdd : "Tortle's Shell",
	weaponOptions : {
		baseWeapon : "unarmed strike",
		regExpSearch : /^(?=.*tortle)(?=.*\bclaws?\b).*$/i,
		name : "Tortle's Claws",
		source : [["TP", 4], ["W", 181]],
		damage : [1, 4, "slashing"]
	},
	weaponsAdd : ["Tortle's Claws"],
	age : " reach adulthood by the age of 15 and live an average of 50 years",
	height : " stand between 5 and 6 feet tall (4'10\" + 2d8\")",
	weight : " weigh around 450 lb (400 + 2d8 \xD7 2d4 lb)",
	heightMetric : " stand between 1,5 and 1,8 metres tall (150 + 5d8 cm)",
	weightMetric : " weigh around 190 kg (180 + 5d8 \xD7 4d4 / 10 kg)",
	scores : [2, 0, 0, 0, 1, 0],
	features : {
		"shell defense" : {
			name : "Shell Defense",
			minlevel : 1,
			action : ["action", ""]
		}
	},
	trait : "Tortle (+2 Strength, +1 Wisdom)\nClaws: I can use my claws to make unarmed strikes dealing 1d4 slashing damage.\nHold Breath: I can hold my breath for up to 1 hour at a time.\nNatural Armor: I have a base AC of 17, but I can't add my Dex to it or wear armour.\nShell Defense: As an action, I can withdraw into my shell and gain +4 AC and adv. on Str and Con saves, but I count as prone, have speed 0, have disadv. on Dex saves, and can't take reactions. The only action I can take is a bonus action to emerge from the shell."
};
