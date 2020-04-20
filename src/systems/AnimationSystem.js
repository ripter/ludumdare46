import { System } from 'ecsy';

import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';
import { Sprite } from '../components/singleValue';
import { directionFromVelocity } from '../utils/directionFromVelocity';

// Updates Sprite.textures based on Direction and Velocity
export class AnimationSystem extends System {
  execute() {
    this.queries.mobs.results.forEach((entity) => {
      const sprite = entity.getMutableComponent(Sprite).value;
      const mob = entity.getMutableComponent(Mob);
      const velocity = entity.getComponent(Velocity);
      const direction = directionFromVelocity(velocity);
      const isMoving = direction !== null;

      // if the mob is moving in a new direction.
      if (isMoving && (direction !== mob.direction)) {
        // Update the direction and set the new animation textures.
        mob.direction = direction;
        sprite.textures = mob.activeAnimation;
      }

      // if the player is moving
      if (isMoving && !sprite.playing) {
        sprite.gotoAndPlay(0);
      }
      else if (!isMoving && sprite.playing) {
        sprite.gotoAndStop(0);
      }
    });
  }
}

AnimationSystem.queries = {
  mobs: {
    components: [Mob, Sprite, Velocity],
  },
};
