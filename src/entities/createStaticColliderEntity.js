import { world } from '../singletons/world';
import { Sprite, Collider } from '../components/singleValue';

export function createStaticColliderEntity(sprite) {
  console.log('sprite', sprite.width, sprite.height, sprite);
  return world.createEntity()
    .addComponent(Collider, {})
    .addComponent(Sprite, {value: sprite})
}
