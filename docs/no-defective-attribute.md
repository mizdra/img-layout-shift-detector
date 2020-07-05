## `no-defective-attribute`

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
