import { System } from 'ecsy';

import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';
import { Sprite } from '../components/singleValue';
import { directionFromVelocity } from '../utils/directionFromVelocity';
import { DIRECTION_LIST } from '../consts/direction';

// Updates Sprite.textures based on Direction and Velocity
export class AnimationSystem extends System {
  execute(delta) {
    this.queries.mobs.results.forEach(entity => {
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
        sprite.play();
      }
      else if (!isMoving && sprite.playing) {
        sprite.stop();
      }
    });
  }
}

AnimationSystem.queries = {
  mobs: {
    components: [Mob, Sprite, Velocity]
  }
}

    // this.queries.sprites.results.forEach(entity => {
    //   const sprite = entity.getMutableComponent(Sprite).value;
    //   const velocity = entity.getComponent(Velocity);
    //   const mob = entity.getComponent(Mob)
    //   // const animated = entity.getComponent(Animated);
    //   const prevDirection = animated.direction;
    //
    //   // If there is a velocity, update the direction
    //   if (velocity.x !== 0 || velocity.y !== 0) {
    //     if (velocity.x < 0) { animated.direction = DIRECTION.NORTH; }
    //     else if (velocity.x > 0) { animated.direction = DIRECTION.SOUTH; }
    //     else if (velocity.y < 0) { animated.direction = DIRECTION.WEST; }
    //     else if (velocity.y > 0) { animated.direction = DIRECTION.EAST; }
    //   }
    //
    //   // if the direction changed, change the animation list.
    //   if (prevDirection !== animated.direction) {
    //     sprite.textures = animated.activeAnimation;
    //   }
    //
    //   // Start/Stop the animation based on velocity
    //   if (velocity.x !== 0 || velocity.y !== 0) {
    //     if (!sprite.playing) {
    //       sprite.play();
    //     }
    //
    //   } else {
    //     if (sprite.playing) {
    //       sprite.stop();
    //     }
    //   }
    // });
  // static queries = {
  //   sprites: {
  //     components: [Sprite, Velocity, Animated]
  //   }
  // }
