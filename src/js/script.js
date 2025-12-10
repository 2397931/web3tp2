import maplibregl from "maplibre-gl";
import Chart from "https://esm.sh/chart.js/auto";

// --- MapLibre ---
const carte = new maplibregl.Map({
  container: "carte",
  style: "https://tiles.openfreemap.org/styles/dark",
  center: [139.1104464, 35.5074466],
  zoom: 6,
  pitch: 30,
  bearing: 0
});

carte.on("style.load", () => {
  const layers = carte.getStyle().layers;
  let labelLayerId = null;
  for (const layer of layers) {
    if (layer.type === "symbol" && layer.layout && layer.layout["text-field"]) {
      labelLayerId = layer.id;
      break;
    }
  }

  carte.addSource("openfreemap", {
    url: "https://tiles.openfreemap.org/planet",
    type: "vector"
  });

  carte.addLayer(
    {
      id: "3d-buildings",
      source: "openfreemap",
      "source-layer": "building",
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": [
          "interpolate",
          ["linear"],
          ["get", "render_height"],
          0, "#000",
          200, "rgba(117, 244, 244, 1)",
          400, "rgba(223, 41, 53, 1)"
        ],
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15, 0,
          16, ["get", "render_height"]
        ],
        "fill-extrusion-opacity": 0.9
      }
    },
    labelLayerId || undefined
  );
});

// Animate camera rotation
let secondsPerRevolution = 50;
let startTime = null;
function rotateCamera(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsedSeconds = (timestamp - startTime) / 1000;
  const bearing = (elapsedSeconds / secondsPerRevolution) * 360;
  carte.setBearing(bearing % 360);
  requestAnimationFrame(rotateCamera);
}
rotateCamera(0);

// --- Chart.js ---
new Chart(document.querySelector("#a").getContext("2d"), {
  type: "line",
  data: {
    labels: ["Sep 16","Sep 17","Sep 18","Sep 19","Sep 20","Sep 21","Sep 22","Sep 23"],
    datasets: [
      {
        label: "auditeurs mensuels",
        data: [2263464,2264767,2266051,2267616,2270403,2275246,2277319],
        borderColor: "white",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4
      },
      {
        label: "Abonnés mensuels",
        data: [4500305,4487443,4470565,4455315,4461137,4685071,4765536],
        borderColor: "rgba(253, 202, 64, 1)",
        borderWidth: 3,
        pointRadius: 0,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Auditeurs et abonnés mensuels du groupe XG sur Spotify",
        font: { family: "Cynatar", size: 30, weight: "700", color: "rgb(253, 202, 64)" },
        padding: { top: 15, bottom: 10 }
      }
    },
    scales: {
      y: {
        type: "logarithmic",
        min: 2000000,
        max: 5000000,
        title: { display: true, text: "Valeur" },
        grid: { color: "rgba(222, 222, 222, 0.1)" }
      },
      x: {
        title: { display: true, text: "Dates" },
        grid: { color: "rgba(223, 41, 53, 0.1)" }
      }
    }
  }
});

// --- Random Image Hover ---
const images = document.querySelectorAll('.row2 img');
const hoverClasses = ['hover1', 'hover2', 'hover3'];
images.forEach(img => {
  const randomClass = hoverClasses[Math.floor(Math.random() * hoverClasses.length)];
  img.classList.add(randomClass);
});

// ---  Changement de couleur ---
document.addEventListener("DOMContentLoaded", () => {
  const radar = document.querySelector(".row4 .nine svg");
  const colors = ["rgb(253, 202, 64)","rgba(223, 41, 53, 1)","rgba(117, 244, 244, 1)"];
  let current = 0;
  radar.addEventListener("click", () => {
    current = (current + 1) % colors.length;
    radar.querySelectorAll("circle, path").forEach(el => el.setAttribute("fill", colors[current]));
  });
});

// --- icônes flicker ---
const icons = document.querySelectorAll(".icon-animate-1, .icon-animate-2");
function flickerIcon(icon) {
  icon.style.opacity = 0.2 + Math.random() * 0.8;
}
function animateFlicker() {
  icons.forEach(flickerIcon);
  requestAnimationFrame(animateFlicker);
}
animateFlicker();

// --- Page fade-in ---
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});
