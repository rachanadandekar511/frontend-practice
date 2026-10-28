# Week 1, Day 2: CSS basics

## 1. How a CSS rule is built
- A rule = selector + declaration block. Each declaration is `property: value;`.
```css
p {
    color: #333;
    font-size: 1rem;
}
```
- `{ }` wrap the rule, `:` separates property from value, `;` ends each declaration.
- Link the file in `head`: `<link rel="stylesheet" href="style.css">`.

## 2. Selectors
| Selector | Example | Picks |
|---|---|---|
| Element | `p` | every `p` |
| Class | `.card` | every element with `class="card"` |
| ID | `#title` | the one element with that id |
| Descendant | `nav a` | `a` anywhere inside `nav` |
| Child | `main > section` | `section` directly inside `main` |
| Grouping | `th, td` | either one (comma = or) |
| Pseudo-class | `a:focus-visible` | an element in a state or position |

- A class needs a dot in CSS, but `class="card"` has no dot in HTML.
- Pseudo-class (one colon) = a state or position (`:hover`, `:focus-visible`). Pseudo-element (two colons) = a part of an element (`::before`).

## 3. Specificity (which rule wins a clash)
- Order, strongest first: inline style, id, class / attribute / pseudo-class, element.
- Equal specificity: the later rule wins.
- Avoid `!important`. Use DevTools to find which rule is winning (losing rules are crossed out).
- Some properties are inherited by child elements (`color`, `font-family`, `line-height`). Box properties (`padding`, `margin`, `border`) are not.

## 4. Colours and text
- `color` = text colour. `background-color` = background.
- Colour formats: names (`navy`), hex (`#333`), `rgb()`, `rgba()` (adds transparency).
- `font-family: Arial, Helvetica, sans-serif;` is a font stack. The last name is a fallback.
- `font-weight`: 400 normal, 700 bold.
- `line-height: 1.6;` is unitless, a multiple of the font size.
- `text-align` aligns text inside its box, not the box itself.
- `text-decoration: none;` removes link underlines. Keep them in running text.

## 5. Units
- `px`: fixed size. Good for thin borders.
- `rem`: multiple of the root font size (16px by default). Respects the user's browser text size. Use for text and spacing.
- `%`: share of the parent. Good for widths.
- A bare number like `font-size: 16` is invalid. Only `0`, `line-height` and `font-weight` can be unitless.

## 6. Box model
- Every element is a box: content, then padding (inside the border), border, then margin (outside).
- Shorthand: `padding: 8px 16px;` = top/bottom 8px, left/right 16px. Four values go clockwise: top, right, bottom, left.
- Vertical margins between stacked blocks collapse into the larger one.
- Margin is always transparent, and the background colour fills the padding but not the margin.
- `outline` is drawn outside the border and takes no layout space.

## 7. box-sizing
```css
*, *::before, *::after {
    box-sizing: border-box;
}
```
- Default `content-box`: `width` is the content only, so `width: 300px` + `padding: 20px` + `border: 1px` = 342px.
- `border-box`: `width` includes padding and border, so the box stays 300px and the content area shrinks.
- Put it first in the stylesheet. Margin is never included.

## 8. display
- `block`: new line, full width, accepts width, height, margin and padding. (`div`, `section`, `p`, `h1`)
- `inline`: flows in text, ignores width and height. (`a`, `span`, `strong`, `label`)
- `inline-block`: flows in a line but accepts width, height and padding. (`button`, `input`)
- `img` is inline but accepts width and height because it is a replaced element (the browser knows its size).
- `display` changes layout only, not meaning.
- Inline-block items on separate lines show a small gap (whitespace in the HTML). Flexbox removes it.
- `display: none` removes the element from layout and from screen readers.

## 9. Things I built on BookNest
- Centred page: `max-width: 900px; margin: 0 auto; padding: 0 16px;` on `body`.
- `margin: 0 auto` needs a block with a width limit. `auto` splits leftover horizontal space equally.
- Cards: `article { padding; border; margin; background-color }`.
- Table: `border-collapse: collapse;` merges neighbouring borders. `th, td { border; padding }`.
- Dividers: `main > section { border-bottom: 1px solid #ccc; }` (child combinator so nested sections are skipped).
- `label { display: block; }`, then `fieldset label { display: inline; }` so radio and checkbox labels stay in a row.
- Keyboard focus ring:
```css
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible {
    outline: 3px solid #1a73e8;
    outline-offset: 2px;
}
```

## 10. DevTools habits
- F12, element picker, then the Styles and Computed panels.
- The box diagram colours: blue content, green padding, tan border, orange margin.
- Edit values live to experiment. Changes are temporary until copied into `style.css`.
- Crossed-out declarations are losing rules.

---

# Interview questions

## Basics
**1. What is CSS and how do you add it to a page?**
CSS describes how HTML looks. You add it with an external stylesheet (`<link rel="stylesheet" href="style.css">`), a `<style>` block, or inline `style` attributes. External is preferred because it's reusable and cacheable.

