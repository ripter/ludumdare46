import { System } from 'ecsy';

import { pixi } from '../singletons/pixi';
import { world } from '../singletons/world';
import { Window } from '../components/Window';
import { Focus, Sprite } from '../components/singleValue';

// Manages the active "window"
// Enables/disables systems as the Focused window is updated.
export class WindowSystem extends System {
  execute(delta) {
    const { focusedWindows, windows } = this.queries;

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
}
