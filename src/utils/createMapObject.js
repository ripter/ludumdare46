
// Converts Tiled Object into a mapObject we can use for game logic.
export function createMapObject(obj) {
  const mapObject = Object.assign({}, {
    type: obj.type,
    x: obj.x,
    y: obj.y,
  });
  // Put all the custom properties directly on object.
  obj.properties.forEach(prop => {
    mapObject[prop.name] = prop.value;
  });

  return mapObject;
}
