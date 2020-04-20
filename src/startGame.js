import * as PIXI from 'pixi.js';

import { createMobEntity } from './entities/createMobEntity';
// import { Follow } from './components/Follow';
import { loadDialogMap } from './utils/loadDialogMap';
import { loadTiledMap } from './utils/loadTiledMap';
import { pixi } from './singletons/pixi';
import { sliceTexture } from './utils/sliceTexture';
import {
  Sprite, Player, Dialog, Focus, FollowPlayer,
} from './components/singleValue';
import { Velocity } from './components/Velocity';
import { Window } from './components/Window';
import { world } from './singletons/world';
// import { PlayerInputSystem } from
import { MapInputSystem } from './systems/MapInputSystem';
import { DialogInputSystem } from './systems/DialogInputSystem';
import { Input } from './components/Input';

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
      systems: [MapInputSystem],
    })
    .addComponent(FollowPlayer)
    .addComponent(Sprite, {
      value: loadTiledMap(tileSet, resources.world_map.data),
    });

  const windowDialog = world.createEntity()
    .addComponent(Window, {
      name: 'dialog',
      systems: [DialogInputSystem],
    })
    .addComponent(Sprite, {
      value: loadDialogMap(uiSet, resources.ui_map.data, resources.ui_choices_map.data),
    })
    .addComponent(Focus, {});

  // TODO: Spawn player from the TiledMap data
  const mapSprite = windowMap.getComponent(Sprite).value;
  // Create the Player Mob
  const player = createMobEntity({
    name: 'Chris',
    resourceID: 'bald_beard',
    x: 100,
    y: 100,
    parent: mapSprite,
  })
    .addComponent(Player, {})
    .addComponent(Dialog, { value: 'menu' });


  // Start the Game loop.
  // Use Pixi's ticker for the game loop.
  pixi.ticker.add((delta) => {
    world.execute(delta);
  });
}
