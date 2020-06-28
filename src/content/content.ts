import {
  isIncorrectAspectRatio,
  isMissingSizeProp as isMissingAutoSizeProp,
  isMissingExplicitAutoAttrOrProp as isMissingExplicitAutoSizeAttrOrProp,
  isMissingAspectRatioHint,
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

const missingAspectRatioHintImgs = imgs.filter(isMissingAspectRatioHint);
console.groupCollapsed(`missing aspect ratio hint (${missingAspectRatioHintImgs.length})`);
missingAspectRatioHintImgs.forEach((img) => console.log(img));
console.groupEnd();

const missingExplicitAutoSizeAttrOrPropImgs = imgs.filter(isMissingExplicitAutoSizeAttrOrProp);
console.groupCollapsed(`missing explicit auto-size attr or prop (${missingExplicitAutoSizeAttrOrPropImgs.length})`);
missingExplicitAutoSizeAttrOrPropImgs.forEach((img) => console.log(img));
console.groupEnd();

const incorrectAspectRatioImgs = imgs.filter(isIncorrectAspectRatio);
console.groupCollapsed(`incorrect aspect ratio (${incorrectAspectRatioImgs.length})`);
incorrectAspectRatioImgs.forEach((img) => console.log(img));
console.groupEnd();

const missingAutoSizePropImgs = imgs.filter(isMissingAutoSizeProp);
console.groupCollapsed(`missing auto-size prop (${missingAutoSizePropImgs.length})`);
missingAutoSizePropImgs.forEach((img) => console.log(img));
console.groupEnd();
