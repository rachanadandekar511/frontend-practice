# Week 1, Day 1: Semantic HTML

- `header`, `nav`, `main`, `footer` describe the role of each part of a page. `section` groups themed content under a heading, `article` is content that stands alone, and `aside` is related but optional content.
- Semantic tags help screen readers, search engines and other developers. `div` is only for styling wrappers.
- `header` and `footer` can sit inside an `article` or `section`, so a page can have many of them.
- Form inputs need a `name` to be submitted, and a `label for` that matches the input's `id`.
- Input types used: text, email, date, radio, checkbox, textarea, select, submit.
- `fieldset` and `legend` group and label radio and checkbox sets.
- `placeholder` is a hint, `value` is real content, and `textarea` has no `value` attribute.

# Week 1, Day 1: Interview Questions (HTML)

## Semantic HTML

**1. What is semantic HTML and why use it?**
Semantic HTML uses tags that describe the meaning of content (`header`, `nav`, `main`, `article`), not just how it looks. It improves accessibility (screen readers can jump between landmarks), SEO (search engines understand the structure) and maintainability (developers can read the structure at a glance).

**2. What is the difference between `section` and `article`?**
`section` groups related content under a heading. `article` is self-contained content that still makes sense on its own, like a blog post, a review or a book card. Test: if you could copy it to another page and it still made sense, it's an `article`.

**3. Can `header` and `footer` be used more than once on a page?**
Yes. They belong to their nearest sectioning parent (`body`, `article`, `section`). Only the ones that are direct children of `body` act as the page-level banner and footer for screen readers.

**4. When would you use `aside`?**
For content related to the main content but not essential to it, such as sidebars, related links, an author interview or a callout. If removing it breaks the meaning of the page, it isn't an `aside`.

**5. How many `main` elements can a page have?**
One visible `main` per page. It holds the unique content of that page, not repeated parts like the site header and footer.

**6. When should you use `nav`? Can there be more than one?**
Use it for major navigation blocks. A page can have several (header, footer), and `aria-label` tells them apart for screen readers. It's not needed for every group of links.

**7. When is `div` still the right choice?**
When you need a wrapper purely for styling or layout and no semantic element fits.

## Document setup

**8. What does `<!DOCTYPE html>` do?**
It tells the browser to render in standards mode (HTML5). Without it, browsers fall back to quirks mode, which can cause odd layout behavior.

**9. Why do we add `<meta charset="UTF-8">`?**
It declares the character encoding so special characters (©, ₹, non-English text) display correctly. It should be the first element in `head`.

**10. What does the viewport meta tag do?**
`<meta name="viewport" content="width=device-width, initial-scale=1.0">` makes the page as wide as the device screen and starts with no zoom. Responsive CSS and media queries need it to work on phones.

**11. Why set `lang` on the `html` tag?**
It helps screen readers pronounce text correctly, helps translation tools and helps search engines.

## Forms

**12. What does the `name` attribute do on an input?**
It's the key in the key-value pair sent on submission. An input without a `name` isn't submitted. In ASP.NET Core, the names are matched to model properties during model binding.

**13. What is the difference between `id` and `name`?**
`id` is a unique identifier on the page (used by CSS, JavaScript and `label for`). `name` identifies the value when the form is submitted.

**14. Why use `<label for="...">`?**
It connects the label to an input, so clicking the label focuses the input, and screen readers announce it. The `for` value must match the input's `id`.

**15. How do you make radio buttons mutually exclusive?**
Give them the same `name`. Checkboxes sharing a `name` send multiple values.

**16. What are `fieldset` and `legend` for?**
`fieldset` groups related controls and `legend` gives that group an accessible name. They're the correct way to label radio and checkbox groups.

**17. What is the difference between GET and POST?**
GET puts data in the URL, can be bookmarked and is for searches and reading. POST sends data in the request body and is for creating or changing data and for sensitive values like passwords.

**18. What does `type="submit"` do, and how is it different from `type="button"`?**
`submit` sends the form (running validation first). `button` does nothing by default. A `button` inside a form without a `type` acts as a submit button.

**19. `placeholder` vs `value`?**
`value` is real content in the field. `placeholder` is grey hint text that disappears when typing. `textarea` has no `value` attribute, so its starting text goes between the tags.

**20. How does built-in HTML validation work?**
Attributes like `required`, `type="email"`, `min`, `max` and `pattern` make the browser block submission and show a message. It's convenient but not secure, so the server must validate too.

**21. What does the browser actually send for a `select` option?**
The option's `value` attribute, not the visible text.

## Other elements and attributes

**22. Why is `alt` text important on images?**
Screen readers read it, it shows if the image fails to load, and search engines use it.

**23. Absolute vs relative paths?**
Relative paths (`images/cover.jpg`) are resolved from the HTML file's location and work anywhere the project is copied. An absolute local path like `C:\Users\...` only works on one machine. Always use forward slashes in URLs.

**24. What does `rel="noopener"` do on `target="_blank"` links?**
It stops the new page from accessing `window.opener`, which protects against reverse tabnabbing. Modern browsers apply it by default, but it's still good practice.

**25. Why use `th` and `thead` in tables?**
`th` marks header cells so screen readers associate data with its column heading. `thead`, `tbody` and `tfoot` structure the table into logical parts.

**26. When do you use `ol` and when `ul`?**
`ol` when order matters (rankings, steps). `ul` when it doesn't (tags, genres).

## Quick answers (one-liners)

- Landmarks: `header`, `nav`, `main`, `aside`, `footer`.
- Submitted data needs a `name`.
- Label `for` matches input `id`.
- Same `name` for radios in one group.
- Don't skip heading levels; one `h1` per page.

