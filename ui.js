function fadeToBlack() {
    enable("black");
	disable("backgroundInsert");
	disable("verses");
	disableSplash();
	disable("announcements");
}

function fadeToBackground() {    
	enable("backgroundInsert");
	disable("black");
	disable("verses");
	disableSplash();
	disable("announcements");
}

function fadeToSplash() {
	if(splashRemoved) {
		fadeToBlack();
		return;
	}
	
	enable("splash");	
	disable("backgroundInsert");
    disable("black");    
    disable("verses");
	disable("announcements");	
}

function fadeToVerse() {
	enable("verses");
	enable("backgroundInsert");
    disable("black");
    disableSplash();
	disable("announcements");    
}

function fadeToAnnouncement() {
	enable("announcements");    
	enable("backgroundInsert");
    disable("black");
    disableSplash();
	disable("verses");	
}

var splashRemoved = false;
function disableSplash() {
	if(!splashRemoved) {
		disable("splash");
		
		setTimeout(function(){
			document.getElementById("splash")?.remove();
			splashRemoved = true;
		}, 1500); 
	}
}

function disable(elementName) {
    document.getElementById(elementName)?.classList.remove('enabled');
}

function enable(elementName) {
    document.getElementById(elementName)?.classList.add('enabled');
}

var debugEnabled = false;
function showDebug() {
	debugEnabled = true;
    document.getElementById('debug')?.classList.remove('hiddenMy');
}

function debug(str) {
	if(!debugEnabled) {
		return;
	}
	
    document.getElementById('debug').innerHTML = document.getElementById('debug').innerHTML + "<br><br>" + str;
}

function setVerseStyle(str) {
	document.getElementById('verseStyle').innerHTML = str;
}

function setAnnouncementStyle(str) {
	document.getElementById('announcementStyle').innerHTML = str;
}

// e.g. .class #id e.t.c.
function addClassByQuerySelector(querrySelector, classToAdd) {
	const elements = document.querySelectorAll(querrySelector);

	elements.forEach((element) => {
	  element.classList.add(classToAdd);
	});
}

// e.g. .class #id e.t.c.
function removeClassByQuerySelector(querrySelector, classToRemove) {
	const elements = document.querySelectorAll(querrySelector);

	elements.forEach((element) => {
	  element.classList.remove(classToRemove);
	});
}

function setDemo(isDemo) {
	if(isDemo) {
		removeClassByQuerySelector('.demoText', 'hiddenMy');
	} else {
		addClassByQuerySelector('.demoText', 'hiddenMy');
	}
}

/*
function displayVerseElement() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('verses').classList.remove('hidden');
}
*/

function setVerseSize(size) {
	removeClassByQuerySelector('#verses .sizable', 'huge');
    removeClassByQuerySelector('#verses .sizable', 'large');
    removeClassByQuerySelector('#verses .sizable', 'medium');
    removeClassByQuerySelector('#verses .sizable', 'small');
    addClassByQuerySelector('#verses .sizable', size);
	debug('setVerseSize:' + size);
}

function setAnnouncementSize(size) {
	removeClassByQuerySelector('#announcements .sizable', 'huge');
    removeClassByQuerySelector('#announcements .sizable', 'large');
    removeClassByQuerySelector('#announcements .sizable', 'medium');
    removeClassByQuerySelector('#announcements .sizable', 'small');
    addClassByQuerySelector('#announcements .sizable', size);
	debug('setAnnouncementSize:' + size);
}