---
session: 2026-04-26-comment-persist
stage: 0
role: user
input: conversation
output: raw ask captured
gate: passed to stage 1
---

## Raw input

> Check the explee partnership proposal /Users/kostyantinopolskii/Jupiter/Directions/explee/agreement/agreement.html and the way we've implemented the cmmentary storage and copy system in the file. I want you to inject this system unversaly in our package, so by default all commentaries will work with the cookie and have the ability to be copied. Same time, for the development servers or for the projects where comments are interacting with the database, we should have the ability to switch the cookie storaging off. Or maybe just add another layer that syncs them with the dabase. Use our pipeline to carefully design and craft this inprovement. Git commit before starting, so we can revert. Don't ask me anything at all. Execute till done.

## Source artifact

`/Users/kostyantinopolskii/Jupiter/Directions/explee/agreement/agreement.html` lines 452-597 — inline persistence script and `KK.extractComments()` / `KK.clearSavedComments()` hidden API.

## Revert point

Working tree was clean at session start. HEAD = `901809f CHANGELOG entry for 1.5.1`. Rolling back is `git reset --hard 901809f`.
