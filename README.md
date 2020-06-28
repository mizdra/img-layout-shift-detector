# img-layout-shift-detector

The browser extension that detects `<img>` tags that cause Layout Shift

## Usage

1. Access page you want to measure layout shift by `<img>`
1. Open console tab of devtools
1. Click the icon of this extension
1. The report is outputed to console tab

## Screenshots

![Screenshot](./static/screenshot.png?raw=true)

## Available rules

### `missing-aspect-ratio-hint`

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100%" height="auto" />
<img src="https://placehold.jp/200x100.png" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="auto" height="auto" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" style=""width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
```

### `incorrect-aspect-ratio`

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="100" height="100" />
<img src="https://placehold.jp/200x100.png" style="width: 100px; height: 100px;" />
<img src="https://placehold.jp/200x100.png" width="100" height="100" style="width: 100%; height: auto;" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
<img src="https://placehold.jp/200x100.png" style="width: 200px; height: 100px;" />
<img src="https://placehold.jp/200x100.png" width="200" height="100" style="width: 100%; height: auto;" />
```

### `missing-all-size-attrs-or-props`

:no_good: Examples of **incorrect** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" />
```

:ok_woman: Examples of **correct** code for this rule:

```html
<img src="https://placehold.jp/200x100.png" width="200" height="100" />
```

### `missing-one-side-attr`

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

### `missing-one-side-prop`

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

## Playground

- https://mizdra.github.io/img-layout-shift-detector/

## How to develop

```console
$ yarn install
$ yarn run start:chromium:dev
```
