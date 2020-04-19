import { System } from 'ecsy';

import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';
import { Collider, Sprite, Player } from '../components/singleValue';
import { intersect, spriteToBBox, spriteVelocityToBBox } from '../utils/intersect';

export class CollisionSystem extends System {
  execute(delta) {
    const collidables = this.queries.collidables.results;

    // If Velocity would cause a collision, reset Velocity on the collider.
    this.queries.colliders.results.forEach(collider => {
      collidables.forEach(collidable => {
        if (collider === collidable) { return; }
        const isColliding = doesIntersect(collider, collidable);

        if (isColliding) {
          collider.getMutableComponent(Velocity).reset();
        }
      });
    });
  }
}
CollisionSystem.queries = {
  colliders: {
    components: [Collider, Velocity],
  },
  collidables: {
    components: [Collider],
  }
}


// AABB Collision detection
function doesIntersect(collider, collidable) {
  const aBox = spriteVelocityToBBox(collider.getComponent(Sprite).value, collider.getComponent(Velocity));
  const bBox = spriteToBBox(collidable.getComponent(Sprite).value);
  return intersect(aBox, bBox);
}
