import maplibregl from "maplibre-gl";

const carte = new maplibregl.Map({
  container: "carte",
  style: "https://tiles.openfreemap.org/styles/dark",
  center: [139.1104464, 35.5074466],
  zoom: 6
});


