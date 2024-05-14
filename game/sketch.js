var mountain;
var tree;
var groundHeight;
var treeHeight;

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft = false;
var isFalling = false;
var isRight = false;
var isPlummeting = false;
var speed;
var jumpspeed;

let score = 0;

var collectible;

function setup() {
    createCanvas(1024, 576);

    floorPos_y = height * 3/4;
    gameChar_x = width/2;
    gameChar_y = floorPos_y;
    speed = 4;
    jumpspeed = 15;

    groundHeight = floorPos_y;

    treeHeight = 100;

    canyon = {
      x: 70,
      y: groundHeight,
      width: 70,
      height: height - groundHeight,
    };

    mountain = {
        x: 600,
        y: groundHeight,
        width: 300,
        height: 300,
    };

    tree = {
        x: 200,
        y: groundHeight,
        trunkWidth: 30,
        trunkHeight: 100,
        canopyWidth: 120,
        canopyHeight: 100
    };

    // Define collectible item
    collectible = {
        x: 500,
        y: floorPos_y - 20,
        size: 20,
        isCollected: false
    };
}

function draw() {
    background(100, 155, 255); // fill the sky blue

    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height - floorPos_y); // draw some green ground

    fill(60, 60, 60);
    rect(canyon.x, canyon.y, canyon.width, canyon.height);
    fill(30, 30, 30);
    rect(canyon.x, canyon.y, canyon.width - 30, canyon.height);

    // Draw the mountain
    noStroke();
    fill(100, 100, 100); // Gray color for the mountain
    triangle(
        mountain.x, mountain.y,
        mountain.x + mountain.width / 2, mountain.y - mountain.height,
        mountain.x + mountain.width, mountain.y
    ); // Draw a triangle for the mountain
    fill(250, 250, 250); // White color for the snow cap
    triangle(
        mountain.x + mountain.width / 4, mountain.y - mountain.height / 2,
        mountain.x + mountain.width / 2, mountain.y - mountain.height,
        mountain.x + (3 * mountain.width) / 4, mountain.y - mountain.height / 2
    ); // Draw the snow cap

    // Draw the tree
    fill(139, 69, 19); // Brown color for the trunk
    rect(tree.x, tree.y - tree.trunkHeight, tree.trunkWidth, tree.trunkHeight); // Draw the trunk

    fill(50, 190, 50); // Light green color for the first layer of leaves
    triangle(tree.x - 80, tree.y - tree.trunkHeight, tree.x + tree.trunkWidth / 2, tree.y - tree.trunkHeight - 150, tree.x + tree.trunkWidth + 90, tree.y - tree.trunkHeight); // canopy

    fill(50, 100, 50); // Dark green color for the second layer of leaves
    triangle(tree.x - 70, tree.y - tree.trunkHeight - 50, tree.x + tree.trunkWidth / 2, tree.y - tree.trunkHeight - 200, tree.x + tree.trunkWidth + 70, tree.y - tree.trunkHeight - 50); // canopy

    fill(50, 190, 50); // Light green color for the first layer of leaves
    triangle(tree.x - 55, tree.y - tree.trunkHeight - 100, tree.x + tree.trunkWidth / 2, tree.y - tree.trunkHeight - 250, tree.x + tree.trunkWidth + 55, tree.y - tree.trunkHeight - 100); // canopy

    // Draw the sun
    fill(255, 204, 0);
    noStroke();
    ellipse(width - 100, 100, 100, 100);
    for (let angle = 0; angle < 360; angle += 11.25) {
        let x1 = width - 100 + cos(radians(angle - 5)) * 50;
        let y1 = 100 + sin(radians(angle - 5)) * 50;
        let x2 = width - 100 + cos(radians(angle)) * 100;
        let y2 = 100 + sin(radians(angle)) * 100;
        let x3 = width - 100 + cos(radians(angle + 5)) * 50;
        let y3 = 100 + sin(radians(angle + 5)) * 50;
        if (angle % 22.5 === 0) {
            fill(255, 204, 0, 127); // semi-transparent
        } else {
            fill(255, 204, 0); // solid yellow
        }
        triangle(x1, y1, x2, y2, x3, y3);
    }

    // Draw the collectible item if it is not collected
    if (!collectible.isCollected) {
        fill(255, 223, 0); // Gold color for the collectible
        ellipse(collectible.x, collectible.y, collectible.size);
    }

    // Check for collision with the collectible item
    if (dist(gameChar_x, gameChar_y, collectible.x, collectible.y) < collectible.size / 2) {
        collectible.isCollected = true;
        score += 5;
    }

    // Draw the score
    fill(0);
    textSize(24);
    text("Score: " + score, 20, 30);

    // Character actions and movements
    if (isLeft && isFalling) {
        drawJumpingLeft();
        makeJump();
        gameChar_x -= speed;
        moveElementsRight();
    } else if (isRight && isFalling) {
        drawJumpingRight();
        makeJump();
        gameChar_x += speed;
        moveElementsLeft();
    } else if (isLeft) {
        drawGoLeft();
        gameChar_x -= speed;
        moveElementsRight();
    } else if (isRight) {
        drawGoRight();
        gameChar_x += speed;
        moveElementsLeft();
    } else if (isFalling || isPlummeting) {
        drawJumpingFront();
        makeJump();
    } else {
        drawStandingFront();
    }

	checkPlayerInCanyon();
}

