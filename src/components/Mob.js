import { Component } from 'ecsy';

export class Mob extends Component {
  constructor() {
    super();
    this.animations = [];
    this.reset();
  }
  reset() {
    this.animations.length = 0;
    this.direction = 0;
    this.speed = 1;
  }
  set(obj) {
    this.speed = obj.speed;
    this.animations = obj.animations;
    this.direction = obj.direction;
  }
  get activeAnimation() {
    return this.animations[this.direction];
  }
}
