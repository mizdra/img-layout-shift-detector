## `missing-one-side-prop`

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" height="50" style="width: 100%;" />
<img src="https://placehold.jp/200x100.png" width="100" style="height: 50px;" />
<img src="https://placehold.jp/200x100.png" style="width: 100px;" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" height="50" style="width: 100%; height: 50px;" />
<img src="https://placehold.jp/200x100.png" width="100" style="width: 100%; height: 50px;" />
<img src="https://placehold.jp/200x100.png" style="width: 100px; height: 50px;" />
```
