import * as PIXI from 'pixi.js';

import { createMobEntity } from './entities/createMobEntity';
import { Follow } from './components/Follow';
import { loadTiledMap } from './utils/loadTiledMap';
import { pixi } from './singletons/pixi';
import { sliceTexture } from './utils/sliceTexture';
import { Sprite, Player } from './components/singleValue';
import { Velocity } from './components/Velocity';
import { world } from './singletons/world';

export function startGame() {
  const { resources } = pixi.loader;

  // Load the Map
  const tileSet = sliceTexture(resources.city_spritesheet.texture, {width: 16, height: 16}, {x: 1, y: 1});
  const map = loadTiledMap(tileSet, resources.world_map.data);

  // Create a Camera/View that can scroll around the world map.
  const worldMap = new PIXI.Container();
  worldMap.addChild(map);
  pixi.stage.addChild(worldMap);

  // Create the Player Mob
  const player = createMobEntity({
      name: 'Chris',
      resourceID: 'bald_beard',
      x: 100,
      y: 100,
      // parent: pixi.stage,
      parent: worldMap,
    })
    .addComponent(Player, {});


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
