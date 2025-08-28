let autoSkipEnabled = false;

chrome.storage.sync.get({ autoSkip: false }, (items) => {
  autoSkipEnabled = items.autoSkip;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.autoSkip) {
    autoSkipEnabled = changes.autoSkip.newValue;
  }
});

const observer = new MutationObserver((mutations) => {
  if (autoSkipEnabled) {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const skipButton = node.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
          if (skipButton) {
            skipButton.click();
          }
        }
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "skipAd" && !autoSkipEnabled) {
    const skipButton = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
    if (skipButton) {
      skipButton.click();
    }
  }
});
