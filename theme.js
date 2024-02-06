var loadedBackground = black;

function loadBackground(backgroundName) {
	if(loadedBackground === backgroundName) {
		disable("blackground");
		return;
	}
	
    document.getElementById('background').src = 'backgrounds/' + backgroundName + '.html';
	document.getElementById('templateStyle').href = 'backgrounds/' + backgroundName + '.css';
	loadedBackground = backgroundName;
		
	disable("blackground");
}

function clearBackground() {
	enable("blackground");
	loadBackground("black");
	
	
}


function disableBackground() {
	enable("blackground");
	addClassByQuerySelector('#rootElement', 'blackground');
	
}

function enableBackground() {
	disable("blackground");
	removeClassByQuerySelector('#rootElement', 'blackground');
}