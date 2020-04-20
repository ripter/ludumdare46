import { DIRECTION } from '../consts/direction';

// converts a velocity to a direction.
export function directionFromVelocity(velocity) {
  if (velocity.y < 0) { return DIRECTION.NORTH; }
  if (velocity.y > 0) { return DIRECTION.SOUTH; }
  if (velocity.x < 0) { return DIRECTION.WEST; }
  if (velocity.x > 0) { return DIRECTION.EAST; }
  return null;
}
