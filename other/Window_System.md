# Window, Dialog, and Focus

## Bug 1: Dialogs that won't close!
## Bug 2: Random Dialog opening!

## Solution!
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
