if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/serviceWorker.js');
      console.log('Service worker registered', reg);
    } catch (err) {
      console.log('Service worker registration failed: ', err);
    }
  });
}