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

export function isMissingExplicitAutoAttrOrProp(img: HTMLImageElement): boolean {
  const computedWidthStyle = (img as any).computedStyleMap().get('width');
  const computedHeightStyle = (img as any).computedStyleMap().get('height');

  // 結果として auto になっているにも関わらず、明示的に属性やプロパティで指定されていなければ真
  if (computedWidthStyle.value === 'auto') {
    if (img.getAttribute('width') !== 'auto' && img.style.width !== 'auto') {
      return true;
    }
  }
  if (computedHeightStyle.value === 'auto') {
    if (img.getAttribute('height') !== 'auto' && img.style.height !== 'auto') {
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

export function isMissingSizeProp(img: HTMLImageElement): boolean {
  const aspectRatioFromAttrs = getAspectRatioFromAttrs(img);
  // アスペクト比のヒントのための属性が無ければならない
  if (aspectRatioFromAttrs === null) return false;

  if (hasProp(img, 'width') && hasProp(img, 'height')) return false;
  if (!hasProp(img, 'width') && !hasProp(img, 'height')) return false;
  return true;
}
