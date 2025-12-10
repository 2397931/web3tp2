import Zdog from "zzz";

const illo = new Zdog.Illustration({
    element: ".zdog-canvas",
    resize: true,
});

// 🌟 GLOW behind the sphere
const glow = new Zdog.Ellipse({
    addTo: illo,
    diameter: 180, // bigger than your sphere
    stroke: 60,
    color: "rgba(117, 244, 244, 0.25)", // soft blue glow
    translate: { z: -10 }, // push behind sphere so it never covers it
});

// TOP hemisphere
let dome = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 120,
  stroke: false,
  color: '#ffffff',
  backface: '#EA0',
});

// BOTTOM hemisphere
let domeBottom = new Zdog.Hemisphere({
  addTo: illo,
  diameter: 120,
  stroke: false,
  color: '#ffffff',
  backface: '#EA0',
  rotate: { x: Math.PI },
});

// Outline circle
const circ = new Zdog.Ellipse({
    addTo: illo,
    diameter: 120,
    stroke: 15,
    color: "#75F4F4",
});

// Animation
function animate() {
    illo.rotate.y += 0.01;
    illo.rotate.x += 0.005;

    illo.updateRenderGraph();
    requestAnimationFrame(animate);
}

animate();
