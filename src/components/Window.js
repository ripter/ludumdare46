import { Component } from 'ecsy';

export class Window extends Component {
  constructor() {
    super();
    this.systems = [];
    this.reset();
  }

  reset() {
    this.name = '';
    this.systems.length = 0;
  }

  set(obj) {
    this.name = obj.name;
    this.systems = obj.systems;
  }
}
