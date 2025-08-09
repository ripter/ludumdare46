import { System } from 'ecsy';

import { FollowPlayer, Sprite, Player } from '../components/singleValue';

export class FollowSystem extends System {
  init() {
    this.player = null; // Quick reference
  }

  execute() {
    const { followers, player } = this.queries;

    // Save a handy reference to the player
    if (player.added.length > 0) {
      this.player = player.added[0];
    }

    followers.results.forEach((entity) => {
      const sprite = entity.getComponent(Sprite).value;
      const targetSprite = this.player.getComponent(Sprite).value;

      sprite.position.x = -targetSprite.position.x + (16 * 9);
      sprite.position.y = -targetSprite.position.y + (16 * 4);
    });
  }
}
FollowSystem.queries = {
  followers: {
    components: [FollowPlayer],
  },
  player: {
    components: [Player],
    listen: {
      added: true,
    },
  },
};
