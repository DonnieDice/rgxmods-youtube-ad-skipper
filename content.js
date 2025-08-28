let autoSkipEnabled = false;

console.log('[RGXMods] content.js loaded.');

chrome.storage.sync.get({ autoSkip: true }, (items) => {
  autoSkipEnabled = items.autoSkip;
  console.log('[RGXMods] Initial autoSkip setting:', autoSkipEnabled);
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.autoSkip) {
    autoSkipEnabled = changes.autoSkip.newValue;
    console.log('[RGXMods] autoSkip setting changed to:', autoSkipEnabled);
  }
});

const observer = new MutationObserver((mutations) => {
  if (autoSkipEnabled) {
    console.log('[RGXMods] MutationObserver triggered, autoSkip is enabled.');
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const skipButton = node.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
          if (skipButton) {
            console.log('[RGXMods] Skip button found, attempting to click.');
            skipButton.click();
          } else {
            console.log('[RGXMods] Added node, but no skip button found.');
          }
        }
      }
    }
  } else {
    console.log('[RGXMods] MutationObserver triggered, autoSkip is disabled.');
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "skipAd" && !autoSkipEnabled) {
    console.log('[RGXMods] Hotkey pressed, autoSkip is disabled, attempting to click.');
    const skipButton = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
    if (skipButton) {
      skipButton.click();
    } else {
      console.log('[RGXMods] Hotkey pressed, but no skip button found.');
    }
  }
});
