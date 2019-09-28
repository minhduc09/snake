window.onload=function() {
	canv = document.getElementById("gc");
	ctx = canv.getContext("2d");
	document.addEventListener("keydown",keyPush); 
	game();
}
var fps = 18;
var px=py=10,
 	gs=20,
 	ax=ay=1,
 	xv=yv=0,
 	trail=[],
 	tail = 3,
 	point = 0,
 	highPoint = 0;
var pause = 0;
var map = "#2c2c2c",
	head = "#83ffe6",
	body = "#fcfcfc",
	apple = "#ff5f5f";

//take full screen width and height
var w = screen.width - 6.5;
var h = screen.height - 210;
//choose the closest width, height that % 20 = 0 to make grid
for(let i = w; i > 0; i--){
		if(i % 20 ===0){
			w = i;
			break;
		}
	}
for(let i = h; i > 0; i--){
		if(i % 20 ===0){
			h = i;
			break;
		}
	}

function game(){
	//set the map's width and height
	canv.width = w;
	canv.height = h;

	// run game
	timing = 1000/fps;
	window.setTimeout(game,timing);
	
	if(pause%2 == 0){
		// color the game's background
		ctx.fillStyle = map;
		ctx.fillRect(0,0,canv.width,canv.height);

		// color the apple
		ctx.fillStyle = apple;
		ctx.fillRect(ax*gs+1,ay*gs+1,gs-2,gs-2);

		// snake moves 
		px+=xv;
		py+=yv;

		// keep going if hits the edge
		if(px<0){
			px = (canv.width / gs) -1;
		}
		if(px*gs> canv.width-1){
			px = 0;
		}
		if(py<0){
			py = (canv.height / gs) - 1;
		}
		if(py*gs>canv.height-1){
			py = 0;
		}
		
		for(var i = 0; i < trail.length; i++){
			// color the snake's head
			if(i == trail.length - 1){
				ctx.fillStyle = head;
				ctx.fillRect((trail[i].x*gs)+1,(trail[i].y*gs)+1,gs-2,gs-2);
			}
			else{
				// color the snake's body
				ctx.fillStyle = body;
				ctx.fillRect((trail[i].x*gs)+1,(trail[i].y*gs)+1,gs-2,gs-2);
				//when snake hits itself
				if(trail[i].x == px && trail[i].y == py){
					tail = 3;
					if(point >= highPoint)
						highPoint = point;
					point = 0;
					document.getElementById("point").innerHTML = point;
					document.getElementById("high-point").innerHTML = highPoint;
				}
			}
		}

		//make the body - BEST PART
		trail.push({x:px,y:py});
		while(trail.length > tail){
			trail.shift();
		}

		//when the snake eats the apple
		if(ax == px && ay == py){
				tail++;
				point++;
				do{
				//random the apple's position
				ax = Math.floor(Math.random()*(canv.width/gs));		
				ay = Math.floor(Math.random()*(canv.height/gs));
				}while(trail.indexOfObject({x: ax , y: ay}) != -1);  //make sure the apple doesn't appear inside the snake's body
				document.getElementById("point").innerHTML = point;
		}

		
		
	}
	// function check whether if an element is inside an object 
	Array.prototype.indexOfObject = function(obj) {
	    var l = this.length, i, k, ok;
	    for( i=0; i<l; i++) {
	        ok = true;
	        for( k in obj) if( obj.hasOwnProperty(k)) {
	            if( this[i][k] !== obj[k]) {
	                ok = false;
	                break;
	            }
	        }
	        if( ok) return i;
	    }
	    return -1; // no match
	};
	
}


// use arrow keys to move the snake
function keyPush(evt){
	switch(evt.keyCode){
		case 32: 				// use space to pause game
			pause++;
			break;
		case 37: 				//go left
			if(xv != 1){
				xv=-1;yv=0;
			}
			break;
		case 38: 				// go up
			if(yv != 1){
				xv=0;yv=-1;
			}
			break;
		case 39: 				// go right
			if(xv != -1){
				xv=1;yv=0;
			}
			break;
		case 40: 				// go down
			if(yv != -1){
				xv=0;yv=1;
			}
			break;
	}
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}