const SIZE_ATTR_VALUE_BY_PIXEL = /\d+/;
function getAspectRatioFromAttrs(img: HTMLImageElement): number | null {
  const width = img.getAttribute('width');
  const height = img.getAttribute('height');
  if (width === null || height === null) return null;
  // width="auto" や width="100%" を弾く
  if (!SIZE_ATTR_VALUE_BY_PIXEL.test(width) || !SIZE_ATTR_VALUE_BY_PIXEL.test(height)) return null;
  return +width / +height;
}

function getAspectRatioFromProps(img: HTMLImageElement): number | null {
  const width = getAuthorStyleSheetProp(img, 'width');
  const height = getAuthorStyleSheetProp(img, 'height');
  if (width === null || height === null) return null;
  // width: auto; や width: 100%; を弾く
  if (width.unit !== 'px' || height.unit !== 'px') return null;
  return width.value / height.value;
}

function getAspectRatioFromComputedStyles(img: HTMLImageElement): number | null {
  const width = (img as any).computedStyleMap().get('width');
  const height = (img as any).computedStyleMap().get('height');

  if (width.unit !== 'px' || height.unit !== 'px') return null;
  return width.value / height.value;
}

function hasProp(img: HTMLImageElement, propName: keyof CSSStyleDeclaration): boolean {
  return !!getAuthorStyleSheetProp(img, propName);
}

function hasAttr(img: HTMLImageElement, attrName: string): boolean {
  return img.getAttribute(attrName) !== null;
}

function getMatchedStyleRules(img: HTMLImageElement): CSSStyleRule[] {
  function getStyleRules(rule: CSSRule): CSSStyleRule[] {
    if (rule instanceof CSSFontFaceRule) {
      // `@font-face`
      // noop
    } else if (rule instanceof CSSGroupingRule) {
      if (rule instanceof CSSConditionRule) {
        if (rule instanceof CSSMediaRule) {
          // `@media`
          if (window.matchMedia(rule.conditionText)) {
            return Array.from(rule.cssRules).map(getStyleRules).flat();
          }
        }
      } else if (rule instanceof CSSPageRule) {
        // `@page`
        // noop
      } else {
        // unknown
        // noop
      }
    } else if (rule instanceof CSSImportRule) {
      // `@import`
      return Array.from(rule.styleSheet.cssRules).map(getStyleRules).flat();
    } else if (rule instanceof CSSKeyframeRule) {
      // `@keyframes <name> { <keyframe>* }`
      // noop
    } else if (rule instanceof CSSKeyframesRule) {
      // `@keyframes`
      // noop
    } else if (rule instanceof CSSNamespaceRule) {
      // `@namespace`
      // noop
    } else if (rule instanceof CSSStyleRule) {
      // <selector> { <style-rule> }
      return [rule];
    } else {
      // unknown
      // noop
    }
    return [];
  }
  const sheets = Array.from(img.ownerDocument.styleSheets);
  const rules = sheets.map((sheet) => Array.from(sheet.cssRules)).flat();
  const styleRules = rules.map(getStyleRules).flat();
  const matchedRules = styleRules.filter((rule) => img.matches(rule.selectorText));
  return matchedRules;
}

type CSSUnitValue = any;

// author's style sheet (`<link rel="stylesheet">` で読み込まれるスタイルシートや、 `<style>` や style 属性に直書きされたスタイルのこと) で
// 指定されたプロパティを取得する
function getAuthorStyleSheetProp(img: HTMLImageElement, propName: keyof CSSStyleDeclaration): CSSUnitValue | null {
  // `computedStyleMap().get(propName)` だとブラウザ標準のスタイルシート (user agent declarations) や
  // Presentational Hints で設定したプロパティが取得されてしまうので、上手いこと条件分岐して
  // author's style sheet で指定されたプロパティのみを取得するようにする。
  // ref: https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#To_summarize
  // ref: https://www.w3.org/TR/css-cascade-4/#cascade-origin
  // ref: https://www.w3.org/TR/css-cascade-4/#preshint

  // NOTE: `user declarations` はかつて UserCSS と呼ばれていたものであり、現代ではFirefoxくらいしかサポートしていないので、無視する
  // ref: https://stackoverflow.com/a/59209554

  // NOTE: 厳密には `Important user agent declarations` も考慮しないといけないけど、現実にそんなものは存在しないはずなので無視する

  // style 属性があれば `computedStyleMap().get(propName)` で author's style sheet にて設定されたプロパティが取れる
  if (img.style[propName] !== '') {
    return (img as any).computedStyleMap().get(propName);
  }

  // `<link rel="stylesheet">` や `<style>` で設定されたプロパティを取得
  const matchedStyleRules = getMatchedStyleRules(img);
  const styleSheetProps: CSSUnitValue = matchedStyleRules.map((rule) => (rule as any).styleMap.get(propName));
  // `<link rel="stylesheet">` や `<style>` でプロパティが設定されていれば、`computedStyleMap().get(propName)` で取得できる
  if (styleSheetProps.length > 0) {
    return (img as any).computedStyleMap().get(propName);
  }

  return null;
}

