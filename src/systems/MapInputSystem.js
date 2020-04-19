import { System } from 'ecsy';

import { Input } from '../components/Input';

export class MapInputSystem extends System {
  init() {
    console.log('MapInputSystem');
  }

  execute(delta) {
    console.log('Map Input System');
    this.queries.input.added.forEacn(entity => {

    });
  }
}
MapInputSystem.queries = {
  input: {
    components: [Input],
    listen: {
      added: true,
    },
  },
}
