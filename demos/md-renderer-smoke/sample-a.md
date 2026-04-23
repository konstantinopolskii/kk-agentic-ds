# Core prose path

Exercises the core prose path. Every heading level, body paragraphs, unordered and ordered lists, internal and external links, and inline code spans.

## Section heading

A body paragraph. The renderer wraps it in `<p class="t-body">`. The surrounding utility class comes from the kit, not this file.

### Card-level heading

Short body under a card-level heading. Links render inline: the [fundamental demo](../fundamental--accepted/index.html) lives next door, and the [patterns registry](../../patterns.html) sits at the repo root.

#### Subtitle-level heading

Inline code uses backticks. The class map sends `h1` to `t-hero`, `h2` to `t-display`, `h3` to `t-title`, and `h4` to `t-subtitle`.

## Lists

Unordered list:

- First item, unmarked.
- Second item with a [link](https://example.com).
- Third item with `inline code`.

Ordered list:

1. Fetch the markdown.
2. Render to HTML with kit classes.
3. Inject into the container.

## Mixed content paragraph

A paragraph can carry **bold text**, *italic text*, a [link](#anchor), and `inline code` in one line. Each runs through the inline pass after the block pass settles.
