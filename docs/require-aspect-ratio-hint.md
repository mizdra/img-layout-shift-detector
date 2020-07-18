# `require-aspect-ratio-hint`

Specifying `width: 100%; height: auto;` for img tags, you can then scale the image according to its aspect ratio. However, the browser does not know the aspect ratio of the image until it has been downloaded. So before downloading, the element is rendered with a height of `0`, and after downloading, it is re-rendered with the correct size and causes Layout Shift.

To solve this problem, the idea of computing the layout using the width and height attributes has been proposed and implemented in browsers. Based on this idea, this rule forces to specify an aspect ratio hint (`width="<intrinsic-width>" height="<intrinsic-height>"`) to prevent Layout Shift from occurring.

- [Mapping the width and height attributes of media container elements to their aspect-ratio - Web media technologies | MDN](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping)

## Rule Details

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100%" height="auto" />
<img src="https://placehold.jp/200x100.png" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" style="width: 50vw; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="100%" />
<img src="https://placehold.jp/200x100.png" style="width: 100%;" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 50vw; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
```
