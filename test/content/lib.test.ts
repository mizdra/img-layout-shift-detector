import { createImg } from './test-util';
import {
  hasProp,
  hasAttr,
  isScalableByAspectRatio,
  getAspectRatioFromAttrs,
  getAspectRatioFromProps,
  getAspectRatioFromComputedStyles,
  getProp,
} from '../../src/content/lib';

describe('hasProp', () => {
  it('プロパティが設定されていれば true', async () => {
    const img1 = await createImg([200, 100], { style: 'width: 200px;' });
    expect(hasProp(img1, 'width')).toBe(true);

    const img2 = await createImg([200, 100], { style: 'width: auto;' });
    expect(hasProp(img2, 'width')).toBe(true);

    const img3 = await createImg([200, 100], { width: '200px', style: 'width: 100%;' });
    expect(hasProp(img3, 'width')).toBe(true);

    // TODO: スタイルシートで定義されたプロパティの存在も `hasProp` で判定できることをテストする
  });
  it('プロパティが設定されていなければ false', async () => {
    const img1 = await createImg([200, 100], {});
    expect(hasProp(img1, 'width')).toBe(false);

    const img2 = await createImg([200, 100], { width: '200px' });
    expect(hasProp(img2, 'width')).toBe(false);
  });
});

describe('hasAttr', () => {
  it('属性が設定されていれば true', async () => {
    const img1 = await createImg([200, 100], { width: '200px' });
    expect(hasAttr(img1, 'width')).toBe(true);

    const img2 = await createImg([200, 100], { width: 'auto' });
    expect(hasAttr(img2, 'width')).toBe(true);

    const img3 = await createImg([200, 100], { width: '200px', style: 'width: 100%;' });
    expect(hasAttr(img3, 'width')).toBe(true);
  });
  it('属性が設定されていなければ false', async () => {
    const img1 = await createImg([200, 100], {});
    expect(hasAttr(img1, 'width')).toBe(false);

    const img2 = await createImg([200, 100], { style: 'width: 100%;' });
    expect(hasAttr(img2, 'width')).toBe(false);
  });
});

describe('isScalableByAspectRatio', () => {
  it('アスペクト比に応じてスケールするなら true', async () => {
    const img1 = await createImg([200, 100], { width: '100%', height: 'auto' });
    expect(isScalableByAspectRatio(img1)).toBe(true);

    const img2 = await createImg([200, 100], { style: 'width: 100%; height: auto;' });
    expect(isScalableByAspectRatio(img2)).toBe(true);

    const img3 = await createImg([200, 100], { width: '100%', style: 'height: auto;' });
    expect(isScalableByAspectRatio(img3)).toBe(true);

    // TODO: スタイルシートでスケールするよう指示するテストケースも追加する

    const img4 = await createImg([200, 100], { width: '200px' });
    expect(isScalableByAspectRatio(img4)).toBe(true);
  });
  it('アスペクト比に応じてスケールしないなら false', async () => {
    const img1 = await createImg([200, 100], { width: '200px', height: '100px' });
    expect(isScalableByAspectRatio(img1)).toBe(false);

    const img2 = await createImg([200, 100], { width: '200px', style: 'height: 100px;' });
    expect(isScalableByAspectRatio(img2)).toBe(false);

    // TODO: スタイルシートでスケールしないよう指示するテストケースも追加する
  });
});

describe('getAspectRatioFromAttrs', () => {
  it('width/height 属性からアスペクト比が計算できれば、そのアスペクト比が返る', async () => {
    const img1 = await createImg([2, 3], { width: '5', height: '7' });
    expect(getAspectRatioFromAttrs(img1)).toBeCloseTo(5 / 7);

    const img3 = await createImg([2, 3], { width: '5', height: '7', style: 'width: 11px; height: 13px;' });
    expect(getAspectRatioFromAttrs(img3)).toBeCloseTo(5 / 7);

    // TODO: スタイルシートを使ったテストケースも追加する
  });
  it('width/height 属性からアスペクト比が計算できなければ null が返る', async () => {
    const img1 = await createImg([2, 3], { width: '5', height: 'auto' });
    expect(getAspectRatioFromAttrs(img1)).toBeNull();

    const img2 = await createImg([2, 3], { width: '5', height: '7%' });
    expect(getAspectRatioFromAttrs(img2)).toBeNull();

    const img3 = await createImg([2, 3], { width: '5' });
    expect(getAspectRatioFromAttrs(img3)).toBeNull();

    const img4 = await createImg([2, 3], { style: 'width: 11px; height: 13px;' });
    expect(getAspectRatioFromAttrs(img4)).toBeNull();

    // TODO: スタイルシートを使ったテストケースも追加する
  });
});

