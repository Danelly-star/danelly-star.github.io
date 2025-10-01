

/* -----------------------------
    Simple Star Twinkle Animation using help from SVG.js, 
    https://developer.mozilla.org/en-US/ and Youtube Tutorials
-------------------------------- */


// set canvas size
const width = window.innerWidth;
const height = window.innerHeight - 10;

// attach to the creativeSVG container instead of body
const canvas = SVG()
  .addTo('#creativeSVG')
  .size(width, height);

// interval for new stars
setInterval(() => {
  if (Math.random() < 0.7) {
    setTimeout(() => {
      createStar();
    }, Math.random() * 1000);
  }
}, 100);

// create stars
const createStar = () => {
  const x = Math.random() * width;
  const y = Math.random() * height;

  const size = Math.random() * 12;
  canvas.circle(size)
    .fill('aquamarine')
    .center(x, y)
    .opacity(0)
    .animate(2000)
    .opacity(1)
    .delay(300)
    .after(function () {
      twinkle(x, y, size);
      this.element().remove();
    });
};

// The twinkle effect
const twinkle = (x, y, size) => {
  canvas.polygon([0, 0, 10, 2, 12, 12, 14, 2, 24, 0, 14, -2, 12, -12, 10, -2])
    .fill('#f3eccf')
    .center(x, y)
    .scale(size / 10, x, y)
    .animate(1000)
    .scale(size / 3, x, y)
    .opacity(0)
    .after(function () {
      this.element().remove();
    });
};




