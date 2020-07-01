export function hasProp(img: HTMLImageElement, propName: 'width' | 'height'): boolean {
  return !!getProp(img, propName);
}

export function hasAttr(img: HTMLImageElement, attrName: 'width' | 'height'): boolean {
  return img.getAttribute(attrName) !== null;
}

const SIZE_ATTR_VALUE_BY_PIXEL = /\d+/;
export function getAspectRatioFromAttrs(img: HTMLImageElement): number | null {
  const width = img.getAttribute('width');
  const height = img.getAttribute('height');
  if (width === null || height === null) return null;
  // width="auto" や width="100%" を弾く
  if (!SIZE_ATTR_VALUE_BY_PIXEL.test(width) || !SIZE_ATTR_VALUE_BY_PIXEL.test(height)) return null;
  return +width / +height;
}

export function getAspectRatioFromProps(img: HTMLImageElement): number | null {
  const width = getProp(img, 'width');
  const height = getProp(img, 'height');
  if (width === null || height === null) return null;
  // width: auto; などを弾く
  if (!(width instanceof CSSUnitValue && height instanceof CSSUnitValue)) return null;
  // width: 100%; などを弾く
  if (width.unit !== 'px' || height.unit !== 'px') return null;
  return width.value / height.value;
}

function getAspectRatioFromComputedStyles(img: HTMLImageElement): number | null {
  const width = (img as any).computedStyleMap().get('width');
  const height = (img as any).computedStyleMap().get('height');

  if (width.unit !== 'px' || height.unit !== 'px') return null;
  return width.value / height.value;
}

const DUMMY_SIZE_ATTRIBUTE_VALUE = 10000;

// style 属性やスタイルシートで設定されたプロパティの値を取得する
export function getProp(img: HTMLImageElement, propName: 'width' | 'height'): CSSStyleValue | null {
  // `computedStyleMap()` では画像オリジナルのサイズや width/height 属性の値も取れてしまうので、
  // width/height 属性にダミーの値を入れて、本来 `computedStyleMap()` で得られるものが style 属性や
  // スタイルシート由来なのか、画像オリジナルのサイズや width/height 属性の値なのかを区別できるようにする。
  const originalPropValue = img.getAttribute(propName);
  img.setAttribute(propName, DUMMY_SIZE_ATTRIBUTE_VALUE.toString());
  const styleValue = img.computedStyleMap().get(propName);
  // 元に戻す
  if (originalPropValue === null) {
    img.removeAttribute(propName);
  } else {
    img.setAttribute(propName, originalPropValue);
  }

  if (styleValue === undefined) return null;

  // computed style value が width/height 属性の値なら、プロパティは何も指定されていない
  if (
    styleValue instanceof CSSUnitValue &&
    styleValue.unit === 'px' &&
    styleValue.value === DUMMY_SIZE_ATTRIBUTE_VALUE
  ) {
    return null;
  }

  // computed style value が width/height 属性の値でなければ、それがプロパティにより設定された値である
  return styleValue;
}

export function getSizeInfo(img: HTMLImageElement) {
  const widthProp = getProp(img, 'width');
  const heightProp = getProp(img, 'height');
  const computedWidthStyle = img.computedStyleMap().get('width');
  const computedHeightStyle = img.computedStyleMap().get('height');
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
      width: widthProp ? widthProp.toString() : null,
      height: heightProp ? heightProp.toString() : null,
      aspectRatio: getAspectRatioFromProps(img),
    },
    "Element.computedStyleMap().get('XXX')": {
      width: computedWidthStyle ? computedWidthStyle.toString() : null,
      height: computedHeightStyle ? computedHeightStyle.toString() : null,
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
