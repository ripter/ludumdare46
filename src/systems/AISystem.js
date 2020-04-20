import { System, Not } from 'ecsy';

import { AI as AIType } from '../consts/ai';
import { DIRECTION_LIST } from '../consts/direction';
import { Mob } from '../components/Mob';
import { Velocity } from '../components/Velocity';
import { AI, Timeout } from '../components/singleValue';
import { Dialog } from '../components/Dialog';
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
  execute() {
    this.queries.npcs.results.forEach((entity) => {
      const { speed } = entity.getComponent(Mob);
      const isTalking = entity.hasComponent(Dialog);
      const ai = entity.getComponent(AI).value;

      // Talking NPCs shouldn't move.
      if (isTalking) {
        entity.getMutableComponent(Velocity).set({ x: 0, y: 0 });
      }
      // Move based on AI type
      else if (ai === AIType.simple) {
        simpleMove(entity);
      }
      else if (ai === AIType.crazySpin) {
        crazySpin(entity);
      }

      entity.addComponent(Timeout, { value: speed * 13 });
    });
  }
  // stop() {
  //   // Cancel all NPCs movement. Otherwise they will keep moving when the player opens the menu.
  //   this.queries.npcs.results.forEach((entity) => {
  //     if (entity.hasComponent(Velocity)) {
  //       console.log('stopping velocity on', entity);
  //       entity.getMutableComponent(Velocity).set({x: 0, y: 0});
  //     }
  //   });
  // }
}
AISystem.queries = {
  npcs: {
    components: [AI, Mob, Velocity, Not(Timeout)],
  },
};
