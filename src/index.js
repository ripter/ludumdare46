import { pixi } from './singletons/pixi';
import { startGame } from './startGame';

// Load the resources and start the game.
pixi.loader
  .add('mobs', 'assets/mobs.json')
  .add('ui', 'assets/ui_spritesheet.png')
  .add('city_spritesheet', 'assets/city_spritesheet.png')
  .add('ui_map', 'assets/dialog_window.json')
  .add('world_map', 'assets/world_map.json')
  .load(startGame);
