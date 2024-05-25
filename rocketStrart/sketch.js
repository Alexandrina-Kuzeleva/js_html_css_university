let rocket;
let baseLine;
let stars = [];
let planets = [];
let bullets = [];

function setup() {
    createCanvas(800, 600);
    initializeGame();
}

function initializeGame() {
    baseLine = height - 100;

    rocket = {
        position: createVector(width / 2, baseLine),
        velocity: createVector(0, 0),
        thrust: false,
        moveLeft: false,
        moveRight: false,
        bullets: []
    };

    stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push(createVector(random(width), random(height)));
    }

    planets = [];
    for (let i = 0; i < 5; i++) {
        planets.push({
            position: createVector(random(width), random(height / 2)),
            size: random(50, 100),
            color: color(random(100, 255), random(100, 255), random(100, 255))
        });
    }

    bullets = [];
}

function draw() {
    background(10);
    
    // Draw stars
    fill(255);
    for (let star of stars) {
        ellipse(star.x, star.y, 2, 2);
    }

    // Draw planets
    for (let planet of planets) {
        fill(planet.color);
        ellipse(planet.position.x, planet.position.y, planet.size, planet.size);
    }

    // Move the rocket
    if (rocket.thrust && rocket.position.y > 0) {
        rocket.velocity.y = -3;
    } else if (rocket.position.y < baseLine) {
        rocket.velocity.y = 3;
    } else {
        rocket.velocity.y = 0;
    }

    if (rocket.moveLeft && rocket.position.x > 0) {
        rocket.velocity.x = -3;
    } else if (rocket.moveRight && rocket.position.x < width) {
        rocket.velocity.x = 3;
    } else {
        rocket.velocity.x = 0;
    }

    rocket.position.add(rocket.velocity);

    // Draw the rocket with new design
    fill(255, 0, 0);
    beginShape();
    vertex(rocket.position.x, rocket.position.y +10);
    vertex(rocket.position.x - 30, rocket.position.y + 60);
    vertex(rocket.position.x + 30, rocket.position.y + 60);
    endShape(CLOSE);

    fill(255, 255, 255);
    beginShape();
    vertex(rocket.position.x - 15, rocket.position.y + 60);
    vertex(rocket.position.x, rocket.position.y - 10);
    vertex(rocket.position.x + 15, rocket.position.y + 60);
    endShape(CLOSE);

    if (rocket.thrust) {
        fill(255, 150, 0);
        beginShape();
        vertex(rocket.position.x - 10, rocket.position.y + 60);
        vertex(rocket.position.x, rocket.position.y + 80);
        vertex(rocket.position.x + 10, rocket.position.y + 60);
        endShape(CLOSE);
    }

    // Update and draw bullets
    for (let bullet of bullets) {
        bullet.y -= 5;
        fill(255, 255, 0);
        ellipse(bullet.x, bullet.y, 5, 5);
    }

    // Remove bullets that are off-screen
    bullets = bullets.filter(bullet => bullet.y > 0);

    // Check for collisions with planets
    for (let planet of planets) {
        let distance = dist(rocket.position.x, rocket.position.y, planet.position.x, planet.position.y);
        if (distance <(( planet.size / 2) - 15)) {
            initializeGame();
        }
    }

	textSize(16);
	fill(255,255,255)
    text("Controls: W - Thrust, A - Move Left, D - Move Right, E - Shoot", 10, height - 20);
}

function keyPressed() {
    if (key == "W") {
        rocket.thrust = true;
    }

    if (key == "A") {
        rocket.moveLeft = true;
    }

    if (key == "D") {
        rocket.moveRight = true;
    }

    if (key == "E") {
        // Shoot a bullet
        bullets.push(createVector(rocket.position.x, rocket.position.y));
    }
}

function keyReleased() {
    if (key == "W") {
        rocket.thrust = false;
    }

    if (key == "A") {
        rocket.moveLeft = false;
    }

    if (key == "D") {
        rocket.moveRight = false;
    }
}