# Week 1, Day 1: Trickier Interview Questions (HTML)

## Forms: behavior and edge cases

**1. A form field has a value in it but isn't arriving at the server. What do you check first?**
Whether the input has a `name`. Inputs without one aren't submitted. Then check that it isn't `disabled` (disabled fields are never sent), that it's inside the `<form>` tag, and that radios and checkboxes are actually selected.

**2. `disabled` vs `readonly`: what's the difference?**
`disabled` fields can't be focused or edited and are not submitted. `readonly` fields can be focused and copied but not edited, and they are submitted.

**3. A checkbox is unticked. What does the server receive?**
Nothing at all for that field. The key is missing from the data, so server code can't tell "unchecked" from "field not present" without a convention. ASP.NET Core's checkbox tag helper adds a hidden field with `false` for this reason.

**4. Clicking a label doesn't focus its input. What's wrong?**
The `for` value probably doesn't match the input's `id` (typos and case differences count), or the `id` is duplicated. In my own page, a Marathi label pointed to `english` and ticked the wrong box.

**5. What happens if two elements have the same `id`?**
It's invalid HTML. CSS may still style both, but `getElementById` and `label for` use only the first match, so behavior becomes unpredictable. Use `class` for repeated styling.

**6. Does `required` make a form secure?**
No. It's a convenience for users. Anyone can bypass it with DevTools or by sending requests directly, so the server must validate again. In ASP.NET Core that means model validation and checking `ModelState`.

**7. Why shouldn't a password form use `method="get"`?**
The values appear in the URL, so they end up in browser history, server logs and referrer headers. Use `post`, and HTTPS.

**8. A button inside a form reloads the page when you only wanted it to run some code. Why?**
A `button` inside a form defaults to `type="submit"`. Set `type="button"`.

**9. What happens if the submit button is outside the `<form>` tag?**
Nothing is submitted, unless the button has a `form="formId"` attribute linking it to the form.

**10. What does the browser actually send for `type="date"`, whatever the screen shows?**
Always `yyyy-mm-dd` (for example `2021-03-01`), regardless of the user's locale.

**11. Is `placeholder` a replacement for `label`?**
No. Placeholders disappear when typing, usually have low contrast, and aren't reliably read as a label by screen readers. Use both: a label and an optional hint.

**12. When do you need `enctype="multipart/form-data"`?**
When the form uploads files. The default encoding can't carry file contents.

**13. How do you let users pick several options from a dropdown?**
Add `multiple` to the `select`. The same name then appears several times in the submission.

## Structure and semantics

**14. A page has no `<!DOCTYPE html>`. What changes?**
The browser enters quirks mode, which imitates old browser behavior. Box sizing, fonts in tables and layouts can behave differently, and CSS that works in standards mode may break.

**15. You skipped from `h2` to `h4`. Is that a problem?**
It's valid, but it breaks the document outline. Screen reader users navigate by headings, so a skipped level makes the hierarchy confusing. Choose heading levels by structure, and use CSS for appearance.

**16. Can a page have more than one `h1`?**
HTML allows it, but the recommendation is one per page, describing the page. It keeps the outline clear for assistive tools and search engines.

**17. A `section` has no heading. Is that correct?**
Usually not. A `section` should be identifiable by a heading. If there's no heading, it's probably a `div`.

**18. Can you put a `header` inside a `footer`?**
No. `header` can't be a descendant of `footer` (or of another `header`), and `footer` can't be inside a `header`.

**19. Can a page have two `main` elements?**
Only one may be visible at a time. Others would need the `hidden` attribute. In practice, use one.

**20. `<strong>` vs `<b>`, and `<em>` vs `<i>`?**
`strong` and `em` carry meaning (importance and emphasis, which screen readers may stress). `b` and `i` are only stylistic. Prefer the meaningful ones.

**21. What is the difference between block and inline elements?**
Block elements (`div`, `p`, `section`) start on a new line and take the full width. Inline elements (`span`, `a`, `strong`) flow within text and take only the width they need.

**22. Does `<img alt="">` ever make sense?**
Yes, for purely decorative images. An empty `alt` tells screen readers to skip it. A missing `alt` makes them read the file name instead.

## Details that cause real bugs

**23. The image shows on your laptop but breaks after deploying. Why?**
Common causes: an absolute local path (`C:\...`), backslashes, or letter case. Windows ignores case, but most web servers (and GitHub Pages) don't, so `MidnightLibrary.jpg` and `midnightlibrary.jpg` are different files.

**24. How do you show `<`, `>` or `&` as text in HTML?**
Use character references: `&lt;`, `&gt;` and `&amp;`. A raw `&` usually works, but a bare `<` can be parsed as a tag. This also matters for security, since unescaped user input is how XSS happens.

**25. What happens if you forget a closing tag?**
Browsers are forgiving and guess where it ends, so the page often still renders but the structure can differ from what you intended, which causes layout bugs that are hard to trace. Validators catch these.

**26. What is the risk of `target="_blank"` without `rel`?**
Reverse tabnabbing: the new page can use `window.opener` to redirect your original tab. Modern browsers now apply `noopener` by default, but older ones don't, and explicit is safer.

**27. How would you make this page usable with only a keyboard?**
Use real interactive elements (`a`, `button`, `input`), since they're focusable by default. Keep a logical tab order, never remove the focus outline without replacing it, give every field a label, and use landmarks (`nav`, `main`) for skip-navigation.

**28. `id` vs `class`?**
`id` must be unique and identifies one element (used for anchors, labels and JavaScript). `class` can repeat and is for grouping styles.

## Your project in one line

- "My BookNest page uses nested `section`s, `article`s for self-contained items, `aside` for related extras, and a form with grouped controls, all of which pass the W3C validator."