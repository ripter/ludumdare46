// Converts Tiled Object into a mapObject we can use for game logic.
export function createMapObject(obj) {
  const mapObject = {
    type: obj.type,
    x: obj.x,
    y: obj.y,
  };

  if (obj.name) {
    mapObject.name = obj.name;
  }
  if (obj.text) {
    mapObject.text = obj.text.text;
  }

  if (!obj.properties) { return mapObject; }

  // Put all the custom properties directly on object.
  obj.properties.forEach((prop) => {
    mapObject[prop.name] = prop.value;
  });

  return mapObject;
}
