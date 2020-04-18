import * as PIXI from 'pixi.js';

import { createMobEntity } from './utils/createMobEntity';
import { loadTiledMap } from './utils/loadTiledMap';
import { pixi } from './singletons/pixi';
import { sliceTexture } from './utils/sliceTexture';
import { Sprite } from './components/singleValue';

export function startGame() {
  const { resources } = pixi.loader;

  // Setup the world map
  const tileSet = sliceTexture(resources.city_spritesheet.texture, {width: 16, height: 16}, {x: 1, y: 1});
  const map = loadTiledMap(tileSet, resources.world_map.data);
  pixi.stage.addChild(map);

  // Create the Player Mob
  const player = createMobEntity('bald_beard');
  const playerSprite = player.getComponent(Sprite).value;
  console.log('player', player, 'sprite', playerSprite);
  playerSprite.position.set(100, 100);
  playerSprite.play();
  pixi.stage.addChild(playerSprite);

}
