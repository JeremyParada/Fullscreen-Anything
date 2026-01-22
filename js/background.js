chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.id) {
    return;
  }
  try {
    // Inject CSS across all frames to ensure consistent styling
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id, allFrames: true },
      files: ["css/style.css"]
    });

    // Inject the content script programmatically in response to user gesture
    await chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      files: ["js/content.js"]
    });

    // Notify the top frame content script to toggle behavior
    await chrome.tabs.sendMessage(tab.id, {
      type: "browserAction",
      data: {}
    });
  } catch (e) {
    console.error("Injection or messaging failed", e);
  }
});