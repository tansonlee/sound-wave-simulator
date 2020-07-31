let buffer2;
let buffer1;

let xoff = 0;

let dampening = 0.999;

function setup() {
	pixelDensity(1);
	createCanvas(400, 400);

	// initialize arrays
	buffer2 = new Array(width).fill(0).map(n => new Array(height).fill(0));
	buffer1 = new Array(width).fill(0).map(n => new Array(height).fill(0));
	fill(0, 255, 0);
}

function mousePressed() {
	buffer1[mouseX][mouseY] = 500;
}

function keyPressed() {
	if (key === " ") {
		buffer1[mouseX][mouseY] = 500;
	}
}

function draw() {
	// frequency of waves
	if (frameCount % 20 === 0) {
		buffer1[round(xoff)][200] = 500;
	}

	background(0);

	loadPixels();
	for (let i = 1; i < width - 1; i++) {
		for (let j = 1; j < height - 1; j++) {
			buffer2[i][j] =
				(buffer1[i - 1][j] +
					buffer1[i + 1][j] +
					buffer1[i][j - 1] +
					buffer1[i][j + 1]) /
					2 -
				buffer2[i][j];
			buffer2[i][j] = buffer2[i][j] * dampening;
			let index = (i + j * width) * 4;
			// pixels[index + 0] = buffer2[i][j];
			pixels[index + 1] = buffer2[i][j];
			// pixels[index + 2] = buffer2[i][j];
		}
	}
	updatePixels();

	let temp = buffer1;
	buffer1 = buffer2;
	buffer2 = temp;

	// speed of sprite
	// 2: same speed as waves
	// 1: super sonic
	// 3: sub sonic
	if (frameCount % 2 === 0) {
		xoff += 1.4;
	}
	ellipse(xoff, 200, 5, 5);
}
