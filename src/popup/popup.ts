import { browser } from 'webextension-polyfill-ts';

const detectButton = document.querySelector<HTMLButtonElement>('.detect')!;

// ボタンが押されたらアクティブなタブで content.js を実行
detectButton.addEventListener('click', (e) => {
  browser.tabs
    .executeScript({
      file: '/dist/js/content.js',
    })
    .catch(console.error);
});
