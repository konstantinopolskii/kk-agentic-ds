/* md.js — markdown runtime renderer for the KK Agentic Design System kit.
 *
 * Phase 1 of the markdown-as-source initiative (proposals/2026-04-24-markdown-as-source.md).
 * Fetches markdown declared by [data-md-src] containers, converts to HTML with
 * kit CSS classes, injects, and fires kk:md-rendered on document so scroll-spy
 * (or any re-init hook) can pick up the new DOM.
 *
 * No vendor dependency. No build step. Vanilla fetch + DOM.
 *
 * Supported markdown:
 *   headings h1..h4, paragraphs, unordered + ordered lists, links,
 *   inline code, fenced code blocks (```), bold, italic,
 *   GFM pipe tables, blockquotes, horizontal rules (---),
 *   raw HTML passthrough.
 *
 * CSS class map lives in CLASS_MAP below.
 *
 * Heading-level offset: every [data-md-src] container shifts source
 * heading levels by +1 by default. A markdown file's `#` renders as
 * the article's h2 (t-display) because the page already owns its h1.
 * A container opts out with data-md-heading-offset="0" when the file
 * is the page root. Shifted level caps at h4 so the CLASS_MAP resolves.
 *
 * Security: markdown source is author-controlled (lives in the repo).
 * Raw HTML passthrough is by design. If this ever renders user-submitted
 * markdown, add a sanitiser at the render boundary.
 */
