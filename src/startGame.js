import * as PIXI from 'pixi.js';

import { createMobEntity } from './entities/createMobEntity';
import { Follow } from './components/Follow';
import { loadTiledMap } from './utils/loadTiledMap';
import { pixi } from './singletons/pixi';
import { sliceTexture } from './utils/sliceTexture';
import { Sprite, Player, Dialog } from './components/singleValue';
import { Velocity } from './components/Velocity';
import { world } from './singletons/world';

export function startGame() {
  const { resources } = pixi.loader;

  // Load the World Map
  const tileSet = sliceTexture(resources.city_spritesheet.texture, {width: 16, height: 16}, {x: 1, y: 1});
  const map = loadTiledMap(tileSet, resources.world_map.data);
  map.name = 'worldMap';

  // Create a Camera/View that can scroll around the world map.
  const worldMap = new PIXI.Container();
  worldMap.addChild(map);
  pixi.stage.addChild(worldMap);


  // UI Dialog Window
  const uiSet = sliceTexture(resources.ui.texture, {width: 16, height: 16}, {x: 0, y: 0});
  const uiMap = loadTiledMap(uiSet, resources.ui_map.data);
  uiMap.name = 'dialogMap';
  pixi.stage.addChild(uiMap);

  const uiChoicesMap = loadTiledMap(uiSet, resources.ui_choices_map.data);
  uiChoicesMap.name = 'choicesMap';
  uiChoicesMap.position.set(16 * 0.5, 16 * 5.5);
  pixi.stage.addChild(uiChoicesMap);


  // Create the Player Mob
  const player = createMobEntity({
      name: 'Chris',
      resourceID: 'bald_beard',
      x: 100,
      y: 100,
      parent: worldMap,
    })
    .addComponent(Player, {})
    .addComponent(Dialog, {value: 'menu'})


  world.createEntity()
    .addComponent(Sprite, {value: worldMap})
    .addComponent(Velocity)
    .addComponent(Follow, {target: player});


  // Start the Game loop.
  // Use Pixi's ticker for the game loop.
  pixi.ticker.add(delta => {
    world.execute(delta);
  });
}
