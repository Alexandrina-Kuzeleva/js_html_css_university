
var groundHeight;
var mountain1;
var mountain2;
var tree;
var moon;
var sun;
var darkness;


var birds = []; //clouds


function setup() {
  createCanvas(800, 600);
  groundHeight = (height / 3) * 2;

  mountain1 = {
    x: 400,
    y: groundHeight,
    height: 320,
    width: 230
  };
  mountain2 = {
    x: 550,
    y: groundHeight,
    height: 200,
    width: 130
  };

  tree = {
    x: 150,
    y: groundHeight + 20,
    trunkWidth: 40,
    trunkHeight: 150,
    canopyWidth: 120,
    canopyHeight: 150
  };

  sun = {
    x: 150,
    y: 70,
    diameter: 80,
  };

  moon = {
    x: 700,
    y: 70,
    diameter: 80,
    brightness: 255 
  };

  darkness = 0;
  
 
  for (var i = 0; i < 10; i++) {
    var bird = {
      x: random(width),
      y: random(groundHeight / 2, height / 2),
      size: random(30,60),
      speed: random(0.5, 2)
	  
    };
    birds.push(bird);
  }

}

function draw() {
  background(150, 200, 255);
  noStroke();

  fill(255, 255, 0);
  ellipse(sun.x, sun.y + mouseX / 2, sun.diameter);

  fill(255, 255, 255, moon.brightness);
  ellipse(moon.x, moon.y, moon.diameter);

  fill(70, 200, 0);
  rect(0, groundHeight, width, height - groundHeight);

  fill(120);
  triangle(mountain1.x, mountain1.y,
    mountain1.x + mountain1.width, mountain1.y,
    mountain1.x + (mountain1.width / 2), mountain1.y - mountain1.height);

  triangle(mountain2.x, mountain2.y,
    mountain2.x + mountain2.width, mountain2.y,
    mountain2.x + (mountain2.width / 2), mountain2.y - mountain2.height);

 
  fill(139, 69, 19); 
  rect(tree.x, tree.y, tree.trunkWidth, tree.trunkHeight);
  fill(34, 139, 34); 
  ellipse(tree.x + tree.trunkWidth / 2, tree.y - tree.canopyHeight / 2, tree.canopyWidth, tree.canopyHeight);

 
  fill(0, darkness); 
  rect(0, 0, width, height);

  moon.brightness = map(mouseX, 0, width, 0, 255); 
  sun.x = map(mouseX, 0, width, 50, 250); 
  darkness = map(mouseX, 0, width, 0, 100); 


  for (var i = 0; i < birds.length; i++) {
    var bird = birds[i];
    fill(255);
    ellipse(bird.x, bird.y, 100,bird.size);
    bird.x -= bird.speed;
    if (bird.x < -bird.size) {
      bird.x = width + bird.size;
    }
  }
}
