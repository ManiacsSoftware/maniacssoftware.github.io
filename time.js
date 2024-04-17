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

var targetTime = 0;
var targetTimePlusOne = 0;


function startCountdown(inSeconds) {
	let now = new Date();
	const milliseconds = inSeconds * 1000; // 1000 milliseconds = 1 second
	targetTime = new Date(now.getTime() + milliseconds + 500);
	targetTimePlusOne = new Date(now.getTime() + milliseconds - 1000);
		
	removeClassByQuerySelector('#countdown', 'zeroSize');
	setTimerVisibility(true);	
	countdownTick();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function finishTimer() {	
	setTimerVisibility(false);
	//sleep(2000).then(() => { 
		addClassByQuerySelector('#countdown', 'zeroSize');
	//});
}

function countdownTick() {
	const today = new Date();
	var dif = new Date(targetTime - today );
	
	let h = dif.getHours();
	let m = dif.getMinutes();
	let s = dif.getSeconds();
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	
	setRemaining(h, m, s);
	
	if( today.valueOf() >= targetTimePlusOne.valueOf() ) {
		finishTimer();
		return;
	}
	
	setTimeout(countdownTick, 1000); 
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