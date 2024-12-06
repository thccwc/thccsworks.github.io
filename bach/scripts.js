// Global variables
const defaultPerspective = '-150px';
let mouseX = 0;
let mouseY = 0;
let lastXDeg = 180;
let lastYDeg = 180;
const speed = 0.1; // Speed of cube movement

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  setInterval(rotateCube, 66); // Rotate the cube at ~15 FPS
  document.addEventListener('mousemove', updateMousePosition);
});

let animationFrame;
function animate() {
  rotateCube();
  animationFrame = requestAnimationFrame(animate);
}
document.addEventListener('DOMContentLoaded', () => {
  animate();
  document.addEventListener('mousemove', updateMousePosition);
});


// Update mouse position relative to the window dimensions
function updateMousePosition(event) {
  mouseX = event.pageX / getWidth();
  mouseY = event.pageY / getHeight();
}

// Rotate the cube based on mouse position
function rotateCube() {
  lastXDeg += (getAngle(mouseX) - lastXDeg) * speed;
  lastYDeg += (getAngle(mouseY) - lastYDeg) * speed;

  const newStyle = `translateZ(${defaultPerspective}) rotateY(${lastXDeg}deg) rotateX(${lastYDeg}deg)`;
  const cube = document.querySelector('.cube');
  if (cube) {
    cube.style.transform = newStyle;
  }
}

// Get the corresponding angle for a normalized value
function getAngle(value) {
  return 180 - 360 * value;
}

// Get the width of the viewport
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

// Get the height of the viewport
function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}
window.addEventListener('beforeunload', () => cancelAnimationFrame(animationFrame));