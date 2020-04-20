import { System } from 'ecsy';

import { Player } from '../components/singleValue';
import { Input } from '../components/Input';

// Sets Velocity to the Player based on input.
export class PlayerInputSystem extends System {
  init() {
    this.inputState = null;
    document.addEventListener('keydown', this);
    document.addEventListener('keyup', this);
  }

  execute() {
    // When Input is added, save a reference to it.
    this.queries.input.added.forEach((entity) => {
      this.inputState = entity.getComponent(Input);
    });
  }

  handleEvent(event) {
    // Skip if we have no place to store the data.
    if (!this.inputState) { return; }
    const isDown = (event.type === 'keydown');

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
        break;
      case 'Enter':
      case 'Space':
        this.inputState.Confirm = isDown;
        break;
      default:
        // ignored keys
        // console.log('key code', event.code);
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
