import * as PIXI from 'pixi.js';

import { createMobEntity } from './entities/createMobEntity';
import { loadTiledMap } from './utils/loadTiledMap';
import { pixi } from './singletons/pixi';
import { sliceTexture } from './utils/sliceTexture';
import { Sprite, Velocity, Player } from './components/singleValue';
import { world } from './singletons/world';

export function startGame() {
  const { resources } = pixi.loader;

  // Setup the world map
  const tileSet = sliceTexture(resources.city_spritesheet.texture, {width: 16, height: 16}, {x: 1, y: 1});
  const map = loadTiledMap(tileSet, resources.world_map.data);
  pixi.stage.addChild(map);

  // Create the Player Mob
  const player = createMobEntity('bald_beard')
    .addComponent(Player, {});
  const playerSprite = player.getComponent(Sprite).value;
  console.log('player', player, 'sprite', playerSprite);
  playerSprite.position.set(100, 100);
  playerSprite.play();
  pixi.stage.addChild(playerSprite);



  // Start the Game loop.
  // Use Pixi's ticker for the game loop.
  pixi.ticker.add(delta => {
    world.execute(delta);
  });
}