export function isMissingAspectRatioHint(img: HTMLImageElement): boolean {
  const computedWidthStyle = (img as any).computedStyleMap().get('width');
  const computedHeightStyle = (img as any).computedStyleMap().get('height');
  const aspectRatioFromAttrs = getAspectRatioFromAttrs(img);

  const hasProps = hasProp(img, 'width') && hasProp(img, 'height');
  const hasAttrs = hasAttr(img, 'width') && hasAttr(img, 'height');
  // プロパティ、属性どちらかが設定されていなければならない
  if (!hasProps && !hasAttrs) return false;

  // アスペクト比に応じて要素の寸法が変わるにも関わらず、属性でアスペクト比のヒントが明示されていなければ真
  if (computedWidthStyle.value === 'auto' || computedHeightStyle.value === 'auto') {
    if (aspectRatioFromAttrs === null) {
      return true;
    }
  }
  return false;
}

export function isIncorrectAspectRatio(img: HTMLImageElement): boolean {
  const aspectRatioFromAttrs = getAspectRatioFromAttrs(img);
  const aspectRatioFromProps = getAspectRatioFromProps(img);
  const aspectRatioFromOriginalSize = img.naturalWidth / img.naturalHeight;

  if (aspectRatioFromAttrs !== null && aspectRatioFromAttrs !== aspectRatioFromOriginalSize) {
    return true;
  }
  if (aspectRatioFromProps !== null && aspectRatioFromProps !== aspectRatioFromOriginalSize) {
    return true;
  }

  return false;
}

export function isMissingAllSizeAttrsOrProps(img: HTMLImageElement): boolean {
  return !hasAttr(img, 'width') && !hasAttr(img, 'height') && !hasProp(img, 'width') && !hasProp(img, 'height');
}

export function isMissingOneSideAttr(img: HTMLImageElement): boolean {
  if (hasAttr(img, 'width') && hasAttr(img, 'height')) return false;
  if (!hasAttr(img, 'width') && !hasAttr(img, 'height')) return false;
  return true;
}

export function isMissingOneSideProp(img: HTMLImageElement): boolean {
  if (hasProp(img, 'width') && hasProp(img, 'height')) return false;
  if (!hasProp(img, 'width') && !hasProp(img, 'height')) return false;
  return true;
}

export function getSizeInfo(img: HTMLImageElement) {
  const computedWidthStyle = (img as any).computedStyleMap().get('width');
  const computedHeightStyle = (img as any).computedStyleMap().get('height');
  return {
    'HTMLImageElement.naturalXXX': {
      width: img.naturalWidth,
      height: img.naturalHeight,
      aspectRatio: img.naturalWidth / img.naturalHeight,
    },
    attrs: {
      width: img.getAttribute('width'),
      height: img.getAttribute('height'),
      aspectRatio: getAspectRatioFromAttrs(img),
    },
    props: {
      width: getAuthorStyleSheetProp(img, 'width'),
      height: getAuthorStyleSheetProp(img, 'height'),
      aspectRatio: getAspectRatioFromProps(img),
    },
    "Element.computedStyleMap().get('XXX')": {
      width: `${computedWidthStyle.value}${computedWidthStyle.unit || ''}`,
      height: `${computedHeightStyle.value}${computedHeightStyle.unit || ''}`,
      aspectRatio: getAspectRatioFromComputedStyles(img),
    },
    'HTMLElement.XXX': {
      width: img.width,
      height: img.height,
      aspectRatio: img.width / img.height,
    },
    'HTMLElement.clientXXX': {
      width: img.clientWidth,
      height: img.clientHeight,
      aspectRatio: img.clientWidth / img.clientHeight,
    },
    'HTMLElement.offsetXXX': {
      width: img.offsetWidth,
      height: img.offsetHeight,
      aspectRatio: img.offsetWidth / img.offsetHeight,
    },
  };
}
