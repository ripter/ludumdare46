import * as PIXI from 'pixi.js';

import { world } from '../singletons/world';
import { Sprite, Text } from '../components/singleValue';

export function createTextEntity(settings) {
  const sprite = new PIXI.BitmapText(settings.text, {
    font: 'pixel', // Pixel Font from https://www.kenney.nl/
    align: 'left',
  });
  settings.parent.addChild(sprite);

  sprite.position.set(settings.x, settings.y);

  return world.createEntity()
    .addComponent(Sprite, {value: sprite})
    .addComponent(Text, {})
}
