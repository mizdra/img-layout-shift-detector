import { browser } from 'webextension-polyfill-ts';

const detectButton = document.querySelector<HTMLButtonElement>('.detect')!;

detectButton.addEventListener('click', (e) => {
  alert('hello!');
  console.log('hello!');
  console.log(browser);
});
