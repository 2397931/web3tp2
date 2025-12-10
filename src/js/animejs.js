import { animate, svg, utils } from 'animejs';

const chiffreElements = document.querySelectorAll(".chiffre");

chiffreElements.forEach((element) => {
  animate(element, {
    textContent: () => utils.random(0, 9999, 0),
    modifier: utils.round(0),
    ease: "in(1)",
    delay: () => utils.random(100, 2000, 0),
    loop: true,
    loopDelay: 500,
    onLoop: (self) => {
      self.refresh();
    }
  });
});
