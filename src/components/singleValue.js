import { Component } from 'ecsy';

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

export class Player extends SingleValueComponent {}
export class Sprite extends SingleValueComponent {}
export class AI extends SingleValueComponent {}
export class Timeout extends SingleValueComponent {}
export class Collider extends SingleValueComponent {}
export class Text extends SingleValueComponent {}
export class Dialog extends SingleValueComponent {}
