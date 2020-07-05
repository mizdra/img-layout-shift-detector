import { getSizeInfo } from './lib';

type LogLevel = 'error' | 'warning' | 'off';
const STYLE_PRESETS = {
  error: {
    background: 'red',
    color: 'white',
    border: 'none',
  },
  warning: {
    background: 'darkorange',
    color: 'white',
    border: 'none',
  },
  pass: {
    background: 'inherit',
    color: 'inherit',
    border: '1px solid #ddd',
  },
};

/** ログレベルを考慮しつつ、渡された img 要素の寸法に関する情報をコンソールに出力する。 */
export function reportImgsWithLogLevel(reportTitle: string, imgs: HTMLImageElement[], logLevel: LogLevel): void {
  if (logLevel === 'off') return;

  const labelName = imgs.length > 0 ? logLevel : 'pass'; // 0 件なら pass と表示する
  const stylePreset = STYLE_PRESETS[labelName];
  const css = `background: ${stylePreset.background}; color: ${stylePreset.color}; border: ${stylePreset.border}; padding: 0 0.5em;`;
  console.groupCollapsed(`%c${labelName}%c ${reportTitle} (${imgs.length})`, css, '');

  imgs.forEach((img) => {
    console.groupCollapsed(img);
    console.table(getSizeInfo(img));
    console.groupEnd();
  });
  console.groupEnd();
}

/** 渡された img 要素の寸法に関する情報をコンソールに出力する */
export function reportImgs(reportTitle: string, imgs: HTMLImageElement[]): void {
  console.groupCollapsed(`${reportTitle} (${imgs.length})`);
  imgs.forEach((img) => {
    console.groupCollapsed(img);
    console.table(getSizeInfo(img));
    console.groupEnd();
  });
  console.groupEnd();
}
