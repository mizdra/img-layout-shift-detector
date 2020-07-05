# img-layout-shift-detector

The browser extension that detects `<img>` tags that cause Layout Shift

<div align="center">

![Logo](./static/icon.svg?raw=true)

</div>

## Usage

1. Access page you want to measure layout shift by `<img>`
1. Open console tab of devtools
1. Click the icon of this extension
1. The report is outputed to console tab

## Screenshots

<div align="center">

![Screenshot](./static/screenshot.png?raw=true)

</div>

## Supported Rules

- [require-intrinsic-size](https://github.com/mizdra/img-layout-shift-detector/blob/master/docs/require-intrinsic-size.md)
- [require-aspect-ratio-hint](https://github.com/mizdra/img-layout-shift-detector/blob/master/docs/require-aspect-ratio-hint.md)
- [no-mismatch-of-aspect-ratio-hint](https://github.com/mizdra/img-layout-shift-detector/blob/master/docs/no-mismatch-of-aspect-ratio-hint.md)
- [no-mismatch-of-apparent-size](https://github.com/mizdra/img-layout-shift-detector/blob/master/docs/no-mismatch-of-apparent-size.md)
- [no-defective-attribute](https://github.com/mizdra/img-layout-shift-detector/blob/master/docs/no-defective-attribute.md)
- [no-defective-property](https://github.com/mizdra/img-layout-shift-detector/blob/master/docs/no-defective-property.md)

## Playground

1. Open https://img-layout-shift-detector.netlify.app
1. Open console tab of devtools
1. The report is outputed to console tab (**If you don't see the table, please reload page**)

## How to develop

```console
$ yarn install
$ yarn run start:chromium:dev
```
