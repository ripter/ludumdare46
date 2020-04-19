import * as PIXI from 'pixi.js';

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 200;
// const VIEW_WIDTH = 320 * 2;
// const VIEW_HEIGHT = 200 * 2;

export const pixi = window.pixi = new PIXI.Application({
  backgroundColor: 0x419b62,
  // resolution: window.devicePixelRatio,
  // autoDensity: true,
  view: window.elCanvas,
  width: VIEW_WIDTH,
  height: VIEW_HEIGHT,
});

// Remove the set size so we can scale with CSS
// window.elCanvas.removeAttribute('width');
// window.elCanvas.removeAttribute('height');
