/* eslint-disable max-classes-per-file */
import { Component } from 'ecsy';

// helper class. Create a component with a `.value` property.
class SingleValueComponent extends Component {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.value = null;
  }

  set(obj) {
    this.value = obj.value;
  }
}

export class AI extends SingleValueComponent {}
export class Collider extends SingleValueComponent {}
export class Cursor extends SingleValueComponent {}
export class Focus extends SingleValueComponent {}
export class FollowPlayer extends SingleValueComponent {}
export class Player extends SingleValueComponent {}
export class Rect extends SingleValueComponent {}
export class Slot extends SingleValueComponent {}
export class Sprite extends SingleValueComponent {}
export class Text extends SingleValueComponent {}
export class Timeout extends SingleValueComponent {}
export class DialogWindow extends SingleValueComponent {}
export class MapWindow extends SingleValueComponent {}
export class DialogOptionPicked extends SingleValueComponent {}
