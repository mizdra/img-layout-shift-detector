# `no-mismatch-of-apparent-size`

If the size of an element does not match the image's original aspect ratio, the image may be distorted. This rule disallows the `<img>` tag.

## Rule Details

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" height="100" />
<img src="https://placehold.jp/200x100.png" style="width: 100px; height: 100px;" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
<img src="https://placehold.jp/200x100.png" style="width: 200px; height: 100px;" />
```
