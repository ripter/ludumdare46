import * as PIXI from 'pixi.js';
import {
  World, System, Component, Not,
} from 'ecsy';

import { startGame } from './startGame';

console.log('Loaded');

const VIEW_WIDTH = 320;
const VIEW_HEIGHT = 200;
const PLAYER_SPEED = 0.15;

// Pixi Application
const pixi = window.pixi = new PIXI.Application({
  resolution: window.devicePixelRatio,
  autoDensity: true,
  view: window.elCanvas,
  width: VIEW_WIDTH,
  height: VIEW_HEIGHT,
});

// ECSY World
const world = new World();


// Load the resources and start the game.
pixi.loader
  .add('city_spritesheet', 'assets/city_spritesheet.png')
  .add('world_map', 'assets/world_map.json')
  .load(startGame);
