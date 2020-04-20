import { createTiledSprite } from '../utils/createTiledSprite';
import { Sprite } from '../components/singleValue';
import { world } from '../singletons/world';

export function createSpriteEntity(textures, settings) {
  const sprite = createTiledSprite(textures, settings.tiledID);
  sprite.position.set(settings.x, settings.y);
  settings.parent.addChild(sprite);

  const entity = world.createEntity()
    .addComponent(Sprite, { value: sprite });

  return entity;
}
