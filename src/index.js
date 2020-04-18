
import {
  World, System, Component, Not,
} from 'ecsy';

import { startGame } from './startGame';


const PLAYER_SPEED = 0.15;


// ECSY World
const world = new World();


// Load the resources and start the game.
pixi.loader
  .add('city_spritesheet', 'assets/city_spritesheet.png')
  .add('world_map', 'assets/world_map.json')
  .load(startGame);
