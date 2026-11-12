# Week 1, Day 4: Responsive design

## 1. The big idea
- Responsive design = one page that adapts to different screen widths (phone, tablet, desktop).
- Think of water taking the shape of its glass: the layout rearranges itself instead of staying fixed.
- It rests on three things: the viewport meta tag, flexible layouts and images, and media queries.

## 2. The viewport meta tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- Without it, a phone pretends to be a ~980px desktop and shrinks the whole page, and media queries don't match the real screen width.
- `width=device-width` = page as wide as the screen. `initial-scale=1.0` = no zoom to start with.
- Goes inside `<head>`. Never add `user-scalable=no`, it blocks zooming (an accessibility problem).

## 3. Mobile-first
- Write the phone layout first as the base styles, with no media query.
- Then use `min-width` queries to add rules as the screen gets wider.
- Why: the base CSS stays simple (one column), and wider layouts only add things.

## 4. Media queries
```css
.row { display: block; }              /* phone: base styles */

@media (min-width: 600px) {           /* 600px and wider */
    .row {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
}

@media (min-width: 900px) {           /* 900px and wider */
    .row {
        grid-template-columns: repeat(4, 1fr);
    }
}
```
- `@media (min-width: 600px)` = "when the viewport is at least 600px wide, apply these rules".
- Queries add no specificity. At equal specificity the **later rule wins**, so put the 900px block after the 600px block, and put each query after the rule it overrides.
- At 900px and above, both queries apply. The later one overrides only what it sets (the column count), and the rest is inherited from the 600px rule.
- Choose breakpoints where the layout starts to look bad, not from device names.
- Each `@media` needs its own opening and closing brace. A missing `}` can silently break everything after it.

## 5. Fluid images
```css
img {
    max-width: 100%;
    height: auto;
}
```
- `max-width: 100%` = never wider than the parent. On wide screens the image stops at its natural size and doesn't stretch.
- `height: auto` = keep the proportions, so the image isn't squashed.
- Don't use `width: 100%` (it stretches small images and makes them blurry), and don't set a fixed `height` in px.
- The image's parent decides what 100% means. If the image is inside a grid cell, it is measured against that cell.

## 6. `width` vs `max-width`
- `width: 400px` is a fixed size. In a smaller parent, the element sticks out.
- `max-width: 400px` is a ceiling. The element shrinks with its parent but never grows past 400px.
- `min-width` is a floor. `max-width` wins over `width` when they clash.
- Common combination: `width: 100%; max-width: 900px;`.
- On BookNest: `body { max-width: 900px; margin: 0 auto; }` is a centred page that shrinks on small screens.

## 7. Flexible layout tools (no media query needed)
- `flex-wrap: wrap` on a flex container lets items drop onto a new line when they don't fit. The default, `nowrap`, squashes them to one line.
- Percentage widths (`width: 50%`) are relative to the parent.
- `auto-fit` with `minmax` makes a grid pick its own number of columns:
```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
}
```
- `minmax(220px, 1fr)` = each column is at least 220px, and shares the leftover space. `auto-fit` = fit as many columns as will fit.

## 8. `minmax(0, 1fr)` and grid blowout
- A plain `1fr` is secretly `minmax(auto, 1fr)`. The `auto` minimum means "don't get narrower than my content's minimum size".
- Content that can't wrap (a long word, a wide image or table) keeps the column wide, and the grid overflows its container.
- `minmax(0, 1fr)` allows the column to shrink to zero, so the grid fits.
- On BookNest: `grid-template-columns: repeat(2, minmax(0, 1fr));`
- It doesn't break long words by itself. Add `overflow-wrap: anywhere;` to the items if long words should break.

## 9. What I built on BookNest
- Fluid image: `img { max-width: 100%; height: auto; }`
- Book cards: one column by default, two from 700px:
```css
.book-list { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 700px) {
    .book-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```
- Navs wrap on narrow screens: `flex-wrap: wrap;` on `header nav` and `footer nav`.
- Wide table scrolls inside its own box instead of breaking the page: wrapped it in `<div class="table-wrap">` and used `.table-wrap { overflow-x: auto; }`.
- Smaller `body` padding on phones (8px), 16px from 700px up. Smaller `h1` on phones (2rem), 2.5rem from 700px up.
- Form fields can't overflow a narrow screen: `input, select, textarea { max-width: 100%; }`.
- Added `textarea:focus-visible` to the focus ring rule so every field shows the ring.

## 10. Testing and debugging
- DevTools device toolbar: F12, then Ctrl+Shift+M. Type the width into the box and keep the zoom at 100%.
- Test at three widths: 375px (phone), 768px (tablet), 1024px (desktop).
- The width in the toolbar is the viewport width that `min-width` queries use. `window.innerWidth` in the Console shows it exactly.
- A sideways scroll bar often doesn't show in the phone view. Check for overflow with:
```js
document.documentElement.scrollWidth > document.documentElement.clientWidth
```
`true` means something is wider than the screen.
- To list elements that stick out:
```js
[...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth)
```
- If pasting into the Console is blocked, type `allow pasting` first.
- In the Styles panel, a crossed-out line is a losing rule, and a warning icon means the value is invalid (for example, a typo).
- Edits made in DevTools (including `element.style`) are temporary. Copy good values into the CSS file.
- Don't hide overflow with `overflow-x: hidden` on `body`. It clips content instead of fixing it.

