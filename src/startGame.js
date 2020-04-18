import * as PIXI from 'pixi.js';

import { pixi } from './singletons/pixi';
import { loadTiledMap } from './utils/loadTiledMap';
import { sliceTexture } from './utils/sliceTexture';

export function startGame() {
  const { resources } = pixi.loader;

  const tileSet = sliceTexture(resources.city_spritesheet.texture, {width: 16, height: 16}, {x: 1, y: 1});
  const map = loadTiledMap(tileSet, resources.world_map.data);

  pixi.stage.addChild(map);

  console.log('starting Game');

  // const sprite = new PIXI.Sprite(resources.city_spritesheet.texture);
  // const sprite = new PIXI.Sprite(tileSet[125]);
  // pixi.stage.addChild(sprite);
}
