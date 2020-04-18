import { System } from 'ecsy';

import { Sprite } from '../components/singleValue';
import { Velocity } from '../components/Velocity';

// Adds Velocity to Sprite position
export class MovementSystem extends System {
  execute(delta) {
    this.queries.mobs.results.forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      const velocity = entity.getComponent(Velocity);

      sprite.position.x += velocity.x * delta;
      sprite.position.y += velocity.y * delta;
    });
  }
}
MovementSystem.queries = {
  mobs: {
    components: [Sprite, Velocity]
  }
}