**2. What are the parts of a CSS rule?**
A selector, which says what to style, and a declaration block of `property: value;` pairs.

**3. Element, class and ID selectors: when do you use each?**
Element for a base style on a tag, class for reusable styling (the default choice), and ID for a unique element, mostly for anchors and JavaScript hooks rather than styling.

**4. What is the difference between `.card p` and `.card > p`?**
`.card p` matches any `p` inside `.card` at any depth. `.card > p` matches only direct children.

**5. What is the difference between a pseudo-class and a pseudo-element?**
A pseudo-class (`:hover`, `:focus-visible`) selects an element in a state or position. A pseudo-element (`::before`, `::first-line`) selects or creates a part of an element.

## Specificity and the cascade
**6. How does the browser decide which rule wins?**
By specificity (inline, then id, then class / attribute / pseudo-class, then element). If equal, the later rule wins. `!important` overrides everything, which makes it hard to maintain.

**7. A style isn't applying. How do you debug it?**
Open DevTools, select the element and check the Styles panel for a crossed-out declaration (a more specific rule is winning), typos in the property or value, a missing `;` or `}`, a file that isn't saved or linked, and a cached page (hard refresh).

**8. What is inheritance? Give examples.**
Some properties pass from parent to child automatically, such as `color`, `font-family` and `line-height`. Box properties like `margin`, `padding` and `border` don't inherit.

## Units, colour and text
**9. `px` vs `rem` vs `%`?**
`px` is fixed. `rem` is relative to the root font size and respects user settings, so it's best for text and spacing. `%` is relative to the parent, so it suits flexible widths.

**10. Why is `line-height: 1.6` better than `line-height: 1.6px`?**
A unitless value is a multiplier of the element's own font size, so it scales with the text. `1.6px` would squash the lines to 1.6 pixels.

**11. How do you write a colour in CSS?**
Named colours, hex (`#333`), `rgb()`, `rgba()` for transparency, or `hsl()`. Hex and `rgb()` describe the same red, green and blue mix.

**12. Why do you give a `font-family` several fonts?**
As a fallback stack. The browser uses the first one that's available, and a generic family (`sans-serif`) is the last resort.

## Box model and sizing
**13. Explain the box model.**
Every element is a box made of content, padding, border and margin. Padding is inside the border, margin is outside.

**14. What does `box-sizing: border-box` do and why use it?**
It makes `width` and `height` include padding and border, so sizes are predictable and adding padding doesn't enlarge the element.

**15. A `width: 300px` box with `padding: 20px` and `border: 1px` is 342px wide. Why?**
It's using the default `content-box`, where width applies to the content only: 300 + 40 + 2 = 342.

**16. What is margin collapse?**
When two vertical margins of adjacent block elements meet, they combine into the larger one instead of adding up.

**17. Padding vs margin?**
Padding is space inside the element, between content and border, and it takes the element's background. Margin is space outside, and it's transparent.

**18. How do you centre a block horizontally?**
Give it a `width` or `max-width` and set `margin: 0 auto;`. `auto` splits the leftover horizontal space equally. Without a width limit, there's no leftover space.

**19. `width` vs `max-width`?**
`width` is fixed, so it causes horizontal scrolling on small screens. `max-width` lets the element shrink with the window but never grow past the limit.

## Display
**20. Block vs inline vs inline-block?**
Block takes a full row and accepts all box properties. Inline flows in text and ignores width and height. Inline-block flows inline but accepts width, height and padding.

**21. Why does a `span` ignore `width` and `height`?**
It's inline, so it's treated like a word in a line of text and sized by its content. Set `display: inline-block` or `block` to give it a size.

**22. Why can `img` have a width even though it's inline?**
It's a replaced element, so the browser already knows its intrinsic size and can scale it.

**23. `display: none` vs `visibility: hidden`?**
`display: none` removes the element from the layout (no space, and screen readers skip it). `visibility: hidden` hides it but keeps its space.

## Tables, links and accessibility
**24. What does `border-collapse: collapse` do?**
It merges the borders of neighbouring table cells into a single line, instead of drawing double borders with gaps.

**25. Why is `outline: none` on focus bad, and what is `:focus-visible`?**
Removing the focus ring leaves keyboard users unable to see where they are. `:focus-visible` shows the ring mainly for keyboard focus, so you can style a clear outline without it appearing on every mouse click.

**26. Should you remove link underlines?**
Only where it's obvious they're links, such as a nav bar. In body text, keep them (or use another clear style), so people can tell links apart.

## Practical
**27. How would you draw a divider under each top-level section without touching the HTML?**
`main > section { border-bottom: 1px solid #ccc; }`. The child combinator skips nested sections.

**28. How do you make a form's radio labels sit in a row when `label` is `display: block`?**
Use a more specific descendant selector: `fieldset label { display: inline; }`. The higher specificity wins over the plain `label` rule.

**29. In one sentence, how is HTML different from CSS?**
HTML gives the content meaning and structure, and CSS controls how it looks.