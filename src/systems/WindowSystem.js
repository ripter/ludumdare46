import { System } from 'ecsy';

import { pixi } from '../singletons/pixi';
import { world } from '../singletons/world';
import { Window } from '../components/Window';
import { Focus, Sprite, Dialog } from '../components/singleValue';

// Manages the active "window"
// Enables/disables systems as the Focused window is updated.
export class WindowSystem extends System {
  execute(delta) {
    const { focusedWindows, windows, dialog } = this.queries;

    // When a window is added, add it to the PIXI Stage
    windows.added.forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      pixi.stage.addChild(sprite);
      this.toggleSystems(entity, 'stop');
    });
    // When a window is removed, remove it from the PIXI Stage
    windows.removed.forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      pixi.stage.removeChild(sprite);
    });

    // start/stop systems as windows change focus.
    focusedWindows.added.forEach(entity => {
      this.toggleSystems(entity, 'play');
    });
    focusedWindows.removed.forEach(entity => {
      this.toggleSystems(entity, 'stop');
    });

    // Switch Focus when the Popup is added/removed.
    dialog.added.forEach(() => {
      const dialogWindow = this.findWindowByName('dialog');
      const dialogContainer = dialogWindow.getComponent(Sprite).value;

      this.setFocusOnWindow(dialogWindow);
      dialogContainer.visible = true;
    });
    dialog.removed.forEach(() => {
      const dialogWindow = this.findWindowByName('dialog');
      const dialogContainer = dialogWindow.getComponent(Sprite).value;
      const mapWindow = this.findWindowByName('map');

      this.setFocusOnWindow(mapWindow);
      dialogContainer.visible = false;
    });
  }

  findWindowByName(name) {
    return this.queries.windows.results.find(entity => entity.getComponent(Window).name === name);
  }

  setFocusOnWindow(windowEntity) {
    // Remove Focus
    this.queries.focusedWindows.results.forEach(entity => {
      // skip if the new window is the old window.
      if (entity === windowEntity) { return; }
      entity.removeComponent(Focus);
    });
    // Add Focus to the new window
    windowEntity.addComponent(Focus, {});
  }

  // Toggles all the systems
  toggleSystems(entity, method) {
    const { systems } = entity.getComponent(Window);
    systems.forEach(systemType => {
      const system = world.getSystem(systemType);
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
    }
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
    }
  }
}
