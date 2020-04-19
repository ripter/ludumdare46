import { System } from 'ecsy';

import { Player, Dialog } from '../components/singleValue';
import { Velocity } from '../components/Velocity';

// Sets Velocity to the Player based on input.
export class PlayerInputSystem extends System {
  init() {
    this.velocity = {
      x: 0,
      y: 0,
    };
    document.addEventListener('keydown', this);
    document.addEventListener('keyup', this);
  }

  execute(delta) {
    const players = this.queries.players.results;
    if (players.length === 0) { return; }
    const player = players[0];
    const velocity = player.getMutableComponent(Velocity);
    velocity.set(this.velocity);
  }

  handleEvent(event) {
    const players = this.queries.players.results;
    if (players.length === 0) { return; }
    const player = players[0];

    const {velocity} = this;
    switch (event.code) {
      case 'KeyD':
      case 'ArrowRight':
        velocity.x = (event.type === 'keydown') ? 1 : 0;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        velocity.x = (event.type === 'keydown') ? -1 : 0;
        break;
      case 'KeyW':
      case 'ArrowUp':
        velocity.y = (event.type === 'keydown') ? -1 : 0;
        break;
      case 'KeyS':
      case 'ArrowDown':
        velocity.y = (event.type === 'keydown') ? 1 : 0;
        break;
      case 'Escape':
        if (event.type === 'keyup') {
          if (player.hasComponent(Dialog)) {
            player.removeComponent(Dialog);
          }
          else {
            player.addComponent(Dialog, {value: 'menu'});
          }
        }
        break;
      default:
        console.log('key code', event.code);
      // ignored keys
    }
  }
}
PlayerInputSystem.queries = {
  players: {
    components: [Player],
  }
}
