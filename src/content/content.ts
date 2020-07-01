import { reportImgs } from './lib';
import {
  isMissingAspectRatioHint,
  isIncorrectAspectRatio,
  isMissingAllSizeAttrsOrProps,
  isMissingOneSideAttr,
  isMissingOneSideProp,
} from './rule';

const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));

reportImgs('all imgs', imgs);
reportImgs('missing aspect ratio hint', imgs.filter(isMissingAspectRatioHint));
reportImgs('incorrect aspect ratio', imgs.filter(isIncorrectAspectRatio));
reportImgs('missing all size attrs or props', imgs.filter(isMissingAllSizeAttrsOrProps));
reportImgs('missing one side attr', imgs.filter(isMissingOneSideAttr));
reportImgs('missing one side prop', imgs.filter(isMissingOneSideProp));
