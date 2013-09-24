pracMan.repertoireDAT = function(aRepDAT) {
	this.name = (aRepDAT.name) ? aRepDAT.name : "";
	this.composer = (aRepDAT.composer) ? aRepDAT.composer : "";
	this.repType = (aRepDAT.repType) ? aRepDAT.repType : "";
	this.notes = (aRepDAT.notes) ? aRepDAT.notes : "";
	this.genre = (aRepDAT.genre) ? aRepDAT.genre : "";
	this.targetBPM = (aRepDAT.targetBPM) ? aRepDAT.targetBPM : "";

	this.jsCLASSNAME = "pracMan.repertoireDAT";
//	this.jsOBJNAME = this.d.name;
}