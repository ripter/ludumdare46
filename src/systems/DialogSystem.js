import { System } from 'ecsy';

import { pixi } from '../singletons/pixi';
import { Dialog } from '../components/singleValue';

export class DialogSystem  extends System {
  execute(delta) {
    const dialogMap = pixi.stage.getChildByName('dialogMap');

    this.queries.openWindows.added.forEach(entity => {
      console.log('Dialog Added')
      // dialogMap.visible = true;
    });
    this.queries.openWindows.removed.forEach(entity => {
      console.log('Dialog removed');
      // dialogMap.visible = false;
    });
    this.queries.openWindows.results.forEach(entity => {
      // console.log('OPen dialog')
    });
  }
}
DialogSystem.queries = {
  openWindows: {
    components: [Dialog],
    listen: {
      added: true,
      removed: true,
    },
  },
}
