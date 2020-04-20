import * as PIXI from 'pixi.js';

import { Rect } from '../components/singleValue';
import { world } from '../singletons/world';

// Non renderable from Tiled objects.
export function createRectEntity(settings) {
  const rect = new PIXI.Rectangle(settings.x, settings.y, 16, 16);

  const entity = world.createEntity()
    .addComponent(Rect, { value: rect });

  return entity;
}
