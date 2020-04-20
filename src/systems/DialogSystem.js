import { System } from 'ecsy';
import { Story } from 'inkjs';

import {
  Cursor, DialogOptionPicked, Rect, Slot, Sprite, Text,
} from '../components/singleValue';
import { Dialog } from '../components/Dialog';
import { pixi } from '../singletons/pixi';


export class DialogSystem extends System {
  execute() {
    // Keep the cursor in the right slot.
    this.queries.cursor.added.forEach((entity) => this.moveToSlot(entity));
    this.queries.cursor.changed.forEach((entity) => this.moveToSlot(entity));

    // When dialog is added, create a new Inky Story
    this.queries.dialog.added.forEach((entity) => this.loadStory(entity));
    // When the user picks a choice, continue the story!
    this.queries.pickedChoice.added.forEach((entity) => this.pickChoice(entity));
  }

  loadStory(entity) {
    const { resourceID } = entity.getComponent(Dialog);
    const storyFile = pixi.loader.resources[resourceID].data;
    const story = new Story(storyFile);

    // Set the new story
    entity.getMutableComponent(Dialog).story = story;
    this.renderStory(story, entity);
  }

  renderStory(story, entity) {
    const message = story.ContinueMaximally();
    const choices = story.currentChoices.map((i) => i.text);
    const { canContinue } = story;

    this.updateText('messageBody', message);
    this.updateText('secondaryChoice', choices[0]);
    this.updateText('primaryChoice', choices[1]);

    // No message or choices, means the story is over. close it down.
    if (!canContinue && choices.length === 0 && message === '') {
      entity.removeComponent(Dialog);
    }
  }

  pickChoice(entity) {
    const { story } = entity.getComponent(Dialog);
    const pickedOption = parseInt(entity.getComponent(DialogOptionPicked).value, 10);
    const hasChoices = story.currentChoices.length > 0;

    // Picked a choice
    if (hasChoices) {
      story.ChooseChoiceIndex(pickedOption);
      this.renderStory(story, entity);
    }
    // Clicked when there are no choices. aka end of story
    else {
      entity.removeComponent(Dialog);
    }

    // we handled the option, so we can remove the component.
    entity.removeComponent(DialogOptionPicked);
  }

  // Updates the text component with a matching uuid
  updateText(uuid, text) {
    const entity = this.queries.text.results.find((e) => e.getComponent(Text).value === uuid);
    const sprite = entity.getMutableComponent(Sprite).value;
    sprite.text = text;
  }


  // Moves the cursor to a slot position.
  moveToSlot(cursorEntity) {
    const sprite = cursorEntity.getComponent(Sprite).value;
    const newSlotIndex = cursorEntity.getComponent(Cursor).value;
    const slotEntity = this.queries.slots.results.find((eSlot) => eSlot.getComponent(Slot).value === newSlotIndex);

    if (!slotEntity) {
      // return console.error(`No Slot with ID ${newSlotIndex} found.`);
      throw new Error(`No Slot with ID ${newSlotIndex} found.`);
    }

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
  },
  pickedChoice: {
    components: [DialogOptionPicked],
    listen: {
      added: true,
    },
  },
};
