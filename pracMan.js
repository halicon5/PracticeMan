var pracMan = {
	"version": "20130915a",
	"formname": "pracManInterface",
	"CSSname": "pracMan",
	"displayBox": "pracManDisplay",
	"Manager": "Manager", // used to target the Manager object in dynamically generated onClick, onChange, and other objects.
	"debug":  true,
	"traceLog": "",
	"logCalls": 0,
	"panelTabsDef": new Array( 		
									{id: "editSessions", label:"Practice Sessions"}
									,{id: "editScales", label: "Scales"}
									,{id: "editEtudes", label: "Etudes"}
									,{id: "editExercises", label: "Excercises"}
									,{id: "editSongs", label: "Repertoire"}
									),
	"storageName": "pracMan"
}; 

	var increm = 0; // generic global incrementer used during definitions

	pracMan.log = function(msg) {
		this.logCalls++;
		this.traceLog = pracMan.logCalls.toString() + ": " + msg + "\n" + this.traceLog;
	}
	
	pracMan.clearLog = function() {
		this.traceLog = "";
	}
	
	pracMan.eval = function(cmd) {
		this.log(cmd);
		try {
			eval(cmd);
		} 
		catch (exception) {
			this.log(exception);
		}
	}
	

	pracMan.safe_name = function(str) {
		if (typeof str === "string") {
			return str.replace(/[\/, -\.\'\":]/g, "_");
		} else {
			return str;
		}
	}

	/******************************************************
	User interface type functions	
	*/
	pracMan.switchTabs = function(tabSetId, panelSetId, tabId, panelId) {
		var ts = document.getElementById(tabSetId);
		var ps = document.getElementById(panelSetId);
		var t = document.getElementById(tabId);
		var p = document.getElementById(panelId);

		pracMan.log ("CALL: pracMan.switchTabs (" + tabSetId + ", " + panelSetId + ", " + tabId + ", " + panelId + ")");
		if (ts && ps && t && p) {
			for (var i = 0; i < ps.childNodes.length; i++) {
				ps.childNodes[i].style.display = 'none';
			}			
			p.style.display = 'block';
			
			for (var i = 0; i < ts.childNodes.length; i++) {
				ts.childNodes[i].className = ts.childNodes[i].className.replace( /activeTab/g, '');
				ts.childNodes[i].className = trim(ts.childNodes[i].className);
			}
			t.className = t.className + ' activeTab';
		}
		else {
			pracMan.log("ERROR:  pracMan.switchTabs = fucntion(): Either " + tabSetId + " or " + panelSetId + " does not exist.");
		}
	}
	
	
	pracMan.resetListItemClasses = function(id, classToClear) {
		var list = document.getElementById(id);
		var r = new RegExp("/" + classToClear + "/", "g");

		if (list) {
			for (var i = 0; i < list.childNodes.length; i++) {
				list.childNodes[i].className = list.childNodes[i].className.replace( classToClear, '');
				list.childNodes[i].className = trim(list.childNodes[i].className);
			}
		}
		else {
			pracMan.log("ERROR: pracMan.resetListItemClasses = function(" + id + ", " + classToClear + "): " + id + " not found.");
		}
	}

	pracMan.removeDescendents = function(node) {
		if (node && node.hasChildNodes() ) {
			while ( node.hasChildNodes() ) {
				pracMan.removeDescendents(node.firstChild);
				node.removeChild(node.firstChild);
			}
		}
	}

	pracMan.createPopupOverlay = function () {
		if ( !document.getElementById(this.CSSname + "popupOverlay") && document.getElementById(this.displayBox) ) {
			var overlay = document.createElement("div");
			overlay.setAttribute("class", this.CSSname + "popupOverlay");
			overlay.setAttribute("id", this.CSSname + "popupOverlay");
			document.getElementById(this.displayBox).appendChild(overlay);
		}
	}

	pracMan.removePopupOverlay = function () {
		if ( document.getElementById(this.CSSname + "popupOverlay") && document.getElementById(this.displayBox) ) {
			overlay = document.getElementById(this.CSSname + "popupOverlay");
			document.getElementById(this.displayBox).removeChild(overlay);
		}	
	}

	/*
	Service cleanup functions
	*/
	pracMan.destroy = function() {
		if (pracMan.debug) pracMan.log("[DESTROY]" + this.jsCLASSNAME + " " + this.jsOBJNAME);
		this.destroyFlag = 1;
		for (var svc in this) {
			if (this[svc].destroy && typeof this[svc].destroy == "function" && !this[svc].destroyFlag) {
				this[svc].destroy();
				delete this[svc];
			}
		}	
	}

	pracMan.extend = function(child, parent) {
		var f = function() {};
		f.prototype = parent.prototype
		child.prototype = new f();
	}

	pracMan.shallowMerge = function(p, c) {
		if (typeof c === "object") {
			for (var i in p) {
				if (typeof p[i] !== "object") {
					c[i] = p[i];
				}
			}
		}
	}

	pracMan.deepCopy = function(p, c) {
		var c = c || {};
		for (var i in p) {
			if (p[i] === null) {
				c[i] = p[i];
			}
			else if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {}; // array or object
				pracMan.deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}
	
	pracMan.createListByGroup = function(objectSet, assignIndex, groupIndex, groupKey, subGroupIndex, subGroupKey) {
		var a = new Array();
		var i = 0;
		if (subGroupIndex && subGroupKey) {
			for (var obj in objectSet) {
				if (objectSet[obj][groupIndex] && objectSet[obj][assignIndex] && objectSet[obj][groupIndex] == groupKey 
					&& objectSet[obj][subGroupIndex] && objectSet[obj][subGroupIndex] == subGroupKey) {
					a[i++] = objectSet[obj][assignIndex];
				}
			}
		}
		else {
			for (var obj in objectSet) {
				if (objectSet[obj][groupIndex] && objectSet[obj][assignIndex] && objectSet[obj][groupIndex] == groupKey) {
					a[i++] = objectSet[obj][assignIndex];
				}
			}
		}	
		
		a.sort();
		return a;
	}
	
	
function addSlashes(str) {
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
}
function stripSlashes(str) {
str=str.replace(/\\'/g,'\'');
str=str.replace(/\\"/g,'"');
str=str.replace(/\\0/g,'\0');
str=str.replace(/\\\\/g,'\\');
return str;
}	
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function appendChildren() {
	if (arguments[0] && arguments[0].appendChild) {
		var n = undefined;
		for (i = 1; i < arguments.length; i++) {
			if (arguments[i] === "\n") {
				n = document.createElement("br");
				arguments[0].appendChild(n);
				n = undefined;
			}
			else if (typeof arguments[i] == "string" || typeof arguments[i] == "number") {
				n = document.createTextNode(arguments[i]);
				arguments[0].appendChild(n);
				n = undefined;
			} else {
				arguments[0].appendChild(arguments[i]);
			}
		}
	}
}

function createSuperElement () {
	if (typeof arguments[0] === "string") {
		var el = document.createElement(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i].constructor == Array && arguments[i].length > 1) {
				if (arguments[i][0] == "innerHTML") {
					el.innerHTML = arguments[i][1];
				}
				else {
					el.setAttribute(arguments[i][0], arguments[i][1]);				
				}
			}
		}
		return el;
	}
}
