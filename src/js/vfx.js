import { VFX } from "vfx-js";

const vfx = new VFX();

// select all images in row2
const images = document.querySelectorAll(".row2 img");

images.forEach(el => {
  vfx.add(el, {
    shader: "glitch",
    overflow: 2,      // how much the effect “moves”
    speed: 0.5         // slow it down (default is 1)
  });
});
