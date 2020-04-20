import { System } from 'ecsy';

import { Player } from '../components/singleValue';
import { Velocity } from '../components/Velocity';
import { Input } from '../components/Input';

// Sets Velocity to the Player based on input.
export class PlayerInputSystem extends System {
  init() {
    this.inputState = null;
    document.addEventListener('keydown', this);
    document.addEventListener('keyup', this);
  }

  execute(delta) {
    // When Input is added, save a reference to it.
    this.queries.input.added.forEach((entity) => {
      this.inputState = entity.getComponent(Input);
    });
  }

  handleEvent(event) {
    // Skip if we have no place to store the data.
    if (!this.inputState) { return; }
    const isDown = (event.type === 'keydown');

    const { velocity } = this;
    switch (event.code) {
      case 'KeyD':
      case 'ArrowRight':
        this.inputState.MoveRight = isDown;
        break;
      case 'KeyA':
      case 'ArrowLeft':
        this.inputState.MoveLeft = isDown;
        break;
      case 'KeyW':
      case 'ArrowUp':
        this.inputState.MoveUp = isDown;
        break;
      case 'KeyS':
      case 'ArrowDown':
        this.inputState.MoveDown = isDown;
        break;
      case 'Escape':
        this.inputState.Cancel = isDown;
        this.inputState.MenuToggle = isDown;
      case 'Enter':
      case 'Space':
        this.inputState.Confirm = isDown;
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
  },
  input: {
    components: [Input],
    listen: {
      added: true,
    },
  },
};
