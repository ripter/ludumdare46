import * as PIXI from 'pixi.js';

import { pixi } from '../singletons/pixi';

// Renders the children as a single texture and then returns a sprite using that texture.
export function mergeSprites(container) {
  const texture = new PIXI.RenderTexture.create(
    container.width,
    container.height,
  );

  // Render each sprite on the texture
  container.children.forEach((sprite) => {
    pixi.renderer.render(sprite, texture, false);
  });
  return new PIXI.Sprite(texture);
}
