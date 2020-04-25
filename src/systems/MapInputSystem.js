import { System, Not } from 'ecsy';

import { Dialog } from '../components/Dialog';
import { Input } from '../components/Input';
import { Player, Timeout } from '../components/singleValue';
import { Velocity } from '../components/Velocity';

export class MapInputSystem extends System {
  execute(delta, time) {
    const inputEntity = this.queries.input.results[0];
    const playerEntity = this.queries.player.results[0];
    // Skip if either is missing.
    if (!inputEntity || !playerEntity) { return; }
    const inputState = inputEntity.getMutableComponent(Input);
    // Skip if we are waiting
    if (inputState.waitUntil > time) { return; }

    const velocity = playerEntity.getMutableComponent(Velocity);
    let tookAction = false;

    //
    // Set Player Velocity based on Input
    if (inputState.MoveRight) { velocity.x = 1; }
    else if (inputState.MoveLeft) { velocity.x = -1; }
    else { velocity.x = 0; }

    if (inputState.MoveUp) { velocity.y = -1; }
    else if (inputState.MoveDown) { velocity.y = 1; }
    else { velocity.y = 0; }

    if (inputState.MenuToggle) {
      playerEntity.addComponent(Dialog, { resourceID: 'dialog_menu' });
      tookAction = true;
    }

    // Timeout to give the user time to react
    if (tookAction) {
      inputState.waitUntil = time + 300;
    }
  }
}
MapInputSystem.queries = {
  input: {
    components: [Input],
  },
  player: {
    components: [Player],
  },
};
