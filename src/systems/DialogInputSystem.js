import { System, Not } from 'ecsy';

import { Input } from '../components/Input';
import { Timeout, Cursor, DialogOptionPicked } from '../components/singleValue';
import { Dialog } from '../components/Dialog';

export class DialogInputSystem extends System {
  execute(delta, time) {
    const dialogEntity = this.queries.dialog.results[0];
    const inputEntity = this.queries.input.results[0];
    if (!inputEntity || !dialogEntity) { return; }
    const inputState = inputEntity.getMutableComponent(Input);
    // Skip if we are waiting
    if (inputState.waitUntil > time) { return; }
    let tookAction = false;

    if (inputState.MoveRight) {
      this.moveCursor(1);
      tookAction = true;
    }
    else if (inputState.MoveLeft) {
      this.moveCursor(-1);
      tookAction = true;
    }
    else if (inputState.Cancel) {
      dialogEntity.removeComponent(Dialog);
      tookAction = true;
    }
    else if (inputState.Confirm) {
      dialogEntity.addComponent(DialogOptionPicked, {
        value: this.getCursorValue(),
      });
      tookAction = true;
    }

    // Timeout to give the user time to react
    if (tookAction) {
      inputState.waitUntil = time + 300;
    }
  }

  // Moves the Cursor into a new slot index by delta
  moveCursor(delta) {
    if (this.queries.cursor.results.length === 0) { return; }
    const cursorEntity = this.queries.cursor.results[0];
    const currentSlot = parseInt(cursorEntity.getComponent(Cursor).value, 10);
    let newSlot = currentSlot + delta;

    if (newSlot > 1) {
      newSlot = 0;
    }
    else if (newSlot < 0) {
      newSlot = 1;
    }

    cursorEntity.getMutableComponent(Cursor).value = `${newSlot}`;
  }

  getCursorValue() {
    const cursorEntity = this.queries.cursor.results[0];
    return parseInt(cursorEntity.getComponent(Cursor).value, 10);
  }
}
DialogInputSystem.queries = {
  input: {
    components: [Input],
  },
  cursor: {
    components: [Cursor],
  },
  dialog: {
    components: [Dialog],
  },
};
