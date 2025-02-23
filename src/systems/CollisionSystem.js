import { System } from 'ecsy';

import { Velocity } from '../components/Velocity';
import { Collider, Sprite, HasDialog } from '../components/singleValue';
import { intersect, spriteToBBox, spriteVelocityToBBox } from '../utils/intersect';
import { Dialog } from '../components/Dialog';

// AABB Collision detection
function doesIntersect(collider, collidable) {
  const aBox = spriteVelocityToBBox(collider.getComponent(Sprite).value, collider.getComponent(Velocity));
  const bBox = spriteToBBox(collidable.getComponent(Sprite).value);
  return intersect(aBox, bBox);
}


export class CollisionSystem extends System {
  execute() {
    const collidables = this.queries.collidables.results;

    // If Velocity would cause a collision, reset Velocity on the collider.
    this.queries.colliders.results.forEach((collider) => {
      collidables.forEach((collidable) => {
        if (collider === collidable) { return; }
        const isColliding = doesIntersect(collider, collidable);

        if (isColliding) {
          collider.getMutableComponent(Velocity).reset();

          // Does the collidable want to talk?
          if (collidable.hasComponent(HasDialog)) {
            const dialogID = collidable.getComponent(HasDialog).value;
            collidable.addComponent(Dialog, {
              resourceID: dialogID,
            });
          }
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
  },
};
