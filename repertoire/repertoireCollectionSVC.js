pracMan.repertoireCollectionSVC = function(aRepCollectionDAT, aManagerSVC, requireManualInitialization) {
	this.d = aRepCollectionDAT;
	this.manager = aManagerSVC;
	this.name = this.d.name;
	

	this.sortOrder = [];
	this.list = {};
	if (!requireManualInitialization) {
		this.initialize();
	}

	this.jsCLASSNAME = "pracMan.repertoireCollectionSVC";
	this.jsOBJNAME = this.d.name;
}

	pracMan.repertoireCollectionSVC.prototype.destroy = pracMan.destroy;

	pracMan.repertoireCollectionSVC.prototype.initialize = function () {
		this.setChildDatAndSvcTypes();
		this.initializeData();
		this.initializeServices();	
	}
	
	pracMan.repertoireCollectionSVC.prototype.setChildDatAndSvcTypes = function(datType, svcType) {
		this.childDAT = (datType && pracMan[datType]) ? pracMan[datType] : pracMan.repertoireDAT;
		this.childSVC = (svcType && pracMan[svcType]) ? pracMan[svcType] : pracMan.repertoireSVC;		
	}

	pracMan.repertoireCollectionSVC.prototype.initializeData = function() {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.initializeData = function()");

	}
	
	
	pracMan.repertoireCollectionSVC.prototype.initializeServices = function() {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.initializeServices = function()");
	
		for (var rep in this.d.list) {
			this.list[rep] = new this.childSVC(this.d.list[rep]);
		}
	}
	
	pracMan.repertoireCollectionSVC.prototype.addRepertoire = function(aRepDAT) {	
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.addRepertoire = function()");

		if (this.validateRepertoire(aRepDAT) ) {
			alert("missing code in " + this.jsCLASSNAME);
		} else {
			alert("missing code in " + this.jsCLASSNAME);
		}
	}

	pracMan.repertoireCollectionSVC.prototype.validateRepertoire = function(aRepDAT) {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.validateRepertoire = function()");

	}



	pracMan.repertoireCollectionSVC.prototype.addElectiveSkill = function(skillName) {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.addElectiveSkill = function(" + skillName + ")");
		// check to see if the skill has been defined.
		if (this.defs[skillName]) {
			if (this.d.list && !this.d.list[skillName]) {
				this.d.list[skillName] = new this.childDAT(this.defs[skillName]);
				this.d.list[skillName].skType = 'e';
			}
		}

		if (this.d.list[skillName] && !this.list[skillName]) {
			this.list[skillName] = new this.childSVC(this.d.list[skillName], this.parChar);
		}
		
		if (this.parChar) {
			if (this.parChar.modifiers[this.name].list && this.parChar.d.modifiers[this.name].list) {
				this.parChar.modifiers.createModSet ( this.parChar.d.modifiers[this.name].list, this.parChar.modifiers[this.name].list, this.name + ".list", skillName, this.list[skillName], this.modTypeDef );
			}
		}
		
		if (this.d.list[skillName] && this.list[skillName]) {
			return true;
		}
	}
	
	pracMan.repertoireCollectionSVC.prototype.addWriteInSong = function(aRepDef) {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.addWriteInSong = function(aRepDef)");
		var errMsg = "";
		var success = true;
		var safename = (aRepDef.name) ? pracMan.safe_name(aRepDef.name) : null;

		if (safename) {
			if (this.defs[ safename ] ) {
				success = false;
				errMsg = "Repertoire piece with that name already exists.\n";
			}

			if (this.d.list[skillDef.name]) {
				if (pracMan.debug) pracMan.log("[ALERT] pracMan.repertoireCollectionSVC.prototype.addWriteInSkill = function(skillDef): Character already possesses the skill " + skillDef.name);
			}
		} 
		else {
			success = false;
			errMsg += "Skill Definition invalid.\n";
		}
		
		if (success) {
			if (!this.d.list[skillDef.name]) {
				this.d.list[skillDef.name] = new this.childDAT(skillDef);
				this.d.list[skillDef.name].skType = 'w';
			}
			this.list[skillDef.name] = new this.childSVC(this.d.list[skillDef.name], this.parChar);
			this.parChar.d.writeInSkillHash[skillDef.name] = 1;
			if (this.parChar.modifiers[this.name].list && this.parChar.d.modifiers[this.name].list) {
				this.parChar.modifiers.createModSet ( this.parChar.d.modifiers[this.name].list, this.parChar.modifiers[this.name].list, this.name + ".list", skillDef.name, this.list[skillDef.name], this.modTypeDef );
			}
		}
		else {
			alert(errMsg);
			return;
		}
	}
	
	pracMan.repertoireCollectionSVC.prototype.deleteSkill = function(skillName) {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.repertoireCollectionSVC.prototype.deleteSkill = function(" + skillName + ")");
		delete this.parChar.d.writeInSkillHash[skillName];
		delete this.d.list[skillName];
		delete this.list[skillName];
		this.parChar.modifiers.deleteModSet(this.parChar.d.modifiers[this.name].list, this.parChar.modifiers[this.name].list, skillName);
	}