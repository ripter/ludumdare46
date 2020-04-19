import { DIRECTION } from '../consts/direction';

export function velocityFromDirection(direction) {
  if (direction === DIRECTION.NORTH) {
    return {x: 0, y: -1};
  }
  else if (direction === DIRECTION.EAST) {
    return {x: 1, y: 0};
  }
  else if (direction === DIRECTION.SOUTH) {
    return {x: 0, y: 1};
  }
  else if (direction === DIRECTION.WEST) {
    return {x: -1, y: 0};
  }
  throw new Error(`Unknown direction ${direction}`);
}