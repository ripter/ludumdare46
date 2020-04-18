import { Component } from 'ecsy';

export class Velocity extends Component {
  constructor() {
    super();
    this.reset();
  }
  reset() {
    this.x = this.y = 0;
  }
  set(obj) {
    this.x = obj.x;
    this.y = obj.y;
  }
}
