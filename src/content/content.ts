import { getSizeInfo } from './lib';
import {
  isMissingAspectRatioHint,
  isIncorrectAspectRatio,
  isMissingAllSizeAttrsOrProps,
  isMissingOneSideAttr,
  isMissingOneSideProp,
} from './rule';

const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
console.groupCollapsed(`all imgs (${imgs.length})`);
imgs.forEach((img) => console.log(img));
console.groupEnd();

function reportImgs(reportTitle: string, imgs: HTMLImageElement[]): void {
  console.groupCollapsed(`${reportTitle} (${imgs.length})`);
  imgs.forEach((img) => {
    console.groupCollapsed(img);
    // console.log(img);
    console.table(getSizeInfo(img));
    console.groupEnd();
  });
  console.groupEnd();
}

reportImgs('missing aspect ratio hint', imgs.filter(isMissingAspectRatioHint));
reportImgs('incorrect aspect ratio', imgs.filter(isIncorrectAspectRatio));
reportImgs('missing all size attrs or props', imgs.filter(isMissingAllSizeAttrsOrProps));
reportImgs('missing one side attr', imgs.filter(isMissingOneSideAttr));
reportImgs('missing one side prop', imgs.filter(isMissingOneSideProp));
