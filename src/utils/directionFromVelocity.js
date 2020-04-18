import { DIRECTION } from '../consts/direction';

// converts a velocity to a direction.
export function directionFromVelocity(velocity) {
  if (velocity.y < 0) { return DIRECTION.NORTH; }
  else if (velocity.y > 0) { return DIRECTION.SOUTH; }
  else if (velocity.x < 0) { return DIRECTION.WEST; }
  else if (velocity.x > 0) { return DIRECTION.EAST; }
  return null;
}
