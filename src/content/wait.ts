async function waitRaf() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

async function waitDuration(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

/**
 * 画像がロードし終わるのを待つ。
 * 遅延ロード対応した画像を考慮し、一度ビューポートに表示して一定時間待機する実装になっている。
 * */
export async function waitImgsLoad(imgs: HTMLImageElement[]) {
  for (const img of imgs) {
    img.scrollIntoView();
    await waitRaf();
    await waitDuration(30);
  }
  window.scrollTo({ top: 0 });
  await waitDuration(3000);
}
