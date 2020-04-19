import { System } from 'ecsy';

import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';
import { Collider, Sprite, Player } from '../components/singleValue';
import { intersect, spriteToBBox, spriteVelocityToBBox } from '../utils/intersect';

export class CollisionSystem extends System {
  execute(delta) {
    const staticTiles = this.queries.static.results;
    const movingObjects = this.queries.moving.results;

    this.queries.moving.results.forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      const velocity = entity.getComponent(Velocity);

      staticTiles.forEach(staticEntity => {
        const staticSprite = staticEntity.getComponent(Sprite).value;

        const aBox = spriteVelocityToBBox(sprite, velocity);
        const bBox = spriteToBBox(staticSprite)
        const intersection = intersect(aBox, bBox);

        if (intersection) {
          velocity.reset();
        }
      });
    });
  }
}
CollisionSystem.queries = {
  moving: {
    components: [Velocity, Sprite]
  },
  static: {
    components: [Collider]
  }
}
