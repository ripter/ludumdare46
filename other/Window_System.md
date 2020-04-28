# Window, Dialog, and Focus

![WindowSystem Diagram](./WindowSystem_Diagram.png)

When a `Dialog` component is added to an entity, it triggers the windows to change focus to the dialog window. It also starts/stops a list of systems on the `Window` component. It also toggles the visibility of the windows, so the dialog window is only visible when focused.

While building this, I kept struggling with figuring out the right level of components vs component data.

Example: To find the dialog window entity, it loops over all `Window` components looking for the one with the name __dialog__. Instead of looping over the list every frame myself, I could add a new component like `WindowDialog`, then I could use the ECSY queries to keep a reference to the dialog window.

In fact, that is probably a lot more efficient than what I am going. I repeat the same two O(2) loops every frame. Is there any downside to using a component for this? No? Alright, let's make this change!




## Bugs

1. Dialogs that won't close!
2. Random Dialog opening!
3. Random Text in dialog not working.

## Solution for Bug 1 & 2
In WindowSystem I was checking `dialog.results.length` in an if-else. The body would then switch the Focused window. The problem is that my if-else body behaved as if it was only called when a `Dialog` component is added/removed from an entity. But the if code was checking if there was a dialog this frame. The result was a build-up of window switching that resulted in bugs.

#### Old Version
```
if (dialog.results.length > 0) {
  // ...
} else {
  // ...
}
```

#### New Version
```
if (dialog.added.length > 0) {
  // ...
}
else if (dialog.removed.length > 0) {
  // ...
}
```

This seems like a great solution, until it stops working. :( After letting the game sit for a while, the dialog starts acting up again. When I looked into the issue, I can see that  `this.dialog.added.length === 1`, `this.dialog.removed.length === 1`, and `this.dialog.results.length === 1` and the one item is the same item between all of them.

I was worried about the reactive queries (added/removed) when I started. So I would like a solution that doesn't use them at all.
