import { System, Not } from 'ecsy';

import { Input } from '../components/Input';
import { Timeout, Cursor } from '../components/singleValue';

export class DialogInputSystem extends System {
  init() {
    console.log('DialogInputSystem');
  }
  execute(delta) {
    const inputEntity = this.queries.input.results[0];
    if (!inputEntity) { return; }
    const inputState = inputEntity.getComponent(Input);
    let didAction = false;

    // console.log('Dialog Input System', inputState);
    if (inputState.MoveRight) {
      console.log('Move Right!');
      didAction = true;
    }
    else if (inputState.MoveLeft) {
      console.log('Left Right!');
      didAction = true;
    }

    if (didAction) {
      console.log('Timeout!')
      // Timeout the input, no one will be able to read from it during the timeout.
      inputEntity.addComponent(Timeout, {value: 50});
    }
  }
}
DialogInputSystem.queries = {
  input: {
    components: [Input, Not(Timeout)],
  },
  cursor: {
    components: [Cursor],
  },
}
