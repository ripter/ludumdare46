import { System } from 'ecsy';

import { AI } from '../components/AI';
import { AI as AIType } from '../consts/ai';
import { Dialog } from '../components/Dialog';
import { DIRECTION_LIST } from '../consts/direction';
import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';
import { velocityFromDirection } from '../utils/velocityFromDirection';


function simpleMove(entity) {
  const velocity = entity.getMutableComponent(Velocity);
  const seed = 0 | Math.random() * 100;
  const isMove = seed % 7 === 0;


  if (isMove) {
    const direction = 0 | Math.random() * DIRECTION_LIST.length;
    velocity.set(velocityFromDirection(direction));
  }
  else {
    velocity.set({ x: 0, y: 0 });
  }
}

function crazySpin(entity) {
  const velocity = {
    x: 0 | (Math.random() * 4) - 2,
    y: 0 | (Math.random() * 4) - 2,
  };
  entity.getMutableComponent(Velocity).set(velocity);
}


export class AISystem extends System {
  execute(delta, time) {
    this.queries.npcs.results.forEach((entity) => {
      const isTalking = entity.hasComponent(Dialog);
      const ai = entity.getMutableComponent(AI);
      if (ai.waitUntil > time) { return; }

      // Talking NPCs shouldn't move.
      if (isTalking) {
        entity.getMutableComponent(Velocity).set({ x: 0, y: 0 });
      }
      // Move based on AI type
      else if (ai.value === AIType.simple) {
        simpleMove(entity);
      }
      else if (ai.value === AIType.crazySpin) {
        crazySpin(entity);
      }

      ai.waitUntil = time + 300;
    });
  }
}
AISystem.queries = {
  npcs: {
    components: [AI, Mob, Velocity],
  },
};
