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

function setup() {
    createCanvas(1024, 576);

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
    rect(canyon.x,canyon.y,canyon.width-40,canyon.hight)

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


    
  // 5. a collectable token - eg. a jewel, fruit, coins
  fill(120, 219, 226); // Светло-синий цвет
  let PrimogemSize = 50; // Размер токена
  let angleToken = TWO_PI / 4;
  let halfAngleToken = angleToken / 2.0;
  resetMatrix(); // Сбрасываем трансформацию
  translate(width / 2, height / 2 + 200); // Перемещаем координаты в центр холста с небольшим смещением вниз
  beginShape();
  for (let a = 0; a < TWO_PI; a += angleToken) {
	  let sx = cos(a) * PrimogemSize;
	  let sy = sin(a) * PrimogemSize;
	  vertex(sx, sy);

	  sx = cos(a + halfAngleToken) * (PrimogemSize / 2);
	  sy = sin(a + halfAngleToken) * (PrimogemSize / 2);
	  vertex(sx, sy);
  }
  endShape(CLOSE);


}



