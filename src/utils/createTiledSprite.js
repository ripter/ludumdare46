import * as PIXI from 'pixi.js';
import { pixi } from '../singletons/pixi';

// values from: http://doc.mapeditor.org/en/latest/reference/tmx-map-format/#data
const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
const FLIPPED_VERTICALLY_FLAG = 0x40000000;
const FLIPPED_DIAGONALLY_FLAG = 0x20000000;

export function createTiledSprite(textures, tileID) {
  const flipped = {
    horizontally: (tileID & FLIPPED_HORIZONTALLY_FLAG) !== 0,
    vertically: (tileID & FLIPPED_VERTICALLY_FLAG) !== 0,
    diagonally: (tileID & FLIPPED_DIAGONALLY_FLAG) !== 0,
  };
  // Extract the textureID from the tileID
  const textureID = tileID & ~(FLIPPED_HORIZONTALLY_FLAG | FLIPPED_VERTICALLY_FLAG | FLIPPED_DIAGONALLY_FLAG);
  // Tiled uses a 1 based index, so we need to -1 to get the spritesheet index.
  const sprite = new PIXI.Sprite(textures[textureID - 1]);

  // Flip as needed
  if (flipped.diagonally && flipped.vertically) {
    sprite.anchor.x = 1;
    sprite.angle = -90;
  }
  else if (flipped.diagonally && flipped.horizontally) {
    sprite.anchor.y = 1;
    sprite.angle = 90;
  }
  else if (flipped.horizontally) {
    sprite.anchor.x = 1;
    sprite.anchor.y = 1;
    sprite.angle = 180;
  }
  else if (flipped.vertically) {
    console.log('sprite', sprite);
    throw new Error('ADD Feature');
  }

  // Keep a refrence to the tileID used to make this sprite.
  sprite.data = {
    tileID,
  };

  return sprite;
}
