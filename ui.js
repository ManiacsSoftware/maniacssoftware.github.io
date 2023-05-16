function fadeToBlack() {
    enable("black");
	disable("verses");
	disable("splash");
}

function fadeToSplash() {
    disable("black");    
    disable("verses");
	enable("splash");
}

function fadeToVerse() {
    disable("black");
    disable("splash");
    enable("verses");
}

function disable(elementName) {
    document.getElementById(elementName).classList.remove('enabled');
}

function enable(elementName) {
    document.getElementById(elementName).classList.add('enabled');
}

function showDebug() {
    document.getElementById('debug').classList.remove('hidden');
}

function debug(str) {
    document.getElementById('debug').innerHTML = document.getElementById('debug').innerHTML + "<br><br>"
    + str;
}

function setVerseStyle(str) {
	document.getElementById('verseStyle').innerHTML = str;
}

/*
function displayVerseElement() {
    document.getElementById('welcome').classList.add('hidden');
    document.getElementById('verses').classList.remove('hidden');
}
*/

function setSize(size) {
    document.getElementById('verse').classList.remove('large');
    document.getElementById('verse').classList.remove('medium');
    document.getElementById('verse').classList.remove('small');
    document.getElementById('verse').classList.add(size);
}