## 11. Gotchas I hit
- `repeat(2 1fr)` (missing comma) is invalid, so the browser ignores the whole line and the grid stays at one column. Correct form: `repeat(2, 1fr)`.
- Changing column widths (`1fr 2fr` vs `100px 1fr`) never moves an item to another cell. Only the number of columns does.
- An image inside a grid container becomes a grid item. Keep it outside the grid wrapper unless that's intended.
- A cut-off in the preview can be the DevTools frame or the zoom, and not the page. Check the real numbers in the Console.
- Hard refresh (Ctrl+F5) after saving, so the browser doesn't use an old copy of the CSS.

---

# Interview questions

## Fundamentals
**1. What is responsive design?**
Building one page that adapts its layout to different screen sizes, using flexible layouts and images, the viewport meta tag and media queries.

**2. What does the viewport meta tag do and why is it needed?**
`<meta name="viewport" content="width=device-width, initial-scale=1.0">` makes the page as wide as the device screen at normal zoom. Without it, mobile browsers lay the page out at about 980px and scale it down, and media queries don't match the real screen width.

**3. What is mobile-first design?**
Writing the small-screen layout as the base styles, then using `min-width` media queries to add rules for larger screens. It keeps the base CSS simple and avoids undoing desktop styles on phones.

**4. What is a media query? Write one.**
A rule that applies styles only when a condition is true, for example `@media (min-width: 700px) { .book-list { grid-template-columns: repeat(2, 1fr); } }`, meaning "when the viewport is at least 700px wide".

**5. `min-width` vs `max-width` in media queries?**
`min-width: 700px` applies from 700px and up (mobile-first). `max-width: 700px` applies up to 700px (desktop-first).

**6. How do you choose breakpoints?**
By resizing the page and adding a breakpoint where the layout starts to look bad, not by specific device sizes, since devices vary and change.

**7. Do media queries increase specificity?**
No. The rules inside have normal specificity, so at equal specificity the later rule wins. That's why queries go after the base rules they override.

## Images and sizing
**8. How do you make images responsive?**
`img { max-width: 100%; height: auto; }`. The image shrinks to fit its container, keeps its aspect ratio, and doesn't grow beyond its natural size.

**9. Why `max-width: 100%` and not `width: 100%`?**
`width: 100%` stretches small images to fill the container, which makes them blurry. `max-width: 100%` only shrinks them when necessary.

**10. `width` vs `max-width`?**
`width` is fixed, so the element can overflow a smaller parent. `max-width` is a ceiling, so the element can shrink with its parent but never exceed it.

**11. Why do you set `height: auto` on images?**
To keep the aspect ratio. A fixed height with a shrinking width distorts the image.

**12. Which units suit responsive layouts?**
`rem` and `em` for text and spacing, `%` and `fr` for flexible widths, `px` for thin borders, and `vw` and `vh` for sizes tied to the viewport.

## Flex and grid in responsive layouts
**13. What does `flex-wrap: wrap` do?**
Lets flex items move onto a new line when they don't fit. The default, `nowrap`, squashes them to stay on one line.

**14. What does `repeat(auto-fit, minmax(220px, 1fr))` do?**
Makes a grid with as many columns as fit, each at least 220px wide and sharing the leftover space equally. The column count changes with the width, with no media query.

**15. What is the difference between `auto-fit` and `auto-fill`?**
Both create as many columns as fit. With few items, `auto-fill` keeps empty columns, and `auto-fit` collapses them so the items stretch to fill the row.

**16. What does `minmax(0, 1fr)` do and why use it?**
It allows a grid column to shrink down to zero. A plain `1fr` has an automatic minimum equal to its content's minimum size, so content that can't wrap (a long word, a wide image) can make the grid overflow. Setting the minimum to 0 prevents that.

**17. How would you make a two-column card grid become one column on phones?**
Make one column the base style (`grid-template-columns: 1fr`), then switch to two columns inside `@media (min-width: 700px)`.

**18. How do you stop a wide table from breaking a mobile layout?**
Wrap it in a container with `overflow-x: auto`, so the table scrolls sideways inside its own box instead of widening the page.

## Debugging
**19. A page scrolls sideways on mobile. How do you find the cause?**
Check which elements are wider than the viewport, using DevTools or the Console (compare `getBoundingClientRect().right` with the viewport width). Common causes are a fixed-width element, a large image, a wide table, or form fields with a default width. Fix it at the source with `max-width: 100%`, a scroll wrapper, or flexible columns, and don't hide it with `overflow-x: hidden`.

**20. How do you test responsive layouts?**
Use the browser's device toolbar at several widths (for example 375, 768 and 1024px), check for overflow, and test on a real phone when possible.

**21. My media query isn't applying. What do I check?**
That the viewport meta tag is present, that the query's syntax and braces are correct, that the query is placed after the rule it overrides, that the file is saved and hard-refreshed, and whether the rule is crossed out in DevTools by a more specific one.

**22. A grid shows one column at every width even though my query looks right. Why?**
Possibly an invalid value, such as `repeat(2 1fr)` with a missing comma. The browser ignores invalid declarations silently, so DevTools shows it crossed out with a warning.

## Putting it together
**23. How did you make BookNest responsive?**
I kept the viewport tag, made images fluid with `max-width: 100%`, switched the book cards from one column to two at 700px using a mobile-first media query, let the nav links wrap with `flex-wrap`, put the table in an `overflow-x: auto` wrapper, and reduced the body padding and heading size on small screens.

**24. Flexbox or Grid for a responsive card layout?**
Grid when columns should line up exactly, especially with `repeat(auto-fit, minmax(...))`. Flexbox with `flex-wrap` when each row can have a different number of items. I often use both.

**25. Why avoid `overflow-x: hidden` on `body` to fix horizontal scroll?**
It hides the scroll bar but clips the overflowing content, so users can't reach it. It's better to find and fix the element that is too wide.