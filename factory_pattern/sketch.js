var tadpole;
var screenBorder;
var jumpInterval = 80; 
var jumpCounter = 0; 
var lilyPads = []; 
var numLilyPads = 7; 
var flowerLilyPads = 3; 

function setup() {
    createCanvas(1200, 800);
    
    screenBorder = 100;


    for (let i = 0; i < numLilyPads; i++) {
        let size = random(50, 100);
        let x = random(size / 2, width - size / 2);
        let y = random(size / 2, height - size / 2);
        let hasFlower = i < flowerLilyPads;
        lilyPads.push({ x: x, y: y, size: size, hasFlower: hasFlower });
    }


    shuffle(lilyPads);
    
    tadpole = {
        pos: undefined,
        dir: undefined,
        isHatched: false,
        isFrog: false,
        tailFlick: 5,
        tailIncr: -1,
        
        setup: function(x, y) {
            this.pos = createVector(x, y);
            this.dir = createVector(random(-1, 1), random(-1, 1));
            this.dir.normalize();
        },
        
        draw: function() {
            push();
            
            translate(this.pos.x, this.pos.y);
            
            if (!this.isHatched) {
                fill(100, 100);
                stroke(150);
                ellipse(0, 0, 25);
                fill(0);
                ellipse(0, 0, 6);
            } else if (!this.isFrog) {
                rotate(this.dir.heading());
                fill(0);
                stroke(0);
                ellipse(0, 0, 12, 8);
                strokeWeight(2);
                noFill();
                beginShape();
                
                curveVertex(-6, 0);
                curveVertex(-6, 0);
                curveVertex(-18, this.tailFlick);
                curveVertex(-36, 0);
                curveVertex(-36, 0);
                
                endShape();
            } else {
                // Drawing the frog
                fill(34, 139, 34); 
                stroke(34, 139, 34);
                stroke(0)

                // Legs
                ellipse(-20, 20, 20, 40);
                ellipse(20, 20, 20, 40); 
                ellipse(-30, -10, 10, 30); 
                ellipse(30, -10, 10, 30); 
                 
                // Body
                ellipse(0, 0, 60, 40);
                
                // Eyes
                fill(255);
                ellipse(-15, -20, 20, 20); 
                ellipse(15, -20, 20, 20); 
                fill(0);
                ellipse(-15, -20, 10, 10);
                ellipse(15, -20, 10, 10); 
                
                // Spots
                fill(0, 100, 0);
                ellipse(-10, 0, 10, 5);
                ellipse(10, 5, 8, 4); 
                ellipse(0, -10, 6, 3); 
            }
            
            pop();
        },
        
        update: function() {
            if (!this.isHatched) {
                this.pos.x += random(-0.5, 0.5);
                this.pos.y += random(-0.5, 0.5);    
            } else if (!this.isFrog) {
                this.tailFlick += this.tailIncr;
                
                if (abs(this.tailFlick) > 5) {
                    this.tailIncr *= -1;
                }
                
                this.pos.add(this.dir);
            } else {
          
                jumpCounter++;
                if (jumpCounter >= jumpInterval) {
                    jumpCounter = 0;
                    let targetLilyPad = random(lilyPads);
                    this.pos.x = targetLilyPad.x;
                    this.pos.y = targetLilyPad.y;
                }
            }
            
            this.screenWrap();
        },
        
        screenWrap: function() {
            if (this.pos.x > width + screenBorder) {
                this.pos.x -= width + screenBorder;
            } else if (this.pos.x < -screenBorder) {
                this.pos.x += width + screenBorder;
            }

            if (this.pos.y > height + screenBorder) {
                this.pos.y -= height + screenBorder;
            } else if (this.pos.y < -screenBorder) {
                this.pos.y += height + screenBorder;
            }
        },
        
        testClick: function(mouse) {
            if (this.pos.dist(mouse) < 25) {
                if (!this.isHatched) {
                    this.isHatched = true;
                } else if (!this.isFrog) {
                    this.isFrog = true;
                }
            }
        }
    };
    
    tadpole.setup(width / 2, height / 2);
}

function draw() {
    background(0, 105, 148);

    // Draw lily pads
    for (let lilyPad of lilyPads) {
        fill(10, 170, 10);
        stroke(0);
        ellipse(lilyPad.x, lilyPad.y, lilyPad.size);

        if (lilyPad.hasFlower) {
            // Draw flower
            push();
            translate(lilyPad.x, lilyPad.y);
            fill(255, 192, 203);
            ellipse(0, 0, lilyPad.size / 4);
            fill(255, 255, 0);
            noStroke();
            ellipse(0, 0, lilyPad.size / 8);
            pop();
        }
    }

    tadpole.update();
    tadpole.draw();
}

function mousePressed() {
    var v = createVector(mouseX, mouseY);
    tadpole.testClick(v);
}


function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
