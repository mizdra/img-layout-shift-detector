import {
  isIncorrectAspectRatio,
  isMissingSizeProp as isMissingAutoSizeProp,
  isMissingExplicitAutoAttrOrProp as isMissingExplicitAutoSizeAttrOrProp,
  isMissingAspectRatioHint,
  getSizeInfo,
} from './lib';

const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
console.groupCollapsed(`all imgs (${imgs.length})`);
imgs.forEach((img) => console.log(img));
console.groupEnd();

// missing aspect ratio hint
//   <img src="200x100.png" width="100%" height="auto" /> => width="200" height="100" style="width: 100%; height: auto;"
//   <img src="200x100.png" style="width: 100%; height: auto;" /> => width="200" height="100" style="width: 100%; height: auto;"
//   <img src="200x100.png" width="auto" height="auto" />

// missing explicit auto attr or prop
//   <img src="200x100.png" width="100" /> => width="200" height="auto"
//   <img src="200x100.png" style="width: 100px;" /> => style="width: 100px; height: auto;"
//   <img src="200x100.png" /> => style="width: auto; height: auto;"

// incorrect aspect ratio
//   <img src="200x100.png" width="100" height="100" />
//   <img src="200x100.png" style="width: 100px; height: 100px;" />
//   <img src="200x100.png" width="100" height="100" style="width: 100%; height: auto;" />

// missing size prop
//   <img src="200x100.png" width="100" height="50" style="width: 100%;" /> => width="100" height="50" style="width: 100%; height: auto;"
//   <img src="200x100.png" width="100" height="50" style="height: auto;" />

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
reportImgs('missing explicit auto-size attr or prop', imgs.filter(isMissingExplicitAutoSizeAttrOrProp));
reportImgs('incorrect aspect ratio', imgs.filter(isIncorrectAspectRatio));
reportImgs('missing auto-size prop', imgs.filter(isMissingAutoSizeProp));