(function () {
  "use strict";

  var CLASS_MAP = {
    h1: "t-hero", h2: "t-display", h3: "t-title", h4: "t-subtitle",
    p: "t-body", ul: "t-prose-list", ol: "t-prose-list",
    blockquote: "quote", table: "registry-table",
    th: "t-caption--bold", td: "t-caption"
  };

  // Placeholder tokens for raw HTML blocks. Sentinel uses two private-use
  // unicode chars so it cannot collide with prose an author writes.
  var BLOCKS = [];
  var STASH_OPEN = "", STASH_CLOSE = "";
  function stash(html) {
    BLOCKS.push(html);
    return STASH_OPEN + (BLOCKS.length - 1) + STASH_CLOSE;
  }
  function unstash(html) {
    var re = new RegExp(STASH_OPEN + "(\\d+)" + STASH_CLOSE, "g");
    return html.replace(re, function (_, i) { return BLOCKS[+i]; });
  }

  function escHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Inline formatting: runs after block structure is decided.
  // Order: inline code, then bold, then italic, then links.
  function inline(text) {
    // Inline code. Stash the rendered span so inner * or _ are left alone.
    text = text.replace(/`([^`\n]+)`/g, function (_, code) {
      return stash('<code class="t-mono">' + escHtml(code) + "</code>");
    });
    // Bold. Run before italic so ** is not eaten by the * rule.
    text = text.replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>");
    // Italic. Require a non-* prefix so remnants of ** cannot match.
    text = text.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    // Links [text](href). Authors who need target/rel drop raw <a> HTML.
    text = text.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
    return text;
  }

  // Table: GFM pipe syntax. Receives the raw block (header + separator + rows).
  function renderTable(block) {
    var lines = block.split("\n").filter(function (l) { return l.trim().length; });
    if (lines.length < 2) return null;
    function cells(line) {
      var t = line.trim().replace(/^\|/, "").replace(/\|$/, "");
      return t.split("|").map(function (c) { return c.trim(); });
    }
    var header = cells(lines[0]);
    var sep = lines[1];
    if (!/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(sep)) return null;
    var rows = lines.slice(2).map(cells);
    var html = '<table class="registry-table"><thead><tr>';
    header.forEach(function (h) {
      html += '<th class="t-caption--bold">' + inline(h) + "</th>";
    });
    html += "</tr></thead><tbody>";
    rows.forEach(function (r) {
      html += "<tr>";
      r.forEach(function (c) { html += '<td class="t-caption">' + inline(c) + "</td>"; });
      html += "</tr>";
    });
    html += "</tbody></table>";
    return html;
  }

  // List: renders a consecutive run of ul or ol items. Prose lists emit
  // `.t-prose-list`, not `.t-list` — the kit's `.t-list` is a tabular
  // registry-row pattern (hairlines between items, caption-sized type).
  // Markdown `- item` and `1. item` are prose patterns: body-sized, disc
  // or decimal markers, paragraph rhythm between items. One class per
  // intent keeps both contracts legible.
  function renderList(items, ordered) {
    var tag = ordered ? "ol" : "ul";
    var out = "<" + tag + ' class="t-prose-list">';
    items.forEach(function (it) { out += "<li>" + inline(it.trim()) + "</li>"; });
    out += "</" + tag + ">";
    return out;
  }

  // Raw HTML block heuristic: starts at column 0 with < plus a letter or /.
  function isRawHtmlLine(line) {
    return /^<[a-zA-Z/!]/.test(line);
  }

  // Main block converter. Heading levels inside a data-md-src article shift
  // by headingOffset — default +1 — so a markdown file's own top heading
  // (`#`) renders one rank below the page h1 that wraps it. The shell owns
  // page + part hierarchy; the markdown file owns its own subtree. Opt out
  // with data-md-heading-offset="0" when the markdown file is the page root.
  // Shifted level caps at 4 so ####-deep source still lands on a kit class.
  function render(src, headingOffset) {
    var offset = (headingOffset == null) ? 0 : (headingOffset | 0);
    BLOCKS.length = 0;
    src = src.replace(/\r\n?/g, "\n");

    var lines = src.split("\n");
    var out = [];
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // Blank line between blocks.
      if (!line.trim()) { i++; continue; }

      // Fenced code block.
      if (/^```/.test(line)) {
        var buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out.push('<pre><code class="t-mono">' + escHtml(buf.join("\n")) + "</code></pre>");
        continue;
      }

      // Horizontal rule.
      if (/^---+\s*$/.test(line)) { out.push("<hr />"); i++; continue; }

      // Heading. Level shifts by offset, then resolves. Levels 1–4 land
      // on the kit heading classes (t-hero, t-display, t-title,
      // t-subtitle). Level 5 and below demote to a paragraph of
      // regular caption text (`<p class="t-caption">`) — 16 px regular
      // against h4/t-subtitle's 18 px bold. Size drop + weight drop
      // mark the rank step at 0.2 s so authors who write `####` then
      // `#####` see an unambiguous stair instead of two peer lines.
      // No separate heading rank exists in the kit below subtitle;
      // demotion is intentional rather than a collapse, and the
      // renderer logs a one-line info so authors know the level hit
      // the demotion branch. Below h1 the h1 branch never fires — the
      // shell owns the page title.
      var h = /^(#{1,6})\s+(.*)$/.exec(line);
      if (h) {
        var level = h[1].length + offset;
        if (level < 1) { level = 1; }
        var inner = inline(h[2].trim());
        if (level > 4) {
          console.info("[md.js] heading level " + level + " demoted to t-caption (no kit rank below h4): " + h[2].trim());
          out.push('<p class="t-caption">' + inner + "</p>");
        } else {
          var tag = "h" + level;
          out.push("<" + tag + ' class="' + CLASS_MAP[tag] + '">' + inner + "</" + tag + ">");
        }
        i++;
        continue;
      }

      // Blockquote. Consecutive lines starting with >.
      if (/^>\s?/.test(line)) {
        var qbuf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          qbuf.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        out.push('<blockquote class="quote">' + inline(qbuf.join(" ")) + "</blockquote>");
        continue;
      }

      // Table. Current line has a pipe, next is a separator row.
      if (/\|/.test(line) && i + 1 < lines.length
          && /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(lines[i + 1])) {
        var tbuf = [line];
        i++;
        while (i < lines.length && lines[i].trim() && /\|/.test(lines[i])) {
          tbuf.push(lines[i]);
          i++;
        }
        var tbl = renderTable(tbuf.join("\n"));
        if (tbl) { out.push(tbl); continue; }
      }

      // Unordered list.
      if (/^[-*+]\s+/.test(line)) {
        var uitems = [];
        while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
          uitems.push(lines[i].replace(/^[-*+]\s+/, ""));
          i++;
        }
        out.push(renderList(uitems, false));
        continue;
      }

      // Ordered list.
      if (/^\d+\.\s+/.test(line)) {
        var oitems = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
          oitems.push(lines[i].replace(/^\d+\.\s+/, ""));
          i++;
        }
        out.push(renderList(oitems, true));
        continue;
      }

      // Raw HTML block. Passes through until a blank line.
      if (isRawHtmlLine(line)) {
        var rbuf = [line];
        i++;
        while (i < lines.length && lines[i].trim()) { rbuf.push(lines[i]); i++; }
        out.push(rbuf.join("\n"));
        continue;
      }

      // Paragraph. Collect until blank line or another block opener.
      var pbuf = [line];
      i++;
      while (i < lines.length && lines[i].trim()
             && !/^(#{1,4}\s|```|>|---+\s*$|[-*+]\s|\d+\.\s)/.test(lines[i])) {
        if (isRawHtmlLine(lines[i])) break;
        pbuf.push(lines[i]);
        i++;
      }
      out.push('<p class="t-body">' + inline(pbuf.join(" ")) + "</p>");
    }

    return unstash(out.join("\n"));
  }

  // Fetch + inject one container. Heading offset defaults to +1 — the
  // container sits inside a page that already carries its own h1, so
  // the markdown file's `#` becomes the article's h2 (t-display). A
  // container opts out with data-md-heading-offset="0" when the file
  // is the page root.
  function load(container) {
    var src = container.getAttribute("data-md-src");
    if (!src) return Promise.resolve();
    var rawOffset = container.getAttribute("data-md-heading-offset");
    var offset = (rawOffset == null) ? 1 : (parseInt(rawOffset, 10) || 0);
    return fetch(src).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    }).then(function (text) {
      container.innerHTML = render(text, offset);
    }).catch(function (err) {
      console.warn("[md.js] failed to load " + src + ": " + err.message);
      container.innerHTML = '<p class="t-caption t-muted">Markdown source unavailable: ' + src + "</p>";
    });
  }

  function init() {
    var containers = document.querySelectorAll("[data-md-src]");
    if (!containers.length) return;
    var all = Array.prototype.map.call(containers, load);
    Promise.all(all).then(function () {
      document.dispatchEvent(new CustomEvent("kk:md-rendered", { bubbles: true }));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose for manual re-run after SPA swaps.
  window.KKMd = { render: render, init: init };
})();
