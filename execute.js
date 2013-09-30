var debugBox = document.getElementById("debug_feedback");
function updateDebugBox() {
	debugBox.innerHTML = pracMan.traceLog;
}

var ManagerData = new pracMan.pracManagerDAT(pracMan.version);
var Manager = new pracMan.pracManagerSVC(ManagerData, "pracManDisplay");

/*
if (Manager.activeChar) {
	var myDebug = JSON.stringify(Manager.activeChar.d);
	myDebug = myDebug.replace(/,/g, ",\n");
	debugBox.innerHTML = pracMan.traceLog + "\n\n" + myDebug;
}

*/