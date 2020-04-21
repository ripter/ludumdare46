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
  .add('world_map', 'assets/world.json')
  .add('dialog_menu', 'dialog/menu.json')
  .add('dialog_kimchi', 'dialog/kimchi.json')
  .add('dialog_janet', 'dialog/janet.json')
  .add('dialog_me', 'dialog/me.json')
  .add('dialog_police_warn', 'dialog/police_warn.json')
  .add('dialog_audery_2', 'dialog/audery_2.json')
  .add('dialog_awesome', 'dialog/awesome.json')
  .add('dialog_win', 'dialog/won.json')
  .add('dialog_pickup_toner', 'dialog/pickup_toner.json')
  .add('dialog_eat_toner', 'dialog/eat_toner.json')
  .load(startGame);
