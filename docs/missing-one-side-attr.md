## `missing-one-side-attr`

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="100" style="height: 50px;" />
<img src="https://placehold.jp/200x100.png" width="100" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" height="50" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="100" height="50" style="height: 50px;" />
<img src="https://placehold.jp/200x100.png" width="100" height="50" />
```
