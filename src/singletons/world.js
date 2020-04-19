import {
  World, System, Component, Not,
} from 'ecsy';

import { AISystem } from '../systems/AISystem';
import { AnimationSystem } from '../systems/AnimationSystem';
import { MovementSystem } from '../systems/MovementSystem';
import { PlayerInputSystem } from '../systems/PlayerInputSystem';
import { TimeoutSystem } from '../systems/TimeoutSystem';
import { FollowSystem } from '../systems/FollowSystem';
import { CollisionSystem } from '../systems/CollisionSystem';

// ECSY World
export const world = window.world = new World()
  .registerSystem(AISystem)
  .registerSystem(PlayerInputSystem)
  .registerSystem(CollisionSystem)
  .registerSystem(AnimationSystem)
  .registerSystem(MovementSystem)
  .registerSystem(TimeoutSystem)
  .registerSystem(FollowSystem)
