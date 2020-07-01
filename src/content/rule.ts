import { getAspectRatioFromAttrs, hasProp, hasAttr, getAspectRatioFromProps } from './lib';

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
