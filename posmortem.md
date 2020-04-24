# LDJam46 Designed vs Finished result 

I wrote quite a few component and systems while building out this game. Some of which, I had a clear idea on when I built them, like the Movement System. Others sort of got away from me along the way, like the Dialog system.

There is one part that seems very clear to me now, in retrospect. I sholdn't have been writing Components and Systems, I should have been writing Queries and Actions. What do I mean by that? Let's take a look.

Each system defines a set of queries. Thos queries are an arrat of entities that have all the matching components.

Let's take a look at the Movement System as an example. It has a query called `mobs` that is a list of all Entities with both Sprite and Velocity components. It loops over the list of `mobs` and updates the Sprite.position. Another way to describe the same thing. I have a query of `mobs` that are used by the Movement system to update Sprite position.

I guess the only real difference, is that I think i would have shared some of the queries between systems.

`mobs: [Sprite, Velocity]` and `mobs: [Mob, Sprite, Velocity]` both exist. And really they can be the same query.

There are 4 systems with the query `input: [Input]` along with 5 systems with the query `player: [Player]` (and the one unfortunate `players: [Player]`).

Is it fine that all these systems use the same queries? Should systems have a lot of queries, or a few queries? I don't know, so let's find out!

---

So which system has a lot of queries, and why?

* Dialog System 6 queries
* Window System 4 queries
* Gameover System, Dialog Input System 3 queries

Which systems had only one quiery, and why?
* AI System, Animation System, Timeout System, Movement System, 1 query
* Collision System, Follow System, Map Input, Player Input, 2 queries.


---
### Why Dialog && Dialog Input System?

Player Input System reads raw inputs and writes them to the `Input` component.
DialogInput System reads `Input` and converts it into moving a cursor on the menu.
MapInput Systems reads `Input` and converts it into a `Velocity` on the `Player, Sprite` entity.

This allows for an abstraction between raw input, which might come from a keyboard, a mouse, a touch screen, a controller, etc. into a normalized format that the rest of the systems can read. This also becomes the place for keymap aliasing. In the submitted game, both `KeyW` and `ArrowUp` set the same `inputState.MoveUp`.

In future code, `PlayerInput` system could be expanded to handle controlers and touch screen keyboards. This would be an ideal place to interface with a more robust controller libray and translate it into application specific states.


---
### Overview of life cycle.

* Load Resources
* Start Game
	* load world map
	* load dialog map
	* create player
	* start game loop.


---
### What was hard?
* Collision system
* Dialog system

### What was easy?
Timeout System
Movement System
Animation System





