function sendToggle(tabId) {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.sendMessage(tabId, { type: "browserAction", data: {} }, () => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message || String(chrome.runtime.lastError)));
        }
        resolve();
      });
    } catch (err) {
      reject(err);
    }
  });
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id) {
    return;
  }
  // Avoid restricted schemes where injection is not allowed
  const url = tab.url || "";
  if (/^(chrome|edge|about|chrome-extension):/i.test(url)) {
    console.warn("Skipping injection on restricted URL:", url);
    return;
  }
  try {
    // First, try to send the toggle message without reinjecting
    await sendToggle(tab.id);
  } catch (_) {
    try {
      // If the receiving end does not exist, inject assets then retry
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id, allFrames: true },
        files: ["css/style.css"]
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: true },
        files: ["js/content.js"]
      });

      await sendToggle(tab.id);
    } catch (e) {
      const msg = (e && e.message) ? e.message : String(e);
      console.error(`Injection or messaging failed on ${url}:`, msg);
    }
  }
});