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
			var safename = pracMan.safe_name(aRepDAT.name);
			this.d.list[safename] = aRepDAT;

		} else {
			alert("Repertoire not added");
		}
	}

	
	pracMan.repertoireCollectionSVC.prototype.deleteRepertoire = function(aRepName) {
		if (pracMan.debug) pracMan.log("[pracMan.repertoireCollectionSVC.prototype.deleteRepertoire = function(" + aRepName + ")");
		var safename = pracMan.safe_name(aRepDAT.name);

		delete this.d.list[skillName];
		delete this.list[skillName];

		this.resort();
	}

	pracMan.repertoireCollectionSVC.prototype.resort() = {
		this.sortOrder = new Array();

		// Create code to sort the info.
	}