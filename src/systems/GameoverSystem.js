import { System } from 'ecsy';

import { Player, HasAlternateDialog, HasDialog } from '../components/singleValue';
import { Dialog } from '../components/Dialog';

export class GameoverSystem extends System {
  init() {
    this.pendingDialog = [];
  }

  execute() {
    const entity = this.queries.player.results[0];
    const player = entity.getComponent(Player).value;
    let didMutate = false;

    if (player.bonus === 2 && !player._bonusCalled) {
      player._bonusCalled = true;
      didMutate = true;
      this.pendingDialog.push({ resourceID: 'dialog_awesome' });
    }
    else if (player.won && !player._wonCalled) {
      player._wonCalled = true;
      didMutate = true;
      this.pendingDialog.push({ resourceID: 'dialog_win' });
    }
    else if (player.toner === 3 && !player._tonerCalled) {
      player._tonerCalled = true;
      didMutate = true;
      const goal = this.queries.goal.results[0];
      const newStory = goal.getComponent(HasAlternateDialog).value;
      goal.getMutableComponent(HasDialog).value = newStory;
      goal.removeComponent(HasAlternateDialog);
    }

    if (didMutate) {
      entity.getMutableComponent(Player).value = player;
    }

    // if there is no open dialog, and we have pending ones, open them
    if (this.pendingDialog.length > 0 && this.queries.openDialog.results.length === 0) {
      entity.addComponent(Dialog, this.pendingDialog.pop());
    }
  }
}
GameoverSystem.queries = {
  player: {
    components: [Player],
  },
  openDialog: {
    components: [Dialog],
  },
  goal: {
    components: [HasAlternateDialog],
  },
};
