/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isFalling;
var isRight;
var isPlummeting;
var speed;
var jumpspeed;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	speed = 4;
	jumpspeed =  15;
}

function draw()
{

	///////////DRAWING CODE//////////

	background(100,155,255); //fill the sky blue


	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon


	//the game character
	if(isLeft && isFalling)
	{
		drawJumpingLeft();
		makeJump();
		gameChar_x -= speed;

	}
	else if(isRight && isFalling)
	{
		drawJumpingRight();
		makeJump();
		gameChar_x += speed;


	}
	else if(isLeft)
	{
		drawGoLeft();
		gameChar_x -= speed;


	}
	else if(isRight)
	{
		drawGoRight();
		gameChar_x += speed;

	}
	else if(isFalling || isPlummeting)
	{
		drawJumpingFront();
		makeJump();

	}
	else
	{
		drawStandingFront();

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

}


function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
	if (keyCode == RIGHT_ARROW) {
		isRight = true;
	} else if (keyCode == LEFT_ARROW) {
		isLeft = true;
	} else if (keyCode == 32) {
		isFalling = true;
	}
}

function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
	if (keyCode == RIGHT_ARROW) {
		isRight = false;
	} else if (keyCode == LEFT_ARROW) {
		isLeft = false;
	} 

}



function drawJumpingLeft() {
	//Jumping to the left
	  //head
   fill(218,169,193)
	  ellipse(gameChar_x,gameChar_y-60,30,30);
	  //body
	  fill(155,79,79)
	  rect(gameChar_x-5,gameChar_y-45,12,22);
	  //arm_left
	  fill(151,38,38);
	  rect(gameChar_x-3,gameChar_y-55,8,17);
	  //leg_left
	  fill(151,38,38);
	  rect(gameChar_x-5,gameChar_y-23,15,10);
  }
  
  function drawJumpingRight() {
	   //head
   fill(218,169,193);
	  ellipse(gameChar_x,gameChar_y-60,30,30);
	  //body
	  fill(155,79,79);
	  rect(gameChar_x-5,gameChar_y-45,12,22);
	  //arm_left
	  fill(151,38,38);
	  rect(gameChar_x-3,gameChar_y-53,8,17);
	  //leg_right
	  fill(151,38,38);
	  rect(gameChar_x-10,gameChar_y-23,15,10);
  }
  
  function drawGoLeft() {
	   //head
   fill(218,169,193);
	  ellipse(gameChar_x,gameChar_y-50,30,30);
	  
	  //body
	  fill(155,79,79);
	  rect(gameChar_x-5,gameChar_y-35,12,22);
	  //arm_left
	  fill(151,38,38);
	  rect(gameChar_x-3,gameChar_y-35,8,17);
	  //leg_right
	  fill(151,38,38);
	  rect(gameChar_x-5,gameChar_y-13,10,15);
  }
  
  function drawGoRight() {
		  //head
   fill(218,169,193);
	  ellipse(gameChar_x,gameChar_y-50,30,30);
	  //body
	  fill(155,79,79);
	  rect(gameChar_x-5,gameChar_y-35,12,22);
	  //arm_left
	  fill(151,38,38);
	  rect(gameChar_x-3,gameChar_y-35,8,17);
	  //leg_right
	  fill(151,38,38);
	  rect(gameChar_x-3,gameChar_y-13,10,15);
  }
  
  function drawJumpingFront() {
	   //head
   fill(218,169,193);
	  ellipse(gameChar_x,gameChar_y-60,30,30);
	  //body
	  fill(155,79,79);
	  rect(gameChar_x-10,gameChar_y-45,20,22);
	  //arm_left
	  fill(151,38,38);
	  rect(gameChar_x-20,gameChar_y-45,10,15);
	  //arm_right
	  fill(151,38,38);
	  rect(gameChar_x+10,gameChar_y-45,10,10);
	  //leg_right
	  fill(151,38,38);
	  rect(gameChar_x+2,gameChar_y-23,8,15);
	  //leg_left
	  fill(151,38,38);
	  rect(gameChar_x-10,gameChar_y-23,8,10);
  }
  
  function drawStandingFront() {
		  //head
   fill(218,169,193)
	  ellipse(gameChar_x,gameChar_y-50,30,30);
	  //body
	  fill(155,79,79)
	  rect(gameChar_x-10,gameChar_y-35,20,22);
	  //arm_left
	  fill(151,38,38)
	  rect(gameChar_x-20,gameChar_y-35,10,15);
	  //arm_right
	  fill(151,38,38);
	  rect(gameChar_x+10,gameChar_y-35,10,15);
	  //leg_right
	  fill(151,38,38);
	  rect(gameChar_x+2,gameChar_y-13,8,15);
	  //leg_left
	  fill(151,38,38);
	  rect(gameChar_x-10,gameChar_y-13,8,15);
  }

  function makeJump () {
		gameChar_y -= jumpspeed;
		jumpspeed -= 1;
		if (jumpspeed == -16) {
			isFalling = false;
			jumpspeed = 15;
		}
  }