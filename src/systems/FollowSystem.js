import { System } from 'ecsy';

import { Follow } from '../components/Follow';
import { Velocity } from '../components/Velocity';
import { Sprite } from '../components/singleValue';

export class FollowSystem extends System {
  execute(delta) {
    this.queries.followers.results.forEach(entity => {
      const sprite = entity.getComponent(Sprite).value;
      const targetEntity = entity.getComponent(Follow).target;
      const targetSprite = targetEntity.getComponent(Sprite).value;

      // console.log('sprite', sprite);
      // console.log('target', targetSprite);
      // sprite.position.copyFrom(targetSprite.position);
      sprite.position.x = -targetSprite.position.x;
      sprite.position.y = -targetSprite.position.y;
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
