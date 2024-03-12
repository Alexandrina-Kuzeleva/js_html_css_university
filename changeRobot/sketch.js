function setup()
{
	//create a canvas for the robot
	createCanvas(1000, 1200);
}

function draw()
{
	strokeWeight(6);

	//robots head
	fill(130);
	rect(100, 100, 300, 300, 20);
	fill(255,255,255);
	rect(100, 100, 300, 45, 20);


	//robots antenna
	fill(250, 250, 0);
	ellipse(250, 70, 60, 60);

	fill(200, 0, 200);
	rect(210, 80, 80, 30);

	//robots eyes
	fill(255);
	ellipse(175, 200, 80, 80);
	point(175, 200);
	ellipse(325, 200, 80, 80);
	point(325, 200);


	//robots nose
	fill(255, 254, 97);
	triangle(250, 220, 200, 300, 300, 300);z

	//robots ears
	rect(80, 180, 30, 100);
	rect(390, 180, 30, 100);

	//robots mouth
	noFill();
	beginShape();
	vertex(175, 340);
	vertex(200, 370);
	vertex(225, 340);
	vertex(250, 370);
	vertex(275, 340);
	vertex(300, 370);
	vertex(325, 340);
	endShape();

	
	//robots arms
	fill(130);
	rect(50, 400, 400, 350, 20);

	//robots body
	fill(130);
	rect(100, 400, 300, 350, 20);
	


	
	//robots legs
	fill(130);
	rect(100, 750, 300, 300, 20);
	line(250,750,250,1050)

	

	
	
}