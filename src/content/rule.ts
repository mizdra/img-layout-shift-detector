import {
  getAspectRatioFromAttrs,
  hasProp,
  hasAttr,
  isScalableByAspectRatio,
  getAspectRatioFromComputedStyles,
} from './lib';

/** require-intrinsic-size に違反しているなら真を返す */
export function verifyRequireIntrinsicSize(img: HTMLImageElement): boolean {
  const computedWidthStyle = img.computedStyleMap().get('width');
  const computedHeightStyle = img.computedStyleMap().get('height');
  return computedWidthStyle?.toString() === 'auto' && computedHeightStyle?.toString() === 'auto';
}

/** require-aspect-ratio-hint に違反しているなら真を返す */
export function verifyRequireAspectRatioHint(img: HTMLImageElement): boolean {
  // アスペクト比に応じて寸法が変わる img で、かつ属性からアスペクト比が計算できなければルールに違反している
  return isScalableByAspectRatio(img) && getAspectRatioFromAttrs(img) === null;
}

/** no-mismatch-of-aspect-ratio-hint に違反しているなら真を返す */
export function verifyNoMismatchOfAspectRatioHint(img: HTMLImageElement): boolean {
  const isScalable = isScalableByAspectRatio(img);
  const aspectRatioFromAttrs = getAspectRatioFromAttrs(img);
  const aspectRatioFromIntrinsicSize = img.naturalWidth / img.naturalHeight;

  return isScalable && aspectRatioFromAttrs !== null && aspectRatioFromAttrs !== aspectRatioFromIntrinsicSize;
}

/** no-mismatch-of-apparent-size に違反しているなら真を返す */
export function verifyNoMismatchOfApparentSize(img: HTMLImageElement): boolean {
  const aspectRatioFromComputedStyles = getAspectRatioFromComputedStyles(img);
  const aspectRatioFromIntrinsicSize = img.naturalWidth / img.naturalHeight;

  if (aspectRatioFromComputedStyles === null) return false;
  return aspectRatioFromComputedStyles !== aspectRatioFromIntrinsicSize;
}

/** no-defective-attribute に違反しているなら真を返す */
export function verifyNoDefectiveAttribute(img: HTMLImageElement): boolean {
  if (hasAttr(img, 'width') && hasAttr(img, 'height')) return false;
  if (!hasAttr(img, 'width') && !hasAttr(img, 'height')) return false;
  return true;
}

/** no-defective-property に違反しているなら真を返す */
export function verifyNoDefectiveProperty(img: HTMLImageElement): boolean {
  if (hasProp(img, 'width') && hasProp(img, 'height')) return false;
  if (!hasProp(img, 'width') && !hasProp(img, 'height')) return false;
  return true;
}
