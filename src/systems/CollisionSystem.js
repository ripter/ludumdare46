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
      const aBox = {
        minX: sprite.position.x
      }
      const movingRect = {
        x1: sprite.position.x, x2: sprite.position.x + sprite.width,
        y1: sprite.position.y, y2: sprite.position.y + sprite.height,
      };
      // console.log('movingRect', sprite, {...movingRect});

      staticTiles.forEach(staticEntity => {
        const staticSprite = staticEntity.getComponent(Sprite).value;

        // Needs to be Sprite + Velocity
        const aBox = spriteVelocityToBBox(sprite, velocity);
        const bBox = spriteToBBox(staticSprite)
        const intersection = intersect(aBox, bBox);

        if (intersection) {
          // console.log('isColliding', intersection, sprite, staticSprite)
          // velocity.x -= intersection.x;
          // velocity.y -= intersection.y;
          velocity.reset();
        }

        // const staticRect = staticSprite.getBounds();
        // const staticRect = {
        //   x1: staticSprite.position.x, x2: staticSprite.position.x + staticSprite.width,
        //   y1: staticSprite.position.y, y2: staticSprite.position.y + staticSprite.height,
        // };
        //
        // // console.log('staticRect', staticSprite, {...staticRect});
        // if (movingRect.x1 > staticRect.x1 && movingRect.x1 < staticRect.x2) {
        //   console.log('Collide!', sprite, 'with', staticSprite);
        // }

        // if (movingRect.x > staticRect.x && movingRect.x < (staticRect.x + staticRect.width)) {
        // if ((sprite.position.x > staticSprite.position.x)
        //   && (sprite.position.x < (staticSprite.position.x + staticSprite.width))){

          // console.group('Collide X')
          // console.log('sprite.position', sprite.position, sprite.width);
          // console.log('staticSprite.position', staticSprite.position, staticSprite.width);
          // // // console.log('moving', movingRect);
          // // // console.log('static', staticRect);
          // console.groupEnd();
        // }
        // console.log('rect', rect);
        // const rect = staticEntity.getComponent(Collider).value;
        // const doesCollide
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
