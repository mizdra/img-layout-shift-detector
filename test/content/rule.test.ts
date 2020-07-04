import { verifyRequireIntrinsicSize } from '../../src/content/rule';
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
