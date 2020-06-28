import { browser } from 'webextension-polyfill-ts';

browser.browserAction.onClicked.addListener(() => {
  browser.tabs
    .executeScript({
      file: '/dist/js/content.js',
    })
    .catch(console.error);
});
