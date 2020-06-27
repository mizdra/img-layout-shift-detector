function isResponsiveImg(img: HTMLImageElement) {
  const widthProp = (img as any).computedStyleMap().get('width');
  const heightProp = (img as any).computedStyleMap().get('height');
  return widthProp.value === 'auto' || heightProp.value === 'auto';
}

// レスポンシブな画像であり、かつアスペクト比が属性から事前計算可能かどうか
function isPrecomputableResponsiveImg(img: HTMLImageElement) {
  if (!isResponsiveImg(img)) return false;

  const widthAttr = img.getAttribute('width');
  const heightAttr = img.getAttribute('height');
  // 属性が 1 つでも欠けてたらアスペクト比の算出は不可能
  if (widthAttr === null || heightAttr === null) return false;
  // 空文字も NG
  if (widthAttr === '' || heightAttr === '') return false;
  // `px` など単位の入っているものも NG
  if (Number.isNaN(+widthAttr) || Number.isNaN(+heightAttr)) return false;
  return true;
}

// width/height 属性が間違ったアスペクト比を表していて、それがレイアウトの計算に利用されていれば真を返す。
export function hasInvalidSizeAttrs(img: HTMLImageElement): boolean {
  if (!isPrecomputableResponsiveImg(img)) return false;
  const aspectRatioFromAttrs = +img.getAttribute('width')! / +img.getAttribute('height')!;
  const aspectRatioFromOriginalSize = img.naturalWidth / img.naturalHeight;
  return aspectRatioFromAttrs !== aspectRatioFromOriginalSize;
}
