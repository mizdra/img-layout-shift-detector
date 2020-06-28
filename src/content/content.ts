import {
  isIncorrectAspectRatio,
  isMissingAspectRatioHint,
  getSizeInfo,
  isMissingOneSideAttr,
  isMissingOneSideProp,
  isMissingAllSizeAttrsOrProps,
} from './lib';

const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
console.groupCollapsed(`all imgs (${imgs.length})`);
imgs.forEach((img) => console.log(img));
console.groupEnd();

// missing aspect ratio hint
//   <img src="200x100.png" width="100%" height="auto" /> => width="200" height="100" style="width: 100%; height: auto;"
//   <img src="200x100.png" style="width: 100%; height: auto;" /> => width="200" height="100" style="width: 100%; height: auto;"
//   <img src="200x100.png" width="auto" height="auto" />

// incorrect aspect ratio
//   <img src="200x100.png" width="100" height="100" />
//   <img src="200x100.png" style="width: 100px; height: 100px;" />
//   <img src="200x100.png" width="100" height="100" style="width: 100%; height: auto;" />

// missing all size attrs or props
//   <img src="200x100.png" />

// missing one side attr
//   <img src="200x100.png" width="100" style="width: 100%; height: auto;" />
//   <img src="200x100.png" width="100" style="height: 50px;" />
//   <img src="200x100.png" width="100" />

// missing one side prop
//   <img src="200x100.png" width="100" height="50" style="width: 100%;" />
//   <img src="200x100.png" width="100" style="height: 50px;" />
//   <img src="200x100.png" style="width: 100px;" />

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
