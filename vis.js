
/* -----------------------------
   I MADE TWO SIMPLE VISUALIZATIONS with the help of:
    https://developer.mozilla.org/en-US/ and Youtube Tutorials
-------------------------------- */



/* -----------------------------
   Simple Canvas ScatterPlot 
-------------------------------- */

const scatterCanvas = document.getElementById("scatter");
const sctx = scatterCanvas.getContext?.("2d");

// Simple demo data (0–100 coordinate space)
const points = [
  { x: 25, y: 70, r: 28, color: "#afe89dff" }, 
  { x: 8, y: 95, r: 18, color: "#5ae1e6ff" },
  { x: 47, y: 65, r: 66, color: "#8a5dddff" }, 
  { x: 58, y: 80, r: 37, color: "#e3928e" }, 
  { x: 85, y: 52, r: 26, color: "#e4eb88ff" }, 
];

// Draw once on load and again on resize
if (sctx) {
  window.addEventListener("resize", drawScatter);
  drawScatter();
}

function drawScatter() {
  if (!sctx) return;

  const dpr = window.devicePixelRatio || 1;
  const cssW = Math.floor(scatterCanvas.getBoundingClientRect().width);
  const width = Math.max(280, Math.min(cssW, 400)); //width and length of grid
  const height = Math.round(width * 0.55); //gentle landscape aspect

  scatterCanvas.width = width * dpr;
  scatterCanvas.height = height * dpr;
  scatterCanvas.style.width = width + "px";
  scatterCanvas.style.height = height + "px";

  sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  sctx.clearRect(0, 0, width, height);

  // Background already set by CSS; draw subtle grid
  drawGrid(sctx, width, height, 14, "#5870a0ff");

  // Plot circles (0–100 data --> canvas coords with padding)
  const pad = 24;
  const plotW = width - pad * 2;
  const plotH = height - pad * 2;

  points.forEach(p => {
    const cx = pad + (p.x / 100) * plotW;
    const cy = pad + (p.y / 100) * plotH;
    sctx.beginPath();
    sctx.globalAlpha = 0.9;            
    sctx.fillStyle = p.color;
    sctx.arc(cx, cy, p.r, 0, Math.PI * 2);
    sctx.fill();

    //Softer overlap effect 
    sctx.beginPath();
    sctx.globalAlpha = 0.35;
    sctx.arc(cx, cy, p.r, 0, Math.PI * 2);
    sctx.fill();
    sctx.globalAlpha = 1;
  });
}

//light grid lines
function drawGrid(ctx, w, h, step, color) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  // verticals
  for (let x = step; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
    ctx.stroke();
  }
  // horizontals
  for (let y = step; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
    ctx.stroke();
  }
  ctx.restore();
}













/* -----------------------------
   Simple Canvas Pie Chart
-------------------------------- */


const data = [25, 50.2, 25.6, 28.2]; // slice values (Has been converted into percentages)
// Four soft tones 
const colors = ["#eea8a8ff", "#6ada66ff", "#46e7f3ff", "#c074ecff"];

// Grab the canvas and 2D context
const canvas = document.getElementById("pie");
const ctx = canvas.getContext("2d");

// Render once and again on resize so it stays responsive
window.addEventListener("resize", draw);
draw();

function draw() {
  // Make the canvas crisp on any display (better resolution
  const dpr = window.devicePixelRatio || 1;

  // Use the wrapper's CSS width to decide the canvas size (see CSS wrapper function)
  const cssSize = Math.floor(canvas.getBoundingClientRect().width);
  const size = Math.max(220, Math.min(cssSize, 560)); // keep a sensible range

  canvas.width = size * dpr;   // real pixel size
  canvas.height = size * dpr;  // real pixel size
  canvas.style.width = size + "px";   // CSS size (what you see)
  canvas.style.height = size + "px";

  // Scale drawing so 1 unit in canvas equals 1 CSS pixel
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Compute geometry
  const cx = size / 2;                 // center x
  const cy = size / 2;                 // center y
  const radius = size * 0.48;          // pie radius (leave some padding)

  // Clear old frame
  ctx.clearRect(0, 0, size, size);

  // Draw each slice
  const total = data.reduce((a, b) => a + b, 0);
  let start = -Math.PI / 2; 

  data.forEach((value, i) => {
    const angle = (value / total) * Math.PI * 2; // fraction of circle
    const end = start + angle;

    // Slice fill
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    //Optional subtle white separators to match the distinct wedges
    ctx.strokeStyle = "rgba(255,255,255,0.9)";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Label (the raw number, centered within the slice)
    const mid = (start + end) / 2;                 // angle halfway into slice
    const labelR = radius * 0.62;                  // place labels inside the wedg
    const lx = cx + Math.cos(mid) * labelR;
    const ly = cy + Math.sin(mid) * labelR;

    // Text styling that scales with chart
    ctx.fillStyle = "#000";                       
    ctx.font = `bold ${Math.max(12, Math.round(size * 0.07))}px system-ui, Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Keep the original decimals (e.g., 50.2, 25.6, 28.2)
    const pct = Math.round((value / total) * 1000) / 10; // e.g., 38.9%
    ctx.fillText(`${pct}%`, lx, ly);

    start = end;
  });
}




















