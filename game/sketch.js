var mountain = {
    mountainX1: 300,
    mountainY1: 432,
    mountainX2: 600,
    mountainY2: 100,
    mountainX3: 900,
    mountainY3: 432
};

var tree;
var groundHeight;
var treeHeight;


var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isFalling;
var isRight;
var isPlummeting;
var speed;
var jumpspeed;

let score = 0;
let abyss = {
  x: width + 100,
  y: floorPos_y,
  width: 100,
  height: 100
};

function setup() {
    createCanvas(1024, 576);

    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    speed = 4;
    jumpspeed =  15;

    groundHeight = 400;

    treeHeight = 100;

    canyon = {
      x: 70,
      y:430,
      width:100,
      hight: groundHeight,

    };
    tree = {
        x: 200,
        y: groundHeight,
        trunkWidth: 30,
        trunkHeight: 20,
        canopyWidth: 120,
        canopyHeight: 100
    };
}

function draw() {

  
    background(100, 155, 255); //fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, 432, 1024, 144); //draw some green ground

    
    fill(60,60,60)
    rect(canyon.x,canyon.y,canyon.width,canyon.hight)
    fill(30,30,30)
    rect(canyon.x,canyon.y,canyon.width-30,canyon.hight)

    // Draw the mountain
    noStroke();
    fill(100, 100, 100); // Gray color for the mountain
    triangle(mountain.mountainX1 + 70, mountain.mountainY1, mountain.mountainX2 + 70, mountain.mountainY2 - 50, mountain.mountainX3 + 70, mountain.mountainY3); // Draw a triangle for the mountain
    fill(250, 250, 250); // Gray color for the mountain
    triangle(mountain.mountainX1 + 170, mountain.mountainY1 - 130, mountain.mountainX2 + 70, mountain.mountainY2 - 50, mountain.mountainX3 - 25, mountain.mountainY3 - 130);
    fill(128, 128, 128); // Gray color for the mountain
    triangle(mountain.mountainX1, mountain.mountainY1, mountain.mountainX2, mountain.mountainY2, mountain.mountainX3, mountain.mountainY3); // Draw a triangle for the mountain
    fill(255, 255, 255); // Gray color for the mountain
    triangle(mountain.mountainX1 + 120, mountain.mountainY1 - 130, mountain.mountainX2, mountain.mountainY2, mountain.mountainX3 - 120, mountain.mountainY3 - 130);

    // Draw the tree
    fill(139, 69, 19); // Brown color for the trunk
    rect(tree.x, tree.y, tree.trunkWidth, tree.trunkHeight + 20); // Draw the trunk

    fill(50, 190, 50); // Light green color for the first layer of leaves
    triangle(tree.x - 80, tree.y, tree.x, tree.y - 150, tree.x + 120, tree.y);
    fill(50, 100, 50); // Dark green color for the second layer of leaves
    triangle(tree.x + 35, tree.y, tree.x, tree.y - 150, tree.x + 120, tree.y);

    fill(50, 190, 50); // Light green color for the first layer of leaves
    triangle(tree.x - 70, tree.y - 50, tree.x, tree.y - 200, tree.x + 100, tree.y - 50);
    fill(50, 100, 50); // Dark green color for the second layer of leaves
    triangle(tree.x + 24, tree.y - 50, tree.x, tree.y - 200, tree.x + 100, tree.y - 50);

    fill(50, 190, 50); // Light green color for the first layer of leaves
    triangle(tree.x - 55, tree.y - 100, tree.x, tree.y - 250, tree.x + 80, tree.y - 100);
    fill(50, 100, 50); // Dark green color for the second layer of leaves
    triangle(tree.x + 17, tree.y - 100, tree.x, tree.y - 250, tree.x + 80, tree.y - 100);

    

    //6. Sun
  //само солнце
  fill(255, 204, 0);
  noStroke(); 
  ellipse(width - 100, 100, 100, 100); //координаты
  // лучики
  for (let angle = 0; angle < 360; angle += 11.25) { 
    let x1 = width - 100 + cos(radians(angle - 5)) * 50;
    let y1 = 100 + sin(radians(angle - 5)) * 50;
    let x2 = width - 100 + cos(radians(angle)) * 100;
    let y2 = 100 + sin(radians(angle)) * 100;
    let x3 = width - 100 + cos(radians(angle + 5)) * 50;
    let y3 = 100 + sin(radians(angle + 5)) * 50;
    // полупрозрачность лучиков
    if (angle % 22.5 === 0) { 
      fill(255, 204, 0, 127); // полупрозрачный
    } else {
      fill(255, 204, 0); // просто желтый
    }
    triangle(x1, y1, x2, y2, x3, y3);
  }


  
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



