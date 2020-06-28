const SIZE_ATTR_VALUE_BY_PIXEL = /\d+/;
function getAspectRatioFromAttrs(img: HTMLImageElement): number | null {
  const width = img.getAttribute('width');
  const height = img.getAttribute('height');
  if (width === null || height === null) return null;
  // width="auto" や width="100%" を弾く
  if (!SIZE_ATTR_VALUE_BY_PIXEL.test(width) || !SIZE_ATTR_VALUE_BY_PIXEL.test(height)) return null;
  return +width / +height;
}

const SIZE_PROP_VALUE_BY_PIXEL = /\d+px/;
function getAspectRatioFromProps(img: HTMLImageElement): number | null {
  const width = img.style.width; // プロパティが指定されていない場合は空文字が格納される
  const height = img.style.height; // プロパティが指定されていない場合は空文字が格納される
  // width: auto; や width: 100%; を弾く
  if (!SIZE_PROP_VALUE_BY_PIXEL.test(width) || !SIZE_PROP_VALUE_BY_PIXEL.test(height)) return null;
  return +width.slice(0, -2) / +height.slice(0, -2);
}

function getAspectRatioFromComputedStyles(img: HTMLImageElement): number | null {
  const width = (img as any).computedStyleMap().get('width');
  const height = (img as any).computedStyleMap().get('height');

  if (width.unit !== 'px' || height.unit !== 'px') return null;
  return width.value / height.value;
}

function hasProp(img: HTMLImageElement, propName: keyof CSSStyleDeclaration): boolean {
  return img.style[propName] !== '';
}

function hasAttr(img: HTMLImageElement, attrName: string): boolean {
  return img.getAttribute(attrName) !== null;
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
    "Element.getAttribute('XXX')": {
      width: img.getAttribute('width'),
      height: img.getAttribute('height'),
      aspectRatio: getAspectRatioFromAttrs(img),
    },
    'HTMLElement.style.XXX': {
      width: img.style.width,
      height: img.style.height,
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
