pracMan.sessionDAT = function(aSessDAT) {
	this.name = (aSessDAT.name) ? aSessDAT.name : "";	// name will always be a date YYYY/MM/DD

	if ( aSessDAT.instances ) {
		this.instances = ( isArray(aSessDAT.instances) ) ? aSessDAT.instances : new Array();
	}
	else {
		this.instances = new Array();
	}

	this.startTime = (aSessDAT.startTime) ? aSessDAT.startTime : "";
	this.endTime = (aSessDAT.endTime) ? aSessDAT.endTime : "";
	this.userRating = (aSessDAT.userRating) ? aSessDAT.userRating : 5;
	this.notes = (aSessDAT.notes) ? aSessDAT.notes : "";

	this.jsCLASSNAME = "pracMan.sessionDAT";
//	this.jsOBJNAME = this.d.name;
}