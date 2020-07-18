# `no-mismatch-of-aspect-ratio-hint`

Specifying `style="width: 100%; height: auto;"` for img tags, you can then scale the image according to its aspect ratio. However, the browser does not know the aspect ratio of the image until it has been downloaded. So before downloading, the element is rendered with a height of `0`, and after downloading, it is re-rendered with the correct size and causes Layout Shift.

To solve this problem, it is recommended to add `width`/`height` attributes (aspect ratio hint). The attributes are used to calculate the aspect ratio before the image is downloaded. This reduces the occurrence of Layout Shift.

```html
<div style="width: 400px;">
  <img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
</div>
```

- [Mapping the width and height attributes of media container elements to their aspect-ratio - Web media technologies | MDN](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping)

However, if you specify the wrong aspect ratio for the `width`/`height` attribute, Layout Shift may occur. In the following example, the element is rendered as `400x400` before downloading, and will be re-rendered as `400x200` after downloading.

```html
<div style="width: 400px;">
  <img src="https://placehold.jp/200x100.png" width="100" height="100" style="width: 100%; height: auto;" />
</div>
```

So this rule disallow the `width`/`height` attributes that do not match the image's original aspect ratio.

## Rule Details

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" height="100" style="width: 100%; height: auto;" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
```
