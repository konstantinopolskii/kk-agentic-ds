---
session: 2026-04-26-comments-html-attr
stage: 0
role: user
input: conversation
output: two related asks for 1.7.1
gate: passed to stage 1
---

## Raw input — ask 1 (declarative opt-out)

> Yes. But it should be on another layer of the config. Not an app. Only if app is the key meta level tag that is on the highest level

Context: I had offered a `data-kk-comments="off"` attribute as a one-line declarative opt-out. The user approved the idea but moved the placement off `.app` (a layout class) onto a higher meta-level tag.

## Raw input — ask 2 (hidden copy easter egg)

> Also add a script that copies the comments if you simply click the comments headline. It shouldn't be visible, it's just a hidden way to copy, like an easter for the developer. A cheat code. For now.

A click target labeled "Comments" that fires `KK.copyComments()`. Invisible to readers; findable by devs via DevTools or grep. Temporary ("for now").

## Revert point

`v1.7.0` at `19dbcf2`. Roll back is `git reset --hard v1.7.0`.
