import { System } from 'ecsy';
import { Story } from 'inkjs';

import { pixi } from '../singletons/pixi';
import {
  Dialog, Cursor, Slot, Sprite, Rect, DialogWindow
} from '../components/singleValue';


export class DialogSystem extends System {
  execute(delta) {
    // Keep the cursor in the right slot.
    this.queries.cursor.added.forEach(entity => this.moveToSlot(entity));
    this.queries.cursor.changed.forEach(entity => this.moveToSlot(entity));

    // When dialog is added, create a new Inky Story
    this.queries.dialog.added.forEach(entity => this.loadStory(entity));
  }

  loadStory(dialogEntity) {
    const resourceID = dialogEntity.getComponent(Dialog).value;
    const storyFile = pixi.loader.resources[resourceID].data;
    const story = new Story(storyFile);

    const windowEntity = this.queries.window.results[0];
    const container = windowEntity.getComponent(Sprite).value;
    const messageBody = container.getChildByName('messageUI');

    console.log('story', story.Continue());
    console.log('root', container);
    console.log('messageBody', messageBody);
    // const dialogContainer = pixi.stage.getChildByName('dialog');
    // console.log('dialogContainer', dialogContainer )
  }



  // Moves the cursor to a slot position.
  moveToSlot(cursorEntity) {
    const sprite = cursorEntity.getComponent(Sprite).value;
    const newSlotIndex = cursorEntity.getComponent(Cursor).value;
    const slotEntity = this.queries.slots.results.find((eSlot) => eSlot.getComponent(Slot).value === newSlotIndex);

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
  window: {
    components: [DialogWindow],
  }
};
