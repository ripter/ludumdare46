import * as PIXI from 'pixi.js';

import { createTiledSprite } from './createTiledSprite';
import { createStaticColliderEntity } from '../entities/createStaticColliderEntity';
import { createMobEntity } from '../entities/createMobEntity';
import { mapTypes } from '../consts/mapTypes';
import { mapLayers } from '../consts/mapLayers';
import { createMapObject } from './createMapObject';
import { Sprite, AI } from '../components/singleValue';

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

    // Tile Layers
    if (layer.type === 'tilelayer') {
      layer.data.forEach((tileID, index) => {
        const sprite = createTiledSprite(textures, tileID);
        const x = (0 | index % layer.width) * tileWidth;
        const y = (0 | index / layer.width) * tileHeight;
        sprite.position.set(x, y);
        container.addChild(sprite);
      });
    }
    // Object layers
    else if (layer.type === 'objectgroup') {
      layer.objects.forEach(obj => {
        const mapObject = createMapObject(obj);
        mapObject.parent = container;
        const entity = createMobEntity(mapObject);

        // Add extra components
        if (mapObject.AI) {
          entity.addComponent(AI, {value: mapObject.AI});
        }
      });
    }

    map.addChild(container);
  });

  return map;
}
