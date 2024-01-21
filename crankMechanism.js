const canvas = document.getElementById('crankMechanism');
const ctx = canvas.getContext('2d');

const connectingRodLength = 200;
const pistonRadius = 20;
const rodLength = 100;
const brickWidth = 120;
const brickHeight = 60;

// Define rod object with initial position far right
const rod = {
  Xa: 0, // Left side (attached to piston)
  Ya: 0, // Left side (attached to piston)
  Xb: canvas.width - brickWidth / 2, // Right side (attached to brick), adjusted to be far right
  Yb: canvas.height / 2, // Right side (attached to brick)
};

function drawCarEngine(theta) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Coordinates of the piston on the circle
  const circleCenterX = canvas.width / 4; // Center of the circle X-coordinate
  const circleCenterY = canvas.height / 2; // Center of the circle Y-coordinate
  const pistonX = circleCenterX + connectingRodLength * Math.cos(-theta); // Reversed direction
  const pistonY = circleCenterY + connectingRodLength * Math.sin(-theta); // Reversed direction

  // Update rod coordinates based on piston position
  rod.Xa = pistonX;
  rod.Ya = pistonY;

  // Calculate the horizontal distance from the piston to the right side of the rod
  const horizontalDistance = connectingRodLength - rodLength + 400;

  // Calculate the coordinates of the right side of the rod (attached to brick)
  rod.Xb = pistonX + horizontalDistance;
  rod.Yb = circleCenterY;

  // Calculate the coordinates of the center of the brick
  const brickCenterX = rod.Xb; // Right side of the rod influences the brick
  const brickCenterY = rod.Yb;

  // Calculate the coordinates of the top-left corner of the brick
  const brickX = brickCenterX - brickWidth / 2;
  const brickY = brickCenterY - brickHeight / 2;

  // Draw circle
  ctx.beginPath();
  ctx.arc(circleCenterX, circleCenterY, connectingRodLength, 0, 2 * Math.PI);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // Draw horizontal surface line
  const surfaceLineY = canvas.height / 2 + brickHeight / 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 50, surfaceLineY);
  ctx.lineTo(canvas.width, surfaceLineY);
  ctx.stroke();

  // Draw connecting line between circle center and piston center
  ctx.beginPath();
  ctx.moveTo(circleCenterX, circleCenterY);
  ctx.lineTo(pistonX, pistonY);
  ctx.stroke();

  // Draw brick
  ctx.fillStyle = 'brown';
  ctx.fillRect(brickX, brickY, brickWidth, brickHeight);

  // Draw piston
  ctx.strokeStyle = 'blue';
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(pistonX, pistonY, pistonRadius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // Draw connecting rod
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.moveTo(rod.Xa, rod.Ya); // Start from the piston
  ctx.lineTo(rod.Xb, rod.Yb); // Draw to the right side of the rod
  ctx.stroke();

  // Note. Drawing rod after piston so that rod's color was on front
  // Note. Drawing rod after brick so that rod's color was on front
}

function animate() {
  // term "angular" refers to the rotation or angle of the crank mechanism. 
  // The variable angularSpeed represents the speed at which the angle (rotation) of the crank mechanism changes over time. 
  // It's the rate of rotation, often measured in radians per frame or per second.
  const angularSpeed = 0.02;

  // In trigonometry and mathematics, θ (theta) is a commonly used symbol to represent an angle. 
  // In the context of your code, the variable theta is the angle of rotation for the crank mechanism. 
  // It determines the current position of various components (such as the piston, rod, and brick) in the mechanism.
  let theta = 0;

  function update() {
    theta += angularSpeed;
    drawCarEngine(theta);
    requestAnimationFrame(update);
  }

  update();
}

animate();
