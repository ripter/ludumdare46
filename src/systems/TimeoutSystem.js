import { System } from 'ecsy';

import { Timeout } from '../components/singleValue';

// When Timeout is added to an entity, it counts down and then removes it's self.
export class TimeoutSystem extends System {
  execute(delta) {
    this.queries.active.results.forEach(entity => {
      const timeLeft = entity.getMutableComponent(Timeout);
      timeLeft.value -= delta;

      if (timeLeft.value <= 0) {
        entity.removeComponent(Timeout);
      }
    });
  }
}
TimeoutSystem.queries = {
  active: {
    components: [Timeout],
  }
}
