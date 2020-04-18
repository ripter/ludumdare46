import {
  World, System, Component, Not,
} from 'ecsy';

import { AISystem } from '../systems/AISystem';
import { AnimationSystem } from '../systems/AnimationSystem';
import { MovementSystem } from '../systems/MovementSystem';
import { PlayerInputSystem } from '../systems/PlayerInputSystem';
import { TimeoutSystem } from '../systems/TimeoutSystem';

// ECSY World
export const world = new World()
  .registerSystem(AISystem)
  .registerSystem(PlayerInputSystem)
  .registerSystem(AnimationSystem)
  .registerSystem(MovementSystem)
  .registerSystem(TimeoutSystem)
