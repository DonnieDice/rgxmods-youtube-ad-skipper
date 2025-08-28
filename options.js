document.addEventListener('DOMContentLoaded', () => {
  const autoSkipCheckbox = document.getElementById('autoSkip');

  // Load saved settings
  chrome.storage.sync.get({ autoSkip: true }, (items) => {
    autoSkipCheckbox.checked = items.autoSkip;
  });

  // Save settings on change
  autoSkipCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({ autoSkip: autoSkipCheckbox.checked });
  });
});
