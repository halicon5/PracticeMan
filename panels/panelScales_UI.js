pracMan.panelScalesUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};
	

	this.buildHeaders();
	
	//this.subUIs.traits = new pracMan.traitHCSetUI(aUI, aManager, this.elements.traitsBox, "traits");
	//this.subUIs.HCs = new pracMan.traitHCSetUI(aUI, aManager, this.elements.HCBox, "HCs");

	this.tabLink = document.getElementById(pracMan.CSSname + "editScalesTabLink");

	if (this.tabLink) {
		this.tabLink.JSUI = this;
	}
}

	pracMan.panelScalesUI.prototype.updateDisplay = function() {
		if (pracMan.debug) pracMan.log("[CALL] pracMan.panelScalesUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	pracMan.panelScalesUI.prototype.buildHeaders = function() {

		var scaleListHead = createSuperElement("h4", ["innerHTML", "Scales"] );
		var scalePatternHead = createSuperElement("h4", ["innerHTML", "Scale Patterns"] );
		var scaleModesHead = createSuperElement("h4", ["innerHTML", "Scale Modes"]);

		var scales = createSuperElement("div", ["class", pracMan.CSSname + "editorGroup"]);
		var scalePatterns = createSuperElement("div", ["class", pracMan.CSSname + "editorGroup"]);
		var scaleModes = createSuperElement("div", ["class", pracMan.CSSname + "editorGroup"]);

		this.elements.scalesBox = document.createElement("div");
		this.elements.scalePatternsBox = document.createElement("div");
		this.elements.scaleModesBox	= document.createElement("div");

		scales.appendChild(this.elements.scalesBox);
		this.elements.scalesBox.appendChild(scaleListHead);
		
		scalePatterns.appendChild(this.elements.scalePatternsBox);
		this.elements.scalePatternsBox.appendChild(scalePatternHead);
		
		scaleModes.appendChild(this.elements.scaleModesBox);
		this.elements.scaleModesBox.appendChild(scaleModesHead);

		appendChildren(this.panel, scales, scalePatterns, scaleModes);
	}