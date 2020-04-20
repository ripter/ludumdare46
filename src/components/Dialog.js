import { Component } from 'ecsy';

export class Dialog extends Component {
  constructor() {
    super();
    this.reset();
  }

  reset() {
    this.resourceID = -1;
    this.story = null;
  }

  set(obj) {
    this.resourceID = obj.resourceID;
    this.story = obj.story;
  }
}
