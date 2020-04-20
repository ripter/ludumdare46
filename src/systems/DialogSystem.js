import { System } from 'ecsy';
import { Story } from 'inkjs';

import { pixi } from '../singletons/pixi';
import {
  Dialog, Cursor, Slot, Sprite, Rect, DialogWindow, Text
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

    const message = story.ContinueMaximally();
    const choices = story.currentChoices.map(i => i.text);
    console.log('story', story);

    this.updateText('messageBody', message);
    this.updateText('secondaryChoice', choices[0]);
    this.updateText('primaryChoice', choices[1]);
  }

  // Updates the text component with a matching uuid
  updateText(uuid, text) {
    const entity = this.queries.text.results.find(e => e.getComponent(Text).value === uuid);
    const sprite = entity.getMutableComponent(Sprite).value;
    sprite.text = text;
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
  text: {
    components: [Text],
  }
};
