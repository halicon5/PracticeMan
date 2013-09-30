pracMan.panelSessionsUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};
	

	this.buildHeaders();
	
	//this.subUIs.traits = new pracMan.traitHCSetUI(aUI, aManager, this.elements.traitsBox, "traits");
	//this.subUIs.HCs = new pracMan.traitHCSetUI(aUI, aManager, this.elements.HCBox, "HCs");

	this.tabLink = document.getElementById(pracMan.CSSname + "editSessionsTabLink");
	if (this.tabLink) {
		this.tabLink.JSUI = this;
	}
}

	pracMan.panelSessionsUI.prototype.updateDisplay = function() {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.panelSessionsUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	pracMan.panelSessionsUI.prototype.buildHeaders = function() {

		var traitHeader = createSuperElement("h4", ["innerHTML", "Character Traits"] );
		var HCHeader = createSuperElement("h4", ["innerHTML", "Heroic Characteristics"] );

		var traits = createSuperElement("div", ["class", pracMan.CSSname + "editorGroup"]);
		var HCs= createSuperElement("div", ["class", pracMan.CSSname + "editorGroup"]);

		this.elements.traitsBox = document.createElement("div");
		this.elements.HCBox = document.createElement("div");

		traits.appendChild(this.elements.traitsBox);
		this.elements.traitsBox.appendChild(traitHeader);
		
		HCs.appendChild(this.elements.HCBox);
		this.elements.HCBox.appendChild(HCHeader);
		
		appendChildren(this.panel, traits, HCs);
	}