# img-layout-shift-detector

The browser extension that detects `<img>` tags that cause Layout Shift

## Usage

1. Access page you want to measure layout shift by `<img>`
1. Open console tab of devtools
1. Click the icon of this extension
1. The report is outputed to console tab

## Screenshots

![Screenshot](./static/screenshot.png?raw=true)

## Supported Rules

- [missing-aspect-ratio-hint](https://github.com/mizdra/img-layout-shift-detector/blob/master/rule-docs/missing-aspect-ratio-hint.md)
- [incorrect-aspect-ratio](https://github.com/mizdra/img-layout-shift-detector/blob/master/rule-docs/incorrect-aspect-ratio.md)
- [missing-all-size-attrs-or-props](https://github.com/mizdra/img-layout-shift-detector/blob/master/rule-docs/missing-all-size-attrs-or-props.md)
- [missing-one-side-attr](https://github.com/mizdra/img-layout-shift-detector/blob/master/rule-docs/missing-one-side-attr.md)
- [missing-one-side-prop](https://github.com/mizdra/img-layout-shift-detector/blob/master/rule-docs/missing-one-side-prop.md)

## Playground

- https://mizdra.github.io/img-layout-shift-detector/

## How to develop

```console
$ yarn install
$ yarn run start:chromium:dev
```
