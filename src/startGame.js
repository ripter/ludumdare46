import { AISystem } from './systems/AISystem';
import { createMobEntity } from './entities/createMobEntity';
import { Dialog } from './components/Dialog';
import { DialogInputSystem } from './systems/DialogInputSystem';
import { DialogWindow, Focus, FollowPlayer, Player, Sprite } from './components/singleValue';
import { Input } from './components/Input';
import { loadDialogMap } from './utils/loadDialogMap';
import { loadTiledMap } from './utils/loadTiledMap';
import { MapInputSystem } from './systems/MapInputSystem';
import { pixi } from './singletons/pixi';
import { sliceTexture } from './utils/sliceTexture';
import { Window } from './components/Window';
import { world } from './singletons/world';


export function startGame() {
  const { resources } = pixi.loader;
  // Tiled uses an index based system, so instead of using json sprite sheets, slice the image into an array
  const tileSet = sliceTexture(resources.city_spritesheet.texture, { width: 16, height: 16 }, { x: 1, y: 1 });
  const uiSet = sliceTexture(resources.ui.texture, { width: 16, height: 16 }, { x: 0, y: 0 });

  // Keep a global/world refrence to the Input component.
  // It holds the current input state.
  world.createEntity()
    .addComponent(Input, {});

  // Create the Window for the game world.
  const windowMap = world.createEntity()
    .addComponent(Window, {
      name: 'map',
      systems: [MapInputSystem, AISystem],
    })
    .addComponent(FollowPlayer)
    .addComponent(Sprite, {
      value: loadTiledMap(tileSet, resources.world_map.data),
    });

  world.createEntity()
    .addComponent(Window, {
      name: 'dialog',
      systems: [DialogInputSystem],
    })
    .addComponent(DialogWindow, {})
    .addComponent(Sprite, {
      value: loadDialogMap(uiSet, resources.ui_map.data, resources.ui_choices_map.data),
    })
    .addComponent(Focus, {});

  // TODO: Spawn player from the TiledMap data
  const mapSprite = windowMap.getComponent(Sprite).value;
  // Create the Player Mob
  createMobEntity({
    name: 'Chris',
    resourceID: 'bald_beard',
    x: 100,
    y: 100,
    parent: mapSprite,
  })
    .addComponent(Player, {})
    .addComponent(Dialog, { resourceID: 'dialog_menu' });


  // Start the Game loop.
  // Use Pixi's ticker for the game loop.
  pixi.ticker.add((delta) => {
    world.execute(delta);
  });
}
