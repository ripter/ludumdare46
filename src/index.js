import { pixi } from './singletons/pixi';
import { startGame } from './startGame';

// Load the resources and start the game.
// Images from https://www.kenney.nl/
pixi.loader
  .add('font', 'fonts/pixelkenney.fnt')
  .add('mobs', 'assets/mobs.json')
  .add('ui', 'assets/ui_spritesheet.png')
  .add('city_spritesheet', 'assets/city_spritesheet.png')
  .add('ui_map', 'assets/dialog_window.json')
  .add('ui_choices_map', 'assets/dialog_choices.json')
  .add('world_map', 'assets/world_map.json')
  .add('dialog_menu', 'dialog/menu.json')
  .add('dialog_kimchi', 'dialog/kimchi.json')
  .add('dialog_janet', 'dialog/janet.json')
  .load(startGame);
