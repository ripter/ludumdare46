import {
  World, System, Component, Not,
} from 'ecsy';

import { MovementSystem } from '../systems/MovementSystem';
import { PlayerInputSystem } from '../systems/PlayerInputSystem';

// ECSY World
export const world = new World()
  .registerSystem(PlayerInputSystem)
  .registerSystem(MovementSystem)
