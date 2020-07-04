import {
  verifyRequireIntrinsicSize,
  verifyRequireAspectRatioHint,
  verifyNoMismatchOfAspectRatioHint,
  verifyNoMismatchOfApparentSize,
  verifyNoDefectiveAttribute,
  verifyNoDefectiveProperty,
} from '../../src/content/rule';
import { createImg } from './test-util';

describe('verifyRequireIntrinsicSize', () => {
  it('見かけ上の幅・高さが auto なら true', async () => {
    const img1 = await createImg([200, 100], {});
    expect(verifyRequireIntrinsicSize(img1)).toBe(true);

    const img2 = await createImg([200, 100], { width: 'auto', height: 'auto' });
    expect(verifyRequireIntrinsicSize(img2)).toBe(true);

    const img3 = await createImg([200, 100], { style: 'width: auto; height: auto;' });
    expect(verifyRequireIntrinsicSize(img3)).toBe(true);

    const img4 = await createImg([200, 100], { width: 'auto', style: 'height: auto;' });
    expect(verifyRequireIntrinsicSize(img4)).toBe(true);
  });
  it('見かけ上の幅・高さが auto でなければ false', async () => {
    const img1 = await createImg([200, 100], { width: '200', height: '100' });
    expect(verifyRequireIntrinsicSize(img1)).toBe(false);

    const img2 = await createImg([200, 100], { width: '100', height: '100' });
    expect(verifyRequireIntrinsicSize(img2)).toBe(false);

    const img3 = await createImg([200, 100], { style: 'width: 200px; height: 100px;' });
    expect(verifyRequireIntrinsicSize(img3)).toBe(false);
  });
  it('見かけ上の幅/高さどちらかが auto でなければ false', async () => {
    const img1 = await createImg([200, 100], { width: '200' });
    expect(verifyRequireIntrinsicSize(img1)).toBe(false);

    const img2 = await createImg([200, 100], { height: '100' });
    expect(verifyRequireIntrinsicSize(img2)).toBe(false);

    const img3 = await createImg([200, 100], { style: 'width: 200px;' });
    expect(verifyRequireIntrinsicSize(img3)).toBe(false);
  });
});

describe('verifyRequireAspectRatioHint', () => {
  describe('アスペクト比に応じてスケールする画像', () => {
    it('アスペクト比のヒントが無ければ true', async () => {
      const img1 = await createImg([200, 100], { width: '100%', height: 'auto' });
      expect(verifyRequireAspectRatioHint(img1)).toBe(true);

      const img2 = await createImg([200, 100], { style: 'width: 100%; height: auto;' });
      expect(verifyRequireAspectRatioHint(img2)).toBe(true);

      const img3 = await createImg([200, 100], { style: 'width: 50vh; height: auto;' });
      expect(verifyRequireAspectRatioHint(img3)).toBe(true);

      const img4 = await createImg([200, 100], { width: '100%' });
      expect(verifyRequireAspectRatioHint(img4)).toBe(true);

      const img5 = await createImg([200, 100], { style: 'width: 100%;' });
      expect(verifyRequireAspectRatioHint(img5)).toBe(true);

      const img6 = await createImg([200, 100], { width: 'auto', height: 'auto', style: 'width: 100%; height: auto;' });
      expect(verifyRequireAspectRatioHint(img6)).toBe(true);
    });
    it('アスペクト比のヒントがあれば false', async () => {
      const img1 = await createImg([200, 100], { width: '200', height: '100', style: 'width: 100%; height: auto;' });
      expect(verifyRequireAspectRatioHint(img1)).toBe(false);

      const img2 = await createImg([200, 100], { width: '100', height: '100', style: 'width: 100%; height: auto;' });
      expect(verifyRequireAspectRatioHint(img2)).toBe(false);
    });
  });

  it('アスペクト比に応じてスケールしない画像は必ず false', async () => {
    const img1 = await createImg([200, 100], { width: '200', height: '100' });
    expect(verifyRequireAspectRatioHint(img1)).toBe(false);

    const img2 = await createImg([200, 100], { width: '100%', height: '100%' });
    expect(verifyRequireAspectRatioHint(img2)).toBe(false);
  });
});

describe('verifyNoMismatchOfAspectRatioHint', () => {
  describe('アスペクト比に応じてスケールする画像', () => {
    it('アスペクト比のヒントが画像オリジナルのアスペクト比と異なれば true', async () => {
      const img1 = await createImg([200, 100], { width: '100', height: '100', style: 'width: 100%; height: auto;' });
      expect(verifyNoMismatchOfAspectRatioHint(img1)).toBe(true);
    });
    it('アスペクト比のヒントが画像オリジナルのアスペクト比と一致すれば false', async () => {
      const img1 = await createImg([200, 100], { width: '200', height: '100', style: 'width: 100%; height: auto;' });
      expect(verifyNoMismatchOfAspectRatioHint(img1)).toBe(false);

      const img2 = await createImg([200, 100], { width: '100', height: '50', style: 'width: 100%; height: auto;' });
      expect(verifyNoMismatchOfAspectRatioHint(img2)).toBe(false);
    });
  });

  it('アスペクト比に応じてスケールしない画像は必ず false', async () => {
    const img1 = await createImg([200, 100], { width: '200', height: '100' });
    expect(verifyNoMismatchOfAspectRatioHint(img1)).toBe(false);

    const img2 = await createImg([200, 100], { width: '100%', height: '100%' });
    expect(verifyNoMismatchOfAspectRatioHint(img2)).toBe(false);
  });
});

