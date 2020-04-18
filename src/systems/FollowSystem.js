import { System } from 'ecsy';

import { Follow } from '../components/Follow';
import { Velocity } from '../components/Velocity';
import { Sprite } from '../components/singleValue';

export class FollowSystem extends System {
  execute(delta) {
    this.queries.followers.results.forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      const velocity = entity.getMutableComponent(Velocity);
      const targetEntity = entity.getComponent(Follow).target;
      const targetSprite = targetEntity.getComponent(Sprite).value;
      // const center = {
      //   x: 0|sprite.width /4,
      //   y: 0|sprite.height /8,
      // }

      // console.log('sprite', center, sprite.width, sprite.height);
      // console.log('target', targetSprite);
      // sprite.position.copyFrom(targetSprite.position);
      // sprite.position.x = -targetSprite.position.x + center.x;
      // sprite.position.y = -targetSprite.position.y + center.y;
      sprite.position.x = -targetSprite.position.x + (16 * 9);
      sprite.position.y = -targetSprite.position.y + (16 * 4);
    });
  }
}
FollowSystem.queries = {
  followers: {
    components: [Follow]
  },
  // leaders: {
  //   components: [Lead]
  // }
}
