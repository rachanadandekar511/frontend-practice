# Week 1, Day 3: Flexbox and Grid

## 1. The big idea
- Flexbox lays items out along **one line** (a row or a column), like books on a shelf.
- Grid lays items out in **rows and columns together**, like a chessboard or a spreadsheet.
- Both work the same way: the **parent** gets `display: flex` or `display: grid`, and its **direct children** become the items.
- Only direct children are affected. A `p` inside an item is not.

## 2. Flexbox: the two axes
- **Main axis:** the direction items are laid out. A row (the default) runs left to right.
- **Cross axis:** runs across the main axis, top to bottom for a row.
- `flex-direction: column` swaps the axes: the main axis becomes vertical.

## 3. Flex container properties (on the parent)
```css
.row {
    display: flex;
    flex-direction: row;          /* row (default) | column */
    justify-content: center;      /* along the main axis */
    align-items: center;          /* across the cross axis */
    gap: 16px;                    /* space between items */
    flex-wrap: wrap;              /* let items drop to a new line */
}
```
- `justify-content` values: `flex-start` (default), `flex-end`, `center`, `space-between` (first and last touch the edges, equal gaps between), `space-around` (equal space around each item, so edges get half), `space-evenly` (every gap the same, including the edges).
- `align-items` values: `stretch` (default, items grow to the row's height), `flex-start`, `center`, `flex-end`.
- `justify-content` is always "along the main axis" and `align-items` is always "across it". With `column`, they swap which way they move things.
- `justify-content` only shows an effect when there is spare space. In a column, the container needs a height.
- `align-items` only shows an effect when the container is taller than its items.
- `flex-wrap: wrap` lets items drop onto a new row when they don't fit. The default is `nowrap`, which squashes them to fit.

## 4. Flex item property (on a child)
- `flex: 1` makes an item grow to take a share of the leftover space.
- Items with the same value share equally (`flex: 1` on two items gives equal widths). `flex: 2` gets twice the share of `flex: 1`.
- It only matters when there is leftover space. If the items already fill the row, nothing changes.

## 5. Grid basics
```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
```
- `grid-template-columns` defines the columns. Each value is one column: `1fr 1fr 1fr` is three columns.
- `fr` = "fraction": one share of the free space. `1fr 2fr` makes the second column twice as wide as the first.
- `100px 1fr` = a fixed 100px column, and the second takes all the rest. `fr` columns divide what is left after fixed widths and gaps.
- `repeat(3, 1fr)` is shorthand for `1fr 1fr 1fr`.
- `gap` is the space between rows and columns, not around the outside edge.
- **Rows are created automatically** as items need them (implicit rows). 6 items in 3 columns gives 2 rows. `grid-template-rows` can set row heights, but it is optional.
- The **number of columns** decides where an item lands. Changing column widths (`1fr 2fr` vs `100px 1fr`) does not move items between cells. Going from 2 columns to 3 columns does.

## 6. Flexbox or Grid?
- Flexbox for one line of items: nav bars, button groups, a checkbox with its label.
- Grid for a layout of rows and columns: card galleries, page layouts with a sidebar.
- Quick test: "Do I need rows and columns to line up together?" Yes means Grid. No means Flexbox.
- They combine well, for example a Grid page layout with a Flexbox nav bar inside it.

## 7. What I built on BookNest
- Centred the header and footer links:
```css
header nav { display: flex; justify-content: center; gap: 8px; }
footer nav { display: flex; justify-content: center; gap: 8px; }
```
- Put the consent checkbox and its label on one line, with the label's extra top margin reset **only inside `.consent`**, so other labels keep their spacing:
```css
.consent { display: flex; align-items: center; gap: 8px; }
.consent label { margin-top: 0; }
```
- Put each pair of book cards in two columns:
```css
.book-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.book-list article { margin: 0; }
```
- `margin: 0` on the articles stops the card margin and the grid gap adding up.
- Margins do not collapse between flex or grid items, which is why gap is the better tool for spacing.

## 8. DevTools habits
- A small **flex** or **grid** badge appears next to a container in the Elements panel. Clicking it draws the layout lines over the page.
- Untick `display: flex` in the Styles panel to see the "before" layout, then tick it again.

## 9. Gotchas I hit
- Flex and grid properties go on the **parent**. The exception is `flex: 1`, which goes on an item.
- A wrapper `div` is needed when the items are not already direct children of one parent (for example, the checkbox and its label).
- If a layout does not change, check that the class name in the HTML matches the CSS exactly, and refresh with Ctrl+F5.

---

# Interview questions

## Flexbox
**1. What is Flexbox and when do you use it?**
A one-dimensional layout model for arranging items along a single row or column. I use it for nav bars, button groups, toolbars and aligning small groups of items.

**2. What are the main axis and cross axis?**
The main axis is the direction items are laid out (horizontal for `row`, vertical for `column`). The cross axis runs across it.

**3. `justify-content` vs `align-items`?**
`justify-content` distributes items along the main axis. `align-items` aligns them along the cross axis. With `flex-direction: column`, their directions swap.

**4. How do you centre something both horizontally and vertically?**
On the parent: `display: flex; justify-content: center; align-items: center;`, and the parent needs a height taller than the item.

**5. What is the difference between `space-between`, `space-around` and `space-evenly`?**
`space-between` puts the first and last items on the edges with equal gaps between. `space-around` puts equal space around each item, so the edges get half the space of the middle gaps. `space-evenly` makes every gap identical, including the edges.

**6. What does `flex: 1` do?**
It lets an item grow to fill a share of the leftover space. Items with the same value share equally, and `flex: 2` gets twice the share of `flex: 1`.

**7. What does `flex-wrap: wrap` do?**
By default, flex items stay on one line and shrink to fit. With `wrap`, items move to a new line when they don't fit.

**8. What is the default value of `align-items`, and what does it do?**
`stretch`. Items grow to match the height of the tallest item (or the container's height) unless they have a fixed height.

**9. Why use `gap` instead of margins between flex items?**
`gap` adds space only between items, with no extra space on the outer edges, and it needs no per-item rules. Margins would need to be applied to each item and removed from the last one.

**10. Which elements become flex items?**
Only the direct children of the flex container.

## Grid
**11. What is CSS Grid and when do you use it?**
A two-dimensional layout model for arranging items in rows and columns together. I use it for card galleries, page layouts and anything table-like.

**12. What does `grid-template-columns: repeat(3, 1fr)` mean?**
Three equal-width columns. `fr` is a fraction of the available space, so each column gets one third.

**13. What is the `fr` unit?**
A share of the free space left after fixed sizes and gaps are taken out. `1fr 2fr` makes the second column twice as wide as the first.

**14. How do rows get created if you only define columns?**
The grid creates implicit rows automatically as items need them. 6 items in 3 columns gives 2 rows. I can set row sizes with `grid-template-rows` or `grid-auto-rows`.

**15. What does `grid-template-columns: 100px 1fr` do?**
Creates two columns: a fixed 100px one and a flexible one that takes the remaining space.

**16. If I change `1fr 1fr` to `1fr 2fr`, does item 4 move to a different cell?**
No. Cell positions depend on the number of columns, not their widths. Changing the width only changes how wide the cells are.

**17. `gap` vs margin in Grid?**
`gap` sets the space between rows and columns. Margins on items add to the gap, so space can end up bigger than expected. That's why I reset the card margin to 0 inside the grid.

## Choosing between them
**18. Flexbox or Grid, how do you decide?**
Flexbox for one-dimensional layouts (a single row or column), and Grid for two-dimensional layouts where rows and columns need to line up. They are often combined.

**19. Can you use Flexbox and Grid together?**
Yes. For example, a Grid page layout with a Flexbox nav bar in the header, or a flex row inside a grid cell.

**20. Do margins collapse between flex or grid items?**
No. Vertical margin collapsing only applies to normal block layout, not to flex or grid items. That makes spacing more predictable.

## Practical
**21. How did you put a checkbox and its label on one line?**
I wrapped them in `<div class="consent">` and set `display: flex; align-items: center; gap: 8px;`. Then I reset the label's extra top margin with `.consent label { margin-top: 0; }`, scoped so other labels keep their spacing.

**22. A flex or grid layout isn't changing. How do you debug it?**
Check in DevTools that the **flex** or **grid** badge appears on the parent element. If not, the `display` rule isn't applying to it. Also check that the class name matches, the file is saved, and the page has been hard refreshed.

**23. How would you make a two-column card layout?**
Put the cards in a parent with `display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;`.