describe('verifyNoMismatchOfApparentSize', () => {
  it('アスペクト比に応じてスケールする画像は必ず false', async () => {
    const img1 = await createImg([200, 100], { width: '100', height: '100', style: 'width: 100%; height: auto;' });
    expect(verifyNoMismatchOfApparentSize(img1)).toBe(false);
  });

  describe('アスペクト比に応じてスケールしない画像', () => {
    it('見かけ上のアスペクト比が画像オリジナルのアスペクト比と異なれば true', async () => {
      const img1 = await createImg([200, 100], { width: '100', height: '100' });
      expect(verifyNoMismatchOfApparentSize(img1)).toBe(true);

      const img2 = await createImg([200, 100], { width: '200', height: '100', style: 'width: 100px; height: 100px;' });
      expect(verifyNoMismatchOfApparentSize(img2)).toBe(true);
    });
    it('見かけ上のアスペクト比が画像オリジナルのアスペクト比と一致すれば false', async () => {
      const img1 = await createImg([200, 100], { width: '200', height: '100' });
      expect(verifyNoMismatchOfApparentSize(img1)).toBe(false);
      const img2 = await createImg([200, 100], { style: 'width: 200px; height: 100px;' });
      expect(verifyNoMismatchOfApparentSize(img2)).toBe(false);
      const img3 = await createImg([200, 100], { width: '100', height: '50' });
      expect(verifyNoMismatchOfApparentSize(img3)).toBe(false);
    });
  });
});

describe('verifyNoDefectiveAttribute', () => {
  it('width/heught 属性のどちらか一方だけある場合は true', async () => {
    const img1 = await createImg([200, 100], { width: '200', style: 'width: 100%; height: auto;' });
    expect(verifyNoDefectiveAttribute(img1)).toBe(true);

    const img2 = await createImg([200, 100], { width: '200' });
    expect(verifyNoDefectiveAttribute(img2)).toBe(true);

    const img3 = await createImg([200, 100], { height: '100' });
    expect(verifyNoDefectiveAttribute(img3)).toBe(true);
  });
  it('width/heught 属性のどちらもある場合は false', async () => {
    const img1 = await createImg([200, 100], { width: '200', height: '100' });
    expect(verifyNoDefectiveAttribute(img1)).toBe(false);

    const img2 = await createImg([200, 100], { width: '200', height: '100', style: 'width: 100%; height: auto;' });
    expect(verifyNoMismatchOfApparentSize(img2)).toBe(false);
  });
  it('width/heught 属性のどちらもない場合は false', async () => {
    const img1 = await createImg([200, 100], {});
    expect(verifyNoDefectiveAttribute(img1)).toBe(false);

    const img2 = await createImg([200, 100], { style: 'width: 200px; height: 100px;' });
    expect(verifyNoDefectiveAttribute(img2)).toBe(false);
  });
});

describe('verifyNoDefectiveProperty', () => {
  it('width/heught プロパティのどちらか一方だけある場合は true', async () => {
    const img1 = await createImg([200, 100], { width: '200', height: '100', style: 'width: 100%;' });
    expect(verifyNoDefectiveProperty(img1)).toBe(true);

    const img2 = await createImg([200, 100], { style: 'width: 100%;' });
    expect(verifyNoDefectiveProperty(img2)).toBe(true);

    const img3 = await createImg([200, 100], { style: 'height: auto;' });
    expect(verifyNoDefectiveProperty(img3)).toBe(true);
  });
  it('width/heught プロパティのどちらもある場合は false', async () => {
    const img1 = await createImg([200, 100], { style: 'width: 100%; height: auto;' });
    expect(verifyNoDefectiveProperty(img1)).toBe(false);

    const img2 = await createImg([200, 100], { style: 'width: 200px; height: 100px;' });
    expect(verifyNoMismatchOfApparentSize(img2)).toBe(false);
  });
  it('width/heught プロパティのどちらもない場合は false', async () => {
    const img1 = await createImg([200, 100], {});
    expect(verifyNoDefectiveProperty(img1)).toBe(false);

    const img2 = await createImg([200, 100], { width: '200', height: '100' });
    expect(verifyNoDefectiveProperty(img2)).toBe(false);
  });
});
