import { System } from 'escy';

import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';

export function CollisionSystem extends System {
  execute(delta) {
    const staticTiles = this.queries.static.results;
    const movingObjects = this.queries.moving.results;

    this.queries.moving.results.forEach(entity => {

    });
  }
}
CollisionSystem.queries = {
  moving: {
    components: [Mob, Velocity]
  },
  static: {
    components: [StaticCollider]
  }
}
