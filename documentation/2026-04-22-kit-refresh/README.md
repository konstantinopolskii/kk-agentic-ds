# Session — `KK.refresh()` real behaviour

Date: 2026-04-22
Owner: Konstantin Konstantinopolskii
Product: kk-agentic-ds kit itself
Entry point: direct maintainer pass (single named decision, no design phase)
Kit version going in: 0.8.0 → 0.9.0

## Outcome

v0.9.0 shipped. The `KK.refresh()` stub is replaced by a real function that re-scans the DOM and wires up new elements. Each auto-init module tracks whether its global listeners are bound; subsequent calls only pick up new iterable elements. Closes the last 0.7.0 open item. Backlog empty.

## File index

| File | Role | What |
|---|---|---|
| [01-maintainer.md](./01-maintainer.md) | kk-ds-maintainer | Idempotency sentinels across six modules, per-wrapper deck marker, live-query scroll-spy, refresh() implementation, CHANGELOG 0.9.0 entry. |
