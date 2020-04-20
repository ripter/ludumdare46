import { System } from 'ecsy';

import { pixi } from '../singletons/pixi';
import { Dialog, Cursor, Slot, Sprite, Rect } from '../components/singleValue';

export class DialogSystem  extends System {
  execute(delta) {
    // Keep the cursor in the right slot.
    this.queries.cursor.added.forEach(entity => this.moveToSlot(entity));
    this.queries.cursor.changed.forEach(entity => this.moveToSlot(entity));

    // Show/Hide
  }

  moveToSlot(cursorEntity) {
    const sprite = cursorEntity.getComponent(Sprite).value;
    const newSlotIndex = cursorEntity.getComponent(Cursor).value;
    const slotEntity = this.queries.slots.results.find(eSlot => eSlot.getComponent(Slot).value === newSlotIndex);

    if (!slotEntity) { console.error(`No Slot with ID ${newSlotIndex} found.`); return; }

    const slotRect = slotEntity.getComponent(Rect).value;
    sprite.position.set(slotRect.x, slotRect.y);
  }
}
DialogSystem.queries = {
  cursor: {
    components: [Cursor, Sprite],
    listen: {
      changed: true,
      added: true,
    },
  },
  slots: {
    components: [Slot],
  },
  dialog: {
    components: [Dialog],
    listen: {
      added: true,
      removed: true,
    },
  },
}
