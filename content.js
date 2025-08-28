const observer = new MutationObserver((mutations) => {
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
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "skipAd") {
    const skipButton = document.querySelector('.ytp-ad-skip-button-modern, .ytp-ad-skip-button');
    if (skipButton) {
      skipButton.click();
    }
  }
});
