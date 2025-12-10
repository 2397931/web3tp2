import * as Tone from "tone.js";

const button = document.querySelector("button");

const player = new Tone.Player("./assets/audio/gala.mp3").toDestination();

player.autostart = false;
player.loop = false;

button.addEventListener("click", async () => {
  await Tone.start();

  player.start();
});
