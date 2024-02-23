"use strict";

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  w = canvas.width = window.innerWidth - 10,
  h = canvas.height = window.innerHeight - 10,
    
  hue = 235,
  stars = [],
  count = 0,
  maxStars = 1000;

// Thanks @jackrugile for the performance tip! https://codepen.io/jackrugile/pen/BjBGoM
// Cache gradient
var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
    canvas2.width = 10;
    canvas2.height = 10;
var half = canvas2.width/2,
    full = canvas2.width,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.1, '#fff'); 
    gradient2.addColorStop(0.4, '#4c4e6710'); //hsl(' + hue + ', 15%, 25%)');
    //gradient2.addColorStop(0.7, '#0a0a10');//'hsl(' + hue + ', 25%, 5%)');
    //gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;

    ctx2.beginPath();
    //ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();
/*    
    ctx2.beginPath();
    ctx2.moveTo(0,half);
    ctx2.lineTo(half, full);
    ctx2.lineTo(full,half);
    ctx2.lineTo(half,0);
    ctx2.fill();
*/
// End cache

function random(min, max) {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }
  
  if (min > max) {
    var hold = max;
    max = min;
    min = hold;
  } //

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function maxOrbit(x,y) {
  var max = Math.max(x,y),
      diameter = Math.round(Math.sqrt(max*max + max*max));
  return diameter/2;
}

var Star = function() {
  var radi = random(30, maxOrbit(w,h));
  this.orbitRadius = (radi)/1.3;// / 10;
  this.radius = 4 + random(10, this.orbitRadius) / 45;// star size min/max
  this.orbitX = w / 2;
  this.orbitY = h / 2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 150000; // Rot speed
  this.alpha = random(2, 100) / 50; // overal brightness

  count++;
  stars[count] = this;
}

Star.prototype.draw = function() {
  var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(8); // Twinkle rate

  if (twinkle === 1 && this.alpha > 0) {
    this.alpha -= 0.15;
  } else if (twinkle === 2 && this.alpha < 1) {
    this.alpha += 0.15;
  }

  ctx.globalAlpha = this.alpha;
  ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
  
  this.timePassed += this.speed;
}

for (var i = 0; i < maxStars; i++) {
  new Star();
}

function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.6; // BLUR
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
    ctx.fillRect(0, 0, w, h)
  
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 1, l = stars.length; i < l; i++) {
    stars[i].draw();
  };  
  
  window.requestAnimationFrame(animation);
}

animation();