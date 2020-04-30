import { System } from 'ecsy';

import { Dialog } from '../components/Dialog';
import { Window } from '../components/Window';
import {
  WindowMap, WindowDialog, Focus, Sprite,
} from '../components/singleValue';

export class WindowSystem extends System {
  execute() {
    const { dialogs, windowsDialog, windowsMap } = this.queries;
    const isDialogActive = this.isDialogActive();
    const hasDialogs = dialogs.results.length > 0;

    // if there is a dialog, then make sure the dialog window is open.
    if (hasDialogs && !isDialogActive) {
      this.disableWindow(windowsMap.results[0]);
      this.enableWindow(windowsDialog.results[0]);
    }
    // if there is no dialog, then make sure the dialog window is closed.
    else if (!hasDialogs && isDialogActive) {
      this.disableWindow(windowsDialog.results[0]);
      this.enableWindow(windowsMap.results[0]);
    }
  }

  // returns true when the WindowDialog has Focus
  isDialogActive() {
    if (this.queries.windowsDialog.results.length === 0) return false;
    return this.queries.windowsDialog.results[0].hasComponent(Focus);
  }

  // Enables the window
  enableWindow(entity) {
    const { systems, toggleVisibility } = entity.getComponent(Window);
    const sprite = entity.getComponent(Sprite).value;

    this.toggleSystems(systems, 'play');
    if (toggleVisibility) {
      sprite.visible = true;
    }
    entity.addComponent(Focus);
  }

  // Disables the window
  disableWindow(entity) {
    const { systems, toggleVisibility } = entity.getComponent(Window);
    const sprite = entity.getComponent(Sprite).value;

    this.toggleSystems(systems, 'stop');
    if (toggleVisibility) {
      sprite.visible = false;
    }
    entity.removeComponent(Focus);
  }

  // Toggles the systems by calling method on all of them.
  toggleSystems(systemList, method) {
    systemList.forEach((systemType) => {
      const system = this.world.getSystem(systemType);
      system[method]();
    });
  }
}

WindowSystem.queries = {
  dialogs: {
    components: [Dialog],
  },
  windowsDialog: {
    components: [WindowDialog],
  },
  windowsMap: {
    components: [WindowMap],
  },
};
