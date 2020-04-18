import * as PIXI from 'pixi.js';

import { DIRECTION, DIRECTION_LIST} from '../consts/direction';
import { Mob } from '../components/Mob';
import { pixi } from '../singletons/pixi';
import { Sprite } from '../components/singleValue';
import { Velocity } from '../components/Velocity';
import { world } from '../singletons/world';


export function createMobEntity(name) {
  const { spritesheet } = pixi.loader.resources.mobs;
  const animations = DIRECTION_LIST.map(dir => spritesheet.animations[`${name}_${dir}`]);
  const sprite = new PIXI.AnimatedSprite(animations[DIRECTION.SOUTH]);
  sprite.animationSpeed = 0.15;

  const mob = world.createEntity()
    .addComponent(Sprite, {
      value: sprite,
    })
    .addComponent(Mob, {
      animations,
      direction: DIRECTION.SOUTH,
    })
    .addComponent(Velocity)

  return mob;
}
