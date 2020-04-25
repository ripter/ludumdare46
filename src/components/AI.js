import { Component } from 'ecsy';

export class AI extends Component {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.value = '';
    this.waitUntil = 0;
  }

  set(obj) {
    this.value = obj.value;
    this.waitUntil = obj.waitUntil;
  }
}
