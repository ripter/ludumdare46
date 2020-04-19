import * as PIXI from 'pixi.js';

import { loadTiledMap } from './loadTiledMap';

// Returns a PIXI.Container that holds the Dialog UI
export function loadDialogMap(textures, messageData, choiceData) {
  const messageUI = loadTiledMap(textures, messageData);
  const choiceUI = loadTiledMap(textures, choiceData);
  const container = new PIXI.Container();
  container.sortableChildren = true;

  // Give them names so we can find them with .getChildByName()
  messageUI.name = 'messageUI';
  choiceUI.name = 'choiceUI';

  // Add them in z-index order
  container.addChild(messageUI);
  container.addChild(choiceUI);

  // Bump the choices down below the message
  choiceUI.position.set(16 * 0.5, 16 * 5.5);

  return container;
}
