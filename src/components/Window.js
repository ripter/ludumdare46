import { Component } from 'ecsy';

export class Window extends Component {
  constructor() {
    super();
    this.systems = [];
    this.reset();
  }

  reset() {
    this.toggleVisibility = false;
    this.systems.length = 0;
  }

  set(obj) {
    this.systems = obj.systems;
    this.toggleVisibility = obj.toggleVisibility;
  }
}
