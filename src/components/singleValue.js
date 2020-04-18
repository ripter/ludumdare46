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

export class Sprite extends SingleValueComponent {}
export class Velocity extends SingleValueComponent {}