function checkPlayerInCanyon() {
    if (gameChar_y >= floorPos_y && gameChar_x > canyon.x && gameChar_x < canyon.x + canyon.width) {
        // Сбрасываем счетчик
        score = 0;
        // Возвращаем персонажа на начальную позицию
        gameChar_x = width / 2;
        gameChar_y = floorPos_y;
    }
}

function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed.
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

function keyReleased() {
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
    fill(218, 169, 193);
    ellipse(gameChar_x, gameChar_y - 60, 30, 30); // head
    fill(155, 79, 79);
    rect(gameChar_x - 5, gameChar_y - 45, 12, 22); // body
    fill(151, 38, 38);
    rect(gameChar_x - 3, gameChar_y - 55, 8, 17); // arm_left
    rect(gameChar_x - 5, gameChar_y - 23, 15, 10); // leg_left
}

function drawJumpingRight() {
    fill(218, 169, 193);
    ellipse(gameChar_x, gameChar_y - 60, 30, 30); // head
    fill(155, 79, 79);
    rect(gameChar_x - 5, gameChar_y - 45, 12, 22); // body
    fill(151, 38, 38);
    rect(gameChar_x - 3, gameChar_y - 53, 8, 17); // arm_right
    rect(gameChar_x - 10, gameChar_y - 23, 15, 10); // leg_right
}

function drawGoLeft() {
    fill(218, 169, 193);
    ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
    fill(155, 79, 79);
    rect(gameChar_x - 5, gameChar_y - 35, 12, 22); // body
    fill(151, 38, 38);
    rect(gameChar_x - 3, gameChar_y - 35, 8, 17); // arm_left
    rect(gameChar_x - 5, gameChar_y - 13, 10, 15); // leg_left
}

function drawGoRight() {
    fill(218, 169, 193);
    ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
    fill(155, 79, 79);
    rect(gameChar_x - 5, gameChar_y - 35, 12, 22); // body
    fill(151, 38, 38);
    rect(gameChar_x - 3, gameChar_y - 35, 8, 17); // arm_right
    rect(gameChar_x - 3, gameChar_y - 13, 10, 15); // leg_right
}

function drawJumpingFront() {
    fill(218, 169, 193);
    ellipse(gameChar_x, gameChar_y - 60, 30, 30); // head
    fill(155, 79, 79);
    rect(gameChar_x - 10, gameChar_y - 45, 20, 22); // body
    fill(151, 38, 38);
    rect(gameChar_x - 20, gameChar_y - 45, 10, 15); // arm_left
    rect(gameChar_x + 10, gameChar_y - 45, 10, 10); // arm_right
    rect(gameChar_x + 2, gameChar_y - 23, 8, 15); // leg_right
    rect(gameChar_x - 10, gameChar_y - 23, 8, 10); // leg_left
}

function drawStandingFront() {
    fill(218, 169, 193);
    ellipse(gameChar_x, gameChar_y - 50, 30, 30); // head
    fill(155, 79, 79);
    rect(gameChar_x - 10, gameChar_y - 35, 20, 22); // body
    fill(151, 38, 38);
    rect(gameChar_x - 20, gameChar_y - 35, 10, 15); // arm_left
    rect(gameChar_x + 10, gameChar_y - 35, 10, 15); // arm_right
    rect(gameChar_x + 2, gameChar_y - 13, 8, 15); // leg_right
    rect(gameChar_x - 10, gameChar_y - 13, 8, 15); // leg_left
}

function makeJump() {
    gameChar_y -= jumpspeed;
    jumpspeed -= 1;
    if (jumpspeed == -16) {
        isFalling = false;
        jumpspeed = 15;
    }
}

function moveElementsLeft() {

	// Проверяем, находится ли персонаж близко к левому краю
    if (gameChar_x < width / 2) {
        // Если да, то двигаем все элементы, кроме персонажа
        tree.x += speed;
        mountain.x += speed;
        canyon.x += speed;
        collectible.x += speed;
    } else {
        // Иначе двигаем персонажа
        gameChar_x -= speed;
    }

    tree.x -= speed;
    mountain.x -= speed;
    canyon.x -= speed;
    collectible.x -= speed;

    if (tree.x < -100) {
        tree.x = width + 100;
    }
    if (mountain.x < -300) {
        mountain.x = width + 300;
    }
    if (canyon.x < -canyon.width) {
        canyon.x = width + canyon.width;
    }
    if (collectible.x < -20) {
        collectible.x = width + 20;
        collectible.isCollected = false;
    }
}

function moveElementsRight() {
    tree.x += speed;
    mountain.x += speed;
    canyon.x += speed;
    collectible.x += speed;

    if (tree.x > width + 100) {
        tree.x = -100;
    }
    if (mountain.x > width + 300) {
        mountain.x = -300;
    }
    if (canyon.x > width + canyon.width) {
        canyon.x = -canyon.width;
    }
    if (collectible.x > width + 20) {
        collectible.x = -20;
        collectible.isCollected = false;
    }

	 // Проверяем, находится ли персонаж близко к правому краю
	 if (gameChar_x > width / 2) {
        // Если да, то двигаем все элементы, кроме персонажа
        tree.x -= speed;
        mountain.x -= speed;
        canyon.x -= speed;
        collectible.x -= speed;
    } else {
        // Иначе двигаем персонажа
        gameChar_x += speed;
    }
}
