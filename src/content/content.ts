import { hasInvalidSizeAttrs } from './lib';

const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
console.log(imgs);

const imgsWithInvalidSizeAttrs = imgs.filter(hasInvalidSizeAttrs);

console.log(imgsWithInvalidSizeAttrs);
