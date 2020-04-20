import * as PIXI from 'pixi.js';

import {
  AI, Cursor, Slot, HasDialog, Collider
} from '../components/singleValue';
import { createColliderEntity } from '../entities/createColliderEntity';
import { createMapObject } from './createMapObject';
import { createMobEntity } from '../entities/createMobEntity';
import { createRectEntity } from '../entities/createRectEntity';
import { createSpriteEntity } from '../entities/createSpriteEntity';
import { createTextEntity } from '../entities/createTextEntity';
import { createTiledSprite } from './createTiledSprite';
import { mapLayers } from '../consts/mapLayers';
import { mapTypes } from '../consts/mapTypes';

// Returns a PIXI.Container with all the sprites and objects loaded from the Tiled Map
export function loadTiledMap(textures, mapData) {
  const map = new PIXI.Container();
  map.sortableChildren = true;
  const tileWidth = map.tileWidth = mapData.tilewidth;
  const tileHeight = map.tileHeight = mapData.tileheight;

  // Create a container for each layer
  mapData.layers.forEach((layer) => {
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

        // If we are on the collision layer, and the tile isn't blank, add it to collision
        if (layer.name === mapLayers.collision && sprite.data.tileID !== 0) {
          createColliderEntity(sprite);
        }
      });
    }
    // Object layers
    else if (layer.type === 'objectgroup') {
      layer.objects.forEach((obj) => {
        const mapObject = createMapObject(obj);
        mapObject.parent = container;
        let entity;

        if (obj.type === mapTypes.mob) {
          entity = createMobEntity(mapObject);
        }
        else if (obj.type === mapTypes.text) {
          entity = createTextEntity(mapObject);
        }
        else if (obj.type === mapTypes.sprite) {
          entity = createSpriteEntity(textures, mapObject);
        }
        else if (obj.type === mapTypes.rect) {
          entity = createRectEntity(mapObject);
        }
        else if (obj.type === mapTypes.collider) {
          entity = createSpriteEntity(textures, mapObject)
            .addComponent(Collider, {})
        }

        //
        // Add Components defiend in the map data
        if (mapObject.AI) {
          entity.addComponent(AI, { value: mapObject.AI });
        }
        if (mapObject.slot) {
          entity.addComponent(Slot, { value: mapObject.slot });
        }
        if (mapObject.cursor) {
          entity.addComponent(Cursor, { value: mapObject.cursor });
        }
        if (mapObject.hasDialog) {
          entity.addComponent(HasDialog, { value: mapObject.hasDialog });
        }
      });
    }

    map.addChild(container);
  });

  return map;
}
