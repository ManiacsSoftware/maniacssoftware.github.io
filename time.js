function setTimerMessage(message) {
	document.getElementById('timerMessage').innerHTML = message;
}

function setTimerVisibility(visible) {
	if(visible) {
		enable('countdown');	
		removeClassByQuerySelector('#countdown', 'hiddenMy');
	} else {
		disable('countdown');
		//addClassByQuerySelector('#countdown', 'hiddenMy');
	}
}

function setTime(time) {
	const elements = document.querySelectorAll('.clock');

	elements.forEach((element) => {
	  element.innerHTML = time;
	});
}

function setRemaining(hours, minutes, seconds) {
	//document.getElementById('hours').innerHTML = hours; 
	document.getElementById('minutes').innerHTML = minutes;
	document.getElementById('seconds').innerHTML = seconds;
}

var targetTime = new Date();


function startCountdown(inSeconds) {
	let now = new Date();
	const milliseconds = inSeconds * 1000; // 1000 milliseconds = 1 second
	targetTime = new Date(now.getTime() + milliseconds);
			
	removeClassByQuerySelector('#countdown', 'zeroSize');
	setTimerVisibility(true);	
	countdownTick();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function countdownTick() {
	const now = new Date();
	var difMs = targetTime.getTime() - now.getTime();
	
	var difSec = Math.trunc(difMs/1000);
	var minutes =Math.trunc(difSec/60);
	var seconds = difSec%60;
	
	var m = checkTime(minutes);
	var s = checkTime(seconds);
	
	setRemaining("", m, s);
	
	// TODO: How will this translate to templating of timers?
	if( difMs < 1000) {
		addClassByQuerySelector('#countdown', 'zeroSize');
	}
	
	if( difMs < 0) {
		
		setTimerVisibility(false);
		return;
	}	
	
	setTimeout(countdownTick, 100); 
}


function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  setTime(h + ":" + m); // + ":" + s);
  setTimeout(startTime, 1000);
}  

function checkTime(i) {
  if (i > -10 && i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}