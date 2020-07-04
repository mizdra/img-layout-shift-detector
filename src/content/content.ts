import { reportImgs } from './lib';
import {
  verifyRequireAspectRatioHint,
  verifyNoMismatchOfApparentSize,
  verifyRequireIntrinsicSize,
  verifyNoDefectiveAttribute,
  verifyNoDefectiveProperty,
  verifyNoMismatchOfAspectRatioHint,
} from './rule';

const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));

reportImgs('all imgs', imgs);
reportImgs('require-intrinsic-size', imgs.filter(verifyRequireIntrinsicSize));
reportImgs('require-aspect-ratio-hint', imgs.filter(verifyRequireAspectRatioHint));
reportImgs('no-mismatch-of-aspect-ratio-hint', imgs.filter(verifyNoMismatchOfAspectRatioHint));
reportImgs('no-mismatch-of-apparent-size', imgs.filter(verifyNoMismatchOfApparentSize));
reportImgs('no-defective-attribute', imgs.filter(verifyNoDefectiveAttribute));
reportImgs('no-defective-property', imgs.filter(verifyNoDefectiveProperty));
