# `no-defective-attribute`

A `<img>` tag with either the `width` or `height` property missing is rendered in an unexpected layout.

The following example expect to reduce Layout Shift by `width`/`height` attribute. However, Layout Shift occurs because `height="100"` is missing:

```html
<img src="https://placehold.jp/200x100.png" width="200" />
```

Also, the following example expect to reduce Layout Shift by [aspect ratio hint](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping). However, Layout Shift occurs because `height="100"` is missing:

```html
<div style="width: 400px;">
  <img src="https://placehold.jp/200x100.png" width="200" style="width: 100%; height: auto;" />
</div>
```

So this rule disallows `<img>` tags with only one `width`/`height` attributes.

## Rule Details

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
```
