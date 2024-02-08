function blackground(on) {
	if(on == true) {
		enable("blackground");
	} else {
		disable("blackground");
	}
}

function fadeToBlack() {
	blackground(true);
    enable("black");
	disable("timers");
	disable("songs");
	disable("backgroundInsert");
	disable("verses");
	disableSplash();
	disable("announcements");
}

function fadeToBackground() {
	blackground(false);
	enable("backgroundInsert");
	disable("timers");
	disable("songs");
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
	blackground(false);
	enable("splash");	
	disable("backgroundInsert");
	disable("timers");
	disable("songs");
    disable("black");    
    disable("verses");
	disable("announcements");	
}

function fadeToVerse() {	
	if(versesOnBlack == true) {
		blackground(true);
	} else {
		blackground(false);
	}
	
	enable("verses");
	enable("backgroundInsert");
	disable("timers");
	disable("songs");
    disable("black");
    disableSplash();
	disable("announcements");
}

function fadeToSong() {	
	blackground(false);	
	enable("songs");
	enable("backgroundInsert");
	disable("timers");
	disable("verses");
    disable("black");
    disableSplash();
	disable("announcements");    
}

function fadeToAnnouncement() {	
	blackground(false);
	enable("announcements");    
	enable("backgroundInsert");
	disable("timers");
	disable("songs");
    disable("black");
    disableSplash();
	disable("verses");	
}

function fadeToTimer() {
	blackground(false);
	enable("timers");    
	enable("backgroundInsert");
	disable("announcements");
	disable("songs");
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

function setSongStyle(str) {
	document.getElementById('songStyle').innerHTML = str;
}


function setTimerStyle(str) {
	document.getElementById('timerStyle').innerHTML = str;
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
	removeClassByQuerySelector('#verses .sizable', 'xhuge');
	removeClassByQuerySelector('#verses .sizable', 'huge');
	removeClassByQuerySelector('#verses .sizable', 'lhuge');
    removeClassByQuerySelector('#verses .sizable', 'large');
	removeClassByQuerySelector('#verses .sizable', 'mlarge');
    removeClassByQuerySelector('#verses .sizable', 'medium');
    removeClassByQuerySelector('#verses .sizable', 'small');
    addClassByQuerySelector('#verses .sizable', size);
	debug('setVerseSize:' + size);
}

function setSongSize(size) {
	removeClassByQuerySelector('#songs .sizable', 'xhuge');
	removeClassByQuerySelector('#songs .sizable', 'huge');
	removeClassByQuerySelector('#songs .sizable', 'lhuge');
    removeClassByQuerySelector('#songs .sizable', 'large');
	removeClassByQuerySelector('#songs .sizable', 'mlarge');
    removeClassByQuerySelector('#songs .sizable', 'medium');
    removeClassByQuerySelector('#songs .sizable', 'small');
    addClassByQuerySelector('#songs .sizable', size);
	debug('setSongSize:' + size);
}

function setAnnouncementSize(size) {
	removeClassByQuerySelector('#announcements .sizable', 'xhuge');
	removeClassByQuerySelector('#announcements .sizable', 'huge');
	removeClassByQuerySelector('#announcements .sizable', 'lhuge');
    removeClassByQuerySelector('#announcements .sizable', 'large');
	removeClassByQuerySelector('#announcements .sizable', 'mlarge');
    removeClassByQuerySelector('#announcements .sizable', 'medium');
    removeClassByQuerySelector('#announcements .sizable', 'small');
    addClassByQuerySelector('#announcements .sizable', size);
	debug('setAnnouncementSize:' + size);
}

function setTimerSize(size) {
	removeClassByQuerySelector('#timers .sizable', 'xhuge');
	removeClassByQuerySelector('#timers .sizable', 'huge');
	removeClassByQuerySelector('#timers .sizable', 'lhuge');
    removeClassByQuerySelector('#timers .sizable', 'large');
	removeClassByQuerySelector('#timers .sizable', 'mlarge');
    removeClassByQuerySelector('#timers .sizable', 'medium');
    removeClassByQuerySelector('#timers .sizable', 'small');
    addClassByQuerySelector('#timers .sizable', size);
	debug('setTimersSize:' + size);
}