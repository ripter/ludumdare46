import * as PIXI from 'pixi.js';

import { world } from '../singletons/world';
import { Sprite, Text } from '../components/singleValue';

export function createTextEntity(settings) {
  const sprite = new PIXI.Text(settings.text,{fontFamily : 'monospace', fontSize: 14});
  settings.parent.addChild(sprite);

  sprite.position.set(settings.x, settings.y);

  return world.createEntity()
    .addComponent(Sprite, {value: sprite})
    .addComponent(Text, {})
}
