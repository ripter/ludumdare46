import * as PIXI from 'pixi.js';

import { createTiledSprite } from './createTiledSprite';

export function loadTiledMap(textures, mapData) {
  const map = new PIXI.Container();
  map.sortableChildren = true;
  map.name = 'tiledMap';
  const tileWidth = map.tileWidth = mapData.tilewidth;
  const tileHeight = map.tileHeight = mapData.tileheight;
  const tileSet = mapData.tilesets.source;

  // Create a container for each layer
  mapData.layers.forEach(layer => {
    // Create a container for each layer.
    const container = new PIXI.Container();
    container.name = layer.name;


    if (layer.type === 'tilelayer') {
      layer.data.forEach((tileID, index) => {
        const sprite = createTiledSprite(textures, tileID);
        const x = (0 | index % layer.width) * tileWidth;
        const y = (0 | index / layer.width) * tileHeight;
        sprite.position.set(x, y);
        container.addChild(sprite);
      });
    }
    else if (layer.type === 'objectgroup') {
      console.log('TODO: ADD THIS');
    }

    map.addChild(container);
  });

  return map;
}