describe('getAspectRatioFromProps', () => {
  it('width/height プロパティからアスペクト比が計算できれば、そのアスペクト比が返る', async () => {
    const img1 = await createImg([2, 3], { style: 'width: 11px; height: 13px;' });
    expect(getAspectRatioFromProps(img1)).toBeCloseTo(11 / 13);

    const img3 = await createImg([2, 3], { width: '5', height: '7', style: 'width: 11px; height: 13px;' });
    expect(getAspectRatioFromProps(img3)).toBeCloseTo(11 / 13);

    // TODO: スタイルシートを使ったテストケースも追加する
  });
  it('width/height プロパティからアスペクト比が計算できなければ null が返る', async () => {
    const img1 = await createImg([2, 3], { style: 'width: 11px; height: auto;' });
    expect(getAspectRatioFromProps(img1)).toBeNull();

    const img2 = await createImg([2, 3], { style: 'width: 11px; height: 13%;' });
    expect(getAspectRatioFromProps(img2)).toBeNull();

    // TODO: テストを通す
    // const img3 = await createImg([2, 3], { style: 'width: 11px; height: 13vw;' });
    // expect(getAspectRatioFromProps(img3)).toBeNull();

    const img4 = await createImg([2, 3], { style: 'width: 11px;' });
    expect(getAspectRatioFromProps(img4)).toBeNull();

    const img5 = await createImg([2, 3], { width: '5', height: '7' });
    expect(getAspectRatioFromProps(img5)).toBeNull();

    // TODO: スタイルシートを使ったテストケースも追加する
  });
});

describe('getAspectRatioFromComputedStyles', () => {
  it('見かけ上の寸法からアスペクト比が計算できれば、そのアスペクト比が返る', async () => {
    const img1 = await createImg([2, 3], { width: '5', height: '7', style: 'width: 11px; height: 13px;' });
    expect(getAspectRatioFromComputedStyles(img1)).toBeCloseTo(11 / 13);

    const img2 = await createImg([2, 3], { width: '5', height: '7', style: 'width: 11px;' });
    expect(getAspectRatioFromComputedStyles(img2)).toBeCloseTo(11 / 7);

    const img3 = await createImg([2, 3], { width: '5', height: '7' });
    expect(getAspectRatioFromComputedStyles(img3)).toBeCloseTo(5 / 7);

    // TODO: テストを通す
    // const img4 = await createImg([2, 3], { width: '5', height: 'auto' });
    // expect(getAspectRatioFromComputedStyles(img4)).toBeCloseTo(2 / 3);

    // TODO: テストを通す
    // const img5 = await createImg([2, 3], { width: '5' });
    // expect(getAspectRatioFromComputedStyles(img5)).toBeCloseTo(2 / 3);

    // TODO: テストを通す
    // const img6 = await createImg([2, 3], {});
    // expect(getAspectRatioFromComputedStyles(img6)).toBeCloseTo(2 / 3);

    // TODO: スタイルシートを使ったテストケースも追加する

    const img7 = await createImg([2, 3], { style: 'width: 5vw; height: 7vw;' });
    expect(getAspectRatioFromComputedStyles(img7)).toBeCloseTo(5 / 7);
  });
  it('見かけ上の寸法からアスペクト比が計算できなければ null が返る', async () => {
    const img1 = await createImg([2, 3], { style: 'width: 5px; height: 7%;' });
    expect(getAspectRatioFromComputedStyles(img1)).toBeNull();

    const img2 = await createImg([2, 3], { style: 'width: 5%; height: 7%;' });
    expect(getAspectRatioFromComputedStyles(img2)).toBeNull();

    // TODO: テストを通す
    // const img3 = await createImg([2, 3], { style: 'width: 5px; height: 7vw;' });
    // expect(getAspectRatioFromComputedStyles(img3)).toBeNull();

    // TODO: テストを通す
    // const img4 = await createImg([2, 3], { style: 'width: 5vw; height: 7vh;' });
    // expect(getAspectRatioFromComputedStyles(img4)).toBeNull();
  });
});

describe('getProp', () => {
  it('style 属性もしくはスタイルシートでプロパティが設定されていればそれが返る', async () => {
    const img1 = await createImg([2, 3], { style: 'width: 11px;' });
    expect(getProp(img1, 'width')?.toString()).toBe('11px');

    const img2 = await createImg([2, 3], { width: '5px', style: 'width: 11px;' });
    expect(getProp(img2, 'width')?.toString()).toBe('11px');

    const img3 = await createImg([2, 3], { width: '5px' });
    expect(getProp(img3, 'width')?.toString()).toBe(undefined);

    // TODO: スタイルシートを使ったテストケースも追加する
  });
  it('詳細度や優先度が考慮される', async () => {
    // TODO
  });
});
