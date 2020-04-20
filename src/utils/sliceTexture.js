import * as PIXI from 'pixi.js';

// Create a Spritesheet by slicing the texture into a texture list.
export function sliceTexture(baseTexture, size, margin) {
  const { width, height } = baseTexture;
  const textures = [];

  for (let y = 0; y < height; y += (size.height + margin.y)) {
    for (let x = 0; x < width; x += (size.width + margin.x)) {
      textures.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(
        x, y, size.width, size.height,
      )));
    }
  }

  return textures;
}
