# `require-intrinsic-size`

If you omit attributes and properties, or specify `width="auto"`, the intrinsic size of the image is set to the img tag dimensions. However, the browser does not know the intrinsic size of the image until the image is downloaded. Thus, a layout shift occurs when downloading the image. Therefore, it is recommended to specify the intrinsic size as attributes or properties.

## Rule Details

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" />
<img src="https://placehold.jp/200x100.png" width="auto" />
<img src="https://placehold.jp/200x100.png" style="width: auto;" />
<img src="https://placehold.jp/200x100.png" width="auto" height="auto" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
<img src="https://placehold.jp/200x100.png" style="width: 200px; height: 100px" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
```
