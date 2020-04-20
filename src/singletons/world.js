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
import { DialogSystem } from '../systems/DialogSystem';
import { WindowSystem } from '../systems/WindowSystem';
import { MapInputSystem } from '../systems/MapInputSystem';
import { DialogInputSystem } from '../systems/DialogInputSystem';

// ECSY World
// Register all the systems in order.
export const world = window.world = new World()
  .registerSystem(WindowSystem)
  .registerSystem(DialogInputSystem)
  .registerSystem(MapInputSystem)
  .registerSystem(DialogSystem)
  .registerSystem(AISystem)
  .registerSystem(PlayerInputSystem)
  .registerSystem(CollisionSystem)
  .registerSystem(AnimationSystem)
  .registerSystem(MovementSystem)
  .registerSystem(TimeoutSystem)
  .registerSystem(FollowSystem)
