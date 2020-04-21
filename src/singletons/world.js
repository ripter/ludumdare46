import { World } from 'ecsy';

import { AISystem } from '../systems/AISystem';
import { AnimationSystem } from '../systems/AnimationSystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { DialogInputSystem } from '../systems/DialogInputSystem';
import { DialogSystem } from '../systems/DialogSystem';
import { FollowSystem } from '../systems/FollowSystem';
import { GameoverSystem } from '../systems/GameoverSystem';
import { MapInputSystem } from '../systems/MapInputSystem';
import { MovementSystem } from '../systems/MovementSystem';
import { PlayerInputSystem } from '../systems/PlayerInputSystem';
import { TimeoutSystem } from '../systems/TimeoutSystem';
import { WindowSystem } from '../systems/WindowSystem';

// ECSY World
// Register all the systems in order.
export const world = window.world = new World()
  .registerSystem(PlayerInputSystem)
  .registerSystem(WindowSystem)
  .registerSystem(DialogInputSystem)
  .registerSystem(MapInputSystem)
  .registerSystem(AISystem)
  .registerSystem(DialogSystem)
  .registerSystem(CollisionSystem)
  .registerSystem(AnimationSystem)
  .registerSystem(MovementSystem)
  .registerSystem(TimeoutSystem)
  .registerSystem(FollowSystem)
  .registerSystem(GameoverSystem);
