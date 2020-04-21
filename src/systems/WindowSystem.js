import { System } from 'ecsy';

import { Dialog } from '../components/Dialog';
import { Focus, Sprite } from '../components/singleValue';
import { Input } from '../components/Input';
import { pixi } from '../singletons/pixi';
import { Window } from '../components/Window';

// Manages the active "window"
// Enables/disables systems as the Focused window is updated.
export class WindowSystem extends System {
  execute() {
    const { windows, dialog } = this.queries;

    // When a window is added, add it to the PIXI Stage
    windows.added.forEach((entity) => {
      const sprite = entity.getComponent(Sprite).value;
      pixi.stage.addChild(sprite);
      // When window is added, stop it's systems.
      this.toggleSystems(entity, 'stop');
    });
    // When a window is removed, remove it from the PIXI Stage
    windows.removed.forEach((entity) => {
      const sprite = entity.getComponent(Sprite).value;
      pixi.stage.removeChild(sprite);
    });

    // Switch Focus when the Popup is added/removed.
    const dialogWindow = this.findWindowByName('dialog');
    const dialogContainer = dialogWindow.getComponent(Sprite).value;

    if (dialog.results.length > 0) {
      this.setFocusOnWindow(dialogWindow);
      dialogContainer.visible = true;
    }
    else {
      this.setFocusOnWindow(this.findWindowByName('map'));
      dialogContainer.visible = false;
    }
  }

  findWindowByName(name) {
    return this.queries.windows.results.find((entity) => entity.getComponent(Window).name === name);
  }

  setFocusOnWindow(windowEntity) {
    // Remove Focus
    this.queries.focusedWindows.results.forEach((entity) => {
      // skip if the new window is the old window.
      if (entity === windowEntity) { return; }
      entity.removeComponent(Focus);
      this.toggleSystems(entity, 'stop');
    });

    // Add Focus to the new window
    windowEntity.addComponent(Focus, {});
    this.toggleSystems(windowEntity, 'play');
  }

  // Toggles all the systems
  toggleSystems(entity, method) {
    const { systems } = entity.getComponent(Window);
    systems.forEach((systemType) => {
      const system = this.world.getSystem(systemType);
      system[method]();
    });
  }
}
WindowSystem.queries = {
  windows: {
    components: [Window],
    listen: {
      added: true,
      removed: true,
    },
  },
  focusedWindows: {
    components: [Window, Focus],
    listen: {
      added: true,
      removed: true,
    },
  },
  dialog: {
    components: [Dialog],
    listen: {
      added: true,
      removed: true,
    },
  },
  input: {
    components: [Input],
  },
};
