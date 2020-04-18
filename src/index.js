import { pixi } from './singletons/pixi';
import { startGame } from './startGame';

// Load the resources and start the game.
pixi.loader
  .add('mobs', 'assets/mobs.json')
  .add('city_spritesheet', 'assets/city_spritesheet.png')
  .add('world_map', 'assets/world_map.json')
  .load(startGame);
