import { reportImgsWithLogLevel, reportImgs } from './log';
import {
  verifyRequireAspectRatioHint,
  verifyNoMismatchOfApparentSize,
  verifyRequireIntrinsicSize,
  verifyNoDefectiveAttribute,
  verifyNoDefectiveProperty,
  verifyNoMismatchOfAspectRatioHint,
} from './rule';
import { waitImgsLoad } from './wait';

(async () => {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));

  console.log('[img-layout-shift-detector] Analyzing image...');
  await waitImgsLoad(imgs);

  const DEFAULT_LOG_LEVEL = {
    // Layout Shift が発生する img や誤った使い方をしている img を適合率 100% で検出できるルールはデフォルトで error
    'require-intrinsic-size': 'error',
    'require-aspect-ratio-hint': 'error',
    'no-mismatch-of-aspect-ratio-hint': 'error',
    // Layout Shift が発生していたり誤った使い方をしている訳ではないが、
    // そうした可能性のある img を検出できるルールはデフォルトで warning
    'no-mismatch-of-apparent-size': 'warning',
    'no-defective-attribute': 'warning',
    'no-defective-property': 'warning',
  } as const;

  reportImgs('all imgs', imgs);
  reportImgsWithLogLevel(
    'require-intrinsic-size',
    imgs.filter(verifyRequireIntrinsicSize),
    DEFAULT_LOG_LEVEL['require-intrinsic-size'],
  );
  reportImgsWithLogLevel(
    'require-aspect-ratio-hint',
    imgs.filter(verifyRequireAspectRatioHint),
    DEFAULT_LOG_LEVEL['require-aspect-ratio-hint'],
  );
  reportImgsWithLogLevel(
    'no-mismatch-of-aspect-ratio-hint',
    imgs.filter(verifyNoMismatchOfAspectRatioHint),
    DEFAULT_LOG_LEVEL['no-mismatch-of-aspect-ratio-hint'],
  );
  reportImgsWithLogLevel(
    'no-mismatch-of-apparent-size',
    imgs.filter(verifyNoMismatchOfApparentSize),
    DEFAULT_LOG_LEVEL['no-mismatch-of-apparent-size'],
  );
  reportImgsWithLogLevel(
    'no-defective-attribute',
    imgs.filter(verifyNoDefectiveAttribute),
    DEFAULT_LOG_LEVEL['no-defective-attribute'],
  );
  reportImgsWithLogLevel(
    'no-defective-property',
    imgs.filter(verifyNoDefectiveProperty),
    DEFAULT_LOG_LEVEL['no-defective-property'],
  );
})();
