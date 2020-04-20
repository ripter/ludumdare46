import { Component } from 'ecsy';

export class Follow extends Component {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.target = null;
  }

  set(obj) {
    this.target = obj.target;
  }
}
