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

      sprite.position.x = -targetSprite.position.x + (16 * 9);
      sprite.position.y = -targetSprite.position.y + (16 * 4);
    });
  }
}
FollowSystem.queries = {
  followers: {
    components: [Follow]
  },
}
