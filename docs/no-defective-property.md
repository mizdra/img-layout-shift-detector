# `no-defective-property`

A `<img>` tag with either the `width` or `height` property missing is rendered in an unexpected layout.

For example, suppose we have the following tag:

```html
<div style="width: 400px;">
  <img src="https://placehold.jp/200x100.png" style="width: 100%;" />
</div>
```

Since this tag causes Layout Shift, you would try to reduce Layout Shift by adding an [aspect ratio hint](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping) like the following:

```html
<div style="width: 400px;">
  <img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%;" />
</div>
```

However, because the `height: auto;` is missing, the element is rendered as `400x100`. This is an unexpected layout.

So this rule disallows `<img>` tags with only one `width`/`height` properties.

## Rule Details

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%;" />
<img src="https://placehold.jp/200x100.png" style="width: 100%;" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" style="width: 100%; height: auto;" />
```
