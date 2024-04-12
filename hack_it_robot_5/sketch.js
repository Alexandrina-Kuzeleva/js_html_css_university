
var robotWidths;
var robotHeights;
var headWidths;
var eyeSizes;
var noseSizes;

function setup() {
    //create a canvas for the robot
    createCanvas(1000, 700);
    robotWidths = [70, 100, 150];
    robotHeights = [50, 120, 110];
    headWidths = [0.7, 0.8, 1.2];
    eyeSizes = [26, 30, 35];
    noseSizes = [10, 15, 20];
}

function draw() {
    strokeWeight(2);
    translate(0, 400);

    for (var i = 0; i < robotWidths.length; i++) {
        translate(200, 0);

        fill(200);
        rect(-robotWidths[i] / 2, -robotHeights[i] - 130, robotWidths[i], 130);
        rect(-70, -robotHeights[i] - 130, 30, 100);
        rect(40, -robotHeights[i] - 130, 30, 100);
        rect(-30, -robotHeights[i], 30, robotHeights[i]);
        rect(0, -robotHeights[i], 30, robotHeights[i]);

        //robot heads
        fill(200);
        rect(-50 * headWidths[i], -robotHeights[i] - 230, 100 * headWidths[i], 100, 10);

        //ears
        fill(255, 0, 0);
        rect(-50 * headWidths[i] - 10, -robotHeights[i] - 200, 10, 33);
        rect(50 * headWidths[i], -robotHeights[i] - 200, 10, 33);

        //robots' antennas
        fill(250, 250, 0);
        ellipse(0, -robotHeights[i] - 237, 10, 10);
        fill(200, 0, 200);
        rect(-10, -robotHeights[i] - 233, 20, 10);

        //robot's eyes
        fill(255)
        ellipse(-25 * headWidths[i], -robotHeights[i] - 200, eyeSizes[i], eyeSizes[i]);
        point(-25 * headWidths[i], -robotHeights[i] - 200);
        ellipse(25 * headWidths[i], -robotHeights[i] - 200, eyeSizes[i], eyeSizes[i]);
        point(25 * headWidths[i], -robotHeights[i] - 200);

        //robots' nose
        fill(255, 0, 0);
        triangle(0, -robotHeights[i] - 190, -noseSizes[i], -robotHeights[i] - 170, noseSizes[i], -robotHeights[i] - 170);

        //robot mouth
        noFill();
        beginShape();
        vertex(-23, -robotHeights[i] - 155);
        vertex(-15, -robotHeights[i] - 145);
        vertex(-9, -robotHeights[i] - 155);
        vertex(-1, -robotHeights[i] - 145);
        vertex(7, -robotHeights[i] - 155);
        vertex(15, -robotHeights[i] - 145);
        vertex(23, -robotHeights[i] - 155);
        endShape();
    }
}
