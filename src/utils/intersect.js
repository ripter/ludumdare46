// from https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection
export function intersect(a, b) {
  return (a.minX <= b.maxX && a.maxX >= b.minX) &&
    (a.minY <= b.maxY && a.maxY >= b.minY);

  // if (!isColliding) { return false; }
  //
  // const aCenter = {
  //   x: a.minX + ((a.maxX - a.minX) / 2),
  //   y: a.minY + ((a.maxY - a.minY) / 2),
  // };
  // const bCenter = {
  //   x: b.minX + ((b.maxX - b.minX) / 2),
  //   y: b.minY + ((b.maxY - b.minY) / 2),
  // };
  // const offset = {
  //   x: aCenter.x - bCenter.y,
  //   y: aCenter.y - bCenter.y,
  // };
  // // console.log(a, b, bCenter);
  // console.group('centers');
  // console.log('aCenter', aCenter);
  // console.log('bCenter', bCenter);
  // console.log('offset', offset);
  // console.groupEnd();
  //
  // const diff = {x: 0, y: 0};
  //
  // // Quadrant 2 (Top Left)
  // if (aCenter.x < bCenter.x && aCenter.y < bCenter.y) {
  //   console.log('Quadrant 2')
  //   return {
  //     x: 0,
  //     y: 0,
  //   };
  // }
  //
  // // Quadrant 3 (Bottom Left)
  // if (aCenter.x < bCenter.x && aCenter.y >= bCenter.y) {
  //   console.log('Quadrant 3');
  //   return {
  //     x: a.maxX - b.minX,
  //     y: a.minY - b.maxY,
  //   };
  // }
  //
  //
  // return diff;
  // push left
  // if (aCenter.x <= bCenter.x) {
  //   diff.x = a.maxX - b.minX;
  // }
  // // push right
  // else if (aCenter.x >= bCenter.x) {
  //   diff.x = a.minX - b.maxX;
  // }
  //
  // if (aCenter.y <= bCenter.y) {
  //   diff.y = a.maxY - b.minY;
  // }
  // else if (aCenter.y >= bCenter.y) {
  //   diff.y = a.minY - b.maxY;
  // }

  // if (diff.x > diff.y) {
  //   return {x: diff.x, y: 0};
  // }
  // else {
  //   return {x: 0, y: diff.y};
  // }

  // if (a.maxX >= b.minX) {
  //   diff.x = a.maxX - b.minX;
  // }
  // if (a.minX <= b.maxX) {
  //   diff.x = a.minX - b.maxX;
  // }
  // if (a.minX >= b.minX) {
  //
  // }
  // return diff;
  // return {
  //   mixX: (a.minX <= b.maxX && a.maxX >= b.minX) ? b.minX - a.minX : 0,
  //   maxX: (a.minX <= b.maxX && a.maxX >= b.minX) ? b.maxX - a.maxX : 0,
  //   minY: a.minY - b.minY,
  //   maxY: a.maxY - b.maxY,
  // };
}


export function spriteToBBox(sprite) {
  return {
    minX: sprite.position.x, maxX: sprite.position.x + sprite.width,
    minY: sprite.position.y, maxY: sprite.position.y + sprite.height,
  };
}

export function spriteVelocityToBBox(sprite, velocity) {
  const bbox = spriteToBBox(sprite);
  bbox.minX += velocity.x;
  bbox.maxX += velocity.x;
  bbox.minY += velocity.y;
  bbox.maxY += velocity.y;
  return bbox;
}
